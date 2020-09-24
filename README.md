# shopify-podcast-translator

Check out the app in action! -->
https://david-elliott-shopify-personal-project.netlify.app/

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

- I'm running my own Node Express server to serve out the data. I have a bunch of juicy JSON files from all the transcribing code I've written.
- I use the Google Text to Speech API, so I can use customized female and male voices with Quebec accents. I switched from the SpeechSynthesis framework because the voice results were too variant across browsers and devices.!
- As far an an MVP goes, it's actually getting there now. Since I submitted it in early September I've been hacking away at it. The delta from initial submission to current version is massive at this point. That's what getting up at 5AM and working every day on it gets ya!
- This will be my graduation project for my Bootcamp, so I intend to expand it quite a bit! There's no reason I can't add more languages, or add meta-data from others APIs, etc. I'll be graduating on November 18th, so I'll be adding to this project on ongoing basis.
