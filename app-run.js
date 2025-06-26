import handleRequest from "./app.js";

Deno.serve({ port: 8000 }, handleRequest);
