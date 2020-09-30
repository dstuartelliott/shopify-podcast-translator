const { createTranslationsSpeakersAndText2 } = require("./transcriptLibs.js");
const {
  translateEachSentenceFromTranslationsDoc,
} = require("./translationsToMP3s.js");

//export GOOGLE_APPLICATION_CREDENTIALS="/Users/davidelliott/Desktop/shopify/aligner/Lister-ba5f9edd11af.json"

const createSpeakersFromTranscriptAndTranslateResults = async () => {
  try {
    const results = await createTranslationsSpeakersAndText2(
      "Pure_Chimp_Transcript.txt",
      "pureChimp",
      "fr"
    );
    console.log("done!");

    console.log(results);
  } catch (err) {
    console.log(err);
  }

  // const data = await openFilePromise("align.json");
  // let align_JSON = JSON.parse(data);
  // let export_array = returnAudacityLabels(align_JSON);
};

// createSpeakersFromTranscriptAndTranslateResults();
translateEachSentenceFromTranslationsDoc(
  "pureChimpcombined_speakers_and_translationsfr.json",
  "pureChimp",
  {
    speakers: [
      {
        Name: "Felix",
        voice: {
          languageCode: "fr-CA",
          ssmlGender: "MALE",
          name: "fr-CA-Wavenet-D",
        },
      },
      {
        Name: "Dean",
        voice: {
          languageCode: "fr-CA",
          ssmlGender: "MALE",
          name: "fr-CA-Wavenet-B",
        },
      },
    ],
  }
);

healthish_V2__translations_with_aligned_timing.json;
healthish_v3_records.json;
