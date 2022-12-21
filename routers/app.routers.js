const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');

const router = express.Router();


//Routes
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  const user = await req.session.user;
  if (user) {
    return res.redirect('/profile');
  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});

router.get('/profile', auth, async (req, res) => {
  const user = req.user;
  console.log(user);
  res.render('profile', {layout: false, user: user.email});
});

router.get('/logout', auth, (req, res, next) => {
  const user = req.user;
  req.logOut((done) => {
    res.render('logout', {layout: false, user: user.email, timeout: 2000});
  });
});

router.get('/signin-error', (req, res, next) => {
  res.render('signin-error', {layout: false});
});

module.exports = router;