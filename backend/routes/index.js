var express = require("express");
var router = express.Router();

var student = require("../controllers/student");
var signin = require("../controllers/signin");
var qr = require("../controllers/qr");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({
    students: [
      {
        firstName: "Jeremy",
        lastName: "Tow",
        department: "Scouting",
        grade: 12,
      },
      {
        firstName: "Jeremy",
        lastName: "Tow",
        department: "Scouting",
        grade: 12,
      },
    ],
  });
});

router.get("/qr", qr.createQR);
router.post("/newStudent", student.newStudent);
router.get("/students", student.getStudents);
router.post("/deleteStudent", student.deleteStudent);
router.post("/scanned", signin.scanned);

module.exports = router;
