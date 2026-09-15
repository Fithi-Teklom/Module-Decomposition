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
  const message = req.body;

  messages.push(message);

  res.json(message);
});

app.listen(port, () => {
  console.error(`Chat server listening on port ${port}`);
});