const { SocketContainer } = require('../../containers/socket.container');
const MongoContainer = require('../../containers/Mongodb.container');
const ProductSchema = require('../../schemas/Product.schema');

const collection = 'Products';

class ProductSocketDao extends SocketContainer{
    constructor(httpServer){
        super(httpServer);
        this.products = new MongoContainer(collection, ProductSchema);
    }

    async start(){


        this.io.on('connection', async (Socket) => {


            console.log(`Connected products ${Socket.id}`);
            const data = await this.products.getAll();  
            Socket.emit('products-list', {data});
        
            Socket.on('add-product', async (data) => {
                const { title, price, thumbnail } = data;
                if(title && Number(price) && thumbnail){
                    const newProduct = { title, price: Number(price), thumbnail };
                    const data = await this.products.save(newProduct);
                    newProduct.id = data._id;
                    if(!data.error){
                        Socket.emit('product-success', {data: newProduct, error: null});
                        Socket.broadcast.emit('new-product', {data: newProduct, error: null})
                    }else{
                        Socket.emit('product-error', {data});
                    }
                }else{
                    Socket.emit('product-error', {data: null, error: 'información no completa o no valida'});
                }
            });
        
        });

        console.log('Started Products Socket')

    }
}

module.exports.ProductSocketDao = ProductSocketDao;