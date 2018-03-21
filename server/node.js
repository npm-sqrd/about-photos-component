require('newrelic');
const http = require('http');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const db = require('../db/database.js');

http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFileAsync(path.join(__dirname, '../client/dist/index.html'), 'utf8')
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      })
      .catch(() => {
        res.writeHead(400);
        res.end();
      });
  } else if (req.url.match('.css')) {
    const cssStream = fs.createReadStream(path.join(__dirname, '../client/dist/styles.css'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    cssStream.pipe(res);
  } else if (req.url.match('.js')) {
    const jsStream = fs.createReadStream(path.join(__dirname, '../client/dist/bundle.js'), 'utf8');
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
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
