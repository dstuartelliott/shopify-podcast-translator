# How people talk


Supporting the Podcast industry is a passion of mine, so I thought I would take the great Shopify Masters podcast and see if I could add some value to it.

I decided to try something a little ambitious - could I produce an interactive french version of the podcast using NodeJS, React and Redux?

I wanted an interactive transcript that would offer french translations, line per line, that I could skip if I wanted to, but hear repeated back to me as well.

I sat down and figured out what I would need to do -

- Align the text transcript to the timeline of the mp3 with a cool tool called Gentle Aligner to figure out where each sentence occurs in the waveform. This would give me a JSON Object with each word of the transcript aligned to a timecode.
- Translate the english transcript using the Google Language API to produce a french transcript with Node JS.
- Combine the aligned english text from (1) with the french text from (2) to produce a bilingual JSON array.
- Use that array as a navigation instrument for the mp3.
- Wire it all up in React and Redux.

Some other interesting tidbits behind the making of this app -

- I use the Google Text to Speech API, so I can use customized female and male voices with Quebec accents. I switched from the SpeechSynthesis framework because the voice results were too variant across browsers and devices.
- As far an an MVP goes, it's actually getting there now. One episode of a Shopify podcast works as a rough tech demo, and the "Podcast Player" browser part works independently.
- I was running my own Node Express server to serve out the data (the server is still up). I have a bunch of juicy JSON files from all the transcribing code I've written. However, I've switched to a bit bucket on Linode to serve out the JSON along with the individual translated MP3 files because I'm about to tweet this project out and I neeed a more robust solution.


