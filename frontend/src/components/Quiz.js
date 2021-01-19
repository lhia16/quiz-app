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
        props.questions.map((q, i) => {
            if(q.correct_answer === answers[i]){
                console.log("correct");
                score += 1;
            }else{
                console.log("The correct answer is " + q.correct_answer);
            }
        })

        return score;
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

        let totalTime = parseInt(array[0]*60) + parseInt(array[1])
        console.log(totalTime);

        //convert in seconds
        sendData(score, totalTime);
        

        return (
            <div>
                <h1>Quiz complete here are your results!</h1>
                <h2>You scored: {score} out of 10</h2>
                <button><Link to="/leaderboard">Leaderboard</Link></button>
            </div>
        )
    } else {
        let newArray = [props.questions[question].correct_answer, props.questions[question].incorrect_answers[0], props.questions[question].incorrect_answers[1], props.questions[question].incorrect_answers[2]];
        let shuffledArray = props.shuffle(newArray);
        return (
            <div>
                <h1>Question {question + 1}</h1>
                {props.questions[question].question}
                <form onSubmit={(e) => answerHandler(e)}>
                    <button value={shuffledArray[0]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[0]}</button>
                    <button value={shuffledArray[1]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[1]}</button>
                    <button value={shuffledArray[2]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[2]}</button>
                    <button value={shuffledArray[3]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[3]}</button>
                </form>
            </div>
        )
    }
};
export default Quiz;
