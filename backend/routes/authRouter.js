var express = require("express");
var passport = require("passport")
var authMiddleware = require("./authMiddleware")
var { body, validationResult } = require('express-validator')
var router = express.Router();

var auth = require("../controllers/auth")

var signUpValidator = require("../validators/signUpValidator")

router.post("/signup", signUpValidator, auth.signup)
router.post("/login", passport.authenticate("local"), function(req, res, next) {
  res.send(req.user)
})
router.post("/user", authMiddleware, function(req, res, next) {
  res.send(req.user)
})
router.post("/logout", authMiddleware, function(req, res, next) {
  req.logout()
  res.sendStatus(200)
})


module.exports = router;