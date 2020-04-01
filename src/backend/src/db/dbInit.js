const config     = require('config')
const fs         = require('fs')
const { Client } = require('pg')
const path       = require('path')

var client = null;

const dbExists = async () => {
  try {
    const res = await client.query(`SELECT 1 from pg_database WHERE datname='${config.get('database.name')}';`, null)
    console.log(res.rows)
    return res.length == 1 ? true : false;
  } catch (e) {
    console.log(e)
  }
}

const createDatabaseAndSchema = async () => {
  try {
    // await client.query(`create database ${config.get('database.name')}`)
    // const sqlSchema = fs.readFileSync(path.join(__dirname, './../../ddbb/VitalOx-pg.sql'),'utf8')
    var queries = fs.readFileSync(path.join(__dirname, './../../ddbb/VitalOx-pg.sql')).toString()
    .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
    .replace(/\s+/g, ' ') // excess white space
    .split(";") // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter((el) => {return el.length != 0}); // remove any empty ones

    console.log(queries);

    // Execute each SQL query sequentially
    queries.forEach((query) => {
        client.query(query)
      });
    // await client.query(sqlSchema)
  } catch (e) {
    console.log(e)
  }
}

createDatabaseAndSchemaIfNotExists = async () => {
  try {
    client = new Client({
      host:     `${config.get('database.host')}`,
      user:     `${config.get('database.user')}`,
      password: `${config.get('database.password')}`,
      port:     `${config.get('database.port')}`,
      database: `postgres`
    })
    await client.connect()
    console.log(await dbExists())
    if (await dbExists() === false) {
      console.log('Connecting for first time, creating database and schemas.')
      await createDatabaseAndSchema()
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
