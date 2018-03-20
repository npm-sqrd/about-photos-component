const express = require('express');
const db = require('../db/database.js');

const router = express.Router();

// router.get('/:name', (req, res) => {
//   // res.set({ 'Access-Control-Allow-Origin' : '*' });
//   db.find(req.params, (err, data) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       res.send(data);
//     }
//   });
// });

router.get('/:name', (req, res) => {
  db.select(req.params.name).then((data) => {
    const strData = JSON.stringify(data.rows);
    const parse = JSON.parse(strData);
    const format = [{
      name: parse[0].name,
      about: {
        description: parse[0].description,
        hours: parse[0].hour,
        phone: parse[0].phone,
        price: parse[0].price,
        style: parse[0].style,
      },
      banner: [parse[0].bannerimg01, parse[0].bannerimg02, parse[0].bannerimg03, parse[0].bannerimg04],
      photo: [parse[0].photoimg01, parse[0].photoimg02, parse[0].photoimg03],
    }];
    res.json(format);
  }).catch((err) => {
    res.sendStatus(404);
  });
});

module.exports = router;
