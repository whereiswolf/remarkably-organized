<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { formatToString } from '$lib';

	let {
		settings = {} as PlannerSettings,
		months = [] as Month[],
		startWeekOnSunday = false,
		locale = 'en-US',
	} = $props();

	function getMonthLink(month: Month) {
		if (!settings.monthPage) return month.id;
		if (!settings.monthPage.disable) return month.id;
		if (!settings.weekPage.disable) {
			const week = settings.weeks.find(
				(week) => week.month === month.month && week.year === month.year,
			);
			return week ? week.id : '';
		}
		if (!settings.dayPage.disable) {
			const day = settings.days.find(
				(day) => day.year === month.year && day.month === month.month,
			);
			return day ? day.id : '';
		}
		return month.id;
	}

	function getDayShortName(dayOfWeek: number) {
		// Map dayOfWeek index to actual weekday (0=Sunday, 1=Monday, etc.)
		// Use a known Monday in UTC: January 2, 2023 was a Monday
		// So: 1=Mon(Jan 2), 2=Tue(Jan 3), 3=Wed(Jan 4), 4=Thu(Jan 5), 5=Fri(Jan 6), 6=Sat(Jan 7), 0=Sun(Jan 1)
		const baseDate = dayOfWeek === 0 ? 1 : dayOfWeek + 1;
		const date = new Date(Date.UTC(2023, 0, baseDate));
		const shortName = date.toLocaleString(locale, { weekday: 'short', timeZone: 'UTC' });
		// Take first 2 characters for consistent abbreviation length
		return shortName.substring(0, 2);
	}
</script>

{#if months.length}
	<div class="months">
		{#each months as month (month.id)}
			<a href="#{getMonthLink(month)}" class="month">
				<h2>{month.nameLong}</h2>
				<div class="days">
					{#if startWeekOnSunday}
						<div class="label">{getDayShortName(0)}</div>
					{/if}
					<div class="label">{getDayShortName(1)}</div>
					<div class="label">{getDayShortName(2)}</div>
					<div class="label">{getDayShortName(3)}</div>
					<div class="label">{getDayShortName(4)}</div>
					<div class="label">{getDayShortName(5)}</div>
					<div class="label">{getDayShortName(6)}</div>
					{#if !startWeekOnSunday}
						<div class="label">{getDayShortName(0)}</div>
					{/if}
					{#each new Array(month.end.getUTCDate()) as _, day}
						<div
							class="day"
							style:grid-column={day > 0
								? null
								: ((month.start.getUTCDay() - (startWeekOnSunday ? 0 : 1) + 7) % 7) + 1}>
							{day + 1}
						</div>
					{/each}
				</div>
			</a>
		{/each}
	</div>
{/if}

<style lang="scss">
	.months {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 1fr);
		align-items: start;
		gap: 0rem 1.5rem;
		flex: 1;
		width: 100%;
		height: 100%;
		padding: 0 1.5rem 3.5rem;
		h2 {
			text-align: center;
			font-size: 1.2em;
			font-weight: var(--font-weight-normal);
			padding: 0 0 0.25rem;
			line-height: 1.2rem;
		}
	}
	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(6, 1fr);
		justify-items: center;
		align-items: center;
		gap: 0.15rem 0.25rem;
		.label {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.65em;
			font-weight: var(--font-weight-bold);
			color: var(--text-low);
		}
		.day {
			font-size: 1.1em;
			font-weight: var(--font-weight-light);
			line-height: 1.3rem;
		}
	}
</style>
