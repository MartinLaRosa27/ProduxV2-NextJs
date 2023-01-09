const express = require("express");
const cors = require("cors");
const router = require("./router");
const { DBConnection } = require("./config/DBConnection");
require("dotenv").config({ path: ".env" });

DBConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router());

const server_port = process.env.YOUR_PORT || 80;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log(
    `The application is running on -> http://localhost:${server_port}`
  );
});
