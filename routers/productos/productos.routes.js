const express = require('express');
const router = express.Router();

const {Contenedor} = require('../../classes/Contenedor');
const productos = new Contenedor('productos.txt');

router.get('/', async (req, res) => {
    const data = await productos.getAll();
    if(!data.error){
        res.status(200).json(data);
    }else{
        res.status(400).json(data);   
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await productos.getById(id);
    if(!data.error){
        res.status(200).json(data);
    }else{
        res.status(400).json(data);
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const { title, price, thumbnail } = req.body;
    if(title && Number(price) && thumbnail){
        const newProduct = { title, price: Number(price), thumbnail };
        const data = await productos.save(newProduct);
        if(!data.error){
            res.status(200).json({data: newProduct, error: null});
        }else{
            res.status(400).json(data);
        }
    }else{
        res.status(200).json({data: null, error: 'información no completa o no valida'});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    body.price = Number(body.price);
    let data = await productos.getById(id);
    if(!data.error){
        if(body.title || body.price || body.thumbnail){
            const product = data.data;
            let updatedProduct = {};
            for(let key of Object.keys(product)){
                if(body[key]){
                    updatedProduct[key] = body[key];
                }else{
                    updatedProduct[key] = product[key];
                }
            }
            data = await productos.deleteById(id);
            if(!data.error){
                data = await productos.save(updatedProduct);
                if(!data.error){
                    data.data = updatedProduct;
                    res.status(200).json(data);
                }else{
                    res.status(400).json(data);
                }
            }else{
                res.status(400).json(data);
            }
        }else{
            res.status(200).json({data: null, error: 'información no completa o no valida'});
        }
    }else{
        res.status(400).json(data);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let data = await productos.getById(id);
    if(!data.error){
        data = await productos.deleteById(id);
        if(!data.error){
            res.status(200).json(data);
        }else{
            res.status(400).json(data);
        }
    }else{
        res.status(400).json(data);
    }
});

module.exports = router;