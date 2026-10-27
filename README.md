# Birthday Surprise

A mobile-first birthday surprise website, built to follow a "digital gift" flow:

1. Secret PIN lock (heart padlock + keypad)
2. "Happy Birthday!" welcome
3. "Are you ready for the surprise?" with a runaway NO button
4. Three gift boxes: a cake with a candle to blow out, scratch-to-reveal photos, and an envelope love letter
5. Final scrapbook: "Our Sweet Memories" with a scratch collage, memory map and a music player

Plain HTML, CSS and JavaScript. No frameworks, no build step needed to run.

## Structure

```
birthday-surprise/
├── index.html          page markup for every scene and popup
├── css/style.css       all styling (colors and fonts are tokens at the top)
├── js/
│   ├── config.js       names, PIN, photos, letter, song   <- edit this
│   ├── utils.js        small helpers
│   ├── art.js          all artwork as SVG: backgrounds, gifts, cake, map, vinyl
│   ├── fx.js           confetti
│   ├── music.js        soft generated piano, or your own song
│   ├── scratch.js      scratch-to-reveal cards
│   └── app.js          builds the scenes and runs the flow
├── assets/
│   ├── photos/         your photos (see its README)
│   └── music/          optional song
├── build.py            bundles everything into dist/birthday.html (one file)
└── dist/birthday.html  single-file version, ready to upload anywhere
```

## Make it hers

Open `js/config.js` and change:

- `herName`, `yourName`
- `pin` (4 digits she types to open it) and `pinHint`
- `photos`: set each `src` to a file in `assets/photos/` (for example `"assets/photos/photo-1.jpg"`) and write your own captions
- `letterBody`: your letter. `{her}` and `{me}` are replaced by the names
- `mapTitle`, `mapQuote`, `songTitle`, `songArtist`
- `musicFile`: path to your own song, or leave `null` for the built-in soft piano

## Run it

Double-click `index.html` to preview. Fonts load from Google Fonts, so it looks best online.

## Put it online

Upload the folder (or just `dist/birthday.html` plus your `assets/` folder) to any static host,
such as Netlify Drop, Cloudflare Pages or GitHub Pages, then send her the link.
Run `python3 build.py` after editing to refresh `dist/birthday.html`.

## Notes

- Music can only start after a tap, so it begins when she enters the PIN.
- Scratch cards work with finger or mouse.
- Animations calm down automatically for people who have reduced motion turned on.
