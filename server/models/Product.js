const Sequelize = require("sequelize");
const { DBConfiguration } = require("../config/DBConfiguration");

const Product = DBConfiguration.define("product", {
  _id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING(140),
    allowNull: false,
    validate: {
      len: [1, 140],
      notEmpty: true,
    },
  },

  price: {
    type: Sequelize.DECIMAL(6,2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Product;
