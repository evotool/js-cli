import { existsSync } from 'fs';
import { resolve } from 'path';

import { debug } from '../utils/helpers';

export async function add(cwd: string, modules: string[]): Promise<void> {
	debug('ADD', cwd, modules);

	const packageJsonPath = resolve(cwd, 'package.json');

	if (!existsSync(packageJsonPath)) {
		throw new Error('Unable to find package.json file');
	}

	for (const m of modules) {
		let module: { default(cwd: string): Promise<void> };

		try {
			module = require(`../modules/${m}/add`);
		} catch (err) {
			throw new Error(`Unable to add to project the @evojs/${m} module`);
		}

		await module.default(cwd);
	}
}
