const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const passport = require('./src/business/middlewares/passport');
const args = require('./src/business/utils/minimist.utils');
const cluster = require('cluster');
const os = require('os');


const routeLogger = require('./src/business/middlewares/route_logger');
const env = require('./env.config');
const dbConfig = require('./src/persistence/db/config');
const apisRoutes = require('./src/router/routers/app.routers');
const MongoContainer = require('./src/persistence/models/containers/Mongodb.container');
const { Server: HttpServer } = require('http');
const { ChatController: chat } = require('./src/controllers/chat.controller')
const { ProductController: product } = require('./src/controllers/product.controller')

const PORT = args.port;
const MODE = args.mode;

const app = express();
const httpServer = new HttpServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/router/public'));
app.use(session({
  name: 'coder-session',
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,  
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('sessions')
  }),
  cookie: {
    maxAge: 600000,
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.engine('hbs', engine({
  extname: 'hbs',
  layoutDefault: 'main',
  layoutsDir: path.resolve(__dirname, './src/router/public/views/layouts'),
  partialsDir: path.resolve(__dirname, './src/router/public/views/partials')
}))

app.set('views', './src/router/public/views');
app.set('view engine', 'hbs');

// Routes
app.use('/', routeLogger(true), apisRoutes);
app.use('*', routeLogger(false), (req, res) => {
  res.send(`Route ${req.baseUrl} not working`)
});

if(cluster.isPrimary && MODE === "CLUSTER"){
  for(let i=0; i<os.cpus().length; i++){
    cluster.fork();
  }
}else{
  const server = httpServer.listen(PORT, async () => {
    MongoContainer.connect()
    .then(() => {
      chat.start(httpServer);
      product.start(httpServer);
      console.log('Connected to DB!');
      console.log(`Server is up and running on port: ${PORT} pid: ${process.pid}`);
    });
  });
}