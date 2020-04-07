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
    if (!check(req.body, ['desc', 'id_build'])) {
      throw 'bad request for endpoint, mandatory: desc, id_build';
    }
    const response = await db.query(queries.floor.create,[req.body.desc, req.body.id_build]);
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
    await db.query(queries.floor.delete,[id]);
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
    const result = await db.query(queries.floor.read);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

// TODO: hay que implementar un endpoint GET del estilo:
// /floors/byIdBuilding/:id_building o `/floors?id_building=1`
// (est'a por definir con frontend)
// La query para devlorver las plantas que pertenecen a un edificio se puede ir escribiendo


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.floor.getById, [id]);
    res.status(200).send(JSON.stringify(result.rows));
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['desc', 'id_build'])) {
      throw 'bad request for endpoint, mandatory: desc, id_build';
    }
    const { id } = req.params;
    const result = await db.query(queries.floor.update, [req.body.desc, req.body.id_build, id]);
    res.status(200).send({updated: id});
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
})
