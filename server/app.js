import { Hono } from "jsr:@hono/hono@4.6.5";

const app = new Hono();

app.get("/", async (c) => {
  return c.html(`<!DOCTYPE html>
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
    <h1>Details</h1>
    <form method="POST" action="/details">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" />
      <br />
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" />
      <br />
      <label for="nickname">Nickname:</label>
      <input type="text" name="nickname" id="nickname" />
      <br />
      <label for="yearOfBirth">Year of birth:</label>
      <input type="number" name="yearOfBirth" id="yearOfBirth" />
      <br />
      <label for="color">Favorite color:</label>
      <input type="color" name="color" id="color" />
      <br />
      <input type="submit" value="Submit details" />
    </form>
  </body>
</html>`);
});

Deno.serve(app.fetch);