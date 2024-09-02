export const load = async ({ locals, cookies }) => {
	return {
		session: await locals.auth(),
		token: cookies.get('authjs.session-token')
	};
};
