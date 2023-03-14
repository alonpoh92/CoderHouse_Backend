const { Server: IOServer } = require('socket.io');
const logger = require('../../utils/logger.utils');

class SocketController{
    constructor(httpServer){
        if(SocketController._instance){
            //logger.info('SocketController already has an instance!!!');
            this.io = SocketController._instance.io;
        }else{
            //logger.info('SocketController Instance')
            this.io = new IOServer(httpServer);
            SocketController._instance = this;
        }
    }
}

module.exports = SocketController