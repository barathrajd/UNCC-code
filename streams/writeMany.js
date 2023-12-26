// const fs = require('node:fs/promises');

// async function writeFile() {
//   try {
//     console.time('writeMany');
//     const file = await fs.open('text.txt', 'w');
//     for (let index = 0; index < 1000000; index++) {
//       file.write(` ${index} `);
//     }
//     file.close();
//     console.timeEnd('writeMany');
//   } catch (error) {
//     console.log('Some error');
//   }
// }

// writeFile();

const fs = require('node:fs');

(async () => {
  console.time('writeMany');
  fs.open('text.txt', 'w', (err, fd) => {
    for (let index = 0; index < 1000000; index++) {
      const buff = Buffer.from(` ${index} `, 'utf-8');
      fs.writeSync(fd, buff);
    }
    console.timeEnd('writeMany');
  });
})();
