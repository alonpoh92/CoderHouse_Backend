const express = require('express');
const AuthUtils = require('../../utils/auth/auth.utils');
const removeSlash = require('../../middlewares/general/removeSlash');

const router = express.Router();

router.get('/', removeSlash, (req, res) => {
    res.render('login', {layout: false});
});

router.post('/signin', (req, res, next) => {
    try{
        const session = AuthUtils.initSession(req, req.body);
        res.redirect('/api/panel');
    }catch(error){
        res.status(400).json({error: error.message});
    }
}, router);

router.post('/signup', (req, res) => {
    const result = {data: null, error: null};
    res.status(200).send(result);
});

router.post('/logout', (req, res) => {
    const user = req.session;
    req.session.destroy(function(err) {
        res.render('logout', {layout: false, user, timeout: 2000});
    })
});

module.exports = router;