import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from 'axios';

const Home = (props) => {

    const [loggedIn, setLoggedIn] = useState([]);

    useEffect(() => {
        const checkAuthd = async () => {
          const response = await axios.get("/home")

          setLoggedIn(response.data.results);

        }
        
        checkAuthd();
      }, [])

      console.log(loggedIn);
    return (
        <div>
            <h1>Home Page</h1>
            {/* <h2>{props.message}</h2> */}
            <p>Welcome to Quiizify!</p>
            <p>Take part in quizzes to earn points and compete on the leaderboard</p>
        </div>
    );
}

export default Home
