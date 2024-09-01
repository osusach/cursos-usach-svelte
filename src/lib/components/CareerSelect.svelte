<script lang="ts">
	import type { Career } from '$lib/types';

	export let careers: Career[] = [];
	export let selectedCareer: string = '';
	export let getCourses = () => {};
</script>

<select class="select select-primary" name="career" id="career" bind:value={selectedCareer} on:change={getCourses}>
	<option value="" disabled>Selecciona tu carrera</option>
	{#each careers as career}
		<option value={career.id}>{career.name}</option>
	{/each}
</select>
