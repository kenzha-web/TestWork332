export function formatDate(date: Date | string): string {
	const dt = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(dt);
}

export function formatCityName(city: string): string {
	return city
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}
