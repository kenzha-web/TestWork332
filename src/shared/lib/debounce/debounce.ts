export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
	let timeoutId: NodeJS.Timeout;
	return ((...args: any[]) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	}) as T;
}
