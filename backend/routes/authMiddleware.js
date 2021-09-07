module.exports = function (requiresAdmin) {
  return async (req, res, next) => {
    if (!req.isAuthenticated() || (requiresAdmin && !req.user.admin)) {
      return res.status(401).send({
        errors: [
          {
            msg: "Unauthorized",
          },
        ],
      });
    } else {
      return next();
    }
  };
};
