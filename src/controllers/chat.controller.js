const moment = require('moment');

const SocketController = require('./socket.controller');
const MessageFactory = require('../persistence/models/factories/messages.factory');

class ChatController extends SocketController{
    constructor(httpServer){
        super(httpServer);
        this.messages = new MessageFactory();
    }

    dateFormat(data){
        data.map((item, i) => {data[i].date = moment(item.date).format('DD/MM/YYYY hh:mm:ss')});
        return data;
    }

    start(){                
        this.io.on('connection', async (Socket) => {
            console.log(`Connected chat ${Socket.id}`);
            const allMessages = this.dateFormat(await this.messages.getMessages()); 
            Socket.emit('messages-list', allMessages);
                
            Socket.on('add-message', async (data) => {
                if(data.email && data.message){
                    try {
                        const newMessage = { email: data.email, message: data.message, date: moment() };
                        const message = await this.messages.createMessage(newMessage);
                        Socket.emit('message-success', {data: this.dateFormat([message])[0], error: null});
                        Socket.broadcast.emit('new-message', {data: message, error: null})
                    }catch(error){
                        Socket.emit('message-error', {data: null, error: error.message});
                    }
                }else{
                    Socket.emit('message-error', {data: null, error: 'información incompleta o no valida'});
                }
            });
        });

        console.log('Chat Controller Started')

    }
}

module.exports = ChatController;