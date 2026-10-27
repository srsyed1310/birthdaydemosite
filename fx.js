/* Confetti: a gentle stream from the top and bursts from a point. */
var Fx=(function(){
  var cv=document.getElementById('fx'),cx=cv.getContext('2d');
  var W=0,H=0,dpr=1,parts=[],level=0,last=performance.now(),t=0;
  var COLORS=['#2f6fe0','#e8465f','#ffcf3a','#ff8fb1','#4cc3ff','#ffffff','#7a5cf0'];
  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);W=window.innerWidth;H=window.innerHeight;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cv.style.width=W+'px';cv.style.height=H+'px';
    cx.setTransform(dpr,0,0,dpr,0,0);
  }
  function piece(x,y,vx,vy,g,life,stream){
    return {x:x,y:y,vx:vx,vy:vy,g:g,w:rand(4,8),h:rand(7,13),rot:rand(0,6.28),vr:rand(-.25,.25),tilt:rand(0,6.28),tv:rand(.06,.18),
            color:COLORS[(Math.random()*COLORS.length)|0],life:life,stream:stream,round:Math.random()<.18};
  }
  function burst(x,y,n,power){
    n=n||90;power=power||14;if(reduced)n=Math.round(n/3);
    for(var i=0;i<n&&parts.length<700;i++){
      var a=rand(0,Math.PI*2),s=rand(3,power);
      parts.push(piece(x,y,Math.cos(a)*s,Math.sin(a)*s-rand(2,6),.28,rand(90,170),false));
    }
  }
  function stream(l){level=reduced?0:l}
  function frame(now){
    var dt=Math.min(2.5,(now-last)/16.67);last=now;t+=dt/60;
    cx.clearRect(0,0,W,H);
    if(level>0){
      var n=0,i;for(i=0;i<parts.length;i++)if(parts[i].stream)n++;
      var want=Math.round(110*level);
      if(n<want&&Math.random()<.5*dt)parts.push(piece(rand(0,W),-12,rand(-.4,.4),rand(1,2.3),0,1e9,true));
    }
    for(var j=parts.length-1;j>=0;j--){
      var p=parts[j];
      if(p.stream){
        p.y+=p.vy*dt;p.x+=p.vx*dt+Math.sin(t*2+p.tilt)*.45;
        if(p.y>H+16||(level===0&&p.y>H*.1&&Math.random()<.03)){parts.splice(j,1);continue}
        cx.globalAlpha=.9;
      }else{
        p.vx*=Math.pow(.985,dt);p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;
        if(p.life<=0||p.y>H+30){parts.splice(j,1);continue}
        cx.globalAlpha=Math.min(1,p.life/40);
      }
      p.rot+=p.vr*dt;p.tilt+=p.tv*dt;
      cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.scale(1,Math.cos(p.tilt));cx.fillStyle=p.color;
      if(p.round){cx.beginPath();cx.arc(0,0,p.w/2,0,6.3);cx.fill()}else cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      cx.restore();
    }
    cx.globalAlpha=1;
    window.requestAnimationFrame(frame);
  }
  resize();window.addEventListener('resize',resize);window.requestAnimationFrame(frame);
  return {burst:burst,stream:stream};
})();
