<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<button
	class="btn btn-secondary col-span-2"
	on:click={() => {
		if ($page.data.session) {
			signOut();
		} else {
		}
		signIn('google');
	}}
>
	{#if $page.data.session}
		<span>
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</span>
		<span>Sign out</span>
	{:else}
		<span>You are not signed in</span>
		<span> Sign In with Google </span><span class="iconify mingcute--google-fill size-6"></span>
	{/if}
</button>
