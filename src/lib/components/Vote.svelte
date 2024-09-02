<script lang="ts">
	let difficulty = 1;
	let time = 1;
	let show = false;

	let array5 = [0, 0, 0, 0, 0];
</script>

<button
	class="btn btn-secondary self-center text-secondary-content shadow-xl"
	on:click={() => {
		show = !show;
	}}>Votar</button
>

{#if show}
	<div class="my-4 flex flex-row gap-4 self-center">
		<div class="flex flex-row items-center rounded-btn bg-primary p-4 shadow-xl">
			<p>Vota por la dificultad</p>
			<div class="rating">
				{#each array5 as item, index}
					<input
						bind:group={difficulty}
						type="radio"
						name="voto-dificultad"
						class="iconify size-10 bg-secondary shadow-xl shadow-black mingcute--skull-fill"
						value={index + 1}
					/>
				{/each}
			</div>
		</div>
		<div class="rounded-btn bg-accent p-4 shadow-xl">
			<div class="rating">
				{#each array5 as item, index}
					<input
						bind:group={time}
						type="radio"
						name="voto-tiempo"
						class="iconify size-10 bg-secondary shadow-xl shadow-black mingcute--time-fill"
						value={index + 1}
					/>
				{/each}
			</div>
		</div>
	</div>
{/if}
