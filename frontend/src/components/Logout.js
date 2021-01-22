import React from 'react';
import './Logout.css';

const Logout = (props) => {

    const logOut = () => {
      props.setAuthenticated(false)
    }

    logOut();

    return (
        <div>
            <h1>Logged Out Succesfully</h1>
            <h2>Thanks for playing!</h2>
        </div>
    );
}

export default Logout
