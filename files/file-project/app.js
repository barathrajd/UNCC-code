const fs = require('fs/promises');

const createFile = async (filePath) => {
  // await fs.writeFile(filePath, '');
  try {
    const exisitingFileHandle = await fs.open(filePath, 'r');
    exisitingFileHandle.close();
    return console.log(`This file ${filePath} already exists.`);
  } catch (error) {
    // we don't have the file now we
    // console.log(error);
    const newFileHandle = await fs.open(filePath, 'w');
    console.log('A new File created successfully.');
    newFileHandle.close();
  }
};

(async () => {
  // commands
  const CREATE_FILE = 'create a file';

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
    await commandFileHandler.read(buffer, offset, length, position);

    // Need to read the conent
    const command = buffer.toString('utf-8');

    // create a file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  const watcher = fs.watch('./');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
