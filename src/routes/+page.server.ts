import type { PageServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	let token = cookies.get('access-token');

	const user = fetch('/api/login', {
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

	const faculties = fetch(API_URL + '/faculties')
		.then((response) => {
			if (!response.ok) return { payload: [] };
			return response.json();
		})
		.then((data) => data.faculties)
		.catch((e) => {
			console.error(e);
		});

	const courses: Promise<Course[]> = fetch(API_URL + '/courses')
		.then((response) => {
			if (!response.ok) return { courses: [] };
			return response.json();
		})
		.then((data) => data.courses)
		.catch((e) => {
			console.error(e);
		});

	return {
		faculties: await faculties,
		courses: courses,
		session: await user
	};
};
