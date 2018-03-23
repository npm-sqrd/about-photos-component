require('newrelic');
const http = require('http');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const db = require('../db/database.js');

const port = process.env.PORT || 8081;

http.createServer((req, res) => {
  if (req.url === '/') {
    const htmlStream = fs.createReadStream(path.join(__dirname, '../client/dist/index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    htmlStream.pipe(res);
  } else if (req.url.match('bundle.js')) {
    const jsStream = fs.createReadStream(path.join(__dirname, '../client/dist/about-bundle.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    jsStream.pipe(res);
  } else if (req.url.match(/\/restaurants\/Restaurant%20\d{8}$/)) {
    const id = req.url.slice(26);
    db.findRestaurant({ name: `Restaurant ${id}` }, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end();
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    });
  }
}).listen(port);
console.log(`Server running at http://127.0.0.1:${port}`);
