var express = require("express");
var passport = require("passport");
var authMiddleware = require("./authMiddleware");
var router = express.Router();

var student = require("../controllers/student");
var signin = require("../controllers/signin");
var auth = require("../controllers/auth");
var qr = require("../controllers/qr");
var vrt = require("../controllers/virtual_attendance");

var userModel = require("../models/studentModel");

var updateValidator = require("../validators/updateValidator");
var scanValidator = require("../validators/scanValidator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hi");
});

router.post("/qr", qr.createQR);
router.post("/screenshot", vrt.obtainScreenshot);

router.get("/students", authMiddleware(true), student.getStudents);
router.post(
  "/update",
  authMiddleware(false),
  updateValidator,
  student.updateStudent
);
router.post("/deleteStudent", authMiddleware(true), student.deleteStudent);
router.post("/scanned", authMiddleware(true), scanValidator, signin.scanned);

router.post(
  "/signEveryoneOut",
  authMiddleware(true),
  function (req, res, next) {
    userModel.find({}, function (err, students) {
      var promises = [];
      for (var student of students) {
        var promise = new Promise((resolve, reject) => {
          student.present = false;
          student.save(function (err) {
            if (err) console.log(err);
            resolve();
          });
        });
        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        res.sendStatus(200);
      });
    });
  }
);

module.exports = router;
