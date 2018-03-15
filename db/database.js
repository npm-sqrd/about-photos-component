/*
MONGODB
*/
// const mongoose = require('mongoose');

// const connection = 'mongodb://localhost/restaurant' || `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds259778.mlab.com:59778/abouts`;

// console.log('connection', connection);
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
// });

// const About = mongoose.model('About', aboutSchema);

// const find = (obj, cb) => {
//   About.find(obj, (err, about) => {
//     if (err) {
//       cb(err, null);
//     } else {
//       cb(null, about);
//     }
//   });
// };

// const findOne = (obj, cb) => {
//   About.findOne({}, (err, results) => {
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

