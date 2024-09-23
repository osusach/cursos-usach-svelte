<script lang="ts">
	import { selectedCourse, shortNumber } from '$lib';

	import type { Course } from '$lib/types';

	import RatingBadge from './RatingBadge.svelte';

	export let course: Course;
</script>

<a
	href={'/' + course.id}
	on:click={() => {
		selectedCourse.set(course);
	}}
	class="flex h-fit w-80 flex-col items-center justify-between rounded-box bg-primary p-4 text-primary-content transition-transform hover:bg-primary/75 active:scale-95"
>
	<p class="mb-2 line-clamp-2 h-12 text-center font-bold">{course.id} - {course.name}</p>

	<div class="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-2 text-lg font-semibold">
		<RatingBadge icon="mingcute--skull-fill" value={course.difficulty_mean} />
		<RatingBadge icon="mingcute--time-fill" value={course.time_demand_mean} />
		<div class="inline-flex w-24 items-center justify-around gap-1 rounded-badge px-2 py-1 bg-accent col-span-2 mx-auto">
			<span class="iconify size-7 mingcute--user-2-line"></span>
			<p>
				{shortNumber(course.vote_count)}
			</p>
		</div>
	</div>
</a>
