const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, 'text.txt'));

// console.log(content.toString('hex'));

// console.log(__dirname);

// File
// Three different ways - Promises API, Callback API, Synchronous API
