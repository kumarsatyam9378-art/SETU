import { useEffect, useRef, useState } from 'react'

const htmlContent1 = `
<style>
#sw{width:100vw;height:100vh;background:linear-gradient(145deg,#04001E 0%,#08003F 50%,#03001A 100%);overflow:hidden;position:relative;font-family:system-ui,-apple-system,sans-serif}
#sw canvas{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
#pcan{z-index:1}#acan{z-index:5}#ccan{z-index:22}
#lay{position:relative;z-index:10;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:40px 14px;opacity:0;transition:opacity 1.3s ease}
#lay.show{opacity:1}
.slbl{font-size:12px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,.28);margin:12px 0;text-align:center}
.crow{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:800px}
.cc{width:110px;height:65px;border-radius:13px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:1px solid rgba(255,255,255,.1);cursor:pointer;opacity:0;transform:scale(.3) translateY(40px);transition:opacity .55s,transform .65s cubic-bezier(.34,1.56,.64,1);will-change:transform}
.cc.in{opacity:1;transform:scale(1) translateY(0)}
.ci{font-size:20px;line-height:1}
.cn{font-size:9px;color:rgba(255,255,255,.78);font-weight:600;text-align:center;line-height:1.3;max-width:95px}
#ctr{display:flex;flex-direction:column;align-items:center;gap:6px;padding:20px 0;opacity:0;transform:scale(.5);transition:opacity 1.1s,transform 1.1s cubic-bezier(.34,1.56,.64,1)}
#ctr.in{opacity:1;transform:scale(1)}
#sname{font-size:72px;font-weight:700;color:#fff;letter-spacing:-2.5px;line-height:1;text-shadow:0 0 60px rgba(79,127,255,.8),0 0 120px rgba(79,127,255,.3)}
#sdev{font-size:20px;color:rgba(255,255,255,.38);margin-top:-4px}
#stag{font-size:14px;color:rgba(255,255,255,.52);letter-spacing:2.5px;margin-top:8px;text-align:center}
#stag2{font-size:10px;color:rgba(255,255,255,.22);letter-spacing:3px;margin-top:4px;text-align:center}
@keyframes pr{0%{transform:scale(.85);opacity:.65}100%{transform:scale(3.5);opacity:0}}
.pr{position:absolute;width:80px;height:80px;top:50%;left:50%;margin:-40px 0 0 -40px;border-radius:50%;border:1.5px solid rgba(79,127,255,.42);animation:pr 3s ease-out infinite;pointer-events:none}
.pr:nth-child(2){animation-delay:1s}.pr:nth-child(3){animation-delay:2s}
.bl,.ba,.bc{stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 0s}
.draw .bl{stroke-dashoffset:0;transition:stroke-dashoffset 1s .1s ease}
.draw .ba{stroke-dashoffset:0;transition:stroke-dashoffset 1.5s .9s ease}
.draw .bc{stroke-dashoffset:0;transition:stroke-dashoffset .55s ease}
.draw .bc1{transition-delay:2s}.draw .bc2{transition-delay:2.15s}.draw .bc3{transition-delay:2.3s}.draw .bc4{transition-delay:2.15s}.draw .bc5{transition-delay:2s}
@keyframes fl{0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(1) translateY(-7px)}}
.cc.fl{animation:fl 3s ease-in-out infinite}
@keyframes glow{0%,100%{text-shadow:0 0 60px rgba(79,127,255,.8),0 0 120px rgba(79,127,255,.3)}50%{text-shadow:0 0 80px rgba(79,127,255,1),0 0 150px rgba(79,127,255,.5),0 0 200px rgba(79,127,255,.2)}}
#sname{animation:glow 3s ease-in-out infinite}
</style>
<div id="sw">
  <canvas id="pcan"></canvas>
  <canvas id="acan"></canvas>
  <canvas id="ccan"></canvas>
  <div id="lay">
    <div style="width:100%;display:flex;flex-direction:column;align-items:center">
      <div class="slbl">— Business Owners —</div>
      <div class="crow" id="bizrow"></div>
    </div>
    <div id="ctr">
      <div style="position:relative;display:flex;align-items:center;justify-content:center">
        <div class="pr"></div><div class="pr"></div><div class="pr"></div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:1px">
          <svg id="bsvg" width="200" height="60" viewBox="0 0 170 50">
            <line class="bl" x1="6" y1="39" x2="164" y2="39" stroke="#4F7FFF" stroke-width="2.5" stroke-linecap="round"/>
            <path class="ba" d="M 20 39 Q 85 4 150 39" fill="none" stroke="#4F7FFF" stroke-width="3" stroke-linecap="round"/>
            <line class="bc bc1" x1="40" y1="39" x2="40" y2="27" stroke="#4F7FFF" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
            <line class="bc bc2" x1="63" y1="39" x2="63" y2="14" stroke="#4F7FFF" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
            <line class="bc bc3" x1="85" y1="39" x2="85" y2="7" stroke="#4F7FFF" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
            <line class="bc bc4" x1="107" y1="39" x2="107" y2="14" stroke="#4F7FFF" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
            <line class="bc bc5" x1="130" y1="39" x2="130" y2="27" stroke="#4F7FFF" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
          </svg>
          <div id="sname">setu</div>
          <div id="sdev">सेतु</div>
        </div>
      </div>
      <div id="stag">Har Zaroorat Ka Pul</div>
      <div id="stag2">CONNECTING NEEDS · CREATING OPPORTUNITIES</div>
    </div>
    <div style="width:100%;display:flex;flex-direction:column;align-items:center">
      <div class="crow" id="custrow"></div>
      <div class="slbl">— Customers —</div>
    </div>
  </div>
</div>
`

