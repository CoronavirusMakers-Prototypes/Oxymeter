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
    if (!check(req.body, ['id_patient', 'id_sensor', 'ack_user', 'ack_date', 'status', 'id_bed'])) {
      throw 'bad request for endpoint: date, id_patient, id_sensor, ack_user, ack_date, status, id_bed';
    }
    // maybe starting with datetime nightmare (sometime sooner or later will be the moment of moment)
    const response = await db.query(queries.alarm.create,[req.body.id_patient, req.body.id_sensor, req.body.ack_user, req.body.ack_date, req.body.status, req.body.id_bed]);
    req.body.id = parseInt(response.rows[0].id);
    res.status(200).send(JSON.stringify(req.body));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.post('/suscriptions', async (req, res) => {
    try {
      if (!check(req.body, ['id_user', 'id_room', 'id_area', 'id_floor'])) {
        throw 'bad request for endpoint, mandatory: id_user, id_room, id_area, id_floor';
      }
      const response = await db.query(queries.personal_alarm_suscriptions.create,[req.body.id_user, req.body.id_room, req.body.id_area, req.body.id_floor]);
      req.body.id = parseInt(response.rows[0].id);
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

router.delete('/suscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(queries.personal_alarm_suscription.delete,[id]);
    res.status(200).send({deleted: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.get('/', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.alarm.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.get('/suscriptions/', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.personal_alarm_suscriptions.read);
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

router.get('/suscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.personal_alarm_suscriptions.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['id_patient', 'id_sensor', 'ack_user', 'ack_date', 'status', 'id_bed'])) {
      throw 'bad request for endpoint: id_patient, id_sensor, ack_user, ack_date, status, id_bed';
    }
    const { id } = req.params;
    const result = await db.query(queries.alarm.update, [req.body.id_patient, req.body.id_sensor, req.body.ack_user, req.body.ack_date, req.body.status, req.body.id_bed, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/suscriptions/:id', async (req, res) => {
  try {
    if (!check(req.body, ['id_user', 'id_room', 'id_area', 'id_floor'])) {
      throw 'bad request for endpoint, mandatory: id_user, id_room, id_area, id_floor';
    }
    const { id } = req.params;
    const result = await db.query(queries.personal_alarm_suscriptions.update, [req.body.id_user, req.body.id_room, req.body.id_area, req.body.id_floor, id]);
    res.status(200).send({updated: parseInt(id)});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})
