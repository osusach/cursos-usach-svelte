import { browser } from '$app/environment';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const course_id: string = params.id;
	const { session, token } = await parent();

	const votes = await fetch(
		`https://osusachdb.ignacioladal.workers.dev/courseVote/byCourse/${course_id}`
	).then(async (data) => {
		if (!data.ok) return null;
		const response = await data.json();
		return response.payload;
	});
	return {
		course_id,
		votes,
		session,
		token
	};
};
