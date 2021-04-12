(()=>{"use strict";const e={},t={players:t=>{const n=[];let o={};t.forEach(((e,t)=>{switch(t%4){case 0:o.id=e;break;case 1:o.name=e;break;case 2:o.x=parseFloat(e);break;case 3:o.y=parseFloat(e),n.push(o),o={}}})),e.players.forEach((e=>{e(n)}))}},n=(t,n)=>{const o=e[t]||[];o.push(n),e[t]=o},o={};document.querySelectorAll("[data-id]").forEach((e=>{o[e.dataset.id]=e}));const a=o,l={CANVAS_WIDTH:2048,CANVAS_HEIGHT:2048,PIXEL_SIZE:12,EXPLORE_RADIUS:50};l.COORD_OFFSET=l.CANVAS_WIDTH/2;const s=l,i=s.CANVAS_WIDTH,c=s.CANVAS_HEIGHT,r=s.PIXEL_SIZE,d=s.COORD_OFFSET;let p,f,m=[];const h=()=>{document.querySelectorAll(".playerIcon").forEach((e=>{"playerTemplate"!==e.id&&e.remove()})),m=[]},w=()=>{const e=p.offsetWidth/i,t={};m.forEach((n=>{if(Number.isNaN(n.x))return;t[n.id]=!0;let o=document.getElementById(n.id);o||(o=(e=>{const t=a.player.cloneNode(!0);return t.style.display="flex",t.id=e.id,t.dataset.id=void 0,t.querySelector(".playerName").textContent=e.name,t})(n),document.body.appendChild(o));const l=o.offsetWidth/2,s=o.offsetHeight/2,i=n.x/r+d,f=c-(n.y/r+d);o.style.left=i*e+p.offsetLeft-l+"px",o.style.top=f*e+p.offsetTop-s+"px"})),document.querySelectorAll(".playerIcon").forEach((e=>{t[e.id]||"playerTemplate"===e.id||e.remove()})),clearTimeout(f),f=setTimeout(h,5e3)},y={init:e=>{p=e.canvas,n("players",(e=>{m=e,w()}))},get players(){return m},redrawPlayers:w},{canvas:E}=a,g=s.CANVAS_WIDTH,v=s.CANVAS_HEIGHT,I=s.EXPLORE_RADIUS,u=s.PIXEL_SIZE,S=s.COORD_OFFSET;E.width=g,E.height=v;const x=E.getContext("2d");let A,T;E.style.width="100%",E.style.left=(window.innerWidth-E.offsetWidth)/2+"px",E.style.top=(window.innerHeight-E.offsetHeight)/2+"px";const C=document.createElement("canvas");C.width=g,C.height=v;const L=C.getContext("2d");L.fillStyle="#ffffff";let _=100;const H=()=>{x.clearRect(0,0,g,v),x.globalCompositeOperation="source-over",x.drawImage(A,0,0),x.globalCompositeOperation="multiply",(()=>{const e=I/u;y.players.forEach((t=>{const n=t.x/u+S,o=v-(t.y/u+S);L.beginPath(),L.arc(n,o,e,0,2*Math.PI,!1),L.fill()}))})(),x.drawImage(C,0,0)},O={init:e=>{A=e.mapImage,T=e.fogImage,L.drawImage(T,0,0),H(),n("players",H);const t=(e,t=1)=>{const n=_,o=Math.max(Math.floor(n/5),1)*t;console.log(o);const a=0===e.deltaY?e.deltaX:e.deltaY;var l;l=a>0?n-o:n+o,l=Math.min(Math.max(Math.round(l),50),2e3),_=l,E.style.width=`${l}%`;const s=_/n;E.style.left=s*(E.offsetLeft-e.clientX)+e.clientX+"px",E.style.top=s*(E.offsetTop-e.clientY)+e.clientY+"px",y.redrawPlayers()};window.addEventListener("wheel",t);const o={};let a,l=!1;((e,t)=>{const n=new Map;let o=[];const a=e=>{n.delete(e.pointerId),o=o.filter((t=>t.event.pointerId!==e.pointerId)),t.up&&t.up(o)};e.addEventListener("pointerdown",(e=>{const a={downEvent:e,event:e};n.set(e.pointerId,a),o.push(a),t.down&&t.down(o)})),window.addEventListener("pointermove",(e=>{const a=n.get(e.pointerId);a&&(a.event=e,t.move&&t.move(o))})),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a)})(window,{down:e=>{1===e.length?(o.x=E.offsetLeft,o.y=E.offsetTop):2===e.length&&(l=!0,a=void 0)},move:e=>{if(1!==e.length||l){if(2===e.length){const n=e[0].event.clientX-e[1].event.clientX,o=e[0].event.clientY-e[1].event.clientY,l=Math.sqrt(n*n+o*o);a&&t({deltaY:a-l||-1,clientX:window.innerWidth/2,clientY:window.innerHeight/2},.08),a=l}}else{const t=e[0].event;E.style.left=o.x+(t.clientX-e[0].downEvent.clientX)+"px",E.style.top=o.y+(t.clientY-e[0].downEvent.clientY)+"px",y.redrawPlayers()}},up:e=>{0===e.length&&(l=!1)}})},canvas:E},b=document.createElement("img"),P=document.createElement("img");(async()=>{new WebSocket(`ws://${location.host}`).addEventListener("message",(e=>{const n=e.data.trim().split("\n"),o=n.shift(),a=t[o];a?a(n):console.log("unknown websocket message: ",e.data)})),y.init({canvas:O.canvas}),await Promise.all([new Promise((e=>{fetch("/map").then((e=>e.blob())).then((t=>{b.onload=e,b.src=URL.createObjectURL(t)}))})),new Promise((e=>{P.onload=e,P.src="fog"}))]),O.init({mapImage:b,fogImage:P})})()})();