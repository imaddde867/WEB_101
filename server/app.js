import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import { setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import postgres from "postgres";

const sql = postgres();
const textEncoder = new TextEncoder();
const JWT_SECRET = "wsd-project-secret";
const SALT_LENGTH = 16;

const jwtKeyPromise = crypto.subtle.importKey(
  "raw",
  textEncoder.encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"],
);

const base64UrlEncode = (bytes) => {
  if (typeof btoa !== "undefined") {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  // Fallback for environments without btoa (e.g., Node.js)
  // Using Buffer if available.
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  throw new Error("No base64 encoder available");
};

const toHex = (bytes) =>
  Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");

const fromHex = (hex) => {
  if (!hex || hex.length % 2 !== 0) {
    return null;
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
};

const timingSafeEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

const hashPassword = async (password) => {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const passwordBytes = textEncoder.encode(password);
  const data = new Uint8Array(salt.length + passwordBytes.length);
  data.set(salt);
  data.set(passwordBytes, salt.length);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return `${toHex(salt)}:${toHex(new Uint8Array(digest))}`;
};

const verifyLegacyPassword = async (password, storedHash) => {
  const [saltHex, hashHex] = storedHash.split(":");
  const salt = fromHex(saltHex);
  if (!salt || !hashHex) {
    return false;
  }
  const passwordBytes = textEncoder.encode(password);
  const data = new Uint8Array(salt.length + passwordBytes.length);
  data.set(salt);
  data.set(passwordBytes, salt.length);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const digestHex = toHex(new Uint8Array(digest));
  return timingSafeEqual(hashHex, digestHex);
};

let bcryptModulePromise;
const ensureBcrypt = async () => {
  if (!bcryptModulePromise) {
    bcryptModulePromise = import("https://deno.land/x/bcrypt@v0.4.1/mod.ts").catch(() => null);
  }
  return await bcryptModulePromise;
};

const verifyPassword = async (password, storedHash) => {
  if (!storedHash) {
    return false;
  }
  if (storedHash.startsWith("$2")) {
    const mod = await ensureBcrypt();
    if (mod && typeof mod.compare === "function") {
      try {
        return await mod.compare(password, storedHash);
      } catch (_) {
        // ignore and fall through to false
      }
    }
    return false;
  }
  if (storedHash.includes(":")) {
    return await verifyLegacyPassword(password, storedHash);
  }
  return timingSafeEqual(password, storedHash);
};

const createJwt = async (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const encodeObject = (obj) =>
    base64UrlEncode(textEncoder.encode(JSON.stringify(obj)));
  const unsigned = `${encodeObject(header)}.${encodeObject(payload)}`;
  const key = await jwtKeyPromise;
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(unsigned),
  );
  return `${unsigned}.${base64UrlEncode(new Uint8Array(signature))}`;
};

const getNumericDate = (seconds) =>
  Math.floor(Date.now() / 1000) + Number(seconds ?? 0);

const app = new Hono();

// Add CORS middleware to allow requests from any origin
app.use("/*", cors());

// POST /api/auth/register - registers a new user
app.post("/api/auth/register", async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch (_error) {
    return c.json({ error: "Invalid JSON payload." }, 400);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = (body.password ?? "").trim();

  if (!email || !password) {
    return c.json({ error: "Email and password are required." }, 400);
  }

  const passwordHash = await hashPassword(password);

  try {
    const users =
      await sql`INSERT INTO users (email, password_hash) VALUES (${email}, ${passwordHash}) RETURNING id, email`;
    return c.json(users[0], 201);
  } catch (error) {
    if (error.code === "23505") {
      return c.json({ error: "Email already registered." }, 409);
    }
    console.error("Failed to register user:", error);
    return c.json({ error: "Failed to register user." }, 500);
  }
});

// POST /api/auth/login - authenticates a user and sets a JWT cookie
app.post("/api/auth/login", async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch (_error) {
    return c.json({ message: "Incorrect email or password." }, 401);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = (body.password ?? "").trim();

  if (!email || !password) {
    return c.json({ message: "Incorrect email or password." }, 401);
  }

  const users = await sql`
    SELECT id, email, password_hash
    FROM users
    WHERE LOWER(email) = ${email}
  `;
  const user = users[0];

  if (!user) {
    return c.json({ message: "Incorrect email or password." }, 401);
  }

  const passwordMatches = await verifyPassword(password, user.password_hash);

  if (!passwordMatches) {
    return c.json({ message: "Incorrect email or password." }, 401);
  }

  const token = await createJwt({
    email: user.email,
    exp: getNumericDate(60 * 60),
  });

  const isSecure = c.req.url.startsWith("https://");

  setCookie(c, "token", token, {
    httpOnly: true,
    sameSite: "Lax",
    secure: isSecure,
    path: "/",
    maxAge: 60 * 60,
  });

  return c.json({ message: "Welcome!" });
});

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
    return c.json({
      error: "Course name must contain at least three characters",
    }, 400);
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

// GET /api/questions - returns a list of questions
app.get("/api/questions", async (c) => {
  const questions = await sql`SELECT * FROM questions ORDER BY id`;
  return c.json(questions);
});

// POST /api/courses/:id/questions - adds a new question to a course
app.post("/api/courses/:id/questions", async (c) => {
  const courseId = parseInt(c.req.param("id"));
  const body = await c.req.json();

  // Validation: title and text must both contain at least three characters
  if (!body.title || body.title.trim().length < 3) {
    return c.json({
      error: "Question title must contain at least three characters",
    }, 400);
  }

  if (!body.text || body.text.trim().length < 3) {
    return c.json({
      error: "Question text must contain at least three characters",
    }, 400);
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
