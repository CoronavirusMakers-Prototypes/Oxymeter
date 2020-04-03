const meassurement = require('./meassurement')
const sensor       = require('./sensor')

module.exports = app => {
  app.use('/meassurement', meassurement)
  app.use('/sensors', sensor)
}
