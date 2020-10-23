#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js'
program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'default')
  .action((path1, path2) => { // Код вызова внутри action
    // Вывод на экран происходит здесь, а не внутри библиотеки
    console.log(genDiff(path1, path2));
  })
  .parse(process.argv);
