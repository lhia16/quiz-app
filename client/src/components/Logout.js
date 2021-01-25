import React, {useEffect} from 'react';
import './Logout.css';
import axios from 'axios';


const Logout = (props) => {

useEffect(() => {
  const logOut = async () => {
    props.setAuthenticated(false)
    await axios.get("/logout")}
  logOut();
})

  return (
    <div>
      <h1>Logged Out Successfully</h1>
      <h2>Thanks for playing!</h2>
    </div>
  );
}

export default Logout
