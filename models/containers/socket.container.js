const { Server: IOServer } = require('socket.io');

class SocketContainer{
    constructor(httpServer){
        this.io = new IOServer(httpServer);
    }
}

module.exports.SocketContainer = SocketContainer;