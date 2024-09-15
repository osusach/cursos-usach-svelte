import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const faculty_id = params.id;

	const faculty = await fetch(API_URL + `/careers/byFaculty/${faculty_id}`)
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.payload;
		});
	console.log('-------------------');
	console.log(faculty);

	return new Response(String(faculty));
};
