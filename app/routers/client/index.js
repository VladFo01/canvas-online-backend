const router = require('express').Router();

const { userRouter } = require('./user/router');
const { imageRouter } = require('./image/router');

const subrouters = [userRouter, imageRouter];

router.use(subrouters);

module.exports = {
  clientRouter: router,
};
