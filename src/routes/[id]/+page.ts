import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent, data }) => {
	await parent();
	const { session } = data;
	const course_id: string = params.id;

	const { course, comments } = await fetch('/api/courses', {
		method: 'POST',
		body: JSON.stringify({
			course_id,
			token: session?.token
		})
	}).then((response) => {
		if (!response.ok) return { course: undefined, comments: undefined };
		return response.json();
	});

	return {
		course_id,
		comments,
		course,
		session
	};
};
