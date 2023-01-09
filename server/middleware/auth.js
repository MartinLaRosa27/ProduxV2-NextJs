const { decodeToken } = require("../helpers/jwt");

module.exports.auth = (req, res, next) => {
  const token = req.body.header;
  if (!token) {
    return res.status(404).send({
      status: "error",
      message: "No authentication header found",
      userId: null,
    });
  }
  try {
    const payload = decodeToken(token);
    req.user = payload;
  } catch (e) {
    console.log(e);
    return res.status(404).send({
      status: "error",
      message: "Exired token",
      userId: null,
    });
  }
  next();
};
