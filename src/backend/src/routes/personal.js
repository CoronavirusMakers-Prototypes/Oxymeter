const Router     = require('express-promise-router');
const db         = require('../db');
const { logger } = require('./../util/logger');
const queries    = require('./../queries');
const config     = require('config');
const { check }  = require('./../util/requestChecker');

const { jwtGen } = require('./../controllers/jwtController');

const router   = new Router();
module.exports = router;

router.post('/signin', async (req, res, next) => {
  try {
    if (!check(req.body, ['surname', 'lastname', 'professional_id', 'login', 'password', 'id_hospital'])) {
      throw 'bad request for endpoint, mandatory: surname, lastname, professional_id, login, password, id_hospital';
    }
    const jwt         = await jwtGen(req.body.login);
    const lastLogin   = new Date();
    const defaultRole = 1;
    const response = await db.query(queries.personal.create,[req.body.surname, req.body.lastname, req.body.professional_id, lastLogin, defaultRole, req.body.login, req.body.password, req.body.id_hospital, jwt]);
    req.body.id = parseInt(response.rows[0].id);
    delete req.body.password;
    const userResponse = {
      token: jwt,
      user: req.body,
    }
    res.status(200).send(JSON.stringify(userResponse));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.post('/login', async (req, res, next) => {
  try {
    if (!check(req.body, ['login', 'password'])) {
      throw 'bad request for endpoint, mandatory: login, password';
    }
    const response = await db.query(queries.personal.credentials,[req.body.login, req.body.password]);
    if (response.rows.length === 0) {
      throw `Not valid credentials for user ${req.body.login}`;
    }
    const personal  = response.rows[0];
    const jwt       = await jwtGen(req.body.login);
    const lastLogin = new Date();
    const result    = await db.query(queries.personal.login,[jwt, personal.id, lastLogin]);
    delete personal.password;
    delete personal.jwt;
    const userResponse = {
      token: jwt,
      user: personal,
    }
    res.status(200).send(JSON.stringify(userResponse));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    if (!check(req.body, ['login', 'id'])) {
      throw 'bad request for endpoint, mandatory: login';
    }
    const result = await db.query(queries.personal.logout,[req.body.id]);
    res.status(200).send(`User ${req.body.login} logout.`);
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query(queries.personal.delete,[id]);
    res.status(200).send({deleted: id});
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { id } = req.params;
    const offset = req.query.offset;
    const result = await db.query(queries.personal.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.personal.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!check(req.body, ['surname', 'lastname', 'professional_id', 'last_login', 'id_role', 'login', 'password', 'id_hospital'])) {
      throw 'bad request for endpoint, mandatory: surname, lastname, professional_id, last_login, id_role, login, password, id_hospital';
    }
    const { id } = req.params
    const result = await db.query(queries.personal.update, [req.body.surname, req.body.lastname, req.body.professional_id, req.body.last_login, req.body.id_role, req.body.login, req.body.password, req.body.id_hospital, id])
    res.status(200).send({updated: id})
  } catch (e) {
    logger.error(e)
    res.status(500).send(e)
  }
})
