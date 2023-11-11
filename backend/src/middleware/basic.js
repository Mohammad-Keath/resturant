"use strict";

const base64 = require("base-64");
const {users_model} = require("../models/index");

function basicAuth(req, res, next) {
  try{
  if (req.headers.authorization) {
      const encodedUser = req.headers.authorization.split(" ")[1];
      const decodedUser = base64.decode(encodedUser).split(":");
      const [email, password] = decodedUser;
      console.log(`Email: ${email}`, `Password: ${password}`)
      users_model.authUser(email, password)
        .then((data) => {
          req.user = data;
          next();
        })
        .catch((err) => {
          next(err);
        });
  
    } else {
      next("Error");
    }
    } catch (e){next(e)}

}

module.exports = basicAuth;
