import type { PageLoad } from './$types';
import type { Course, Faculty } from '$lib/types';

export const load: PageLoad = async ({
	fetch,
	parent
}): Promise<{ faculties: Faculty[]; courses: Course[] }> => {
	const [faculties, courses] = await Promise.all([
		fetch('https://osusachdb.ignacioladal.workers.dev/faculties/allFaculties')
			.then((response) => {
				if (!response.ok) return { payload: [] };
				return response.json();
			})
			.then((data) => data.payload),
		fetch('https://osusachdb.ignacioladal.workers.dev/courses/1')
			.then((response) => {
				if (!response.ok) return { payload: [] };
				return response.json();
			})
			.then((data) => data.payload)
	]);

	return {
		faculties,
		courses
	};
};
