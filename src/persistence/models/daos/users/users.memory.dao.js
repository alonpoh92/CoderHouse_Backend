const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MemoryContainer = require('../../containers/memory/memory.container');

class UsersDao extends MemoryContainer {
    constructor() {
        super();
    }

    async createUser(userItem){
        try {
            const emailUser = await this.getUserByEmail(userItem.email);
            if(emailUser.length > 0){
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');                
            }
        }
        catch(error) {
            if(error.message.toLowerCase().includes('does not exist')){
                userItem.id = undefined;
                const user = await this.save(userItem);
                return user;
            }
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getUserById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
    
    async getUserByEmail(email) {
        try {
            const document = await this.getByEmail(email);
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = UsersDao;