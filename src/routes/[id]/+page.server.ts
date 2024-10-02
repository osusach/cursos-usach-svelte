import { API_URL } from '$env/static/private';
import { page_size } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	params,
	fetch,
	cookies
}): Promise<{
	can_vote: boolean;
	session: User;
	course: Course;
	getComments: (page: number) => Promise<any>;
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

	const course = fetch(`/api/courses?id=${id}`)
		.then((response) => {
			console.log(response);

			if (!response.ok) return { course: undefined };
			return response.json();
		})
		.then((data) => data.course);

	const getComments = (page: number) => {
		return fetch(
			'/api/comments' +
				new URLSearchParams({
					course_id: id,
					page: page.toString(),
					page_size: page_size.toString()
				}),
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${session?.token}`, 'Content-Type': 'application/json' }
			}
		)
			.then((response) => {
				if (!response.ok) return { comments: undefined };
				return response.json();
			})
			.then((data) => data.comments);
	};
	return { session, can_vote: await can_vote, course: await course, getComments };
};
