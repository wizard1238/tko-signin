var mongoose = require('mongoose')

var summarySchema = new mongoose.Schema({
    date: Number,
    students: {

    }
})

module.exports = mongoose.model('summarySchema', summarySchema)