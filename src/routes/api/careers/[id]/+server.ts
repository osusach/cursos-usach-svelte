import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const faculty_id = params.id;

	const careers = await fetch(API_URL + `/careers?faculty_id=${faculty_id}`)
		.then((response) => {
			if (!response.ok) return { careers: [] };
			return response.json();
		})
		.then((data) => {
			return data.careers;
		});

	return json(careers);
};
