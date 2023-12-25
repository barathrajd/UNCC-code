const fs = require('fs/promises');

(async () => {
  const watcher = fs.watch('./');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      //the file changed
      console.log('The file changes');
      const data = await fs.readFile('./command.txt');
      console.log(data.toString('ascii'));
    }
  }
})();
