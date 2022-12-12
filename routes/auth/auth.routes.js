const express = require('express');
const path = require('path');

const isLogged = require('../../middlewares/auth/isLogged');
const removeSlash = require('../../middlewares/general/removeSlash');

const router = express.Router();


router.get('/', removeSlash, (req, res) => {
    res.render('login', {layout: false});
})


router.get('/set', (req, res) => {
    req.session.user = 'usuarioPrueba';
    req.session.pass = 'passPrueba';
    res.send('Ok');
});

router.get('/get', isLogged, (req, res) => {
    console.log({user: req.session.user, pass: req.session.pass})
    res.send("ok!!!");
});

module.exports = router;