import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { course_id, token } = await request.json();

	const course = await fetch(API_URL + `/courses/${course_id}`)
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.payload;
		});
	console.log('-------------------');
	console.log(course);
	// const comments = await fetch(API_URL + '/courseComments', {
	// 	method: 'GET',
	// 	body: JSON.stringify({
	// 		course_id,
	// 		page: 0,
	// 		page_size: 10
	// 	})
	// })
	// 	.then((response) => {
	// 		if (!response.ok) error(response.status, response.statusText);
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		return data.payload;
	// 	});
	// console.log('-------------------');
	// console.log(course);

	return new Response(String({ course }));
};
