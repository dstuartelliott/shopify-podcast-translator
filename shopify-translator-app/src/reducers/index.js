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

    case "UPDATE_SPEECH_SYNTH_STATE": {
      return { ...state, synth: action.synth };
    }

    case "JUMP_TO_TIME": {
      console.log("JUMP_TO_TIME");
      console.log(action.time);

      return { ...state, jump_to_time: action.time };
    }

    case "MARK_TRANSLATION_AS_PLAYING": {
      return {
        ...state,
        translation_playing: true,
        translation_time_code: action.translation_time_code,
        translated_uuid: action.translated_uuid,
        type_curently_playing: action.type_curently_playing,
      };
    }

    case "MARK_ENGLISH_AS_PLAYING": {
      // console.log("action MARK_ENGLISH_AS_PLAYING");
      return {
        ...state,
        translation_playing: false,
        english_time_code: action.english_time_code,
        english_uuid: action.english_uuid,
        type_curently_playing: action.type_curently_playing,
      };
    }

    case "MARK_TRANSLATION_AS_DONE_PLAYING": {
      return {
        ...state,
        translation_playing: false,
        translation_time_code: -1.0,
        translated_uuid: "none",
      };
    }

    case "MARK_TRANSLATION_AS_DONE_PLAYING_PAUSED": {
      return {
        ...state,
        translation_playing: false,
      };
    }

    case "RECORD_MP3_PLAYER_START": {
      return {
        ...state,
        mp3_player_state: action.mp3_player_state,
      };
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

export const getEnglishUUID = (state) => {
  //    state.current_time;
  if (state.english_uuid !== undefined) {
    return state.english_uuid;
  }
};

export const getSynthStateSpeaking = (state) => {
  //    state.current_time;
  if (state.synth !== undefined) {
    return state.synth;
  }
};

export const getTimeToJumpTo = (state) => {
  //    state.current_time;
  if (state.jump_to_time !== undefined) {
    return state.jump_to_time;
  }
};

export const getTranslationPlaying = (state) => {
  //    state.current_time;
  if (state.translation_playing !== undefined) {
    return state.translation_playing;
  }
};

export const getTranslationTimeCodeAndUUID = (state) => {
  //    state.current_time;
  if (state.translation_time_code !== undefined) {
    return {
      timecode: state.translation_time_code,
      uuid: state.translated_uuid,
    };
  } else {
    return {
      timecode: -1.0,
      uuid: "none",
    };
  }
};

export const getTypePlaying = (state) => {
  //    state.current_time;
  if (state.type_curently_playing !== undefined) {
    return state.type_curently_playing;
  }
};

export const getMP3PlayerState = (state) => {
  //    state.current_time;
  if (state.mp3_player_state !== undefined) {
    return state.mp3_player_state;
  } else {
    return "TBD";
  }
};
