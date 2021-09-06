var studentModel = require("../models/studentModel")
var bcrypt = require("bcrypt")

/**
 * Creates new user
 * first name: req.body.firstName
 * last name: req.body.lastName
 * email: req.body.email
 * password: req.body.password
 */
exports.signup = function(req, res, next) { //TODO: validation
    studentModel.findOne({email: req.body.email}, function(err, student) {
        if (err) console.log(err)
        if (student) {
            console.log(student)
            res.status(400).send("Email already in use")
        } else {
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if (err) console.log(err)
                var newStudent = new studentModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                })
                newStudent.save(function(err, savedStudent) {
                    if (err) {
                        console.log(err)
                        res.sendStatus(500)
                    } else {
                        res.send(savedStudent)
                    }
                })
            })
        }
    })
}