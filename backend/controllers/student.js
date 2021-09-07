var { validationResult } = require("express-validator");

var studentModel = require("../models/studentModel");

/**
 * Gets all students
 */
exports.getStudents = function (req, res, next) {
  studentModel.find({}, function (err, students) {
    if (err) console.log(err);
    res.send(students);
  });
};

/**
 * Updates student details
 * Data fields:
 *  req.body.studentId
 *  req.body.firstName
 *  req.body.lastName
 *  req.body.department
 *  req.body.grade
 */
exports.updateStudent = function (req, res, next) {
  var errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  studentModel.findById(req.body.studentId, function (err, student) {
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.department = req.body.department;
    student.grade = req.body.grade;

    student.save(function (err) {
      if (err) console.log(err);
      res.sendStatus(200);
    });
  });
};

/**
 * Deletes student
 * Data fields:
 *  req.body.studentId
 */
exports.deleteStudent = function (req, res, next) {
  studentModel.deleteOne({ _id: req.body.studentId }).then(() => {
    res.sendStatus(200);
  });
};
