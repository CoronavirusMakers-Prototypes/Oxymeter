const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');
const { check }  = require('./../util/requestChecker');
const Promise    = require('bluebird');
const jwt        = require('jsonwebtoken');
const config     = require('config');

const jwtConfig = config.get('jwt');

const routesToFilter = {
  '/users/login': '',
  '/meassurement':'',
  '/users/logout':'',
  '/users/signin':'',
}

const jwtValidator = async (req, res, next) => {
  try {
    // exclude some endpoints for jwt validation
    if (typeof routesToFilter[req.originalUrl] !== 'undefined' &&
        routesToFilter[req.originalUrl]        !== null ||
        (/\/hospitals.*/.test(req.originalUrl) &&
         req.method === 'GET')
       ) {
         return next();
    }
    if (typeof req.get('token') === 'undefined' || req.get('token') === null) {
      throw 'bad request for endpoint, mandatory token at headers';
    }
    const response = await db.query(queries.util.getUserJwt,[req.get('token')]);
    if (response.rows.length === 0) {
      throw 'Not valid token for request';
    }
    jwt.verify(req.get('token'), jwtConfig.secret, (error, decoded) => {
      if (typeof error === 'undefined' || error === null) {
        if (response.rows[0].login === decoded.login) {
            next();
        } else {
            throw 'Not valid token for request';
        }
      } else {
        throw error;
      }
    });
  } catch (e) {
    logger.error(`Not valid jwt: ${e}`);
    next(e);
  }
}

module.exports = {
  jwtValidator,
}
