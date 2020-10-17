"use strict";

var express = require("express");
var app = express();
var cors = require("cors");

const bodyParser = require("body-parser");
let url = require("url");
const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
const data = require("./data");
const { OAuth2Client } = require("google-auth-library");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const GOOGLE_AUTH = process.env.GOOGLE_AUTH;

const client = new OAuth2Client(GOOGLE_AUTH);

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const fetch = require("node-fetch");

const returnEnglishText = async (req, res) => {
  const { googleAuth } = req.body;

  console.info(googleAuth);
  console.info(MONGO_URI);
  try {
    client = await MongoClient(MONGO_URI, options);
    await client.connect();
    db = client.db("users");

    let oneUpdated = await db
      .collection("user_records")
      .updateOne(
        { _id: googleAuth.userid },
        { $set: { payload: googleAuth.payload } }
      );

    console.info(oneUpdated);

    return res.status(200).json({
      oneUpdated: oneUpdated,
      googleAuth: googleAuth,
    });
  } catch (err) {
    console.error(err);

    return res.status(404).json({
      err,
    });
  } finally {
    client.close();
  }
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

const verifyToken = async (req, res) => {
  const { token } = req.params;

  console.log(token);
  console.log(client);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_AUTH, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    res.json({ payload, userid });
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
};

const verifyTokenAndSlapItIntoDatabase = async (req, res) => {
  const { token } = req.params;

  // console.log(MONGO_URI);
  // console.log(token);
  let oneUpdated, userid, payload, db, mongoClient;

  // async function verify() {
  //   const ticket = await client.verifyIdToken({
  //     idToken: token,
  //     audience:
  //       "112704103478-ql4ienro46scf14gfqaekttb0e0qg7ih.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
  //     // Or, if multiple clients access the backend:
  //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  //   });
  //   payload = ticket.getPayload();
  //   userid = payload["sub"];
  //   return { payload, userid };
  //   // If request specified a G Suite domain:
  //   // const domain = payload['hd'];
  // }
  // let googleAuth = verify().catch(console.error);

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
    // client.close();
  }
};

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello Woddddddddrld");
});

app.get("/englishText", returnEnglishText);
app.get("/translatedText", returnTraslatedText);
app.get("/returnCombined", returnCombined);
app.get("/verifyToken/:token", verifyToken);
app.get(
  "/verifyTokenAndSlapItIntoDatabase/:token",
  verifyTokenAndSlapItIntoDatabase
);

let server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
