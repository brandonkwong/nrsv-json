const xml2js = require('xml2js');

const path = require('path');

const { structureData } = require('../lib/structure');
const { structureMap } = require('../lib/structure-map');
const { makeDir, removeDir, readFile, writeFile } = require('../utils/file');

const defaultOptions = {
  indent: 4,
  map: false,
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

async function cleanBuild (buildPath, dist) {
  if (dist) return removeDir(buildPath);
  await removeDir(buildPath);
  return makeDir(buildPath);
}

async function build (options = {}) {
  const { indent, map, dist } = { ...defaultOptions, ...options };
  const dir = dist ? paths.dist : paths.build;
  const jsonFile = map ? 'nrsv-map.json' : 'nrsv.json';
  const jsonPath = `${dir}/${jsonFile}`;
  const space = dist ? 0 : indent;

  try {
    const xml = await readFile(paths.xml);
    const json = await parseStringPromise(xml);
    const data = map ? structureMap(json) : structureData(json);
    const file = JSON.stringify(data, null, space);

    await cleanBuild(paths.build, dist);

    writeFile(jsonPath, file);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  build,
  defaultOptions
};
