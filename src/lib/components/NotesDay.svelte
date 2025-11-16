<script lang="ts">
	import Grid from './Grid.svelte';

	let { locale = 'en-US' } = $props();

	// Determine if locale uses 24-hour format
	const uses24Hour = $derived.by(() => {
		const lang = locale.split('-')[0].toLowerCase();
		// Most European languages use 24-hour format, except UK and Ireland
		return (
			!['en', 'es', 'fil', 'hi'].includes(lang) ||
			locale.toLowerCase().startsWith('en-gb')
		);
	});
</script>

<div class="day">
	<div class="checkboxes">
		{#each new Array(14) as _, i (i)}
			<div class="checkbox-row">
				<input type="checkbox" aria-label="Task checkbox" />
			</div>
		{/each}
	</div>
	<div class="hours">
		{#each new Array(17) as _, i (i)}
			{@const hour = i + 7}
			<div class="hour">
				<span>
					{#if uses24Hour}
						{hour}
					{:else}
						{hour % 12 === 0 ? 12 : hour % 12}
						<small>{hour < 12 ? 'AM' : 'PM'}</small>
					{/if}
				</span>
			</div>
		{/each}
	</div>
	<div class="grid">
		<Grid display="dotted" />
	</div>
</div>

<style lang="scss">
	.day {
		font-size: 1.1em;
		border-top: solid 1px var(--outline);
		text-align: center;
		padding: 0.5rem 0 0;
		&:nth-child(1),
		&:nth-child(2) {
			border-top: none;
		}
		&:nth-child(2n) {
			border-left: solid 1px var(--outline);
		}
		:global(.ordinal) {
			font-size: 0.75em;
			vertical-align: super;
		}
	}
	.checkboxes {
		position: absolute;
		top: -2px;
		left: 31px;
		bottom: 0;
		display: flex;
		flex-direction: column;
		z-index: 2;

		&::before {
			content: '';
			background: white;
			width: 50px;
			position: absolute;
			top: 0;
			left: -25px;
			bottom: 225px;
			z-index: -1;
		}

		.checkbox-row {
			display: flex;
			align-items: center;
			height: 48px;

			input[type='checkbox'] {
				margin: 0;
				transform: scale(2);
				cursor: pointer;
				background-color: white;
				border: 1px solid var(--outline);
			}
		}
	}
	.grid {
		position: absolute;
		top: 0.5rem;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}
	.hours {
		position: absolute;
		top: 41px;
		right: 0;
		bottom: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;

		color: var(--text-low);
		.hour {
			display: flex;
			justify-content: center;
			align-items: start;
			height: 48px;
			span {
				background-color: white;
				padding: 0.5rem;
				font-size: 0.7em;
				z-index: 1;
				display: block;
				small {
					font-size: 0.6em;
				}
			}
		}
	}
</style>
