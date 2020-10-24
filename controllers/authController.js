exports.actionLocalsControl = (req, res, next) => {
    res.locals._csrfToken = req.csrfToken();
    res.locals.user       = req.session.userIdentity;
    next();
}