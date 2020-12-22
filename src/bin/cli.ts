#!/usr/bin/env node

import * as commander from 'commander';
import path = require('path');

import { add } from '../commands/add';
import { create } from '../commands/create';

global.rootdir = path.resolve(__dirname, '..');

const bootstrap = (program: commander.CommanderStatic): void => {
	const cwd = process.cwd();

	program
		.name('evojs')
		.version(
			require('../package.json').version,
			'-v, --version',
			'Output the current version.',
		)
		.usage('<command> [options]')
		.helpOption('-h, --help', 'Output usage information.');

	program
		.command('create <project_name> <module>')
		.description('create new project in <project_name> folder')
		.action(create.bind(null, cwd));

	program
		.command('add [module...]')
		.description('add modules to project in cwd')
		.action(add.bind(null, cwd));

	if (process.argv.length < 2) {
		program.outputHelp();
	} else {
		program.parse(process.argv);
	}
};

bootstrap(commander);

process.on('unhandledRejection', (reason) => {
	console.error(reason);
	process.exit(1);
});
