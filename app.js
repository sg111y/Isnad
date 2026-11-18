(function(){
var $=function(i){return document.getElementById(i)},main=$("main"),tab="lib",view=null,mode="all",S={done:{},ok:0,no:0};
try{S=Object.assign(S,JSON.parse(localStorage.getItem("asn2")||"{}"))}catch(e){}
function save(){try{localStorage.setItem("asn2",JSON.stringify(S))}catch(e){}}
var IC={auto:"🌓",light:"☀️",dark:"🌙"};
function applyTheme(){var r=document.documentElement;if(S.th&&S.th!="auto")r.dataset.theme=S.th;else delete r.dataset.theme;r.style.setProperty("--z",S.z||1);var b=document.getElementById("th");if(b)b.textContent=IC[S.th||"auto"]}
applyTheme();
var B={},O=[],R=[];
function add(c,ls){if(!B[c]){B[c]=[];O.push(c)}ls.forEach(function(l){if(B[c].indexOf(l)<0)B[c].push(l)})}
window.ASN_DATA.forEach(function(g){add(g[0],g[1])});Object.keys(window.ASN_EXTRA||{}).forEach(function(c){add(c,window.ASN_EXTRA[c])});
O.forEach(function(c){B[c].forEach(function(l){var p=l.split("|");R.push({id:R.length,c:c,k:p[0],n:p[1].split(">")})})});
var SEC=[["الخلفاء والعشرة المبشَّرون",["أبو بكر الصديق","عمر بن الخطاب","عثمان بن عفان","علي بن أبي طالب","الزبير بن العوام","سعد بن أبي وقاص","عبد الرحمن بن عوف","طلحة بن عبيد الله"]],["المكثرون من الرواية",["أبو هريرة","ابن عمر","أنس بن مالك","ابن عباس","جابر بن عبد الله","أبو سعيد الخدري","ابن مسعود","عبد الله بن عمرو"]],["أمهات المؤمنين والصحابيات",["عائشة","أم سلمة","حفصة","أم حبيبة","ميمونة","أسماء بنت أبي بكر","أم عطية","فاطمة بنت قيس","الربيع بنت معوذ","أسماء بنت يزيد بن السكن"]]];
var used={};SEC.forEach(function(s){s[1]=s[1].filter(function(c){return B[c]});s[1].forEach(function(c){used[c]=1})});
SEC.push(["بقية الصحابة",O.filter(function(c){return!used[c]})]);
var K={"ع":"الجماعة: الستة جميعًا","خ":"صحيح البخاري","خت":"البخاري معلّقًا","م":"صحيح مسلم","د":"سنن أبي داود","ت":"سنن الترمذي","س":"سنن النسائي","ق":"سنن ابن ماجه","٤":"الأربعة عدا البخاري ومسلم"};
$("k").innerHTML='<option value="">كل الكتب</option>'+["خ","م","ع","٤","د","ت","س","ق"].map(function(c){return"<option>"+c+"</option>"}).join("");
function flt(pool){var q=$("q").value.trim(),k=$("k").value,u=$("u").checked;
 return pool.filter(function(r){return(!k||r.k.split(" ").indexOf(k)>=0)&&(!q||r.n.join(" ").indexOf(q)>=0)&&(!u||!S.done[r.id])})}
function dn(c){return R.filter(function(r){return r.c==c&&S.done[r.id]}).length}
function prog(){var d=Object.keys(S.done).filter(function(i){return S.done[i]}).length;$("bar").style.width=(100*d/R.length)+"%";$("ptxt").textContent="أتقنتُ "+d+" من "+R.length+" إسنادًا"}
function hue(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;return h}
function row(r,num,hide,mx){mx=mx||r.n.length;
 var h='<tr class="r'+(S.done[r.id]?' done':'')+'" data-id="'+r.id+'"><td class="no" title="تم إتقانه">'+(S.done[r.id]?"✓":num)+'</td>';
 h+='<td class="sy'+(mode=="s"?" h":"")+'">'+r.k+'</td>';
 var rnd=mode=="r"?(r.id*7+(S.seed||0))%r.n.length:-1;
 r.n.forEach(function(x,i){h+='<td class="nm p'+(i%5)+((mode=="n"||i===rnd||hide===i)?" h":"")+'"'+(i==0&&mx>r.n.length?' colspan="'+(mx-r.n.length+1)+'"':'')+'>'+x+'</td>'});
 return h+'<td class="cm'+(mode=="c"?" h":"")+'">'+r.c+'</td></tr>'}
function tbl(L,fn){var mx=0;L.forEach(function(r){mx=Math.max(mx,r.n.length)});var b="";L.forEach(function(r,i){b+=fn(r,i,mx)});return '<table class="t">'+b+'</table>'}
var PAL=[["#7a2233","#f6e7c1"],["#24543f","#f1e6c0"],["#243a63","#f4e3b2"],["#b98a2e","#2f2112"],["#2c6a6e","#f3ead0"],["#6b4528","#f2dfb4"],["#5b3552","#f1e2c3"],["#46525e","#f0e8d2"],["#a3502f","#fbeacb"],["#62662f","#f3ecca"]];
var PAL=[["#7b2d3a","#9d4656"],["#2f5d4a","#45806a"],["#2c4a6e","#436b99"],["#b8862b","#dcaa49"],["#2a6f6f","#3f9494"],["#5e3a63","#80558a"],["#b5573a","#d57a57"],["#6b7035","#8d934b"],["#4a5568","#69768b"],["#6a4429","#8e613c"]];
var PAL=["#7b1e2f","#1f4e5f","#2f5d3a","#8a5a1e","#3b3f6b","#6b2f4f","#a0522d","#2d5f5b","#5a3a22","#4a6a2f","#8c3b2b","#2b4a6b","#6b5a1e","#4f2d5f"];
function lib(){var q=$("q").value.trim(),o="",W=Math.max(main.clientWidth-64,200);
 SEC.forEach(function(s){var L=s[1].filter(function(c){return!q||c.indexOf(q)>=0});if(!L.length)return;
  var per=Math.max(3,Math.floor(W/60)),rows="";
  for(var i=0;i<L.length;i+=per){var bs="";
   L.slice(i,i+per).forEach(function(c){var n=B[c].length,d=dn(c),h0=hue(c),w=44+(h0%5)*3,h=Math.min(140+c.length*8,285)+(h0%5)*7;
    bs+='<div class="sp" data-c="'+c+'" title="مسند '+c+' — '+d+'/'+n+'" style="width:'+w+'px;height:'+h+'px;background-color:'+PAL[h0%PAL.length]+'"><em></em><span>'+c+'</span><u>'+n+'</u><i><s style="height:'+(100*d/n)+'%"></s></i></div>'});
   rows+='<div class="shelf"><div class="bks">'+bs+'</div><div class="board"></div></div>'}
  o+='<div class="case"><div class="plaque">'+s[0]+'</div>'+rows+'</div>'});
 main.innerHTML=(S.last&&B[S.last]?'<button class="back go" data-c="'+S.last+'">▶ متابعة: مسند '+S.last+'</button>':'')+(o||'<p class="mu">لا نتائج</p>')+'<p class="mu">اضغط على كتاب لفتح مسنده · الشريط الذهبي على حافة الكتاب يُظهر تقدّمك</p>'}
function book(){var L=flt(R.filter(function(r){return r.c==view})),b=L.length?tbl(L,function(r,i,mx){return row(r,i+1,-1,mx)}):"";
 main.innerHTML='<button class="back">→ المكتبة</button><div class="grp"><div class="gh"><span>مسند '+view+'</span><span>'+dn(view)+' / '+B[view].length+'</span></div><div class="sc">'+(b||'<p class="mu" style="padding:8px">لا نتائج</p>')+'</div></div><p class="mu">اضغط الخلية المحجوبة لكشفها · اضغط الرقم لتعليم الإسناد «متقَن» · مرّر الصف أفقيًا</p>'}
function quiz(){var L=flt(view?R.filter(function(r){return r.c==view}):R);if(!L.length){main.innerHTML='<div class="box">لا إسناد مطابق.</div>';return}
 var c=L[Math.floor(Math.random()*L.length)],h=Math.floor(Math.random()*c.n.length),m=mode;mode="all";
 main.innerHTML='<div class="box"><p class="mu">'+(view?'مسند '+view:'من كل المكتبة')+' — ما الراوي المحجوب؟</p><div class="grp"><div class="sc">'+tbl([c],function(r){return row(r,"؟",h)})+'</div></div><button class="btn" id="y">عرفتُه ✓</button><button class="btn g" id="x">لم أعرفه</button><p class="mu">النتيجة: '+S.ok+' صحيحة · '+S.no+' خاطئة</p></div>';mode=m;
 $("y").onclick=function(){S.ok++;save();quiz()};$("x").onclick=function(){S.no++;save();quiz()}}
function key(){main.innerHTML='<div class="box">'+Object.keys(K).map(function(k){return'<p><b style="color:var(--ac)">'+k+'</b> '+K[k]+'</p>'}).join("")+'<p class="mu">يُقرأ الإسناد من اليمين: شيخ المصنِّف ثم نزولًا إلى الصحابي في أقصى اليسار.</p></div>'}
function render(){prog();if(tab=="lib")(view?book:lib)();else({quiz:quiz,key:key})[tab]();
 $("ctl").style.display=tab=="key"?"none":"";$("modes").style.display=(tab=="lib"&&!view)||tab=="quiz"?"none":"";$("k").style.display=(tab=="lib"&&!view)?"none":""}
document.querySelectorAll("nav button").forEach(function(b){b.onclick=function(){tab=b.dataset.t;if(tab=="lib")view=null;document.querySelectorAll("nav button").forEach(function(x){x.classList.toggle("on",x==b)});render()}});
document.querySelectorAll("#modes button").forEach(function(b){b.onclick=function(){mode=b.dataset.m;S.seed=Math.floor(Math.random()*99);document.querySelectorAll("#modes button").forEach(function(x){x.classList.toggle("on",x==b)});render()}});
["q","k","u"].forEach(function(i){$(i).addEventListener("input",render)});
main.addEventListener("click",function(e){var t=e.target,bk=t.closest(".sp,.vol");
 if(t.classList.contains("go")){view=t.dataset.c;window.scrollTo(0,0);render();return}
 if(bk){view=bk.dataset.c;S.last=view;save();$("q").value="";window.scrollTo(0,0);render();return}
 if(t.classList.contains("back")){view=null;render();return}
 var r=t.closest(".r");if(!r)return;
 if(t.classList.contains("no")){var id=r.dataset.id;S.done[id]=!S.done[id];save();prog();if(tab=="lib")book();return}
 if(t.classList.contains("h")){t.classList.remove("h");t.classList.add("rev")}});
var rz;window.addEventListener("resize",function(){clearTimeout(rz);rz=setTimeout(function(){if(tab=="lib"&&!view)lib()},150)});
render();
$("th").onclick=function(){var o=["auto","light","dark"];S.th=o[(o.indexOf(S.th||"auto")+1)%3];save();applyTheme()};
function zm(d){S.z=Math.max(.8,Math.min(1.7,+((S.z||1)+d).toFixed(1)));save();applyTheme()}
$("zp").onclick=function(){zm(.1)};$("zm").onclick=function(){zm(-.1)};
if("serviceWorker" in navigator){var had=!!navigator.serviceWorker.controller,rl=false;
 navigator.serviceWorker.register("sw.js").then(function(reg){reg.update();setInterval(function(){reg.update()},600000);document.addEventListener("visibilitychange",function(){if(!document.hidden)reg.update()})}).catch(function(){});
 navigator.serviceWorker.addEventListener("controllerchange",function(){if(had&&!rl){rl=true;location.reload()}})}
})();
