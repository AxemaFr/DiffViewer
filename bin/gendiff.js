#!/usr/bin/env node
import program from 'commander';
import getFilesDifference from '../src/index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((path1, path2) => {
    // eslint-disable-next-line no-console
    console.log(getFilesDifference(path1, path2, program.format));
  })
  .parse(process.argv);
