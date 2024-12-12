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
const tagsFilePath = path.join(__dirname, "tags.json");
const postTagsFilePath = path.join(__dirname, "postTags.json");

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
if (!fs.existsSync(tagsFilePath)) fs.writeFileSync(tagsFilePath, "{}");
if (!fs.existsSync(postTagsFilePath)) fs.writeFileSync(postTagsFilePath, "{}");

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
      title: title,
      tags : tags,
      date: formatDate(new Date().toISOString()),
    };

    questions.unshift(newQuestion);
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
      correctAnswer: false,
    };

    answers[questionId].unshift(newAnswer);
    await writeFile(answersFilePath, answers);

    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the answer" });
  }
});

app.patch('/api/answers/:questionId', async (req, res) => {
  const { questionId } = req.params;
  const updatedAnswers = req.body;

  try {
    const answers = await readFile(answersFilePath);

    if (!answers[questionId]) {
      return res.status(404).json({ message: "Question not found" });
    }

    answers[questionId] = updatedAnswers;
    await writeFile(answersFilePath, answers);

    res.status(200).json({ message: "Answers updated successfully" });
  } catch (err) {
    console.error("Failed to update answers:", err);
    res.status(500).json({ message: "Failed to update answers" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));