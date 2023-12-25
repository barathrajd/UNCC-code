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

const deleteFile = async (filePath) => {
  // await fs.writeFile(filePath, '');
  //   try {
  //     const file = await fs.open(filePath, 'r');
  //     fs.rm(filePath);
  //     return console.log(`Deleteing ${filePath}....`);
  //   } catch (error) {
  //     console.log(`The file not existed in this path ${filePath}.`);
  //   }

  try {
    const file = await fs.unlink(filePath);
    return console.log(`Deleteing ${filePath}....`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`The file not existed in this path.`);
    } else {
      console.log('Error occurred whilw removing the file.');
    }
  }
};

const renameFile = async (oldPath, newPath) => {
  // await fs.writeFile(filePath, '');
  console.log(`Rename ${oldPath} to ${newPath}....`);
};

const addToFile = (path, content) => {
  console.log(`Adding to ${path}`);
  console.log(`Content: ${content}`);
};

(async () => {
  // commands
  const CREATE_FILE = 'create a file:';
  const DELETE_FILE = 'delete a file:';
  const RENAME_FILE = 'rename a file:';
  const ADD_TO_FILE = 'add to the file:';

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

    // create a file:
    // create a file: <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file:
    // delete a file: <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file:
    // rename a file: <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      renameFile(oldFilePath, newFilePath);
    }

    // add to the file:
    // add to the file: <path> to this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' to this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 18);
      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch('./');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
