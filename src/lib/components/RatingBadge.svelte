<script lang="ts">
	export let icon: string;
	export let value: number;
</script>

<div
	class="inline-flex items-center gap-1 rounded-badge px-2 py-1"
	class:bg-error={value > 4}
	class:bg-warning={4 >= value && value > 2}
	class:bg-info={2 >= value}
>
	<span class={`iconify ${icon} size-7`}></span>
	<p class="pr-1">
		{value.toFixed(1)}/5
	</p>
</div>
