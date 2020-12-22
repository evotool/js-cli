import './overrides';

import { Application, ApplicationOptions } from '@evojs/http';

import { HelloController } from './controllers/IndexController';
import { CorsMiddleware, ResponseTimeMiddleware, StaticMiddleware } from './utils/middlewares';

const logger = console.name('app');
logger.warn(`application starting in ${process.env.ENV} mode`);

const options: ApplicationOptions = {
	controllers: [HelloController],
	providers: [{ provide: 'LOGGER', useFactory: (req: IncomingMessage) => req._logger!, deps: ['REQUEST'] }],
	middlewares: [ResponseTimeMiddleware, CorsMiddleware, StaticMiddleware],
};

async function bootstrap(): Promise<void> {
	const { PORT, HOST } = process.env;

	const app = await Application.create(options);
	await app.listen(+PORT! || 3000, HOST || 'localhost');

	const { host, port } = app.address!;
	logger.info(`starting on http://${host}:${port}/`);
}

bootstrap()
	.catch((err) => {
		logger.error(err);
	});
