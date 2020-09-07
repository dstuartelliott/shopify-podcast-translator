const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
var fs = require("fs");

function readTranscriptAndReturnFullSentences(data) {
  let sentences_start_ends = [];

  let new_data_array = data.split("\n");
  // console.log(new_data_array);
  let filtered = new_data_array.filter((element) => element !== "");
  //console.log(filtered);

  let speakers_and_text = [];
  let just_text = [];
  let speakers_only = [];
  filtered.forEach((element) => {
    let split_speaker_and_text = element.split(": ");
    speakers_and_text.push(element);
    just_text.push(split_speaker_and_text[split_speaker_and_text.length - 1]);
    speakers_only.push(split_speaker_and_text[0]);
  });

  // this is filtering I used from another transcript translation I did, leaving it in as comments because it's useful
  let just_text_filtered = just_text;
  // .filter((element) => !element.includes("SFX"))
  // .filter((element) => !element.includes("SCORING"))
  // .filter((element) => !element.includes("SCORE"))
  // .filter((element) => !element.includes("<CLIPS>"))
  // .filter((element) => !element.includes("<CLIP>"))
  // .filter((element) => !element.includes("SOUNDS"))
  // .filter((element) => !element.includes("MIDROLL"));

  // console.log("------");
  // console.log("------");
  // console.log("------");

  //let mapped = just_text_filtered.map(element => element.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g,""));

  /// .... YOU MAY NEED THIS - IT'S AN ARRAY OF ALL THE WORDS, BUT COMPARING EACH WORD WITH IT'S PREVIOUS
  // VERSION WITH NO PUNCTUATION STRIPPED OUT.
  let all_words = [];
  let all_words_no_special_chars = [];
  let all_words_no_carriage_returns_string = "";

  just_text_filtered.forEach((element) => {
    let words = element.split(" ");

    words.forEach((we) => {
      all_words.push(we);
      all_words_no_special_chars.push(
        we.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " )")
      );
      let no_rs = we.replace("\r", "");
      all_words_no_carriage_returns_string =
        all_words_no_carriage_returns_string + " " + no_rs;
    });
  });

  return {
    just_text_filtered,
    speakers_and_text,
    speakers_only,
    all_words_no_carriage_returns_string,
  };
}

const newShopifyChain = async () => {
  const text_file_data = await openTextFilePromise(
    "Shopify_Master_s__Healthish_Transcript.txt"
  );
  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  const get_translations = await openFilePromise(
    "sentences_and_translations_shopify.json"
  );

  let translations = JSON.parse(get_translations);

  // note that this only works because the sentence count exactly mathches in both the translated text and original text transcription.
  let combined_speakers_and_translations = [];
  translations.forEach((translation_obj, i) => {
    let new_translation_object = {
      speaker: full_sentences.speakers_only[i],
      ...translation_obj,
    };
    combined_speakers_and_translations.push(new_translation_object);
  });

  // we need this plain text, stripped out file for the gentle aligner
  fs.writeFile(
    "justwords.txt",
    JSON.stringify(full_sentences.all_words_no_carriage_returns_string),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("justwords.txt was saved!");
    }
  );

  fs.writeFile(
    "combined_speakers_and_translations.json",
    JSON.stringify(combined_speakers_and_translations),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("combined_speakers_and_translations.json was saved!");
    }
  );
  console.log("done");
};

const combineTranslatedAndOriginalIntoFinalDoc = async (
  transcriptFile,
  translationsFile,
  filePrepend
) => {
  const text_file_data = await openTextFilePromise(transcriptFile);
  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  const get_translations = await openFilePromise(translationsFile);

  let translations = JSON.parse(get_translations);

  // note that this only works because the sentence count exactly mathches in both the translated text and original text transcription.
  let combined_speakers_and_translations = [];
  translations.forEach((translation_obj, i) => {
    let new_translation_object = {
      speaker: full_sentences.speakers_only[i],
      ...translation_obj,
    };
    combined_speakers_and_translations.push(new_translation_object);
  });

  let just_words_filename = filePrepend + "justwords.txt";
  // we need this plain text, stripped out file for the gentle aligner
  fs.writeFile(
    just_words_filename,
    JSON.stringify(full_sentences.all_words_no_carriage_returns_string),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(just_words_filename + " was saved!");
    }
  );
  let combined_filename =
    filePrepend + "combined_speakers_and_translations.json";

  fs.writeFile(
    combined_filename,
    JSON.stringify(combined_speakers_and_translations),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(combined_filename + "was saved!");
    }
  );
  console.log("done");
};

const justProduceTextForGentleAlignerFromShopifyTranscript = async (
  filePath,
  filePrepend
) => {
  const text_file_data = await openTextFilePromise(filePath);
  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  let filename = filePrepend + "_justwords.txt";
  // we need this plain text, stripped out file for the gentle aligner
  fs.writeFile(
    filename,
    JSON.stringify(full_sentences.all_words_no_carriage_returns_string),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(filePrepend + "was saved!");
    }
  );

  console.log("done");
};

// so now we have the original text file and our translated json file, let's make one nice array.};

//newShopifyChain();

// justProduceTextForGentleAlignerFromShopifyTranscript(
//   "Pure_Chimp_Transcript.txt",
//   "Pure_Chimp"
// );

combineTranslatedAndOriginalIntoFinalDoc(
  "Pure_Chimp_Transcript.txt",
  "pure_chimpsentences_and_translations_shopify_fr.json",
  "pure_chimp_"
);
