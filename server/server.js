"use strict";

var express = require("express");
var app = express();
var cors = require("cors");
var https = require("https");
var fs = require("fs");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const convert = require("xml-js");
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URI = process.env.MONGO_URI;

let url = require("url");
const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
const data = require("./data");

const searchForPodcasts = async (req, response) => {
  const { search_term } = req.params;

  const search_url = `https://itunes.apple.com/search?media=podcast&term=${search_term}`;

  fetch(search_url)
    .then((res) => res.json())
    .then((json) => {
      return response.json({
        json,
      });
    })
    .catch((error) => {
      console.log(error);

      return response.json({
        error,
      });
    });
};

const getTopPodcastsFromItunes = async (req, response) => {
  const apiUrl =
    "https://rss.itunes.apple.com/api/v1/ca/podcasts/top-podcasts/all/25/explicit.json";
  fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => {
      return response.json({
        json,
      });
    })
    .catch((error) => {
      console.log(error);

      return response.json({
        error,
      });
    });

  // let english_text = JSON.parse(get_english);
  // return res.json({
  //   english_text,
  // });
};

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

const returnCombined = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const get_translations = await openFilePromise(
    "translations_with_aligned_timing.json"
  );

  let translations = JSON.parse(get_translations);
  return res.json({
    translations,
  });
};

const returnCombined2 = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const get_translations = await openFilePromise(
    "healthish__translations_with_aligned_timing.json"
  );

  let translations = JSON.parse(get_translations);
  return res.json({
    translations,
  });
};

const returnCombined3 = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const get_translations = await openFilePromise(
    "healthish_V2__translations_with_aligned_timing.json"
  );

  let translations = JSON.parse(get_translations);
  return res.json({
    translations,
  });
};

const returnMP3Translationrecords = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const records_data = await openFilePromise("records.json");

  let records = JSON.parse(records_data);
  return res.json({
    records,
  });
};

const returnMP3Translationrecords2 = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const records_data = await openFilePromise("records_new_2.json");

  let records = JSON.parse(records_data);
  return res.json({
    records,
  });
};

const returnMP3Translationrecords3 = async (req, res) => {
  //   const allFlights = Object.keys(flights);
  const records_data = await openFilePromise("healthish_v3_records.json");

  let records = JSON.parse(records_data);
  return res.json({
    records,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.params;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "NOPE.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    return res.json({ payload, userid });
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
};

const verifyTokenAndSlapItIntoDatabase = async (req, res) => {
  const { token } = req.params;

  console.log(MONGO_URI);
  console.log(token);
  let oneUpdated, userid, payload, db, mongoClient;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_AUTH, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    payload = ticket.getPayload();
    userid = payload["sub"];
    console.info(payload);

    options = { ...options, upsert: true };
    mongoClient = await MongoClient(MONGO_URI, options);
    await mongoClient.connect();
    db = mongoClient.db("users");

    oneUpdated = await db
      .collection("user_records")
      .updateOne({ _id: userid }, { $set: { payload: payload } });
    // console.info(oneUpdated);
    mongoClient.close();

    return res.status(200).json({
      oneUpdated,
      userid,
      payload,
    });
  } catch (err) {
    console.error(err);
    mongoClient.close();
    let errorMessage = Error(err);
    console.log(errorMessage.message);

    return res.status(404).json({
      oneUpdated,
      userid,
      payload,
      error: { name: errorMessage.name, message: errorMessage.message },
    });
  } finally {
    client.close();
  }
};

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello Woddddddddrld0011");
});

app.get("/englishText", returnEnglishText);
app.get("/translatedText", returnTraslatedText);
app.get("/returnCombined", returnCombined);
app.get("/returnCombined2", returnCombined2);
app.get("/returnCombined3", returnCombined3);

app.get("/returntranslationrecords", returnMP3Translationrecords);
app.get("/returntranslationrecords2", returnMP3Translationrecords2);
app.get("/returntranslationrecords3", returnMP3Translationrecords3);

app.get("/verifyToken/:token", verifyToken);
app.get(
  "/verifyTokenAndSlapItIntoDatabase/:token",
  verifyTokenAndSlapItIntoDatabase
);
app.get("/searchForPodcasts/:search_term", searchForPodcasts);

app.get("/getTopPodcastsFromItunes", getTopPodcastsFromItunes);

app.post("/getEpisodes", jsonParser, function (req, res) {
  console.log(req.body.url);

  let dataAsJson = {};

  fetch(req.body.url)
    .then((response) => response.text())
    .then((str) => {
      dataAsJson = JSON.parse(convert.xml2json(str));
    })
    .then(() => {
      return res.json({
        dataAsJson,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        error,
      });
    });
});

https
  .createServer(
    {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/www.justheard.ca/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/www.justheard.ca/fullchain.pem"
      ),
    },
    app
  )
  .listen(8000, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:8000/"
    );
  });
