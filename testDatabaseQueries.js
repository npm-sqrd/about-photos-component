const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = require('bluebird');

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
});

const About = mongoose.model('About', aboutSchema);

const promiseAll = [];
let count = 0;

console.time('timer');
for (let i = 10000000; i < 10000100; i += 1) {
  const random = Math.floor((Math.random() * 10000001)) + 10000000;
  promiseAll.push(About.find({ name: `Restaurant ${random}` }));
  count += 1;
}

Promise.all(promiseAll).then((data) => {
  console.log(`number of requests: ${count}`);
  console.log('sample data retrieved: ', data[0][0]);
  console.timeEnd('timer');
  mongoose.disconnect();
});

