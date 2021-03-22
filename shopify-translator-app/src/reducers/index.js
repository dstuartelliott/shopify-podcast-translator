const initialState = {};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_TRANSLATION_SHOWING": {
      return { ...state, showTranslation: action.showTranslation };
    }

    case "ADD_CURRENT_TIME": {
      return { ...state, current_time: action.time };
    }

    case "REPORT_HAMBURGER_MENU_SIZE": {
      return { ...state, hamburger_height: action.hamburger_height };
    }

    case "CHANGE_UUID_PLAYING": {
      return { ...state, uuid: action.uuid };
    }

    case "ADD_TRANSCRIPT": {
      // console.log("ADD_TRANSCRIPT");
      // console.log(action.transcript);

      return { ...state, transcript: action.transcript };
    }

    case "ADD_WSB_TRANSCRIPT": {
      // console.log("ADD_TRANSCRIPT");
      // console.log(action.transcript);

      return { ...state, wsbtranscript: action.wsb_transcript };
    }

    case "ADD_FAVESENTENCLIP": {
      console.log(action.faveSentenceClip);

      if (state.faveSentenceClip !== undefined) {
        const newActions = [...state.faveSentenceClip];
        newActions.push(action.faveSentenceClip);

        return { ...state, faveSentenceClip: newActions };
      }
      const newActions = [action.faveSentenceClip];

      return { ...state, faveSentenceClip: newActions };
    }

    case "ADD_PODCAST_SHOWING": {
      return { ...state, podcastShowing: action.podcastShowing };
    }

    case "ADD_PODCAST_SELECTED_TO_PLAY": {
      return { ...state, podcastSelectedToPlay: action.podcastSelectedToPlay };
    }

    case "ADD_UUIDS_TIMES": {
      // console.log("ADD_TRANSCRIPT");
      // console.log(action.transcript);

      return { ...state, uuidsAndTimes: action.uuidsAndTimes };
    }

    case "UPDATE_SPEECH_SYNTH_STATE": {
      return { ...state, synth: action.synth };
    }

    case "JUMP_TO_TIME": {
      // console.log("JUMP_TO_TIME");
      // console.log(action.time);

      return { ...state, jump_to_time: action.time };
    }

    case "MARK_TRANSLATION_AS_PLAYING": {
      return {
        ...state,
        translation_playing: true,
        translation_time_code: action.translation_time_code,
        translated_uuid: action.translated_uuid,
        type_curently_playing: action.type_curently_playing,
        translated_filename: action.translated_filename,
      };
    }

    case "MARK_ENGLISH_AS_PLAYING": {
      // console.log("action MARK_ENGLISH_AS_PLAYING");
      // console.log(action.english_time_code);
      // console.log(action.english_uuid);
      // console.log(action.type_curently_playing);

      return {
        ...state,
        translation_playing: false,
        time_code_from_player: action.time_code_from_player,
        english_time_code_from_db: action.english_time_code_from_db,
        english_uuid: action.english_uuid,
        type_curently_playing: action.type_curently_playing,
        prev_uuid: action.prev_uuid,
        prev_tc: action.prev_tc,
        next_uuid: action.next_uuid,
        next_tc: action.next_tc,
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

    case "RECORD_TRANSLATION_MP3_PLAYER_START": {
      return {
        ...state,
        translation_mp3_player_state: action.translation_mp3_player_state,
      };
    }

    case "UPDATE_WINDOW_DIMENSIONS": {
      // console.log("UPDATE_WINDOW_DIMENSIONS");
      // console.log(action.dim);

      return {
        ...state,
        dim: action.dim,
      };
    }

    case "UPDATE_SEARCH_RESULTS": {
      // console.log("update search results");
      // console.log(action);

      return {
        ...state,
        searchResults: action.searchResults,
      };
    }

    case "UPDATE_SHOULD_TRANSLATIONS_AUTOPLAY": {
      // console.log("UPDATE_SHOULD_TRANSLATIONS_AUTOPLAY");
      // console.log(action);

      return {
        ...state,
        shouldTranslationsAutoPlay: action.shouldTranslationsAutoPlay,
      };
    }

    case "UPDATE_CLICK_ME_HAS_BEEN_CLICKED": {
      // console.log("UPDATE_CLICK_ME_HAS_BEEN_CLICKED");
      // console.log(action);

      return {
        ...state,
        clickMeHasBeenClicked: action.clickMeHasBeenClicked,
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
      let minutes = Math.floor(element.word.word.start / 60);

      let seconds = element.word.word.start - minutes * 60;

      let time_string = minutes + ":" + Math.floor(seconds);

      if (time_string === "NaN:NaN") {
        minutes = Math.floor(element.word.start / 60);

        seconds = element.word.start - minutes * 60;
        time_string = minutes + ":" + Math.floor(seconds);
      }

      let start;
      if (element.word.word.start === undefined) {
        start = element.word.start;
        start = Math.round((start + Number.EPSILON) * 100) / 100;
      } else {
        start = element.word.word.start;
        start = Math.round((start + Number.EPSILON) * 100) / 100;
      }

      simplified_transcript.push({
        english_sentence: element.english_sentence,
        translated_sentence: element.translated_sentence,
        speaker: element.speaker,
        uuid: element.uuid,
        start: start,
        end: last_time,
        next_start_time: next_start_time,
        time_string: time_string,
        translated_filename: element.translated_filename,
      });
    });
  }
  return simplified_transcript;
};

