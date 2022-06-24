const fs = require('fs'); 

class Producto{
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = undefined;
    }
}

class Contenedor{
    constructor(file = 'productos.txt'){
        this.file = file;
        this.folder = './';
        this.path = `${this.folder}${this.file}`;
    }

    read(){
        return new Promise((resolve, reject) => {
            fs.promises.readdir(this.folder)
                .then(files => {
                    if(files.includes(this.file)){
                        fs.promises.readFile(this.path, 'utf-8')
                            .then(res => {
                                resolve(res);
                            })
                            .catch(err => {
                                reject(err);
                            })
                    }else{
                        resolve('[]');
                    }
                })
                .catch(err => {
                    reject(`Error reading data from "${err.path}`);
                })
        });
    }

    save(object){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    let maxId = 0;
                    if(data.length > 0){
                        const ids = data.map(product => product.id);
                        maxId = Math.max(...ids);
                    }
                    object.id = maxId + 1;
                    data.push(object);
                    fs.promises.writeFile(this.path, JSON.stringify(data))
                        .then(() => {
                            console.log('Data saved successfully!!!');
                            console.log(`Asigned ID: ${object.id}`)
                            resolve(object.id);
                        })
                        .catch(err => {
                            reject('Upps something went wrong')
                        })
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getById(id){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    const product = data.filter(product => product.id == id);
                    if(product.length > 0){
                        resolve(product[0]);
                    }else{
                        resolve(null);
                    }                    
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getAll(){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    resolve(data);                  
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    deleteById(id){
        return new Promise((resolve, reject) => {
            this.read()
                .then(res => {
                    const data = JSON.parse(res);
                    const products = data.filter(product => product.id != id);
                    fs.promises.writeFile(this.path, JSON.stringify(products))
                        .then(() => {
                            resolve('Data updated successfully!!!');
                        })
                        .catch(err => {
                            reject('Upps something went wrong')
                        })                  
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    deleteAll(){
        return new Promise((resolve, reject) => {
            const products = [];
            fs.promises.writeFile(this.path, JSON.stringify(products))
                .then(() => {
                    resolve(`${this.file} is empty!!!`);
                })
                .catch(err => {
                    reject('Upps something went wrong')
                })
        });
    }
}

async function runTest(){
    const file = new Contenedor();
    product = new Producto('Producto 1', 100.5, 'https://www.coca-cola.com.co/content/dam/one/co/es/homepage/ccth/Home-colombia_1440x480-CCTH.png');
    let res;
    try{
        res = await file.save(product);
        console.log(res);
        res = await file.getById(1);
        console.log(res);
        res = await file.deleteById(10);
        console.log(res);
        res = await file.deleteAll();
        console.log(res);
        res = await file.getAll();
        console.log(res);
    }catch(err){
        console.log(err);
    }
}

runTest();