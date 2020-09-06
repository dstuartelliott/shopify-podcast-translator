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

export const markTranslationAsPlaying = (time, translated_uuid) => ({
  type: "MARK_TRANSLATION_AS_PLAYING",
  translation_time_code: time,
  translated_uuid: translated_uuid,
  type_curently_playing: "Translation",
});

export const markEnglishAsPlaying = (time, english_uuid) => ({
  type: "MARK_ENGLISH_AS_PLAYING",
  english_time_code: time,
  english_uuid: english_uuid,
  type_curently_playing: "English",
});

export const markTranslationAsDonePlaying = () => ({
  type: "MARK_TRANSLATION_AS_DONE_PLAYING",
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
