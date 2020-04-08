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
    if (!check(req.body, ['surname', 'lastname', 'hospital_reference', 'suscribed', 'unsuscribed', 'id_bed', 'id_sensor', 'spo2_max', 'spo2_min', 'pulse_max', 'pulse_min', 'temp_max', 'temp_min', 'status'])) {
      throw 'bad request for endpoint, mandatory: surname, lastname, hospital_reference, suscribed, unsuscribed, id_bed, id_sensor, spo2_max, spo2_min, pulse_max, pulse_min, temp_max, temp_min, status';
    }
    const response = await db.query(queries.patient.create,[req.body.surname, req.body.lastname, req.body.hospital_reference, req.body.suscribed, req.body.unsuscribed, req.body.id_bed, req.body.id_sensor, req.body.spo2_max, req.body.spo2_min, req.body.pulse_max, req.body.pulse_min, req.body.temp_max, req.body.temp_min, req.body.status]);
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
    await db.query(queries.patient.delete,[id]);
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
    const result = await db.query(queries.patient.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

// TODO: hay que implementar un endpoint GET /byIdBed/:id_bed
// para devolver el objecto paciente que pertenece a una cama.


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.patient.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['surname', 'lastname', 'hospital_reference', 'suscribed', 'unsuscribed', 'id_bed', 'id_sensor', 'spo2_max', 'spo2_min', 'pulse_max', 'pulse_min', 'temp_max', 'temp_min', 'status'])) {
      throw 'bad request for endpoint, mandatory: surname, lastname, hospital_reference, suscribed, unsuscribed, id_bed, id_sensor, spo2_max, spo2_min, pulse_max, pulse_min, temp_max, temp_min, status';
    }
    const { id } = req.params;
    const result = await db.query(queries.patient.update, [req.body.surname, req.body.lastname, req.body.hospital_reference, req.body.suscribed, req.body.unsuscribed, req.body.id_bed, req.body.id_sensor, req.body.spo2_max, req.body.spo2_min, req.body.pulse_max, req.body.pulse_min, req.body.temp_max, req.body.temp_min, req.body.status, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})
