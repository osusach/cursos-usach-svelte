<script lang="ts">
	import { page_size, max_pagination_size, range } from '$lib';

	export let page = 0;
	export let array_length = 5;
	export let button_class = 'btn btn-secondary btn-sm w-12';
	$: console.log(array_length);

	$: max_value = Math.ceil(array_length / page_size) - 1;

	function updatePagination(page: number, array_length: number) {
		let pagination_size = Math.min(max_value + 1, max_pagination_size);
		let array_start = page - 1;

		if (array_start + pagination_size > max_value) array_start = max_value - pagination_size + 1;
		if (page == 0) array_start += 1;
		console.log(pagination_size, array_start);

		if (pagination_size < 1 && array_start == 0) return range(1, 0);

		return range(pagination_size, array_start);
	}
	$: array = updatePagination(page, array_length);
</script>

<div class="grid grid-flow-col gap-4 w-fit mx-auto">
	<button
		class={button_class}
		on:click={() => {
			page = 0;
		}}
		disabled={page - 1 < 0}
	>
		<span class="iconify size-6 mingcute--arrows-left-fill"></span>
	</button>

	{#each array as pageNumber}
		<button
			class={button_class}
			on:click={() => {
				page = pageNumber;
			}}
			disabled={page == pageNumber}
		>
			{pageNumber + 1}
		</button>
	{/each}

	<button
		class={button_class}
		on:click={() => {
			page = max_value;
		}}
		disabled={page + 1 > max_value}
	>
		<span class="iconify size-6 mingcute--arrows-right-fill"></span>
	</button>
</div>
