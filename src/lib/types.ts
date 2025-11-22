export interface Pokemon {
	id: number;
	name: string;
	spriteUrl: string;
}

export interface Box {
	name: string;
	startId: number;
	endId: number;
	pokemon: Pokemon[];
}

export interface CollectionState {
	caughtIds: Set<number>;
}

export interface PokeAPIResponse {
	id: number;
	name: string;
	sprites: {
		front_default: string;
		versions?: {
			'generation-viii'?: {
				icons?: {
					front_default: string;
				};
			};
		};
	};
}

export interface PokeAPISpeciesResponse {
	id: number;
	names: Array<{
		language: {
			name: string;
		};
		name: string;
	}>;
}
