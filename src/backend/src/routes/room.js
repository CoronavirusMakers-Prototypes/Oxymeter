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
    if (!check(req.body, ['desc', 'id_area'])) {
      throw 'bad request for endpoint, mandatory: desc, id_area';
    }
    const response = await db.query(queries.room.create,[req.body.desc, req.body.id_area]);
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
    await db.query(queries.room.delete,[id]);
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
    const result = await db.query(queries.room.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.room.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})


// TODO: hay que implementar un endpoint GET del estilo:
// /rooms/byIdFloor/:id_area o `/rooms?id_area=1`
// (est'a por definir con frontend)
// La query para devlorver las habitaciones que pertenecen a un area se puede ir escribiendo


router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['desc', 'id_area'])) {
      throw 'bad request for endpoint, mandatory: desc, id_area';
    }
    const { id } = req.params;
    const result = await db.query(queries.room.update, [req.body.desc, req.body.id_area, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})
