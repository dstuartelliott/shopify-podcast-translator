var fs = require("fs");

const openFilePromise = (filename) => {
  let myPromise = new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return myPromise;
};

module.exports = {
  openFilePromise,
};
