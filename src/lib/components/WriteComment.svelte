<script lang="ts">
	import type { Course, User } from '$lib/types';

	export let user: User;
	export let content = '';
	export let click;
</script>

<div class="m-4 flex flex-row rounded-xl bg-base-300 text-base-content">
	<img
		src={user?.profile_img}
		alt="user img"
		class="mask mask-squircle m-4 mr-0 size-8 sm:size-16"
	/>
	<span class="w-full p-4">
		<p class="text-lg font-semibold">{user?.name}</p>
		<div class="flex flex-col gap-y-4">
			<label class="form-control" for="w-comment">
				<div class="label label-text">Escribe un comentario!</div>
				<textarea
					class="textarea textarea-bordered textarea-sm h-24 w-full resize-none leading-snug"
					placeholder="Escribe un comentario!"
					name="content"
					id="w-comment"
					bind:value={content}
				></textarea>
			</label>
			<button
				class="btn btn-success" on:click={click}>Enviar comentario</button
			>
		</div>
	</span>
</div>
