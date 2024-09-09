<script lang="ts">
	import '$lib/app.css';
	import CareerSelect from '$lib/components/CareerSelect.svelte';
	import FacultySelect from '$lib/components/FacultySelect.svelte';
	import Ramos from '$lib/components/Ramos.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
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
		data.courses = await fetch(
			`https://osusachdb.ignacioladal.workers.dev/courses/byCareer/${selectedCareer}`
		)
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

<header
	class="mx-4 my-4 grid grid-cols-1 justify-stretch gap-4 lg:mx-12 lg:grid-cols-5 lg:grid-rows-1"
>
	<a href="https://www.osusach.com" class="btn btn-primary text-xl shadow-xl p-0">
		<img class="size-7" src="/logo_transparent.png" alt="Osusach logo" />
		<h1>CursosUSACH</h1>
	</a>
	<input
		bind:value={search}
		type="text"
		placeholder="Buscar..."
		class="input input-primary lg:col-span-2"
	/>
	<SignIn {data} containerClass="btn btn-secondary lg:col-span-2 text-lg shadow-xl" />
</header>
<main>
	<div class="mx-4 grid grid-flow-row grid-rows-1 gap-4 lg:mx-12 lg:grid-cols-2">
		<FacultySelect
			containerClass="select select-primary min-w-0"
			faculties={data.faculties}
			bind:selectedFaculty
			{getCareers}
		/>
		<CareerSelect
			containerClass="select select-primary min-w-0"
			{careers}
			bind:selectedCareer
			{getCourses}
		/>
	</div>
	<Ramos {courses} />
</main>
