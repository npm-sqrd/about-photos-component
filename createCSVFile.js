const fs = require('fs');
const faker = require('faker');
const Promise = require('bluebird');


      // const data = {
      //   id: i,
      //   name: faker.name.lastName() + i,
      //   about: {
      //     description: faker.lorem.paragraph(),
      //     hours: faker.date.weekday(),
      //     price: faker.random.number(100),
      //     style: faker.lorem.word(),
      //     phone: faker.phone.phoneNumber(),
      //   },
      //   banner: [faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar()],
      //   photo: [faker.internet.avatar(), faker.internet.avatar(), faker.internet.avatar()],
      // };

function createCSVFile(tableName, start, end, writeStream, encoding, callback) {
  // const writeStream = fs.createWriteStream(`sampleDatas/${tableName}.csv`);

  let i = start;
  const write = () => {
    let flag = true;
    while (i > end && flag) {
      let data = '';
      if (tableName === 'restaurant') {
        data = `${i},Restaurant ${i},${i},${i},${i}`;
      } else if (tableName === 'about') {
        data = `${i},${faker.lorem.paragraph()},${faker.date.weekday()},${faker.random.number(100)},${faker.lorem.word()},${faker.phone.phoneNumber()}`;
      } else if (tableName === 'banner') {
        data = `${i},${faker.image.avatar()},${faker.image.avatar()},${faker.image.avatar()},${faker.image.avatar()}`;
      } else if (tableName === 'photo') {
        data = `${i},${faker.internet.avatar()},${faker.internet.avatar()},${faker.internet.avatar()}`;
      }
      if (i % 1000000 === 0) {
        console.log(tableName, i);
      }
      if (i === end) {
        writeStream.write(data + '\n', encoding, callback);
      } else {
        flag = writeStream.write(data + '\n', encoding);
      }
      i -= 1;
    }
    if (i > end) {
      writeStream.once('drain', write);
    }
  };
  write();
}

const promiseContainer = [];

const begin = (tableName) => {
const writeStream = fs.createWriteStream(`sampleDatas/${tableName}.csv`);
createCSVFile(tableName, 20000000, 10000000, writeStream, 'utf8', () => console.log('end'));
};

const tableName = ['restaurant', 'about', 'banner', 'photo'];

for (let i = 0; i < tableName.length; i += 1) {
  promiseContainer.push(begin(tableName[i]));
}

Promise.all(promiseContainer);

// createCSVFile('image', 20000000, 10000000, 'utf8', () => console.log('done'));
