import { writeFileSync } from 'fs';
import { basename, resolve } from 'path';

import { copyTemplates, getCommit } from '../../utils/helpers';
import { dependencies, devDependencies, npmInstall } from '../../utils/npm';
import { packageJson } from '../../utils/package-json';

export default async (cwd: string): Promise<void> => {
	packageJson.name = basename(cwd);
	writeFileSync(resolve(cwd, 'package.json'), JSON.stringify(packageJson, null, '\t'), 'utf-8');

	await npmInstall(cwd, 'save', [...dependencies.http, ...dependencies.logger, ...dependencies.validator], true);
	await npmInstall(cwd, 'save-dev', [...devDependencies.eslint_plugin, ...devDependencies.http], true);

	copyTemplates(['eslint-plugin', 'logger', 'http'], cwd);

	await getCommit(cwd);
};
