import React, { useState, useEffect } from 'react';
import "./Leaderboard.css";
import axios from "axios";

const Leaderboard = (props) => {

  const [scores, setScores] = useState([]);
  const [sortedScores, setsortedScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/getData")
      setScores(response.data.results);
  
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

  console.log(sortedScores);
  return (
    <div className="main">
      <h1>Leaderboard</h1>
      {/* Map through the already sorted array that lives in state */}
      {scores.map((person, i) => {
        return (
          <div key={i}>
            <p>
              {person.name} - {person.totalScore} - {person.totalTime}
            </p>
          </div>
        );
      })}
    </div>
  )
};

export default Leaderboard;
