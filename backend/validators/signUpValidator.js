var { checkSchema } = require("express-validator")
var studentModel = require('../models/studentModel')

module.exports = new checkSchema({
    email: {
        isLength: {
            errorMessage: "Please provide an email",
            options: {
                min: 1
            }
        },
        isEmail: {
            errorMessage: "Email has to be valid"
        },
        custom: {
            options: (value) => {
                return studentModel.findOne({email: value}).then(student => {
                    if (student) {
                        return Promise.reject("Email already in use")
                    }
                })
            }
        },
        escape: {},
        trim: {}
    },
    password: {
        isLength: {
            errorMessage: "Password has to be at least 7 chars long",
            options: {
                min: 7
            }
        },
        escape: {}
    },
    firstName: {
        isLength: {
            errorMessage: "Please provide a first name",
            options: {
                min: 1
            }
        },
        escape: {},
        trim: {}
    },
    lastName: {
        isLength: {
            errorMessage: "Please provide a last name",
            options: {
                min: 1
            }
        },
        escape: {},
        trim: {}
    }
})