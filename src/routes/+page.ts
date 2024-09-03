import type { PageLoad } from './$types';
import type { Course, Faculty } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	const faculties = fetch('https://osusachdb.ignacioladal.workers.dev/faculties/allFaculties')
		.then((response) => {
			if (!response.ok) return { payload: [] };
			return response.json();
		})
		.then((data) => data.payload);
	const courses = fetch('https://osusachdb.ignacioladal.workers.dev/courses/1')
		.then((response) => {
			if (!response.ok) return { payload: [] };
			return response.json();
		})
		.then((data) => data.payload);

	return {
		faculties: await faculties,
		courses: await courses
	};
};
