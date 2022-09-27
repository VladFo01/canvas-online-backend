const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');
const helmet = require('helmet');

const { globalErrorHandler, requestLogger } = require('./app/utils/middlewares');

const initRoutes = (app) => {};

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
  const app = express();

  initMiddlewares(app);

  const appWs = expressWs(app);

  initRoutes(app);

  return {
    app,
    appWs
  };
};
