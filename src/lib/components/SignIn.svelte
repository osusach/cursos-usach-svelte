<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageData } from '../../routes/$types';
	export let data: PageData;

	console.log(data.session);
</script>

{#if data.session}
	<button
		class="btn btn-secondary col-span-2 text-lg shadow-xl"
		on:click={() => {
			signOut();
		}}
	>
		<span class="inline-flex font-semibold gap-4">
			<img
				class="size-7 mask mask-squircle"
				src={data.session?.user?.image ?? '/logo_transparent.png'}
				alt="User Avatar"
			/>
			<p>{data.session.user?.name ?? 'Usuario'}</p>
		</span>
		<span class="divider divider-horizontal divider-neutral my-2"></span>
		<p>
			Salir
		</p>
	</button>
{:else}
	<button
		class="btn btn-secondary col-span-2"
		on:click={() => {
			signIn('google');
		}}
	>
		<span> Inicia sesión con Google </span><span class="iconify size-6 mingcute--google-fill"
		></span>
	</button>
{/if}
