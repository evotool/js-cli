import { npmInstall, packages } from '../../utils/npm';

export default async (cwd: string): Promise<void> => {
	await npmInstall(cwd, 'save', [...packages.validator], true);
};
