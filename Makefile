install: install-deps

run:
	node bin/gendiff.js ./__fixtures__/tree1.json ./__fixtures__/tree2.json

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish
