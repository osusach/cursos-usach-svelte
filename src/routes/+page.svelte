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

	let search = '';
	let selectedFaculty: string = '';
	let selectedCareer: string = '';
	let careers: any = [];
	let userLoggedIn = false;

	const getCareers = async () => {
		careers = await fetch(
			`https://osusachdb.ignacioladal.workers.dev/careers/byFaculty/${selectedFaculty}`
		)
			.then((response) => response.json())
			.then((data) => {
				return data.payload;
			});
	};
	const getCourses = async () => {
		data.courses = await window
			.fetch(`https://osusachdb.ignacioladal.workers.dev/courses/byCareer/${selectedCareer}`)
			.then((response) => response.json())
			.then((data) => {
				return data.payload;
			});
	};

</script>


<header class="grid grid-cols-5 grid-rows-1 items-center gap-4 p-4">
	<h1 class="btn btn-primary">CursosUSACH</h1>
	<input
		bind:value={search}
		type="text"
		placeholder="Buscar..."
		class="input col-span-2 input-primary"
	/>
	<SignIn />
</header>
<main>
	<div class="grid grid-cols-2 grid-rows-1 gap-4 mx-12">
		<FacultySelect faculties={data.faculties} bind:selectedFaculty {getCareers} />
		<CareerSelect {careers} bind:selectedCareer {getCourses} />
	</div>
	<Ramos courses={data.courses} />
</main>
