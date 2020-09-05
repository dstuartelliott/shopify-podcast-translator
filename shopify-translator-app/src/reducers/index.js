const initialState = {};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CURRENT_TIME": {
      return { ...state, current_time: action.time };
    }

    case "ADD_TRANSCRIPT": {
      console.log("ADD_TRANSCRIPT");
      console.log(action.transcript);

      return { ...state, transcript: action.transcript };
    }

    case "JUMP_TO_TIME": {
      console.log("JUMP_TO_TIME");
      console.log(action.time);

      return { ...state, jump_to_time: action.time };
    }

    case "MARK_TRANSLATION_AS_PLAYING": {
      return { ...state, translation_playing: true };
    }

    case "MARK_TRANSLATION_AS_DONE_PLAYING": {
      return { ...state, translation_playing: true };
    }

    default:
      return state;
  }
}

export const getSimplifiedSentences = (state) => {
  let simplified_transcript = [];

  if (state.transcript !== undefined) {
    let count = state.transcript.length - 1;

    state.transcript.forEach((element, i) => {
      let last_time;
      if (element.last_word === undefined) {
        last_time = -0.0;
      } else {
        last_time = element.last_word.word.end;
      }
      let next_start_time;
      if (i < count) {
        next_start_time = state.transcript[i + 1].word.word.start;
      } else {
        next_start_time = -99.9;
      }

      simplified_transcript.push({
        english_sentence: element.english_sentence,
        translated_sentence: element.translated_sentence,
        speaker: element.speaker,
        uuid: element.uuid,
        start: element.word.word.start,
        end: last_time,
        next_start_time: next_start_time,
      });
    });
  }
  return simplified_transcript;
};

export const getUUIDsandTimes = (state) => {
  let simplified_time = [];

  if (state.transcript !== undefined) {
    state.transcript.forEach((element) => {
      let last_time;
      if (element.last_word === undefined) {
        last_time = -0.0;
      } else {
        last_time = element.last_word.word.end;
      }
      simplified_time.push({
        uuid: element.uuid,
        start: element.word.word.start,
        end: last_time,
      });
    });
  }
  return simplified_time;
};

export const getCurrentTime = (state) => {
  //    state.current_time;
  if (state.current_time !== undefined) {
    return state.current_time.current_time;
  }
};

export const getTimeToJumpTo = (state) => {
  //    state.current_time;
  if (state.jump_to_time !== undefined) {
    return state.jump_to_time;
  }
};
