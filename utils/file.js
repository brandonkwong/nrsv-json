const fs = require('fs');

const makeDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

const removeDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.rmdir(path, { recursive: true }, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
};

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

module.exports = {
  makeDir,
  removeDir,
  readFile,
  writeFile
};
