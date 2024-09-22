import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const career_id = params.id;
	console.log(career_id == '0');

	const courses = await fetch(
		API_URL + (career_id != '0' ? `/courses?career_id=${career_id}` : '/courses')
	)
		.then((response) => {
			console.log(response);

			if (!response.ok) return { courses: [] };
			return response.json();
		})
		.then((data) => {
			return data.courses;
		});

	return json(courses);
};
