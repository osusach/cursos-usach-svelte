import { API_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, params, setHeaders }) => {
	const { id } = params;
	const token = cookies.get('access-token');

	const user = await fetch('/api/login', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			if (!response.ok) return undefined;
			return response.json();
		})
		.catch((e) => {
			console.error(e);
		});

	const can_vote = fetch(API_URL + `/courses/can_vote/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${user?.token}`
		}
	})
		.then((response) => {
			if (!response.ok) return { can_vote: false };
			return response.json();
		})
		.then((data) => data.can_vote)
		.catch((e) => {
			console.error(e);
		});


	return { session: user, can_vote: await can_vote };
};