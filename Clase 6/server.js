const {Contenedor} = require('./Contenedor.js');
const express = require('express');

const productos = new Contenedor('productos.txt');
const app = express();
const PORT = process.env.PORT || 8080;
const server =  app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

server.on('error', error => console.log(`Server error: ${error}`));

app.get('/productos', async (req, res) => {
    const data = await productos.getAll();
    if(!data.err){
        res.status(200).json(data);
    }else{
        res.status(400).json(data);   
    }
});

app.get('/productoRandom', async (req, res) => {
    const data = await productos.getAll();
    if(!data.err){
        const ids = data.data.map(product => product.id);
        const randId = ids[Math.floor(Math.random() * ids.length)];
        const product = await productos.getById(randId);
        res.status(200).json(product);
    }else{
        res.status(400).json(data);
    }
});