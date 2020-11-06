const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { build, defaultOptions } = require('./scripts/build');

const { argv } = yargs(hideBin(process.argv));

const options = {
  indent: argv.indent || defaultOptions.indent,
  map: argv.map || defaultOptions.map,
  dist: argv.dist || defaultOptions.dist
};

build(options);
