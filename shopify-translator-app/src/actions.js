export const changeTranslation = (showTranslation) => ({
  type: "CHANGE_TRANSLATION_SHOWING",
  showTranslation,
});

export const addCurrentTime = (time) => ({
  type: "ADD_CURRENT_TIME",
  time,
});

export const reportHamburgerMenuSize = (hamburger_height) => ({
  type: "REPORT_HAMBURGER_MENU_SIZE",
  hamburger_height,
});

export const changeUUIDPlaying = (uuid) => ({
  type: "CHANGE_UUID_PLAYING",
  uuid,
});

export const addTranscript = (transcript) => ({
  type: "ADD_TRANSCRIPT",
  transcript,
});

export const addFaveSentenceClip = (faveSentenceClip) => ({
  type: "ADD_FAVESENTENCLIP",
  faveSentenceClip,
});

export const changePodcastShowing = (podcastShowing) => ({
  type: "ADD_PODCAST_SHOWING",
  podcastShowing,
});

export const changePodcastSelectedToPlay = (podcastSelectedToPlay) => ({
  type: "ADD_PODCAST_SELECTED_TO_PLAY",
  podcastSelectedToPlay,
});

export const addUUIDSandTimes = (uuidsAndTimes) => ({
  type: "ADD_UUIDS_TIMES",
  uuidsAndTimes,
});

export const jumpToTime = (time) => ({
  type: "JUMP_TO_TIME",
  time,
});

export const markTranslationAsPlaying = ({
  translation_time_code,
  translated_uuid,
  type_curently_playing,
  translated_filename,
}) => ({
  type: "MARK_TRANSLATION_AS_PLAYING",
  translation_time_code: translation_time_code,
  translated_uuid: translated_uuid,
  type_curently_playing: type_curently_playing,
  translated_filename: translated_filename,

  // type_curently_playing: "Translation",
});

export const markEnglishAsPlaying = ({
  time_code_from_player,
  english_time_code_from_db,
  english_uuid,
  type_curently_playing,
  prev_uuid,
  prev_tc,
  next_uuid,
  next_tc,
}) => ({
  type: "MARK_ENGLISH_AS_PLAYING",
  time_code_from_player: time_code_from_player,
  english_time_code_from_db: english_time_code_from_db,
  english_uuid: english_uuid,
  type_curently_playing: type_curently_playing,
  prev_uuid: prev_uuid,
  prev_tc: prev_tc,
  next_uuid,
  next_tc: next_tc,
});

export const markTranslationAsDonePlaying = () => ({
  type: "MARK_TRANSLATION_AS_DONE_PLAYING",
});

export const recordMP3PlayerState = (player_state) => ({
  type: "RECORD_MP3_PLAYER_START",
  mp3_player_state: player_state,
});

export const recordTranslationMP3PlayerState = (
  translation_mp3_player_state
) => ({
  type: "RECORD_TRANSLATION_MP3_PLAYER_START",
  translation_mp3_player_state: translation_mp3_player_state,
});

export const markTranslationAsDonePlayingPaused = () => ({
  type: "MARK_TRANSLATION_AS_DONE_PLAYING_PAUSED",
});

export const markTranslationAsPlayingResumed = () => ({
  type: "MARK_TRANSLATION_AS_PLAYING_RESUMED",
});

export const updateSpeechSynthState = (speechSynth) => ({
  type: "UPDATE_SPEECH_SYNTH_STATE",
  synth: speechSynth,
});

export const updateWindowDimensions = (dim) => ({
  type: "UPDATE_WINDOW_DIMENSIONS",
  dim: dim,
});

export const updateSearchResults = (searchResults) => ({
  type: "UPDATE_SEARCH_RESULTS",
  searchResults: searchResults,
});

export const setRespondToSearchState = (repsondToSearchState) => ({
  type: "SET_RESPOND_TO_SEARCH_RATE",
  repsondToSearchState: repsondToSearchState,
});

export const updateShouldTranslationsAutoPlay = (
  shouldTranslationsAutoPlay
) => ({
  type: "UPDATE_SHOULD_TRANSLATIONS_AUTOPLAY",
  shouldTranslationsAutoPlay: shouldTranslationsAutoPlay,
});

export const updateClickMeHasBeenClicked = (clickMeHasBeenClicked) => ({
  type: "UPDATE_CLICK_ME_HAS_BEEN_CLICKED",
  clickMeHasBeenClicked: clickMeHasBeenClicked,
});
