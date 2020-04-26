const winston = require('winston');

require('winston-daily-rotate-file');

const config  = require('config');
const info    = require('./../../package.json');

const fileTransport = new (winston.transports.DailyRotateFile)({
  level: `${config.get('logger.level.file')}`,
  filename: `${config.get('logger.path')}${info.name}-${info.version}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
});

const consoleTransport = new winston.transports.Console({
      level: `${config.get('logger.level.console')}`,
      format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.simple(),
              ),
});

const logger = winston.createLogger({
  transports: [
    fileTransport,
    consoleTransport,
  ]
});

module.exports = {
	logger,
}
