import { resolve } from 'path';

import { spawn } from './child-process';
import { debug } from './helpers';

export const packages = {
	http: ['@evojs/http@^0.2.1', 'mime@latest'],
	validator: ['@evojs/validator@^0.1.0'],
	logger: ['@evojs/logger@^0.0.4'],
	eslint_plugin: ['@evojs/eslint-plugin@latest', 'eslint@latest', 'typescript@latest'],
};

export async function npmInstall(cwd: string, mode: 'save' | 'save-dev', packages: string[], peerDeps: boolean = false): Promise<void> {
	if (!packages.length) {
		return;
	}

	debug('NPM_INSTALL', cwd, mode, packages, peerDeps);
	await spawn('npm', ['install', '--loglevel=error', `--${mode}`, ...packages], { cwd });

	if (!peerDeps) {
		return;
	}

	for (const p of packages) {
		const packageName = p.replace(/^(.+?)(@.*?)?$/, '$1');
		const packageJsonPath = resolve(cwd, `node_modules/${packageName}/package.json`);
		const packageJson = require(packageJsonPath) as { peerDependencies?: { [packageName: string]: string } };
		const peerDependencies = Object.entries((packageJson.peerDependencies || {}) as { [packageName: string]: string })
			.map(([packageName, packageVersion]) => `${packageName}@"${packageVersion}"`);
		await npmInstall(cwd, mode, peerDependencies, true);
	}
}
