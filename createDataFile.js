const fs = require('fs');
const faker = require('faker');

const write = (start, end) => {
  let container = [];
  let i = start;
  while (true) {
    const data = {
      id: i,
      name: faker.Company.companyName() + faker.Name.lastName(),
      about: {
        description: faker.Lorem.sentences(),
        hours: faker.Date.recent(),
        price: faker.Helpers.randomNumber(100),
        style: faker.Lorem.words(),
        phone: faker.PhoneNumber.phoneNumber(),
      },
      banner: [faker.Image.nightlife(), faker.Image.nightlife(), faker.Image.nightlife(), faker.Image.nightlife()],
      photo: [faker.Image.food(), faker.Image.food(), faker.Image.food()],
    };
    container.push(data);
    i++;
    if (i !== 0 && i % 500000 === 0) {
      container.map(obj => {
        fs.appendFileSync(`./sampleDatas/sampleData${i}.json`, JSON.stringify(obj)+'\n');
      });
      container = [];
    }
    if (i === end) {
      break;
    }
  }
};

//mongoimport --db restaurant --collection abouts --file sampleDatas/sampleData.json