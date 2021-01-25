import React, { useState, useEffect } from 'react';
import "./Leaderboard.css";
import axios from "axios";

const Leaderboard = (props) => {

  const [sortedScores, setsortedScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/getData")  
      orderScores(response.data.results);
    }
  
    const orderScores = (scoreData) => {
      let data = scoreData;
  
      let sorted = data.sort((a, b) => {
        return b.totalScore - a.totalScore || a.totalTime - b.totalTime;
      });
      setsortedScores(sorted)
    }

    fetchData();
  }, [])



  //Using component did mount here so that I can manipulate some data before I render it to the screen.
  //Take the data from state and store it in a variable so that I can manipulate it
  //I use this new sorted value and set it to state ready for the render

  return (
    <div className="main">
      <h1>Leaderboard</h1>
      {/* Map through the already sorted array that lives in state */}
      <div className="titles">
      <h2>Name</h2>
      <h2>Score</h2>
      <h2>Time</h2>
      </div>
      {sortedScores.map((person, i) => {
        return (
          <div key={i} className="result">
            <p className="name">
              {person.name}
            </p>
            <p className="totalScore">
              {person.totalScore}
            </p>
            <p className="totalTime">
              {person.totalTime}
            </p>
          </div>
        );
      })}
    </div>
  )
};

export default Leaderboard;
