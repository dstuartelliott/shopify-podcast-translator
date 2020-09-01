"use strict";

var express = require("express");
var app = express();
var cors = require("cors");

const bodyParser = require("body-parser");
let url = require("url");
const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
const data = require("./data");

const returnEnglishText = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const get_english = await openFilePromise("sorted_combined.json");

  let english_text = JSON.parse(get_english);
  return res.json({
    english_text,
  });
};

const returnTraslatedText = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const get_translations = await openFilePromise(
    "combined_speakers_and_translations.json"
  );

  let translations = JSON.parse(get_translations);
  return res.json({
    translations,
  });
};

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello Woddddddddrld");
});

app.get("/englishText", returnEnglishText);
app.get("/translatedText", returnTraslatedText);

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
