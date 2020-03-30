const express     = require('express')
const config      = require('config')
const info        = require('../package.json')
const mountRoutes = require('./routes')
const path        = require('path')

const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use(express.json())
mountRoutes(app)

const port = config.get('port')

app.get('/', (req, res) => 
  res.sendFile('index.html', { root: path.join(__dirname, '../public') })
)

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('oxy_message', { foo: "bar"})
});

http.listen(port, () => console.log(`${info.name}@${info.version} running at: ${port}!`))
