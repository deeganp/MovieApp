"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

// function authenticateJWT(req, res, next) {
//   try {
//     const authHeader = req.headers && req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.replace(/^[Bb]earer /, "").trim();
//       res.locals.user = jwt.verify(token, SECRET_KEY);
//     }
//     return next();
//   } catch (err) {
//     return next();
//   }
// }
function authenticateJWT(req, res, next) {
  try {
    const token = req.header('Authorization').split(' ')[1]; // Assuming the token is sent in the "Authorization" header

    if (!token) {
      throw new UnauthorizedError('No JWT provided');
    }

    const user = jwt.verify(token, SECRET_KEY);
    res.locals.user = user; // Store the user information in res.locals.user

    return next();
  } catch (err) {
    console.log(err);
    return next(new UnauthorizedError('Invalid JWT'));
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}


module.exports = {
    authenticateJWT,
    ensureLoggedIn,
  };
  