const $ = require('jquery');

const BASE_URL = process.env.BASE_URL || '';

const get = (name, cb) => {
  $.ajax({
    url: `${BASE_URL}/restaurants/summary/${name}`,
    method: 'GET',
    success: (data) => {
      cb(null, data);
    },
  });
};

module.exports.get = get;
