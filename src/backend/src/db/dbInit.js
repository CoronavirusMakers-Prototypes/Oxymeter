const db = require('./index')
const config = require('config')

const dbExists = async () => {
    const res = await db.query(`SELECT 1 from pg_database WHERE datname='${config.get('database.name')}';`, null)
    return res.length == 1 ? true : false;
}

const createDatabaseAndSchema = async () => {
  await db.query(`create database ${config.get('database.name')}`)
  await db.query('create table data (id serial PRIMARY KEY, spo2 float, ppm float, batt float, sensor_id int);')
}

createDatabaseAndSchemaIfNotExists = () => {
  try {
    if (!dbExists()) {
      console.log('Connecting for first time, creating database and schemas.')
      createDatabaseAndSchema()
    } else {
      console.log('No need to init db')
    }
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

module.exports = {
  dbExists,
  createDatabaseAndSchema,
  createDatabaseAndSchemaIfNotExists,
}
