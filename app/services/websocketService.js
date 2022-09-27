const { appWs } = require('../../app');
const { buildConnectionMsg } = require('../utils/helpers');

const aWss = appWs.getWss();

class WebsocketService {
  constructor() {
    this.aWss = aWss;
  }

  broadcastMessage(msg) {
    this.aWss.clients.forEach((client) => {
      client.send(msg);
    });
  }

  connectionHandler(ws, msg) {
    // eslint-disable-next-line no-param-reassign
    ws.id = msg.id;
    this.broadcastMessage(buildConnectionMsg(msg.username));
  }
}

module.exports = {
  websocketService: new WebsocketService(),
};
