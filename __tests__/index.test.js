import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('flat diff', () => {
  expect(JSON.stringify(genDiff('./__fixtures__/tree1.json', './__fixtures__/tree2.json'))).toBe(
    JSON.stringify(['  - age: 14',
      '  + age: 12',
      '  + dima: blin',
      '    kek: 131',
      '  - more: true',
    ]),
  );
});
