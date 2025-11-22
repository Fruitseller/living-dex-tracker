<script lang="ts">
	import { collection } from '$lib/stores/collection';
	import { calculateProgress } from '$lib/stores/collection';

	interface Props {
		total: number;
	}

	let { total }: Props = $props();

	let caughtIds = $state($collection);
	let progress = $derived(calculateProgress(caughtIds, total));

	collection.subscribe(value => {
		caughtIds = value;
	});
</script>

<header class="progress-header">
	<div class="container">
		<h1>Living Pokédex Tracker</h1>
		<div class="progress-info">
			<div class="progress-stats">
				<span class="count">{progress.caught}/{progress.total}</span>
				<span class="percentage">({progress.percentage}%)</span>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress.percentage}%"></div>
			</div>
		</div>
	</div>
</header>

<style>
	.progress-header {
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
		color: white;
		padding: 2rem 1rem;
		margin: -1rem -1rem 2rem -1rem;
		box-shadow: 0 4px 12px var(--shadow);
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.progress-info {
		max-width: 600px;
		margin: 0 auto;
	}

	.progress-stats {
		display: flex;
		justify-content: center;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.count {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.percentage {
		font-size: 1.125rem;
		opacity: 0.9;
	}

	.progress-bar {
		height: 24px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		overflow: hidden;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.progress-fill {
		height: 100%;
		background: white;
		transition: width 0.3s ease;
		border-radius: 10px;
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 1.5rem;
		}

		.count {
			font-size: 1.25rem;
		}

		.percentage {
			font-size: 1rem;
		}
	}
</style>
