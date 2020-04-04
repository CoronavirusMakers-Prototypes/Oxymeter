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
    if (!check(req.body, ['type', 'auth_id'])) {
      res.status(400).send('bad request for endpoint');
    }
    const response = await db.query(queries.sensor.create,[req.body.type, req.body.auth_id]);
    req.body.id = response.rows[0].id;
    res.status(200).send(JSON.stringify(req.body));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(queries.sensor.delete,[id]);
    res.status(200).send({deleted: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const { id } = req.params;
    var   offset = req.query.offset;
    const limit  = config.get('database.query.limit');

    var   result       = await db.query(queries.util.count);
    const totalRecords = parseInt(result.rows[0].count);
    const totalPages   = parseInt(totalRecords/limit);
    var currentPage    = 0;

    if (typeof offset != 'undefined' && offset != null) {
      currentPage = parseInt(offset/limit);
      offset = parseInt(offset);
    }

    if (offset > totalRecords) {
      res.status(400).send(`Offset ${offset} above total recods ${totalRecords}`);
    } else {
      result = await db.query(queries.sensor.read,[offset, limit]);

      response = {
        offset:       offset,
        limit:        limit,
        currentPage:  currentPage,
        totalPages:   totalPages,
        totalRecords: totalRecords,
        result:       result.rows,
      };

      res.status(200).send(JSON.stringify(response));
    }

  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.sensor.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['type', 'auth_id'])) {
      res.status(400).send('bad request for endpoint');
    }
    const { id } = req.params;
    const result = await db.query(queries.sensor.update, [req.body.type, req.body.auth_id, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})
