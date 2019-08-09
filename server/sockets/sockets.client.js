class SocketClient {

    id;
    connectedAt;
    address;
    socket_id;
    _socket;

    constructor(socket) {
        this.id = socket.handshake.query.id;
        this._socket = socket;
        this.socket_id = socket.id;
        this.connectedAt = new Date();
        this.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;
    }

    isConnected() {
        return this._socket.connected;
    }

    emitEvent(event, data) {
        this._socket.emit(event, data);
    }
};

export default SocketClient;