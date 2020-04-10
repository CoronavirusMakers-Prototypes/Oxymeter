const express           = require('express');
const config            = require('config');
const info              = require('../package.json');
const mountRoutes       = require('./routes');
const path              = require('path');
const { logger }        = require('./util/logger');
const dataConsumer      = require('./queues/consumer');
const cors              = require('cors');
const rabbitAlarmSender = require('./queues/sender/RabbitAlarmSender');

const { createDatabaseAndSchemaIfNotExists } = require('./db/dbInit');

// all CORS requests
const app  = express();

app.use(cors());

const http = require('http').createServer(app);
const io   = require('socket.io')(http);

app.use(express.json());
mountRoutes(app);

const port = config.get('port');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') })
});

io.sockets.on('connection', function(socket){
    logger.debug('websocket: a user connected');
    // socket.emit('oxy_message', { foo: "bar"});
    socket.on('subscribeTo', (room)=> {
      logger.debug('joining to room ' + room);
      socket.join(room);
      io.sockets.in(room).emit('lol', {foo:"bar"});
      console.log(socket.rooms);
      socket.emit('oxy_message', { foo: "bar"});
      setTimeout(()=>{
        // console.log("lol");
        // socket.emit('area_1', {'id_area': 1, 'sensor_data': {}});
        io.sockets.in('area_1').emit('alarm-in-area', {'id_area': 1, 'sensor_data': {}});
        io.sockets.in('area_1').emit('alarm-in-area', {'id_area': 1, 'sensor_data': {}});
      }, 5000);
    });

    socket.on('unsubscribeFrom', (room)=> {
      logger.debug('leavin to room ' + room);
      socket.leave(room);
    });

});

// Doing some actions before expose the service.
(async () => {
  // await createDatabaseAndSchemaIfNotExists(); // commented for now after latest database chages TODO: lets try to fix later
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
