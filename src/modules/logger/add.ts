import { resolve } from 'path';

import { copy } from '../../utils/fs';
import { npmInstall, packages } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	await npmInstall(cwd, 'save', [...packages.logger], true);
	copy(resolve(rootdir, 'templates/logger/*'), cwd);
};
