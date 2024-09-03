import type { PageLoad } from './$types';
import { selectedCourse } from '$lib';

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const course_id: string = params.id;

	if (selectedCourse) {
	}

	const { session, token } = await parent();

	const comments = fetch('https://osusachdb.ignacioladal.workers.dev/courseComment/getComments', {
		method: 'POST',
		body: JSON.stringify({
			token,
			course_id
		})
	})
		.then((response) => {
			if (!response.ok) return { payload: undefined };
			return response.json();
		})
		.then((data) => data.payload);

	const votes = fetch(`https://osusachdb.ignacioladal.workers.dev/courseVote/byCourse/${course_id}`)
		.then((response) => {
			if (!response.ok) return { payload: undefined };
			return response.json();
		})
		.then((data) => data.payload);

	return {
		course_id,
		votes: await votes,
		session,
		token,
		comments: await comments
	};
};
