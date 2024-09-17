<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;

	let is_logged = data.session !== undefined;

	function renderGSI() {
		//@ts-ignore
		window.google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			callback: async (params: { credential: string }) => {
				data.session = await fetch('/api/login', {
					method: 'POST',
					body: JSON.stringify({ token: params.credential })
				}).then(async (response) => {
					if (!response.ok) return undefined;
					return response.json();
				});
				is_logged = data.session !== undefined;
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

	<div class="place-self-center lg:col-span-2" class:hidden={is_logged}>
		<div id="buttonDiv"></div>
	</div>
	<button
		class:hidden={!is_logged}
		class={$$props.class}
		on:click={async () => {
			await fetch('/api/login');
			data.session = undefined;
			is_logged = false;
			renderGSI()
		}}
	>
		<span class="inline-flex gap-2 font-semibold sm:gap-4">
			<img
				class="mask mask-squircle size-7"
				src={data.session?.profile_img ?? '/logo_transparent.png'}
				alt="User Avatar"
			/>
			<p class="line-clamp-1 w-[15ch] sm:w-fit">{data.session?.name ?? 'Usuario'}</p>
		</span>
		<span class="divider divider-neutral divider-horizontal mx-0 my-2"></span>
		<p>Salir</p>
	</button>
