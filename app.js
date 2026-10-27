/* Builds every scene and runs the flow: lock -> hello -> ready -> gifts (cake, scratch, letter) -> memories. */
(function(){
'use strict';

var screens={},current=null,started=false,scratches=[];
var opened={cake:false,stack:false,letter:false};
var PLAY='<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
var PAUSE='<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function photoUrl(p){return p.src||Art.scene(p.scene)}
function setImg(img,p){
  img.alt=p.caption;
  img.onerror=function(){img.onerror=null;img.src=Art.scene(p.scene)};
  img.src=photoUrl(p);
}
function loadFonts(){
  var f=document.fonts;if(!f||!f.load)return wait(300);
  return Promise.race([Promise.all([f.load('700 20px Fredoka'),f.load('500 20px Fredoka'),f.load('20px Pacifico'),f.load('500 20px Outfit'),f.load('600 20px Caveat'),f.load('20px "Homemade Apple"')]),wait(2200)]);
}

/* ---------- fill in artwork, icons and names ---------- */
function hydrate(){
  $$('[data-bg]').forEach(function(el){el.style.backgroundImage=Art['bg'+cap(el.getAttribute('data-bg'))]()});
  $$('[data-art]').forEach(function(el){
    var k=el.getAttribute('data-art');
    el.innerHTML=k==='bunnyCake'?Art.bunny('cake'):k==='bunnyPlead'?Art.bunny('plead'):Art[k]();
  });
  $$('[data-icon]').forEach(function(el){el.innerHTML=Art.icon(el.getAttribute('data-icon'))});
  $$('[data-her]').forEach(function(el){el.textContent=CONFIG.herName});
  $$('[data-me]').forEach(function(el){el.textContent=CONFIG.yourName});
  document.title=CONFIG.herName+"'s Birthday Surprise";
  $('#helloTitle').textContent=CONFIG.helloTitle;
  $('#helloSub').textContent=CONFIG.helloSub;
}

/* ---------- navigation ---------- */
var enter={};
function go(id){
  var next=screens[id];if(!next||next===current)return;
  if(current)current.classList.remove('active');
  next.classList.add('active');current=next;
  document.body.classList.toggle('dark-screen',next.classList.contains('dark')||id==='letter');
  $('#soundBtn').hidden=!started||id==='memories'||id==='lock';
  Fx.stream(0);
  if(enter[id])enter[id]();
}
function openModal(m){m.classList.add('open');m.setAttribute('aria-hidden','false');var c=$('[data-close]',m);if(c)c.focus({preventScroll:true})}
function closeModal(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')}

/* ---------- 1. lock ---------- */
function buildLock(){
  var pad=$('#keypad'),dots=$('#pinDots'),entered='',busy=false;
  $('#pinHint').textContent=CONFIG.pinHint||'';
  function render(){$$('i',dots).forEach(function(d,i){d.classList.toggle('on',i<entered.length)})}
  function press(k){
    if(busy)return;
    if(k==='del')entered=entered.slice(0,-1);
    else if(entered.length<4)entered+=k;
    render();
    if(entered.length<4)return;
    var ok=CONFIG.pin==null||entered===String(CONFIG.pin);
    busy=true;
    if(ok){
      dots.classList.add('ok');started=true;Music.play();
      setTimeout(function(){go('hello');Fx.burst(window.innerWidth/2,window.innerHeight*.35,70,12)},650);
    }else{
      dots.classList.add('bad','shake');
      setTimeout(function(){dots.classList.remove('bad','shake');entered='';render();busy=false},700);
    }
  }
  ['1','2','3','4','5','6','7','8','9','','0','del'].forEach(function(k){
    var b=document.createElement('button');b.type='button';
    if(k===''){b.className='key empty';b.tabIndex=-1;b.setAttribute('aria-hidden','true')}
    else if(k==='del'){b.className='key';b.innerHTML=Art.icon('backspace');b.setAttribute('aria-label','Delete')}
    else{b.className='key';b.textContent=k}
    b.addEventListener('click',function(){if(k!=='')press(k)});
    pad.appendChild(b);
  });
  document.addEventListener('keydown',function(e){
    if(current!==screens.lock)return;
    if(/^[0-9]$/.test(e.key))press(e.key);else if(e.key==='Backspace')press('del');
  });
}

/* ---------- 3. ready: the runaway NO ---------- */
function buildReady(){
  var msgs=["Don't do this to me! 💔","Yes is a better option! 💘","Are you sure? 🥺","Look at my cute face! 🥹","Pretty please? 🙏","I will be so sad... 😢","Just press YES already! 💖"];
  var bubble=$('#bubble'),yes=$('#yesBtn'),no=$('#noBtn'),n=0;
  function pop(){bubble.classList.remove('pop');void bubble.offsetWidth;bubble.classList.add('pop')}
  function moveNo(){
    var W=window.innerWidth,H=window.innerHeight,r=no.getBoundingClientRect(),y=yes.getBoundingClientRect(),x,t,tries=0;
    do{x=rand(12,Math.max(14,W-r.width-12));t=rand(70,Math.max(80,H-r.height-30));tries++}
    while(tries<14&&x<y.right+16&&x+r.width>y.left-16&&t<y.bottom+16&&t+r.height>y.top-16);
    no.style.left=x+'px';no.style.top=t+'px';
  }
  no.addEventListener('pointerdown',function(e){
    e.preventDefault();n++;
    bubble.textContent=msgs[Math.min(n,msgs.length-1)];pop();
    yes.style.setProperty('--ys',Math.min(2.1,1+n*.18));
    no.style.setProperty('--ns',Math.max(.32,1-n*.12));
    moveNo();
    if(n>=7)no.classList.add('gone');
  });
  no.addEventListener('click',function(e){e.preventDefault()});
  yes.addEventListener('click',function(){
    bubble.textContent='Yaaay! 🎉';pop();
    var r=yes.getBoundingClientRect();
    Fx.burst(r.left+r.width/2,r.top,120,16);
    setTimeout(function(){Fx.burst(window.innerWidth*.25,window.innerHeight*.4,70,12);Fx.burst(window.innerWidth*.75,window.innerHeight*.4,70,12)},250);
    setTimeout(function(){go('gifts')},900);
  });
  enter.ready=function(){n=0;bubble.textContent=msgs[0];yes.style.setProperty('--ys',1);no.style.setProperty('--ns',1);no.classList.remove('gone');no.style.left='';no.style.top=''};
}

/* ---------- 4. gifts ---------- */
function buildGifts(){
  var row=$('#giftRow'),keys=['cake','stack','letter'],btns=[],busy=false;
  keys.forEach(function(k,i){
    var b=document.createElement('button');b.type='button';b.className='giftbtn';b.setAttribute('aria-label','Open gift '+(i+1));
    b.innerHTML=Art.gift();
    b.addEventListener('click',function(){
      if(busy)return;busy=true;opened[k]=true;b.classList.add('open');
      var r=b.getBoundingClientRect();Fx.burst(r.left+r.width/2,r.top+r.height*.3,60,10);
      setTimeout(function(){busy=false;go(k)},750);
    });
    row.appendChild(b);btns.push(b);
  });
  $('#finalBtn').addEventListener('click',function(){Fx.burst(window.innerWidth/2,window.innerHeight*.6,140,16);setTimeout(function(){go('memories')},500)});
  enter.gifts=function(){
    var all=true;
    keys.forEach(function(k,i){btns[i].classList.toggle('open',!!opened[k]);if(!opened[k])all=false});
    $('#unlock').hidden=!all;$('#giftHint').hidden=all;
    Fx.stream(.9);
    if(all)Fx.burst(window.innerWidth/2,window.innerHeight*.3,60,10);
  };
}

/* ---------- 5. cake ---------- */
function buildCake(){
  var scr=$('#cake'),blow=$('#blowBtn'),relight=$('#relightBtn'),back=$('#cakeBack'),wish=$('#wishLine');
  function lit(){scr.classList.remove('cake-out');blow.hidden=false;relight.hidden=true;back.hidden=true;wish.classList.remove('show')}
  blow.addEventListener('click',function(){
    scr.classList.add('cake-out');blow.hidden=true;relight.hidden=false;back.hidden=false;
    var r=$('#cakeArt').getBoundingClientRect();
    Fx.burst(r.left+r.width/2,r.top+r.height*.2,160,17);
    setTimeout(function(){wish.classList.add('show')},500);
  });
  relight.addEventListener('click',lit);
  enter.cake=function(){lit();Fx.stream(.5)};
}

/* ---------- 6. scratch polaroids ---------- */
function buildStack(){
  var built=false;
  enter.stack=function(){
    Fx.stream(.25);
    if(built)return;built=true;
    var col=$('#stackCol');
    loadFonts().then(function(){
      CONFIG.photos.forEach(function(p){
        var pol=document.createElement('div');pol.className='pol';
        var box=document.createElement('div');box.className='imgbox';
        var img=document.createElement('img');setImg(img,p);box.appendChild(img);
        pol.appendChild(box);
        var clip=document.createElement('i');clip.className='clip';pol.appendChild(clip);
        var cp=document.createElement('p');cp.className='cap';cp.textContent=p.caption;pol.appendChild(cp);
        col.appendChild(pol);
        var sc=Scratch.create(box,{cover:Scratch.coverBlue,onReveal:function(){
          pol.classList.add('revealed');var r=box.getBoundingClientRect();Fx.burst(r.left+r.width/2,r.top+r.height/2,40,9);
        }});
        scratches.push({sc:sc,box:box,w:box.offsetWidth});
      });
    });
  };
}

/* ---------- 7. letter ---------- */
function buildLetter(){
  $('#peekText').textContent=fill(CONFIG.letterBody[0]);
  var lm=$('#letterModal');
  $('#lmTitle').textContent=fill(CONFIG.letterTitle);
  $('#lmSign').textContent=CONFIG.letterSignoff;
  var body=$('#lmBody');
  CONFIG.letterBody.forEach(function(t){var p=document.createElement('p');p.textContent=fill(t);body.appendChild(p)});
  $('#openLetter').addEventListener('click',function(){openModal(lm)});
  $('#envelope').addEventListener('click',function(){openModal(lm)});
}

/* ---------- 8. memories ---------- */
function buildMemories(){
  var P=CONFIG.photos,n=P.length,idx=0,revealed=[],cards=[],sc=null,scBox=$('#scBox'),scImg=$('#scImg'),scPct=$('#scPct');
  var col=$('#collage');
  P.forEach(function(p,i){
    var b=document.createElement('button');b.type='button';b.className='mp';b.setAttribute('aria-label','Open memory '+(i+1));
    b.innerHTML='<i class="tape"></i><div class="imgbox"><img alt=""><div class="rosecover"><b>Scratch me</b><small>tap to reveal</small></div></div><span class="badge">✨ Tap to Scratch</span>';
    setImg($('img',b),p);
    b.addEventListener('click',function(){showScratch(i,true)});
    col.appendChild(b);cards.push(b);revealed.push(false);
  });

  function showScratch(i,open){
    idx=(i+n)%n;var p=P[idx];
    setImg(scImg,p);$('#scCap').textContent=p.caption;
    if(open)openModal($('#scratchModal'));
    function init(){
      if(!sc){
        sc=Scratch.create(scBox,{cover:Scratch.coverRose,threshold:.5,
          onProgress:function(f){scPct.textContent=Math.round(f*100)+'%'},
          onReveal:function(){
            revealed[idx]=true;cards[idx].classList.add('revealed');
            var r=scBox.getBoundingClientRect();Fx.burst(r.left+r.width/2,r.top+r.height/2,70,12);
          }});
      }else sc.reset();
      if(revealed[idx])sc.reveal();
    }
    if(open)loadFonts().then(function(){setTimeout(init,60)});else init();
  }
  $('#scPrev').addEventListener('click',function(){showScratch(idx-1,false)});
  $('#scNext').addEventListener('click',function(){showScratch(idx+1,false)});
  $('#scReset').addEventListener('click',function(){revealed[idx]=false;cards[idx].classList.remove('revealed');if(sc)sc.reset()});

  /* map */
  var map=Art.mapSvg(photoUrl(P[0])),z=1,inner=$('#mapInner');
  inner.innerHTML=map;$('#mmMap').innerHTML=map;
  $('#mmSub').textContent=CONFIG.mapTitle;$('#mmQuote').textContent='"'+CONFIG.mapQuote+'" ❤️';
  function zoom(d,e){if(e){e.stopPropagation();e.preventDefault()}z=Math.max(1,Math.min(2.4,z+d));inner.style.transform='scale('+z+')'}
  function zb(el,d){
    el.addEventListener('click',function(e){zoom(d,e)});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')zoom(d,e)});
  }
  zb($('#zoomIn'),.5);zb($('#zoomOut'),-.5);
  $('#mapCard').addEventListener('click',function(){openModal($('#mapModal'))});

  /* player */
  var art=document.createElement('img');setImg(art,P[0]);$('#plArt').appendChild(art);
  $('#plTitle').textContent=CONFIG.songTitle;$('#plArtist').textContent=fill(CONFIG.songArtist);
  $('#vmTitle').textContent=CONFIG.songTitle;$('#vmArtist').textContent=fill(CONFIG.songArtist);
  $('#disc').innerHTML=Art.vinyl(photoUrl(P[0]));$('#fabDisc').innerHTML=Art.vinyl(photoUrl(P[0]));
  $('#plPlay').addEventListener('click',function(){Music.toggle()});
  $('#vmPlay').addEventListener('click',function(){Music.toggle()});
  $('#memMusic').addEventListener('click',function(){Music.toggle()});
  $('#soundBtn').addEventListener('click',function(){Music.toggle()});
  $('#vmRestart').addEventListener('click',function(){Music.restart()});
  $('#vmHeart').addEventListener('click',function(e){var r=e.currentTarget.getBoundingClientRect();Fx.burst(r.left+r.width/2,r.top,40,9)});
  $('#openVinyl').addEventListener('click',function(){openModal($('#vinylModal'))});
  $('#vinylFab').addEventListener('click',function(){openModal($('#vinylModal'))});

  function renderMusic(p){
    ['#player','#vinylFab','#vinylModal'].forEach(function(s){$(s).classList.toggle('playing',p)});
    $('#plPlay').innerHTML=p?PAUSE:PLAY;$('#plPlay').setAttribute('aria-label',p?'Pause':'Play');
    $('#vmPlay').innerHTML=p?PAUSE:PLAY;$('#vmPlay').setAttribute('aria-label',p?'Pause':'Play');
    $('#memMusicTxt').innerHTML=p?'PAUSE<br>MUSIC':'PLAY<br>MUSIC';
    $('#memMusic').style.color=p?'#1fd15f':'#1fd15f';
    var sb=$('#soundBtn');sb.innerHTML=Art.icon(p?'volume':'mute');sb.setAttribute('aria-label',p?'Pause music':'Play music');
  }
  Music.onChange(renderMusic);renderMusic(false);
  setInterval(function(){
    var s=Music.state(),pc=Math.min(100,s.t/s.dur*100)+'%';
    $('#plFill').style.width=pc;$('#vmFill').style.width=pc;
    $('#plNow').textContent=fmtTime(s.t);$('#vmNow').textContent=fmtTime(s.t);
    $('#plDur').textContent=fmtTime(s.dur);$('#vmDur').textContent=fmtTime(s.dur);
  },250);

  enter.memories=function(){Fx.stream(.12);var sc0=$('#memScroll');if(sc0)sc0.scrollTop=0};
}

/* ---------- boot ---------- */
function init(){
  hydrate();
  $$('.screen').forEach(function(s){screens[s.id]=s});
  buildLock();buildReady();buildGifts();buildCake();buildStack();buildLetter();buildMemories();
  $('#helloNext').addEventListener('click',function(){go('ready')});
  $$('[data-go]').forEach(function(b){b.addEventListener('click',function(){go(b.getAttribute('data-go'))})});
  $$('.modal').forEach(function(m){
    m.addEventListener('click',function(e){if(e.target===m)closeModal(m)});
    $$('[data-close]',m).forEach(function(c){c.addEventListener('click',function(){closeModal(m)})});
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')$$('.modal.open').forEach(closeModal)});
  var rt=0;
  window.addEventListener('resize',function(){
    clearTimeout(rt);rt=setTimeout(function(){
      scratches.forEach(function(s){if(Math.abs(s.box.offsetWidth-s.w)>3&&!s.sc.isDone()){s.w=s.box.offsetWidth;s.sc.reset()}});
    },250);
  });
  window.BirthdayApp={go:go,opened:opened};
  Promise.all([wait(1700),loadFonts()]).then(function(){
    go('lock');
    var l=$('#loader');l.classList.add('done');setTimeout(function(){if(l.parentNode)l.parentNode.removeChild(l)},900);
  });
}
init();
})();
