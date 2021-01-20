const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.isLoggedIn = async (req, res, next) => {

    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
    }

    //done the required actions
    next();
}

exports.logout = (req, res, next) => {

    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });

    //done the required actions
    next();
}