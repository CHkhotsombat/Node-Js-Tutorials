const express = require('express');
const router = express.Router();
const path = require('path');

const rootViewPath = path.join(__dirname, '..', 'views');

router.get('^/$|/index(.html)?', (req, res) => {
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(rootViewPath, 'index.html'));
});


module.exports = router;