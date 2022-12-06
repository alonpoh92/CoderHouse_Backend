const { SocketContainer } = require('../../containers/socket.container');

class ProductSocketDao extends SocketContainer{
    constructor(httpServer){
        super(httpServer);
    }

    start(){
        this.io.on('connection', async (Socket) => {
            console.log("Connected chat");
            const data = await products.getAll();
            Socket.emit('products-list', data);
        
            Socket.on('add-product', async (data) => {
                const { title, price, thumbnail } = data;
                if(title && Number(price) && thumbnail){
                    const newProduct = { title, price: Number(price), thumbnail };
                    const data = await products.save(newProduct);
                    if(!data.error){
                        Socket.emit('product-success', {data: newProduct, error: null});
                        Socket.broadcast.emit('new-product', {data: newProduct, error: null})
                    }else{
                        Socket.emit('product-error', data);
                    }
                }else{
                    Socket.emit('product-error', {data: null, error: 'información no completa o no valida'});
                }
            });
        
        });
    }
}

module.exports.ProductSocketDao = ProductSocketDao;