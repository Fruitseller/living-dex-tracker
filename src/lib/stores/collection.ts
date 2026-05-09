import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'livingDex';

function loadFromStorage(): Set<number> {
	if (!browser) return new Set();

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const data = JSON.parse(stored);
			return new Set(data.caughtIds || []);
		}
	} catch (error) {
		console.error('Failed to load collection from localStorage:', error);
	}

	return new Set();
}

function saveToStorage(caughtIds: Set<number>): void {
	if (!browser) return;

	try {
		const data = { caughtIds: Array.from(caughtIds) };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Failed to save collection to localStorage:', error);
	}
}

function createCollectionStore() {
	const { subscribe, update } = writable<Set<number>>(loadFromStorage());

	return {
		subscribe,
		toggle: (id: number) => {
			update(caughtIds => {
				const newSet = new Set(caughtIds);
				if (newSet.has(id)) {
					newSet.delete(id);
				} else {
					newSet.add(id);
				}
				saveToStorage(newSet);
				return newSet;
			});
		}
	};
}

export const collection = createCollectionStore();

export function calculateProgress(caughtIds: Set<number>, total: number) {
	const caught = caughtIds.size;
	const percentage = total > 0 ? Math.round((caught / total) * 100) : 0;
	return { caught, total, percentage };
}

export function calculateBoxProgress(caughtIds: Set<number>, startId: number, endId: number) {
	let caught = 0;
	for (let i = startId; i <= endId; i++) {
		if (caughtIds.has(i)) caught++;
	}
	const total = endId - startId + 1;
	return { caught, total };
}
