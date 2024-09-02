<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { selectedCourse } from '$lib';
	import Ratings from '$lib/components/Ratings.svelte';
	import Vote from '$lib/components/Vote.svelte';
	import type { Course } from '$lib/types';
	import { signIn } from '@auth/sveltekit/client';
	import { redirect } from '@sveltejs/kit';

	let comments = [
		'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		'Lucas Mesias Soza',
		'aaaaaa',
		'aaaaaa'
	];
	console.log($selectedCourse);

	// if (!$selectedCourse) {
	//     await fetch("")
	// }
	let course: Course = $selectedCourse;

	if (course == undefined && browser) goto('/');
</script>

<div class="flex flex-col">
	<h1 class="p-6 text-5xl">{course?.id} - {course?.name}</h1>
	<div class="flex flex-col items-center gap-4 px-8 py-4 lg:flex-row">
		<Ratings values={[80, 13, 2, 3, 4]} type="difficulty"></Ratings>
		<Ratings values={[1, 1, 2, 3, 3]} type="time"></Ratings>
	</div>

	{#if $page.data.session}
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
	<span class="divider mx-4 text-xl font-semibold">Comentarios</span>

	{#if $page.data.session}
		<div class="mx-4 flex flex-col gap-4 p-4">
			{#each comments as comment}
				<div class="flex flex-row rounded-xl bg-base-300 text-base-content">
					<img
						src={$page.data.session.user?.image}
						alt="user img"
						class="mask mask-squircle m-4 mr-0 size-16"
					/>
					<span class="p-4">
						<p class="text-lg font-semibold">{$page.data.session.user?.name}</p>
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
