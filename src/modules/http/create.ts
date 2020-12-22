import { resolve } from 'path';

import { copy } from '../../utils/fs';
import { npmInstall, packages } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	await npmInstall(cwd, 'save', [...packages.http, ...packages.logger, ...packages.validator], true);
	await npmInstall(cwd, 'save-dev', [...packages.eslint_plugin], true);

	copy(resolve(rootdir, 'templates/eslint-plugin/*'), cwd);
	copy(resolve(rootdir, 'templates/logger/*'), cwd);
	copy(resolve(rootdir, 'templates/http/*'), cwd);
};
