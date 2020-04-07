const Router         = require('express-promise-router');
const { logger }     = require('./../util/logger');
const { check }      = require('./../util/requestChecker');

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
      logger.debug(`Probe payload: ${JSON.stringify(req.body)}`);
      processPayloadFromProbes(req.body);
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  } finally {
    res.status(200).send('ok');
  }
});


// TODO: Espera un timestamp de inicio (lastTimestamp) y devuelve los 100 anteriores
// resgistros en bbdd y el timestamp del registro m'as antig:uo (firstTimestamp)
// /meassurement/23?lastTimestamp=1586207555868
//{
// "lastTimestamp":  "1000100",
// "firstTimestamp": "1000000",
// "result": [
//    {
//         "id": 1,
//         "time": 1586103700333,
//         "spo2": 95,
//         "ppm": 95,
//         "batt": 90,
//         "temp": 35.7,
//         "sequence": 1222,
//         "sensorId": 45645644
//     }, ...
// }

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
