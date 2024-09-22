import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const career_id = params.id;

	const courses = await fetch(API_URL + `/courses?career_id=${career_id}`, {
		method: 'GET'
	})
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.courses;
		});

	return json(courses);
};
