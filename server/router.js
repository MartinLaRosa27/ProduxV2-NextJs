const express = require("express");
const {
  getAllProducts,
  postProduct,
  patchProduct,
  deleteProduct,
  getProductById,
  getProductByName,
} = require("./controllers/ProductController");
const {
  userAuthentication,
  createUser,
} = require("./controllers/UserController");
const { auth } = require("./middleware/auth");
const { tokenValidation } = require("./helpers/jwt");
const router = express.Router();

module.exports = () => {
  // ProductController:
  router.put("/get-all-products", auth, getAllProducts);
  router.put("/get-product-id/:_id", auth, getProductById);
  router.put("/get-product-name/:name", auth, getProductByName);
  router.post("/post-product", auth, postProduct);
  router.patch("/patch-product/:_id", auth, patchProduct);
  router.delete("/delete-product/:_id", auth, deleteProduct);

  // UserController:
  router.post("/user-authentication", userAuthentication);
  router.post("/create-user", createUser);

  // jwt:
  router.post("/token-validation", tokenValidation);

  return router;
};
