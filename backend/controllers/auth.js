var { validationResult } = require("express-validator");
var bcrypt = require("bcrypt");

var studentModel = require("../models/studentModel");

/**
 * Creates new user
 * first name: req.body.firstName
 * last name: req.body.lastName
 * email: req.body.email
 * password: req.body.password
 */
exports.signup = function (req, res, next) {
  var errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) console.log(err);

    var newStudent = new studentModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });

    newStudent.save(function (err, savedStudent) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(savedStudent);
      }
    });
  });
};
