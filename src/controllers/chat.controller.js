const { ChatSocketDao } = require('../persistence/models/daos/chat/chat.socket.dao');

class ChatController{
    static start(httpServer){
        const chat = new ChatSocketDao(httpServer);
        chat.start();
    }
}

module.exports.ChatController = ChatController;