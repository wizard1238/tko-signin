var mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: {
        type: String,
        enum: [
            'programming',
            'scouting',
            'subsystems',
        ]
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