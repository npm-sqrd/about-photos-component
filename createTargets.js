const fs = require('fs');


function createTargetFile(port, start, end, encoding, callback) {
  const writeStream = fs.createWriteStream(`targets${port}.txt`);

  let i = start;
  const write = () => {
    let flag = true;
    while (i > end && flag) {
      let data = `GET http://localhost:${port}/restaurants/Restaurant ${i}`;

      if (i % 1000000 === 0) {
        console.log(i);
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

createTargetFile(3000, 20000000, 19000000, 'utf8', () => {
  console.log('done');
});
