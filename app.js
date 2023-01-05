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

//error handler
app.use((error, req, res, next) => {
  res.send(error)
})

module.exports = app;
