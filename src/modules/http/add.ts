import { copyTemplates } from '../../utils/helpers';
import { dependencies, devDependencies, npmInstall } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	copyTemplates(['eslint-plugin', 'logger', 'http'], cwd);

	await npmInstall(cwd, 'save', [...dependencies.http, ...dependencies.logger, ...dependencies.validator], true);
	await npmInstall(cwd, 'save-dev', [...devDependencies.eslint_plugin, ...devDependencies.http], true);
};
