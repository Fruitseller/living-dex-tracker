<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchAllPokemon, generateBoxes } from '$lib/api/pokeapi';
	import type { Box as BoxType } from '$lib/types';
	import Box from '$lib/components/Box.svelte';
	import ProgressHeader from '$lib/components/ProgressHeader.svelte';
	import '../app.css';

	let boxes = $state<BoxType[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let totalPokemon = $state(0);

	onMount(async () => {
		try {
			loading = true;
			const allPokemon = await fetchAllPokemon();
			totalPokemon = allPokemon.length;
			boxes = generateBoxes(allPokemon);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load Pokémon data';
			console.error('Error loading Pokémon:', err);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Living Pokédex Tracker</title>
	<meta name="description" content="Track your Living Pokédex collection in Pokémon Home" />
</svelte:head>

{#if loading}
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p>Loading Pokémon data...</p>
		<p class="loading-hint">This may take a moment on first load</p>
	</div>
{:else if error}
	<div class="error-container">
		<h1>Error</h1>
		<p>{error}</p>
		<button onclick={() => window.location.reload()}>Retry</button>
	</div>
{:else}
	<ProgressHeader total={totalPokemon} />

	<div class="container">
		<div class="boxes-container">
			{#each boxes as box (box.name)}
				<Box {box} />
			{/each}
		</div>
	</div>

	<footer class="footer">
		<p>
			Data from <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a>
		</p>
		<p>Pokémon and Pokémon character names are trademarks of Nintendo.</p>
	</footer>
{/if}

<style>
	.loading-container,
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		text-align: center;
	}

	.loading-spinner {
		width: 60px;
		height: 60px;
		border: 4px solid var(--border-color);
		border-top-color: var(--primary-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-hint {
		color: var(--text-secondary);
		font-size: 0.875rem;
		margin-top: 0.5rem;
	}

	.error-container h1 {
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	.error-container button {
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background: var(--primary-color);
		color: white;
		border-radius: 8px;
		font-weight: 600;
		transition: background 0.2s;
	}

	.error-container button:hover {
		background: var(--secondary-color);
	}

	.boxes-container {
		margin-top: 2rem;
	}

	.footer {
		text-align: center;
		padding: 2rem 1rem;
		margin-top: 3rem;
		border-top: 2px solid var(--border-color);
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.footer p {
		margin: 0.25rem 0;
	}

	.footer a {
		color: var(--primary-color);
		text-decoration: none;
	}

	.footer a:hover {
		text-decoration: underline;
	}
</style>
