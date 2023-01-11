const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const passport = require('./middlewares/passport');
const args = require('./utils/minimist.utils');
const cluster = require('cluster');
const os = require('os');


const env = require('./env.config');
const dbConfig = require('./db/config');
const apisRoutes = require('./routers/app.routers');
const MongoContainer = require('./models/containers/Mongodb.container');
const { Server: HttpServer } = require('http');
const { ChatController: chat } = require('./controllers/chat.controller')
const { ProductController: product } = require('./controllers/product.controller')

const PORT = args.port;
const MODE = args.mode;

const app = express();
const httpServer = new HttpServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
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
  layoutsDir: path.resolve(__dirname, './public/views/layouts'),
  partialsDir: path.resolve(__dirname, './public/views/partials')
}))

app.set('views', './public/views');
app.set('view engine', 'hbs');

// Routes
app.use(apisRoutes);


if(cluster.isPrimary && MODE === "CLUSTER"){
  for(let i=0; i<os.cpus().length; i++){
    cluster.fork();
  }
}else{
  const server = httpServer.listen(PORT, async () => {
    chat.start(httpServer);
    product.start(httpServer);
    MongoContainer.connect()
    .then(() => {
      console.log('Connected to DB!');
      console.log(`Server is up and running on port: ${PORT} pid: ${process.pid}`);
    });
  });
}