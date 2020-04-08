const Router     = require('express-promise-router');
const db         = require('../db');
const { logger } = require('./../util/logger');
const queries    = require('./../queries');
const config     = require('config');
const { check }  = require('./../util/requestChecker');

// const router   = new Router();
// module.exports = router;


// TODO all I will take care about this one.
// jwt, etc 
