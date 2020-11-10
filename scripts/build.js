const xml2js = require('xml2js');

const path = require('path');

const { formatData, structureData, structureMap } = require('../lib/structure');
const { makeDir, removeDir, readFile, writeFile } = require('../utils/file');

const defaultOptions = {
  indent: 4,
  map: false,
  dist: false,
  dataPath: 'data/nrsv.xml'
};

const rootPath = path.join(__dirname, '..');

const paths = {
  build: path.resolve(rootPath, 'build'),
  dist: path.resolve(rootPath, 'dist')
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
  const { indent, map, dist, dataPath } = options;
  const xmlPath = path.resolve(rootPath, dataPath);
  const dir = dist ? paths.dist : paths.build;
  const filename = map ? 'nrsv-map.json' : 'nrsv.json';
  const filePath = `${dir}/${filename}`;
  const space = dist ? 0 : indent;

  try {
    const xml = await readFile(xmlPath);
    const xmlData = await parseStringPromise(xml);
    const jsonData = formatData(xmlData);
    const json = map ? structureMap(jsonData) : structureData(jsonData);
    const file = JSON.stringify(json, null, space);

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
