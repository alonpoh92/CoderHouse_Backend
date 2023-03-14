const SocketContainer = require('../../../utils/socket.utils');

class ProductSocket{
    start(httpServer){
        const socket = new SocketContainer(httpServer);
        socket.io.on('connection', async (Socket) => {
            console.log(`Connected product ${Socket.id}`);
        });
    }
}

module.exports = ProductSocket;