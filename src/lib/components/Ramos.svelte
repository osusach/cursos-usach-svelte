<script lang="ts">
	import Filters from './Filters.svelte';

	import RamoComponent from './RamoComponent.svelte';

	import { page_size, selectedCareer, selectedFaculty, selectedFilter } from '$lib';

	import PaginationController from './PaginationController.svelte';

	export let courses: Course[];
	export let search: string;

	let page = 0;
	let array_length = courses.length;
	let filteredCourses: Course[] = courses;

	function coruseFilters(courses: Course[], search: string) {
		filteredCourses = courses;
		if (search != '') {
			let lower_search = search.toLowerCase();
			filteredCourses = courses.filter((item) => item.name.toLowerCase().includes(lower_search));
		}

		switch ($selectedFilter) {
			case 'difficulty':
				courses = courses.sort((a, b) => {
					return b.difficulty_mean - a.difficulty_mean;
				});
				break;

			case 'time':
				courses = courses.sort((a, b) => {
					return b.time_demand_mean - a.time_demand_mean;
				});
				break;
			default:
				break;
		}
		array_length = filteredCourses.length;
		page = 0;
	}
	$: coruseFilters(courses, search);
</script>

<PaginationController bind:page bind:array_length />

<div class="flex flex-wrap justify-center gap-4 p-4 lg:gap-12 lg:p-12">
	{#each filteredCourses.slice(page * page_size, (page + 1) * page_size) as item}
		<RamoComponent course={item}></RamoComponent>
	{/each}
</div>
