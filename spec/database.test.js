const sampleData = require('../data/sampleData.js');
const db = require('../db/database.js');
const mongoose = require('mongoose');
const seed = require('../db/database.js');

describe('seeded data should be inserted properly', () => {
  test('Restaurant 12345678 should be retrieved', (done) => {
    db.find({ name: 'Restaurant 12345678' }, (err, data) => {
      if (err) {
        throw err;
      }
      expect(data.length).toBe(1);
      expect(data[0].photo.length).toBe(3);
      done();
    });
  });
});
