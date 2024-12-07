const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const supabaseUrl = "https://gpvbthynahjszfayotfw.supabase.co/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdmJ0aHluYWhqc3pmYXlvdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjY3NzgsImV4cCI6MjA0ODkwMjc3OH0.zMRwswKOHimYX9NMpH3HuTXF9rDLtZu_GF4sne3zZvc";

const supabase = createClient(supabaseUrl, supabaseKey);

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};


app.get("/api/questions", async (req, res) => {
  try {
    const { data: questions, error: questionError } = await supabase
      .from("questions")
      .select("question_id, body, created_at, question_tags(tag_id, tags(name))");
    if (questionError) throw questionError;

    const formattedQuestions = questions.map((q) => ({
      question_id: q.question_id,
      body: q.body,
      created_at: formatDate(q.created_at),
      tags: q.question_tags?.map((t) => t.tags.name) || [],
    }));

    res.json(formattedQuestions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

app.post("/api/questions", async (req, res) => {
  const { body, tags } = req.body;

  if (!body || !tags || !Array.isArray(tags)) {
    return res
      .status(400)
      .json({ error: "Question body and an array of tags are required" });
  }

  try {
    const { data: question, error: questionError } = await supabase
      .from("questions")
      .insert([{ body, created_at: new Date() }])
      .select("question_id");
    if (questionError) throw questionError;

    const questionId = question[0].question_id;

    const tagEntries = tags.map((tag) => ({
      question_id: questionId,
      tag_id: tag,
    }));
    const { error: tagError } = await supabase.from("question_tags").insert(tagEntries);
    if (tagError) throw tagError;

    res.status(201).json({ question_id: questionId });
  } catch (err) {
    res.status(500).json({ error: "Failed to save the question" });
  }
});

app.get("/api/solutions/:questionId", async (req, res) => {
  const { questionId } = req.params;

  try {
    const { data: solutions, error } = await supabase
      .from("solutions")
      .select("*")
      .eq("question_id", questionId);
    if (error) throw error;

    const formattedSolutions = solutions.map((s) => ({
      solution_id: s.solution_id,
      body: s.body,
      created_at: formatDate(s.created_at),
    }));

    res.json(formattedSolutions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch solutions" });
  }
});

app.post("/api/solutions", async (req, res) => {
  const { questionId, body } = req.body;

  if (!questionId || !body) {
    return res
      .status(400)
      .json({ error: "Question ID and solution body are required" });
  }

  try {
    const { data: solution, error } = await supabase
      .from("solutions")
      .insert([{ question_id: questionId, body, created_at: new Date() }]);
    if (error) throw error;

    res.status(201).json(solution[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the solution" });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    const { data: tags, error } = await supabase.from("tags").select("*");
    if (error) throw error;

    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

app.post("/api/tags", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Tag name is required" });
  }

  try {
    const { data: tag, error } = await supabase
      .from("tags")
      .insert([{ name }])
      .select("*");
    if (error) throw error;

    res.status(201).json(tag[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to save the tag" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));