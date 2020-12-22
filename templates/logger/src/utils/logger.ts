import Logger, { Caller, Level, Record } from '@evojs/logger';
import * as cluster from 'cluster';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { resolve as pathResolve } from 'path';
import { inspect } from 'util';

const LOGS_PATH = pathResolve('logs/');
const ERROR_LOG_FILE = pathResolve(LOGS_PATH, 'error.log');

if (!existsSync(LOGS_PATH)) {
	mkdirSync(LOGS_PATH, { recursive: true });
}

const errorLogFileStream = createWriteStream(ERROR_LOG_FILE, { flags: 'a' });
const errorLevels: Level[] = ['warn', 'error', 'critical'];

const wid = cluster.isMaster ? '0' : cluster.worker.id;
const pid = process.pid;

Logger.configure({
	meta: { wid, pid },
	formats: [`{{ date | isodate }} [${wid}:${pid}] {{ level | uppercase }}{{ name | name }} {{ args | message }}<-|->{{ caller | file }} `],
	pipes: {
		isodate: (v: number): string => new Date(v).toISOString(),
		uppercase: (text: string): string => text.toUpperCase(),
		name: (v: string | undefined): string => v ? ` <${v}>` : '',
		message: (a: any[]): string => a.map((x) => typeof x === 'string' ? x : x instanceof Error ? x.stack : inspect(x, false, null, false)).join(' '),
		file: ({ fileName, line, column }: Caller): string => `${fileName}:${line}:${column}`,
	},
	handler(record: Record): void {
		const [message] = record.messages();

		if (errorLevels.includes(record.level)) {
			process.stderr.write(`${message}\n`);
			errorLogFileStream.write(`${message}\n`);
		} else {
			process.stdout.write(`${message}\n`);
		}
	},
});

Logger.overrideConsole();

export {};
