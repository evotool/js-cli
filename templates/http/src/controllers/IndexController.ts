
import { Controller, Endpoint, Req, Res } from '@evojs/http';
import Logger from '@evojs/logger';

import { disabledAuth } from '../utils/auth-handlers';
import { Log } from '../utils/helpers';

@Controller({
	path: '',
	useMethodNames: true,
})
export class HelloController {
	constructor(
		@Req private readonly req: IncomingMessage,
		@Res private readonly res: ServerResponse,
		@Log private readonly logger: Logger,
	) {}

	@Endpoint({
		method: 'GET',
		query: {
			name: { type: 'string', optional: true },
		},
		authHandler: disabledAuth,
	})
	hello({ query: { name } }: RequestDataNoAuth<any, { name?: string }>): string {
		return `Hello ${name}!`;
	}
}
