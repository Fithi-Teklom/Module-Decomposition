const express = require("express");

const app = express();

const usernameMiddleware = (req, res, next) => {
  const username = req.get("X-Username");

  if (username) {
    req.username = username;
  } else {
    req.username = null;
  }

  next();
};