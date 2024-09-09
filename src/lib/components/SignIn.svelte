<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageData } from '../../routes/$types';
	export let data: PageData;
	export let containerClass: string;

	console.log(data.session);
</script>

{#if data.session}
	<button
		class={containerClass}
		on:click={() => {
			signOut();
		}}
	>
		<span class="inline-flex gap-2 sm:gap-4 font-semibold">
			<img
				class="mask mask-squircle size-7"
				src={data.session?.user?.image ?? '/logo_transparent.png'}
				alt="User Avatar"
			/>
			<p class="w-[15ch] line-clamp-1 sm:w-fit ">{data.session.user?.name ?? 'Usuario'}</p>
		</span>
		<span class="divider divider-neutral divider-horizontal my-2 mx-0"></span>
		<p>Salir</p>
	</button>
{:else}
	<button
		class={containerClass}
		on:click={() => {
			signIn('google');
		}}
	>
		<span> Inicia sesión con Google </span><span class="iconify size-6 mingcute--google-fill"
		></span>
	</button>
{/if}
