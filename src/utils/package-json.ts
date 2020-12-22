export const packageJson = {
	'name': '',
	'description': '',
	'version': '0.1.0',
	'author': '',
	'private': true,
	'scripts': {
		'prebuild': 'npm install && rimraf dist/',
		'prestart': 'npm run build',
		'build': 'node node_modules/.bin/tsc -p tsconfig.build.json',
		'start': 'node dist/main.js',
		'dev': 'nodemon',
		'test': 'jest --coverage --detectOpenHandles',
		'lint': 'eslint "src/**/*.ts" -f codeframe',
	},
	'dependencies': {},
	'devDependencies': {},
	'jest': {
		'collectCoverage': true,
		'collectCoverageFrom': ['src/**/*.ts'],
		'moduleFileExtensions': ['js', 'ts'],
		'rootDir': './',
		'testEnvironment': 'node',
		'testRegex': '.spec.ts$',
		'transform': {
			'^.+\\.(ts|js)$': 'ts-jest',
		},
		'globals': {
			'ts-jest': {
				'tsconfig': 'tsconfig.spec.json',
			},
		},
	},
	'nodemonConfig': {
		'ignore': [
			'.git/',
			'.vscode/',
			'node_modules/',
			'dist/',
			'static/',
		],
		'exec': 'ts-node --files src/main.ts',
		'ext': 'ts',
	},
};
