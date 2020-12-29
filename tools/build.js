const { writeFileSync, readFileSync, copyFileSync, chmodSync, mkdirSync, existsSync } = require('fs');
const { sync } = require('glob');
const { resolve, dirname } = require('path');

const mainDir = dirname(__dirname);

const packageJson = JSON.parse(readFileSync(resolve(mainDir, 'package.json')).toString());

delete packageJson.scripts;
delete packageJson.jest;
delete packageJson.nodemonConfig;
delete packageJson.devDependencies;

writeFileSync(resolve(mainDir, 'dist/package.json'), JSON.stringify(packageJson, null, '\t'));

const jsTsFiles = sync(resolve(__dirname, '../dist/**/*.{js,ts}'));

for (const f of jsTsFiles) {
	writeFileSync(f, readFileSync(f, 'utf-8').replace(/ {4}/g, '\t'));
}

const copyingFiles = ['LICENSE', 'README.md', ...sync(resolve(mainDir, 'templates/**'), { nodir: true, dot: true })].map((p) => resolve(p).substring(mainDir.length + 1));

for (const cf of copyingFiles) {
	const dir = resolve(mainDir, `dist/${dirname(cf)}`);

	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}

	copyFileSync(resolve(mainDir, cf), resolve(mainDir, `dist/${cf}`));
}

chmodSync('dist/bin/cli.js', '775');
