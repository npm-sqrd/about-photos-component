// const faker = require('faker');
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

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
    hours: Number,
    price: Number,
    style: String,
    phone: String,
  },
  banner: [],
  photo: [],
});


const About = mongoose.model('About', aboutSchema);

// const insert = (i, max) => {
//   if (i === max) {
//     mongoose.disconnect();
//   }
//   const data = {
//     id: i,
//     name: faker.Company.companyName() + faker.Name.lastName(),
//     about: {
//       description: faker.Lorem.sentences(),
//       hours: faker.Date.recent(),
//       price: faker.Helpers.randomNumber(100),
//       style: faker.Lorem.words(),
//       phone: faker.PhoneNumber.phoneNumber(),
//     },
//     banner: [faker.Image.nightlife(), faker.Image.nightlife(), faker.Image.nightlife(), faker.Image.nightlife()],
//     photo: [faker.Image.food(), faker.Image.food(), faker.Image.food()],
//   };

//   About.create(data).then(() => {
//     insert(i+1, max);
//   }).catch(err => console.error(err));
// };

const find = (obj, cb) => {
  About.find(obj, (err, about) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, about);
    }
  });
};

const findOne = (obj, cb) => {
  About.findOne({}, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

module.exports.find = find;
module.exports.findOne = findOne;

