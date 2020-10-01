var fs = require("fs");

const openFilePromise = (filename) => {
  myPromise = new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return myPromise;
};

const openTextFilePromise = (filename) => {
  myPromise = new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return myPromise;
};

const writeDataViewPromise = (filename, dataView, directory) => {
  myPromise = new Promise((resolve, reject) => {
    let file_to_write = "./" + directory + "/" + filename;
    fs.writeFile(file_to_write, dataView, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(fs);

      resolve(true);
    });
  });
  return myPromise;
};

module.exports = {
  openFilePromise,
  openTextFilePromise,
  writeDataViewPromise,
};
