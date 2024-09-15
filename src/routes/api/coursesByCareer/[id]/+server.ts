import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
	const career_id = params.id;

	const course = await fetch(API_URL + '/courses/byCareer/', {
		method: 'GET',
		body: JSON.stringify({
			career_id,
			page: 0,
			page_size: 1
		})
	})
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.payload;
		});
	console.log('-------------------');
	console.log(course);
	const comments = await fetch(API_URL + '/courses/byCareer/', {
		method: 'GET',
		body: JSON.stringify({
			career_id,
			page: 0,
			page_size: 1
		})
	})
		.then((response) => {
			if (!response.ok) error(response.status, response.statusText);
			return response.json();
		})
		.then((data) => {
			return data.payload;
		});
	console.log('-------------------');
	console.log(course);

	return new Response(String({ course, comments }));
};
