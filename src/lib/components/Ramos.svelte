<script lang="ts">
	import { selectedCourse } from '$lib';
	import type { Course } from '$lib/types';
	import RatingBadge from './RatingBadge.svelte';
	export let courses: Course[] = [];
	let page = 0;
</script>

<span class="divider divider-primary px-12 text-2xl font-semibold">CURSOS</span>

<div class="mx-auto mt-8 grid grid-flow-col justify-center gap-12">
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

<div class="flex flex-wrap justify-center gap-12 p-12">
	{#each courses.slice(page, page + 50) as item}
		<a
			href={'/' + item.id}
			on:click={() => {
				selectedCourse.set(item);
			}}
			class="flex h-32 w-80 flex-col items-center justify-between rounded-box bg-primary p-4 text-primary-content transition-transform hover:bg-primary/75 active:scale-95"
		>
			<div class="flex items-center gap-2 font-semibold">
				<span class="iconify size-6 mingcute--comment-line"></span>
				<p>
					{item.vote_count}
				</p>
			</div>
			<p class="font-bold">{item.name}</p>

			<div class="grid grid-cols-2 grid-rows-1 gap-4 text-lg font-semibold">
				<RatingBadge icon="mingcute--skull-fill" value={item.difficulty_mean} />
				<RatingBadge icon="mingcute--time-fill" value={item.time_demand_mean} />
			</div>
		</a>
	{/each}
</div>
