const Router     = require('express-promise-router');
const db         = require('../db');
const { logger } = require('./../util/logger');
const queries    = require('./../queries');
const config     = require('config');
const { check }  = require('./../util/requestChecker');

const router   = new Router();
module.exports = router;

router.post('/', async (req, res) => {
  try {
    if (!check(req.body, ['date', 'id_patient', 'id_sensor', 'ack_user', 'ack_date', 'status', 'id_bed'])) {
      throw 'bad request for endpoint: date, id_patient, id_sensor, ack_user, ack_date, status, id_bed';
    }
    const response = await db.query(queries.alarm.create,[req.body.date, req.body.id_patient, req.body.id_sensor, req.body.ack_user, req.body.ack_date, req.body.status, req.body.id_bed]);
    req.body.id = response.rows[0].id;
    res.status(200).send(JSON.stringify(req.body));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(queries.alarm.delete,[id]);
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
    const result = await db.query(queries.alarm.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.alarm.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['date', 'id_patient', 'id_sensor', 'ack_user', 'ack_date', 'status', 'id_bed'])) {
      throw 'bad request for endpoint: date, id_patient, id_sensor, ack_user, ack_date, status, id_bed';
    }
    const { id } = req.params;
    const result = await db.query(queries.alarm.update, [req.body.date, req.body.id_patient, req.body.id_sensor, req.body.ack_user, req.body.ack_date, req.body.status, req.body.id_bed, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})
