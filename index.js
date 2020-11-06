const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { build, defaultOptions } = require('./src/scripts/build');

const { argv } = yargs(hideBin(process.argv));

const options = {
  indent: argv.indent || defaultOptions.indent,
  dist: argv.dist || defaultOptions.dist,
};

build(options);
