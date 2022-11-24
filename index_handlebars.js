const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const {Contenedor} = require('./model/classes/Contenedor');

const PORT = process.env.PORT || 8080;

const app = express();
const productos = new Contenedor('productos.txt');

app.engine('hbs', engine({
    extname: 'hbs',
    layoutDefault: 'main',
    layoutsDir: path.resolve(__dirname, './handlebars/views/layouts'),
    partialsDir: path.resolve(__dirname, './handlebars/views/partials')
}))

app.set('views', './handlebars/views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/productos', async (req, res) => {
    const data = await productos.getAll();
    if(!data.error){
        data.products = data.data.length > 0;
        res.render('products', data);
    }else{
        res.render('index', data);   
    }
});

app.post('/productos', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    if(title && Number(price) && thumbnail){
        const newProduct = { title, price: Number(price), thumbnail };
        const data = await productos.save(newProduct);
        if(!data.error){
            res.redirect('/productos');
        }else{
            res.render('index', data);
        }
    }else{
        res.render('index', {data: null, error: 'información no completa o no valida'});
    }
});

const server =  app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

server.on('error', error => console.log(`Server error: ${error}`));