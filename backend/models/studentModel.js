var mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    department: {
        type: String,
        enum: [
            "programming",
            "scouting",
            "subsystems",
            "undeclared",
        ],
        default: "undeclared"
    },
    admin: {
        type: Boolean,
        default: false
    },
    grade: Number,
    present: {
        type: Boolean,
        default: false
    },
    times: [{
        time: Number,
        signin: Boolean
    }],
    totalSeconds: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('studentModel', studentSchema)