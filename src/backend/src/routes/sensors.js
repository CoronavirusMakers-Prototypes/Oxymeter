const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()
module.exports = router

//TODO: checks params and filter in case that is missing access_token
// and filter stranger things as NaN
router.post('/:id', async (req, res) => {
  const { id } = req.params

  await db.query(`INSERT INTO data (spo2, ppm, access_token) VALUES (${req.body.spo2}, ${req.body.ppm}, '${req.body.access_token}')`, null)
  const  resp  = await db.query('SELECT * FROM data WHERE 1=1', null)
  resp.rows.forEach((row) =>{
      console.log(row)
  })
  
  res.send('ok')
})
