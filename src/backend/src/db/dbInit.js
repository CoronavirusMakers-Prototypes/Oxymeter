const config     = require('config')
const fs         = require('fs')
const { Client } = require('pg')
const path       = require('path')
const Promise    = require('bluebird')

var client = null;

const dbExists = async () => {
  try {
    const res = await client.query(`SELECT 1 from pg_database WHERE datname='${config.get('database.name')}';`, null)
    return res.rows.length == 1 ? true : false;
  } catch (e) {
    console.log(e)
  }
}

const createDatabaseAndSchema = async () => {
  try {
    
    var queries = fs.readFileSync(path.join(__dirname, config.get('database.sqlFile'))).toString()
    .replace(/(\r\n|\n|\r)/gm," ")
    .replace(/\s+/g, ' ')
    .split(";")
    .map(Function.prototype.call, String.prototype.trim)
    .filter((el) => {return el.length != 0});

    console.log(queries)
    
    Promise.map(queries, (query) => {
      client.query(query)
    }).then(()=>{
      console.log('Import done!')
    })
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
