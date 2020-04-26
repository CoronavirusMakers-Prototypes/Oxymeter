const meassurement = require('./meassurement');
const sensor       = require('./sensor');
const patient      = require('./patient');
const bed          = require('./bed');
const alarm        = require('./alarm');
const build        = require('./build');
const floor        = require('./floor');
const hospital     = require('./hospital');
const role         = require('./role');
const room         = require('./room');
const personal     = require('./personal');
const area         = require('./area');
const { logger }   = require('./../util/logger');

module.exports = app => {
  app.use('/meassurement', meassurement);
  app.use('/sensors', sensor);
  app.use('/patients', patient);
  app.use('/beds', bed);
  app.use('/alarms', alarm);
  app.use('/builds', build);
  app.use('/floors', floor);
  app.use('/hospitals', hospital);
  app.use('/roles', role);
  app.use('/rooms', room);
  app.use('/users', personal);
  app.use('/areas', area);
}
