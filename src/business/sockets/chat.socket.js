const SocketContainer = require('../../../utils/socket.utils');

class ChatSocket{
    start(httpServer){
        const socket = new SocketContainer(httpServer);
        socket.io.on('connection', async (Socket) => {
            console.log(`Connected chat ${Socket.id}`);
        });
    }
}

module.exports = ChatSocket;