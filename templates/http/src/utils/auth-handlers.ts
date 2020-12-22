import { IncomingMessage, ServerResponse } from 'http';

import { ForbiddenException, UnauthorizedException } from './exceptions';

export interface ___AuthEntityExample___ {}

export function disabledAuth(req: IncomingMessage, res: ServerResponse): undefined {
	if (req.headers.authorization) {
		throw new ForbiddenException('You should be unauthorized');
	}

	return;
}

export async function optionalAuth(req: IncomingMessage, res: ServerResponse): Promise<___AuthEntityExample___ | undefined> {
	const [accessKey, type] = (req.headers.authorization || ' ').split(' ');

	if (!accessKey || !type) {
		return;
	}

	const token = await Promise.resolve({});

	return token;
}

export async function requiredAuth(req: IncomingMessage, res: ServerResponse): Promise<___AuthEntityExample___> {
	const [type, accessKey] = (req.headers.authorization || ' ').split(' ');

	if (type !== 'Bearer' || !accessKey) {
		throw new UnauthorizedException(undefined, { code: 'EMPTY_TOKEN' });
	}

	const token = await Promise.resolve({});

	if (!token) {
		throw new UnauthorizedException(undefined, { code: 'TOKEN_NOT_FOUND' });
	}

	return token;
}
