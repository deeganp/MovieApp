"use strict";


const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const userRoutes = require("./routes/users");
require('dotenv').config();


const morgan = require("morgan");

const app = express();


app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use("/users", userRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  console.log('Request received for:', req.url);
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
