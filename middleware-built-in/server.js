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

app.use(express.json());

const validateSubjects = (req, res, next) => {
  if (!Array.isArray(req.body) || !req.body.every(item => typeof item === "string")) {
    return res
      .status(400)
      .send("Request body must be a JSON array of strings.");
  }

  next();
};


app.post("/", usernameMiddleware, validateSubjects, (req, res) => {
  const username = req.username;
  const subjects = req.body;
  const subjectCount = subjects.length;

  const authenticationMessage = username
    ? `You are authenticated as ${username}.`
    : "You are not authenticated.";

  let subjectsMessage;

  if (subjectCount === 0) {
    subjectsMessage = "You have requested information about 0 subjects.";
  } else {
    const subjectWord = subjectCount === 1 ? "subject" : "subjects";

    subjectsMessage = `You have requested information about ${subjectCount} ${subjectWord}: ${subjects.join(", ")}.`;
  }

  res.send(`${authenticationMessage}\n\n${subjectsMessage}\n`);
});


app.listen(3001, () => {
  console.log("Server listening on port 3001");
});