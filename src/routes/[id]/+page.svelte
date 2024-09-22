<script lang="ts">
	/* eslint svelte/infinite-reactive-loop: "error" */
	import '$lib/app.css';
	import Ratings from '$lib/components/Ratings.svelte';
	import Vote from '$lib/components/Vote.svelte';
	import type { PageData } from './$types';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import SignInVote from '$lib/components/SignInVote.svelte';
	import { invalidateAll } from '$app/navigation';
	export let data: PageData;

	async function sendVote(difficulty: number, time: number) {
		await fetch('/api/courses', {
			method: 'POST',
			body: JSON.stringify({
				course_id: data.course.id,
				difficulty_score: difficulty,
				time_demand_score: time
			}),
			headers: {
				Authorization: `Bearer ${data.session.token}`
			}
		})

		await invalidateAll();
		data = data;
	}

</script>

<div class="mx-2 flex flex-col sm:mx-8">
	<span class="my-4 inline-flex items-center drop-shadow-xl">
		<a
			class="mask mask-hexagon rounded-box bg-secondary p-2 transition-transform hover:bg-primary/75 active:scale-95 lg:p-4"
			href="/"
		>
			<span class="iconify size-12 translate-y-1 mingcute--large-arrow-left-fill"></span>
		</a>
		<h1 class="p-6 text-3xl lg:text-5xl">{data.course.id} - {data.course.name}</h1>
	</span>
	{#key data}
		<div class="flex flex-col items-stretch gap-4 lg:flex-row">
			<Ratings course={data.course} type="difficulty"></Ratings>
			<Ratings course={data.course} type="time"></Ratings>
		</div>
	{/key}

	<span class="divider mb-8 mt-12 text-xl font-semibold">Votar</span>
	{#if data.session}
		<Vote {sendVote} />
	{:else if !data.can_vote && data.session}
		<p class="btn btn-secondary self-center">Ya votaste por este ramo</p>
	{:else}
		<p class="flex h-fit flex-col gap-4 self-center rounded-btn bg-secondary p-4 font-semibold">
			Inicia sesión para poder votar
			<SignInVote bind:session={data.session} />
		</p>
	{/if}
	<span class="divider mb-8 mt-12 text-xl font-semibold">Comentarios</span>

	{#if data.session}
		<CommentSection user={data.session} course={data.course} bind:comments={data.comments} />
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
