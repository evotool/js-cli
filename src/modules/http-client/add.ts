import { dependencies, npmInstall } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	await npmInstall(cwd, 'save', [...dependencies.http_client], true);
};
