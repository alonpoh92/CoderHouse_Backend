const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MemoryContainer = require('../../containers/memory/memory.container');

class ProductsDao extends MemoryContainer {
    constructor() {
        super();
    }

    async createProduct(productItem){
        try {
            productItem.id = undefined;
            const product = await this.save(productItem);
            return product;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getProducts(){
        try {
            return await this.getAll();
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

}

module.exports = ProductsDao;