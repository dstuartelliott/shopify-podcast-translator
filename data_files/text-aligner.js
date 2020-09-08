const { openFilePromise, openTextFilePromise } = require("./filelibs.js");
const { v4: uuidv4 } = require("uuid");

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

const alignGentleResultsWithTranscript = async (
  aligned_results_filename,
  transcript_filename,
  combined_speakers_and_translations_filename,
  filePrepend
) => {
  const get_aligned_results = await openFilePromise("align-not-strict.json");
  let aligned_results = JSON.parse(get_aligned_results);

  const text_file_data = await openTextFilePromise(
    "Shopify_Master_s__Healthish_Transcript.txt"
  );

  let full_sentences = readTranscriptAndReturnFullSentences(text_file_data);

  let aligned_transcripts_objs = [];
  let not_aligned_yet = [];

  let lower_cased_transcript_from_alinged = aligned_results.transcript.toLowerCase();

  let transcript_from_alinged = aligned_results.transcript.toLowerCase();

  let pulled_out = [];
  full_sentences.just_text_filtered.forEach((sentence, i) => {
    // is there only one instance of these three words?

    let words = sentence.split(" ");

    if (words.length < 5) {
      return;
    }

    let first = words[0].toLowerCase();
    let second = words[1].toLowerCase();
    let third = words[2].toLowerCase();
    let fourth = words[3].toLowerCase();
    let fifth = words[4].toLowerCase();

    let small_sentence =
      first + " " + second + " " + third + " " + fourth + " " + fifth;

    let occurences_of_small_sent_in_transcript = lower_cased_transcript_from_alinged.split(
      small_sentence
    );

    if (occurences_of_small_sent_in_transcript.length === 2) {
      // only one instance
      // let's find these words in the aligned results
      //   console.log("only one instance");

      aligned_results.words.forEach((word, word_i) => {
        let aligned_slice = aligned_results.words.slice(word_i, word_i + 5);
        let aligned_string = "";
        aligned_slice.forEach((slice) => {
          aligned_string = aligned_string + slice.alignedWord + " ";
        });
        let new_aligned_string = aligned_string.slice(
          0,
          aligned_string.length - 1
        );
        // console.log(new_aligned_string);
        // console.log(small_sentence);

        let chars_removed_aligned_string = aligned_string
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, "");

        let chars_removed_small_sentence = small_sentence
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, "");
        // console.log(chars_removed_aligned_string);
        // console.log(chars_removed_small_sentence);

        if (chars_removed_aligned_string === chars_removed_small_sentence) {
          // console.log("matched");

          aligned_transcripts_objs.push({
            just_text_filtered: i,
            sentence: sentence,
            first_align_word: word,
            word_i: word_i,
          });
          pulled_out.push(i);
          // console.log("matched");
        }
      });

      return;
    }
  });

  //TODO: go through not_aligned_yet and take care of stragglers, for now just correct by hand

  // now that we have the first round done with only single occurences, let's see if we can do a quick look in the remaining spaces

  let still_to_be_done = [];
  full_sentences.just_text_filtered.forEach((element, i) => {
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
  full_sentences.just_text_filtered.forEach((element, i) => {
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
  full_sentences.just_text_filtered.forEach((element, i) => {
    if (!indexes_done_after_two_passes.includes(i)) {
      remaining_sents_after_two_passes.push({ element, i });
    }
  });

  const translations_and_english_data = await openFilePromise(
    "combined_speakers_and_translations.json"
  );
  let translations_and_english = JSON.parse(translations_and_english_data);

  let translations_with_aligned_timing = [];

  translations_and_english.forEach((element, i) => {
    let from_sorted_combined = sorted_combined.filter(
      (se) => se.still_to_be_done_element.sentence === element.text_local
    );

    if (from_sorted_combined.length > 0) {
      let from_sorted = from_sorted_combined[0];
      let speaker = element.speaker;
      let translation = element.translation;
      translations_with_aligned_timing.push({
        speaker: speaker,
        english: from_sorted.still_to_be_done_element.sentence,
        translation: translation,
        words: from_sorted.aligned_words_matching,
        full_sentences_i:
          from_sorted.still_to_be_done_element
            .full_sentences_just_text_filtered_i,
        uuid: uuidv4(),
      });
    }
  });

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
      console.log("sorted_combined.json was saved!");
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
  "align_pure_chimp.json",
  "Pure_Chimp_Transcript.txt",
  "pure_chimp_combined_speakers_and_translations.json",
  "pure_chimp_"
);

//alignGentleResultsWithTranscript();
