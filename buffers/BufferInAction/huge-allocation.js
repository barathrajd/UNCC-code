const { Buffer, constants } = require('buffer');

const b = Buffer.alloc(4e9);

console.log(constants);

for (let index = 0; index < b.length; index++) {
  b[index] = 0x2 + index;
}
