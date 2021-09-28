var mongoose = require('mongoose')

var matchSchema2020 = mongoose.Schema({
    scouter: String,
    teamScouted: Number,
    matchNumber: Number,
    alliance: {
        type: String,
        enum: ['red', 'blue'],
    },
    auton: {
        preload: Number,
        crossedInitLine: Boolean,
        attempts: [{
            attempt: Number,
            location: String, //TODO: Define spots
            low: Number,
            high: Number,
            missed: Number,
        }],
        totalAttempts: Number,
    },
    teleop: {
        defense: Boolean,
        controlPanel: {
            type: String,
            enum: ['rotation', 'position']
        },
        attempts: [{
            attempt: Number,
            location: String, //TODO: Define spots
            low: Number,
            high: Number,
            missed: Number,
        }],
        totalAttempts: Number,
    },
    endgamePosition: {
        type: String,
        enum: ['none', 'parked', 'attempted', 'unbalanced', 'balanced']
    }
})