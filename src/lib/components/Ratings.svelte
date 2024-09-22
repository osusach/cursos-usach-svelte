<script lang="ts">
	import type { Course } from '$lib/types';

	export let course: Course;
	export let type: 'difficulty' | 'time';

	let isType = type == 'time';
	let total = course.vote_count == 0 ? 1 : course.vote_count;

	
	$: votes = isType ? course.votes.time_demand_stats : course.votes.difficulty_stats;
	$: mean = isType ? course.time_demand_mean : course.difficulty_mean;
</script>

<div
	class={'flex w-full flex-col justify-between rounded-xl p-6 shadow-xl lg:flex-row ' +
		(isType ? ' bg-accent text-accent-content' : ' bg-primary text-primary-content')}
>
	<div class="col-span-2 flex w-full flex-col items-center">
		<div class="flex items-center gap-2">
			<h3 class="mb-2 text-3xl font-semibold">{isType ? 'Tiempo' : 'Dificultad'}</h3>
			<span
				class="iconify size-8 shadow-xl shadow-black"
				class:mingcute--time-fill={isType}
				class:mingcute--skull-fill={!isType}
			></span>
		</div>
		<div class="w-full rounded-lg p-4">
			{#each votes as value, index}
				<div class="flex items-end gap-2 p-1">
					<p class="text-xl leading-8">
						{index + 1}
					</p>
					<progress
						class="progress progress-secondary h-6 w-full bg-base-content/45 shadow-inner shadow-primary-content/50"
						value={Math.round((100 * value.count) / total)}
						max="100"
					></progress>
				</div>
			{/each}
		</div>
	</div>
	<div class="my-auto flex flex-col items-center">
		<p class="text-5xl font-bold">{mean.toFixed(1)}</p>
		<p class="whitespace-nowrap font-semibold">{total} opiniones</p>
	</div>
</div>
