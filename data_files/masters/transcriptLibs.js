var fs = require("fs");

const { openFilePromis, openTextFilePromise } = require("./filelibs.js");
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

const readTranscriptAndReturnFullSentences = (data) => {
  let sentences_start_ends = [];

  let new_data_array = data.split("\n");
  let filtered = new_data_array.filter((element) => element !== "");
  filtered = filtered.filter((sentence) => sentence !== "\r");
  let just_text = [];

  let speakers_text_combined = [];

  filtered.forEach((element, i) => {
    let split_speaker_and_text = element.split(": ");
    let speaker = split_speaker_and_text[0];
    let text = split_speaker_and_text[1];

    if (split_speaker_and_text.length === 1) {
      let cells_before = filtered.slice(0, i);

      cells_before.reverse();

      let speaker_present_from_prev = cells_before.find((cell) => {
        let internal_speaker = cell.split(": ");
        if (internal_speaker.length > 1) {
          return true;
        }
      });
      let text = split_speaker_and_text[0];

      speaker = speaker_present_from_prev.split(": ")[0];

      speakers_text_combined.push({ speaker, text });

      just_text.push(text);
    } else {
      // this is the standard case, where the sentence is split bny a ":" one time, delineating a speaker on the keft side and the text on the right side of the delinator
      let text = split_speaker_and_text[1];

      just_text.push(text);
      speakers_text_combined.push({ speaker, text });
    }
  });

  return { just_text, speakers_text_combined };
};

const translateShopifyTextSpeakersAndTextPromise = async (
  full_sentences,
  language,
  filePrepend
) => {
  myPromise = new Promise((resolve, reject) => {
    try {
      const text = full_sentences.just_text.slice(0, 100);
      //const target = "fr";
      const target = language;
      let passes = Math.round(full_sentences.just_text.length / 100);

      let sentences_and_translations = [];
      let combined_speakers_and_translations = [];

      let blobs = [];
      for (i = 0; i <= passes; i++) {
        let lower_limit = i * 100;
        let upper_limit = lower_limit + 100;
        blobs.push(full_sentences.just_text.slice(lower_limit, upper_limit));
      }

      let speaker_blobs = [];
      for (i = 0; i <= passes; i++) {
        let lower_limit = i * 100;
        let upper_limit = lower_limit + 100;
        speaker_blobs.push(
          full_sentences.speakers_text_combined.slice(lower_limit, upper_limit)
        );
      }

      let blob_file_string = "blobs.json";

      fs.writeFile(blob_file_string, JSON.stringify(blobs), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(blob_file_string + " was saved!");
      });

      fs.writeFile(
        "speaker_blobs.json",
        JSON.stringify(speaker_blobs),
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("speaker_blobs.json " + " was saved!");
        }
      );

      blobs.forEach(async (blob, i) => {
        const sentences_and_translations_result = await translateJustOneArray(
          blob,
          target
        );
        let speaker_blob = speaker_blobs[i];
        sentences_and_translations_result.forEach((result, ii) => {
          let speaker = speaker_blob[ii].speaker;
          let text_local = result.text_local;
          let translation = result.translation;
          let iteration = ii + i * 100;
          combined_speakers_and_translations.push({
            speaker,
            text_local,
            translation,
            i,
            ii,
            iteration,
          });
        });
        sentences_and_translations = sentences_and_translations.concat(
          sentences_and_translations_result
        );
        if (
          combined_speakers_and_translations.length ===
          full_sentences.just_text.length
        ) {
          let filename_language_string =
            filePrepend +
            "sentences_and_translations_shopify_" +
            language +
            ".json";
          fs.writeFile(
            filename_language_string,
            JSON.stringify(sentences_and_translations),
            function (err) {
              if (err) {
                return console.log(err);
              }
              console.log(filename_language_string + " was saved!");
            }
          );
          let filename_language_string2 =
            filePrepend +
            "combined_speakers_and_translations" +
            language +
            ".json";
          fs.writeFile(
            filename_language_string2,
            JSON.stringify(combined_speakers_and_translations),
            function (err) {
              if (err) {
                return console.log(err);
              }
              console.log(filename_language_string2 + " was saved!");
            }
          );
          return combined_speakers_and_translations;
        }
      });
      resolve({
        sentences_and_translations,
        combined_speakers_and_translations,
      });
    } catch (err) {
      reject(err);
    }
  });
  return myPromise;
};

