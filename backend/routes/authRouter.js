var express = require("express");
var passport = require("passport");
var authMiddleware = require("./authMiddleware");
var { body, validationResult } = require("express-validator");
var router = express.Router();

var auth = require("../controllers/auth");

var signUpValidator = require("../validators/signUpValidator");

router.post("/signup", signUpValidator, auth.signup);

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) console.log(err);
    if (user) {
      req.logIn(user, function (err) {
        if (err) console.log(err);
        res.send(req.user);
      });
    } else {
      res.status(401).send({
        errors: [
          {
            msg: "Unauthorized",
          },
        ],
      });
    }
  })(req, res, next);
});

router.post("/user", authMiddleware, function (req, res, next) {
  res.send(req.user);
});
router.post("/logout", authMiddleware, function (req, res, next) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
