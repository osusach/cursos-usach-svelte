import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const token = request.headers.get('Authorization') ?? '';

	const user = await fetch(API_URL + '/users/login', {
		method: 'POST',
		headers: {
			Authorization: token
		}
	}).then((response) => {
		// console.log(response);

		if (!response.ok) {
			console.log('BORRANDO COOKI');
			console.log(token);

			cookies.delete('access-token', { path: '/' });
			cookies.delete('user', { path: '/' });
			return undefined;
		}
		return response.json();
	});
	console.log('=============user==================');
	console.log(user);
	if (user) {
		cookies.set('access-token', token.substring(7), { path: '/' });
		cookies.set('user', JSON.stringify(user), { path: '/' });
		return json(user);
	} else {
		return json({}, { status: 401, statusText: 'Bad token' });
	}
};

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('access-token', { path: '/' });
	return json({}, { status: 200, statusText: 'logout' });
};
