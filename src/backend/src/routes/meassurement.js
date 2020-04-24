const Router     = require('express-promise-router');
const { logger } = require('./../util/logger');
const { check }  = require('./../util/requestChecker');
const db         = require('../db');
const queries    = require('./../queries');

const { processPayloadFromProbes } = require('./../controllers/meassurementController');

const router   = new Router();
module.exports = router;

//TODO:? and filter stranger things as NaN


router.post('/', async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      // Do nothing if the body is empty
      logger.warn('No data from probe');
    } else {
      var io = req.app.get('socketio');
      var data = req.body;
      if (!data instanceof Array) {
        data = [req.body];
      }
      processPayloadFromProbes(data, io);
      logger.debug("Metrics payload " + JSON.stringify(req.body));

      // Example In case of need to send an alarm (or comunicate with frontend) from a ROUTE!!!
      io.sockets.in('area_1').emit('alarm-in-area', {foo:"BarBoo"});
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  } finally {
    res.status(200).send('ok');
  }
});

router.get('/byIdSensor/:id', async (req, res) => {
  try {
    if (!check(req.query, ['lastTimestamp'])) {
      throw 'bad request for endpoint, mandatory: lastTimestamp';
    }
	   const lastDate = req.query.lastTimestamp;
     const { id } = req.params;
	   const result = await db.query(queries.meassurement.last100ForSensor, [id, lastDate]);
     const response = result.rows.map((metric) => {
       metric.time = new Date(metric.time).getTime();
       return metric;
     });
     res.status(200).send(JSON.stringify(response));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
});


router.get('/:id', async (req, res) => {
  try {
    if (!check(req.query, ['lastTimestamp'])) {
      throw 'bad request for endpoint, mandatory: lastTimestamp';
    }
    res.status(200).send('Not yet implemented ' + new Date(parseInt(req.query.lastTimestamp)));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
});
