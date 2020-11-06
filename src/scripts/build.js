const xml2js = require('xml2js');

const path = require('path');

const { structureData } = require('../lib/structure');
const { makeDir, removeDir, readFile, writeFile } = require('../utils/file');

const defaultOptions = {
  indent: 4,
  dist: false
};

const paths = {
  xml: path.resolve(__dirname, '../data/nrsv.xml'),
  build: path.resolve(__dirname, '../../build'),
  dist: path.resolve(__dirname, '../..')
};

const { parseStringPromise } = new xml2js.Parser({
  explicitRoot: false
});

async function cleanBuild () {
  await removeDir(paths.build);
  return makeDir(paths.build);
}

async function build (options = {}) {
  const { indent, dist } = { ...defaultOptions, ...options };
  const dir = dist ? paths.dist : paths.build;
  const jsonPath = `${dir}/nrsv.json`;
  const space = dist ? 0 : indent;

  try {
    const xml = await readFile(paths.xml);
    const json = await parseStringPromise(xml);
    const data = structureData(json);
    const file = JSON.stringify(data, null, space);

    await cleanBuild();

    writeFile(jsonPath, file);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  build,
  defaultOptions
};
