"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const userRoutes = require("./routes/users");
require('dotenv').config();


const morgan = require("morgan");

const app = express();


app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// app.use(authenticateJWT);
app.use("/users", userRoutes);


// app.use("/users", usersRoutes);



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
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
