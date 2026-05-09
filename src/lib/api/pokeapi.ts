import type { Pokemon, PokeAPIResponse, PokeAPISpeciesResponse } from '$lib/types';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const MAX_POKEMON = 1025;
const POKEMON_PER_BOX = 30;
const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 100;
const CACHE_KEY = 'pokemonCache';

const pokemonCache = new Map<number, Pokemon>();

function loadCacheFromStorage(): void {
	if (typeof window === 'undefined') return;

	try {
		const cached = localStorage.getItem(CACHE_KEY);
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

function saveCacheToStorage(): void {
	if (typeof window === 'undefined') return;

	try {
		const cacheObj: Record<number, Pokemon> = {};
		pokemonCache.forEach((pokemon, id) => {
			cacheObj[id] = pokemon;
		});
		localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
	} catch (error) {
		console.error('Failed to save cache to localStorage:', error);
	}
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
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

		const germanName = speciesData.names.find(
			(n) => n.language.name === 'de'
		)?.name || pokemonData.name;

		const spriteUrl =
			pokemonData.sprites.other?.home?.front_default ||
			pokemonData.sprites.front_default ||
			'';

		const pokemon: Pokemon = {
			id: pokemonData.id,
			name: germanName,
			spriteUrl
		};

		pokemonCache.set(id, pokemon);

		return pokemon;
	} catch (error) {
		console.error(`Error fetching Pokemon ${id}:`, error);
		return {
			id,
			name: `Pokemon #${id}`,
			spriteUrl: ''
		};
	}
}

async function fetchPokemonBatch(ids: number[]): Promise<Pokemon[]> {
	const results: Pokemon[] = [];

	for (let i = 0; i < ids.length; i += BATCH_SIZE) {
		const batch = ids.slice(i, i + BATCH_SIZE);
		const batchResults = await Promise.all(batch.map(id => fetchPokemon(id)));
		results.push(...batchResults);

		if (i + BATCH_SIZE < ids.length) {
			await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
		}
	}

	saveCacheToStorage();

	return results;
}

export async function fetchAllPokemon(): Promise<Pokemon[]> {
	loadCacheFromStorage();

	const ids = Array.from({ length: MAX_POKEMON }, (_, i) => i + 1);
	return fetchPokemonBatch(ids);
}

export function generateBoxes(allPokemon: Pokemon[]) {
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
