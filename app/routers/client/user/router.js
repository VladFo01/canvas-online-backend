const router = require('express').Router();

const controller = require('./controller');

router.ws('/user', controller.userWsHandler);

module.exports = {
  userRouter: router,
};
