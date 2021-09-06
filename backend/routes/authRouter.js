var express = require("express");
var passport = require("passport")
var { body, validationResult } = require('express-validator')
var router = express.Router();

var auth = require("../controllers/auth")

var signUpValidator = require("../validators/signUpValidator")

router.post("/signup", signUpValidator, auth.signup)
router.post("/login", passport.authenticate("local"), function(req, res, next) {
  res.send(req.user)
})


module.exports = router;