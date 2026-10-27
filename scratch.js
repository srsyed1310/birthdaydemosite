/* Scratch-to-reveal cards. A canvas cover sits over a photo and is erased with the finger. */
var Scratch=(function(){
  function coverBlue(cx,w,h){
    var g=cx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#2f7be0');g.addColorStop(1,'#5aa1f2');
    cx.fillStyle=g;cx.fillRect(0,0,w,h);
    cx.fillStyle='rgba(255,255,255,.35)';
    for(var i=0;i<26;i++){cx.beginPath();cx.arc((i*97)%w,(i*57)%h,1.4+(i%3)*.6,0,6.3);cx.fill()}
    var sh=cx.createLinearGradient(0,0,w,0);sh.addColorStop(0,'rgba(255,255,255,0)');sh.addColorStop(.5,'rgba(255,255,255,.14)');sh.addColorStop(1,'rgba(255,255,255,0)');
    cx.fillStyle=sh;cx.fillRect(0,0,w,h);
    cx.textAlign='center';cx.textBaseline='middle';cx.fillStyle='#fff';
    cx.font='700 '+Math.round(w*.08)+'px Fredoka,system-ui,sans-serif';cx.fillText('✨ SCRATCH ME ✨',w/2,h*.46);
    cx.fillStyle='rgba(255,255,255,.8)';cx.font='500 '+Math.round(w*.058)+'px Fredoka,system-ui,sans-serif';cx.fillText('reveal memory 💕',w/2,h*.56);
  }
  function coverRose(cx,w,h){
    var g=cx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#d98893');g.addColorStop(1,'#c26b78');
    cx.fillStyle=g;cx.fillRect(0,0,w,h);
    cx.fillStyle='rgba(255,255,255,.28)';
    for(var i=0;i<22;i++){cx.beginPath();cx.arc((i*89)%w,(i*61)%h,1.3+(i%3)*.5,0,6.3);cx.fill()}
    cx.textAlign='center';cx.textBaseline='middle';cx.fillStyle='#fff3f3';
    cx.font=Math.round(w*.1)+'px Pacifico,cursive';cx.fillText('Scratch me',w/2,h*.46);
    cx.fillStyle='rgba(255,243,243,.85)';cx.font='500 '+Math.round(w*.05)+'px Outfit,system-ui,sans-serif';cx.fillText('tap to reveal',w/2,h*.58);
  }

  function create(box,opts){
    var cv=document.createElement('canvas');cv.className='cover';box.appendChild(cv);
    var cx=cv.getContext('2d',{willReadFrequently:true});
    var w=0,h=0,drawing=false,last=null,done=false,frac=0,lastCheck=0,painter=opts.cover||coverBlue,threshold=opts.threshold||.5;
    function paint(){
      var dpr=Math.min(window.devicePixelRatio||1,2);
      w=Math.max(60,box.offsetWidth);h=Math.max(60,box.offsetHeight);
      cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);
      cx.setTransform(dpr,0,0,dpr,0,0);cx.globalCompositeOperation='source-over';
      painter(cx,w,h);
      frac=0;done=false;cv.classList.remove('gone');
      if(opts.onProgress)opts.onProgress(0);
    }
    function pos(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)*(w/r.width),y:(e.clientY-r.top)*(h/r.height)}}
    function stroke(a,b){
      cx.globalCompositeOperation='destination-out';cx.lineCap='round';cx.lineJoin='round';cx.lineWidth=Math.max(28,w*.11);
      cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke();cx.globalCompositeOperation='source-over';
    }
    function measure(){
      if(done)return;
      var W=cv.width,H=cv.height,d;
      try{d=cx.getImageData(0,0,W,H).data}catch(e){return}
      var sx=Math.max(1,Math.round(W/40)),sy=Math.max(1,Math.round(H/40)),n=0,t=0;
      for(var y=0;y<H;y+=sy)for(var x=0;x<W;x+=sx){t++;if(d[(y*W+x)*4+3]<40)n++}
      frac=n/t;
      if(opts.onProgress)opts.onProgress(frac);
      if(frac>=threshold)reveal();
    }
    function reveal(){
      if(done)return;done=true;cv.classList.add('gone');
      if(opts.onProgress)opts.onProgress(1);
      if(opts.onReveal)opts.onReveal();
    }
    cv.addEventListener('pointerdown',function(e){
      if(done)return;drawing=true;try{cv.setPointerCapture(e.pointerId)}catch(x){}
      last=pos(e);stroke(last,{x:last.x+.1,y:last.y+.1});e.preventDefault();
    });
    cv.addEventListener('pointermove',function(e){
      if(!drawing||done)return;var p=pos(e);stroke(last,p);last=p;
      var now=performance.now();if(now-lastCheck>220){lastCheck=now;measure()}
    });
    function up(){if(!drawing)return;drawing=false;measure()}
    cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
    paint();
    return {reset:paint,reveal:reveal,isDone:function(){return done},fraction:function(){return frac},
            setCover:function(p){painter=p},
            width:function(){return box.offsetWidth}};
  }
  return {create:create,coverBlue:coverBlue,coverRose:coverRose};
})();
