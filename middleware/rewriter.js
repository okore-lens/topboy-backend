function rewriter(req, res, next) {
    req.body.image = req.file.filename;
    next();
}

module.exports = rewriter;


