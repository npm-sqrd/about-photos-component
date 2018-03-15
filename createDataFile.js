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
        name: faker.company.companyName() + faker.name.lastName(),
        about: {
          description: faker.lorem.sentences(),
          hours: faker.date.weekday(),
          price: faker.random.number(100),
          style: faker.lorem.word(),
          phone: faker.phone.phoneNumber(),
        },
        banner: [faker.image.city(), faker.image.nature(), faker.image.business(), faker.image.nightlife()],
        photo: [faker.image.food(), faker.image.animals(), faker.image.cats()],
      };
      i -= 1;
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

// createDataFile(20000000, 10000000, writeStream, 'utf8', () => console.log('done'));
//mongoimport --db restaurant --collection abouts --file sampleDatas/sampleData.json