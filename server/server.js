const URL = require('./constants');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())

app.get('/getUsers', function (req, res) { //Requests users from a database according to the updated parameters
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const params = JSON.parse(req.query.params);
    console.log(page, limit, params);

    MongoClient.connect(URL, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            throw err;
        const dbo = db.db("admin");

        dbo.collection("users").find({[params.searchBy]: new RegExp(params.name, 'i')}).skip(page).limit(limit).sort({[params.searchBy]: params.order}).toArray(function (err, result) {
            if (err)
                throw err;
            res.send(result);
            db.close();
        });
    });
});

app.post('/insertUser', function (req, res) { //Updating new user into database
    const jsonobj = req.body.userData;
    MongoClient.connect(URL, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            throw err;
        const dbo = db.db("admin");
        dbo.collection("users").insertOne(jsonobj, function (err, resp) {
            res.send(resp.ops[0]._id);
            if (err)
                throw err;
            db.close();
        });
    });
});

app.post('/login', function (req, res) { //Checks if a user exists and the password is correct and generate token
    const userName = req.body.userName;
    const userPassword = req.body.password;
    MongoClient.connect(URL, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            throw err;
        const dbo = db.db("admin");
        dbo.collection("users").findOne({"userName": userName}, function (err, result) {
            if (result && result.password === userPassword) {
                const token = jwt.sign(
                    {userId: result._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'});
                res.send({
                    userId: result._id,
                    token: token,
                    role: result.role
                });
            } else {
                res.send(401, 'unauthorization');
            }
            db.close();
        });
    });
});

app.delete('/deleteUser', function (req, res) { // delete users from db
    const usersArray = req.body.usersData;
    
    MongoClient.connect(URL,{ useUnifiedTopology: true }, function (err, db) {
        if (err)
            throw err;
        const dbo = db.db("admin");
        dbo.collection("users").deleteMany({userName: {$in: usersArray}}, function (err, resp) {
            res.send("success");
            if (err)
                throw err;
            db.close();
        });
    });
});

app.listen(8081);