import io_socket from 'socket.io';

function isValidToken(token) {
    return token === 'myPrivateToken';
}
export function setup(server) {
    return new Promise((resolve, reject) => {
        let socketio = io_socket(server, {
            path: '/socket.io-client'
        });

        socketio.use((socket, next) => {
            let token = socket.handshake.query.token;
            if (isValidToken(token)) {
                if (socket.handshake.query.id) return next();
                return next(new Error('No id from the app provided'));
            }
            return next(new Error('Authentication failed.Wrong token provided'));
        });

        socketio.on('connection', (socket) => {
            socket.on('disconnect', () => {
                global.socketsController.unregister(socket);
            });

            global.socketsController.register(socket);
        });

        resolve(socketio);
    });
}

export default setup;