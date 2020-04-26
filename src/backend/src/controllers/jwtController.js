const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');
const { check }  = require('./../util/requestChecker');
const Promise    = require('bluebird');
const jwt        = require('jsonwebtoken');
const config     = require('config');

const jwtConfig = config.get('jwt');

const jwtGen = async (login) => {
  try {
    const jwtGen = jwt.sign({login: login}, jwtConfig.secret, {algorithm: jwtConfig.algorithm, expiresIn: jwtConfig.expiresIn});
    return Promise.resolve(jwtGen);
  } catch (e) {
    Promise.reject(e);
  }
}

module.exports = {
  jwtGen,
}
