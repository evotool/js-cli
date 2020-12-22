import { copyFileSync, existsSync, mkdirSync, statSync } from 'fs';
import * as glob from 'glob';
import { dirname, resolve } from 'path';

import { debug } from './helpers';

export function mkdir(...paths: string[]): string[] {
	paths = paths.map((p) => resolve(p));

	for (const p of paths) {
		debug('MKDIR', p);
		mkdirSync(p, { recursive: true });
	}

	return paths;
}

export function copy(from: string, to: string, toDir: boolean = true): string {
	from = resolve(from);
	to = resolve(to);

	const globs = glob.sync(from, { dot: true });

	for (let src of globs) {
		if (statSync(src).isDirectory()) {
			const dest = `${to}${src.substring(dirname(from).length)}`;
			src = `${src}/*`;
			debug('COPY', src, dest, '!');
			copy(src, dest, true);
		} else {
			if (toDir && !existsSync(to)) {
				mkdir(to);
			}

			const dest = toDir ? `${to}${src.substring(dirname(from).length)}` : to;
			debug('COPY', src, dest);
			copyFileSync(src, dest);
		}
	}

	return to;
}
