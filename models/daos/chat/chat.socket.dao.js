const moment = require('moment');

const { SocketContainer } = require('../../containers/socket.container');
const MongoContainer = require('../../containers/Mongodb.container');
const MessageSchema = require('../../schemas/Message.schema');

const collection = 'Messages';

class ChatSocketDao extends SocketContainer{
    constructor(httpServer){
        super(httpServer);
        this.messages = new MongoContainer(collection, MessageSchema);
    }

    dateFormat(data){
        data.map((item, i) => {data[i].date = moment(item.date).format('DD/MM/YYYY hh:mm:ss')});
        return data;
    }

    start(){
                
        this.io.on('connection', async (Socket) => {

            console.log(`Connected chat ${Socket.id}`);
            const allMessages = this.dateFormat(await this.messages.getAll()); 
            Socket.emit('messages-list', allMessages);
                
            Socket.on('add-message', async (data) => {
                const { email, message } = data;
                if(email && message){
                    const newMessage = { email, message, date: moment() };
                    const data = await this.messages.save(newMessage);
                    if(!data.error){
                        Socket.emit('message-success', {data: this.dateFormat([newMessage])[0], error: null});
                        Socket.broadcast.emit('new-message', {data: newMessage, error: null})
                    }else{
                        Socket.emit('message-error', data);
                    }
                }else{
                    Socket.emit('message-error', {data: null, error: 'información no completa o no valida'});
                }
            });
        });

        console.log('Started Chat Socket')

    }
}

module.exports.ChatSocketDao = ChatSocketDao;