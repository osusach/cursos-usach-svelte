<script lang="ts">
	export let course: Course;
	export let user: User;
	export let comment: CourseComment;
	export let user_id: number = 0;
	export let sendComment: (parent_id: number) => void;
	let content: string;
	let parent_id: number = 1;
	let sending_comment: boolean = false;
	let sending_vote: boolean = false;

	async function voteComment(vote: number) {
		sending_vote = true;
		await fetch('/api/comments/vote', {
			method: 'POST',
			headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment_id: comment.id, course_id: course.id, vote })
		});
		sending_vote = false;
		comment.upvotes += vote;
	}
	async function deleteComment(comment_id: number) {
		await fetch('/api/comments/vote', {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment_id: comment.id, course_id: course.id })
		});
	}
</script>

<div class="flex flex-row rounded-xl bg-base-300 text-base-content">
	<img
		src={comment.user_profile_img}
		alt="user img"
		class="mask mask-squircle m-4 mr-0 size-8 sm:size-16"
	/>
	<div class="flex grow flex-col gap-4 p-4 sm:text-lg">
		<p class="font-semibold">
			{comment.user_name}
		</p>
		<p class="w-full whitespace-normal break-all">{comment.content}</p>
		{#if comment.reply_count !== 0}
			<p class="w-full whitespace-normal break-all">
				{comment.reply_count} respuestas
			</p>
		{/if}
		<div class="grid w-14 grid-flow-col gap-2">
			<button
				disabled={sending_vote}
				class="btn btn-xs"
				class:btn-success={comment.is_already_voted}
				on:click={() => {
					voteComment(-1);
				}}>-</button
			>
			<button
				disabled={sending_vote}
				class="btn btn-xs"
				class:btn-success={comment.is_already_voted}
				on:click={() => {
					voteComment(0);
				}}>{comment.upvotes}</button
			>
			<button
				disabled={sending_vote}
				class="btn btn-xs"
				class:btn-success={comment.is_already_voted}
				on:click={() => {
					voteComment(1);
				}}>+</button
			>
			<button class="btn btn-secondary btn-xs">Responder</button>
			{#if comment.user_id == user_id}
				<button
					class="btn btn-error btn-xs"
					on:click={() => {
						deleteComment(comment.id);
					}}>Borrar comentario</button
				>
			{/if}
		</div>
	</div>
</div>
