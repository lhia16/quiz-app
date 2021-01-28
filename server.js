const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(cors());
// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "./client/build")))

app.get('/', async (req, res) => {
    // res.send("Hello from Nodejs");
    if (req.userFound && req.userFound.Admin) {
        console.log("user is logged in")
    } else {
        console.log("you are a guest")
    }

    const usersDB = await user.find();

    // res.render('index', {
    //     users: usersDB
    // });

    res.send("Hello from Nodejs");

    // res.json({
    //     response: usersDB
    // })
});

app.get('/login', async (req, res) => {
    res.send("This is the login page");
});

app.get('/quizsetup', async (req, res) => {
    res.send("This is the quiz setup page");
});

app.get('/register', async (req, res) => {
    res.send("This is the register page");
});

app.get('/leaderboard', async (req, res) => {
    res.send("This is the leaderboard page");
});

app.get("/isauthd", async (req, res) => {
    //this is where we can pass all the data to mongodb
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(({ _id: decoded.id }))
        //always must send a response (send feed back to frontend - succes/failure)
        res.json({
            response: user,
            authenticated: true
        })
    } catch (error) {
        res.json({
            response: "User is not logged in",
            authenticated: false
        })
    }
});

app.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.json({
                response: "Email address already exists."
            })
        } else {
            if (req.body.password === null || req.body.password === "" || req.body.password.trim() === "") {
                res.json({
                    response: "Please enter a valid password!"
                })
            } else if (req.body.name === null || req.body.name === "" || req.body.name.trim() === "") {
                res.json({
                    response: "Please enter a valid username!"
                })
            } else if (req.body.password !== req.body.passwordConfirm) {
                res.json({
                    response: "Passwords do not match!"
                })
            }
            else if (req.body.email === null || req.body.email === "" || req.body.email.trim() === "") {
                res.json({
                    response: "Please enter a valid email address!"
                })
            } else {
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
                    response: "User registered Successfully!"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/getData", async (req, res) => {
    //this is where we can pass all the data to mongodb
    const results = await User.find()
    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        results: results
    })
});

app.post('/quizcomplete', async (req, res) => {

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await Result.create({
        //need to update this to get the proper data from the cookie?
        user: decoded.id,
        time: req.body.time,
        score: req.body.score,
    })


    const user = await User.findById(({ _id: decoded.id }))
    let currentScore = user.totalScore;
    let currentTime = user.totalTime;

    await User.findByIdAndUpdate({ _id: decoded.id }, {
        totalTime: currentTime + req.body.time,
        totalScore: currentScore + req.body.score
    })
    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response: "Score registered Successfully!"
    })
});

app.get("/logout", (req, res) => {
    authenticated = false;
    res.cookie('jwt', { expires: 0 });
    res.json({
        response: "User has been logged out",
    })
});


app.post('/login', async (req, res) => {

    if (req.body.password === null || req.body.password === "") {
        res.json({
            response: "Please enter a valid password!"
        })
    } else if (req.body.name === null || req.body.name === "") {
        res.json({
            response: "Please enter a valid username!"
        })

    } else if (req.body.email === null || req.body.email === "") {
        res.json({
            response: "Please enter a valid Email address!"
        })

    } else {
        try {
            const user = await User.findOne({ email: req.body.email });
            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);

                res.json({
                    response: "Details match!",
                    authenticated: isMatch,
                    user: user.name
                })
            } else {
                res.json({
                    response: "Username or Password incorrect!"
                })
            }
        }
        catch (error) {
            res.json({
                response: "Username or Password incorrect!"
            })
        }
        // console.log(req.body.name, req.body.email, req.body.password);
    }
});

//always must send a response (send feed back to frontend - succes/failure)
//     res.json({
//         response:"User login Successfully!"
//     })
// });



app.post("/quizsetup/category", async (req, res) => {

    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response: "You Selected: " + req.body.category
    })
})

app.post("/quizsetup/difficulty", (req, res) => {
    //this is where we can pass all the data to mongodb
    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response: "You Selected: " + req.body.difficulty
    })
})

app.post("/quiz", (req, res) => {
    //this is where we can pass all the data to mongodb

    //always must send a response (send feed back to frontend - succes/failure)
    res.json({
        response: "You Selected: " + req.body.difficulty
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build"))
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});