/* Background music: a soft generated piano loop, or your own file via CONFIG.musicFile.
   Sound can only start after a tap, so play() is called from a button press. */
var Music=(function(){
  var audioEl=null,ctx=null,master=null,send=null,timer=null,nextT=0,step=0,t0=0,playing=false,built=false,listeners=[];
  var EIGHTH=60/66/2,VIRTUAL=180;
  var chords=[
    {bass:48,arp:[60,64,67,71,72,71,67,64],mel:[79,76]},
    {bass:45,arp:[57,60,64,67,69,67,64,60],mel:[76,72]},
    {bass:41,arp:[57,60,65,69,72,69,65,60],mel:[77,72]},
    {bass:43,arp:[59,62,67,71,74,71,67,62],mel:[74,71]}
  ];
  function mtof(n){return 440*Math.pow(2,(n-69)/12)}
  function impulse(c){
    var len=Math.floor(c.sampleRate*2.8),b=c.createBuffer(2,len,c.sampleRate);
    for(var ch=0;ch<2;ch++){var d=b.getChannelData(ch);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
    return b;
  }
  function note(n,time,dur,vel){
    var o1=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain(),g2=ctx.createGain(),f=ctx.createBiquadFilter();
    o1.type='sine';o2.type='triangle';o1.frequency.value=mtof(n);o2.frequency.value=mtof(n);o2.detune.value=4;g2.gain.value=.22;
    f.type='lowpass';f.frequency.setValueAtTime(3200,time);f.frequency.exponentialRampToValueAtTime(700,time+dur);
    g.gain.setValueAtTime(0,time);g.gain.linearRampToValueAtTime(vel,time+.008);g.gain.exponentialRampToValueAtTime(.0008,time+dur);
    o1.connect(g);o2.connect(g2);g2.connect(g);g.connect(f);f.connect(master);f.connect(send);
    o1.start(time);o2.start(time);o1.stop(time+dur+.1);o2.stop(time+dur+.1);
  }
  function playStep(s,time){
    var c=chords[Math.floor(s/8)%4],i=s%8;
    if(i===0){note(c.bass,time,3.4,.16);note(c.bass+12,time,2.6,.05)}
    note(c.arp[i],time,1.9,i%2?.085:.105);
    if(i===0)note(c.mel[0],time+.02,3,.07);
    if(i===4)note(c.mel[1],time+.01,2.4,.05);
  }
  function tick(){while(nextT<ctx.currentTime+.35){playStep(step,nextT);nextT+=EIGHTH;step++}}
  function build(){
    if(built)return true;
    if(CONFIG.musicFile){
      try{audioEl=new Audio(CONFIG.musicFile);audioEl.loop=true;audioEl.volume=.8;built=true;return true}catch(e){audioEl=null}
    }
    try{
      var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
      ctx=new AC();
      var comp=ctx.createDynamicsCompressor();master=ctx.createGain();master.gain.value=.85;
      send=ctx.createGain();send.gain.value=.5;
      var conv=ctx.createConvolver();conv.buffer=impulse(ctx);var wet=ctx.createGain();wet.gain.value=.6;
      send.connect(conv);conv.connect(wet);wet.connect(master);master.connect(comp);comp.connect(ctx.destination);
      nextT=ctx.currentTime+.15;step=0;t0=ctx.currentTime;
      timer=setInterval(tick,80);built=true;return true;
    }catch(e){return false}
  }
  function emit(){listeners.forEach(function(f){try{f(playing)}catch(e){}})}
  function play(){
    if(!build())return;
    if(audioEl){var pr=audioEl.play();if(pr&&pr.catch)pr.catch(function(){})}
    else if(ctx){if(ctx.state==='suspended')ctx.resume();tick()}
    playing=true;emit();
  }
  function pause(){
    if(!built)return;
    if(audioEl)audioEl.pause();else if(ctx)ctx.suspend();
    playing=false;emit();
  }
  function toggle(){if(playing)pause();else play()}
  function restart(){
    if(!built)return;
    if(audioEl)audioEl.currentTime=0;else if(ctx){step=0;nextT=ctx.currentTime+.1;t0=ctx.currentTime}
  }
  function state(){
    if(audioEl)return {playing:playing,t:audioEl.currentTime||0,dur:audioEl.duration&&isFinite(audioEl.duration)?audioEl.duration:VIRTUAL};
    if(ctx)return {playing:playing,t:(ctx.currentTime-t0)%VIRTUAL,dur:VIRTUAL};
    return {playing:false,t:0,dur:VIRTUAL};
  }
  document.addEventListener('visibilitychange',function(){
    if(!built||!playing)return;
    if(document.hidden){if(audioEl)audioEl.pause();else if(ctx)ctx.suspend()}
    else{if(audioEl){var q=audioEl.play();if(q&&q.catch)q.catch(function(){})}else if(ctx)ctx.resume()}
  });
  return {play:play,pause:pause,toggle:toggle,restart:restart,state:state,isPlaying:function(){return playing},onChange:function(f){listeners.push(f)}};
})();
