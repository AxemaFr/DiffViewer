install: install-deps

run:
	node bin/gendiff.js ./__fixtures__/tree1.yml ./__fixtures__/tree2.yml

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
