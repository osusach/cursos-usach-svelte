<script lang="ts">
	export let sendingVote = false;
	let difficulty = 1;
	let time = 1;
	let array5 = [0, 0, 0, 0, 0];

	export let sendVote: (difficulty: number, time: number) => void;
</script>

<div class="grid grid-cols-1 place-items-stretch gap-y-4 lg:grid-cols-4 lg:gap-x-4">
	<div class="col-span-1"></div>
	<!-- <ol class="rounded-box bg-primary p-4 text-primary-content shadow-xl">
		<li>1 - se pasa solo</li>
		<li>2 - hay que ir a las clases y poco mas</li>
		<li>3 - normal</li>
		<li>4 - hay que ponerse las pilas</li>
		<li>5 - todavía tengo pesadillas</li>
	</ol> -->

	<div class="col-span-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
		<div class="flex flex-col items-center gap-4 rounded-box bg-primary p-4 shadow-xl">
			<p>Vota por la dificultad</p>
			<div class="rating rounded-btn bg-warning p-2">
				{#each array5 as item, index}
					<input
						bind:group={difficulty}
						type="radio"
						name="voto-dificultad"
						class="iconify size-10 bg-primary mingcute--skull-fill"
						value={index + 1}
					/>
				{/each}
			</div>
		</div>
		<div class="flex flex-col items-center gap-4 rounded-box bg-accent p-4 shadow-xl">
			<p>Vota por el tiempo</p>
			<div class="rating rounded-btn bg-warning p-2">
				{#each array5 as item, index}
					<input
						bind:group={time}
						type="radio"
						name="voto-tiempo"
						class="iconify size-10 bg-accent shadow-xl shadow-black mingcute--time-fill"
						value={index + 1}
					/>
				{/each}
			</div>
		</div>
		{#if !sendingVote}
			<button
				class="btn btn-success shadow-xl lg:col-span-2"
				on:click={() => {
					sendVote(difficulty, time);
					alert('VOTO ENVIADO');
				}}>Enviar</button
			>
		{:else}
			<button class="btn btn-success shadow-xl lg:col-span-2" disabled>
				<span class="iconify size-6 svg-spinners--180-ring"></span>
			</button>
		{/if}
	</div>

	<!-- <ol class="rounded-box bg-accent p-4 shadow-xl">
		<li>1 - se pasa solo</li>
		<li>2 - hay que ir a las clases y poco mas</li>
		<li>3 - normal</li>
		<li>4 - hay que ponerse las pilas</li>
		<li>5 - todavía tengo pesadillas</li>
	</ol> -->
</div>
