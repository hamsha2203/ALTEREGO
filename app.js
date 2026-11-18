const $=s=>document.querySelector(s),app=$('#app');
const MAX_PHOTO_SIZE=10*1024*1024;
let st={name:'',dept:'',pos:'MB',photo:'',ans:[],i:0};
const EBD='APCESIDM'.split(''),MAXE={},MAXD={};
const EBD_LABELS={A:'Analytical thinking',P:'People energy',C:'Creativity',E:'Execution',S:'Strategic structure',I:'Initiative',D:'Adaptability',M:'Communication'};
Q.forEach(([_,o])=>{const P=o.map(x=>x.split('|'));EBD.forEach(d=>MAXE[d]=(MAXE[d]||0)+(P.some(p=>p[1].includes(d))?1:0));'SLDOKR'.split('').forEach(d=>MAXD[d]=(MAXD[d]||0)+(P.some(p=>p[2].includes(d))?1:0))});
const show=h=>{app.innerHTML=`<div class="scr">${h}</div>`};
function landing(){show(`<div class="landing-wrap"><div class="comic-stamp">ISSUE Nº 01 ✦ THE YOU-VERSE</div><div class="portal"><span class="portal-core">✦</span></div><p class="eyebrow">AIESEC IN AMARAVATI PRESENTS</p><h1 class="glitch" data-t="ALTEREGO">ALTEREGO</h1><p class="tag lead">Somewhere in the multiverse, there's a version of you waiting to be discovered.<br><b>Ready to meet them?</b></p><div class="trio"><span>IDENTITY</span><span>CONNECTION</span><span>POTENTIAL</span></div><div class="comic-caption">YOUR NEXT PLOT TWIST STARTS HERE →</div><button class="btn" onclick="intro()">ENTER THE MULTIVERSE ↗</button><p class="fine">Your Personality. Your People. Your Potential.</p></div>`)}
function intro(){show(`<div class="comic-stamp">CHARACTER REGISTRATION ✦</div><h2>WHO’S THE MAIN CHARACTER?</h2><p class="tag">Before we bend reality, tell us who just walked into the story.</p><div class="glass form"><label>Full name<input id="n" maxlength="60" value="${esc(st.name)}"></label><label>Department<select id="d"><option value="">Select…</option>${Object.keys(DEPT).map(k=>`<option ${st.dept==k?'selected':''}>${k}</option>`).join('')}</select></label><label>Position<div class="seg"><button class="${st.pos=='MB'?'on':''}" onclick="st.pos='MB';setSeg(this)">MB</button><button class="${st.pos=='GB'?'on':''}" onclick="st.pos='GB';setSeg(this)">GB</button></div></label><label>Photograph<input id="f" type="file" accept="image/jpeg,image/png,image/webp" onchange="pic(this)"></label><div id="pv">${st.photo?`<img src="${st.photo}">`:''}</div><p class="fine">Your photo is used only to render your personal result card. In this version it never leaves your device.</p><p id="err" class="err"></p><button class="btn" onclick="begin()">ENTER YOUR ALTEREGO</button></div>`)}
function setSeg(b){b.parentNode.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on')}
function pic(i){const f=i.files[0],e=$('#err');if(!f)return;if(!/^image\/(jpeg|png|webp)$/.test(f.type)){e.textContent='Use a JPG, PNG or WEBP image.';i.value='';return}if(f.size>MAX_PHOTO_SIZE){e.textContent='Max file size is 10 MB.';i.value='';return}e.textContent='';const r=new FileReader();r.onload=()=>{st.photo=r.result;$('#pv').innerHTML=`<img src="${st.photo}">`};r.readAsDataURL(f)}
function begin(){st.name=$('#n').value.trim();st.dept=$('#d').value;const e=$('#err');if(st.name.length<2)return e.textContent='Tell us your name.';if(!st.dept)return e.textContent='Pick your department.';if(!st.photo)return e.textContent='Upload a photo for your card.';st.i=0;st.ans=[];ask()}
const CH=['THE ORIGIN STORY','THE TEAM-UP ARC','SUPERPOWER UNLOCKED','PLOT TWISTS AHEAD','THE FINAL PANEL'];
function ask(){const[q,o]=Q[st.i],ch=CH[Math.floor(st.i/4)];show(`<div class="question-shell"><div class="comic-top"><span>ALTEREGO / FIELD NOTES</span><span>⚡ ${String(st.i+1).padStart(2,'0')} / ${Q.length}</span></div><div class="bar"><i style="width:${(st.i+1)/Q.length*100}%"></i></div><p class="eyebrow">CHAPTER ${Math.floor(st.i/4)+1} · ${ch} · PANEL ${st.i+1}</p><div class="question-panel"><span class="panel-burst">WHAT IF...?</span><h2 class="q">${q}</h2></div><div class="opts">${o.map((x,k)=>`<button class="opt ${st.ans[st.i]===k?'on':''}" onclick="pick(${k})"><span>${'ABCD'[k]}</span><b>${x.split('|')[0]}</b><i>↗</i></button>`).join('')}</div>${st.i?'<button class="ghost" onclick="st.i--;ask()">← BACK ONE PANEL</button>':''}`)}
function pick(k){st.ans[st.i]=k;setTimeout(()=>{st.i++;st.i<Q.length?ask():decode()},180)}
function cos(a,b){const k=Object.keys(a),ma=k.reduce((s,x)=>s+a[x],0)/k.length,mb=k.reduce((s,x)=>s+b[x],0)/k.length;let d=0,x=0,y=0;k.forEach(i=>{const p=a[i]-ma,q=b[i]-mb;d+=p*q;x+=p*p;y+=q*q});return x&&y?d/Math.sqrt(x*y):0}
function score(){const e={},d={},a={C:0,A:0,N:0,V:0,W:0};EBD.forEach(x=>e[x]=0);'SLDOKR'.split('').forEach(x=>d[x]=0);
st.ans.forEach((k,i)=>{const p=Q[i][1][k].split('|');p[1].split('').forEach(x=>e[x]++);p[2].split('').forEach(x=>d[x]++);a[p[3]]++});
EBD.forEach(x=>e[x]=10*e[x]/MAXE[x]);Object.keys(d).forEach(x=>d[x]=10*d[x]/MAXD[x]);
// Engine A: EB resonance (EB profiles only)
// Rank profiles by how well they match this person's answer pattern relative
// to the whole profile set. This removes shared baseline scores that otherwise
// let a few centrally positioned profiles dominate most result sets.
const rawEB=EB.map(m=>({m,raw:cos(e,m.v)}));
const lowEB=Math.min(...rawEB.map(x=>x.raw)),highEB=Math.max(...rawEB.map(x=>x.raw));
const eb=rawEB.map(({m,raw})=>({m,s:Math.round(highEB===lowEB?50:((raw-lowEB)/(highEB-lowEB))*100)})).sort((x,y)=>y.s-x.s);
// Engine B: dept alignment (JD profiles only)
const rawDP=Object.entries(DEPT).map(([k,v])=>{const K=Object.keys(d),dot=K.reduce((s,x)=>s+d[x]*(v.v[x]||0),0),n=Math.sqrt(K.reduce((s,x)=>s+d[x]**2,0)*K.reduce((s,x)=>s+(v.v[x]||0)**2,0)),raw=n?dot/n:0;return{k,raw}});
// Turn relative fit into a shared 100-point distribution. A small prior gives
// the participant's chosen department extra weight without overriding answers.
const maxDeptRaw=Math.max(...rawDP.map(x=>x.raw));
const weightedDP=rawDP.map(({k,raw})=>({k,w:Math.exp((raw-maxDeptRaw)*5)*(k===st.dept?1.2:1)}));
const totalDeptWeight=weightedDP.reduce((sum,x)=>sum+x.w,0);
const deptShares=weightedDP.map(({k,w})=>({k,exact:w/totalDeptWeight*100,s:Math.floor(w/totalDeptWeight*100)}));
let remainingDeptPoints=100-deptShares.reduce((sum,x)=>sum+x.s,0);
deptShares.sort((a,b)=>(b.exact-b.s)-(a.exact-a.s));
for(let i=0;i<remainingDeptPoints;i++)deptShares[i].s++;
const deptByScore=[...deptShares].sort((a,b)=>b.s-a.s);
const dp=[...deptByScore.filter(x=>x.k===st.dept),...deptByScore.filter(x=>x.k!==st.dept)];
// Engine C: archetype (ties -> first answered pattern order)
const ar=Object.entries(a).sort((x,y)=>y[1]-x[1]);return{e,d,eb,dp,ar}}
function decode(){show(`<div class="portal spin"></div><h2 class="glitch" data-t="DECODING…">DECODING…</h2><p class="tag">Crossing dimensions to find your ALTEREGO</p>`);setTimeout(reveal,2200)}
function shared(r){const m=r.eb[0].m,names={A:'analytical thinking',P:'people-first thinking',C:'creative ideas',E:'getting things done',S:'structure',I:'taking initiative',D:'adaptability',M:'communication'};
return EBD.map(x=>[x,10-Math.abs(r.e[x]-m.v[x]),r.e[x]+m.v[x]]).filter(x=>x[1]>=7.5).sort((a,b)=>b[2]-a[2]).slice(0,3).map(x=>names[x[0]])}
function ebProfileValues(member){return Object.entries(member.v).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([key,value])=>`${EBD_LABELS[key]} ${value}/10`).join(' · ')}
function ebMatchCard({m,s}){return `<article class="eb-match-card">${av(m)}<div class="eb-member-copy"><b>${esc(m.name)}</b><span>${esc(m.port)}</span><span class="eb-match-score">RESONANCE · ${s}%</span><p>${esc(m.tags)}</p><small>Profile values: ${esc(ebProfileValues(m))}</small></div></article>`}
function departmentMatchRow({k,s}){return `<div class="department-match-row"><b>${esc(k)}</b><span>${esc(DEPT[k].n)}</span><i><em style="width:${s}%"></em></i><strong>${s}%</strong></div>`}
let R,step=0,spiderTimers=[],spiderRun=0;
const RESULT_PAGES=["PERSONALITY ARCHETYPE","SPIDER-VERSE IDENTITY","EB RESONANCE","DEPARTMENT ALIGNMENT","COLLECTIBLE CARD"];
function clearSpiderTimers(){spiderRun++;spiderTimers.forEach(clearTimeout);spiderTimers=[]}
function universeCode(){const source=`${st.name}|${st.dept}|${st.ans.join("")}`;let hash=2166136261;for(let i=0;i<source.length;i++)hash=Math.imul(hash^source.charCodeAt(i),16777619);return(hash>>>0).toString(16).toUpperCase().padStart(8,"0")}
function rarity(score){return score>=82?"LEGENDARY":score>=72?"EPIC":score>=62?"RARE":"COMMON"}
function reveal(){R=score();R.spider=SpiderVerse.score(st.ans,Q);R.universeCode=universeCode();R.rarity=rarity(R.spider.primary.score);step=0;next()}
function resultHeader(){return `<div class="result-progress"><div class="result-progress-copy"><span>RESULT ${String(step+1).padStart(2,"0")} / 05</span><b>${RESULT_PAGES[step]}</b></div><div class="result-track"><i style="width:${(step+1)/RESULT_PAGES.length*100}%"></i></div><div class="result-dots">${RESULT_PAGES.map((_,i)=>`<span class="${i===step?"active":i<step?"done":""}" aria-label="Result ${i+1}"></span>`).join("")}</div></div>`}
function resultShell(contents,nextLabel="NEXT →",showNext=true){return `${resultHeader()}${contents}<div class="result-nav">${step?'<button class="ghost" onclick="moveResult(-1)">← BACK</button>':"<span></span>"}${showNext?`<button class="btn" onclick="moveResult(1)">${nextLabel}</button>`:""}</div>`}
function moveResult(delta){clearSpiderTimers();step=Math.max(0,Math.min(RESULT_PAGES.length-1,step+delta));next()}
function next(){
  const A=ARCH[R.ar[0][0]],m=R.eb[0].m,d=R.dp[0],d2=R.dp[1],sh=shared(R);
  if(step===0){show(resultShell(`<p class="eyebrow">ALTEREGO FILE · IDENTITY UNLOCKED</p><h1 class="glitch big" data-t="${A.t}">${A.t}</h1><p class="tag">${A.s}</p><div class="glass kv"><div><b>Superpower</b>${A.p}</div><div><b>Quirk</b>${A.q}</div><div><b>Growth edge</b>${A.k}</div></div>`));return}
  if(step===1){renderSpiderStage(0);return}
  if(step===2){show(resultShell(`<p class="eyebrow">YOUR EB RESONANCE</p><p class="tag">Your personality counterpart has entered the chat.</p>${av(m)}<h2>${esc(m.name)}</h2><p class="eyebrow">${esc(m.port)}</p><div class="meter"><i style="width:${R.eb[0].s}%"></i></div><p class="tag">You operate on a similar wavelength${sh.length?' — shared tendencies in <b>'+sh.join(', ')+'</b>':''}. Their style: ${esc(m.tags)}.</p><p class="fine">Personality resonance — not a recommendation to work under anyone.</p><h3>ALL EB MATCHES</h3><div class="eb-match-list">${R.eb.map(ebMatchCard).join('')}</div>`));return}
  if(step===3){show(resultShell(`<p class="eyebrow">YOUR DEPARTMENT ALIGNMENT</p><p class="tag">Here's where your superpowers might thrive.</p><h1 class="glitch big" data-t="${esc(d.k)}">${esc(d.k)}</h1><p class="tag">One of your close alignments is <b>${esc(DEPT[d.k].n)}</b> — ${esc(DEPT[d.k].why)}.</p><div class="meter"><i style="width:${d.s}%"></i></div>${d2.s>=d.s-8?`<p class="fine">Also close: ${esc(DEPT[d2.k].n)}. Potential lives in more than one place.</p>`:''}<h3>ALL DEPARTMENT MATCHES</h3><div class="department-match-list">${R.dp.map(departmentMatchRow).join('')}</div>`));return}
  show(`<div class="card-result"><p class="eyebrow">YOUR MULTIVERSE CHARACTER FILE</p>${card(A,m,d)}<p id="download-status" class="fine" aria-live="polite"></p><button class="btn" onclick="dl()">DOWNLOAD YOUR CHARACTER CARD</button><button class="ghost" onclick="playAgain()">DISCOVER ANOTHER UNIVERSE</button><p class="fine">An exploratory self-discovery tool, not a psychological test or EB selection.</p>${resultHeader()}<div class="result-nav"><button class="ghost" onclick="moveResult(-1)">← BACK</button><span></span></div></div>`)
}
function renderSpiderStage(stage,scanIndex=0,run=spiderRun){
  if(run!==spiderRun)return;
  const p=R.spider.primary,secondary=R.spider.secondary;
  if(stage===0){show(resultShell(`<section class="spider-page spider-signal"><div class="web-mark">⟡</div><p class="eyebrow">ANOMALY DETECTED · DIMENSION 001</p><h1 class="glitch spider-impact" data-t="WAIT. HOLD UP.">WAIT. HOLD UP.</h1><p class="signal-line">AN UNIDENTIFIED SPIDER-SIGNAL HAS BEEN DETECTED.</p><div class="scan-orbit"><i></i><b>?</b></div><span class="comic-sfx">THWIP!</span><p class="fine">Your answers are opening a new identity file.</p></section>`,"SCANNING…",false));spiderTimers.push(setTimeout(()=>renderSpiderStage(1,0,run),900));return}
  if(stage===1){
    const scan=["CONNECTING TO THE MULTIVERSE...","ANALYSING YOUR PERSONALITY SIGNATURE...","SEARCHING FOR YOUR OTHER SELF..."];
    show(resultShell(`<section class="spider-page spider-scanning"><p class="eyebrow">MULTIVERSE SCANNER · ACTIVE</p><div class="scan-window"><div class="scan-lines"></div><div class="scan-web">╱╲╱╲╱╲╱╲</div><div class="scan-ring"><i></i><b>SPIDER<br>SIGNAL</b></div><span class="comic-sfx">ZAP!</span></div><h2 class="scan-copy" aria-live="polite">${scan[scanIndex]}</h2><div class="scan-meter"><i></i></div><p class="fine">Matching answer patterns to a stable identity signature…</p></section>`,"SCANNING…",false));
    if(scanIndex<2)spiderTimers.push(setTimeout(()=>renderSpiderStage(1,scanIndex+1,run),850));
    else spiderTimers.push(setTimeout(()=>revealSpiderCharacter(run),900));
    return
  }
}
async function revealSpiderCharacter(run){
  const identity=R.spider.primary,secondary=R.spider.secondary;
  const [hasPrimary,hasSecondary]=await Promise.all([SpiderVerse.availableArt(identity),secondary?SpiderVerse.availableArt(secondary):Promise.resolve(false)]);
  if(run!==spiderRun)return;
  identity.artAvailable=hasPrimary;
  if(secondary)secondary.artAvailable=hasSecondary;
  const traits=SpiderVerse.traits(R.e).join(" + ");
  const art=hasPrimary?`<img class="spider-character-art" src="${SpiderVerse.artUrl(identity)}" alt="Artwork for ${esc(identity.name)}">`:`<div class="art-needed"><b>CHARACTER ARTWORK NEEDED</b><code>assets/spider-verse/${identity.file}</code><span>Add licensed, commissioned, or original artwork for this identity.</span></div>`;
  const hybrid=secondary?`<p class="hybrid-signal">HYBRID SIGNAL · ${identity.name} × ${secondary.name}</p>`:"";
  show(resultShell(`<section class="spider-page spider-reveal" style="--identity-a:${identity.colors[0]};--identity-b:${identity.colors[1]}"><p class="eyebrow">IDENTITY MATCH CONFIRMED · ${identity.title.toUpperCase()}</p><div class="impact-burst">POW!</div><p class="reveal-intro">YOUR SPIDER IDENTITY IS...</p><div class="character-stage">${art}<div class="character-caption"><span>${identity.title}</span><b>${identity.name}</b></div></div><h1 class="glitch spider-name" data-t="YOU ARE THE ${identity.name.toUpperCase()} SPIDEY!">YOU ARE THE ${identity.name.toUpperCase()} SPIDEY!</h1>${hybrid}<p class="spider-blurb">${identity.blurb}</p><div class="spider-traits"><article><b>YOUR SUPERPOWER</b><p>${identity.superpower}</p></article><article><b>YOUR SIGNATURE MOVE</b><p>${identity.move} Your strongest signals: ${traits}.</p></article><article><b>YOUR CHAOTIC SIDE</b><p>${identity.chaos}</p></article><article><b>YOUR SPIDER WARNING</b><p>${identity.warning}</p></article></div></section>`,"CONTINUE TO EB RESONANCE →",true))
}
function statValues(){
  const e=R.e;
  return [
    ["CREATIVITY",e.C],
    ["PEOPLE ENERGY",(e.P+e.M)/2],
    ["STRATEGIC THINKING",(e.A+e.S)/2],
    ["EXECUTION",e.E],
    ["ADAPTABILITY",e.D],
    ["INITIATIVE",e.I]
  ]
}
function rgba(hex,alpha){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${n>>8&255},${n&255},${alpha})`}
function cardStat([label,value]){const n=Math.round(value*10);return `<div class="card-stat"><span>${label}</span><b>${n}</b><i><em style="width:${n}%"></em></i></div>`}
function card(A,m,d){
  const spider=R.spider.primary,identity=spider.name.toUpperCase()+" SPIDEY";
  return `<div id="card" class="collectible-card" style="--card-a:${spider.colors[0]};--card-b:${spider.colors[1]};--card-glow:${rgba(spider.colors[0],.25)}"><header class="card-top"><div><b class="card-logo">ALTEREGO</b><span>MULTIVERSE CHARACTER FILE</span></div><div class="rarity-badge ${R.rarity.toLowerCase()}">${R.rarity}</div><code>UNIVERSE ID · ${R.universeCode}</code></header><section class="card-hero"><img class="participant-portrait" src="${st.photo}" alt="${esc(st.name)} portrait"><div class="portrait-shade"></div><div class="card-identity"><span>PERSONALITY ARCHETYPE</span><h2>${esc(A.t)}</h2><b>${esc(identity)}</b></div></section><section class="card-stats"><h3>CHARACTER STATS</h3>${statValues().map(cardStat).join("")}</section><section class="card-results"><div><span>EB RESONANCE</span><b>${esc(m.name)}</b></div><div><span>DEPARTMENT ALIGNMENT</span><b>${esc(DEPT[d.k].n)}</b></div><div><span>PERSONALITY</span><b>${esc(A.t)}</b></div><div><span>SPIDER IDENTITY</span><b>${esc(identity)}</b></div></section><section class="card-match-section"><h3>EB RESONANCE · ALL SIX</h3>${R.eb.map(({m:member,s})=>`<div class="card-match-row"><span>${esc(member.name)}</span><b>${s}%</b></div>`).join('')}</section><section class="card-match-section"><h3>DEPARTMENT ALIGNMENT · ALL FIVE</h3>${R.dp.map(({k,s})=>`<div class="card-match-row"><span>${esc(DEPT[k].n)}</span><b>${s}%</b></div>`).join('')}</section><footer class="card-footer"><b>YOUR PERSONALITY. YOUR PEOPLE. YOUR POTENTIAL.</b><span>AIESEC IN AMARAVATI · ${R.universeCode}</span></footer></div>`
}
function playAgain(){st.ans=[];st.i=0;step=0;R=null;landing()}
const ini=n=>n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
const av=m=>`<div class="av"><span>${ini(m.name)}</span><img src="assets/eb/${m.photo||m.id+'.jpg'}" onerror="this.remove()"></div>`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function dl(){
  const status=$("#download-status"),cardElement=$("#card"),button=document.querySelector('.card-result .btn');
  if(!cardElement||!status)return;
  if(button){button.disabled=true;button.textContent="PREPARING YOUR CARD…"}
  status.textContent="Preparing your high-resolution character card…";
  try{
    if(!window.html2canvas){
      for(const src of [
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
        "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
      ]){
        try{await new Promise((resolve,reject)=>{const script=document.createElement("script");script.src=src;script.onload=resolve;script.onerror=()=>reject(new Error("Image renderer failed to load"));document.head.appendChild(script)});if(window.html2canvas)break}catch{}
      }
    }
    if(!window.html2canvas)throw new Error("Card renderer is unavailable");
    await document.fonts.ready;
    await Promise.all([...cardElement.querySelectorAll("img")].map(image=>{
      if(image.complete)return image.naturalWidth?Promise.resolve():Promise.reject(new Error(`Image failed to load: ${image.alt||image.src}`));
      return new Promise((resolve,reject)=>{
        image.addEventListener("load",resolve,{once:true});
        image.addEventListener("error",()=>reject(new Error(`Image failed to load: ${image.alt||image.src}`)),{once:true});
      });
    }));
    const canvas=await html2canvas(cardElement,{
      scale:3,
      backgroundColor:"#090c14",
      useCORS:false,
      logging:false,
      windowWidth:700,
      onclone:clonedDocument=>{
        const exportCard=clonedDocument.querySelector("#card");
        exportCard.style.width="500px";
        exportCard.style.maxWidth="500px";
        exportCard.style.margin="0";
        exportCard.style.padding="20px";
        exportCard.style.boxSizing="border-box";
      }
    });
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/png"));
    if(!blob)throw new Error("Could not create the card image");
    const url=URL.createObjectURL(blob),link=document.createElement("a");link.download=`alterego-${R.universeCode}.png`;link.href=url;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent="Your character card is ready to share.";
  }catch(error){console.error("Character card export failed:",error);status.textContent="Could not download the card. Check your connection and try again."}
  finally{if(button){button.disabled=false;button.textContent="DOWNLOAD YOUR CHARACTER CARD"}}
}
landing();
landing();
