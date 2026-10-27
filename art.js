/* All artwork is drawn here as inline SVG: watercolor backgrounds, stickers, gift boxes, cake, map, vinyl. */
var Art=(function(){
  function uri(svg){return 'url("data:image/svg+xml;utf8,'+encodeURIComponent(svg)+'")'}
  function rawUri(svg){return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg).replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29')}
  var NS="xmlns='http://www.w3.org/2000/svg'";
  var GRAIN="<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' seed='2'/><feColorMatrix values='0 0 0 0 .45 0 0 0 0 .4 0 0 0 0 .35 0 0 0 .1 0'/></filter>";
  var WASH="<filter id='w' x='-30%' y='-30%' width='160%' height='160%'><feTurbulence type='fractalNoise' baseFrequency='.011' numOctaves='3' seed='4' result='n'/><feDisplacementMap in='SourceGraphic' in2='n' scale='70'/><feGaussianBlur stdDeviation='2.2'/></filter>";

  /* ---------- watercolor backgrounds (CSS background-image values) ---------- */
  function bgCream(){
    return uri("<svg "+NS+" viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'><defs>"+WASH+GRAIN+"</defs>"+
      "<rect width='400' height='800' fill='#f7f0e2'/>"+
      "<g filter='url(#w)'><ellipse cx='340' cy='180' rx='120' ry='140' fill='#d7e1e8' opacity='.85'/>"+
      "<ellipse cx='40' cy='430' rx='150' ry='170' fill='#e7e9e2' opacity='.8'/>"+
      "<ellipse cx='310' cy='640' rx='170' ry='120' fill='#dde6ee' opacity='.75'/>"+
      "<ellipse cx='150' cy='770' rx='170' ry='80' fill='#cddbe8' opacity='.7'/></g>"+
      "<g filter='url(#w)' fill='#1a3f9e'><path d='M-20 60 C20 40 50 80 36 130 C10 110 -10 100 -20 60Z'/>"+
      "<path d='M-20 230 C10 210 34 250 24 290 C4 270 -14 262 -20 230Z' opacity='.9'/>"+
      "<path d='M410 90 C380 80 360 110 372 140 C392 128 404 118 410 90Z' opacity='.85'/></g>"+
      "<g fill='#2a55b8' opacity='.8'><circle cx='36' cy='704' r='3'/><circle cx='46' cy='716' r='2'/><circle cx='28' cy='722' r='2.4'/><circle cx='370' cy='452' r='2.4'/></g>"+
      "<rect width='400' height='800' filter='url(#g)'/></svg>");
  }
  function flower(x,y,s,petal,center){
    var p='';
    for(var i=0;i<5;i++)p+="<ellipse cx='0' cy='-44' rx='34' ry='48' fill='"+petal+"' transform='rotate("+(i*72)+")'/>";
    return "<g transform='translate("+x+" "+y+") scale("+s+")'>"+p+"<circle r='24' fill='"+center+"'/></g>";
  }
  function bgFlowers(){
    return uri("<svg "+NS+" viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'><defs>"+WASH+GRAIN+
      "<linearGradient id='b' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#8dc1e6'/><stop offset='1' stop-color='#4f96d1'/></linearGradient>"+
      "<filter id='s'><feTurbulence type='fractalNoise' baseFrequency='.006 .28' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.6 -.55'/></filter></defs>"+
      "<rect width='400' height='800' fill='url(#b)'/>"+
      "<g filter='url(#w)'>"+flower(70,130,1.5,'#1f63ad','#f2f7ff')+flower(350,190,.8,'#2b78bd','#f2f7ff')+flower(60,650,1.2,'#14437f','#eef5ff')+flower(340,700,1.7,'#1a5aa0','#f2f7ff')+"</g>"+
      "<rect width='400' height='800' filter='url(#s)' opacity='.26'/><rect width='400' height='800' filter='url(#g)'/></svg>");
  }
  function bgSky(){
    return uri("<svg "+NS+" viewBox='0 0 400 800' preserveAspectRatio='xMidYMid slice'><defs>"+WASH+GRAIN+"</defs>"+
      "<rect width='400' height='800' fill='#dbe9f5'/>"+
      "<g filter='url(#w)'><ellipse cx='90' cy='140' rx='190' ry='150' fill='#9fc2e3' opacity='.7'/>"+
      "<ellipse cx='330' cy='330' rx='170' ry='140' fill='#b3cfe8' opacity='.75'/>"+
      "<ellipse cx='70' cy='560' rx='170' ry='150' fill='#a4c4e2' opacity='.7'/>"+
      "<ellipse cx='320' cy='740' rx='190' ry='130' fill='#8fb7dc' opacity='.65'/>"+
      "<ellipse cx='230' cy='30' rx='160' ry='60' fill='#f4f9fd' opacity='.85'/></g>"+
      "<rect width='400' height='800' filter='url(#g)'/></svg>");
  }
  function bgPaper(){
    return uri("<svg "+NS+" viewBox='0 0 400 400'><defs>"+GRAIN+"</defs><rect width='400' height='400' fill='#f7f1e6'/><rect width='400' height='400' filter='url(#g)' opacity='.8'/></svg>");
  }

  /* ---------- placeholder photo scenes ---------- */
  var SKY={sunset:['#ffb58b','#f47f9d','#6c5cd8'],night:['#0e1c50','#2b3f97','#6b80d9'],beach:['#9bd6fb','#d8f0ff','#ffe8c8'],
           garden:['#bfe3fb','#e7f5ff','#d4f1cf'],dusk:['#ffd29c','#ff9db1','#9a8aff'],rain:['#8da6c8','#b8cae0','#dce6f2']};
  function people(x,y,k,col){
    return "<g transform='translate("+x+" "+y+") scale("+k+")' fill='"+col+"'>"+
      "<circle cx='-26' cy='-70' r='14'/><path d='M-44 40 C-46 -20 -42 -52 -26 -52 C-10 -52 -6 -20 -8 40Z'/>"+
      "<circle cx='24' cy='-62' r='13'/><path d='M8 40 C6 -12 10 -45 24 -45 C38 -45 42 -12 40 40Z'/>"+
      "<path d='M-8 -10 Q8 4 8 -6 L10 -2 Q-2 12 -12 4Z'/></g>";
  }
  function scene(kind){
    var c=SKY[kind]||SKY.sunset,star='',i;
    if(kind==='night'){for(i=0;i<26;i++)star+="<circle cx='"+((i*53)%400)+"' cy='"+((i*37)%200)+"' r='"+(1+(i%3)*.6)+"' fill='#fff' opacity='"+(.4+(i%4)*.15)+"'/>"}
    var sun=(kind==='sunset'||kind==='dusk')?"<circle cx='260' cy='230' r='46' fill='#fff3d0' opacity='.9'/>":(kind==='night'?"<circle cx='290' cy='84' r='28' fill='#fff7da'/>":'');
    var rain='';
    if(kind==='rain'){for(i=0;i<40;i++)rain+="<line x1='"+((i*47)%400)+"' y1='"+((i*61)%300)+"' x2='"+(((i*47)%400)-8)+"' y2='"+(((i*61)%300)+26)+"' stroke='#fff' stroke-width='1.4' opacity='.45'/>"}
    var ground=kind==='beach'?"<path d='M0 300 Q120 280 240 296 T400 288 V400 H0Z' fill='#f5dcae'/><path d='M0 250 Q100 238 200 252 T400 244 V300 Q240 296 0 300Z' fill='#6ec0e6' opacity='.9'/>":
               kind==='garden'?"<path d='M0 300 Q110 262 220 292 T400 270 V400 H0Z' fill='#7fc78a'/><g fill='#ff8fb1'><circle cx='40' cy='330' r='7'/><circle cx='320' cy='340' r='8'/><circle cx='110' cy='360' r='6'/><circle cx='360' cy='310' r='6'/></g>":
               "<path d='M0 300 Q110 262 220 292 T400 270 V400 H0Z' fill='#30285a' opacity='.85'/>";
    var svg="<svg "+NS+" viewBox='0 0 400 400' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='"+c[0]+"'/><stop offset='.55' stop-color='"+c[1]+"'/><stop offset='1' stop-color='"+c[2]+"'/></linearGradient></defs>"+
      "<rect width='400' height='400' fill='url(#s)'/>"+star+sun+rain+ground+people(200,326,1.08,kind==='beach'||kind==='garden'?'#2d3f78':'#241b45')+
      "<path d='M300 150 c-10-12-28 0-16 14 l16 14 l16-14 c12-14-6-26-16-14z' fill='#fff' opacity='.75'/></svg>";
    return rawUri(svg);
  }

  /* ---------- characters and small art ---------- */
  function bunny(pose){
    var eyes=pose==='plead'
      ?"<ellipse cx='74' cy='112' rx='13' ry='15' fill='#2b2230'/><ellipse cx='126' cy='112' rx='13' ry='15' fill='#2b2230'/><circle cx='69' cy='106' r='5' fill='#fff'/><circle cx='121' cy='106' r='5' fill='#fff'/><circle cx='79' cy='119' r='2.6' fill='#fff'/><circle cx='131' cy='119' r='2.6' fill='#fff'/>"
      :"<path d='M60 112 q14 -16 28 0' fill='none' stroke='#2b2230' stroke-width='4' stroke-linecap='round'/><path d='M112 112 q14 -16 28 0' fill='none' stroke='#2b2230' stroke-width='4' stroke-linecap='round'/>";
    var hold=pose==='cake'
      ?"<g transform='translate(100 168)'><path d='M-26 0 L-20 24 H20 L26 0Z' fill='#ffb1c4' stroke='#5b4a55' stroke-width='3' stroke-linejoin='round'/><path d='M-30 2 Q-30 -16 0 -16 Q30 -16 30 2Z' fill='#fff' stroke='#5b4a55' stroke-width='3'/><rect x='-3' y='-34' width='6' height='18' rx='2' fill='#7cb2ff' stroke='#5b4a55' stroke-width='2'/><path d='M0 -48 q-6 8 0 12 q6 -4 0 -12z' fill='#ffb23d'/><circle cx='-14' cy='-8' r='3' fill='#ff6b86'/><circle cx='12' cy='-6' r='3' fill='#7cb2ff'/></g><circle cx='66' cy='170' r='13' fill='#fff' stroke='#5b4a55' stroke-width='3'/><circle cx='134' cy='170' r='13' fill='#fff' stroke='#5b4a55' stroke-width='3'/>"
      :"<circle cx='72' cy='154' r='13' fill='#fff' stroke='#5b4a55' stroke-width='3'/><circle cx='128' cy='154' r='13' fill='#fff' stroke='#5b4a55' stroke-width='3'/><path d='M100 176 c-9-10-24 0-14 12 l14 12 l14-12 c10-12-5-22-14-12z' fill='#ff6b86' stroke='#5b4a55' stroke-width='2.5'/>";
    return "<svg viewBox='0 0 200 210' role='img' aria-label='A cute bunny'>"+
      "<g transform='rotate(-10 78 60)'><ellipse cx='78' cy='48' rx='15' ry='38' fill='#fff' stroke='#5b4a55' stroke-width='3'/><ellipse cx='78' cy='54' rx='7' ry='24' fill='#ffc3d0'/></g>"+
      "<g transform='rotate(10 122 60)'><ellipse cx='122' cy='48' rx='15' ry='38' fill='#fff' stroke='#5b4a55' stroke-width='3'/><ellipse cx='122' cy='54' rx='7' ry='24' fill='#ffc3d0'/></g>"+
      "<ellipse cx='100' cy='118' rx='66' ry='54' fill='#fff' stroke='#5b4a55' stroke-width='3'/>"+
      "<circle cx='54' cy='132' r='11' fill='#ffb7c8' opacity='.75'/><circle cx='146' cy='132' r='11' fill='#ffb7c8' opacity='.75'/>"+eyes+
      "<path d='M92 130 q4 6 8 0 q4 6 8 0' fill='none' stroke='#5b4a55' stroke-width='3' stroke-linecap='round'/><ellipse cx='100' cy='124' rx='4' ry='3' fill='#ff8fa6'/>"+hold+"</svg>";
  }
  function heartLock(){
    return "<svg viewBox='0 0 100 124' aria-hidden='true'><defs><linearGradient id='hl' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#5b94ff'/><stop offset='.55' stop-color='#1d47c4'/><stop offset='1' stop-color='#0d2a80'/></linearGradient></defs>"+
      "<path d='M32 52 V30 a18 18 0 0 1 36 0 V52' fill='none' stroke='#2a4fc4' stroke-width='7' stroke-linecap='round'/>"+
      "<path d='M32 52 V30 a18 18 0 0 1 36 0' fill='none' stroke='#8fb4ff' stroke-width='2' stroke-linecap='round' opacity='.8' transform='translate(-1 -1)'/>"+
      "<path d='M50 118 C14 90 4 68 4 56 C4 44 14 36 26 36 C36 36 46 42 50 52 C54 42 64 36 74 36 C86 36 96 44 96 56 C96 68 86 90 50 118Z' fill='url(#hl)'/>"+
      "<path d='M16 52 C16 44 22 42 28 44' fill='none' stroke='#fff' stroke-width='4' stroke-linecap='round' opacity='.55'/>"+
      "<circle cx='50' cy='70' r='6.5' fill='#0a1a4d'/><rect x='47.2' y='72' width='5.6' height='14' rx='2.6' fill='#0a1a4d'/></svg>";
  }
  /* Gift box: the lid is its own group so it can lift off when opened. */
  function gift(){
    var rib='#e3e9f3',rs='#b5c2d8';
    return "<svg viewBox='0 0 120 124' aria-hidden='true'>"+
      "<ellipse cx='60' cy='116' rx='40' ry='6' fill='#1a3f8f' opacity='.18'/>"+
      "<polygon points='20,56 60,74 60,114 20,96' fill='#1b5fcf'/><polygon points='60,74 100,56 100,96 60,114' fill='#1249a8'/>"+
      "<polygon points='34,62 43,66 43,107 34,103' fill='"+rib+"' stroke='"+rs+"' stroke-width='.6'/>"+
      "<polygon points='77,66 86,62 86,103 77,107' fill='#c6d1e4' stroke='"+rs+"' stroke-width='.6'/>"+
      "<polygon class='inside' points='16,52 60,32 104,52 60,72' fill='#08205c'/>"+
      "<g class='lid'>"+
        "<polygon points='14,50 60,70 60,80 14,60' fill='#2a74e0'/><polygon points='60,70 106,50 106,60 60,80' fill='#1759c0'/>"+
        "<polygon points='14,50 60,30 106,50 60,70' fill='#4a93f5'/>"+
        "<polygon points='77,40 84,43 44,61 37,58' fill='"+rib+"' stroke='"+rs+"' stroke-width='.6'/>"+
        "<polygon points='43,41 36,44 77,62 84,59' fill='#f1f5fb' stroke='"+rs+"' stroke-width='.6'/>"+
        "<g transform='translate(60 50)'><ellipse cx='-12' cy='-6' rx='13' ry='8' transform='rotate(-24 -12 -6)' fill='#f4f7fc' stroke='"+rs+"' stroke-width='1'/>"+
        "<ellipse cx='12' cy='-6' rx='13' ry='8' transform='rotate(24 12 -6)' fill='#f4f7fc' stroke='"+rs+"' stroke-width='1'/><circle cy='-2' r='5' fill='#d3dcec' stroke='"+rs+"' stroke-width='1'/></g>"+
      "</g></svg>";
  }
  function cake(){
    return "<svg viewBox='0 0 300 270' role='img' aria-label='A chocolate birthday cake with one candle'>"+
      "<ellipse cx='150' cy='224' rx='142' ry='34' fill='#b9cae6'/><ellipse cx='150' cy='218' rx='142' ry='34' fill='#dfe8f6'/><ellipse cx='150' cy='214' rx='120' ry='28' fill='#f3f7fd'/>"+
      "<path d='M32 112 V186 A118 34 0 0 0 268 186 V112Z' fill='#4a2c1b'/>"+
      "<path d='M32 142 A118 34 0 0 0 268 142' fill='none' stroke='#6d4531' stroke-width='5'/>"+
      "<path d='M32 164 A118 34 0 0 0 268 164' fill='none' stroke='#6d4531' stroke-width='5'/>"+
      "<path d='M32 112 V186 A118 34 0 0 0 268 186 V112' fill='none' stroke='#2a170d' stroke-width='3'/>"+
      "<ellipse cx='150' cy='112' rx='118' ry='34' fill='#f3e7d4'/>"+
      "<path d='M32 112 A118 34 0 0 0 268 112 L268 120 Q252 122 250 138 Q248 156 232 140 Q222 130 214 144 Q204 168 188 146 Q176 132 168 120 Q150 150 130 118 Q118 112 106 128 Q98 150 84 132 Q70 118 54 138 Q40 150 32 120Z' fill='#f3e7d4'/>"+
      "<ellipse cx='150' cy='108' rx='118' ry='34' fill='#fbf2e3'/>"+
      "<rect x='142' y='46' width='16' height='62' rx='3' fill='#c0262c'/><rect x='142' y='46' width='6' height='62' rx='3' fill='#e0474d'/>"+
      "<g class='flamewrap'><path class='flame' d='M150 14 C140 28 138 40 150 46 C162 40 160 28 150 14Z' fill='#ffb62e'/><path class='flame' d='M150 26 C145 34 145 40 150 44 C155 40 155 34 150 26Z' fill='#fff2b8'/></g>"+
      "<g class='puffs'><circle class='puff' cx='150' cy='38' r='7'/><circle class='puff' cx='148' cy='38' r='6'/><circle class='puff' cx='153' cy='38' r='8'/></g></svg>";
  }
  function envelopeFront(){
    return "<svg viewBox='0 0 300 190' preserveAspectRatio='none' aria-hidden='true'>"+
      "<polygon points='0,30 150,120 0,190' fill='#5aa0ea'/><polygon points='300,30 150,120 300,190' fill='#4c92de'/>"+
      "<polygon points='0,190 150,92 300,190' fill='#6fb1f2'/><polygon points='0,30 150,120 300,30 300,8 150,98 0,8' fill='#3f7fcb' opacity='.0'/></svg>";
  }
  function envelopeBack(){
    return "<svg viewBox='0 0 300 190' preserveAspectRatio='none' aria-hidden='true'><polygon points='0,0 300,0 300,190 0,190' fill='#3f84d6'/><polygon points='0,0 150,92 300,0' fill='#5aa0ea'/></svg>";
  }
  function bigHeart(){
    return "<svg viewBox='0 0 100 92' aria-hidden='true'><defs><linearGradient id='bh' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ff6a63'/><stop offset='1' stop-color='#c91c2c'/></linearGradient></defs><path d='M50 88 C10 60 2 42 2 30 C2 14 14 4 28 4 C38 4 46 10 50 20 C54 10 62 4 72 4 C86 4 98 14 98 30 C98 42 90 60 50 88Z' fill='url(#bh)'/><path d='M16 30 C16 22 22 18 30 20' stroke='#fff' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/></svg>";
  }
  function guitar(){
    return "<svg viewBox='0 0 60 120' aria-hidden='true'><g transform='rotate(18 30 60)'><rect x='26' y='4' width='8' height='56' rx='2' fill='#5b3a29'/><rect x='23' y='2' width='14' height='10' rx='2' fill='#2a2a33'/>"+
      "<path d='M30 56 C12 52 6 66 14 78 C4 88 8 112 30 112 C52 112 56 88 46 78 C54 66 48 52 30 56Z' fill='#c9242f' stroke='#6e121a' stroke-width='2'/><circle cx='30' cy='84' r='6' fill='#2a1a1a'/><rect x='22' y='96' width='16' height='4' rx='2' fill='#f1d9b0'/></g></svg>";
  }
  function bouquet(){
    return "<svg viewBox='0 0 70 100' aria-hidden='true'><g transform='rotate(14 35 50)'><path d='M35 96 L18 54 L52 54Z' fill='#f2ead7' stroke='#cfc2a4' stroke-width='1.5'/><path d='M35 96 L28 54 L42 54Z' fill='#e6dcc3'/>"+
      "<path d='M26 56 C14 40 20 22 28 18 C34 26 34 44 26 56Z' fill='#e8334a'/><path d='M44 56 C56 40 50 22 42 18 C36 26 36 44 44 56Z' fill='#d9283f'/><path d='M35 54 C26 36 30 14 35 8 C40 14 44 36 35 54Z' fill='#f2566a'/>"+
      "<path d='M32 60 L24 28M38 60 L46 28' stroke='#4c9a58' stroke-width='2' fill='none'/></g></svg>";
  }
  function lips(){
    return "<svg viewBox='0 0 80 60' aria-hidden='true'><path d='M6 30 C16 14 30 16 40 24 C50 16 64 14 74 30 C62 52 18 52 6 30Z' fill='#e0293e'/><path d='M8 31 C26 38 54 38 72 31' stroke='#8d0f20' stroke-width='2' fill='none'/><path d='M22 24 C28 20 34 22 40 26' stroke='#ff8a98' stroke-width='3' fill='none' stroke-linecap='round' opacity='.7'/></svg>";
  }
  function darling(){
    return "<svg viewBox='0 0 150 80' aria-hidden='true'><path d='M75 70 C28 44 20 28 20 20 C20 8 30 2 40 2 C54 2 70 12 75 24 C80 12 96 2 110 2 C120 2 130 8 130 20 C130 28 122 44 75 70Z' fill='none' stroke='#e0486f' stroke-width='3'/><path d='M75 60 C42 40 34 28 34 22 C34 14 40 10 46 10 C58 10 70 18 75 28 C80 18 92 10 104 10 C110 10 116 14 116 22 C116 28 108 40 75 60Z' fill='#ffd7e1' opacity='.7'/></svg>";
  }
  function vinyl(photoUrl){
    var g='',i;for(i=0;i<9;i++)g+="<circle cx='100' cy='100' r='"+(46+i*5)+"' fill='none' stroke='#2a2a30' stroke-width='.8'/>";
    return "<svg viewBox='0 0 200 200' aria-hidden='true'><circle cx='100' cy='100' r='98' fill='#0b0b0f'/>"+g+
      "<path d='M30 60 A80 80 0 0 1 100 20' stroke='#fff' stroke-width='3' fill='none' opacity='.12' stroke-linecap='round'/>"+
      "<defs><clipPath id='vc'><circle cx='100' cy='100' r='36'/></clipPath></defs><circle cx='100' cy='100' r='38' fill='#c9737f'/>"+
      "<image href='"+photoUrl+"' x='64' y='64' width='72' height='72' preserveAspectRatio='xMidYMid slice' clip-path='url(#vc)'/><circle cx='100' cy='100' r='5' fill='#0b0b0f'/></svg>";
  }
  function mapSvg(photoUrl){
    var roads='',i;
    for(i=0;i<9;i++)roads+="<path d='M"+(110+i*12)+" 40 L"+(100+i*14)+" 160' stroke='#d8e2c8' stroke-width='.9' opacity='.7'/>";
    for(i=0;i<7;i++)roads+="<path d='M96 "+(52+i*15)+" L230 "+(46+i*15)+"' stroke='#d8e2c8' stroke-width='.9' opacity='.7'/>";
    return "<svg viewBox='0 0 320 190' preserveAspectRatio='xMidYMid slice' role='img' aria-label='A map with our photo pinned on it'><defs>"+
      "<filter id='mt'><feTurbulence type='fractalNoise' baseFrequency='.05' numOctaves='3' seed='5'/><feColorMatrix values='0 0 0 0 .1 0 0 0 0 .22 0 0 0 0 .12 0 0 0 .55 0'/></filter>"+
      "<clipPath id='mpc'><circle cx='160' cy='92' r='20'/></clipPath></defs>"+
      "<rect width='320' height='190' fill='#2e5a39'/><rect width='320' height='190' filter='url(#mt)'/>"+
      "<path d='M200 0 C240 30 230 60 270 80 C300 96 310 130 320 150 V190 H250 C240 150 210 140 190 110 C176 86 196 40 170 0Z' fill='#1d6e7e'/>"+
      "<path d='M214 0 C250 34 244 62 282 84 C306 98 312 130 320 150 V190' fill='none' stroke='#e8d9a8' stroke-width='5' opacity='.75'/>"+
      "<path d='M0 124 C50 100 70 150 120 128 C160 110 150 70 196 76' fill='none' stroke='#1d6e7e' stroke-width='14' stroke-linecap='round'/>"+
      "<path d='M30 190 C60 160 100 170 120 150' fill='none' stroke='#1d6e7e' stroke-width='10' stroke-linecap='round'/>"+
      "<ellipse cx='150' cy='94' rx='64' ry='50' fill='#8b9a86' opacity='.55'/>"+roads+
      "<path d='M60 30 L250 160' stroke='#e9ecd9' stroke-width='1.6' opacity='.6'/><path d='M40 70 L280 54' stroke='#e9ecd9' stroke-width='1.4' opacity='.55'/>"+
      "<g fill='#f1f5e6' font-family='sans-serif' font-size='6' opacity='.85'><text x='108' y='116'>DOWNTOWN</text><text x='20' y='168'>RIVERVIEW</text><text x='228' y='34' transform='rotate(40 228 34)'>PORT</text></g>"+
      "<circle cx='160' cy='92' r='24' fill='#fff'/><image href='"+photoUrl+"' x='140' y='72' width='40' height='40' preserveAspectRatio='xMidYMid slice' clip-path='url(#mpc)'/></svg>";
  }
  function icon(name){
    var p={
      gift:"<rect x='3' y='9' width='18' height='12' rx='2'/><path d='M12 9v12M3 14h18M12 9C10 4 6 5 8 8c1 1.2 4 1 4 1zM12 9c2-5 6-4 4-1-1 1.2-4 1-4 1z'/>",
      back:"<path d='M15 5l-7 7 7 7'/>",
      next:"<path d='M9 5l7 7-7 7'/>",
      redo:"<path d='M4 12a8 8 0 1 0 3-6.2M4 4v5h5'/>",
      close:"<path d='M6 6l12 12M18 6L6 18'/>",
      mail:"<rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/>",
      wand:"<path d='M4 20L16 8M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 11l.7 1.3L21 13l-1.3.7L19 15l-.7-1.3L17 13l1.3-.7z'/>",
      wind:"<path d='M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8'/>",
      pin:"<path d='M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z'/><circle cx='12' cy='9.5' r='2.4'/>",
      volume:"<path d='M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z'/><path d='M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11'/>",
      mute:"<path d='M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z'/><path d='M16 9.5l5 5M21 9.5l-5 5'/>",
      backspace:"<path d='M21 5H9l-6 7 6 7h12V5z'/><path d='M13 9.5l5 5M18 9.5l-5 5'/>",
      replay:"<path d='M4 12a8 8 0 1 0 2.6-5.9M4 4v5h5'/>"
    }[name]||'';
    return "<svg viewBox='0 0 24 24' width='1em' height='1em' fill='none' stroke='currentColor' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>"+p+"</svg>";
  }
  return {bgCream:bgCream,bgFlowers:bgFlowers,bgSky:bgSky,bgPaper:bgPaper,scene:scene,bunny:bunny,heartLock:heartLock,gift:gift,cake:cake,
          envelopeFront:envelopeFront,envelopeBack:envelopeBack,bigHeart:bigHeart,guitar:guitar,bouquet:bouquet,lips:lips,darling:darling,vinyl:vinyl,mapSvg:mapSvg,icon:icon};
})();
