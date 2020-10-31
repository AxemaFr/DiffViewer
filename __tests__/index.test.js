import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFixturesPath = (extName) => [`./__fixtures__/tree1.${extName}`, `./__fixtures__/tree2.${extName}`];

const getExpectedPath = (formatterName) => `./__fixtures__/expected_${formatterName}`;

const testCases = [
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
];

test.each(testCases)('deep structures diff: (input file ext: %s, output file ext: %s)', (inputExt, formatterName) => {
  const [filepath1, filepath2] = getFixturesPath(inputExt);

  const expected = fs.readFileSync(getExpectedPath(formatterName), 'utf8');

  expect(genDiff(filepath1, filepath2, formatterName)).toBe(expected);
});
