var { validationResult } = require("express-validator");

var studentModel = require("../models/studentModel");

/**
 * Called whenever a student scans in
 * Data fields:
 *  req.body.studentId
 */
exports.scanned = function (req, res, next) {
  var errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  if (!req.user.admin) {
    res.status(401).send({
      errors: [
        {
          msg: "Unathorized",
        },
      ],
    });
    return;
  }

  studentModel.findById(req.body.studentId).then((student) => {
    var currTime = Math.floor(Date.now() / 1000);
    if (student.present) {
      var lastSession = student.times[student.times.length - 1];
      var currSessionTime = lastSession.signin
        ? currTime - lastSession.time
        : 0; // if last scan was signin add to total time
      student.totalSeconds += currSessionTime;
    }
    student.present = !student.present;
    student.times.push({
      time: currTime,
      signin: student.present,
    });
    student.save(function (err) {
      if (err) console.log(err);
      res.sendStatus(200);
    });
  });
};
