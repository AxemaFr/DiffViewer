import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');

function getParser(filePath) {
  const format = path.extname(filePath);

  switch (format) {
    case '.yml':
      return yaml.safeLoad;
    case '.json':
      return JSON.parse;
    default:
      return JSON.parse;
  }
}

function getFilesDifference(firstData, secondData) {
  const combinedObjectsEntriesUnion = Object.entries({ ...firstData, ...secondData })
    .sort((a, b) => (a[0] > b[0] ? 1 : -1));

  return combinedObjectsEntriesUnion.reduce((diffAcc, currentEntrie) => {
    if (!Object.prototype.hasOwnProperty.call(firstData, currentEntrie[0])) {
      diffAcc.push({
        symbol: '+',
        key: currentEntrie[0],
        value: currentEntrie[1],
      });
      return diffAcc;
    }
    if (!Object.prototype.hasOwnProperty.call(secondData, currentEntrie[0])) {
      diffAcc.push({
        symbol: '-',
        key: currentEntrie[0],
        value: currentEntrie[1],
      });
      return diffAcc;
    }
    if (firstData[currentEntrie[0]] === secondData[currentEntrie[0]]) {
      diffAcc.push({
        symbol: ' ',
        key: currentEntrie[0],
        value: currentEntrie[1],
      });
      return diffAcc;
    }

    diffAcc.push({
      symbol: '-',
      key: currentEntrie[0],
      value: firstData[currentEntrie[0]],
    });
    diffAcc.push({
      symbol: '+',
      key: currentEntrie[0],
      value: currentEntrie[1],
    });
    return diffAcc;
  }, [])
    .map((diffObj) => `  ${diffObj.symbol} ${diffObj.key}: ${diffObj.value}`);
}

export default function index(path1, path2) {
  const parser1 = getParser(path1);
  const parser2 = getParser(path2);

  const firstData = parser1(getData(getFullPath(path1)));
  const secondData = parser2(getData(getFullPath(path2)));

  return getFilesDifference(firstData, secondData);
}
