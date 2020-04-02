const config     = require('config')
const fs         = require('fs')
const { Client } = require('pg')
const path       = require('path')
const Promise    = require('bluebird')
const pgtools    = require('pgtools')

var client = null;

const dbExists = async () => {
    const res = await client.query(`SELECT 1 from pg_database WHERE datname='${config.get('database.name')}';`, null)
    return res.rows.length == 1 ? true : false;
}

const _createTables = async () => {
    try {
      var queries = fs.readFileSync(path.join(__dirname, config.get('database.sqlFile'))).toString()
      .replace(/(\r\n|\n|\r)/gm," ")
      .replace(/\s+/g, ' ')
      .split(";")
      .map(Function.prototype.call, String.prototype.trim)
      .filter((el) => {return el.length != 0});

      Promise.map(queries, (query) => {
        client.query(`${query};`)
      })
    } catch (e) {
      console.log(e)
    }
}

const _connectionClientDB = async (databaseName) => {
  client = new Client({
    host:     `${config.get('database.host')}`,
    user:     `${config.get('database.user')}`,
    password: `${config.get('database.password')}`,
    port:     `${config.get('database.port')}`,
    database: databaseName
  })
  await client.connect()
}

const _createDatabase = async () => {
    const configPgTools = {
      host:     `${config.get('database.host')}`,
      user:     `${config.get('database.user')}`,
      password: `${config.get('database.password')}`,
      port:     `${config.get('database.port')}`,
    }
    await pgtools.createdb(configPgTools, config.get('database.name'))
  }


const createDatabaseAndSchemaIfNotExists = async () => {
  try {
    await _connectionClientDB('postgres')
    if (await dbExists() === false) {
      console.log('Connecting for first time, creating database and schemas.')
      await _createDatabase()
      await _connectionClientDB(config.get('database.name'))
      await _createTables()
    } else {
      console.log('No need to init db')
    }
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

module.exports = {
  createDatabaseAndSchemaIfNotExists,
}
