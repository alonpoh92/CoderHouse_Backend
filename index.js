const express = require('express');
const session = require('express-session');
const { Server: HttpServer } = require('http');
const { ChatController: chat } = require('./controllers/chat.controller')
const { ProductController: product } = require('./controllers/product.controller')
const envConfig = require('./config');
const apiRoutes = require('./routes/app.routes');

const PORT = envConfig.SERVER_PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'CoderHouse-Backend',
    resave: false,
    saveUninitialized: false
}));
app.use(isLogged);
app.use('/api', apiRoutes);

const server =  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
    chat.start(httpServer);
    product.start(httpServer);
    console.log("");
});

server.on('error', error => console.log(`Server error: ${error}`));