const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
const { v4: uuidv4 } = require("uuid");

var fs = require("fs");
const { stringify } = require("querystring");

const alignGentleResultsWithTranscript = async (
  filePrepend,
  combine_json_filename,
  alingerFromGentleFileName,
  fullSentencesJSON
) => {
  const get_aligned_results = await openFilePromise(alingerFromGentleFileName);
  let aligned_results = JSON.parse(get_aligned_results);

  // const get_full_sentences_data = await openFilePromise(
  //   "pre_launch_full_sentences_good_fr_.json"
  // );

  const get_full_sentences_data = await openFilePromise(fullSentencesJSON);

  let full_sentences = JSON.parse(get_full_sentences_data);

  let still_to_be_done = [];
  full_sentences.just_text.forEach((element, i) => {
    // if (!pulled_out.includes(i)) {
    still_to_be_done.push({
      sentence: element,
      full_sentences_just_text_filtered_i: i,
    });
    // }
  });

  // this is more expensive search, so we only do it on sentences we couldn't find in the first cheap pass

  let found_alinged_from_still_to_be_done = [];

  let index_of_found_from_sentences = [];

  still_to_be_done.forEach((still_to_be_done_element, i) => {
    let sentence_cleaned = still_to_be_done_element.sentence
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ");

    sentence_cleaned = sentence_cleaned.slice(0, sentence_cleaned.length - 1);

    let sentence_array = sentence_cleaned.split(" ");

    let close_loop = false;
    aligned_results.words.forEach((aligned_result_word, aligned_i) => {
      if (close_loop) {
        return;
      }
      let matched_words = 0;
      let aligned_words_matching = [];
      // the length of the sentence array we are
      sentence_array.forEach((sentence_word, sent_i) => {
        if (aligned_i + sent_i > aligned_results.words.length - 1) {
          return;
        }

        let cleaned_aligned_word = aligned_results.words[
          aligned_i + sent_i
        ].word
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, " ");

        if (cleaned_aligned_word === sentence_word) {
          matched_words = matched_words + 1;
          let word = aligned_results.words[aligned_i + sent_i];
          let iterator = aligned_i + sent_i;
          aligned_words_matching.push({ word, iterator });
        }

        if (matched_words === sentence_array.length) {
          // console.log("matched");
          found_alinged_from_still_to_be_done.push({
            still_to_be_done_element,
            aligned_words_matching,
          });
          index_of_found_from_sentences.push(
            still_to_be_done_element.full_sentences_just_text_filtered_i
          );

          close_loop = true;
        }
      });
    });
  });

  let second_pass_combined = [];

  let not_done_on_first_pass = [];
  full_sentences.just_text.forEach((element, i) => {
    if (!index_of_found_from_sentences.includes(i)) {
      not_done_on_first_pass.push({
        sentence: element,
        full_sentences_just_text_filtered_i: i,
      });
    }
  });

  let done_on_second_pass = [];

  not_done_on_first_pass.forEach((element) => {
    // find the element before

    let sentence_cleaned = element.sentence
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ");

    if (sentence_cleaned.slice(0, 1) === " ") {
      sentence_cleaned = sentence_cleaned.slice(1, sentence_cleaned.length);
    }

    if (
      sentence_cleaned.slice(
        sentence_cleaned.length - 1,
        sentence_cleaned.length
      ) === " "
    ) {
      sentence_cleaned = sentence_cleaned.slice(0, sentence_cleaned.length - 1);
    }

    let sentence_cleaned_array = sentence_cleaned.split(" ");
    let before = found_alinged_from_still_to_be_done.filter((e) => {
      if (
        e.still_to_be_done_element.full_sentences_just_text_filtered_i ===
        element.full_sentences_just_text_filtered_i - 1
      ) {
        return true;
      }
    });

    let before_align_words_iterator = 0;

    if (before[0] !== undefined) {
      before_align_words_iterator =
        before[0].aligned_words_matching[0].iterator;
    }

    let after = found_alinged_from_still_to_be_done.filter((e) => {
      if (
        e.still_to_be_done_element.full_sentences_just_text_filtered_i ===
        element.full_sentences_just_text_filtered_i + 1
      ) {
        return true;
      }
    });

    let after_align_words_iterator = 0;

    if (after[0] !== undefined) {
      after_align_words_iterator = after[0].aligned_words_matching[0].iterator;
    }

    // ok now I have the narrow amount of words I need
    let align_narrowed = aligned_results.words.slice(
      before_align_words_iterator,
      after_align_words_iterator
    );

    align_narrowed.forEach((ae, i) => {
      // let's make a sentence
      let internal_cleaned = sentence_cleaned;
      if (i + sentence_cleaned_array.length > align_narrowed.length) {
        return;
      }
      let internal_sentence = align_narrowed.slice(
        i,
        i + sentence_cleaned_array.length
      );
      let internal_sentence_string = "";
      internal_sentence.forEach((is) => {
        internal_sentence_string = internal_sentence_string + " " + is.word;
      });

      internal_sentence_string = internal_sentence_string.slice(
        1,
        internal_sentence_string.length
      );

      internal_sentence_string = internal_sentence_string
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");

      if (sentence_cleaned.length > 19) {
        internal_sentence_string = internal_sentence_string.slice(0, 20);

        sentence_cleaned = sentence_cleaned.slice(0, 20);
      }

      if (internal_sentence_string === sentence_cleaned) {
        console.log("");

        done_on_second_pass.push({
          aligned_words_matching: internal_sentence,
          still_to_be_done_element: element,
        });
      }
    });

    console.log("");
  });

  let combined = [
    ...found_alinged_from_still_to_be_done,
    ...done_on_second_pass,
  ];

  let sorted_combined = combined.sort((a, b) => {
    a.still_to_be_done_element.full_sentences_just_text_filtered_i -
      b.still_to_be_done_element.full_sentences_just_text_filtered_i;
  });

  let indexes_done_after_two_passes = [];
  sorted_combined.forEach((element) => {
    indexes_done_after_two_passes.push(
      element.still_to_be_done_element.full_sentences_just_text_filtered_i
    );
  });

  let remaining_sents_after_two_passes = [];
  full_sentences.just_text.forEach((element, i) => {
    if (!indexes_done_after_two_passes.includes(i)) {
      remaining_sents_after_two_passes.push({ element, i });
    }
  });

  // ok let's tackle these remaining.  All we are looking for is the got it.
  // let remaining = remaining_sents_after_two_passes[0];
  // let remaining_element = remaining.element;
  // let remaining_element =
  //   "Got it. So when you were putting these mock-ups or prototypes out there to get feedback, how do you ask for it in a way that is going to get you the honest feedback and not just, people being nice?\r";

  // let remaining_split = remaining_element.split["Got"];

  let remaining_sents_and_aligned_word_candidates = [];

  remaining_sents_after_two_passes.forEach((remaining_sent, i) => {
    let new1 = remaining_sent.element.split(" ");
    let first_word_match = new1[0];
    let last_word_match = new1[new1.length - 1];

    last_word_match = last_word_match
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, "");

    let got_first_word = aligned_results.words.filter(
      (word_object) => word_object.word === first_word_match
    );

    let got_last_word = aligned_results.words.filter(
      (word_object) => word_object.word === last_word_match
    );

    remaining_sents_and_aligned_word_candidates.push({
      remaining_sent,
      got_first_word,
      got_last_word,
    });
  });

  // let new1 = remaining_sents_after_two_passes[0].element.split(" ");

  // let word_match = new1[0];

  // let got_word = aligned_results.words.filter(
  //   (word_object) => word_object.word === word_match
  // );

  const translations_and_english_data = await openFilePromise(
    combine_json_filename
  );
  let translations_and_english = JSON.parse(translations_and_english_data);

  let translations_with_aligned_timing = [];

  translations_and_english = translations_and_english.sort(
    (a, b) => a.iteration - b.iteration
  );

  sorted_combined = sorted_combined.sort(
    (a, b) =>
      a.still_to_be_done_element.full_sentences_just_text_filtered_i -
      b.still_to_be_done_element.full_sentences_just_text_filtered_i
  );

  translations_and_english.forEach((element, i) => {
    let from_sorted_combined = sorted_combined.filter(
      (se) => se.still_to_be_done_element.sentence === element.text_local
    );
    if (i === 31) {
      console.log("");
    }

    if (from_sorted_combined.length > 0) {
      let from_sorted = from_sorted_combined[0];
      let speaker = element.speaker;
      let translation = element.translation;
      let iteration = element.iteration;
      translations_with_aligned_timing.push({
        speaker: speaker,
        english: from_sorted.still_to_be_done_element.sentence,
        translation: translation,
        words: from_sorted.aligned_words_matching,
        full_sentences_i:
          from_sorted.still_to_be_done_element
            .full_sentences_just_text_filtered_i,
        uuid: uuidv4(),
        iteration,
      });
    } else {
      translations_with_aligned_timing.push("tbd");
    }
  });

  translations_with_aligned_timing.forEach((element, i) => {
    if (element === "tbd") {
      let prev = translations_with_aligned_timing[i - 1];
      let next = translations_with_aligned_timing[i + 1];

      let from_remaining = remaining_sents_and_aligned_word_candidates.filter(
        (el) => el.remaining_sent.i === i
      );

      let prev_words_offset_last_word = prev.words[prev.words.length - 1].word;

      let aligned_words_first_index = aligned_results.words.findIndex(
        (el) => el === prev_words_offset_last_word
      );

      let next_words_offset_first_word;

      if (
        i === translations_with_aligned_timing.length - 1 ||
        i === translations_with_aligned_timing.length - 2
      ) {
        next = combined[combined.length - 1];
        let next_words_offset_first_word = next.aligned_words_matching[0].word;
      } else {
        next_words_offset_first_word = next.words[0].word;
      }

      // console.log(typeof next_words_offset_first_word);
      if (
        typeof next_words_offset_first_word === `string` &&
        next_words_offset_first_word !== undefined
      ) {
        next_words_offset_first_word = next.words[0];
      }

      let aligned_words_last_index = aligned_results.words.findIndex(
        (el) => el === next_words_offset_first_word
      );

      if (i === translations_and_english.length - 1) {
        aligned_words_last_index = aligned_results.words.length - 1;
      }

      let found_aligned_words = aligned_results.words.slice(
        aligned_words_first_index,
        aligned_words_last_index
      );

      let translations_and_english_sentence = translations_and_english.find(
        (tr) => tr.iteration === i
      );

      let iteration = i;

      translations_with_aligned_timing.push({
        speaker: translations_and_english_sentence.speaker,
        english: translations_and_english_sentence.text_local,
        translation: translations_and_english_sentence.translation,
        words: found_aligned_words,
        full_sentences_i: i,
        uuid: uuidv4(),
        iteration,
      });
    }
  });

  translations_with_aligned_timing = translations_with_aligned_timing.filter(
    (tr) => tr !== "tbd"
  );

  translations_with_aligned_timing = translations_with_aligned_timing.sort(
    (a, b) => a.iteration - b.iteration
  );

  let filename_tranlations_with_aligned_timing =
    filePrepend + "_" + "translations_with_aligned_timing.json";

  fs.writeFile(
    filename_tranlations_with_aligned_timing,
    JSON.stringify(translations_with_aligned_timing),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(filename_tranlations_with_aligned_timing + "was saved!");
    }
  );
  let filename_sorted_combined_filename = filePrepend + "sorted_combined.json";

  fs.writeFile(
    filename_sorted_combined_filename,
    JSON.stringify(sorted_combined),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(filename_sorted_combined_filename + " was saved!");
    }
  );

  let remaining_sents_filename =
    filePrepend + "remaining_sents_after_two_passes.json";

  fs.writeFile(
    remaining_sents_filename,
    JSON.stringify(remaining_sents_after_two_passes),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("remaining_sents_after_two_passes.json was saved!");
    }
  );

  console.log(remaining_sents_after_two_passes);

  console.log("done");
};

alignGentleResultsWithTranscript(
  "pureChimp_",
  "pureChimpcombined_speakers_and_translationsfr.json",
  "alinger_data.json",
  "pureChimp_full_sentences_good_fr_.json"
);

//alignGentleResultsWithTranscript();
