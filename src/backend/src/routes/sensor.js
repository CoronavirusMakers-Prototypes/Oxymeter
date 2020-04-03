const Router     = require('express-promise-router')
const db         = require('../db')
const { logger } = require('./../util/logger')
const queries    = require('./../queries')
const config     = require('config')
const { check }  = require('./../util/requestChecker')

const router   = new Router()
module.exports = router

router.post('/', async (req, res) => {
  try {
    if (!check(req.body, ['type', 'auth_id'])) {
      res.status(400).send('bad request for endpoint')
    }
    const response = await db.query(queries.sensor.create,[req.body.type, req.body.auth_id])
    req.body.id = response.rows[0].id
    res.status(200).send(JSON.stringify(req.body))
  } catch (e) {
    logger.error(e)
    res.status(500).send(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.query(queries.sensor.delete,[id])
    res.status(200).send({deleted: id})
  } catch (e) {
    logger.error(e)
    res.status(500).send(e)
  }
})

router.get('/', async (req, res) => {
  try {
    const { id } = req.params
    const offset = req.query.offset
    const result = await db.query(queries.sensor.read,[offset, config.get('database.query.limit')])
    res.status(200).send(JSON.stringify(result.rows))
  } catch (e) {
    logger.error(e)
    res.status(500).send(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.query(queries.sensor.getById, [id])
    res.status(200).send(JSON.stringify(result.rows))
  } catch (e) {
    logger.error(e)
    res.status(500).send(e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!check(req.body, ['type', 'auth_id'])) {
      res.status(400).send('bad request for endpoint')
    }
    const { id } = req.params
    const result = await db.query(queries.sensor.update, [req.body.type, req.body.auth_id, id])
    res.status(200).send({updated: id})
  } catch (e) {
    logger.error(e)
    res.status(500).send(e)
  }
})
