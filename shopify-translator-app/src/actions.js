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
