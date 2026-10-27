/* Small helpers shared by the other scripts. */
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var rand=function(a,b){return a+Math.random()*(b-a)};
var reduced=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
var fill=function(s){return String(s).split('{her}').join(CONFIG.herName).split('{me}').join(CONFIG.yourName)};
var wait=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
function fmtTime(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2)}
