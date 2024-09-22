<script lang="ts">
	import { selectedCareer } from '$lib';
	import type { Career } from '$lib/types';

	export let careers: Career[] = [];
	export let getCourses = () => {};
</script>

<select
	{...$$restProps}
	name="career"
	id="career"
	bind:value={$selectedCareer}
	on:change={getCourses}
>
	<option value="" disabled>Selecciona tu carrera</option>
	{#each careers as career}
		<option value={career.id}>{career.id} - {career.name}</option>
	{/each}
</select>
