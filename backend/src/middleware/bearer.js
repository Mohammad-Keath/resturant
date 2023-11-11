"use strict";

const { users_model } = require("../models/index");

function bearerAuth(req, res, next) {
  try{
  if (req.headers.authorization) {
    const parsedToken = req.headers.authorization.split(" ")[1];
    users_model.bearerToken(parsedToken)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next("Error in bear");
  }
} catch (e){next(e)}
}


module.exports = bearerAuth;