const scriptContent1 = `
(() => {
const cats=[
  {n:'Food & Restaurant',i:'🍽️',c:'#FC8019',b:'rgba(252,128,25,.14)'},
  {n:'Healthcare',i:'🏥',c:'#00B8A9',b:'rgba(0,184,169,.14)'},
  {n:'Beauty & Wellness',i:'💄',c:'#E8A0BF',b:'rgba(232,160,191,.14)'},
  {n:'Education',i:'📚',c:'#FFD700',b:'rgba(255,215,0,.11)'},
  {n:'Fitness & Sports',i:'💪',c:'#7CFF5F',b:'rgba(124,255,95,.09)'},
  {n:'Retail & Shopping',i:'🛒',c:'#45AAF2',b:'rgba(69,170,242,.14)'},
  {n:'Home Services',i:'🏠',c:'#FF6B6B',b:'rgba(255,107,107,.14)'},
  {n:'Transport & Auto',i:'🚗',c:'#4ECDC4',b:'rgba(78,205,196,.14)'},
  {n:'Real Estate',i:'🏢',c:'#A8E063',b:'rgba(168,224,99,.11)'},
  {n:'Technology & IT',i:'💻',c:'#8B7FFF',b:'rgba(139,127,255,.14)'},
  {n:'Finance & Legal',i:'📊',c:'#F7B731',b:'rgba(247,183,49,.14)'},
  {n:'Agriculture',i:'🌾',c:'#26DE81',b:'rgba(38,222,129,.11)'},
  {n:'Hospitality',i:'🏨',c:'#FD9644',b:'rgba(253,150,68,.14)'},
  {n:'Manufacturing',i:'⚙️',c:'#C97FEA',b:'rgba(201,127,234,.14)'},
  {n:'Digital Business',i:'📱',c:'#4F7FFF',b:'rgba(79,127,255,.14)'}
];
const feats=[
  {n:'All Services',i:'✨',c:'#4F7FFF',b:'rgba(79,127,255,.14)'},
  {n:'Live Tracking',i:'📍',c:'#FF6B6B',b:'rgba(255,107,107,.14)'},
  {n:'Best Deals',i:'🎯',c:'#26DE81',b:'rgba(38,222,129,.11)'},
  {n:'Easy Booking',i:'📅',c:'#FFD700',b:'rgba(255,215,0,.11)'},
  {n:'Secure Pay',i:'🔒',c:'#00B8A9',b:'rgba(0,184,169,.14)'},
  {n:'24/7 Support',i:'💬',c:'#C97FEA',b:'rgba(201,127,234,.14)'},
  {n:'Reviews',i:'⭐',c:'#FC8019',b:'rgba(252,128,25,.14)'},
  {n:'AI Assistant',i:'🤖',c:'#45AAF2',b:'rgba(69,170,242,.14)'},
  {n:'Group Orders',i:'👥',c:'#E8A0BF',b:'rgba(232,160,191,.14)'},
  {n:'Subscriptions',i:'♾️',c:'#7CFF5F',b:'rgba(124,255,95,.09)'}
];

const bizrow=document.getElementById('bizrow'),custrow=document.getElementById('custrow');
if(bizrow && custrow) {
  cats.forEach(c=>{const el=document.createElement('div');el.className='cc';el.style.cssText=\`background:\${c.b};border-color:\${c.c}45;box-shadow:0 3px 14px \${c.c}22\`;el.innerHTML=\`<div class="ci">\${c.i}</div><div class="cn">\${c.n}</div>\`;bizrow.appendChild(el);});
  feats.forEach(f=>{const el=document.createElement('div');el.className='cc';el.style.cssText=\`background:\${f.b};border-color:\${f.c}45;box-shadow:0 3px 14px \${f.c}22\`;el.innerHTML=\`<div class="ci">\${f.i}</div><div class="cn">\${f.n}</div>\`;custrow.appendChild(el);});

  const sw=document.getElementById('sw');
  const pcan=document.getElementById('pcan'),acan=document.getElementById('acan'),ccan=document.getElementById('ccan');
  let W=sw.offsetWidth,H=sw.offsetHeight;
  [pcan,acan,ccan].forEach(cv=>{cv.width=W;cv.height=H;});
  const pctx=pcan.getContext('2d'),actx=acan.getContext('2d'),cctx=ccan.getContext('2d');

  const pts=Array.from({length:75},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.2,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,a:Math.random()*.35+.08,c:['#4F7FFF','#FC8019','#00B8A9','#FFD700','#C97FEA','#FF6B6B'][Math.floor(Math.random()*6)]}));

  function drawStarBg(){
    pctx.clearRect(0,0,W,H);
    [[W*.25,H*.3,'#4F7FFF',.04,180],[W*.75,H*.7,'#C97FEA',.035,160],[W*.5,H*.5,'#00B8A9',.025,200]].forEach(([x,y,col,al,r])=>{
      const g=pctx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,col.replace(')',','+al+')').replace('rgb','rgba').replace('#4F7FFF',\`rgba(79,127,255,\${al})\`).replace('#C97FEA',\`rgba(201,127,234,\${al})\`).replace('#00B8A9',\`rgba(0,184,169,\${al})\`));
      pctx.fillStyle=col==='#4F7FFF'?\`rgba(79,127,255,\${al})\`:(col==='#C97FEA'?\`rgba(201,127,234,\${al})\`:\`rgba(0,184,169,\${al})\`);
      pctx.beginPath();pctx.arc(x,y,r,0,Math.PI*2);
      const grad=pctx.createRadialGradient(x,y,0,x,y,r);
      grad.addColorStop(0,col==='#4F7FFF'?\`rgba(79,127,255,\${al})\`:(col==='#C97FEA'?\`rgba(201,127,234,\${al})\`:\`rgba(0,184,169,\${al})\`));
      grad.addColorStop(1,'rgba(0,0,0,0)');
      pctx.fillStyle=grad;pctx.fill();
    });
  }
  drawStarBg();

  function drawPts(){
    pctx.save();
    pts.forEach(p=>{p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;pctx.beginPath();pctx.arc(p.x,p.y,p.r,0,Math.PI*2);pctx.fillStyle=p.c;pctx.globalAlpha=p.a;pctx.fill();});
    pctx.restore();
  }

  function FC(cat,idx,total){
    const s=Math.floor(Math.random()*4);
    this.x=s===0?Math.random()*W:s===1?W+90:s===2?Math.random()*W:-90;
    this.y=s===0?-90:s===1?Math.random()*H:s===2?H+90:Math.random()*H;
    this.cat=cat;this.idx=idx;this.total=total;
    this.vis=false;this.al=0;this.sc=0;
    this.rot=(Math.random()-.5)*Math.PI*2;this.vrot=(Math.random()-.5)*.07;
    this.tx=W/2;this.ty=H/2;
    this.trail=[];
  }
  FC.prototype.orbit=function(t){
    const a=(this.idx/this.total)*Math.PI*2-Math.PI/2+t;
    const r=Math.min(W,H)*.28;
    this.tx=W/2+Math.cos(a)*r;this.ty=H/2+Math.sin(a)*r;
  };
  FC.prototype.update=function(){
    if(!this.vis)return;
    this.al=Math.min(this.al+.045,1);this.sc=Math.min(this.sc+.055,1);
    this.rot+=this.vrot;this.vrot*=.89;
    const dx=this.tx-this.x,dy=this.ty-this.y;
    this.x+=dx*.075;this.y+=dy*.075;
    this.trail.push({x:this.x,y:this.y,a:this.al*.3});
    if(this.trail.length>8)this.trail.shift();
  };
  FC.prototype.draw=function(ctx){
    if(!this.vis||this.al<=0)return;
    this.trail.forEach((tr,ti)=>{
      ctx.beginPath();ctx.arc(tr.x,tr.y,3,0,Math.PI*2);
      ctx.fillStyle=this.cat.c;ctx.globalAlpha=tr.a*(ti/this.trail.length)*.4;ctx.fill();
    });
    ctx.save();ctx.globalAlpha=this.al;
    ctx.translate(this.x,this.y);ctx.rotate(this.rot*(1-this.sc*.85));ctx.scale(this.sc,this.sc);
    const w=98,h=54;
    ctx.beginPath();
    if(ctx.roundRect)ctx.roundRect(-w/2,-h/2,w,h,10);else{const r=10;ctx.moveTo(-w/2+r,-h/2);ctx.arcTo(w/2,-h/2,w/2,h/2,r);ctx.arcTo(w/2,h/2,-w/2,h/2,r);ctx.arcTo(-w/2,h/2,-w/2,-h/2,r);ctx.arcTo(-w/2,-h/2,w/2,-h/2,r);ctx.closePath();}
    ctx.fillStyle=this.cat.b||'rgba(255,255,255,.08)';ctx.fill();
    ctx.strokeStyle=this.cat.c+'55';ctx.lineWidth=1;ctx.stroke();
    ctx.shadowColor=this.cat.c;ctx.shadowBlur=12;ctx.strokeStyle=this.cat.c+'80';ctx.lineWidth=1;ctx.stroke();
    ctx.shadowBlur=0;
    ctx.font='16px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(this.cat.i,0,-9);
    ctx.font='600 8px system-ui,sans-serif';ctx.fillStyle='rgba(255,255,255,.82)';
    const sn=this.cat.n.length>13?this.cat.n.slice(0,12)+'…':this.cat.n;
    ctx.fillText(sn,0,8);
    ctx.restore();
  };

  const fcs=cats.map((c,i)=>new FC(c,i,cats.length));

  let phase=0,phaseT=0,animAl=1,domShown=false,connOn=false,connT=0,connProg=0;
  let bPos=null,cPos=null,ctrPos=null;

  function getPos(el){const r=el.getBoundingClientRect(),s=sw.getBoundingClientRect();return{x:r.left-s.left+r.width/2,y:r.top-s.top+r.height/2};}
  function cachePosNow(){
    ctrPos=getPos(document.getElementById('ctr'));
    bPos=[...bizrow.querySelectorAll('.cc.in')].map(getPos);
    cPos=[...custrow.querySelectorAll('.cc.in')].map(getPos);
  }

  function drawConns(prog){
    cctx.clearRect(0,0,W,H);
    if(!bPos||!cPos||!ctrPos||prog<=0)return;
    const cx=ctrPos.x,cy=ctrPos.y;
    function beam(fr,to,col,delay){
      const p=Math.max(0,Math.min((prog-delay)/Math.max(1-delay,.001),1));
      if(p<=0)return;
      const ex=fr.x+(to.x-fr.x)*p,ey=fr.y+(to.y-fr.y)*p;
      cctx.save();
      cctx.beginPath();cctx.moveTo(fr.x,fr.y);
      cctx.quadraticCurveTo(cx,(fr.y+to.y)/2,ex,ey);
      cctx.strokeStyle=col;cctx.globalAlpha=.38*p;cctx.lineWidth=1.2;cctx.stroke();
      cctx.beginPath();cctx.arc(ex,ey,3,0,Math.PI*2);
      cctx.fillStyle=col;cctx.shadowColor=col;cctx.shadowBlur=8;cctx.globalAlpha=p;cctx.fill();
      cctx.restore();
    }
    bPos.forEach((pos,i)=>beam(pos,{x:cx,y:cy},cats[i]?.c||'#fff',i/(bPos.length*2.2)));
    cPos.forEach((pos,i)=>beam({x:cx,y:cy},pos,feats[i]?.c||'#fff',.28+i/(cPos.length*2.2)));
  }

  let startT=null;
  let reqId;
  function loop(t){
    if(!startT)startT=t;
    const el=t-startT;
    drawStarBg();drawPts();

    if(phase===0&&el>250){phase=1;phaseT=t;fcs.forEach((fc,i)=>setTimeout(()=>fc.vis=true,i*155));}
    if(phase===1){
      const pe=t-phaseT;
      fcs.forEach(fc=>fc.orbit(pe*.00022));
      if(pe>cats.length*155+2200){phase=2;phaseT=t;}
    }
    if(phase===2){
      const pe=t-phaseT;
      animAl=Math.max(1-pe/1100,0);
      if(!domShown){
        domShown=true;
        document.getElementById('lay').classList.add('show');
        setTimeout(()=>{document.getElementById('ctr').classList.add('in');document.getElementById('bsvg').classList.add('draw');},250);
        [...bizrow.querySelectorAll('.cc')].forEach((c,i)=>setTimeout(()=>c.classList.add('in'),320+i*80));
        setTimeout(()=>[...custrow.querySelectorAll('.cc')].forEach((c,i)=>setTimeout(()=>c.classList.add('in'),i*80)),1700);
      }
      if(pe>3200){phase=3;phaseT=t;connOn=true;connT=t;setTimeout(cachePosNow,300);}
    }
    if(phase===3)connProg=Math.min((t-connT)/3800,1);

    actx.clearRect(0,0,W,H);
    if(animAl>0.01){actx.globalAlpha=animAl;fcs.forEach(fc=>{fc.update();fc.draw(actx);});actx.globalAlpha=1;}
    if(connOn)drawConns(connProg);
    reqId = requestAnimationFrame(loop);
  }
  reqId = requestAnimationFrame(loop);

  setTimeout(()=>[...document.querySelectorAll('.cc.in')].forEach((c,i)=>{c.style.animationDelay=\`\${(i*.22)%3}s\`;c.classList.add('fl');}),14000);
  
  window.cancelSplash1 = () => cancelAnimationFrame(reqId);
}
})();
`

