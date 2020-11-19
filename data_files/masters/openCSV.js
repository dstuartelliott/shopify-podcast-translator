const { openTextFilePromise, writeDataViewPromise } = require("./filelibs.js");
var fs = require("fs");

const csv = require("csv-parser");
const fetch = require("node-fetch");
// const fs = require("fs/promises");
const neatCsv = require("neat-csv");

const downloadSpecificMP3 = async (csv_row) => {
  if (csv_row.EpisodeTitle === "CHANNEL") {
    return "Nope";
  }
  //   console.log(csv_row);
  const url = csv_row.Url;
  const filename = csv_row.EpisodeTitle + ".mp3";
  const response = await fetch(url);
  let data_array_buffer = await response.arrayBuffer();
  let dataView = new DataView(data_array_buffer);
  let directory = csv_row.PodcastTitle;

  const written_file = await writeDataViewPromise(
    filename,
    dataView,
    directory
  );
  console.log(written_file);
  return written_file;
};

const openCSVDownloadMP3s = async () => {
  console.log("something");
  let csv_text_data = await openTextFilePromise(
    "podcastsToTranslateShopify.csv"
  );
  let parsed_csv = await neatCsv(csv_text_data);
  //   console.log(parsed_csv);

  let directory = parsed_csv[1].PodcastTitle;
  //   console.log(directory);

  if (fs.existsSync(directory) === false) {
    fs.mkdirSync(directory);
  }

  for await (csv_row of parsed_csv) {
    let file_wrriten = await downloadSpecificMP3(csv_row);
  }
};

openCSVDownloadMP3s();
