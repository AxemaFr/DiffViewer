install: install-deps

run:
	node bin/gendiff.js tree1.json tree2.json

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish
