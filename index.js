const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');

const { Server: HttpServer } = require('http');
const { ChatController: chat } = require('./controllers/chat.controller')
const { ProductController: product } = require('./controllers/product.controller')

const envConfig = require('./config');
const apiRoutes = require('./routes/app.routes');

const PORT = envConfig.SERVER_PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);

app.engine('hbs', engine({
    extname: 'hbs',
    layoutDefault: 'main',
    layoutsDir: path.resolve(__dirname, './public/views/layouts'),
    partialsDir: path.resolve(__dirname, './public/views/partials')
}))

app.set('views', './public/views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'CoderHouse-Backend',
    resave: false,
    saveUninitialized: false
}));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.redirect('/api/panel')
})

const server =  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
    chat.start(httpServer);
    product.start(httpServer);
    console.log("");
});

server.on('error', error => console.log(`Server error: ${error}`));