const htmlContent2 = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
  .stage {
    position: relative;
    width: 100vw;
    height: 100vh;
    transform-style: preserve-3d;
    background: #000;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1200px;
  }
  .light-rays { position: absolute; inset: 0; overflow: hidden; opacity: 0; animation: raysIn 2s 3s ease-out forwards; }
  .light-rays::before, .light-rays::after { content: ''; position: absolute; left: 50%; top: 50%; width: 300vw; height: 4px; transform-origin: center; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent); }
  .light-rays::before { transform: translate(-50%,-50%) rotate(25deg); }
  .light-rays::after  { transform: translate(-50%,-50%) rotate(-25deg); background: linear-gradient(90deg, transparent, rgba(59,130,246,0.12), transparent); }
  @keyframes raysIn { to { opacity: 1; } }
  .ring-container { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); transform-style: preserve-3d; }
  .ring { width: 500px; height: 500px; border: 2px solid transparent; border-radius: 50%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); opacity: 0; animation: ringIn 1.5s 1.8s ease-out forwards; }
  .ring-1 { border-image: linear-gradient(135deg, #F59E0B44, transparent 50%, #3B82F644) 1; border-radius: 50%; border: 1.5px solid rgba(245,158,11,0.2); animation: ringIn 1.5s 1.8s ease-out forwards, ringSpin 20s 3s linear infinite; }
  .ring-2 { width: 600px; height: 600px; border: 1px solid rgba(59,130,246,0.12); animation: ringIn 1.5s 2.2s ease-out forwards, ringSpinR 25s 3s linear infinite; }
  .ring-3 { width: 420px; height: 420px; border: 1px solid rgba(245,158,11,0.1); animation: ringIn 1.5s 2.5s ease-out forwards, ringSpin 15s 3s linear infinite; }
  @keyframes ringIn { to { opacity: 1; } }
  @keyframes ringSpin  { to { transform: translate(-50%,-50%) rotateX(70deg) rotateZ(360deg); } }
  @keyframes ringSpinR { to { transform: translate(-50%,-50%) rotateX(65deg) rotateZ(-360deg); } }
  .glow-orb { position: absolute; left: 50%; top: 48%; transform: translate(-50%,-50%); width: 350px; height: 350px; border-radius: 50%; background: radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(59,130,246,0.08) 40%, transparent 70%); filter: blur(60px); opacity: 0; animation: orbPulse 4s 2.5s ease-in-out infinite, orbIn 1s 2s ease-out forwards; }
  @keyframes orbIn { to { opacity: 1; } }
  @keyframes orbPulse { 0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.8; } 50% { transform: translate(-50%,-50%) scale(1.15); opacity: 1; } }
  .setu-wrapper { position: absolute; left: 50%; top: 44%; transform: translate(-50%,-50%) scale(0.08) rotateX(40deg) rotateY(-15deg); transform-style: preserve-3d; opacity: 0; animation: setuReveal 2.5s 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes setuReveal { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0.08) rotateX(40deg) rotateY(-15deg); filter: blur(20px); } 40% { opacity: 1; transform: translate(-50%,-50%) scale(0.6) rotateX(15deg) rotateY(-5deg); filter: blur(3px); } 70% { transform: translate(-50%,-50%) scale(1.08) rotateX(-3deg) rotateY(2deg); filter: blur(0px); } 85% { transform: translate(-50%,-50%) scale(0.97) rotateX(1deg) rotateY(0deg); } 100% { opacity: 1; transform: translate(-50%,-50%) scale(1) rotateX(0deg) rotateY(0deg); filter: blur(0px); } }
  .setu-text { font-family: 'Orbitron', sans-serif; font-size: clamp(100px, 18vw, 220px); font-weight: 900; letter-spacing: 0.15em; background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 25%, #fff 50%, #60A5FA 75%, #3B82F6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; transform-style: preserve-3d; }
  .setu-text::before { content: 'SETU'; position: absolute; inset: 0; background: linear-gradient(135deg, #92400e 0%, #1e3a5f 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(-8px) translateX(3px) translateY(3px); filter: blur(1px); opacity: 0.5; }
  .setu-text::after { content: 'SETU'; position: absolute; inset: 0; background: linear-gradient(135deg, #78350f 0%, #1e3a8a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(-16px) translateX(6px) translateY(6px); filter: blur(2px); opacity: 0.3; }
  .setu-reflect { font-family: 'Orbitron', sans-serif; font-size: clamp(100px, 18vw, 220px); font-weight: 900; letter-spacing: 0.15em; background: linear-gradient(180deg, rgba(245,158,11,0.25) 0%, transparent 60%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: scaleY(-0.4) translateY(-20px); filter: blur(3px); opacity: 0; animation: reflectIn 1s 3s ease-out forwards; mask-image: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent); -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent); }
  @keyframes reflectIn { to { opacity: 0.35; } }
  .bridge-svg { position: absolute; left: 50%; top: 44%; transform: translate(-50%, 60px); opacity: 0; animation: bridgeIn 1.2s 2.8s ease-out forwards; }
  .bridge-path { stroke-dasharray: 400; stroke-dashoffset: 400; animation: drawBridge 1.5s 3s ease-out forwards; }
  @keyframes bridgeIn { to { opacity: 0.7; } }
  @keyframes drawBridge { to { stroke-dashoffset: 0; } }
  .tagline { position: absolute; left: 50%; top: 62%; transform: translate(-50%,-50%) scale(0.7); font-family: 'Orbitron', sans-serif; font-size: clamp(18px, 3.5vw, 42px); font-weight: 700; color: #F59E0B; letter-spacing: 0.2em; text-shadow: 0 0 40px rgba(245,158,11,0.5), 0 0 80px rgba(245,158,11,0.2); opacity: 0; animation: tagIn 1s 4s cubic-bezier(0.16, 1, 0.3, 1) forwards; white-space: nowrap; }
  @keyframes tagIn { to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
  .subtitle { position: absolute; left: 50%; top: 72%; transform: translate(-50%,-50%); font-family: 'Orbitron', sans-serif; font-size: clamp(10px, 1.6vw, 20px); font-weight: 400; color: #94A3B8; letter-spacing: 0.5em; text-transform: uppercase; opacity: 0; animation: subIn 1s 5s ease-out forwards; white-space: nowrap; }
  @keyframes subIn { to { opacity: 1; } }
  .corner { position: absolute; width: 50px; height: 50px; opacity: 0; animation: cornerIn 0.8s ease-out forwards; }
  .corner::before, .corner::after { content: ''; position: absolute; background: #F59E0B; }
  .corner::before { width: 50px; height: 1.5px; top: 0; left: 0; }
  .corner::after  { width: 1.5px; height: 50px; top: 0; left: 0; }
  .c-tl { left: 60px; top: 60px; animation-delay: 3.5s; }
  .c-tr { right: 60px; top: 60px; transform: rotate(90deg); animation-delay: 3.7s; }
  .c-bl { left: 60px; bottom: 60px; transform: rotate(270deg); animation-delay: 3.9s; }
  .c-br { right: 60px; bottom: 60px; transform: rotate(180deg); animation-delay: 4.1s; }
  .c-tr::before, .c-tr::after, .c-br::before, .c-br::after { background: #3B82F6; }
  @keyframes cornerIn { to { opacity: 0.4; } }
  .scanlines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px); pointer-events: none; }
  .flash { position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, rgba(255,255,255,0.6), transparent 60%); opacity: 0; animation: flashBang 0.6s 2.5s ease-out forwards; pointer-events: none; }
  @keyframes flashBang { 0% { opacity: 0.8; } 100% { opacity: 0; } }
  .ambient { position: absolute; left: 50%; top: 45%; transform: translate(-50%,-50%); width: 120vw; height: 120vh; background: radial-gradient(ellipse at center, rgba(245,158,11,0.03) 0%, rgba(59,130,246,0.02) 30%, transparent 55%); animation: ambientBreath 6s ease-in-out infinite; pointer-events: none; }
  @keyframes ambientBreath { 0%, 100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.1); } }
  .diamond { position: absolute; width: 12px; height: 12px; background: transparent; border: 1px solid rgba(245,158,11,0.2); transform: rotate(45deg); opacity: 0; animation: diamondFloat 8s ease-in-out infinite; }
  .d1 { left: 15%; top: 25%; animation-delay: 3s; }
  .d2 { right: 18%; top: 30%; animation-delay: 4s; border-color: rgba(59,130,246,0.2); width: 8px; height: 8px; }
  .d3 { left: 22%; bottom: 28%; animation-delay: 5s; width: 6px; height: 6px; }
  .d4 { right: 12%; bottom: 22%; animation-delay: 3.5s; border-color: rgba(59,130,246,0.15); width: 10px; height: 10px; }
  .d5 { left: 8%; top: 55%; animation-delay: 4.5s; width: 7px; height: 7px; }
  .d6 { right: 25%; top: 18%; animation-delay: 5.5s; width: 9px; height: 9px; border-color: rgba(59,130,246,0.18); }
  @keyframes diamondFloat { 0% { opacity: 0; transform: rotate(45deg) translateY(0); } 15% { opacity: 0.5; } 50% { opacity: 0.3; transform: rotate(45deg) translateY(-20px); } 85% { opacity: 0.5; } 100% { opacity: 0; transform: rotate(45deg) translateY(0); } }
  .h-line { position: absolute; top: 50%; height: 1px; opacity: 0; animation: hLineIn 1s ease-out forwards; }
  .h-line-l { right: 52%; width: 0; background: linear-gradient(to left, #F59E0B, transparent); animation-delay: 3.2s; }
  .h-line-r { left: 52%; width: 0; background: linear-gradient(to right, #3B82F6, transparent); animation-delay: 3.4s; }
  @keyframes hLineIn { to { width: min(25vw, 300px); opacity: 0.4; } }
</style>
<div class="stage">
  <div class="ambient"></div>
  <div class="light-rays"></div>
  <div class="scanlines"></div>
  <div class="ring-container">
    <div class="ring ring-1"></div>
    <div class="ring ring-2"></div>
    <div class="ring ring-3"></div>
  </div>
  <div class="glow-orb"></div>
  <div class="setu-wrapper">
    <div class="setu-text">SETU</div>
    <div class="setu-reflect">SETU</div>
  </div>
  <svg class="bridge-svg" width="400" height="40" viewBox="0 0 400 40">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="50%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#3B82F6"/>
      </linearGradient>
    </defs>
    <path class="bridge-path" d="M 30 35 Q 200 -5 370 35" fill="none" stroke="url(#bg)" stroke-width="2"/>
  </svg>
  <div class="h-line h-line-l"></div>
  <div class="h-line h-line-r"></div>
  <div class="tagline">Har Zaroorat Ka Pul</div>
  <div class="subtitle">Connecting Needs, Creating Opportunities</div>
  <div class="corner c-tl"></div>
  <div class="corner c-tr"></div>
  <div class="corner c-bl"></div>
  <div class="corner c-br"></div>
  <div class="diamond d1"></div>
  <div class="diamond d2"></div>
  <div class="diamond d3"></div>
  <div class="diamond d4"></div>
  <div class="diamond d5"></div>
  <div class="diamond d6"></div>
  <div class="flash"></div>
</div>
`

export default function SplashSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (phase === 1 && containerRef.current) {
      containerRef.current.innerHTML = htmlContent1
      const script = document.createElement('script')
      script.innerHTML = scriptContent1
      document.body.appendChild(script)
      
      const timer = setTimeout(() => {
        if (window.cancelSplash1) window.cancelSplash1()
        setPhase(2)
      }, 16000) // First animation runs for 16s
      
      return () => {
        clearTimeout(timer)
        if (window.cancelSplash1) window.cancelSplash1()
        document.body.removeChild(script)
      }
    } else if (phase === 2 && containerRef.current) {
      containerRef.current.innerHTML = htmlContent2
      
      const timer = setTimeout(() => {
        onComplete()
      }, 7000) // Second animation runs for 7s
      
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
    />
  )
}

declare global {
  interface Window {
    cancelSplash1?: () => void;
  }
}
