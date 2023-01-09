const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const Product = require("./Product");
const { DBConfiguration } = require("../config/DBConfiguration");

const User = DBConfiguration.define("user", {
  _id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    validate: {
      len: [5, 150],
      notContains: " ",
      notEmpty: true,
    },
    unique: true,
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      len: [8, 25],
      notContains: " ",
      notEmpty: true,
    },
  },
});

User.afterValidate(async (user) => {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
});
User.hasMany(Product);

module.exports = User;