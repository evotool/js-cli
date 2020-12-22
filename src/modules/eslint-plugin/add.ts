import { resolve } from 'path';

import { copy } from '../../utils/fs';
import { npmInstall, packages } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	await npmInstall(cwd, 'save-dev', [...packages.eslint_plugin], true);
	copy(resolve(__dirname, '../templates/eslint-plugin/*'), cwd);
};