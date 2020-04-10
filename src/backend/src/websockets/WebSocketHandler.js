const { logger } = require('./../util/logger');

class WebSocketHandler {

  constructor(io) {
    this.io     = io;
    this.socket = null;
 }

  listenToSuscribtors = () => {
    this.io.sockets.on('connection', (sckt) => {
      this.socket = sckt;
      logger.debug('websocket: a user connected');
      this.socket.on('subscribeTo', (room)=> {
        logger.debug('joining to room ' + room);
        this.socket.join(room);
      });

      this.socket.on('unsubscribeFrom', (room)=> {
        logger.debug('leaving: ' + room);
        this.socket.leave(room);
      });
    });
  }

  sendAlarm = (area, type, data) => {
    this.io.sockets.in(area).emit(type, data);
  }

}

module.exports = WebSocketHandler
