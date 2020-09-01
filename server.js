"use strict";

var express = require("express");
var app = express();
var cors = require("cors");

const bodyParser = require("body-parser");
let url = require("url");
const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
const data = require("./data");

const returnTranslations = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const get_translations = await openFilePromise("sorted_combined.json");

  let translations = JSON.parse(get_translations);
  return res.json({
    translations,
  });
};
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello Woddddddddrld");
});

app.get("/translations", returnTranslations);

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
