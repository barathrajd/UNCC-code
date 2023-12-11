const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer();

server.on('request', (request, response) => {
  const result = fs.readFileSync('./text.txt');
  response.setHeader('Content-Type', 'text/plain');
  response.end(result);
});

server.listen(4800, '127.0.0.1', () => {
  console.log(`Server started on :`, server.address());
});

console.log('first');

// for (let index = 0; index < 10000000000; index++) {}

require('fs').readFile('./text.txt', (err, data) => {
  if (err) return;
  console.log('second', data);
});
console.log('third');

setInterval(() => {
  console.log('helelo');
}, 100);

setTimeout(() => {
  console.log('Done');
}, 1);
for (let index = 0; index < 9000000000; index++) {}
