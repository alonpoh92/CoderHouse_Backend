const fs = require('fs'); 
const express = require('express')

class Contenedor{
    constructor(file){
        this.file = file;
        this.folder = './';
        this.path = `${this.folder}${this.file}`;
    }

    async read(){
        const res = {};
        try{
            const files = await fs.promises.readdir(this.folder);
            if(files.includes(this.file)){
                try{
                    const data = await fs.promises.readFile(this.path, 'utf-8');
                    res['data'] = data;
                    res['err'] = null;
                }catch(err){
                    res['data'] = null;
                    res['err'] = err;
                }
            }else{
                res['data'] = '[]';
                res['err'] = null;
            }
        }catch(err){
            res['data'] = null;
            res['err'] = err;
        };
        return res;
    }

    async save(object){
        const res = {};
        try{
            const result = await this.read();
            if(!result.err){
                const data = JSON.parse(result.data);
                let maxId = 0;
                if(data.length > 0){
                    const ids = data.map(product => product.id);
                    maxId = Math.max(...ids);
                }
                object.id = maxId + 1;
                data.push(object);
                try{
                    await fs.promises.writeFile(this.path, JSON.stringify(data));
                    res['data'] = object.id;
                    res['err'] = null;
                }catch(err){
                    res['data'] = null;
                    res['err'] = err;
                }
            }else{
                res['data'] = null;
                res['err'] = result.err;
            }
        }catch(err){
            res['data'] = null;
            res['err'] = err;
        }
        return res;            
    }

    async getById(id){
        const res = {}
        try{
            const result = await this.read();
            if(!result.err){
                const data = JSON.parse(result.data);
                const product = data.filter(product => product.id == id);
                if(product.length > 0){
                    res['data'] = product[0];
                }else{
                    res['data'] = null;
                }  
                res['err'] = null;
            }else{
                res['data'] = null;
                res['err'] = result.err;
            }
        }catch(err){
            res['data'] = null;
            res['err'] = err;
        }
        return res;
    }

    async getAll(){
        const res = {};
        try{
            const result = await this.read();
            if(!result.err){
                const data = JSON.parse(result.data);
                res['data'] = data;
                res['err'] = null;
            }else{
                res['data'] = null;
                res['err'] = result.err;
            }
        }catch(err){
            res['data'] = null;
            res['err'] = err;
        }
        return res;
    }

    async deleteById(id){
        const res = {};
        try{
            const result = await this.read();
            if(!result.err){
                const data = JSON.parse(result.data);
                const products = data.filter(product => product.id != id);
                try{
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    res['err'] = null;
                }catch(err){
                    res['err'] = err;
                }
            }else{
                res['err'] = result.err;
            }
        }catch(err){
            res['err'] = err;
        }
        return res;
    }

    async deleteAll(){
        const res = {};
        const products = [];
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            res['err'] = null;
        }catch(err){
            res['err'] = err;
        }
        return res;
    }
}

const productos = new Contenedor('productos.txt');
const app = express();
const PORT = 8080;
const server =  app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

server.on('error', error => console.log(`Server error: ${error}`));

app.get('/productos', async (req, res) => {
    const data = await productos.getAll();
    res.send(data);
});

app.get('/productoRandom', async (req, res) => {
    const data = await productos.getAll();
    if(!data.err){
        const ids = data.data.map(product => product.id);
        const randId = ids[Math.floor(Math.random() * ids.length)];
        const product = await productos.getById(randId);
        res.send(product);
    }else{
        res.send(data);
    }
});