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
});

export const markTranslationAsDonePlaying = () => ({
  type: "MARK_TRANSLATION_AS_DONE_PLAYING",
});
