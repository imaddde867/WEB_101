const handleRequest = (request) => {
	return new Response("Hello World!");
}
Deno.serve(handleRequest);
