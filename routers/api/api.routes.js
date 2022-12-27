const express = require('express');
const authRoutes = require('./auth/auth.routes');

const router = express.Router();

//Routes
router.use('/auth', authRoutes);

router.get('/randoms', (req, res) => {
    const cant = req.query.cant || 100000000;
    res.json({cant});
})

module.exports = router;