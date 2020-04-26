const sjcl    = require('sjcl');
const Promise = require('bluebird');


const hasher = (stringToHash) => {
  try {
    const bitArray = sjcl.hash.sha256.hash(stringToHash);
    const hash     = sjcl.codec.hex.fromBits(bitArray);
    return Promise.resolve(hash);
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = { hasher }