const translateShopifyTextSpeakersAndText = async (
  full_sentences,
  language,
  filePrepend
) => {
  try {
    const text = full_sentences.just_text.slice(0, 100);
    //const target = "fr";
    const target = language;
    let passes = Math.round(full_sentences.just_text.length / 100);

    let sentences_and_translations = [];
    let combined_speakers_and_translations = [];

    let blobs = [];
    for (i = 0; i <= passes; i++) {
      let lower_limit = i * 100;
      let upper_limit = lower_limit + 100;
      blobs.push(full_sentences.just_text.slice(lower_limit, upper_limit));
    }

    let speaker_blobs = [];
    for (i = 0; i <= passes; i++) {
      let lower_limit = i * 100;
      let upper_limit = lower_limit + 100;
      speaker_blobs.push(
        full_sentences.speakers_text_combined.slice(lower_limit, upper_limit)
      );
    }

    let blob_file_string = "blobs.json";

    fs.writeFile(blob_file_string, JSON.stringify(blobs), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(blob_file_string + " was saved!");
    });

    fs.writeFile("speaker_blobs.json", JSON.stringify(speaker_blobs), function (
      err
    ) {
      if (err) {
        return console.log(err);
      }
      console.log("speaker_blobs.json " + " was saved!");
    });

    blobs.forEach(async (blob, i) => {
      const sentences_and_translations_result = await translateJustOneArray(
        blob,
        target
      );
      let speaker_blob = speaker_blobs[i];
      sentences_and_translations_result.forEach((result, ii) => {
        let speaker = speaker_blob[ii].speaker;
        let text_local = result.text_local;
        let translation = result.translation;
        let iteration = ii + i * 100;
        combined_speakers_and_translations.push({
          speaker,
          text_local,
          translation,
          i,
          ii,
          iteration,
        });
      });
      sentences_and_translations = sentences_and_translations.concat(
        sentences_and_translations_result
      );
      if (
        combined_speakers_and_translations.length ===
        full_sentences.just_text.length
      ) {
        let filename_language_string =
          filePrepend + "_sentences_and_translations_" + language + ".json";
        fs.writeFile(
          filename_language_string,
          JSON.stringify(sentences_and_translations),
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log(filename_language_string + " was saved!");
          }
        );
        let filename_language_string2 =
          filePrepend +
          "_combined_speakers_and_translations_" +
          language +
          ".json";
        fs.writeFile(
          filename_language_string2,
          JSON.stringify(combined_speakers_and_translations),
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log(filename_language_string2 + " was saved!");
          }
        );
        return combined_speakers_and_translations;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const translateJustOneArray = async (text, target) => {
  let local_sentences_and_translations = [];
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  // console.log("Translations:");
  translations.forEach((translation, i) => {
    let text_local = text[i];
    local_sentences_and_translations.push({ text_local, translation });
    // console.log(`${text[i]} => (${target}) ${translation}`);
  });
  return local_sentences_and_translations;
};

const createTranslationsSpeakersAndText = async (
  transcriptFileName,
  filePrepend,
  language
) => {
  // const data = await openFilePromise("align.json");
  // let align_JSON = JSON.parse(data);
  // let export_array = returnAudacityLabels(align_JSON);
  const text_file_data = await openTextFilePromise(transcriptFileName);

  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  let filename_language_string =
    filePrepend + "_full_sentences_good" + "_" + language + "_" + ".json";

  fs.writeFile(
    filename_language_string,
    JSON.stringify(full_sentences),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(filename_language_string + " was saved!");
    }
  );
  // translateShopifyText(full_sentences.just_text, "fr", "healthish_v3_");

  console.log("dave");

  translateShopifyTextSpeakersAndText(full_sentences, language, filePrepend);

  return true;
};

const createTranslationsSpeakersAndText2 = async (
  transcriptFileName,
  filePrepend,
  language
) => {
  // const data = await openFilePromise("align.json");
  // let align_JSON = JSON.parse(data);
  // let export_array = returnAudacityLabels(align_JSON);
  const text_file_data = await openTextFilePromise(transcriptFileName);

  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  let filename_language_string =
    filePrepend + "_full_sentences_good" + "_" + language + "_" + ".json";

  fs.writeFile(
    filename_language_string,
    JSON.stringify(full_sentences),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(filename_language_string + " was saved!");
    }
  );
  // translateShopifyText(full_sentences.just_text, "fr", "healthish_v3_");

  console.log("dave");

  let results = translateShopifyTextSpeakersAndTextPromise(
    full_sentences,
    language,
    filePrepend
  );

  return results;
};

const test = () => {
  console.log("tyest");
};

module.exports = {
  test,
  createTranslationsSpeakersAndText,
  createTranslationsSpeakersAndText2,
};
// ------
