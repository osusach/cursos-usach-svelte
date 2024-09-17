declare global {
	interface Window {
		google: typeof google;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

function initialize(options: {
	client_id: string;
	callback: (response: CredentialResponse) => void;
	auto_prompt: boolean;
	hd: string;
	login_hint: string;
}): void;

function renderButton(parent: HTMLElement, options: { theme: string; size: string }): void;

function prompt(): void;
