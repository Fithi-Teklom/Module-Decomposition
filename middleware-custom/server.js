import express from "express";

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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});