const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/jwt");

module.exports.createUser = async (req, res) => {
  req.body.email = req.body.email.trim();
  const { email, password, passwordAux } = req.body;
  if (password !== passwordAux) {
    return res.status(400).json({
      status: "error",
      message: "Passwords not match",
    });
  }
  if (email.length < 5 || email.length > 140) {
    return res.status(400).json({
      status: "error",
      message: "The email only can have between 5 and 150 characters.",
    });
  }
  if (password.length < 8 || password.length > 25) {
    return res.status(400).json({
      status: "error",
      message: "The password only can have between 8 and 25 characters.",
    });
  }
  const userExists = await User.findOne({
    where: {
      email,
    },
  });
  if (userExists) {
    return res.status(400).json({
      status: "error",
      message: "The email is already registered",
    });
  }
  try {
    const userCreated = await User.create({
      email,
      password,
    });
    const token = createToken(userCreated);
    return res.status(200).json({
      status: "success",
      message: "User registered succesfully",
      token,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "The user could not register" });
  }
};

module.exports.userAuthentication = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({
    where: {
      email,
    },
  });
  if (!userExists) {
    return res.status(404).json({
      status: "error",
      message: "The enter email is not registered",
    });
  }
  if (!bcrypt.compareSync(password, userExists.password)) {
    return res
      .status(404)
      .json({ status: "error", message: "Incorrect password" });
  }
  const token = createToken(userExists);
  return res
    .status(200)
    .json({ status: "success", message: "Correct login", token });
};
