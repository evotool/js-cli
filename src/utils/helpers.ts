export function debug(...args: any[]): void {
	if (!process.env.DEBUG) {
		return;
	}

	console.debug(new Date().toISOString(), 'DEBUG', ...args);
}

export function kebabCase(value: string): string {
	return value ? value.replace(/(?:[^\w\d]+)?([A-Z]+)/g, (fm, m: string) => `-${m.toLowerCase()}`).replace(/^-/, '') : '';
}
