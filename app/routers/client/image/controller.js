const { responseService, imageService } = require('../../../services');
const { successfulImageDownloadMessage } = require('../../../utils/constants');

class ImageController {
  async downloadImage(req, res) {
    try {
      await imageService.downloadImage(req.body.image, req.query.id);
      return res.status(200).json({
        message: successfulImageDownloadMessage,
      });
    } catch (err) {
      req.childLogger.error(`
            Downloading image failed.
            Error: ${JSON.stringify(err.message)}
        `);
      return responseService.sendResponse(res, 500, err.message);
    }
  }

  async getImage(req, res) {
    try {
      const image = await imageService.getImage(req.query.sessionId);
      return res.status(200).json({ image });
    } catch (err) {
      req.childLogger.error(`
            Getting image failed.
            Error: ${JSON.stringify(err.message)}
        `);
      return responseService.sendResponse(res, 500, err.message);
    }
  }
}

module.exports = new ImageController();
