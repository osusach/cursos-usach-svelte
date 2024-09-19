<script lang="ts">
	import { page_size } from '$lib';

	export let page = 0;
	export let array_length;
    export let button_class = "btn w-16 btn-secondary"
	let max_value = Math.ceil(array_length / page_size) - 1;
</script>

<div class="grid grid-flow-col gap-4">
	<button
		class={button_class}
		on:click={() => {
			page = 0;
		}}
	>
		1
	</button>
	<button
		class={button_class}
		on:click={() => {
			page -= 1;
		}}
		disabled={page - 1 < 0}
	>
		<span class="iconify mingcute--arrows-left-fill size-6"></span>
	</button>
	<p class={"btn-info " + button_class}>
		{page + 1}
	</p>
	<button
		class={button_class}
		on:click={() => {
			page += 1;
		}}
		disabled={page + 1 > max_value}
	>
		<span class="iconify mingcute--arrows-right-fill size-6"></span>
	</button>

	<button
		class={button_class}
		on:click={() => {
			page = max_value;
		}}
	>
		{max_value}
	</button>
</div>
