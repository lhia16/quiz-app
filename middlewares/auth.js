
// const { promisify } = require("util");
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');


// exports.isLoggedIn =(req, ress, next) => {
//     console.log("checking if user is logged in");

//     if (req.cookies.jwt) {
//         // console.log("The cookie JWT exists");
//         const decoded = promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
//         console.log("My token decoded");
//         console.log(decoded);

//         req.userFound = await User.findById(decoded.id); 
//     }

//     next();
// }
// exports.logout = (req, res, next) => {

//     res.cookies('jwt', 'logout', {
//         expires: new Date(Date.now() + 2 * 1000),
//         httpOnly: true
//     });
    
//         next();
// }