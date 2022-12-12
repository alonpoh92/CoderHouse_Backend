const express = require('express');
const removeSlash = require('../../middlewares/general/removeSlash');

const router = express.Router();

router.get('/', removeSlash, (req, res) => {
    res.render('login', {layout: false});
});

router.get('/signin', (req, res) => {

});

router.post('/signup', (req, res) => {
    const result = {data: null, error: null};
    req.session.users = [1,2,3];
    console.log(req.session);
    res.status(200).send(result);
});

module.exports = router;