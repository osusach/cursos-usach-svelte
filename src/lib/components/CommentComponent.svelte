<script lang="ts">
	import type { Comment, Course, User } from '$lib/types';

	export let course: Course;
	export let user: User;
	export let comments: Comment[];
	export let comment: Comment;
	export let sendComment: (parent_id: number) => void;
	let content: string;
	let parent_id: number = 1;
	let sending_comment: boolean = false;
	let sending_vote: boolean = false;

	async function voteComment(vote: number) {
		console.log('vote');

		sending_vote = true;
		await fetch('/api/comments/vote', {
			method: 'POST',
			headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment_id: comment.id, course_id: course.id, vote })
		});
		sending_vote = false;
		comment.upvotes += vote;
	}
</script>

<div class="flex flex-row rounded-xl bg-base-300 text-base-content">
	<img
		src={comment.user_profile_img}
		alt="user img"
		class="mask mask-squircle m-4 mr-0 size-8 sm:size-16"
	/>
	<div class="grow p-4 flex flex-col gap-4 sm:text-lg">
		<p class="font-semibold">
			{comment.user_name}
		</p>
		<p class="w-full whitespace-normal break-all">{comment.content}</p>
		{#if comment.reply_count !== 0}
			<p class="w-full whitespace-normal break-all">
				{comment.reply_count} respuestas
			</p>
		{/if}
		<div class="grid grid-flow-col gap-2">
			<button
				disabled={sending_vote}
				class="btn btn-sm"
				class:btn-success={comment.is_already_voted}
				on:click={() => {
					voteComment(1);
				}}>+</button
			>
			<button
				disabled={sending_vote}
				class="btn btn-sm"
				class:btn-success={comment.is_already_voted}
				on:click={() => {
					voteComment(0);
				}}>{comment.upvotes}</button
			>
			<button
				disabled={sending_vote}
				class="btn btn-sm"
				class:btn-success={comment.is_already_voted}
				on:click={() => {
					voteComment(-1);
				}}>-</button
			>
		</div>
		<button class="">Responder</button>
	</div>
</div>
