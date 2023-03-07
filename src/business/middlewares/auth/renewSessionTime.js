const renewSessionTime = (req, res, next) => {
    console.log(req.session);
    next();
}

module.exports = renewSessionTime;