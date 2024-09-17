<script lang="ts">
	export let comments;
	export let user;
</script>

<div class="m-4 flex flex-row rounded-xl bg-base-300 text-base-content">
	<img src={user?.profile_img} alt="user img" class="mask mask-squircle m-4 mr-0 size-8 sm:size-16" />
	<span class="w-full p-4">
		<p class="text-lg font-semibold">{user?.name}</p>
		<div class="flex flex-col gap-y-4">
			<label class="form-control" for="w-comment">
				<div class="label label-text">Escribe un comentario!</div>
				<textarea
					class="textarea textarea-bordered textarea-sm h-24 w-full resize-none leading-snug"
					placeholder="Escribe un comentario!"
					name="write"
					id="w-comment"
				></textarea>
			</label>
			<button class="btn btn-success">Enviar comentario</button>
		</div>
	</span>
</div>

<div class="flex flex-col gap-4 p-4">
	{#each comments as comment}
		<div class="flex flex-row rounded-xl bg-base-300 text-base-content">
			<img src={user?.profile_img} alt="user img" class="mask mask-squircle m-4 mr-0 size-8 sm:size-16" />
			<span class="p-4">
				<p class="text-lg font-semibold">{user?.name}</p>
				<p class="w-full whitespace-normal break-all text-lg">{comment}</p>
			</span>
		</div>
	{/each}
</div>
