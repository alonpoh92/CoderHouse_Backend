const express = require('express');
const path = require('path');
const {Contenedor} = require('./model/classes/Contenedor');

const PORT = process.env.PORT || 8080;

const app = express();
const productos = new Contenedor('productos.txt');

app.set('views', './ejs/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('pages/index', {error: false});
});

app.get('/productos', async (req, res) => {
    const data = await productos.getAll();
    if(!data.error){
        res.render('pages/products', data);
    }else{
        res.render('pages/index', data);   
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
            console.log(data);
            res.render('pages/index', data);
        }
    }else{
        res.render('pages/index', {data: null, error: 'información no completa o no valida'});
    }
});

const server =  app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

server.on('error', error => console.log(`Server error: ${error}`));