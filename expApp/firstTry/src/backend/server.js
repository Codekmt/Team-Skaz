const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const questionsFilePath = path.join(__dirname, "questions.json");
const answersFilePath = path.join(__dirname, "answers.json");

const readFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
          console.error(`Error reading file ${filePath}:`, err);
          return reject(err);
      }
      resolve(JSON.parse(data || "[]"));
    });
  });

const writeFile = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
          console.error(`Error writing to file ${filePath}:`, err);
          return reject(err);
      }
      resolve();
    });
  });

if (!fs.existsSync(questionsFilePath)) fs.writeFileSync(questionsFilePath, "[]");
if (!fs.existsSync(answersFilePath)) fs.writeFileSync(answersFilePath, "{}");


app.get("/api/questions", async (req, res) => {
  try {
    const questions = await readFile(questionsFilePath);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to read questions file" });
  }
});

app.post("/api/questions", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    const questions = await readFile(questionsFilePath);
    const newQuestion = {
      id: Date.now().toString(),
      title,
      description,
      date: new Date().toISOString(),
    };

    questions.push(newQuestion);
    await writeFile(questionsFilePath, questions);

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the question" });
  }
});

app.get("/api/answers/:questionId", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const answers = await readFile(answersFilePath);
    res.json(answers[questionId] || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to read answers file" });
  }
});

app.post("/api/answers", async (req, res) => {
  const { questionId, text } = req.body;

  if (!questionId || !text) {
    return res.status(400).json({ error: "Question ID and text are required" });
  }

  try {
    const answers = await readFile(answersFilePath);

    if (!answers[questionId]) {
      answers[questionId] = [];
    }

    const newAnswer = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString(),
    };

    answers[questionId].push(newAnswer);
    await writeFile(answersFilePath, answers);

    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the answer" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));