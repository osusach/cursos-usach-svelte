import { json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { page_size } from '$lib';

export const POST: RequestHandler = async ({ request, fetch }) => {
	console.log('POST VOTE');

	const { comment_id, course_id, vote } = await request.json();
	const token = request.headers.get('Authorization');
	console.log(comment_id);
	console.log(
		JSON.stringify({
			comment_id,
			vote
		})
	);
	console.log(vote);
	console.log(token);

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
