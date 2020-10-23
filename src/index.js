import fs from 'fs';
import path from 'path';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

export default function index(path1, path2) {
  const firstData = getData(getFullPath(path1));
  const secondData = getData(getFullPath(path2));

  const combinedObjectsEntriesUnion = Object.entries(Object.assign({}, firstData, secondData))
    .sort((a, b) => a[0] > b[0] ? 1 : -1);

  return combinedObjectsEntriesUnion.reduce( (diffAcc, currentEntrie) => {
    if (!firstData.hasOwnProperty(currentEntrie[0])) {
      diffAcc.push({
        symbol: '+',
        key: currentEntrie[0],
        value: currentEntrie[1],
      });
      return diffAcc;
    }
    if (!secondData.hasOwnProperty(currentEntrie[0])) {
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
    } else {
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
    }
  }, [])
    .map((diffObj) => {
      return `  ${diffObj.symbol} ${diffObj.key}: ${diffObj.value}`;
    });
}