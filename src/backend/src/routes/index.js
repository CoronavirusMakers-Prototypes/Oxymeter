const sensors = require('./sensors')

module.exports = app => {
  app.use('/sensors', sensors)
}
