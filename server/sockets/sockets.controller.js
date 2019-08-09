import SocketClient from './sockets.client'
import * as _ from 'lodash'

class SocketController {
    socketClients;

    constructor() {
        this.socketClients = [];
    }

    register(socket) {
        let client = new SocketClient(socket);
        this.socketClients.push(client);
        global.logger.info('New app registered');
    }

    unregister(socket) {
        _.remove(this.socketClients, {
            socket_id: socket.id
        });
        global.logger.info('An app left the building');
    }

    sendMessage(message_type, message, client_id) {
        this.emitEventToClient(message_type, message, client_id);
    }

    broadcastMessage(message_type, message) {
        this.emitEventToClient(message_type, message);
    }

    emitEventToClient(event, message, client_id) {
        for (let client of this.socketClients) {
            if (!client_id) client.emitEvent(event, message);
            else {
                if (client.id === client_id && client.isConnected()) {
                    client.emitEvent(event, message);
                }
            }
        }
    }
}

export default new SocketController();