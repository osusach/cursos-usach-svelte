import { API_URL } from '$env/static/private';

export const load = async ({ locals, cookies, fetch }) => {
	let loginResponse;
	let session = await locals.auth();
    
	console.log(session);
    console.log();
    

	let token = cookies.get('authjs.session-token');

	if (session) {
		console.log('token');
		console.log(token);

		loginResponse = await fetch(API_URL + '/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token ?? ''}`
			}
		})
			.then((response) => {
				console.log(response);

				if (!response.ok) return { payload: undefined };
				return response.json();
			})
			.then((data) => data.payload)
			.catch((e) => {
				console.error(e);
			});

		console.log(loginResponse ?? 'no auth');
	}

	return {
		session,
		loginResponse
	};
};
