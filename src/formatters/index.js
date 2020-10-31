import _ from 'lodash';
import getStylish from './stylish.js';

const formatters = {
  stylish: getStylish,
  json: JSON.stringify,
};

const selectFormatter = (format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Unknown format '${format}'.`);
  }

  return formatters[format];
};

export default selectFormatter;
