require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const apiRouter = require("./api");
app.use(morgan("dev"));
app.use(cors());
// Setup your Middleware and API Router here
app.use("/api", apiRouter);

module.exports = app;
