import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	console.log('POST VOTE');

	const { comment_id, vote } = await request.json();
	const token = request.headers.get('Authorization');

	return await fetch(API_URL + '/courseComments/vote', {
		method: 'POST',
		headers: {
			Authorization: `${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			comment_id,
			vote
		})
	})

};
