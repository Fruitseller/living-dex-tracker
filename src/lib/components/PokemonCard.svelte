<script lang="ts">
	import type { Pokemon } from '$lib/types';
	import { collection } from '$lib/stores/collection';

	interface Props {
		pokemon: Pokemon;
		caught: boolean;
	}

	let { pokemon, caught }: Props = $props();

	function handleClick() {
		collection.toggle(pokemon.id);
	}
</script>

<button class="card" class:caught onclick={handleClick} title={pokemon.name}>
	{#if pokemon.spriteUrl}
		<img src={pokemon.spriteUrl} alt={pokemon.name} loading="lazy" />
	{:else}
		<div class="placeholder">?</div>
	{/if}
	<span class="id">#{pokemon.id.toString().padStart(4, '0')}</span>
</button>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		border-radius: 6px;
		padding: 0.25rem;
		transition: all 0.2s ease;
		opacity: 0.35;
		filter: grayscale(100%);
		cursor: pointer;
		min-height: 60px;
		position: relative;
	}

	@media (min-width: 640px) {
		.card {
			border: 2px solid var(--border-color);
			border-radius: 8px;
			padding: 0.5rem;
			min-height: 80px;
		}
	}

	.card.caught {
		opacity: 1;
		filter: grayscale(0%);
		border-color: var(--primary-color);
	}

	@media (min-width: 640px) {
		.card.caught {
			border-width: 2px;
		}
	}

	.card:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 12px var(--shadow);
		z-index: 10;
	}

	.card:active {
		transform: scale(0.98);
	}

	img {
		width: 100%;
		height: auto;
		max-width: 48px;
		max-height: 48px;
		object-fit: contain;
		image-rendering: auto;
	}

	@media (min-width: 640px) {
		img {
			max-width: 80px;
			max-height: 80px;
		}
	}

	.placeholder {
		width: 100%;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		color: var(--text-secondary);
	}

	@media (min-width: 640px) {
		.placeholder {
			height: 80px;
			font-size: 24px;
		}
	}

	.id {
		font-size: 0.625rem;
		color: var(--text-secondary);
		font-weight: 500;
		margin-top: 0.125rem;
	}

	@media (min-width: 640px) {
		.id {
			font-size: 0.75rem;
			margin-top: 0.25rem;
		}
	}

	.card.caught .id {
		color: var(--text-primary);
	}
</style>
