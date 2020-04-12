const Router     = require('express-promise-router');
const db         = require('../db');
const { logger } = require('./../util/logger');
const queries    = require('./../queries');
const config     = require('config');
const { check }  = require('./../util/requestChecker');
const jwt        = require('jsonwebtoken');

const router   = new Router();
module.exports = router;

jwtConfig = config.get('jwt')


router.post('/', async (req, res) => {
  try {
    if (!check(req.body, ['surname', 'lastname', 'professional_id', 'last_login', 'id_role', 'login', 'password', 'id_hospital'])) {
      throw 'bad request for endpoint, mandatory: surname, lastname, professional_id, last_login, id_role, login, password, id_hospital';
    }
    jwtGen = jwt.sign({login: req.body.login, password: req.body.password}, jwtConfig.secret, {algorithm: jwtConfig.algorithm, expiresIn: jwtConfig.expiresIn});
    const response = await db.query(queries.personal.create,[req.body.surname, req.body.lastname, req.body.professional_id, req.body.last_login, req.body.id_role, req.body.login, req.body.password, req.body.id_hospital, jwtGen]);
    req.body.id = parseInt(response.rows[0].id);
    const userResponse = {
      token: jwtGen,
      user: req.body,
    }
    res.status(200).send(JSON.stringify(userResponse));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(queries.personal.delete,[id]);
    res.status(200).send({deleted: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.get('/', async (req, res) => {
  try {
    const { id } = req.params;
    const offset = req.query.offset;
    const result = await db.query(queries.personal.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.personal.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/:id', async (req, res) => {
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
