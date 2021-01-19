const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
// const auth = require('./middlewares/auth');
const user = require('./models/user');
const Result = require('./models/result');

dotenv.config({ path: './.env' });

//connect to mongodb database//
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB is connected!"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());


app.get('/', async (req, res) => {
    // res.send("Hello from Nodejs");
   
    if(req.userFound && req.userFound.Admin) {
        console.log("user is logged in")
    } else {
        console.log("you are a guest")
    } 
    
    const usersDB = await user.find();

    // res.render('index', {
    //     users: usersDB
    // });

    res.send("Hello from Nodejs");
});

app.post('/register', async (req, res) => {
    console.log("req.body"); 
//CHECK IF USER ALREADY REGISTERED EXIST - DO NOT REGISTER THE USER, OTHERWISE REGISTER NEW USER)
    const hashedPassword = await bcrypt.hash(req.body.password, 13)

    //this is where we can pass all the data to mongodb
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response: "User registered Succesfully!"
    })
});



// app.get("/login", (req, res) => {
//     res.render('login');
// });

app.post('/quizcomplete', async (req, res) => {
    await Result.create({
        //need to update this to get the proper data from the cookie?
        user: "60000fbf7e42d612c87ca2d5",
        time: req.body.time,
        score: req.body.score,
    })
    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response: "Score registered Succesfully!"
    })
});


// app.get("/login", (req, res) => {
//     res.render('login');
// });

app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    // console.log(req.body.name, req.body.email, req.body.password);
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        console.log(token);

        const cookiesOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        res.cookie('jwt', token, cookieOptions);
        res.send("you are logged in");
    } else {
        res.send("login details are incorrect");
    }
});

//always must send a response (send feed back to frontend - succes/failure)
//     res.json({
//         response:"User login Succesfully!"
//     })
// });



app.post("/quizsetup/category", async (req, res) => {

    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response:"You Selected: " + req.body.category
    })
})

app.post("/quizsetup/difficulty", (req, res) => {
    //this is where we can pass all the data to mongodb
    console.log("difficulty");
    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response:"You Selected: " + req.body.difficulty
    })
})

app.post("/quiz", (req, res) => {
    //this is where we can pass all the data to mongodb

    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response:"You Selected: " + req.body.difficulty
    })
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});