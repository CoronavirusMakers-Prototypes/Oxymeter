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
const user         = require('./user');
const area         = require('./area');

const user_alarm_suscription  = require('./user_alarm_suscription');

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
  app.use('/users', user);
  app.use('/areas', area);
  app.use('/user_alarm_suscriptions', user_alarm_suscription);
}
