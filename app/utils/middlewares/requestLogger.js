const uuidv4 = require('uuid').v4;
const { logger } = require('../helpers');

const requestLogger = (req, res, next) => {
  req.childLogger = logger.child({ requestedId: uuidv4() });

  function onError(err) {
    cleanup();
    req.childLogger.error(err);
    next();
  }

  function onExit() {
    cleanup();
    req.childLogger.error(`Request error. ${req.method} ${req.originalUrl}`);
  }

  function onFinish() {
    cleanup();
    if (res.statusCode >= 400) {
      req.childLogger.error(`Request is finished. ${req.method} ${req.originalUrl}`);
    }
  }

  function cleanup() {
    req.removeListener('error', onError);
    req.removeListener('exit', onExit);
    res.removeListener('finish', onFinish);
  }

  req.on('error', onError);
  req.on('exit', onExit);
  res.on('finish', onFinish);

  return next();
};

module.exports = {
  requestLogger,
};
