var fs = require("fs");
const { openFilePromis, openTextFilePromise } = require("./filelibs.js");
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

function readTranscriptAndReturnFullSentences(data) {
  let sentences_start_ends = [];

  let new_data_array = data.split("\n");
  // console.log(new_data_array);
  let filtered = new_data_array.filter((element) => element !== "");
  //console.log(filtered);

  let just_text = [];

  let speakers_text_combined = [];

  filtered.forEach((element, i) => {
    let split_speaker_and_text = element.split(": ");
    let speaker = split_speaker_and_text[0];
    let text = split_speaker_and_text[1];

    if (split_speaker_and_text.length === 1) {
      console.log("pause");

      let prev_speaker = speakers_text_combined[i - 1].speaker;
      let text = split_speaker_and_text[0];
      speakers_text_combined.push({ prev_speaker, text });

      just_text.push(text);
    } else {
      let text = split_speaker_and_text[1];

      just_text.push(text);
      speakers_text_combined.push({ speaker, text });
    }
  });

  //   let all_words = [];
  //   let all_words_no_special_chars = [];

  //   just_text.forEach((element) => {
  //     let words = element.split(" ");

  //     words.forEach((we) => {
  //       all_words.push(we);
  //       all_words_no_special_chars.push(
  //         we.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " )")
  //       );
  //     });
  //   });

  return { just_text, speakers_text_combined };
}

async function translateShopifyTextSpeakersAndText(
  full_sentences,
  language,
  filePrepend
) {
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

    blobs.forEach(async (blob, i) => {
      console.log(blob);
      console.log(blob);

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

    // console.log(sentences_and_translations[0]);
    // console.log(combined_speakers_and_translations[0]);
  } catch (err) {
    console.log(err);
  }
}

async function translateJustOneArray(text, target) {
  let local_sentences_and_translations = [];
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation, i) => {
    let text_local = text[i];
    local_sentences_and_translations.push({ text_local, translation });
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
  return local_sentences_and_translations;
}

const newShopifyChain = async () => {
  // const data = await openFilePromise("align.json");
  // let align_JSON = JSON.parse(data);
  // let export_array = returnAudacityLabels(align_JSON);
  const text_file_data = await openTextFilePromise(
    "Shopify_Master_s__Healthish_Transcript.txt"
  );

  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  let filename_language_string =
    "pre_launch_" + "full_sentences_good" + "_fr_" + ".json";

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
  //translateShopifyText(full_sentences.just_text, "fr", "pre_launch");

  translateShopifyTextSpeakersAndText(full_sentences, "fr", "pre_launch");
};

newShopifyChain();
