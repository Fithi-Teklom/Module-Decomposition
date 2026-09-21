console.log("SERVER.JS IS RUNNING");
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

const messages = [];

app.use(express.json());
app.use(cors());

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { username, text } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({
      error: "Username is required",
    });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  const message = {
    username: username.trim(),
    text: text.trim(),
  };

  messages.push(message);

  res.status(201).json(message);
});

app.listen(port, () => {
  console.log(`Chat server listening on port ${port}`);
});
