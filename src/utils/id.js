const crypto = require('crypto');

function generateId(name) {
  return crypto.createHash('md5').update(name).digest('hex');
}

module.exports = {
  generateId,
};
