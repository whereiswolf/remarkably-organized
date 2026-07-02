<script lang="ts">
	let { locale = 'en-US' } = $props();

	// Determine if locale uses 24-hour format
	const uses24Hour = $derived.by(() => {
		const lang = locale.split('-')[0].toLowerCase();
		// Most European languages use 24-hour format, except UK and Ireland
		return !['en', 'es', 'fil', 'hi'].includes(lang) || locale.toLowerCase().startsWith('en-gb');
	});
</script>

<div class="day">
	{#each new Array(24) as _, i (i)}
		<div class="hour-label">
			{#if i > 0}
				{#if uses24Hour}
					{i}
				{:else}
					{i === 12 ? 12 : i % 12}
					<small>{i < 12 ? 'AM' : 'PM'}</small>
				{/if}
			{:else if !uses24Hour}
				12
				<small>AM</small>
			{:else}
				0
			{/if}
		</div>
	{/each}
	{#each new Array(24) as _, i (i)}
		<div class="hour"></div>
	{/each}
</div>

<style lang="scss">
	.day {
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		grid-template-rows: repeat(24, 1fr);
		width: 100%;
		height: 100%;
		justify-items: stretch;
		align-items: stretch;
		grid-auto-flow: column;
		padding: 1rem 1rem 0 0;
	}
	.hour {
		border-top: solid 1px var(--outline);
	}
	.hour-label {
		text-align: center;
		grid-column: 1;
		font-weight: var(--font-weight-light);
		font-size: 0.7em;
		color: var(--text-low);
		margin-top: -0.5rem;
		small {
			color: currentColor;
			font-size: 0.6em;
		}
	}
</style>
