import { Hono } from "jsr:@hono/hono@4.6.5";

const app = new Hono();

app.on("GET", "/", (c) => c.text("The starting point."));
app.on("POST", "/", (c) => c.text("Postman pat."));
app.on("GET", "/it", (c) => c.text("I think so."));
app.on("CAT", "/secrets", (c) => c.text("Meow!"));
app.on("WHATS", "/up", (c) => c.text("A movie!"));

export default app;
