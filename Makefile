install: install-deps

run-plain:
	node bin/gendiff.js ./__fixtures__/tree1.json ./__fixtures__/tree2.json -f plain

run-stylish:
	node bin/gendiff.js ./__fixtures__/tree1.json ./__fixtures__/tree2.json -f stylish

run-json:
	node bin/gendiff.js ./__fixtures__/tree1.json ./__fixtures__/tree2.json -f json

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
