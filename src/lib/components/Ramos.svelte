<script lang="ts">
	import type { Course } from '$lib/types';
	import RatingBadge from './RatingBadge.svelte';
	export let courses: Course[] = [];
</script>

<span class="divider divider-primary px-12 text-2xl font-semibold">CURSOS</span>
<div class="flex w-full mx-auto gap-12 justify-center mt-8">
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
	{#each courses.slice(0, 100) as item}
		<button
			class="flex flex-col w-80 h-32 justify-between items-center bg-primary text-primary-content p-4 rounded-xl hover:bg-primary/75 active:scale-95 transition-transform"
		>
			<div class="flex items-center gap-2 font-semibold">
				<span class="iconify mingcute--comment-line size-6"></span>
				<p>
					{item.id}
				</p>
			</div>
			<p class="font-bold">{item.name}</p>

			<div class="grid grid-cols-2 grid-rows-1 text-lg font-semibold gap-4">
				<RatingBadge icon="mingcute--skull-fill" value={item.difficulty_mean} />
				<RatingBadge icon="mingcute--time-fill" value={item.time_demand_mean} />
			</div>
		</button>
	{/each}
</div>
