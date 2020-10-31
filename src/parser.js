import YAML from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: YAML.safeLoad,
  yml: YAML.safeLoad,
};

const selectParser = (extension) => parsers[extension];

export default selectParser;
