import { copyTemplates } from '../../utils/helpers';
import { devDependencies, npmInstall } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	copyTemplates(['eslint-plugin'], cwd);

	await npmInstall(cwd, 'save-dev', [...devDependencies.eslint_plugin], true);
};
