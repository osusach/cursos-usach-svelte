<script lang="ts">
	import { selectedFaculty } from '$lib';
	import type { Faculty } from '$lib/types';

	export let faculties: Faculty[] = [];
	export let getCareers = () => {};
</script>

<select
	{...$$restProps}
	name="faculty"
	id="faculty"
	bind:value={$selectedFaculty}
	on:change={getCareers}
>
	<option value="" disabled>Selecciona tu facultad</option>
	{#each faculties as faculty}
		<option value={faculty.id}>{faculty.name}</option>
	{/each}
</select>
