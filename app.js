const handleRequest = (request) => {
	const url = new URL (request.url);
	const params = url.searchParams;
	if (url.pathname === ('/') && request.method === ('GET')) {
		return new Response ('Hi there!');
	} else if (url.pathname === ('/congrats') && request.method === ('GET')) {
	return new Response(`Congrats, ${params.get("heroOfTheDay")}!`);
	} else if (url.pathname === ('/lol') && request.method === ('DIDNOT')) {
	return new Response(`What kind of tree fits in your hand? A palm tree.`);
	} else {return new Response('Not here.')};
};

export default handleRequest;