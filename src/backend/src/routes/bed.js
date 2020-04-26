const Router     = require('express-promise-router');
const db         = require('../db');
const { logger } = require('./../util/logger');
const queries    = require('./../queries');
const config     = require('config');
const { check }  = require('./../util/requestChecker');

const router   = new Router();
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    if (!check(req.body, ['desc', 'id_room'])) {
      throw 'bad request for endpoint, mandatory: desc, id_room';
    }
    const response = await db.query(queries.bed.create,[req.body.desc, req.body.id_room]);
    req.body.id = parseInt(response.rows[0].id);
    res.status(200).send(JSON.stringify(req.body));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query(queries.bed.delete,[id]);
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
    const result = await db.query(queries.bed.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.get('/byIdRoom/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.bed.getByIdRoom, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.bed.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    next(e);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!check(req.body, ['desc', 'id_floor'])) {
      throw 'bad request for endpoint, mandatory: desc, id_floor';
    }
    const { id } = req.params;
    const result = await db.query(queries.bed.update, [req.body.desc, req.body.id_floor, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    next(e);
  }
})
