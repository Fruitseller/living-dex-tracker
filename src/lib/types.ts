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

export interface PokeAPIResponse {
	id: number;
	name: string;
	sprites: {
		front_default: string;
		other?: {
			home?: {
				front_default: string;
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
