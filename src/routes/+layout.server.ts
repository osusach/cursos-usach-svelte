import axios from 'axios';

export const load = async ({ locals, cookies, fetch }) => {
	let loginResponse;
	let session = await locals.auth();
	let token;
	token = cookies.get('authjs.session-token');

	if (session) {
		loginResponse = await fetch('https://osusachdb.ignacioladal.workers.dev/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: token
			})
		})
			.then((response) => {
				console.log(response);

				if (!response.ok) return { payload: undefined };
				return response.json();
			})
			.then((data) => data.payload);

		console.log(loginResponse ?? 'no auth');
	}

	return {
		session,
		token,
		loginResponse
	};
};
