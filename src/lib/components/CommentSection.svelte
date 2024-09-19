<script lang="ts">
	import WriteComment from './WriteComment.svelte';

	import { page_size } from '$lib';
	import PaginationController from './PaginationController.svelte';
	import type { Course, User } from '$lib/types';

	export let course: Course;
	export let user: User;
	export let comments: any;
	let content: string;
	let parent_id: number = 1;

	comments = comments ?? [];

	async function sendComment() {
		comments = await fetch('/api/comments', {
			method: 'POST',
			headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ content, course_id: course.id, parent_id })
		})
			.then((response) => {
				if (!response.ok) return undefined;
				return response.json();
			})
			.then((data) => data.comments);
		content = ""
	}

	let page = 0;
	$: console.log(comments);
</script>

<WriteComment
	{user}
	bind:content
	click={() => {
		sendComment();
	}}
></WriteComment>

<PaginationController bind:page array_length={20} />
<div class="flex flex-col gap-4 p-4">
	{#key comments}
		{#each comments.slice(page * page_size, (page + 1) * page_size).toReversed() as comment}
			<div class="flex flex-row rounded-xl bg-base-300 text-base-content">
				<img
					src={comment.user_profile_img}
					alt="user img"
					class="mask mask-squircle m-4 mr-0 size-8 sm:size-16"
				/>
				<span class="p-4">
					<p class="text-lg font-semibold">{comment.user_name}</p>
					<p class="w-full whitespace-normal break-all text-lg">{comment.content}</p>
				</span>
			</div>
		{/each}
	{/key}
</div>
