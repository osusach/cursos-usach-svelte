<script lang="ts">
	import { flip } from 'svelte/animate';

	export let data: any = [];
	export let type: 'difficulty' | 'time';
	export let total;

	let values = data.scores;
	let mean: number = data.average;
	let isType = type == 'time';
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
			{#each values as value, index}
				<div class="flex items-end gap-2 p-1">
					<p class="text-xl leading-8">
						{index + 1}
					</p>
					<progress
						class="progress progress-secondary h-6 w-full bg-base-content/45 shadow-inner shadow-primary-content/50"
						value={(100 * value.votes) / total}
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
