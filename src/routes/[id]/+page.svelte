<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { selectedCourse } from '$lib';
	import Ratings from '$lib/components/Ratings.svelte';
	import Vote from '$lib/components/Vote.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';
	import type { Course } from '$lib/types';
	import type { PageData } from '../[id]/$types';

	export let data: PageData;

	console.log(data.votes);
	console.log(data.comments);

	let course: Course = $selectedCourse;
	if (course == undefined && browser) goto('/');

	let comments: any = [];
	// console.log($selectedCourse);
	// console.log(data.course_id);
	onMount(async () => {
		if (!$selectedCourse) {
			course = await window
				.fetch(`https://osusachdb.ignacioladal.workers.dev/courses/byCareer/${data.course_id}`)
				.then((response) => {
					if (!response.ok) return { payload: undefined };
					return response.json();
				})
				.then((data) => data.payload);
		}
	});
</script>

<div class="mx-2 flex flex-col sm:mx-8">
	<span class="my-4 inline-flex items-center drop-shadow-xl">
		<a
			class="mask mask-hexagon rounded-box bg-secondary p-2 transition-transform hover:bg-primary/75 active:scale-95 lg:p-4"
			href="/"
		>
			<span class="iconify size-12 translate-y-1 mingcute--large-arrow-left-fill"></span>
		</a>
		<h1 class="p-6 text-3xl lg:text-5xl">{course?.id} - {course?.name}</h1>
	</span>
	<div class="flex flex-col items-stretch gap-4 lg:flex-row">
		<Ratings data={data.votes.difficulty} total={data.votes.total_votes} type="difficulty"
		></Ratings>
		<Ratings data={data.votes.time} total={data.votes.total_votes} type="time"></Ratings>
	</div>

	{#if data.session}
		<Vote />
	{:else}
		<button
			class="btn btn-secondary self-center"
			on:click={() => {
				signIn('google');
			}}
		>
			Inicia sesión para poder votar
		</button>
	{/if}
	<span class="divider mb-8 mt-12 text-xl font-semibold">Comentarios</span>

	{#if data.session}
		<div class="flex flex-col gap-4 p-4">
			{#each comments as comment}
				<div class="flex flex-row rounded-xl bg-base-300 text-base-content">
					<img
						src={data.session.user?.image}
						alt="user img"
						class="mask mask-squircle m-4 mr-0 size-16"
					/>
					<span class="p-4">
						<p class="text-lg font-semibold">{data.session.user?.name}</p>
						<p class="w-full whitespace-normal break-all text-lg">{comment}</p>
					</span>
				</div>
			{/each}
		</div>
	{:else}
		<div class="alert m-4 mb-0 w-auto text-xl">
			<span class="iconify size-12 text-warning mingcute--alert-fill"></span>
			<span>
				Los comentarios son exclusivos para los integrantes de la USACH, ya que pueden contener
				información sensible de estudiantes y profesores.
			</span>
		</div>
		<div class="alert m-4 w-auto text-xl">
			<span class="iconify size-12 mingcute--lock-fill"></span>
			<span> Inicia sesión para acceder a los comentarios de la comunidad! </span>
		</div>
	{/if}
</div>
