/* eslint-disable no-param-reassign */
const { buildConnectionMsg } = require('../utils/helpers');

class WebsocketService {
  constructor() {
    this.connections = {};
  }

  sendMessage(socket, msg) {
    socket.send(JSON.stringify(msg));
  }

  broadcastMessage(msg, id) {
    this.connections[id].forEach((client) => {
      this.sendMessage(client, msg);
    });
  }

  connectionHandler(ws, msg) {
    if (!(msg.id in this.connections)) {
      this.connections[msg.id] = [];
    }
    this.connections[msg.id].push(ws);

    this.broadcastMessage(buildConnectionMsg(msg), msg.id);
  }
}

module.exports = {
  websocketService: new WebsocketService(),
};
