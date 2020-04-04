const Router         = require('express-promise-router');
const { logger }     = require('./../util/logger');

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
