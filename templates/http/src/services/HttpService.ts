import { Injectable } from '@evojs/http';
import { HttpClient } from '@evojs/http-client';
import Logger from '@evojs/logger';

import { Log } from '../utils/helpers';

@Injectable()
export class HttpService extends HttpClient {
	constructor(@Log logger: Logger) {
		super(logger.name('http'));
	}
}
