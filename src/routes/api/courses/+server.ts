import { error, json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { page_size } from '$lib';

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

	const comments = await fetch(
		API_URL +
			'/courseComments?' +
			new URLSearchParams({
				course_id: course_id,
				page: '0',
				page_size: page_size.toString()
			}).toString(),
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
		.then((response) => {
			if (!response.ok) {
				return { comments: [] };
			}
			return response.json();
		})
		.then((data) => {
			return data.comments;
		});

	return json({ course, comments });
};
