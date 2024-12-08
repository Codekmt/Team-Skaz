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

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-GB", options);
};

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await readFile(questionsFilePath);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to read questions file" });
  }
});

app.post("/api/questions", async (req, res) => {
  const { title, tags } = req.body;

  if (!title || !tags) {
    return res.status(400).json({ error: "Title and tags are required" });
  }

  try {
    const questions = await readFile(questionsFilePath);
    const newQuestion = {
      id: Date.now().toString(),
      title,
      tags,
      date: formatDate(new Date().toISOString()),
      correctAnswerID: null,
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
  const { questionId, answer } = req.body;

  if (!questionId || !answer) {
    return res.status(400).json({ error: "Question ID and answer are required" });
  }

  try {
    const answers = await readFile(answersFilePath);

    if (!answers[questionId]) {
      answers[questionId] = [];
    }

    const newAnswer = {
      id: Date.now().toString(),
      answer,
      date: formatDate(new Date().toISOString()),
    };

    answers[questionId].push(newAnswer);
    await writeFile(answersFilePath, answers);

    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the answer" });
  }
});

app.post("/api/save-question-to-db", async (req, res) => {
  const { question } = req.body;

  if (!question || !question.id || !question.title) {
    return res.status(400).json({ error: "Incomplete question data" });
  }

  try {
    console.log("Saving question to database:", question);
    res.status(200).json({ message: "Question saved successfully" });
  } catch (error) {
    console.error("Failed to save question:", error);
    res.status(500).json({ error: "Failed to save question to the database" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));