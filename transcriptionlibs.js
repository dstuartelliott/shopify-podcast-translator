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

module.exports = {
  readTranscriptAndReturnFullSentences,
};
