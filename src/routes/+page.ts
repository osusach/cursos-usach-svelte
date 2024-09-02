import type { PageLoad } from './$types';
import type { Course, Faculty } from '$lib/types';

export const load: PageLoad = async ({
	fetch
}): Promise<{ faculties: Faculty[]; courses: Course[] }> => {
	const faculties = await fetch(
		'https://osusachdb.ignacioladal.workers.dev/faculties/allFaculties'
	).then(async (response) => {
		if (!response.ok) return [];
		try {
			const data = await response.json();
			return data.payload;
		} catch (e) {
			console.log(e);
			return e;
		}
	});

	const courses = await fetch('https://osusachdb.ignacioladal.workers.dev/courses/1').then(
		async (response) => {
			if (!response.ok) return [];
			try {
				const data = await response.json();
				return data.payload;
			} catch (e) {
				console.log(e);
				return e;
			}
		}
	);

	return {
		faculties,
		courses
	};
};
