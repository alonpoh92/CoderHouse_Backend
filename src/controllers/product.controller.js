const moment = require('moment');

const SocketController = require('./socket.controller');
const ProductFactory = require('../persistence/models/factories/products.factory');

class ProductController extends SocketController{
    constructor(httpServer){
        super(httpServer);
        this.products = new ProductFactory();
    }

    start(){                
        this.io.on('connection', async (Socket) => {
            console.log(`Connected products ${Socket.id}`);
            const data = await this.products.getProducts();  
            Socket.emit('products-list', {data});
        
            Socket.on('add-product', async (data) => {
                const { title, price, thumbnail } = data;
                if(title && Number(price) && thumbnail){
                    try{
                        const newProduct = { title, price: Number(price), thumbnail };
                        const product = await this.products.createProduct(newProduct);
                        Socket.emit('product-success', {data: product, error: null});
                        Socket.broadcast.emit('new-product', {data: product, error: null});
                    }catch(error){
                        Socket.emit('product-error', {data: null, error: error.message});
                    }
                }else{
                    Socket.emit('product-error', {data: null, error: 'información no completa o no valida'});
                }
            });
        
        });

        console.log('Product Controller Started')

    }
}

module.exports = ProductController;