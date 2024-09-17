import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	let token = cookies.get('access-token');
	const user = await fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify({ token })
	})
		.then((response) => {
			if (!response.ok) return undefined;
			return response.json();
		})
		.catch((e) => {
			console.error(e);
		});
	return { session: user };
};
