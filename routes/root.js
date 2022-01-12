const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

router.get('^/$|/info?', (req, res) => {
  res.json({
    "message": "Node js REST API"
  })
});
router.use('/register', require('./register'));
router.use('/auth', require('./auth'));
router.use('/refreshToken', require('./refresh'));
router.use('/logout', require('./logout'));

// authentication before access below routes
router.use(verifyJWT);
router.use('/employees', require('./api/employees'));

module.exports = router;