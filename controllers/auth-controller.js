const User = require("../models/user");
const HttpError = require("../models/http-error");

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
