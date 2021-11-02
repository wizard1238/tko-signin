var express = require("express");
var passport = require("passport");
var authMiddleware = require("./authMiddleware");
var { body, validationResult } = require("express-validator");
var router = express.Router();

var auth = require("../controllers/auth");

var signUpValidator = require("../validators/signUpValidator")
var resetPasswordValidator = require("../validators/resetPasswordValidator")
var toggleAdminValidator = require("../validators/toggleAdminValidator")

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

router.get("/user", authMiddleware(false), function (req, res, next) {
  res.send(req.user);
});
router.post("/logout", authMiddleware(false), function (req, res, next) {
  req.logout();
  res.sendStatus(200);
});

router.post(
  "/resetPassword",
  authMiddleware(true),
  resetPasswordValidator,
  auth.resetPassword
)

router.post("/toggleAdmin", authMiddleware(true), toggleAdminValidator, auth.toggleAdmin)

router.get("/auth/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/userinfo.email profile"]}))
router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), function(req, res, next) {
  res.redirect(process.env.FRONTEND_URL + "/")
})

module.exports = router;
