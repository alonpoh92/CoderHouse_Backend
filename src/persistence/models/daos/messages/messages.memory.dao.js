const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MemoryContainer = require('../../containers/memory/memory.container');

class MessagesDao extends MemoryContainer {
    constructor() {
        super();
    }

    async createMessage(messageItem){
        try {
            messageItem.id = undefined;
            const message = await this.save(messageItem);
            return message;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getMessages(){
        try {
            return await this.getAll();
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = MessagesDao;