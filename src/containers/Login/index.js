import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Form, FormGroup} from 'reactstrap';
import {handleValidation} from '../../genericFunctions/validation';
import InputForm from '../../components/InputForm';
import {ADMIN, PASSWORD, ENTER_PASSWORD, ENTER_USER_NAME, 
        USER_NAME, LOGIN, SING_IN, UserName, Password, LOGIN_ALERT
} from '../../constants';
import './index.scss';
import {loginApi} from '../../axios/apiCalls'

const Login = () => {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({});
    const history = useHistory();


    const login = () => { // Checks whether full username and password fields sends to database and if there is a pass to the dashboard

        if (password && userName) {
        sendingData();
        } else {
            alert(LOGIN_ALERT);
        }
    }
   
    const handleChange = (e, field) => {
        e.target.name === PASSWORD ? setPassword(e.target.value) : setUserName(e.target.value);
        const fields = {password, userName};
        console.log(fields);
        const errors = handleValidation(fields);
        setErrors(errors);
    }
    const sendingData = async ()=>{
        loginApi(userName, password, function(response){
            const isAdmin = response.role === ADMIN;
            localStorage.setItem('auth-data', response.token);
            history.push('/dashboard', {token: response.token, isAdmin: isAdmin});
        });
        }

    return (
        <div className=" wrapper row justify-content-center m-0 ">
            <Form className="loginForm col-3">
                <h4>{LOGIN}</h4>
                <FormGroup>
                    <InputForm name={USER_NAME} type="email" placeholder={ENTER_USER_NAME} handleChange={handleChange}/>
                    <span className="error">{errors[UserName]}</span>
                </FormGroup>
                <FormGroup>
                <InputForm name={PASSWORD} type="password" placeholder={ENTER_PASSWORD} handleChange={handleChange}/>
                    <span className="error">{errors[Password]}</span>
                </FormGroup>
                <br/>
                <Button block className="bgcolor1" onClick={login}>{SING_IN}</Button>
            </Form>
        </div>
    );

}

export default Login;
