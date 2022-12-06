const express = require('express');
const { Server: HttpServer } = require('http');
const { ProductChatController: socket } = require('./controllers/productChat.controller')
const envConfig = require('./config');
const apiRoutes = require('./routes/app.routes');

const PORT = envConfig.SERVER_PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);

const server =  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
    socket.start(httpServer);
});

server.on('error', error => console.log(`Server error: ${error}`));