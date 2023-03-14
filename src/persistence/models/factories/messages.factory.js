const MessageDto = require('../dtos/messages.dto');
const { MessagesDao } = require('../daos/app.dao');

class MessageFactory{
    constructor(){
        try{
            if(MessageFactory._instance){
                throw new Error('MessageFactory already has an instance!!!');
            }
            this.MessageDao = new MessagesDao();
            MessageFactory._instance = this;
        }catch(error){
            this.MessageDao = MessageFactory._instance.MessageDao;
        }
    }

    async createMessage(messageObj){
        const newMessage = new MessageDto("undefined", messageObj.email, messageObj.message, messageObj.date);
        const message = await this.MessageDao.createMessage(newMessage);
        return new MessageDto(message.id, message.email, message.message, message.date);
    }

    async getMessages(){
        const messages = await this.MessageDao.getMessages();
        return messages.map(message => {
            return new MessageDto(message.id, message.email, message.message, message.date);
        })
    }
}

module.exports = MessageFactory;