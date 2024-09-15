<script lang="ts">
	import { selectedCourse } from '$lib';
	import Ratings from '$lib/components/Ratings.svelte';
	import Vote from '$lib/components/Vote.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import type { Course } from '$lib/types';
	import type { PageData } from '../[id]/$types';
	import CommentSection from '$lib/components/CommentSection.svelte';
	export let data: PageData;

	const getCourse = async () => {
		if ($selectedCourse !== undefined) {
			return $selectedCourse;
		}
		return await data.course;
	};

	let coursePromise: Promise<Course> = getCourse();

	let comments: any = ['hola'];
</script>

{#await coursePromise}
	<div class="flex h-dvh w-dvw items-center justify-center">
		<span class="iconify size-32 svg-spinners--blocks-shuffle-3"></span>
	</div>
{:then course}
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
			<Ratings data={course.votes.difficulty_stats} total={course.vote_count} type="difficulty"
			></Ratings>
			<Ratings data={course.votes.time_demand_stats} total={course.vote_count} type="time"
			></Ratings>
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
			<CommentSection {comments} user={data.session?.user} />
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
{/await}
