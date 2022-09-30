const router = require('express').Router();

const controller = require('./controller');

router.post('/image', controller.downloadImage);
router.get('/image', controller.getImage);

module.exports = {
  imageRouter: router,
};
