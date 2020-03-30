const { Pool } = require('pg')
const config   = require('config')

const pool = new Pool({
  host:     `${config.get('database.host')}`,
  user:     `${config.get('database.user')}`,
  password: `${config.get('database.password')}`,
  database: `${config.get('database.database')}`,
  port:     `${config.get('database.port')}`
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
