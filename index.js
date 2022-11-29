const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { Container } = require('./model/classes/Container');
const dbConfig = require('./db/config');


const products = new Container(dbConfig.mariaDB, 'products');
const messages = new Container(dbConfig.sqlite, 'messages');

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const server =  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

server.on('error', error => console.log(`Server error: ${error}`));

const io = new IOServer(httpServer);

io.on('connection', async (Socket) => {
    const data = await products.getAll();
    Socket.emit('products-list', data);
    const allMessages = await messages.getAll();
    Socket.emit('messages-list', allMessages);

    Socket.on('add-product', async (data) => {
        const { title, price, thumbnail } = data;
        if(title && Number(price) && thumbnail){
            const newProduct = { title, price: Number(price), thumbnail };
            const data = await products.save(newProduct);
            if(!data.error){
                Socket.emit('product-success', {data: newProduct, error: null});
                Socket.broadcast.emit('new-product', {data: newProduct, error: null})
            }else{
                Socket.emit('product-error', data);
            }
        }else{
            Socket.emit('product-error', {data: null, error: 'información no completa o no valida'});
        }
    });

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
