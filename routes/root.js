const express = require('express');
const router = express.Router();
const path = require('path');

const rootViewPath = path.join(__dirname, '..', 'views');

router.get('/', (req, res) => {
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(rootViewPath, 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(rootViewPath, 'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page');
});

module.exports = router;