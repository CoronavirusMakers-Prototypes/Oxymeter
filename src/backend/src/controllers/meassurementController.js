const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');
const { check }  = require('./../util/requestChecker');
const Promise    = require('bluebird');

const processPayloadFromProbes = async (data) => {
  try {
    if (data instanceof Array) {
      logger.debug("array payload: " + JSON.stringify(data));
      // Process an array of payload
    } else {
      // Process a sigle payload
      logger.debug("single payload " + JSON.stringify(data));
    }
    // The idea is to check tif the probe is legitime in the moment of insert
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  processPayloadFromProbes,
}
