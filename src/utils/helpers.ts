import { resolve } from 'path';

import { spawn } from './child-process';
import { copy } from './fs';

export function debug(...args: any[]): void {
	if (!process.env.DEBUG) {
		return;
	}

	console.debug(new Date().toISOString(), 'DEBUG', ...args);
}

export function kebabCase(value: string): string {
	return value ? value.replace(/(?:[^\w\d]+)?([A-Z]+)/g, (fm, m: string) => `-${m.toLowerCase()}`).replace(/^-/, '') : '';
}

export async function getCommit(cwd?: string): Promise<void> {
	await spawn('git', ['init'], { cwd });
	await spawn('git', ['add', '--all'], { cwd });
	await spawn('git', ['commit', '-m', `'initial commit'`], { cwd });
}

export function copyTemplates(templates: string[], dest: string): void {
	for (const t of templates) {
		copy(resolve(rootdir, `templates/${t}/*`), dest);
	}
}
