import axios from '../axios/index';


export const loginApi = (userName, password, callback)=>{ 
    axios.post('/login', {
        userName,
        password
    }).then(response => {
        const data = response.data;
        callback(data);
    }).catch(error => {
        alert(error);
    });
   };

  export const fetchData = (page, limit, params, callback) => { // Fetch data from db according to the updated parameters

    axios.get('/getUsers', {
        params: {
            page: page,
            limit: limit,
            params: params
        }
    })
        .then(response => {
            const data = response.data;
            callback(data);
        })
        .catch(error => {
            alert(error)
        });
};

export const addUser = (data, callback) => { // Sending new user to db

    axios.post('/insertUser', {
        "userData": data
    })
        .then(() => {
           callback();
        })
        .catch(error => {
            alert(error.response)
        });
}

export const deleteUser = (arrayUsresToDelete, callback) => { // Delete users from db

    axios.delete('/deleteUser', {
        data: { "usersData": arrayUsresToDelete }    
   })
       .then(() => {
          callback()
       })
       .catch(error => {
           alert(error.response)
       });
}