var express = require("express");
var passport = require("passport");
var authMiddleware = require("./authMiddleware");
var router = express.Router();

var student = require("../controllers/student");
var signin = require("../controllers/signin");
var auth = require("../controllers/auth");
var qr = require("../controllers/qr");

var updateValidator = require("../validators/updateValidator");
var scanValidator = require("../validators/scanValidator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hi");
});

router.post("/qr", qr.createQR);

router.get("/students", student.getStudents);
router.post("/update", authMiddleware, updateValidator, student.updateStudent);
router.post("/deleteStudent", student.deleteStudent);
router.post("/scanned", authMiddleware, scanValidator, signin.scanned);

module.exports = router;
