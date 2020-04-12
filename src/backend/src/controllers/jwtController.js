const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');
const { check }  = require('./../util/requestChecker');
const Promise    = require('bluebird');
const jwt        = require('jsonwebtoken');
const config     = require('config');

const jwtConfig = config.get('jwt');

const jwtValidator = async (req) => {
  try {
    // console.log(req.get('token')); // TODO: check if is better have the token in headers.
    if (!check(req.body, ['token'])) {
      throw 'bad request for endpoint, mandatory: token';
    }
    const response = await db.query(queries.util.getUserJwt,[req.body.token]);
    if (response.rows.length === 0) {
      throw 'Not valid token for request';
    }
    jwt.verify(req.body.token, jwtConfig.secret, (error, decoded) => {
      if (typeof error === 'undefined' || error === null) {
        if (response.rows[0].login === decoded.login) {
            return Promise.resolve();
        } else {
            throw 'Not valid token for request';
        }
      } else {
        throw error;
      }
    });
  } catch (e) {
    logger.error(`Not valid jwt: ${e}`);
    return Promise.reject(e);
  }
}

const jwtGen = async (login) => {
  try {
    const jwtGen = jwt.sign({login: login}, jwtConfig.secret, {algorithm: jwtConfig.algorithm, expiresIn: jwtConfig.expiresIn});
    return Promise.resolve(jwtGen);
  } catch (e) {
    Promise.reject(e);
  }
}

module.exports = {
  jwtValidator,
  jwtGen,
}
