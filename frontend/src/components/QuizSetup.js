import './QuizSetup.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QuizSetup = () => {
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState(["easy", "medium", "hard"]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [backendResponse, setbackendResponse] = useState("");
    const [categorySelected, setCategorySelected] = useState(false);
    const [difficultySelected, setDifficultySelected] = useState(false);
    const [category, setCategory] = useState("");
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState(1);

    const fetchData = async () => {
        //body/headers not required when accessing own backend
        const response = await axios.get('https://opentdb.com/api_category.php')
        setCategories(response.data.trivia_categories);
    }

    //will run once when the page has loaded
    useEffect(() => {
        fetchData();
    }, []);

    const formHandler = async (event, page) => {
        //this prevents the reloading of the page
        event.preventDefault();
        if (page === "category") {
            setCategorySelected(true);
        } else if (page === "difficulty") {
            setDifficultySelected(true);
            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${selectedDifficulty}&type=multiple`)
            setQuizQuestions(response.data.results);
        }

        //create a data object to pass through axios (like node)
        const body = {
            category: category,
        }

        // tell the browser what type of content is being passed from frontend to backend
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // pass the data & the config to the back end - axios.post will return a response
        // from our back end
        const response = await axios.post(`/quizsetup/${page}`, body, config);
        //response is an object
        setbackendResponse(response.data.response);
    }

    const answerHandler = (event) => {
        event.preventDefault();
        console.log(answer);
    }

    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    if (!categorySelected) {
        return (
            <div>
                <h1>Quiz Setup</h1>
                <div className="categories">
                    {
                        shuffle(categories).slice(0, 9).map((category, i) => {
                            //categories with extra long names causing issues with the size of the box
                            if (category.name.includes("Entertainment")) {
                                category.name = category.name.replace("Entertainment: ", "")
                            }
                            return (
                                <form key={i} className="category" onSubmit={(e) => formHandler(e, "category")}>
                                    <button type="submit" name="category" value={category.id} onClick={(e) => { setCategory(e.target.value) }} >{category.name}</button>
                                </form>
                            )
                        })
                    }
                </div>
            </div>
        );
    } else if (!difficultySelected) {
        return (
            <div>
                <h1>Select Difficulty</h1>
                <div className="difficulty">
                    {
                        difficulty.map((difficulty, i) => {
                            return (
                                <form key={i} className="difficulty" onSubmit={(e) => formHandler(e, "difficulty")}>
                                    <button type="submit" name="difficulty" value={difficulty} onClick={(e) => { setSelectedDifficulty(e.target.value) }} >{difficulty}</button>
                                </form>
                            )
                        })
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Quiz</h1>
                {
                    quizQuestions.map((question, i) => {
                        let newArray = [question.correct_answer, question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2]];
                        let shuffledArray = shuffle(newArray);
                        return (
                            <div key={i} className="question" id={"question" + i}>
                                <h2>{question.question}</h2>
                                <form className="answers" onSubmit={(e) => answerHandler(e)}>
                                    <button className="answer" id="answer1" type="submit" value={shuffledArray[0]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[0]}</button>
                                    <button className="answer" id="answer2" type="submit" value={shuffledArray[1]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[1]}</button>
                                    <button className="answer" id="answer3" type="submit" value={shuffledArray[2]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[2]}</button>
                                    <button className="answer" id="answer4" type="submit" value={shuffledArray[3]} onClick={(e) => { setAnswer(e.target.value) }}>{shuffledArray[3]}</button>
                                </form>
                            </div>
                        )
                    })
                }
            </div>

        )
    }


}

export default QuizSetup;
