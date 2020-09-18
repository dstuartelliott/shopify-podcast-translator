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
- The app uses the SpeechSynthesis feature of modern desktop browsers.  There are a few differences in player permissions and voices arrays, but it totally works on mobile.  That version is live!
- It's a little incomplete. There can be some weird behaviour because of state jumps. However, considering that the assigned challenges were limited in scope, I figure a bit of incompleteness for the application project is acceptable.
- This will be my graduation project for my Bootcamp, so I intend to expand it quite a bit! There's no reason I can't add more languages, or explore searching the text, or add meta-data from others APIs, etc.

Please note that the correct branch is the "fixed speech synth" branch - not Master.  Which you are on!


