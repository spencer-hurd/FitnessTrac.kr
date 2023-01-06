require("dotenv").config()
const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const apiRouter = require('./api')
const client = require('./db/client')
const app = express()

// Setup your Middleware and API Router here
//Check where else client is connected bc it still works.
//client.connect()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


app.use('/api', apiRouter)

//path not found handler
app.get("*", (req, res) => {
  res
    .status(404)
    .send({
      error: "404 - Not Found",
      message: "No route found for the requested URL",
    });
});

//error handler
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400 && res.statusCode !== 200) res.status(500);
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
