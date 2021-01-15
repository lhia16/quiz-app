import React, { Component } from "react";
import "./Leaderboard.css";
import axios from "axios";

class Leaderboard extends Component {
  
  state = {
    scores: [
      { name: "Sam", score: 8, time: 120 },
      { name: "Rose",score: 10,time: 140 },
      { name: "Lhia", score: 5, time: 180 },
      { name: "Mike", score: 5, time: 140 },
      { name: "Dan", score: 10, time: 135 },
    ],
  };

  //Using component did mount here so that I can manipulate some data before I render it to the screen.
  componentDidMount() {
    //Take the data from state and store it in a variable so that I can manipulate it
    let data = this.state.scores;

    let sorted = data.sort((a, b)=> {
      return b.score - a.score || a.time - b.time;
    });
    //I use this new sorted value and set it to state ready for the render
    this.setState({ scores: sorted });
  }
  render() {
    const { scores } = this.state;
    return (
      <div className="main">
        <h1>Leaderboard</h1>
        {/* Map through the already sorted array that lives in state */}
        {scores.map((person) => {
          return (
            <div>
              <p>
                {person.name} - {person.score} - {person.time}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Leaderboard;
