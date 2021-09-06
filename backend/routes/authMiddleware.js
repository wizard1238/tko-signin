module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({
            errors: [
                {
                    msg: "Unauthorized"
                }
            ]
        })
    } else {
        return next()
    }
}