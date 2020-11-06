const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { build } = require('./src/scripts/build');

const { argv } = yargs(hideBin(process.argv));
const options = {
  indent: argv.indent || 4,
  dist: argv.dist || false,
};

build(options);
