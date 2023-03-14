const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FileContainer = require('../../containers/file/file.container');
const dbConfig = require('../../../db/db.config');

const collection = dbConfig.file.users;

class UsersDao extends FileContainer {
    constructor() {
        super(collection);
    }

    async createUser(userItem){
        try {
            const emailUser = await this.getUserByEmail(userItem.email);
            if(emailUser.length > 0){
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User with given email already exist');                
            }
        }
        catch(error) {
            if(error.details.toLowerCase().includes('does not exist')){
                userItem.id = undefined;
                const user = await this.save(userItem);
                return user;
            }
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    };
    
    async getUserById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    }
    
    async getUserByEmail(email) {
        try {
            const document = await this.getByEmail(email);
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    }

}

module.exports = UsersDao;