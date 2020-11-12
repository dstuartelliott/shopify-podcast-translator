import React, { createContext } from "react";
import { useDispatch } from "react-redux";

import { addTranscript, addUUIDSandTimes } from "./actions";

export const PlayerContext = createContext();
export const PlayerContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getCombined3 = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl = "https://www.justheard.ca:8000/returnCombined3";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getCombined3FomLinodeBucket = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl =
        "https://us-east-1.linodeobjects.com/podcast-files/third/healthish_V2__translations_with_aligned_timing.json";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getCombined3FomLinodeBucketPureChimp = () => {
    let myPromise = new Promise((resolve, reject) => {
      const apiUrl =
        "https://us-east-1.linodeobjects.com/podcast-files/pureChimp/pureChimp__translations_with_aligned_timing.json";
      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getTranslatedMP3s3 = async () => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";
      const apiUrl =
        "https://us-east-1.linodeobjects.com/podcast-files/third/healthish_v3_records.json";

      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;

          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getTranslatedMP3sPureChimp = async () => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";
      const apiUrl =
        " https://us-east-1.linodeobjects.com/podcast-files/pureChimp/pureChimp_records.json";

      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;

          resolve(data);
        })
        .catch((error) => {
          resolve({ error });
        });
    });
    return myPromise;
  };

  const getTopPodcastsFromItunes = async () => {
    let myPromise = new Promise((resolve, reject) => {
      // const apiUrl = "https://www.justheard.ca:8000/returntranslationrecords3";
      const apiUrl =
        "https://rss.itunes.apple.com/api/v1/us/apple-music/coming-soon/all/10/explicit.json";

      fetch(apiUrl)
        .then((response) => {
          let data = response.json();
          // profileObject = data;
          console.log(response);

          resolve(data);
        })
        .catch((error) => {
          console.log(error);

          resolve({ error });
        });
    });
    return myPromise;
  };

  const computeTranscript = async () => {
    console.log("expensive transcript operation");

    let combined = await getCombined3FomLinodeBucketPureChimp();

    // let sorted_combined = combined.translations.sort(
    //   (a, b) => a.iteration - b.iteration
    // );

    let sorted_combined = combined.sort((a, b) => a.iteration - b.iteration);

    let translated_mp3s = await getTranslatedMP3sPureChimp();

    let numObjs = [];

    translated_mp3s.forEach((record) => {
      let translated_mp3_words = record.filename.split("_");
      let number_key = translated_mp3_words[0];
      let word = translated_mp3_words[2];
      let filename = record.filename;
      let text = record.text;
      numObjs[number_key] = { filename, text, word };
    });

    let sentenceAndGoodWordCombined = [];
    sorted_combined.forEach((element, i) => {
      let speaker = element.speaker;
      //check the first word in translation
      let translated_filename = "";
      let translation_first_word = element.translation.split(" ")[0];
      if (numObjs[i] !== undefined) {
        if (
          translation_first_word === numObjs[i].word &&
          element.translation === numObjs[i].text
        ) {
          translated_filename = numObjs[i].filename;
        } else if (translation_first_word !== numObjs[i].word) {
          let matched_from_translated_mp3s = translated_mp3s.filter(
            (el) => el.text === element.translation
          );

          if (matched_from_translated_mp3s[0] === undefined) {
            console.log("");
          }
          translated_filename = matched_from_translated_mp3s[0].filename;
        }
      } else {
        // console.log(
        //   "--------------------------------------------------undefined!!!!!"
        // );
      }

      if (element.speaker === undefined) {
        console.log("");

        // 105
        let index_just_before = i;
        let cells_before = sorted_combined.slice(0, index_just_before);

        cells_before.reverse();

        let speaker_from_prev = cells_before.find(
          (cell) => cell.speaker !== undefined
        );

        speaker = speaker_from_prev.speaker;

        if (i === 105) {
          console.log("");
        }
      }

      let first_succesful_word = element.words.find(
        (word) => word.word.case === "success"
      );

      if (first_succesful_word === undefined) {
        first_succesful_word = element.words.find(
          (word) => word.case === "success"
        );
      }

      let reversed = element.words.reverse();
      let last_succesful_word = reversed.find(
        (word) => word.word.case === "success"
      );

      if (last_succesful_word === undefined) {
        last_succesful_word = reversed.find((word) => word.case === "success");
      }

      sentenceAndGoodWordCombined.push({
        english_sentence: element.english,
        translated_sentence: element.translation,
        speaker: speaker,
        word: first_succesful_word,
        last_word: last_succesful_word,
        // words: element.words,
        // full_sentences_i: element.full_sentences_i,
        uuid: element.uuid,
        // isHighlighted: false,
        // highlightedLang: "none",
        translated_filename: translated_filename,
      });
    });

    let intro_section = {
      english_sentence:
        "<Intro> First part of podcast not included in transcript...",
      translated_sentence: "",
      speaker: "",
      word: {
        word: {
          alignedWord: "intro",
          case: "success",
          start: 0.1,
          end: 0.5,
          word: "intro",
        },
      },
      last_word: {
        word: {
          alignedWord: "",
          case: "success",
          start: 76.5,
          end: 77.0,
          word: "",
        },
      },
      uuid: "intro-uuid",
      translated_filename: "none",
    };

    sentenceAndGoodWordCombined.unshift(intro_section);

    dispatch(addTranscript(sentenceAndGoodWordCombined));

    let simplified_time = [];
    sentenceAndGoodWordCombined.forEach((element, i) => {
      let start;
      if (element.word.word.start !== undefined) {
        start = element.word.word.start;
      } else {
        if (element.word.start !== undefined) {
          start = element.word.start;
        }
      }

      let end;
      if (element.last_word.word.end !== undefined) {
        end = element.last_word.word.end;
      } else {
        if (element.last_word.end !== undefined) {
          end = element.last_word.end;
        }
      }

      simplified_time.push({
        uuid: element.uuid,
        start: start,
        end: end,
      });
    });

    dispatch(addUUIDSandTimes(simplified_time));

    return true;
  };

  return (
    <PlayerContext.Provider
      value={{
        getCombined3,
        getTranslatedMP3s3,
        computeTranscript,
        getCombined3FomLinodeBucket,
        getTopPodcastsFromItunes,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
