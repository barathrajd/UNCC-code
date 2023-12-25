const fs = require('fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    // Get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // Allocate the buffer size
    const buffer = Buffer.alloc(size);
    // the location at which we want to start the filling our buffer
    const offset = 0;
    // the location at which we want to start the reading
    const position = 0;
    // length of the file
    const length = buffer.byteLength;
    const content = await commandFileHandler.read(
      buffer,
      offset,
      length,
      position
    );
    console.log(content);
  });

  const watcher = fs.watch('./');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
