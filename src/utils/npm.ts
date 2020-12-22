import { resolve } from 'path';

import { spawn } from './child-process';
import { debug } from './helpers';

export const dependencies = {
	http: [
		'@evojs/http@^0.2.1',
		'@evojs/http-client@latest',
		'dotenv@latest',
		'mime@latest',
	],
	validator: ['@evojs/validator@^0.1.0'],
	logger: ['@evojs/logger@^0.0.4'],
	http_client: ['@evojs/http-client@latest'],
};

export const devDependencies = {
	http: [
		'@types/jest@latest',
		'@types/mime@latest',
		'@types/node@latest',
		'jest@latest',
		'nodemon@latest',
		'rimraf@latest',
		'ts-jest@latest',
		'ts-node@latest',
		'tsconfig-paths@latest',
		'typescript@latest',
	],
	eslint_plugin: [
		'@evojs/eslint-plugin@latest',
		'eslint@latest',
		'typescript@latest',
	],
};

export async function npmInstall(cwd: string, mode: 'save' | 'save-dev', packages: string[], peerDeps: boolean = false): Promise<void> {
	if (!packages.length) {
		return;
	}

	packages = packages.filter((x, i, a) => a.indexOf(x) === i);

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
