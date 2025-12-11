<script lang="ts">
	interface Props {
		onPrevious: () => void;
		onNext: () => void;
		canGoPrevious: boolean;
		canGoNext: boolean;
	}

	let { onPrevious, onNext, canGoPrevious, canGoNext }: Props = $props();
</script>

<div class="navigation-buttons">
	<button
		class="nav-button nav-button-up"
		onclick={onPrevious}
		disabled={!canGoPrevious}
		aria-label="Previous box"
		title="Previous box"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="18 15 12 9 6 15"></polyline>
		</svg>
	</button>

	<button
		class="nav-button nav-button-down"
		onclick={onNext}
		disabled={!canGoNext}
		aria-label="Next box"
		title="Next box"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="6 9 12 15 18 9"></polyline>
		</svg>
	</button>
</div>

<style>
	.navigation-buttons {
		display: none;
	}

	/* Only show on mobile and tablet */
	@media (max-width: 1024px) {
		.navigation-buttons {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			position: fixed;
			right: 1rem;
			top: 85%;
			transform: translateY(-50%);
			z-index: 1000;
		}
	}

	.nav-button {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--primary-color);
		color: white;
		border: none;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.nav-button:active {
		transform: scale(0.95);
	}

	.nav-button:disabled {
		background: var(--border-color);
		opacity: 0.5;
		cursor: not-allowed;
	}

	.nav-button:not(:disabled):hover {
		background: var(--secondary-color);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.nav-button svg {
		width: 24px;
		height: 24px;
	}

	/* Smaller buttons on very small screens */
	@media (max-width: 480px) {
		.navigation-buttons {
			right: 0.5rem;
			gap: 0.5rem;
		}

		.nav-button {
			width: 40px;
			height: 40px;
		}

		.nav-button svg {
			width: 20px;
			height: 20px;
		}
	}
</style>
