const express           = require('express');
const config            = require('config');
const info              = require('../package.json');
const mountRoutes       = require('./routes');
const path              = require('path');
const { logger }        = require('./util/logger');
const cors              = require('cors');
const rabbitAlarmSender = require('./queues/sender/RabbitAlarmSender');
const WebSocketHandler  = require('./websockets/WebSocketHandler')

const { createDatabaseAndSchemaIfNotExists } = require('./db/dbInit');
const { dataConsumer, setSocketIO }          = require('./queues/consumer');
const { jwtValidator }                       = require('./middleware/jwtValidatorMiddleware');


// all CORS requests
const app  = express();

app.use(cors());

const http = require('http').createServer(app);
const io   = require('socket.io')(http);

app.use(express.json());
app.set('socketio', io);
app.use(jwtValidator);

mountRoutes(app);


const port = config.get('port');

webSocketHandler = new WebSocketHandler(io);
webSocketHandler.listenToSuscribtors();

// Sending alarm example
setTimeout(()=>{
  console.log("sending alarm");
  webSocketHandler.sendAlarm('area_1', 'alarm-in-area', {'id_area': 2, 'sensor_data2': {}})
}, 6000);

// Just an exmaple of ws, TODO: remove
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') })
});


// Doing some actions before expose the service.
(async () => {
  // await createDatabaseAndSchemaIfNotExists(); // commented for now after latest database chages TODO: lets try to fix later
  setSocketIO(io);
  dataConsumer;
  http.listen(port, () => logger.info(`${info.name}@${info.version} running at: ${port}!`));

  // Sending an alarm to RabbitMQ EXAMPLE
  const alarmSender = await rabbitAlarmSender.getInstance();
  await alarmSender.send('An alarm!');
  // Another alarm for RabbitMQ!!! EXEAMPLE
  alarm = {
    foor: "bar",
    boo:  "lol"
  }
  await alarmSender.send(JSON.stringify(alarm));
})().catch((error) => {
  logger.error(error);
});
