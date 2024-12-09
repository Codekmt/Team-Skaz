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

// app.post("/api/tags", async (req, res) => {
//   const { tag } = req.body;

//   if (!tag) {
//     return res.status(400).json({ error: "Tag is required" });
//   }
//   try {
//   const tags = await readFile(tagsFilePath);
//   if (!tags[tag]) {
//     tags[tag] = [];
//   } 
//   const newTag = {
//     tagId: Math.floor(Math.random() * 100),
//     tag,
//     questionId: req.body.questions.questionId
//   };
//   tags[tag].push(newTag);
//   await writeFile(tagsFilePath, tags);
//   res.status(201).json(newTag);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save the tag" });
//   }
// });

// app.get("/api/tags/:tag", async (req, res) => { 
//   const tag = req.params.tag;
//   try {
//     const tags = await readFile(tagsFilePath);
//     res.json(tags[tag] || []);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to read answers file" });
//   }

// })

// app.post("/api/postTags", async (req, res) => {
//   const { questionId, tag } = req.body;

//   if (!questionId || !tag) {
//     return res.status(400).json({ error: "Question ID and tag are required" });
//   }

//   try {
//     const postTags = await readFile(postTagsFilePath);
//     if (!postTags[questionId]) {
//       postTags[questionId] = [];
//     }

//     const postTag = {
//       tagId: req.tags.tagId,
//       questionId: req.questions.questionId,
//       tag,
//     }
//     postTags[tag].push(postTag);
//     await writeFile(postTagsFilePath, postTags);

//     res.status(201).json(postTags[questionId]);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save the post tag" });
//   }
// });


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));