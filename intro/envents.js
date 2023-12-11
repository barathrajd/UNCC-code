const EventEmitter = require('node:events');

const ee1 = new EventEmitter();

// ee1.setMaxListeners(1);

ee1.on('on', () => {
  console.log('on the switch');
});

ee1.on('on', () => {
  console.log('on the second switch');
});

// console.log(ee1.eventNames());
// console.log(ee1.getMaxListeners());
// console.log(ee1.listenerCount());
// console.log(ee1.listeners('on'));
console.log(ee1.rawListeners('on'));
ee1.emit('on');
