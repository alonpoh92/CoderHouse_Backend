const express = require('express');
const authRoutes = require('./auth/auth.routes');
const args = require('../../../../utils/minimist.utils');
const randomController = require('../../../controllers/randoms.controller');

const router = express.Router();

//Routes
router.use('/auth', authRoutes);

router.get('/randoms', async (req, res) => {
    const cant = req.query.cant || 100000000;

    //------------- not blocking server -------------//
    const calc = await randomController.randomAsync(cant);
    //------------- blocking server -----------------//
    //const calc = randomController.randomSync(cant);
    res.json({port: args['p'], data: calc});
})

module.exports = router;