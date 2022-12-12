const express = require('express');

const removeSlash = require('../../middlewares/general/removeSlash');
const isLogged = require('../../middlewares/auth/isLogged');

const router = express.Router();


router.get('/', removeSlash, isLogged, (req, res) => {
    res.render('index', {layout: false});
})

module.exports = router;