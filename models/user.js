const mongoose = require('mongoose');

//tables in mongodb are called collections
const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    totalScore: {
        type: Number,
        default: 0
    },
    totalTime: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('user', user);