const express = require('express');
const appWs = require('express-ws')(express());
const cors = require('cors');
const helmet = require('helmet');

const { globalErrorHandler, requestLogger } = require('./app/utils/middlewares');
const { clientRouter } = require('./app/routers/client');

const initRoutes = (app) => {
  app.use('/', clientRouter);
};

const initMiddlewares = (app) => {
  /* http security */
  app.use(cors());
  app.use(helmet());

  /* parsing middlewares */
  app.use(express.json());

  /* request logging */
  app.use(requestLogger);

  /* error handler */
  app.use(globalErrorHandler);
};

module.exports.init = () => {
  initMiddlewares(appWs.app);

  initRoutes(appWs.app);

  return appWs.app;
};
