const { ProductSocketDao } = require('../persistence/models/daos/product/product.socket.dao');

class ProductController{
    static start(httpServer){
        const product = new ProductSocketDao(httpServer);
        product.start();
    }
}

module.exports.ProductController = ProductController;