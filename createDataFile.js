const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('sampleDatas/data.json');

function createDataFile(start, end, stream, encoding, callback) {
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

createDataFile(20000000, 10000000, writeStream, 'utf8', () => console.log('done'));
//mongoimport --db restaurant --collection abouts --file sampleDatas/data.json
