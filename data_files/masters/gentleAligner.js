var fs = require("fs");

const { curly } = require("node-libcurl");
const { Curl } = require("node-libcurl");

async function try1() {
  const curl = new Curl();

  curl.setOpt("URL", "www.google.com");
  curl.setOpt("FOLLOWLOCATION", true);

  curl.on("end", function (statusCode, data, headers) {
    console.info(statusCode);
    console.info("---");
    console.info(data.length);
    console.info("---");
    console.info(this.getInfo("TOTAL_TIME"));

    this.close();
  });

  curl.on("error", curl.close.bind(curl));
  curl.perform();
}
async function try2(MP3File) {
  const curl = new Curl();
  const close = curl.close.bind(curl);

  curl.setOpt(
    Curl.option.URL,
    "http://localhost:8765/transcriptions?async=false"
  );
  curl.setOpt(Curl.option.HTTPPOST, [
    { name: "audio", file: "./ep375-purechimp_tc.mp3", type: "audio/mpeg" },
    {
      name: "transcript",
      file: "./Pure_Chimp_Transcript.txt",
      type: "text/plain",
    },
  ]);
  curl.on("end", function (statusCode, data, headers) {
    console.info(statusCode);
    console.info("---");

    fs.writeFile("alinger_data.json", data, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("alinger_data.json " + " was saved!");
    });

    console.info("---");
  });
  curl.on("error", function () {
    console.log("error");
    console.log(curl);
  });
  curl.perform();
}

try2();
