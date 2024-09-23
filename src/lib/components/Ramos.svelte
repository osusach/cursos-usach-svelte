<script lang="ts">
  import Filters from './Filters.svelte';

	import RamoComponent from './RamoComponent.svelte';

	import { page_size, selectedCareer, selectedFaculty } from '$lib';

	import type { Course } from '$lib/types';

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
