const xml2js = require('xml2js');

const path = require('path');
const { exec } = require('child_process');

const { formatData, structureData, structureMap, structureSanity } = require('../lib/structure');
const { makeDir, removeDir, readFile, writeFile } = require('../utils/file');

const defaultOptions = {
  indent: 4,
  map: false,
  sanity: false,
  ndjson: false,
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
  const { indent, map, sanity, ndjson, dist, dataPath } = options;
  const xmlPath = path.resolve(rootPath, dataPath);
  const dir = dist ? paths.dist : paths.build;

  let filename = 'nrsv.json';

  if (map) filename = 'nrsv-map.json';
  if (sanity) filename = 'nrsv-sanity.json';

  const filePath = `${dir}/${filename}`;
  const space = dist ? 0 : indent;

  try {
    const xml = await readFile(xmlPath);
    const xmlData = await parseStringPromise(xml);
    const jsonData = formatData(xmlData);

    let json = {};

    if (!map && !sanity) json = structureData(jsonData);
    if (map) json = structureMap(jsonData);
    if (sanity) json = structureSanity(jsonData);

    const file = JSON.stringify(json, null, space);

    await cleanBuild(paths.build, dist);
    await writeFile(filePath, file);

    if (ndjson) {
      exec(`cat ${filePath} | jq -c '.[]' > ${dir}/nrsv-nd.json`);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  build,
  defaultOptions
};
