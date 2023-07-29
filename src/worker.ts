import jacobBlob from "./jacob.png";

export default {
	async fetch(request: Request, env: Env) {


		await env.MY_BUCKET.put("jacob", new File([jacobBlob], "jacob").stream());


		// Retrieve the key "image.png"
		const object = await env.MY_BUCKET.get('jacob');

		if (object === null) {
			return new Response('Object Not Found', { status: 404 });
		}

		const headers = new Headers();
		object.writeHttpMetadata(headers);
		headers.set('etag', object.httpEtag);

		return new Response(object.body, {
			headers,
		});
	},
};