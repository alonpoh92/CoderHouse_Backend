const path = require('path');

const isLogged = (req, res, next) => {
    if(req.session && req.session.name){
        return next();
    }else{
        return res.status(401).redirect('/api/auth');
    }
}

module.exports = isLogged;