import './utils/logger';
import type { RequestData as CoreRequestData } from '@evojs/http';
import type Logger from '@evojs/logger';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import type { IncomingMessage as HttpIncomingMessage, ServerResponse as HttpServerResponse } from 'http';

import { ___AuthEntityExample___ } from './utils/auth-handlers';

export {};

declare global {
	interface IncomingMessage extends HttpIncomingMessage {
		_logger?: Logger;
		_startAt?: [number, number];
	}

	interface ServerResponse extends HttpServerResponse {
		_logger?: Logger;
	}

	type RequestDataNoAuth<B = any, Q = {}> = CoreRequestData<undefined, Q, B>;
	type RequestDataOptAuth<B = any, Q = {}> = CoreRequestData<___AuthEntityExample___ | undefined, Q, B>;
	type RequestData<B = any, Q = {}> = CoreRequestData<___AuthEntityExample___, Q, B>;
}

type NodeEnv = (typeof ENV_TYPES)[number];

const ENV_TYPES = ['production', 'staging', 'testing', 'development'] as const;
let nodeEnv = process.env.ENV as NodeEnv | undefined;

if (!nodeEnv) {
	nodeEnv = 'development';
	process.env.ENV = nodeEnv;
} else if (!ENV_TYPES.includes(nodeEnv)) {
	console.error(`Unknown environment type "${nodeEnv}"`);
	process.exit(1);
}

const envFile = `.env/${nodeEnv}.env`;

if (existsSync(envFile)) {
	config({ path: envFile });
}
