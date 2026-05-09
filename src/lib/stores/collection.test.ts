import { describe, it, expect } from 'vitest';
import { calculateProgress, calculateBoxProgress } from './collection';

describe('calculateProgress', () => {
	it('returns 0% for an empty collection', () => {
		expect(calculateProgress(new Set(), 100)).toEqual({
			caught: 0,
			total: 100,
			percentage: 0
		});
	});

	it('returns 100% when all are caught', () => {
		const ids = new Set([1, 2, 3, 4, 5]);
		expect(calculateProgress(ids, 5)).toEqual({
			caught: 5,
			total: 5,
			percentage: 100
		});
	});

	it('rounds the percentage', () => {
		const ids = new Set([1]);
		expect(calculateProgress(ids, 3).percentage).toBe(33);
	});

	it('returns 0% when total is 0', () => {
		expect(calculateProgress(new Set(), 0).percentage).toBe(0);
	});
});

describe('calculateBoxProgress', () => {
	it('counts only IDs within the box range', () => {
		const ids = new Set([1, 5, 15, 20, 35, 40]);
		expect(calculateBoxProgress(ids, 1, 30)).toEqual({ caught: 4, total: 30 });
	});

	it('returns 0 caught for an empty collection', () => {
		expect(calculateBoxProgress(new Set(), 31, 60)).toEqual({
			caught: 0,
			total: 30
		});
	});

	it('handles a partial last box', () => {
		const ids = new Set([1021, 1022, 1023, 1024, 1025]);
		expect(calculateBoxProgress(ids, 1021, 1025)).toEqual({
			caught: 5,
			total: 5
		});
	});

	it('ignores IDs outside the range', () => {
		const ids = new Set([1, 2, 31, 32]);
		expect(calculateBoxProgress(ids, 31, 60).caught).toBe(2);
	});
});
