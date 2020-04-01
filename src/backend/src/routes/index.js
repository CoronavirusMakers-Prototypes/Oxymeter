const meassurement = require('./meassurement')

module.exports = app => {
  app.use('/meassurement', meassurement)
}
