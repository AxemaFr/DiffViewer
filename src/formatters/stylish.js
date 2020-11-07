import _ from 'lodash';

const INDENT_SIZE = 4;

const DiffChar = {
  space: ' ',
  minus: '- ',
  plus: '+ ',
};

const formatValue = (val, globalIndentSize) => {
  if (!_.isPlainObject(val)) {
    return val;
  }

  const localIndentSize = globalIndentSize + INDENT_SIZE;

  const lines = _.entries(val)
    .map(([key, value]) => {
      const formattedValue = formatValue(value, localIndentSize);
      return `${DiffChar.space.repeat(localIndentSize)}${key}: ${formattedValue}`;
    })
    .join('\n');

  const globalIndent = DiffChar.space.repeat(globalIndentSize);

  return `{\n${lines}\n${globalIndent}}`;
};

const formatDiffsToStylish = (list, globalIndentSize) => {
  const localIndentSize = globalIndentSize + INDENT_SIZE;

  const lines = list
    .flatMap(({
      type, key, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'removed':
          return `${DiffChar.minus.padStart(localIndentSize)}${key}: ${formatValue(oldValue, localIndentSize)}`;
        case 'added':
          return `${DiffChar.plus.padStart(localIndentSize)}${key}: ${formatValue(newValue, localIndentSize)}`;
        case 'updated': {
          const oldEntry = `${DiffChar.minus.padStart(localIndentSize)}${key}: ${formatValue(oldValue, localIndentSize)}`;
          const newEntry = `${DiffChar.plus.padStart(localIndentSize)}${key}: ${formatValue(newValue, localIndentSize)}`;
          return [oldEntry, newEntry];
        }
        case 'unchanged':
          return `${DiffChar.space.repeat(localIndentSize)}${key}: ${formatValue(oldValue, localIndentSize)}`;
        case 'parent':
          return `${DiffChar.space.repeat(localIndentSize)}${key}: ${formatDiffsToStylish(children, localIndentSize)}`;
        default:
          throw new Error(`Unknown type '${type}'`);
      }
    });

  const globalIndent = DiffChar.space.repeat(globalIndentSize);

  return `{\n${lines.join('\n')}\n${globalIndent}}`;
};

const getStylish = (diff) => formatDiffsToStylish(diff, 0);

export default getStylish;
