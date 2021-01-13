const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

//connect to mongodb database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB is connected!"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from Nodejs");
})

app.post("/quizsetup/catagory", (req, res) => {
    //this is where we can pass all the data to mongodb

    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response:"You Selected: " + req.body.catagory
    })
})

app.post("/quizsetup/difficulty", (req, res) => {
    //this is where we can pass all the data to mongodb

    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response:"You Selected: " + req.body.difficulty
    })
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});