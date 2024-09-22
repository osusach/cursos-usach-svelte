<script lang="ts">
	import { page_size, selectedCourse } from '$lib';

	import type { Course } from '$lib/types';

	import PaginationController from './PaginationController.svelte';
	import RatingBadge from './RatingBadge.svelte';

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

<span class="divider divider-primary px-12 text-2xl font-semibold">CURSOS</span>

<div class="mx-auto mt-8 grid grid-flow-row justify-center gap-4 lg:grid-flow-col lg:gap-12">
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
	><PaginationController bind:page bind:array_length />
</div>

<div class="flex flex-wrap justify-center gap-4 p-4 lg:gap-12 lg:p-12">
	{#each filteredCourses.slice(page * page_size, (page + 1) * page_size) as item}
		<a
			href={'/' + item.id}
			on:click={() => {
				selectedCourse.set(item);
			}}
			class="flex h-32 w-80 flex-col items-center justify-between rounded-box bg-primary p-4 text-primary-content transition-transform hover:bg-primary/75 active:scale-95"
		>
			<div class="flex items-center gap-2 font-semibold">
				<span class="iconify size-5 mingcute--comment-line"></span>
				<p>
					{item.vote_count}
				</p>
			</div>
			<p class="line-clamp-1 font-bold">{item.name}</p>

			<div class="grid grid-cols-2 grid-rows-1 gap-4 text-lg font-semibold">
				<RatingBadge icon="mingcute--skull-fill" value={item.difficulty_mean} />
				<RatingBadge icon="mingcute--time-fill" value={item.time_demand_mean} />
			</div>
		</a>
	{/each}
</div>
