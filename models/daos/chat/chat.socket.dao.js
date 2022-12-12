const { SocketContainer } = require('../../containers/socket.container');
const { FirebaseContainer } = require('../../containers/firebase.container');

class ChatSocketDao extends SocketContainer{
    constructor(httpServer){
        super(httpServer);
        this.messages = new FirebaseContainer('messages');
    }

    start(){
        this.io.on('connection', async (Socket) => {
            console.log(`Connected chat ${Socket.id}`);
            const allMessages = await this.messages.getAll();
            Socket.emit('messages-list', allMessages);
                
            Socket.on('add-message', async (data) => {
                console.log(data);
                const { email, message } = data;
                const d = new Date;
                const dformat = [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')+' '+[d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
                if(email && message){
                    const newMessage = { email, message, date: dformat };
                    const data = await this.messages.save(newMessage);
                    console.log("aqui", data);
                    if(!data.error){
                        Socket.emit('message-success', {data: newMessage, error: null});
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