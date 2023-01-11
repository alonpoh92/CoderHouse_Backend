const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');
const args = require('../utils/minimist.utils');
const os = require('os');

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
  res.render('profile', {layout: false, user: user.email});
});

router.get('/info', (req, res) => {
  const data = {};
  data.args = [];
  for(key in args){
    if(key == "_"){
      data.args.push({key: 'others', value: args[key]});
    }else{
      data.args.push({key, value: args[key]});
    }
  }
  data.platform = process.platform;
  data.version = process.version;
  data.memory = process.memoryUsage().rss;
  data.executionPath = process.argv[0];
  data.pid = process.pid;
  data.folderPath = process.cwd();
  data.cpus = os.cpus().length;
  res.render('info', {layout: false, data})
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