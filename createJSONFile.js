const fs = require('fs');
const mongoose = require('mongoose');
const faker = require('faker');

const writeStream = fs.createWriteStream('sampleDatas/data.json');

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

About.init().then(() => {
  mongoose.disconnect();
});

function createJSONFile(start, end, stream, encoding, callback) {
  let i = start;
  const write = () => {
    let flag = true;
    while (i > end && flag) {
      const data = {
        id: i,
        name: faker.name.lastName() + i,
        about: {
          description: faker.lorem.paragraph(),
          hours: faker.date.weekday(),
          price: faker.random.number(100),
          style: faker.lorem.word(),
          phone: faker.phone.phoneNumber(),
        },
        banner: [faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar()],
        photo: [faker.internet.avatar(), faker.internet.avatar(), faker.internet.avatar()],
      };
      i -= 1;
      if (i % 1000000 === 0) {
        console.log(i);
      }
      if (i === end) {
        stream.write(JSON.stringify(data)+'\n', encoding, callback);
      } else {
        flag = stream.write(JSON.stringify(data)+'\n', encoding);
      }
    }
    if (i > end) {
      stream.once('drain', write);
    }
  };
  write();
}

createJSONFile(20000000, 10000000, writeStream, 'utf8', () => console.log('done'));
//mongoimport --db restaurant --collection abouts --file sampleDatas/data.json
