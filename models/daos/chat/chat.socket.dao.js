const { SocketContainer } = require('../../containers/socket.container');

class ChatSocketDao extends SocketContainer{
    constructor(httpServer){
        super(httpServer);
    }

    start(){
        this.io.on('connection', async (Socket) => {
            console.log("Connected chat");
            const allMessages = await messages.getAll();
            Socket.emit('messages-list', allMessages);
                
            Socket.on('add-message', async (data) => {
                const { email, message } = data;
                const d = new Date;
                const dformat = [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')+' '+[d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
                if(email && message){
                    const newMessage = { email, message, date: dformat };
                    const data = await messages.save(newMessage);
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
    }
}

module.exports.ChatSocketDao = ChatSocketDao;