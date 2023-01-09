const Product = require("../models/Product");
const { QueryTypes } = require("sequelize");

module.exports.getAllProducts = async (req, res) => {
  const userId = req.user._id;
  try {
    const products = await Product.sequelize.query(
      `SELECT _id, name, price
      FROM products
      WHERE userId = "${userId}"
      ORDER BY updatedAt DESC;`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "All the registered products",
      products,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "error",
      message: "Could not get the registered products",
    });
  }
};

module.exports.postProduct = async (req, res) => {
  req.body.name = req.body.name.trim();
  const { name, price } = req.body;
  const userId = req.user._id;
  try {
    await Product.sequelize.query(
      `INSERT INTO products(name, price, createdAt, updatedAt, userId)
      VALUES('${name}', ${price}, now(), now(), '${userId}');`,
      {
        type: QueryTypes.INSERT,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Product registered successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "error",
      message: "Could not register the product",
    });
  }
};

module.exports.patchProduct = async (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;
  req.body.name = req.body.name.trim();
  const { name, price } = req.body;
  try {
    await Product.sequelize.query(
      `UPDATE products
      SET name='${name}', price=${price}
      WHERE _id = ${_id} AND userId = "${userId}";`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Product edited successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "error",
      message: "Could not edit the product",
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;
  try {
    await Product.sequelize.query(
      `DELETE FROM products
      WHERE _id = ${_id} AND userId = "${userId}";`,
      {
        type: QueryTypes.DELETE,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "error",
      message: "Could not delete the product",
    });
  }
};

module.exports.getProductById = async (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;
  try {
    const product = await Product.sequelize.query(
      `SELECT _id, name, price
      FROM products
      WHERE _id = ${_id} AND userId = "${userId}";`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Product requiere by id",
      product,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "error",
      message: "Could not get the requiere product",
    });
  }
};

module.exports.getProductByName = async (req, res) => {
  const userId = req.user._id;
  const { name } = req.params;
  try {
    const products = await Product.sequelize.query(
      `SELECT _id, name, price
      FROM products
      WHERE name LIKE "%${name}%" AND userId = "${userId}"`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: "success",
      message: `${name} name search results`,
      products,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      status: "error",
      message: `Could not get the results for the name search ${name}`,
    });
  }
};
