<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let session;

	function renderGSI() {
		//@ts-ignore
		window.google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			callback: async (params: { credential: string }) => {
				session = await fetch('/api/login', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${params.credential}`
					}
				}).then(async (response) => {
					if (!response.ok) return undefined;
					invalidateAll();
					return response.json();
				});
			},
			auto_prompt: false,
			hd: 'usach.cl'
		});
		//@ts-ignore
		window.google.accounts.id.renderButton(document.getElementById('buttonDiv')!, {
			theme: 'outline',
			size: 'large',
			type: 'standard',
			text: 'signin_with',
			shape: 'rectangular'
		});
	}

	onMount(renderGSI);
</script>

<div class="place-self-center lg:col-span-2">
	<div id="buttonDiv"></div>
</div>
