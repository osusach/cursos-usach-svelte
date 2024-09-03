<script lang="ts">
	import '$lib/app.css';
	import CareerSelect from '$lib/components/CareerSelect.svelte';
	import FacultySelect from '$lib/components/FacultySelect.svelte';
	import Ramos from '$lib/components/Ramos.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
	import SignOut from '$lib/components/SignOut.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let courses = data.courses;
	let search = '';
	let selectedFaculty: string = '';
	let selectedCareer: string = '';
	let careers: any = [];

	const getCareers = async () => {
		careers = await fetch(
			`https://osusachdb.ignacioladal.workers.dev/careers/byFaculty/${selectedFaculty}`
		)
			.then((response) => {
				if (!response.ok) return { payload: [] };
				return response.json();
			})
			.then((data) => {
				return data.payload;
			});
	};
	const getCourses = async () => {
		data.courses = await window
			.fetch(`https://osusachdb.ignacioladal.workers.dev/courses/byCareer/${selectedCareer}`)
			.then((response) => {
				if (!response.ok) return { payload: [] };
				return response.json();
			})
			.then((data) => {
				return data.payload;
			});
	};

	$: {
		courses = data.courses.filter((item) => item.name.toLowerCase().includes(search));
	}
</script>

<header class="mx-12 my-4 grid grid-cols-5 grid-rows-1 items-center gap-4">
	<h1 class="btn btn-primary text-xl shadow-xl">
		<img class="size-7" src="/logo_transparent.png" alt="Osusach logo" />
		CursosUSACH
	</h1>
	<input
		bind:value={search}
		type="text"
		placeholder="Buscar..."
		class="input input-primary col-span-2"
	/>
	<SignIn {data} />
</header>
<main>
	<div class="mx-12 grid grid-cols-2 grid-rows-1 gap-4">
		<FacultySelect faculties={data.faculties} bind:selectedFaculty {getCareers} />
		<CareerSelect {careers} bind:selectedCareer {getCourses} />
	</div>
	<Ramos {courses} />
</main>
