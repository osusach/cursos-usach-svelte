import { writable } from 'svelte/store';

function createLoginInfo() {
	const { subscribe, set, update } = writable({ jwt: '', islogged: false, name: '', picture: '' });

	return {
		subscribe,
		login: (newCred: string, name: string, picture: string) => set({ jwt: newCred, islogged: true, name: name, picture: picture  }),
		logout: () => set({ jwt: '', islogged: false, name: '', picture: ''  })
	};
}

export const loginInfo = createLoginInfo();
