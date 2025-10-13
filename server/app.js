import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";

const app = new Hono();

// Add CORS middleware to allow requests from any origin
app.use("/*", cors());

// In-memory list of questions (empty at startup)
const questions = [];

// GET /courses - returns a list of courses
app.get("/courses", (c) => {
  return c.json({
    courses: [
      { id: 1, name: "Web Software Development" },
      { id: 2, name: "Device-Agnostic Design" }
    ]
  });
});

// GET /courses/:id - returns a specific course
app.get("/courses/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  return c.json({
    course: {
      id: id,
      name: "Course Name"
    }
  });
});

// POST /courses - creates a new course
app.post("/courses", async (c) => {
  const body = await c.req.json();
  return c.json({
    course: {
      id: 3,
      name: body.name
    }
  });
});

// GET /courses/:id/questions - returns all questions
app.get("/courses/:id/questions", (c) => {
  return c.json(questions);
});

// POST /courses/:id/questions - adds a new question
app.post("/courses/:id/questions", async (c) => {
  const body = await c.req.json();
  const newQuestion = {
    id: questions.length + 1,
    title: body.title,
    text: body.text,
    upvotes: 0
  };
  questions.push(newQuestion);
  return c.json(newQuestion);
});

// POST /courses/:id/questions/:qId/upvote - upvotes a question
app.post("/courses/:id/questions/:qId/upvote", (c) => {
  const qId = parseInt(c.req.param("qId"));
  const question = questions.find(q => q.id === qId);
  if (question) {
    question.upvotes += 1;
    return c.json(question);
  }
  return c.json({ error: "Question not found" }, 404);
});

// DELETE /courses/:id/questions/:qId - deletes a question
app.delete("/courses/:id/questions/:qId", (c) => {
  const qId = parseInt(c.req.param("qId"));
  const index = questions.findIndex(q => q.id === qId);
  if (index !== -1) {
    const deletedQuestion = questions.splice(index, 1)[0];
    return c.json(deletedQuestion);
  }
  return c.json({ error: "Question not found" }, 404);
});

export default app;