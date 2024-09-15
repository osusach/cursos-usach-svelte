import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
	// const course_id: string = params.id;

	// const { session, token } = await parent();

	// const { course, comments } = fetch('/api/course', {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		token,
	// 		course_id
	// 	})
	// });
	// .then((response) => {
	// 	if (!response.ok) return { payload: undefined };
	// 	return response.json();
	// })

	// const course = fetch(PUBLIC_API_URL + `/courses/${course_id}`)
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			return { payload: undefined };
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((data) => data.payload);

	// return {
	// 	course_id,
	// 	session,
	// 	comments: comments,
	// 	course: course
	// };
};
