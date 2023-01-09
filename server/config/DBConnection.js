require("../models/User");
require("../models/Product");
const { DBConfiguration } = require("./DBConfiguration");

module.exports.DBConnection = () => {
  DBConfiguration.sync()
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((e) => console.log(e));
};
