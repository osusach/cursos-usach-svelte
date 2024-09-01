import type { PageLoad } from './$types';
import type { Course, Faculty } from '$lib/types';

export const load: PageLoad = async ({  }): Promise<{ faculties: Faculty[]; courses: Course[] }> => {
	return {
		faculties: await fetch('https://osusachdb.ignacioladal.workers.dev/faculties/allFaculties')
			.then((response) => response.json())
			.then((data) => {
				return data.payload;
			}),
		courses: []
		// courses: await fetch('https://osusachdb.ignacioladal.workers.dev/courses/1')
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		return data.payload;
		// 	})
	};
};
