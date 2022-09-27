const { responseService } = require('../../services/responseService');
const { logger } = require('../helpers');

const globalErrorHandler = (error, req, res, next) => {
  if (!error) {
    return next();
  }

  // log error
  logger.error(`Error in route ${req.method} ${req.originalUrl}`);
  logger.warn(`REQ PARAMS:
        Status: ${res.statusCode}
        Params: ${JSON.stringify(req.params)}
        Query: ${JSON.stringify(req.query)}
        Body: ${JSON.stringify(req.body)}
        Content-Length: ${req.get('Content-Length')}
  `);

  // send response
  return responseService.sendResponse(res, 400);
};

module.exports = {
  globalErrorHandler,
};
