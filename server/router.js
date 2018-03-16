const express = require('express');
const db = require('../db/database.js');

const router = express.Router();

router.get('/:name', (req, res) => {
  res.set({ 'Access-Control-Allow-Origin' : '*' });
  db.findOne({ $text: { $search: req.params.name } }, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
