import { copyTemplates } from '../../utils/helpers';
import { devDependencies, npmInstall } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	await npmInstall(cwd, 'save-dev', [...devDependencies.eslint_plugin], true);
	copyTemplates(['eslint-plugin'], cwd);
};
