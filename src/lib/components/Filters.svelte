<script lang="ts">

	import { selectedCareer, selectedFaculty } from '$lib';

	import type { Course } from '$lib/types';


	export let getCourses;
	export let courses: Course[];
</script>


<div class="mx-auto my-4 grid grid-flow-row justify-center gap-4 sm:grid-flow-col sm:gap-12">
	<button
		class="btn btn-warning w-32"
		on:click={() => {
			selectedCareer.set('0');
			selectedFaculty.set('');
			getCourses()
		}}
	>
		clear filters
	</button>
	<button
		class="btn btn-warning w-32"
		on:click={() => {
			courses = courses.sort((a, b) => {
				return b.difficulty_mean - a.difficulty_mean;
			});
		}}>sort by difficulty</button
	>
	<button
		class="btn btn-warning w-32"
		on:click={() => {
			courses = courses.sort((a, b) => {
				return b.time_demand_mean - a.time_demand_mean;
			});
		}}>sort by time</button
	>
</div>

