import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const faculty_id = params.id;

	const careers = await fetch(API_URL + `/careers?faculty_id=${faculty_id}`)
		.then((response) => {
			console.log(response);

			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.careers;
		});
	console.log('-------------------');
	console.log(careers);

	return json(careers);
};