const asyncWrapper = require("../middleware/asyncWrapper");
const { success, failure } = require("../utils/responseMessage");

const Users = require("../model/Users");

const register = asyncWrapper(async (req, res) => {
  const credentials = req.body;

  let checkUserExist = await Users.findOne({ username: credentials.username });
  if (checkUserExist) {
    res.status(401).json(failure("User already exist "));
  }
  if (!checkUserExist) {
    await Users.create(credentials);
    res.status(200).json(success(credentials.username));
  }
});

const signIn = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json(failure("Please enter your credentials"));
  }

  let user = await Users.findOne({ username: username });
  if (!user) {
    res.status(400).json(failure("Please enter a valid username"));
  }

  if (user) {
    let isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json(failure("Username or Password Invalid"));
    } else if (isMatch) {
      req.user = user;
      let token = await user.createJWT();
      res.status(200).json(success(token));
      next();
    }
  }
});

module.exports = {
  register,
  signIn,
};
