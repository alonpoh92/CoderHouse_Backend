const express = require('express');
const session = require('express-session');

const router = express.Router();


router.get('/', (req, res) => {
    req.session.user = 'usuarioPrueba';
    req.session.pass = 'passPrueba';
    res.send('Ok');
});
router.get('/get', (req, res) => {
    console.log({user: req.session.user, pass: req.session.pass})
    res.send("ok!!!");
});
//router.use('/productos', productosRoutes);

module.exports = router;