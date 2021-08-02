const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { build, defaultOptions } = require('./scripts/build');

const { argv } = yargs(hideBin(process.argv));

const options = {
  indent: argv.indent === undefined ? defaultOptions.indent : argv.index,
  map: argv.map || defaultOptions.map,
  sanity: argv.sanity || defaultOptions.sanity,
  ndjson: argv.ndjson || defaultOptions.ndjson,
  dist: argv.dist || defaultOptions.dist,
  dataPath: argv.dataPath || defaultOptions.dataPath
};

build(options);
