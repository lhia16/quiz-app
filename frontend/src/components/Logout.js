import React, {useEffect, useState} from 'react';
import './Logout.css';
import axios from 'axios';

const Logout = () => {

    const [response, setResponse] = useState([]);

    useEffect(() => {
        const logOut = async () => {
          const response = await axios.get("/logout")
          setResponse(response.data);

        }
        
        logOut();
      }, [])

    return (
        <div>
            <h1>Logged Out Succesfully</h1>
            <h2>Thanks for playing!</h2>
        </div>
    );
}

export default Logout
