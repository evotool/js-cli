import { spawn as cpSpawn } from 'child_process';

import { debug } from './helpers';

export function spawn(command: string, args: string[], { errors = true, cwd }: SpawnOptions = {}): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		debug('SPAWN', command, args, { cwd, errors });

		const child = cpSpawn(command, args, { cwd, shell: true, stdio: 'inherit' });
		const onClose = (code: number): void => {
			child.removeAllListeners();

			if (code !== 0) {
				debug('SPAWN_ERROR', code, command, args, { cwd, errors });

				if (errors) {
					reject(code);

					return;
				}
			}

			resolve(code);
		};

		child.on('exit', onClose);
		child.on('close', onClose);
	});
}

export interface SpawnOptions {
	cwd?: string;
	errors?: boolean;
}
