export function formatDate(date: Date | string): string {
	const dt = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(dt);
}
