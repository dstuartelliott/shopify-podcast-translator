const { v4: uuidv4 } = require("uuid");
//export GOOGLE_APPLICATION_CREDENTIALS="/Users/davidelliott/Desktop/shopify/aligner/Lister-ba5f9edd11af.json"
const textToSpeech = require("@google-cloud/text-to-speech");
const { openFilePromise } = require("./filelibs.js");

// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

let records = [];

async function translateSingleSentence(text, voice, i, sentence, filePrepend) {
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
  const filename = i + "__" + name + "_" + uuid + "_" + filePrepend + ".mp3";

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename, response.audioContent, "binary");

  console.log("Audio content written to file: " + filename);

  records.push({ filename, text, sentence });

  let records_filename = filePrepend + "_records.json";

  fs.writeFile(records_filename, JSON.stringify(records), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("recods.json was saved!");
  });

  return filename;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateEachSentence(fileName, filePrepend) {
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
      sentence,
      filePrepend
    );

    console.log(i);

    console.log(result);
  });
  //   console.log(cut);

  console.log("done all");
}

// translateEachSentence(
//   "healthish_v3_combined_speakers_and_translationsfr.json",
//   "healthish_v3"
// );

const translateEachSentenceFromTranslationsDoc = async (
  fileName,
  filePrepend,
  speakers
) => {
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

    let speaker_selected = speakers.speakers.filter((spe) =>
      sentence.speaker.includes(spe.Name)
    );

    if (speaker_selected.length > 0) {
      voice = speaker_selected[0].voice;
    }

    // if (sentence.speaker.includes("Emily")) {
    //   voice = {
    //     languageCode: "fr-CA",
    //     ssmlGender: "FEMALE",
    //     name: "fr-CA-Wavenet-A",
    //   };
    // }
    // if (sentence.speaker.includes("Nathan")) {
    //   voice = {
    //     languageCode: "fr-CA",
    //     ssmlGender: "MALE",
    //     name: "fr-CA-Wavenet-B",
    //   };
    // }
    // if (sentence.speaker.includes("Felix")) {
    //   voice = {
    //     languageCode: "fr-CA",
    //     ssmlGender: "MALE",
    //     name: "fr-CA-Wavenet-D",
    //   };
    // }

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
      sentence,
      filePrepend
    );

    console.log(i);

    console.log(result);
  });
  //   console.log(cut);

  console.log("done all");
};

module.exports = {
  translateEachSentenceFromTranslationsDoc,
};
