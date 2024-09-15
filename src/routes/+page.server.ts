import type { PageServerLoad } from './$types';
import type { Course, Faculty } from '$lib/types';
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
	const faculties = fetch(API_URL + '/faculties')
		.then((response) => {
			if (!response.ok) return { payload: [] };
			return response.json();
		})
		.then((data) => data.payload)
		.catch((e) => {
			console.error(e);
		});
	const courses: Promise<Course[]> = fetch(API_URL + '/courses')
		.then((response) => {
			// console.log(response);

			if (!response.ok) return { payload: [] };
			return response.json();
		})
		.then((data) => data.courses)
		.catch((e) => {
			console.error(e);
		});

	return {
		faculties: await faculties,
		courses: await courses
	};
};
