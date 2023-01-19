const express = require('express');
const authRoutes = require('./auth/auth.routes');
const { fork } = require('child_process');
const args = require('../../utils/minimist.utils');

const router = express.Router();

//Routes
router.use('/auth', authRoutes);

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100000000;

    //------------- not blocking server -------------//
    //const calc = fork('./child-process/fork/random.js');
    //calc.send(cant);
    //calc.on('message', (data) => {
    //    res.json({port: args['p'], data});
    //})

    //------------- blocking server -----------------//
    const result = {};
    for (let i=0; i<cant; i+=1){
        const rand = Math.floor(Math.random() * 1000) + 1;
        if(result[rand] == undefined){
            result[rand] = 1;
        }else{
            result[rand] += 1;
        }
    }
    const data = Object.keys(result).sort().reduce(function (res, key) {
                    res[key] = result[key];
                    return res;
                }, {});
    res.json({port: args['p'], data});
})

module.exports = router;