/* Everything you are likely to change lives here. */
var CONFIG={
  herName:"Zara",
  yourName:"Ali",

  /* The 4-digit code she types on the first screen. Set to null to let any 4 digits open it. */
  pin:"1234",
  pinHint:"hint: it starts with 1 and counts up",

  /* Photos: put your files in assets/photos/ and set src. If src is null (or the file is missing)
     a soft illustrated picture is shown instead. scene: sunset | night | beach | garden | dusk | rain */
  photos:[
    {src:null,caption:"Our first date, I knew right then 🌅",scene:"sunset"},
    {src:null,caption:"Your smile that makes every day brighter ✨",scene:"garden"},
    {src:null,caption:"Rainy evening, shared chai ☕",scene:"rain"},
    {src:null,caption:"Dancing under the night sky together 🌙",scene:"night"},
    {src:null,caption:"Sand, waves and your hand in mine 🌊",scene:"beach"},
    {src:null,caption:"Golden hour with my favourite person 💞",scene:"dusk"}
  ],

  helloTitle:"HAPPY BIRTHDAY! 🎉",
  helloSub:"Let's get this party started! ✨",

  letterTitle:"To My Dearest {her}",
  letterBody:[
    "You are the calm I never knew I was looking for. Every day with you feels like my favourite song, the one I never want to end. I just want you to know that I am so happy with you, and I will keep choosing you, every single day. I love you more than I ever say out loud.",
    "Happy Birthday to my favourite person in the whole world! 🎂✨ May every dream you carry, even the quiet ones, come true."
  ],
  letterSignoff:"Forever & always yours,",

  mapTitle:"Where our journey started",
  mapQuote:"Every step with you leads to my favourite place in the world.",

  songTitle:"Our Little Song",
  songArtist:"Soft piano, just for you",
  /* Optional: your own song, e.g. "assets/music/our-song.mp3". Leave null for the built-in soft piano. */
  musicFile:"assets/music/our-song.mp3"
};
