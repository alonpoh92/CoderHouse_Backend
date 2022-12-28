const express = require('express');
const authRoutes = require('./auth/auth.routes');
const { fork } = require('child_process');

const router = express.Router();

//Routes
router.use('/auth', authRoutes);

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100000000;
    const calc = fork('./child-process/fork/random.js');
    calc.send(cant);
    calc.on('message', (data) => {
        res.json(data);
    })
})

module.exports = router;