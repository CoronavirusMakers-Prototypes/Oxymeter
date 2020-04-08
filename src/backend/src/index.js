const express           = require('express');
const config            = require('config');
const info              = require('../package.json');
const mountRoutes       = require('./routes');
const path              = require('path');
const { logger }        = require('./util/logger');
const dataConsumer      = require('./queues/consumer')
const rabbitAlarmSender = require('./queues/sender/RabbitAlarmSender')

const { createDatabaseAndSchemaIfNotExists } = require('./db/dbInit');

const app  = express();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

app.use(express.json());
mountRoutes(app);

const port = config.get('port');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') })
});

io.on('connection', function(socket){
    logger.debug('websocket: a user connected');
    io.emit('oxy_message', { foo: "bar"});
});

// Doing some actions before expose the service.
(async () => {
  await createDatabaseAndSchemaIfNotExists();
  dataConsumer;
  http.listen(port, () => logger.info(`${info.name}@${info.version} running at: ${port}!`));

  // Sending an alarm
  const alarmSender = await rabbitAlarmSender.getInstance();
  await alarmSender.send('An alarm!');
  // Another alarm !!!
  alarm = {
    foor: "bar",
    boo:  "lol"
  }
  await alarmSender.send(JSON.stringify(alarm));
})().catch((error) => {
  logger.error(error);
});
