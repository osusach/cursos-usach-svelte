import { error, json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { page_size } from '$lib';

export const GET: RequestHandler = async ({ request, url }) => {
	const course_id = url.searchParams.get('id') ?? '';

	const course = fetch(API_URL + `/courses/${course_id}`)
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.course;
		});

	return json({ course: await course });
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
