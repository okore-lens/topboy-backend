const HttpError = require('../models/http-error');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            throw new Error('Token is invalid');
        }
        const decodedToken = jwt.verify(token, 'topboy');
        const userId = decodedToken.id.trim();
        const foundUser = await User.findById(userId);
        if (!foundUser){
            throw new Error('User does not exist');
        }
        next();
    } catch(err){
        return next(new HttpError('Token is invalid', null, 403))
    }
}

module.exports = checkToken;