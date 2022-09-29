/* eslint-disable no-param-reassign */
const { websocketService } = require('../../../services');

class UserController {
  userWsHandler(ws) {
    ws.on('message', (msg) => {
      msg = JSON.parse(msg);
      switch (msg.method) {
        case 'connection':
          return websocketService.connectionHandler(ws, msg);
        case 'draw':
          return websocketService.broadcastMessage(msg, msg.id);
        default:
          return null;
      }
    });
  }
}

module.exports = new UserController();
