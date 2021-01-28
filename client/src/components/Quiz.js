import './Quiz.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Quiz = (props) => {

    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState(0);

    const answerHandler = (event) => {
        event.preventDefault();
        setQuestion(question + 1);
        let array = [...answers]
        array.push(answer)
        setAnswers(array);
    }

    const checkAnswers = (answers) => {
        let score = 0;
        const resultsArray = props.questions.map((q, i) => {
            if (q.correct_answer === answers[i]) {
                score += 10;
                return "correct";
            } else {
                console.log("The correct answer is " + q.correct_answer);
                return "incorrect";
            }
        })
        console.log(resultsArray);

        return score;
    }

    //function that fixes html codes in strings and returns the parsed string
    const fixString = (string) => {
        if(string.includes("&rsquo;")){
            string = string.replaceAll("&rsquo;", "'")
        }
        if (string.includes("&#039;")) {
            string = string.replaceAll("&#039;", "'")
        }
        if (string.includes("&quot;")) {
            string = string.replaceAll("&quot;", "\"")
        }
        if (string.includes("&amp;")) {
            string = string.replaceAll("&amp;", "&")
        }
        console.log(string);
        return string;
    }

    const sendData = async (score, totalTime) => {

        //not sure if we will need to pass the name/user data in as should be able to retrive from cookie
        let name = "Sam";
        let time = totalTime;
        const body = {
            name: name,
            score: score,
            time: time,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post("/quizcomplete", body, config);
        console.log(response.data.response);
    }


    if (question + 1 > 10) {
        console.log(answers);
        let score = checkAnswers(answers);
        console.log(score);


        //grab the time from the timer & stop timer
        const timer = document.getElementsByClassName("Timer");
        console.log(timer);
        timer[0].style.visibility = "hidden";
        console.log(timer[0].innerHTML)

        let array = timer[0].innerHTML.split(":");
        console.log(array);

        let totalTime = parseInt(array[0] * 60) + parseInt(array[1])
        console.log(totalTime);

        //convert in seconds
        sendData(score, totalTime);

        return (
            <div>
                <h1>Quiz complete here are your results!</h1>
                <h2>You scored: {score} out of 100</h2>
                <div className="buttons">
                    <button id="leaderboard"><Link to="/leaderboard">Leaderboard</Link></button>
                    <button id="playAgain" onClick={() => window.location.reload()}><Link to="/quizsetup">Play Again</Link></button>
                </div>
            </div>
        )
    } else {
        let newArray = [props.questions[question].correct_answer, props.questions[question].incorrect_answers[0], props.questions[question].incorrect_answers[1], props.questions[question].incorrect_answers[2]];
        let shuffledArray = props.shuffle(newArray);

        return (
            <div >
                <h1>Question {question + 1}</h1>
                <h2 className="question">{fixString(props.questions[question].question)}</h2>
                <form className="quiz" onSubmit={(e) => answerHandler(e)}>
                    <button className="answer" value={shuffledArray[0]} onClick={(e) => { setAnswer(e.target.value) }}>{fixString(shuffledArray[0])}</button>
                    <button className="answer" value={shuffledArray[1]} onClick={(e) => { setAnswer(e.target.value) }}>{fixString(shuffledArray[1])}</button>
                    <button className="answer" value={shuffledArray[2]} onClick={(e) => { setAnswer(e.target.value) }}>{fixString(shuffledArray[2])}</button>
                    <button className="answer" value={shuffledArray[3]} onClick={(e) => { setAnswer(e.target.value) }}>{fixString(shuffledArray[3])}</button>
                </form>
            </div>
        )
    }
};
export default Quiz;
