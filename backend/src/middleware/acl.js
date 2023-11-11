"use strict";

function acl(params) {
  return (req, res, next) => {
    try{
      console.log(req.user.role);
      if (params.includes(req.user.role)||req.user.role === params) {
        next();
      } else {
        next("Not allowd to enter");
      }
    } catch (e){next(e)}
  };
}

module.exports = acl;
