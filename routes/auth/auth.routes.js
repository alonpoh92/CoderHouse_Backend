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
    req.session.users = [1,2,3];
    console.log(req.session);
    res.status(200).send(result);
});

module.exports = router;