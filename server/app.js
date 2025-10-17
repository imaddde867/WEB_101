import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import postgres from "postgres";

const sql = postgres();

const app = new Hono();

// Add CORS middleware to allow requests from any origin
app.use("/*", cors());

// GET /api/courses - returns a list of courses
app.get("/api/courses", async (c) => {
  const courses = await sql`SELECT * FROM courses ORDER BY id`;
  return c.json(courses);
});

// GET /api/courses/:id - returns a specific course
app.get("/api/courses/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const courses = await sql`SELECT * FROM courses WHERE id = ${id}`;
  
  if (courses.length === 0) {
    return c.json({ error: "Course not found" }, 404);
  }
  
  return c.json(courses[0]);
});

// POST /api/courses - creates a new course
app.post("/api/courses", async (c) => {
  const body = await c.req.json();
  
  // Validation: course name must contain at least three characters
  if (!body.name || body.name.trim().length < 3) {
    return c.json({ error: "Course name must contain at least three characters" }, 400);
  }
  
  const courses = await sql`
    INSERT INTO courses (name)
    VALUES (${body.name})
    RETURNING *
  `;
  
  return c.json(courses[0]);
});

// DELETE /api/courses/:id - deletes a course
app.delete("/api/courses/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const courses = await sql`
    DELETE FROM courses
    WHERE id = ${id}
    RETURNING *
  `;
  
  if (courses.length === 0) {
    return c.json({ error: "Course not found" }, 404);
  }
  
  return c.json(courses[0]);
});

// GET /api/courses/:id/questions - returns all questions for a course
app.get("/api/courses/:id/questions", async (c) => {
  const courseId = parseInt(c.req.param("id"));
  const questions = await sql`
    SELECT * FROM questions
    WHERE course_id = ${courseId}
    ORDER BY id
  `;
  
  return c.json(questions);
});

// POST /api/courses/:id/questions - adds a new question to a course
app.post("/api/courses/:id/questions", async (c) => {
  const courseId = parseInt(c.req.param("id"));
  const body = await c.req.json();
  
  // Validation: title and text must both contain at least three characters
  if (!body.title || body.title.trim().length < 3) {
    return c.json({ error: "Question title must contain at least three characters" }, 400);
  }
  
  if (!body.text || body.text.trim().length < 3) {
    return c.json({ error: "Question text must contain at least three characters" }, 400);
  }
  
  const questions = await sql`
    INSERT INTO questions (course_id, title, text)
    VALUES (${courseId}, ${body.title}, ${body.text})
    RETURNING *
  `;
  
  return c.json(questions[0]);
});

// POST /api/courses/:id/questions/:qId/upvote - upvotes a question
app.post("/api/courses/:id/questions/:qId/upvote", async (c) => {
  const courseId = parseInt(c.req.param("id"));
  const qId = parseInt(c.req.param("qId"));
  
  const questions = await sql`
    UPDATE questions
    SET upvotes = upvotes + 1
    WHERE id = ${qId} AND course_id = ${courseId}
    RETURNING *
  `;
  
  if (questions.length === 0) {
    return c.json({ error: "Question not found" }, 404);
  }
  
  return c.json(questions[0]);
});

// DELETE /api/courses/:id/questions/:qId - deletes a question
app.delete("/api/courses/:id/questions/:qId", async (c) => {
  const courseId = parseInt(c.req.param("id"));
  const qId = parseInt(c.req.param("qId"));
  
  const questions = await sql`
    DELETE FROM questions
    WHERE id = ${qId} AND course_id = ${courseId}
    RETURNING *
  `;
  
  if (questions.length === 0) {
    return c.json({ error: "Question not found" }, 404);
  }
  
  return c.json(questions[0]);
});

export default app;