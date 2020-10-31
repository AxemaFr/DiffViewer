import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('stylish diff json', () => {
  expect(genDiff('./__fixtures__/tree1.json', './__fixtures__/tree2.json')).toBe(
    fs.readFileSync('./__fixtures__/expected_stylish', 'utf8'),
  );
});

test('stylish diff yml', () => {
  expect(genDiff('./__fixtures__/tree1.yml', './__fixtures__/tree2.yml')).toBe(
    fs.readFileSync('./__fixtures__/expected_stylish', 'utf8'),
  );
});
