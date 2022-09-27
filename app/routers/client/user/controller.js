/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const { websocketService } = require('../../../services');

class UserController {
  userWsHandler(ws, req) {
    ws.on('message', (msg) => {
      msg = JSON.parse(msg);
      switch (msg.method) {
        case 'connection':
          websocketService.connectionHandler(ws, msg);
          break;
        default:
          return null;
      }
    });
  }
}

module.exports = new UserController();
