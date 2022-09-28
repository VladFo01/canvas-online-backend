const router = require('express').Router();

const { userRouter } = require('./user/router');

const subrouters = [userRouter];

router.use(subrouters);

module.exports = {
  clientRouter: router,
};
