import './Login.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Home from './Home';


const Login = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendResponse, setbackendResponse] = useState();
    const [authenticated, setAuthenticated] = useState();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const response = await axios.get('/isAuthd')
        console.log(response)
        setAuthenticated(response.data.authenticated);
    }


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
        console.log(response.data.authenticated);
        setAuthenticated(response.data.authenticated)
    }

    if(authenticated){
        console.log("trying to Redirect")
        return(
            <Home message="Welcome [insert username here]"/>
        )
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
            {props.message}
        </div>
    );
}


export default Login;