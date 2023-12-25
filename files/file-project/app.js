const fs = require('fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  const watcher = fs.watch('./');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      //the file changed
      console.log('The file was changed');

      // Get the size of the file
      const size = (await commandFileHandler.stat()).size;
      const buffer = Buffer.alloc(size);
      const offset = 0;
      const position = 0;
      const length = size;
      const content = await commandFileHandler.read(
        buffer,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();
