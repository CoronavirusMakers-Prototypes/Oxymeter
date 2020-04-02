const Router = require('express-promise-router')
const db     = require('../db')

const router = new Router()
module.exports = router

router.post('/', async (req, res) => {
  try {
    const response = await db.query(`INSERT INTO sensor (type, auth_id) VALUES
                                    (${req.body.type}, '${req.body.auth_id}')
                                    RETURNING id`)
    req.body.id = response.rows[0].id
    res.status(200).send(JSON.stringify(req.body))
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.query(`DELETE FROM sensor WHERE id=${id}`)
    res.status(200).send({deleted: id})
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.query(`SELECT * FROM sensor WHERE 1=1`)
    res.status(200).send(JSON.stringify(result.rows))
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.query(`UPDATE sensor
                                   SET type    = ${req.body.type},
                                       auth_id = '${req.body.auth_id}'
                                   WHERE
                                    id = ${id}`)
    res.status(200).send({updated: id})
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})
