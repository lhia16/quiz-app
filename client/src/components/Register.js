import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Login from './Login';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [backendResponse, setbackendResponse] = useState("");
   

    const formHandler = async (event) => {
        event.preventDefault();
        console.log("Form Submitted");
        console.log(name, email, password);
        const body = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post("/register", body, config);

        setbackendResponse(response.data.response);
    }

    if(backendResponse === "User registered Successfully!"){
        return(
            <Login authenticated={false} message="Registered Successfully, Please Log in!"/>
        )
    }
    
    return (
        <div className="container">
            <h1>Register</h1>
            <form id="register" onSubmit={formHandler}>
                
                <label>User Name:</label><br />
                <input type="text" name="userName" onChange={(e) => { setName(e.target.value) }}></input><br /><br />

                <label>Email:</label><br />
                <input type="email" name="userEmail" onChange={(e) => { setEmail(e.target.value) }}></input><br /><br />

                <label>Password:</label><br></br>
                <input type="password" name="userPassword" onChange={(e) => { setPassword(e.target.value) }}></input><br /><br />

                <label>Password Confirm:</label><br></br>
                <input type="password" name="userPasswordConfirm" onChange={(e) => { setPasswordConfirm(e.target.value) }}></input><br /><br />

                <button id="registerbtn" type="submit">Register</button>
            </form>
            <h2>{backendResponse}</h2>
        </div>
    );
}

export default Register;









