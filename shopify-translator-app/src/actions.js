export const addCurrentTime = (time) => ({
  type: "ADD_CURRENT_TIME",
  time,
});

export const addTranscript = (transcript) => ({
  type: "ADD_TRANSCRIPT",
  transcript,
});

export const jumpToTime = (time) => ({
  type: "JUMP_TO_TIME",
  time,
});

export const markTranslationAsPlaying = ({
  translation_time_code,
  translated_uuid,
  type_curently_playing,
}) => ({
  type: "MARK_TRANSLATION_AS_PLAYING",
  translation_time_code: translation_time_code,
  translated_uuid: translated_uuid,
  type_curently_playing: type_curently_playing,

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

export const updatePodcastInfoDimensions = (podcast_info_dimensions) => ({
  type: "UPDATE_TOP_PODCAST_INFO_DIMENSIONS",
  podcast_info_dimensions: podcast_info_dimensions,
});

export const updatePodcastToggleState = (podcast_info_collapsed) => ({
  type: "UPDATE_PODCAST_INFO_TOGGLE_STATE",
  podcast_info_collapsed: podcast_info_collapsed,
});
