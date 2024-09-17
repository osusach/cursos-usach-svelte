import { error, json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { course_id, token } = await request.json();

	const course = await fetch(API_URL + `/courses/${course_id}`)
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.course;
		});
	console.log('-------------------');
	console.log(course);
	const comments = await fetch(API_URL + `/courseComments?course_id=${course_id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			if (!response.ok) {
				return undefined;
			}
			return response.json();
		})
		.then((data) => {
			return data;
		});
	console.log('-------------------');
	console.log(comments);

	return json({ course, comments });
};
