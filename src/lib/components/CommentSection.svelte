<script lang="ts">
	import CommentComponent from './CommentComponent.svelte';
	import PaginationController from './PaginationController.svelte';
	import WriteComment from './WriteComment.svelte';

	import { page_size } from '$lib';
	import type { Comment, Course, User } from '$lib/types';

	export let course: Course;
	export let user: User;
	export let comments: Comment[];
	let content: string;
	let sending_comment: boolean = false;

	async function sendComment(parent_id: number) {
		console.log('send');

		sending_comment = true;
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
		content = '';
		sending_comment = false;
	}

	let page = 0;
</script>

<WriteComment
	{sending_comment}
	{user}
	bind:content
	click={() => {
		sendComment(1);
	}}
></WriteComment>

<PaginationController bind:page array_length={20} />
<div class="flex flex-col gap-4 p-4">
	{#each comments.slice(page * page_size, (page + 1) * page_size).toReversed() as comment}
		<CommentComponent {comment} bind:comments {course} {sendComment} {user}></CommentComponent>
	{/each}
</div>
