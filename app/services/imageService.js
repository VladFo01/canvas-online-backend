const path = require('node:path');
const fs = require('fs');

class ImageService {
  async downloadImage(image, sessionId) {
    const data = await image.replace('data:image/png;base64,', '');
    fs.writeFileSync(
      path.resolve(__dirname, '../../', 'files', `${sessionId}.jpg`),
      data,
      'base64'
    );
  }

  async getImage(sessionId) {
    const data = fs.readFileSync(path.resolve(__dirname, '../../', 'files', `${sessionId}.jpg`));
    const image = `data:image/png;base64,${data.toString('base64')}`;
    
    return image;
  }
}

module.exports = {
  imageService: new ImageService(),
};
