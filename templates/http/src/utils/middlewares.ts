import { createReadStream } from 'fs';
import { getType } from 'mime';

import { getIpAddress } from './helpers';

let id = 0;
export function ResponseTimeMiddleware(req: IncomingMessage, res: ServerResponse): boolean {
	req._startAt = process.hrtime();
	req._logger = console.name(`ctx:${id++}`);
	res._logger = req._logger;

	res.on('close', () => {
		const diff = process.hrtime(req._startAt);
		const time = (diff[0] * 1e3) + (diff[1] * 1e-6);
		req._logger!.info(req.method, res.statusCode, req.url, `${time.toFixed(2)}ms`, getIpAddress(req), req.headers['user-agent']);
	});

	return false;
}

export function CorsMiddleware(req: IncomingMessage, res: ServerResponse): boolean {
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization, DNT, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Range');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
	res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range');

	if (req.method === 'OPTIONS') {
		res.writeHead(204, { 'Content-Length': '0' });

		res.end();

		return true;
	}

	return false;
}

export function StaticMiddleware(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
	return new Promise<boolean>((resolve) => {
		if (req.url?.startsWith('/static')) {
			res.setHeader('content-type', `${getType(req.url) ?? 'text/plain'}; charset=utf-8`);

			const readStream = createReadStream(`.${req.url}`);

			readStream
				.on('error', (err) => {
					req._logger!.error(err);
					res.writeHead(500);
					res.end(JSON.stringify({ status: 500, message: 'Internal Server Error', payload: { ...err } }));
					resolve(true);
				})
				.pipe(res);

			res.on('close', () => {
				readStream.destroy();
				resolve(true);
			});

			return;
		}

		resolve(false);
	});
}
