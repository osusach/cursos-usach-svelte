<script lang="ts">
	export let icon: string;
	export let value: number;
</script>

<div
	class="inline-flex items-center gap-2 p-1 rounded-lg"
	class:bg-error={value > 4}
	class:bg-warning={4 >= value && value > 2}
	class:bg-info={2 >= value}
>
	<span class={`iconify ${icon} size-6`}></span>
	<p>
		{value.toFixed(1)}
	</p>
</div>
