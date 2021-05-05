const { response } = require("express");

function routeNotFound(req, res, next) {
  res.status(404).json({ message: "route not found" });
}

module.exports = { routeNotFound };
