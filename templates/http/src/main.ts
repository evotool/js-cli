import './overrides';

import { Application, ApplicationOptions } from '@evojs/http';

import { HelloController } from './controllers/HelloController';
import { HttpService } from './services/HttpService';
import { CorsMiddleware, ResponseTimeMiddleware, StaticMiddleware } from './utils/middlewares';

const logger = console.name('app');
logger.warn(`application starting in ${process.env.ENV} mode`);

const options: ApplicationOptions = {
	middlewares: [ResponseTimeMiddleware, CorsMiddleware, StaticMiddleware],
	controllers: [HelloController],
	providers: [
		{
			provide: 'LOGGER',
			useFactory: (req: IncomingMessage) => req._logger!,
			deps: ['REQUEST'],
		},
		HttpService,
	],
	hooks: {
		endpointsLoad: (endpoints) => {
			logger.info(`Endpoints loaded:\n${endpoints.map((e) => `${e.path} ${e.method}`).join('\n')}`);
		},
	},
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
