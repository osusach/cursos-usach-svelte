import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { token } = await request.json();

	const user = await fetch(API_URL + '/users/login', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then((response) => {
		if (!response.ok) {
			cookies.delete('access-token', { path: '/' });
			return undefined;
		}
		cookies.set('access-token', token, { path: '/' });
		return response.json();
	});
	console.log('=============user==================');
	console.log(user);
	if (user) return json(user);
	return json({}, { status: 401, statusText: 'Bad token' });
};

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('access-token', { path: '/' });
	return json({}, { status: 200, statusText: 'logout' });
};
