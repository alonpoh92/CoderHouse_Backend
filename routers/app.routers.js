const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { faker } = require('@faker-js/faker');

const router = express.Router();
const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    layoutDefault: 'main',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', './views');
app.set('view engine', 'hbs');

function generateProduct(){
    return {title: faker.commerce.productName(), price: faker.commerce.price(100, 200, 2, '$'), thumbnail: faker.image.abstract()};
}

router.get('/productos-test', async (req, res) => {
    const products = [];
    for(let i=0; i<5; i+=1){
        products.push(generateProduct());
    }
    res.render('index', {data: products});
});

router.get('/productos-test/products', async (req, res) => {
    const products = [];
    for(let i=0; i<5; i+=1){
        products.push(generateProduct());
    }
    res.status(200).json(products);
});

module.exports = router;