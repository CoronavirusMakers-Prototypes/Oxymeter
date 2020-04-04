const Router         = require('express-promise-router');
const db             = require('../db');
const { logger }     = require('./../util/logger');
const { legitimate } = require('./../controllers/meassurementController')

const router   = new Router();
module.exports = router;

// and filter stranger things as NaN

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!await legitimate(req)) {
      res.status(406).send('Not Acceptable');
    } else {
      const q = `INSERT INTO meassurement (spo2, ppm, batt, sequence, id_sensor) VALUES (${req.body.spo2}, ${req.body.ppm}, ${req.body.batt}, ${req.body.sequence}, ${id})`;
      await db.query(q);
      logger.debug(q);
      res.status(200).send('ok');
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
});
