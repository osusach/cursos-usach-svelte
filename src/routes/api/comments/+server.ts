import { json } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';
import { page_size } from '$lib';

export const GET: RequestHandler = async ({ request }) => {
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
			console.log(data);

			return data;
		});

	return json({ comments });
};

export const POST: RequestHandler = async ({ request, fetch }) => {
	const { course_id, parent_id, content } = await request.json();
	const token = request.headers.get('Authorization');
	console.log(course_id);
	console.log(content);
	console.log(parent_id);
	console.log(
		JSON.stringify({
			course_id,
			parent_id,
			content
		})
	);

	await fetch(API_URL + '/courseComments', {
		method: 'POST',
		headers: {
			Authorization: `${token}`,
			'Content-Type': 'application/json'
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
			if (!response.ok) {
				return undefined;
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			
			return data?.comments;
		});

	return json({ comments });
};
