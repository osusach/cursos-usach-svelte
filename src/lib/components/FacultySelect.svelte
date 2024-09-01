<script lang="ts">
	import type { Faculty } from '$lib/types';

	export let faculties: Faculty[] = [];
	export let selectedFaculty = '';
	export let getCareers = () => {};
</script>

<select class="select select-primary" name="faculty" id="faculty" bind:value={selectedFaculty} on:change={getCareers}>
	<option value="" disabled>Selecciona tu facultad</option>
	{#each faculties as faculty}
		<option value={faculty.id}>{faculty.name}</option>
	{/each}
</select>
