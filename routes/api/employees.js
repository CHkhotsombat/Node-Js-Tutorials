const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    const { firstname, lastname } = req.body;

    res.json({
      "firstname": firstname,
      "lastname": lastname
    })
  })

module.exports = router;