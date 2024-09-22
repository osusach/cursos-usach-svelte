<script lang="ts">
	import { selectedCareer, selectedFaculty } from '$lib';
	import '$lib/app.css';
	import CareerSelect from '$lib/components/CareerSelect.svelte';
	import FacultySelect from '$lib/components/FacultySelect.svelte';
	import Ramos from '$lib/components/Ramos.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let courses: any = data.courses ?? [];

	let search = '';
	let careers: any = [];

	selectedFaculty.subscribe((value) => {
		console.log(value);
	});
	selectedCareer.subscribe((value) => {
		console.log(value);
	});
	const getCareers = async () => {
		careers = await fetch(`/api/careers/${$selectedFaculty}`).then((response) => {
			if (!response.ok) return { payload: [] };
			return response.json();
		});
	};
	const getCourses = async () => {
		data.courses = await fetch(`/api/courses/byCareer/${$selectedCareer}`).then((response) => {
			if (!response.ok) return { payload: [] };
			return response.json();
		});
	};

	$: {
		let lower_search = search.toLowerCase();
		courses = data.courses?.filter((item) => item.name.toLowerCase().includes(lower_search));
	}

	onMount(() => {
		if ($selectedFaculty !== '') {
			getCareers();
		}
		if ($selectedCareer !== '') {
			getCourses();
		}
	});
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
		<FacultySelect
			class="select select-primary min-w-0"
			faculties={data.faculties}
			{getCareers}
		/>
		<CareerSelect class="select select-primary min-w-0" {careers} {getCourses} />
	</div>
	<Ramos {courses} />
</main>
