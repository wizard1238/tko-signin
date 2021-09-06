var express = require("express");
var passport = require("passport")
var router = express.Router();

var student = require("../controllers/student");
var signin = require("../controllers/signin");
var auth = require("../controllers/auth")
var qr = require("../controllers/qr");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hi");
});

router.post("/qr", qr.createQR);
// router.post("/newStudent", student.newStudent);

router.get("/students", student.getStudents);
router.post("/deleteStudent", student.deleteStudent);
router.post("/scanned", signin.scanned);

module.exports = router;
