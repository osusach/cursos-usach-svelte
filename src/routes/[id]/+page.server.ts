import { API_URL } from '$env/static/private';
import type { Comment, Course, User } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	params,
	fetch,
	cookies
}): Promise<{
	can_vote: boolean;
	session: User;
	course: Course;
	comments: Comment[];
}> => {
	const { id } = params;
	const token = cookies.get('access-token');

	const session = await fetch('/api/login', {
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
			Authorization: `Bearer ${session?.token}`
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

	const { course, comments } = await fetch(`/api/courses?id=${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session?.token}`
		}
	}).then((response) => {
		console.log(response);

		if (!response.ok) return { course: undefined, comments: undefined };
		return response.json();
	});

	return { session, can_vote: await can_vote, course, comments };
};
