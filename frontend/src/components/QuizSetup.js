import './QuizSetup.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QuizSetup = () => {
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState(["Easy","Medium","Hard"]);
    const [backendResponse, setbackendResponse] = useState("");
    const [categorySelected, setcategorySelected] = useState(false);
    const [catagory, setcatagory] = useState("");

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
        console.log(page);
        setcategorySelected(true);
        //this prevents the reloading of the page
        event.preventDefault();

        //create a data object to pass through axios (like node)
        const body = {
            catagory: catagory,
        }

        // tell the browser what type of content is being passed from frontend to backend
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // pass the data & the config to the back end - axios.post will return a response
        // from our back end
        const response = await axios.post(`/quizsetup/catagory`, body, config);
        //response is an object
        setbackendResponse(response.data.response);
    }


    // Shuffle array
    const shuffled = categories.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 9);
    console.log(backendResponse);

    if (!categorySelected) {
        return (
            <div>
                <h1>Quiz Setup</h1>
                <div className="categories">
                    {
                        selected.map((catagory, i) => {
                            //categories with extra long names causing issues with the size of the box
                            if (catagory.name.includes("Entertainment")) {
                                catagory.name = catagory.name.replace("Entertainment: ", "")
                            }
                            return (
                                <form key={i} className="category" onSubmit={formHandler}>
                                    <button type="submit" name="catagory" value={catagory.name} onClick={(e) => { setcatagory(e.target.value) }} >{catagory.name}</button>
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
                <h1>Select Difficulty</h1>
                {backendResponse}
                <div className="difficulty">
                    {
                        difficulty.map((difficulty, i) => {
                            return (
                                <form key={i} className="difficulty" onSubmit={formHandler}>
                                    <button type="submit" name="difficulty" value={difficulty} onClick={(e) => { setDifficulty(e.target.value) }} >{difficulty}</button>
                                </form>
                            )
                        })
                    }
                </div>
            </div>
        );
    }


}

export default QuizSetup;
