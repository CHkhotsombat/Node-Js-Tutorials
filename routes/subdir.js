const express = require('express');
const router = express.Router();
const path = require('path');

const subdirViewPath = path.join(__dirname, '..', 'views', 'subdir');

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(subdirViewPath, 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
  res.sendFile(path.join(subdirViewPath, 'test.html'));
});

module.exports = router;