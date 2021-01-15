import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendResponse, setbackendResponse] = useState("");


    const formHandler = async (event) => {
        event.preventDefault();
        console.log("Form Submitted");
        console.log(name, email, password);
        const body = {
            name: name,
            email: email,
            password: password,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post("/login", body, config);

        setbackendResponse(response.data.response);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formHandler}>
                
                <label>User Name:</label><br />
                <input type="text" name="userName" onChange={(e) => { setName(e.target.value) }}></input><br /><br />

                <label>Email:</label><br />
                <input type="text" name="userEmail" onChange={(e) => { setEmail(e.target.value) }}></input><br /><br />

                <label>Password:</label><br></br>
                <input type="password" name="userPassword" onChange={(e) => { setPassword(e.target.value) }}></input><br /><br />

                <button type="submit">Login</button>
            </form>
            {backendResponse}
        </div>
    );
}


export default Login;