const { createLogger, format, transports } = require('winston');

const { printf, colorize, combine } = format;

const myFormat = printf(({ level, message, requestedId, userId, ...metadata }) => {
  const dateInfo = new Date().toUTCString();

  let msg = `${dateInfo}   ${requestedId ? `${requestedId}   ` : ''}${
    userId ? `${userId}   ` : ''
  }${level}   -----   ${message}`;

  const keys = Object.keys(metadata);
  for (let i = 0; i < keys.length; i += 1) {
    msg += `   ${metadata[keys[i]]}`;
  }

  return msg;
});

const logger = createLogger({
  transports: [new transports.Console(), new transports.File({ filename: 'app.log' })],
  format: combine(colorize(), myFormat),
  exitOnError: false,
});

module.exports = {
  logger,
};
