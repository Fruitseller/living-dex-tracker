import { describe, it, expect } from 'vitest';
import { generateBoxes } from './pokeapi';
import type { Pokemon } from '$lib/types';

function makePokemon(count: number): Pokemon[] {
	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		name: `Pokemon ${i + 1}`,
		spriteUrl: `sprite-${i + 1}.png`
	}));
}

describe('generateBoxes', () => {
	it('splits Pokemon into boxes of 30', () => {
		const boxes = generateBoxes(makePokemon(60));
		expect(boxes).toHaveLength(2);
		expect(boxes[0].pokemon).toHaveLength(30);
		expect(boxes[1].pokemon).toHaveLength(30);
	});

	it('handles a partial last box', () => {
		const boxes = generateBoxes(makePokemon(45));
		expect(boxes).toHaveLength(2);
		expect(boxes[0].pokemon).toHaveLength(30);
		expect(boxes[1].pokemon).toHaveLength(15);
		expect(boxes[1].endId).toBe(45);
	});

	it('returns an empty array for no Pokemon', () => {
		expect(generateBoxes([])).toEqual([]);
	});

	it('uses zero-padded ID range as the box name', () => {
		const boxes = generateBoxes(makePokemon(31));
		expect(boxes[0].name).toBe('001-030');
		expect(boxes[1].name).toBe('031-031');
	});

	it('sets startId and endId per box', () => {
		const boxes = generateBoxes(makePokemon(90));
		expect(boxes[0]).toMatchObject({ startId: 1, endId: 30 });
		expect(boxes[1]).toMatchObject({ startId: 31, endId: 60 });
		expect(boxes[2]).toMatchObject({ startId: 61, endId: 90 });
	});

	it('preserves the order of Pokemon within a box', () => {
		const boxes = generateBoxes(makePokemon(30));
		expect(boxes[0].pokemon.map((p) => p.id)).toEqual(
			Array.from({ length: 30 }, (_, i) => i + 1)
		);
	});
});