export const getSimplifiedSentencesWSB = (state) => {
  let transcripts = [];

  if (state.wsbtranscript !== undefined) {
    return state.wsbtranscript;
  }
  return transcripts;
};

export const getLCSentencesForSearch = (state) => {
  let simplified_transcript = [];

  if (state.transcript !== undefined) {
    // let count = state.transcript.length - 1;

    state.transcript.forEach((element, i) => {
      // eslint-disable-next-line
      // let last_time;
      // if (element.last_word === undefined) {
      //   last_time = -0.0;
      // } else {
      //   last_time = element.last_word.word.end;
      // }
      // let next_start_time;
      // if (i < count) {
      //   next_start_time = state.transcript[i + 1].word.word.start;
      // } else {
      //   next_start_time = -99.9;
      // }

      simplified_transcript.push({
        english_sentence: element.english_sentence.toLowerCase(),
        translated_sentence: element.translated_sentence.toLowerCase(),
        uuid: element.uuid,
      });
    });
  }
  return simplified_transcript;
};

export const getSavedFaceSentences = (state) => {
  if (state.faveSentenceClip !== undefined) {
    return state.faveSentenceClip;
  } else return [];
};

export const getUUIDsandTimes = (state) => {
  return state.uuidsAndTimes;

  // if (state.uuidsAndTimes !== undefined) {
  //   return state.uuidsAndTimes;
  // } else {
  //   console.log("returning nothing");
  //   console.log(state);
  // }
};

export const getCurrentTime = (state) => {
  //    state.current_time;
  if (state.current_time !== undefined) {
    return state.current_time.current_time;
  }
};

export const getShowTranslation = (state) => {
  //    state.current_time;
  if (state.showTranslation !== undefined) {
    return state.showTranslation;
  }
};

export const getUUIDPlaying = (state) => {
  //    state.current_time;
  if (state.uuid !== undefined) {
    return state.uuid;
  } else {
    return { uuid: "intro-uuid", start: 0.1, end: 0.2 };
  }
};

export const getEnglishUUID = (state) => {
  //    state.current_time;
  if (state.english_uuid !== undefined) {
    return state.english_uuid;
  }
};

