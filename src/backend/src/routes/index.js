const meassurement = require('./meassurement');
const sensor       = require('./sensor');
const { logger }   = require('./../util/logger');

module.exports = app => {
  app.use('/meassurement', meassurement);
  app.use('/sensors', sensor);
}
