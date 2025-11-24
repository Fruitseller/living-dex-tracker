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
		padding: 0.75rem;
		box-shadow: 0 2px 8px var(--shadow);
		margin-bottom: 1rem;
	}

	@media (min-width: 640px) {
		.box {
			padding: 1.5rem;
			margin-bottom: 2rem;
		}
	}

	.box-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	@media (min-width: 640px) {
		.box-header {
			margin-bottom: 1rem;
			padding-bottom: 0.75rem;
			border-bottom: 2px solid var(--border-color);
		}
	}

	.box-name {
		font-size: 1rem;
		color: var(--text-primary);
	}

	@media (min-width: 640px) {
		.box-name {
			font-size: 1.25rem;
		}
	}

	.box-progress {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		padding: 0.25rem 0.5rem;
		background: var(--background);
		border-radius: 20px;
	}

	@media (min-width: 640px) {
		.box-progress {
			font-size: 1rem;
			padding: 0.25rem 0.75rem;
		}
	}

	.box-progress.complete {
		color: white;
		background: var(--primary-color);
	}

	.pokemon-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.25rem;
	}

	@media (min-width: 640px) {
		.pokemon-grid {
			gap: 0.5rem;
		}
	}
</style>
