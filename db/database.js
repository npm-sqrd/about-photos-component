
const mongoose = require('mongoose');
const redisClient = require('./redisClient');

const connection = 'mongodb://localhost/restaurant' || `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds259778.mlab.com:59778/abouts`;

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
}).index({ name: 1 });

const About = mongoose.model('About', aboutSchema);

const findRestaurant = (obj, cb) => {
  const key = obj.name;
  redisClient.get(key, (error, data) => {
    if (error) {
      console.log('redis error');
      cb(error, null);
    } else if (data !== null) {
      console.log('data != null', data);
      cb(null, data);
    } else {
      About.find(obj).lean().exec((err, about) => {
        if (err) {
          cb(err, null);
        } else {
          const value = JSON.stringify(about);
          console.log('value', value);
          redisClient.setex(key, 10, value);
          cb(null, about);
        }
      });
    }
  });
};

const findOne = (obj, cb) => {
  About.find(obj).lean().exec((err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

module.exports.findRestaurant = findRestaurant;
module.exports.findOne = findOne;
