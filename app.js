require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const apiRouter = require("./api");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// Setup your Middleware and API Router here
app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  console.log({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = app;
