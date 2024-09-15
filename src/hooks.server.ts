import { SvelteKitAuth } from '@auth/sveltekit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';
import Google from '@auth/core/providers/google';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
	callbacks: {
		jwt: async ({ token, account }) => {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		session: async ({ session, token }) => {

			session.user.id = token.sub;
			session.accessToken = token.accessToken;
			return session;
		}
	},
	session: {
		strategy: 'jwt'
	}
});
