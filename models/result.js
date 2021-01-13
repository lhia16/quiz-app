const mongoose = require('mongoose');

//tables in mongodb are called collections
const result = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'user',
    },
    score: {
        type: Number,
        require: true
    },
    time: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('result', result);