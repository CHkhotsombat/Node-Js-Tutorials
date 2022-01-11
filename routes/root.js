const express = require('express');
const router = express.Router();
const path = require('path');

const rootViewPath = path.join(__dirname, '..', 'views');

router.get('^/$|/info?', (req, res) => {
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  // res.sendFile(path.join(rootViewPath, 'index.html'));
  res.json({
    "message": "Node js REST API"
  })
});
router.use('/register', require('./register'));
router.use('/auth', require('./auth'));
router.use('/employees', require('./api/employees'));

module.exports = router;