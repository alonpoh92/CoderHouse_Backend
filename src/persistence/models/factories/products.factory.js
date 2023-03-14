const ProductDto = require('../dtos/products.dto');
const { ProductsDao } = require('../daos/app.dao');

class ProductFactory{
    constructor(){
        try{
            if(ProductFactory._instance){
                throw new Error('MessageFactory already has an instance!!!');
            }
            this.ProductDao = new ProductsDao();
            ProductFactory._instance = this;
        }catch(error){
            this.ProductDao = ProductFactory._instance.ProductDao;
        }
    }

    async createProduct(productObj){
        const newProduct = new ProductDto("undefined", productObj.title, productObj.price, productObj.thumbnail);
        const product = await this.ProductDao.createProduct(newProduct);
        return product;
    }

    async getProducts(){
        const products = await this.ProductDao.getProducts();
        return products.map(product => {
            return new ProductDto(product.id, product.title, product.price, product.thumbnail);
        })
    }
}

module.exports = ProductFactory;