/*
MONGODB
*/
const mongoose = require('mongoose');

const connection = 'mongodb://localhost/restaurant' || `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds259778.mlab.com:59778/abouts`;

console.log('connection', connection);
mongoose.connect(connection);

const aboutSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  about: {
    description: String,
    hours: String,
    price: Number,
    style: String,
    phone: String,
  },
  banner: [],
  photo: [],
}).index({ name: 'text' });

const About = mongoose.model('About', aboutSchema);

const find = (obj, cb) => {
  About.find(obj).lean().exec((err, about) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, about);
    }
  });
};

const findOne = (obj, cb) => {
  About.findOne(obj, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

module.exports.find = find;
module.exports.findOne = findOne;

/*
POSTGRESQL
*/

// const { Client } = require('pg');
// const Promise = require('bluebird');

// const client = new Client({
//   host: process.env.RDS_HOSTNAME || 'localhost',
//   user: process.env.POSTGRES_USER || process.env.RDS_USERNAME || '',
//   password: process.env.RDS_PASSWORD || '',
//   database: process.env.POSTGRES_DB || process.env.RDS_DB_NAME || 'restaurants',
//   port: process.env.RDS_PORT || '',
// });

// client.connect();

// client.db = {
//   select: restaurantID => (
//     const query = '';
//     new Promise((resolve, reject) => {
//       client.query(query, [restaurantID], (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     })
//   ),
// };

// module.exports = client;
