const { ChatSocketDao } = require('../models/daos/chat/chat.socket.dao');
const { ProductSocketDao } = require('../models/daos/product/product.socket.dao');

class ProductChatController{
    static start(httpServer){
        const chat = new ChatSocketDao(httpServer);
        const product = new ProductSocketDao(httpServer);
        chat.start();
        product.start();
    }
}

module.exports.ProductChatController = ProductChatController;