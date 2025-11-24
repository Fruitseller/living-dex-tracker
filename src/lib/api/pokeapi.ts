import type { Pokemon, PokeAPIResponse, PokeAPISpeciesResponse } from '$lib/types';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const MAX_POKEMON = 1025; // Updated to match current National Dex

// Cache for Pokemon data
const pokemonCache = new Map<number, Pokemon>();

// Check if we have cached data in localStorage
function loadCacheFromStorage(): void {
	if (typeof window === 'undefined') return;

	try {
		const cached = localStorage.getItem('pokemonCache');
		if (cached) {
			const parsed = JSON.parse(cached);
			Object.entries(parsed).forEach(([id, pokemon]) => {
				pokemonCache.set(Number(id), pokemon as Pokemon);
			});
		}
	} catch (error) {
		console.error('Failed to load cache from localStorage:', error);
	}
}

// Save cache to localStorage
function saveCacheToStorage(): void {
	if (typeof window === 'undefined') return;

	try {
		const cacheObj: Record<number, Pokemon> = {};
		pokemonCache.forEach((pokemon, id) => {
			cacheObj[id] = pokemon;
		});
		localStorage.setItem('pokemonCache', JSON.stringify(cacheObj));
	} catch (error) {
		console.error('Failed to save cache to localStorage:', error);
	}
}

// Fetch a single Pokemon with German name
export async function fetchPokemon(id: number): Promise<Pokemon> {
	// Check cache first
	if (pokemonCache.has(id)) {
		return pokemonCache.get(id)!;
	}

	try {
		const [pokemonRes, speciesRes] = await Promise.all([
			fetch(`${POKEAPI_BASE}/pokemon/${id}`),
			fetch(`${POKEAPI_BASE}/pokemon-species/${id}`)
		]);

		if (!pokemonRes.ok || !speciesRes.ok) {
			throw new Error(`Failed to fetch Pokemon ${id}`);
		}

		const pokemonData: PokeAPIResponse = await pokemonRes.json();
		const speciesData: PokeAPISpeciesResponse = await speciesRes.json();

		// Get German name
		const germanName = speciesData.names.find(
			(n) => n.language.name === 'de'
		)?.name || pokemonData.name;

		// Get sprite URL from Pokémon Home
		const spriteUrl =
			pokemonData.sprites.other?.home?.front_default ||
			pokemonData.sprites.front_default ||
			'';

		const pokemon: Pokemon = {
			id: pokemonData.id,
			name: germanName,
			spriteUrl
		};

		// Cache the result
		pokemonCache.set(id, pokemon);

		return pokemon;
	} catch (error) {
		console.error(`Error fetching Pokemon ${id}:`, error);
		// Return placeholder
		return {
			id,
			name: `Pokemon #${id}`,
			spriteUrl: ''
		};
	}
}

// Fetch multiple Pokemon with rate limiting
export async function fetchPokemonBatch(ids: number[]): Promise<Pokemon[]> {
	const BATCH_SIZE = 50; // Limit concurrent requests
	const results: Pokemon[] = [];

	for (let i = 0; i < ids.length; i += BATCH_SIZE) {
		const batch = ids.slice(i, i + BATCH_SIZE);
		const batchResults = await Promise.all(
			batch.map(id => fetchPokemon(id))
		);
		results.push(...batchResults);

		// Small delay between batches to be nice to the API
		if (i + BATCH_SIZE < ids.length) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}
	}

	// Save cache after batch fetch
	saveCacheToStorage();

	return results;
}

// Fetch all Pokemon (1-1050)
export async function fetchAllPokemon(): Promise<Pokemon[]> {
	loadCacheFromStorage();

	const ids = Array.from({ length: MAX_POKEMON }, (_, i) => i + 1);
	return fetchPokemonBatch(ids);
}

// Generate boxes from Pokemon list
export function generateBoxes(allPokemon: Pokemon[]) {
	const POKEMON_PER_BOX = 30;
	const boxes = [];

	for (let i = 0; i < allPokemon.length; i += POKEMON_PER_BOX) {
		const startId = i + 1;
		const endId = Math.min(i + POKEMON_PER_BOX, allPokemon.length);
		const boxPokemon = allPokemon.slice(i, i + POKEMON_PER_BOX);

		boxes.push({
			name: `${startId.toString().padStart(3, '0')}-${endId.toString().padStart(3, '0')}`,
			startId,
			endId,
			pokemon: boxPokemon
		});
	}

	return boxes;
}
