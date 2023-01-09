const jwt = require("jwt-simple");
const moment = require("moment");
const expTimeSec = 3600;
require("dotenv").config({ path: ".env" });

module.exports.createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    exp: moment().unix() + expTimeSec,
  };
  const token = jwt.encode(payload, process.env.SECRET);
  return token;
};

module.exports.decodeToken = (token) => {
  const tokenAux = token.replace(/['"]+/g, "");
  const payload = jwt.decode(tokenAux, process.env.SECRET); // If token is not valid, throw error
  if (payload.exp <= moment().unix()) {
    throw new Error("Expired Token");
  }
  return payload;
};

module.exports.tokenValidation = (req, res) => {
  const { token } = req.body;
  try {
    this.decodeToken(token);
    return res.status(200).json({
      status: "success",
      message: "Valid token",
    });
  } catch (e) {
    return res.status(404).json({
      status: "error",
      message: "Invalid token",
    });
  }
};
