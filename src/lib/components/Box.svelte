<script lang="ts">
	import type { Box as BoxType } from '$lib/types';
	import PokemonCard from './PokemonCard.svelte';
	import { collection } from '$lib/stores/collection';
	import { calculateBoxProgress } from '$lib/stores/collection';

	interface Props {
		box: BoxType;
	}

	let { box }: Props = $props();

	let caughtIds = $state($collection);
	let progress = $derived(calculateBoxProgress(caughtIds, box.startId, box.endId));

	collection.subscribe(value => {
		caughtIds = value;
	});
</script>

<div class="box">
	<div class="box-header">
		<h2 class="box-name">Box: {box.name}</h2>
		<span class="box-progress" class:complete={progress.caught === progress.total}>
			{progress.caught}/{progress.total}
		</span>
	</div>
	<div class="pokemon-grid">
		{#each box.pokemon as pokemon (pokemon.id)}
			<PokemonCard {pokemon} caught={caughtIds.has(pokemon.id)} />
		{/each}
	</div>
</div>

<style>
	.box {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 8px var(--shadow);
		margin-bottom: 2rem;
	}

	.box-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 2px solid var(--border-color);
	}

	.box-name {
		font-size: 1.25rem;
		color: var(--text-primary);
	}

	.box-progress {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-secondary);
		padding: 0.25rem 0.75rem;
		background: var(--background);
		border-radius: 20px;
	}

	.box-progress.complete {
		color: white;
		background: var(--primary-color);
	}

	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.pokemon-grid {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.pokemon-grid {
			grid-template-columns: repeat(10, 1fr);
		}
	}
</style>
