import { existsSync } from 'fs';
import { glob } from 'glob';
import { resolve } from 'path';

import { spawn } from '../utils/child-process';
import { mkdir } from '../utils/fs';
import { debug, kebabCase } from '../utils/helpers';

export async function create(cwd: string, projectName: string, module: string): Promise<void> {
	debug('CREATE', cwd, projectName, module);

	let m: { default(cwd: string): Promise<void> };

	try {
		m = require(`../modules/${module}/create`);
	} catch (err) {
		throw new Error(`Unable to create project with @evojs/${module} module`);
	}

	projectName = kebabCase(projectName);
	cwd = resolve(cwd, projectName);

	if (glob.sync(`${cwd}/*`, { dot: true }).length > 0) {
		throw new Error('Directory is not empty');
	} else {
		if (!existsSync(cwd)) {
			mkdir(cwd);
		}

		await spawn('npm', ['init', '--yes'], { cwd });
	}

	await m.default(cwd);
}
