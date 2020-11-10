const xml2js = require('xml2js');

const path = require('path');

const { formatData, structureData, structureMap } = require('../lib/structure');
const { makeDir, removeDir, readFile, writeFile } = require('../utils/file');

const defaultOptions = {
  indent: 4,
  map: false,
  dist: false
};

const paths = {
  xml: path.resolve(__dirname, '../data/nrsv.xml'),
  build: path.resolve(__dirname, '../build'),
  dist: path.resolve(__dirname, '../dist')
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
  const filename = map ? 'nrsv-map.json' : 'nrsv.json';
  const filePath = `${dir}/${filename}`;
  const space = dist ? 0 : indent;

  try {
    const xml = await readFile(paths.xml);
    const json = await parseStringPromise(xml);
    const jsonData = formatData(json, { sample: dist });
    const data = map ? structureMap(jsonData) : structureData(jsonData);
    const file = JSON.stringify(data, null, space);

    await cleanBuild(paths.build, dist);

    writeFile(filePath, file);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  build,
  defaultOptions
};
