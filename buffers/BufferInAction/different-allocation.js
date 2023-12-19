const { Buffer } = require('buffer');
const { log } = require('console');

const buf = Buffer.alloc(10000, 0);

log(buf);
log(Buffer.name);
