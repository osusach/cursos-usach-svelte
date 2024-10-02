<script lang="ts">
	import CommentComponent from './CommentComponent.svelte';
	import PaginationController from './PaginationController.svelte';
	import WriteComment from './WriteComment.svelte';

	import { page_size } from '$lib';
	import InfiniteScroll from 'svelte-infinite-scroll';

	export let course: Course;
	export let user: User;
	export let getComments: any;
	let comments: CourseComment[] = [];
	let content: string;
	let sending_comment: boolean = false;

	async function sendComment(parent_id: number | null) {
		if (parent_id == 1) parent_id = null;
		sending_comment = true;
		comments = await getComments(page);
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

<div class="flex flex-col gap-4 p-4">
	{#each comments.toReversed() as comment}
		<CommentComponent {comment} {course} {sendComment} {user}></CommentComponent>
	{/each}
	<InfiniteScroll
		on:loadMore={async () => {
			const newComments = await getComments(page);
			comments = [...comments, newComments];
		}}
	/>
</div>
