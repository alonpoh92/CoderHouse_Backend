const express = require('express');

const authRoutes = require('./auth/auth.routes');
const panelRoutes = require('./panel/panel.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/panel', panelRoutes);

module.exports = router;