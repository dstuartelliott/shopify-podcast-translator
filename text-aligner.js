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

const alignGentleResultsWithTranscript = async () => {
  const get_aligned_results = await openFilePromise("align.json");
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

  fs.writeFile(
    "aligned_transcripts_objs.json",
    JSON.stringify(aligned_transcripts_objs),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("aligned_transcripts_objs.json was saved!");
    }
  );

  fs.writeFile(
    "not_aligned_yet.json",
    JSON.stringify(not_aligned_yet),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("not_aligned_yet.json was saved!");
    }
  );
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
        done_on_second_pass.push({ element, internal_sentence });
      }
    });

    console.log("");
  });

  // on, now from the "not done on first pass" array, find the array_align to search in.

  aligned_transcripts_objs.forEach((aligned, i) => {
    if (
      aligned_transcripts_objs[i + 1].just_text_filtered >
      aligned.just_text_filtered + 1
    ) {
      let aligned_word_lower = aligned.word_i;
      let aligned_word_upper = aligned_transcripts_objs[i + 1].word_i;

      let aligned_sliced = aligned_results.words.slice(
        aligned_word_lower,
        aligned_word_upper
      );
      let words_from_trans_from_align = "";

      aligned_sliced.forEach((element) => {
        words_from_trans_from_align =
          words_from_trans_from_align + " " + element.word;
      });
      console.log("");
      let from_just_text_but_not_included = [];
      full_sentences.just_text_filtered.forEach((element, ii) => {
        if (
          ii > aligned.just_text_filtered &&
          ii < aligned_transcripts_objs[i + 1].just_text_filtered
        ) {
          from_just_text_but_not_included.push({
            just_text_filtered: ii,
            element: element,
          });
        }
      });

      // now let's go through the just_text_filters we haven't aligned yet and see if they occur only once in our sliced subset of the aligned_results
      from_just_text_but_not_included.forEach((element) => {
        let cleaned_element = element.element
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, " ");

        let occurences = words_from_trans_from_align.split(cleaned_element);

        if (cleaned_element.slice(-1) === " ") {
          cleaned_element = cleaned_element.slice(
            0,
            cleaned_element.length - 1
          );
        }

        if (occurences.length === 2) {
          let words = cleaned_element.split(" ");

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

          console.log(occurences);

          aligned_results.words.forEach((word, word_i) => {
            let aligned_slice = aligned_results.words.slice(word_i, word_i + 5);
            let aligned_string = "";
            aligned_slice.forEach((slice, i) => {
              if (i !== aligned_slice.length - 1)
                aligned_string = aligned_string + slice.word + " ";
              else if (i === aligned_slice.length - 1) {
                aligned_string = aligned_string + slice.word;
              }
            });

            if (aligned_string === cleaned_element) {
              console.log(occurences);
              console.log(occurences);
            }
          });
        }
      });

      console.log(from_not_aligned_inside_our_range);
      console.log("");
    }
  });

  //   not_aligned_yet.forEach((not_yet) => {
  //     let closest_below = 0;
  //     let closest_above = 0;
  //     let above_difference = 100;

  //     // find the surrounding succesful sentences
  //     aligned_transcripts_objs.forEach((aligned, i) => {
  //       if (aligned.just_text_filtered < not_yet.just_text_filtered) {
  //         closest_below = i;
  //       }

  //       if (aligned.just_text_filtered > not_yet.just_text_filtered) {
  //         let new_difference =
  //           aligned.just_text_filtered - not_yet.just_text_filtered;

  //         if (new_difference < above_difference) {
  //           above_difference = new_difference;
  //           closest_above = aligned.just_text_filtered;
  //         }
  //       }
  //     });
  //     console.log("");
  //   });

  console.log("done");
};
alignGentleResultsWithTranscript();
