<script lang="ts">
	import '$lib/app.css';

	import { selectedCareer, selectedFaculty } from '$lib';
	import type { PageData } from './$types';

	import CareerSelect from '$lib/components/CareerSelect.svelte';
	import FacultySelect from '$lib/components/FacultySelect.svelte';
	import Ramos from '$lib/components/Ramos.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
	import Filters from '$lib/components/Filters.svelte';

	import { onMount } from 'svelte';

	export let data: PageData;

	let courses: Course[] = [];
	let search = '';
	let careers: any = [];
	let loading = true;

	const getCareers = async () => {
		// loading = true;
		careers = await fetch(`/api/careers/${$selectedFaculty}`).then((response) => {
			if (!response.ok) return [];
			return response.json();
		});
		// loading = false;
	};
	const getCourses = async () => {
		loading = true;
		courses = await fetch(`/api/courses/byCareer/${$selectedCareer}`).then((response) => {
			if (!response.ok) return [];
			return response.json();
		});
		loading = false;
	};

	onMount(async () => {
		if ($selectedFaculty != '') {
			getCareers();
		}

		if ($selectedCareer != '') {
			getCourses();
			return;
		} else {
			courses = await data.courses;
			loading = false;
			return;
		}
	});

	$: console.log($selectedCareer);
	$: console.log($selectedCareer == '');
</script>

<header
	class="mx-4 my-4 grid grid-cols-1 justify-stretch gap-4 lg:mx-12 lg:grid-cols-5 lg:grid-rows-1"
>
	<a href="https://www.osusach.com" class="btn btn-primary p-0 text-xl">
		<img class="size-7" src="/logo_transparent.png" alt="Osusach logo" />
		<h1>CursosUSACH</h1>
	</a>
	<input
		bind:value={search}
		type="text"
		placeholder="Buscar..."
		class="input input-primary lg:col-span-2"
	/>
	<SignIn bind:data class="btn btn-secondary text-lg lg:col-span-2" />
</header>
<main>
	<div class="mx-4 grid grid-flow-row grid-rows-1 gap-4 lg:mx-12 lg:grid-cols-2">
		<FacultySelect class="select select-primary min-w-0" faculties={data.faculties} {getCareers} />
		<CareerSelect class="select select-primary min-w-0" {careers} {getCourses} />
	</div>
	<span class="divider divider-primary px-12 text-2xl font-semibold">CURSOS</span>
	<Filters bind:courses {getCourses}></Filters>
	{#if !loading}
		<Ramos bind:courses bind:search />
	{:else}
		<div class="mt-12 flex w-full justify-center">
			<span class="iconify size-36 svg-spinners--blocks-shuffle-3"></span>
		</div>
	{/if}
</main>
