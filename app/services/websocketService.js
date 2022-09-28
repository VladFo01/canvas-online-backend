const { buildConnectionMsg } = require('../utils/helpers');

class WebsocketService {
  constructor() {
    this.connections = {};
  }

  broadcastMessage(msg, id) {
    this.connections[id].forEach((client) => {
      client.send(msg);
    });
  }

  connectionHandler(ws, msg) {
    // eslint-disable-next-line no-param-reassign
    if (!(msg.id in this.connections)) {
      this.connections[msg.id] = [];
    }
    this.connections[msg.id].push(ws);

    this.broadcastMessage(buildConnectionMsg(msg.username), msg.id);
  }
}

module.exports = {
  websocketService: new WebsocketService(),
};
