/*
MONGODB
*/
// const mongoose = require('mongoose');

// const connection = 'mongodb://localhost/restaurant' || `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds259778.mlab.com:59778/abouts`;

// mongoose.connect(connection);

// const aboutSchema = mongoose.Schema({
//   id: {
//     type: Number,
//     unique: true,
//   },
//   name: String,
//   about: {
//     description: String,
//     hours: String,
//     price: Number,
//     style: String,
//     phone: String,
//   },
//   banner: [],
//   photo: [],
// }).index({ name: 1 });

// const About = mongoose.model('About', aboutSchema);

// const find = (obj, cb) => {
//   About.find(obj).lean().exec((err, about) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, about);
//     }
//   });
// };

// const findOne = (obj, cb) => {
//   About.find(obj).lean().exec((err, results) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, results);
//     }
//   });
// };

// module.exports.find = find;
// module.exports.findOne = findOne;

/*
POSTGRESQL
*/

const { Client } = require('pg');
const Promise = require('bluebird');

const client = new Client({
  host: process.env.RDS_HOSTNAME || 'localhost',
  user: process.env.POSTGRES_USER || process.env.RDS_USERNAME || '',
  password: process.env.RDS_PASSWORD || '',
  database: process.env.POSTGRES_DB || process.env.RDS_DB_NAME || 'restaurants',
  port: process.env.RDS_PORT || '',
});

client.connect();

const query = 'SELECT * FROM restaurant INNER JOIN about ON restaurant.name = $1 and restaurant.about_id = about.id INNER JOIN banner ON restaurant.banner_id = banner.id INNER JOIN photo ON restaurant.photo_id = photo.id;';
const select = (restaurantName) => (
  new Promise((resolve, reject) => {
    client.query(query, [restaurantName], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
);

module.exports.select = select;
