const fs = require("fs");

const events = require("events");

//creating event emitter
const eventEmitter = new events.EventEmitter();

const createFileHandler = function createFile() {
  console.log("file creation begins...");
  for (let f = 0; f < 100; f++) {
    fs.appendFileSync("abc.txt", `\n Event Based Functionality... \n`);
    if (f == 100 - 1) {
      console.log("file created successfully !!!");
      eventEmitter.emit("read-file");
    }
  }

  //triggering file reading
};

// Binding the create file event with create handler
eventEmitter.on("create-file", createFileHandler);

const readFileHandler = function readFile() {
  console.log("file reading begins...");
  let fileData = fs.readFileSync("abc.txt");
  console.log("fileData ==>", fileData.toString());
  console.log("file read successfully !!!");
  //triggering file deletion
  eventEmitter.emit("delete-file");
};

// Binding the read file event with read handler
eventEmitter.on("read-file", readFileHandler);

const deleteFileHandler = function deleteFile() {
  console.log("file deletion begins...");
  fs.unlinkSync("abc.txt");
  console.log("file has been deleted successfully!!!!");
};

// Binding the delete file event with delete handler
eventEmitter.on("delete-file", deleteFileHandler);

//triggering file creation
eventEmitter.emit("create-file");
