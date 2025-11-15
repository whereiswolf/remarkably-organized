/**
 * Translation dictionaries for planner UI
 */

export type TranslationKey =
	| 'week'
	| 'weekShort'
	| 'notes'
	| 'quarter'
	| 'page'
	| 'goal'
	| 'task'
	| 'today'
	| 'month'
	| 'year'
	| 'collection';

const translations: Record<string, Record<TranslationKey, string>> = {
	// English
	en: {
		week: 'Week',
		weekShort: 'WK',
		notes: 'Notes',
		quarter: 'Quarter',
		page: 'Page',
		goal: 'Goal',
		task: 'Task',
		today: 'Today',
		month: 'Month',
		year: 'Year',
		collection: 'Collection',
	},
	// Polish
	pl: {
		week: 'Tydzień',
		weekShort: 'TYG',
		notes: 'Notatki',
		quarter: 'Kwartał',
		page: 'Strona',
		goal: 'Cel',
		task: 'Zadanie',
		today: 'Dzisiaj',
		month: 'Miesiąc',
		year: 'Rok',
		collection: 'Kolekcja',
	},
};

/**
 * Get translation for a key based on locale
 * Falls back to English if locale not found
 */
export function t(key: TranslationKey, locale: string = 'en-US'): string {
	// Extract language code from locale (e.g., 'en' from 'en-US')
	const lang = locale.split('-')[0].toLowerCase();

	// Try exact language match, fallback to English
	return translations[lang]?.[key] ?? translations['en'][key];
}

/**
 * Get translation object for a locale
 * Useful for components that need multiple translations
 */
export function getTranslations(locale: string = 'en-US'): Record<TranslationKey, string> {
	const lang = locale.split('-')[0].toLowerCase();
	return translations[lang] ?? translations['en'];
}