export const getTranslatedUUID = (state) => {
  //    state.current_time;
  if (state.translated_uuid !== undefined) {
    return state.translated_uuid;
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
      translated_filename: state.translated_filename,
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

export const getTranslationMP3PlayerState = (state) => {
  //    state.current_time;
  if (state.translation_mp3_player_state !== undefined) {
    return state.translation_mp3_player_state;
  } else {
    return "TBD";
  }
};

export const getTextSize = (state) => {
  //    state.current_time;
  if (state.dim !== undefined) {
    return {
      open: state.dim.height_for_text_open,
      collapsed: state.dim.height_for_text_collapsed,
    };
  } else {
    return {
      open: "100px",
      collapsed: "0px",
    };
  }
};

export const getWindowDimensions = (state) => {
  //    state.current_time;
  if (state !== undefined) {
    return {
      window_dimensions: state.dim,
    };
  } else {
    return {
      window_dimensions: {},
    };
  }
};

export const getPodcastInfosSize = (state) => {
  //    state.current_time;
  if (state.dim !== undefined) {
    return {
      open: state.dim.height_for_podcast_info_open,
      collapsed: state.dim.height_for_podcast_info_collapsed,
    };
  } else {
    return {
      open: "100px",
      collapsed: "0px",
    };
  }
};

export const getPodcastInfoDimensions = (state) => {
  //    state.current_time;
  if (state.podcast_info_dimensions !== undefined) {
    return {
      podcast_info_dimensions: state.podcast_info_dimensions,
    };
  } else {
    return {
      open: "100px",
      collapsed: "0px",
    };
  }
};

export const getPodcastToggleState = (state) => {
  //    state.current_time;
  if (state.podcast_info_collapsed !== undefined) {
    return {
      podcast_info_collapsed: state.podcast_info_collapsed,
    };
  } else {
    return { podcast_info_collapsed: false };
  }
};

export const getSearchResults = (state) => {
  if (state.searchResults !== undefined) {
    return { searchResults: state.searchResults };
  }
};

export const getShouldTranslationsAutoPlay = (state) => {
  if (state.shouldTranslationsAutoPlay !== undefined) {
    return { shouldTranslationsAutoPlay: state.shouldTranslationsAutoPlay };
  } else {
    return { shouldTranslationsAutoPlay: false };
  }
};

export const getClickMeStatus = (state) => {
  if (state.clickMeHasBeenClicked !== undefined) {
    return state.clickMeHasBeenClicked;
  }
};

export const getHamburgerSize = (state) => {
  if (state.hamburger_height !== undefined) {
    return state.hamburger_height;
  }
};

export const getPodcastSelectedToPlay = (state) => {
  if (state.podcastSelectedToPlay !== undefined) {
    return state.podcastSelectedToPlay;
  } else
    return {
      title: "Achieving High Conversion Rates in a Saturated Market",
      description:
        "Instead of going on a gap year, Dean Legg started his second business after selling his first. Honing in on his interests, Dean launched PureChimp to showcase matcha and natural skincare through commerce and pledges 5% of profits to charities that provide care for chimpanzees. In this episode of Shopify Masters, we chat with Dean about social media ads and how to achieve high conversion rates in a saturated market.",
      url:
        "https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/1153d0/1153d031-e1ea-4aa1-8df0-78aa8be2c970/71a9cfe9-dbbd-4572-b3d2-391c3d2f2c85/ep375-purechimp_tc.mp3",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/eb/81/46/eb8146c4-0112-8f4f-9a54-80bceddffbaa/mza_2429360785917253582.jpg/100x100bb.jpg",
    };
};

export const getPodcastShowing = (state) => {
  if (state.podcastShowing !== undefined) {
    return { state: state.podcastShowing };
  } else
    return {
      state: {
        wrapperType: "track",
        kind: "podcast",
        artistId: 125443881,
        collectionId: 73331298,
        trackId: 73331298,
        artistName: "NPR",
        collectionName: "Bullseye with Jesse Thorn",
        trackName: "Bullseye with Jesse Thorn",
        collectionCensoredName: "Bullseye with Jesse Thorn",
        trackCensoredName: "Bullseye with Jesse Thorn",
        artistViewUrl:
          "https://podcasts.apple.com/us/artist/npr/125443881?uo=4",
        collectionViewUrl:
          "https://podcasts.apple.com/us/podcast/bullseye-with-jesse-thorn/id73331298?uo=4",
        feedUrl: "https://feeds.npr.org/510309/podcast.xml",
        trackViewUrl:
          "https://podcasts.apple.com/us/podcast/bullseye-with-jesse-thorn/id73331298?uo=4",
        artworkUrl30:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/d6/bb/b6/d6bbb629-386f-1f2a-f163-b755915e9fe1/mza_5702869081043519057.jpg/30x30bb.jpg",
        artworkUrl60:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/d6/bb/b6/d6bbb629-386f-1f2a-f163-b755915e9fe1/mza_5702869081043519057.jpg/60x60bb.jpg",
        artworkUrl100:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/d6/bb/b6/d6bbb629-386f-1f2a-f163-b755915e9fe1/mza_5702869081043519057.jpg/100x100bb.jpg",
        collectionPrice: 0,
        trackPrice: 0,
        trackRentalPrice: 0,
        collectionHdPrice: 0,
        trackHdPrice: 0,
        trackHdRentalPrice: 0,
        releaseDate: "2020-11-17T08:00:00Z",
        collectionExplicitness: "notExplicit",
        trackExplicitness: "notExplicit",
        trackCount: 372,
        country: "USA",
        currency: "USD",
        primaryGenreName: "Society & Culture",
        artworkUrl600:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/d6/bb/b6/d6bbb629-386f-1f2a-f163-b755915e9fe1/mza_5702869081043519057.jpg/600x600bb.jpg",
        genreIds: ["1324", "26"],
        genres: ["Society & Culture", "Podcasts"],
      },
    };
};
