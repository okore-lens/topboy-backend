const User = require("../models/user");
const HttpError = require("../models/http-error");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res, next) => {
  let foundUsers;
  const users = [];
  try {
    foundUsers = await User.find();
    if (!foundUsers) {
      return next(new HttpError("An Error occured while getting users"));
    }
    for (const a of foundUsers) {
      users.push({ id: a._id, name: a.name, email: a.email });
    }
  } catch (err) {
    return next(new HttpError("Unable to get users"));
  }
  res.status(200).json({ message: "Users found successfully", users: users });
};

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errorArray = errors.array();
    return next(new HttpError('Unable to process', errorArray[0].msg, 422));
  }
  try {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const passwordResult = password.match(passwordPattern);
    if(!passwordResult){
        const message = 'Please enter a strong password of at least 8 characters containing a character, number and symbol';
        return next(new HttpError('Unable to process password', message, 422));
    }
  } catch (err) {
    return next(new HttpError('Unable to validate password input'));
  }
  try {
    const foundUser = await User.findOne({ email });
    if(foundUser){
      return next(new HttpError('Unable to proceed', 'The user with the E-Mail address already exists', 422));
    }
  } catch (err) {
    return next(new HttpError('Unable to check if user exists'));
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Unable to hash the user password'));
  }

  const newUser = new User({email, name, password: hashedPassword});

  try {
    await newUser.save();
  } catch(err) {
    return next(new HttpError('Unable to save new user'));
  }

  let token;

  try {
    token - jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, 'topboy');
  } catch (err) {
    return next(new HttpError('Unable to generate user token'));
  }
  res.status(201).json({ message: 'Signed up successfully', id: newUser._id, name: newUser.name, email: newUser.email, token });
}