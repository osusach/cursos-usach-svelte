import { json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { page_size } from '$lib';

export const GET: RequestHandler = async ({ request }) => {
    console.log("GET COMM");
	const { course_id, parent_id, content } = await request.json();
	const token = request.headers.get('Authorization');

	const comments = await fetch(API_URL + '/courseComments?', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			course_id,
			parent_id,
			content
		})
	})
		.then((response) => {
			console.log(response);

			if (!response.ok) {
				return undefined;
			}
			return response.json();
		})
		.then((data) => {
			return data;
		});

	return json({ comments });
};

export const POST: RequestHandler = async ({ request, fetch }) => {
    console.log("POST COMM");
	const { course_id, parent_id, content } = await request.json();
	const token = request.headers.get('Authorization');

	await fetch(API_URL + '/courseComments', {
		method: 'POST',
		headers: {
			Authorization: `${token}`
		},
		body: JSON.stringify({
			course_id,
			parent_id,
			content
		})
	}).then(async (response) => {
		console.log(response);
		if (!response.ok) return response;
		return response.json();
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
				Authorization: `${token}`
			}
		}
	)
		.then((response) => {
			console.log(response);
			if (!response.ok) {
				return undefined;
			}
			return response.json();
		})
		.then((data) => {			
			return data?.comments;
		});

	return json({ comments });
};
