import { error, json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { page_size } from '$lib';

export const GET: RequestHandler = async ({ request, url }) => {
	const course_id = url.searchParams.get('id') ?? '';
	const token = request.headers.get('Authorization') ?? '';

	const course = fetch(API_URL + `/courses/${course_id}`)
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.course;
		});

	const comments = fetch(
		API_URL +
			'/courseComments?' +
			new URLSearchParams({
				course_id,
				page: '0',
				page_size: page_size.toString()
			}).toString(),
		{
			method: 'GET',
			headers: {
				Authorization: `${token}`
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

	return json({ course: await course, comments: await comments });
};

export const POST: RequestHandler = async ({ request }) => {
	const { course_id, difficulty_score, time_demand_score } = await request.json();
	const token = request.headers.get('Authorization') ?? '';
	return await fetch(API_URL + '/courses/vote', {
		method: 'POST',
		headers: {
			Authorization: `${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			course_id,
			difficulty_score,
			time_demand_score
		})
	});
};
