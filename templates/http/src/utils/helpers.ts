import { Inject } from '@evojs/http';
import { IncomingMessage } from 'http';

export const Log = Inject('LOGGER');

export function getIpAddress(req: IncomingMessage): string | undefined {
	return (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress) as string | undefined;
}
