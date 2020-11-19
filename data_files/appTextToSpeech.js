const { v4: uuidv4 } = require("uuid");
//export GOOGLE_APPLICATION_CREDENTIALS="/Users/davidelliott/Desktop/shopify/aligner/Lister-ba5f9edd11af.json"
const textToSpeech = require("@google-cloud/text-to-speech");
const { openFilePromise } = require("./filelibs.js");

// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function listVoices() {
  // [START tts_list_voices]
  const textToSpeech = require("@google-cloud/text-to-speech");

  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({});
  const voices = result.voices;

  console.log("Voices:");
  voices.forEach((voice) => {
    console.log(`Name: ${voice.name}`);
    console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
    console.log(`  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
    console.log("  Supported languages:");
    voice.languageCodes.forEach((languageCode) => {
      console.log(`    ${languageCode}`);
    });
  });

  fs.writeFile("voices.json", JSON.stringify(voices), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("voices.json was saved!");
  });
}

// {
//     "languageCodes": ["fr-CA"],
//     "name": "fr-CA-Wavenet-A",
//     "ssmlGender": "FEMALE",
//     "naturalSampleRateHertz": 24000
//   },
//   {
//     "languageCodes": ["fr-CA"],
//     "name": "fr-CA-Wavenet-B",
//     "ssmlGender": "MALE",
//     "naturalSampleRateHertz": 24000
//   },
//   {
//     "languageCodes": ["fr-CA"],
//     "name": "fr-CA-Wavenet-C",
//     "ssmlGender": "FEMALE",
//     "naturalSampleRateHertz": 24000
//   },
//   {
//     "languageCodes": ["fr-CA"],
//     "name": "fr-CA-Wavenet-D",
//     "ssmlGender": "MALE",
//     "naturalSampleRateHertz": 24000
//   },

async function quickStart() {
  // The text to synthesize
  const text = "hello, world!";
  // Construct the request
  const request = {
    input: {
      text:
        "Aujourd'hui, je suis accompagné d'Emily et Nathan de Healthish. Healthish vend des produits de santé qui vous aident à vivre un style de vie sain. Il a commencé 2016 et est une entreprise à sept chiffres. Bienvenue Emily et Nathan",
    },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: "fr-CA",
      ssmlGender: "FEMALE",
      name: "fr-CA-Wavenet-A",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("fr-CA-Wavenet-A.mp3", response.audioContent, "binary");

  console.log("Audio content written to file: output.mp3");
  return "done";
}

let records = [];

async function translateSingleSentence(text, voice, i, sentence) {
  // The text to synthesize
  // Construct the request
  const request = {
    input: {
      text: text,
    },
    // Select the language and SSML voice gender (optional)
    voice: voice,
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  const uuid = uuidv4();

  const text_split = text.split(" ");
  const name = text_split[0];
  const filename = i + "__" + name + "_" + uuid + ".mp3";

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename, response.audioContent, "binary");

  console.log("Audio content written to file: " + filename);

  records.push({ filename, text, sentence });

  fs.writeFile("records.json", JSON.stringify(records), function (err) {
    if (err) {
      return console.log(err);
    }
    //   console.log("recods.json was saved!");
  });

  return filename;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateIndivSentence(fileName) {
  const sentences_data = await openFilePromise(fileName);

  let sentences = JSON.parse(sentences_data);

  let sorted = sentences.sort((a, b) => a.iteration - b.iteration);

  let with_speakers = [];

  console.log(sorted[33]);

  sorted.forEach((element, i) => {
    if (element.speaker === undefined) {
      // console.log("undefined");

      let prev_index = i - 1;
      let speaker = sorted[prev_index].speaker;
      // console.log({ ...element, speaker: speaker });
      with_speakers.push({ ...element, speaker: speaker });
    } else {
      with_speakers.push({ ...element });
    }
  });

  let prev_voice;

  with_speakers.forEach(async (sentence, i) => {
    console.log("-------------------------");

    console.log(sentence.speaker);
    let voice;
    if (sentence.speaker.includes("Emily")) {
      voice = {
        languageCode: "fr-CA",
        ssmlGender: "FEMALE",
        name: "fr-CA-Wavenet-A",
      };
    }
    if (sentence.speaker.includes("Nathan")) {
      voice = {
        languageCode: "fr-CA",
        ssmlGender: "MALE",
        name: "fr-CA-Wavenet-B",
      };
    }
    if (sentence.speaker.includes("Felix")) {
      voice = {
        languageCode: "fr-CA",
        ssmlGender: "MALE",
        name: "fr-CA-Wavenet-D",
      };
    }

    if (sentence.speaker.split(" ").length > 3) {
      voice = prev_voice;
    }

    prev_voice = voice;
    console.log(voice);

    await sleep(1000 * i);

    let result = await translateSingleSentence(
      sentence.translation,
      voice,
      i,
      sentence
    );

    console.log(i);

    console.log(result);
  });
  //   console.log(cut);

  console.log("done all");
}

async function lookAtRecords() {
  const records_data = await openFilePromise("./records.json");
  let records_json = JSON.parse(records_data);
  console.log(records_json[0]);

  let cleaned = [];
  records_json.forEach((element) => {
    cleaned.push({ ...element, response: "" });
  });
  console.log(cleaned[0]);

  fs.writeFile("records_cleaned.json", JSON.stringify(cleaned), function (err) {
    if (err) {
      return console.log(err);
    }
    //   console.log("recods.json was saved!");
  });
}

async function test() {
  const sentences_data = await openFilePromise(
    "pre_launchcombined_speakers_and_translationsfr.json"
  );
  let sentences = JSON.parse(sentences_data);

  let sorted = sentences.sort((a, b) => a.iteration - b.iteration);

  let with_speakers = [];

  console.log(sorted[33]);
  sorted.forEach((element, i) => {
    if (element.speaker === undefined) {
      // console.log("undefined");

      let prev_index = i - 1;
      let speaker = sorted[prev_index].speaker;
      // console.log({ ...element, speaker: speaker });
      with_speakers.push({ ...element, speaker: speaker });
    } else {
      with_speakers.push({ ...element });
    }
  });

  console.log(with_speakers);

  console.log("Dave");
}

// test();
translateIndivSentence(
  "healthish_v3_combined_speakers_and_translationsfr.json"
);

// lookAtRecords();
