<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;

	let loading = false;

	function renderGSI() {
		if (!browser) return;
		if (data.session !== undefined) return;
		//@ts-ignore
		window.google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			callback: async (params: { credential: string }) => {
				loading = true;
				data.session = await fetch('api/login', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${params.credential}`
					}
				}).then(async (response) => {
					if (!response.ok) return undefined;
					loading = false;
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

{#if data.session === undefined}
	{#if loading}
		<div class={$$props.class}>
			<span class="iconify svg-spinners--180-ring"></span>
		</div>
	{:else}
		<div class="place-self-center lg:col-span-2">
			<div id="buttonDiv"></div>
		</div>
	{/if}
{:else}
	<button
		class={$$props.class}
		on:click={async () => {
			await fetch('/api/login');
			await invalidateAll();
			renderGSI();
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
{/if}
