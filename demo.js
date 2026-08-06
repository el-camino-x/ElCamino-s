(function () {
  if (window.__EL_CAMINO_LOADED__) return;
  window.__EL_CAMINO_LOADED__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbz_6YJA1h_18ne-CU6e7J73zW2EM3Z4qXsxdxCTVVwK12SkEdgOi9PxG4-2pJNjXL-C/exec";

  window.__ENGINE_RUNNING__ = false;

  window.__CAMINO_CLICKSTER__ = false;
  let caminoClicksterTimer = null;
  // =========================
  // WHITELIST AUTH SYSTEM
  // =========================
  const WHITELIST = [
  "phpradanicky",
  "pradarega",
  "phpradatiaamanda",
  "pradasiddik",
  "admin4"
];

  function sendLog(type, reason) {
  try {
    fetch(EXEC + "?log=" + encodeURIComponent(JSON.stringify({
      localTime: new Date().toISOString(),
      user: getCurrentUser(),
      type: type,
      reason: reason,
      url: location.href
    })));
  } catch (e) {}
}
  
  function getCurrentUser() {
  const el = document.querySelector('#userMenuButton');
  if (!el) return null;

  const text = el.innerText || '';

  const match = text.match(/\(([^)]+)\)/);
  return match ? match[1].trim() : null;
}

  function isAuthorized() {
    const user = getCurrentUser();
    return user && WHITELIST.includes(user);
  }
  
  function unlock() {
    window.__ENGINE_RUNNING__ = false;
  }

  function getCfg() {
    return JSON.parse(localStorage.getItem('PAY_CFG') || '{}');
  }

  function p(v) {
    if (!v) return 0;
    v = v.toString().replace(/[^0-9.,]/g, '');

    if (v.includes(',') && v.includes('.')) {
      v = v.lastIndexOf(',') > v.lastIndexOf('.') ?
        v.replace(/\./g, '').replace(',', '.') :
        v.replace(/,/g, '');
    } else if (v.includes(',')) {
      v = v.split(',').length > 2 ? v.replace(/,/g, '') : v.replace(',', '.');
    } else {
      v = v.replace(/\./g, '');
    }

    let n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  const BLOCK = ['NEW REGISTRATION', 'SUSPICIOUS'];

  // =========================
  // UI CONTROL PANEL
  // =========================
  function ui() {
    if (document.getElementById('payHostUI')) return;

    if (!document.body) {
      setTimeout(ui, 200);
      return;
    }

    let host = document.createElement('div');
    host.id = 'payHostUI';
    host.style = 'position:fixed;top:60px;left:60px;z-index:999999';

    let sh = host.attachShadow({ mode: 'open' });

    let style = document.createElement('style');
    style.textContent = `
      .p{background:#111;color:#fff;border-radius:15px;font-family:Inter,Arial,sans-serif;width:420px;height:750px;resize:both;overflow-y:auto;overflow-x:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);position:relative;scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:rgba(143,191,255,.35) transparent;box-sizing:border-box;padding:3px;}

.p::-webkit-scrollbar{width:3px}
.p::-webkit-scrollbar-track{background:transparent}
.p::-webkit-scrollbar-thumb{background:rgba(143,191,255,.45);border-radius:10px}
.p::-webkit-scrollbar-thumb:hover{background:rgba(143,191,255,.75)}

.h{cursor:move;background:linear-gradient(135deg,#1a1a1a,#222);padding:14px;font-size:16px;font-weight:bold;letter-spacing:.5px;border-bottom:1px solid rgba(255,255,255,.1);}

.status-dot{display:inline-block;width:8px;height:8px;margin-right:8px;border-radius:50%;background:#8fbfff;box-shadow:0 0 10px #8fbfff,0 0 20px rgba(143,191,255,.8);animation:statusPulse 1.5s infinite;vertical-align:middle}@keyframes statusPulse{0%,100%{opacity:.4;transform:scale(.8);box-shadow:0 0 5px #8fbfff}50%{opacity:1;transform:scale(1.2);box-shadow:0 0 15px #8fbfff,0 0 30px rgba(143,191,255,.8)}}

.h{position:relative;overflow:hidden}.h::before{content:"";position:absolute;top:0;left:-120%;width:80%;height:100%;background:linear-gradient(120deg,transparent,rgba(143,191,255,.35),transparent);transform:skewX(-25deg);animation:titleScan 4s infinite}@keyframes titleScan{0%{left:-120%}30%,100%{left:140%}}.h{color:#fff;text-shadow:0 0 5px rgba(143,191,255,.4),0 0 15px rgba(143,191,255,.25);animation:titlePulse 3s infinite}@keyframes titlePulse{0%,100%{text-shadow:0 0 5px rgba(143,191,255,.3),0 0 15px rgba(143,191,255,.2)}50%{text-shadow:0 0 10px #8fbfff,0 0 25px rgba(143,191,255,.6)}}

.b{padding:14px 16px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;}
.b label{display:flex;align-items:center;gap:6px}

.btns{grid-column:1/-1;display:flex;flex-direction:column;gap:10px;margin-top:15px;padding:0 8px;}

.header-info{float:right;cursor:pointer;font-size:18px;color:#8fbfff;}

.cutoff-popup{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.85);width:380px;background:#111;border:1px solid rgba(143,191,255,.4);border-radius:18px;padding:25px;z-index:999999;box-shadow:0 0 40px #000;font-size:16px;line-height:2;letter-spacing:.5px;font-weight:600;color:#fff;text-shadow:0 0 8px rgba(143,191,255,.35);cursor:default;opacity:0;visibility:hidden;transition:opacity .25s ease,transform .25s ease;will-change:left,top;user-select:none;}

.cutoff-popup h3{margin-top:0;color:#8fbfff;font-size:24px;padding-right:35px;cursor:move;letter-spacing:1px;font-weight:900;text-shadow:0 0 12px rgba(143,191,255,.7);}

.cutoff-close{position:absolute;right:15px;top:12px;cursor:pointer;color:#ff2b2b;font-size:20px;font-weight:900;transition:.2s;text-shadow:0 0 10px rgba(255,0,0,.8);}

.cutoff-popup.show{opacity:1;visibility:visible;transform:translate(-50%,-50%) scale(1);animation:cutoffGlow .35s ease;}@keyframes cutoffGlow{0%{box-shadow:0 0 0 rgba(143,191,255,0);}100%{box-shadow:0 0 40px #000,0 0 25px rgba(143,191,255,.25);}}

.cutoff-close:hover{color:#ff6666;transform:scale(1.15);}

#BLOCK_STATUS{width:100%;box-sizing:border-box;margin:5px auto 12px auto;padding:14px;border-radius:14px;background:linear-gradient(135deg,rgba(143,191,255,.18),rgba(143,191,255,.05));border:1px solid rgba(143,191,255,.4);color:#8fbfff;font-size:14px;font-weight:900;letter-spacing:1px;text-align:center;display:flex;align-items:center;justify-content:center;box-shadow:0 0 15px rgba(143,191,255,.25),inset 0 0 15px rgba(143,191,255,.08);animation:blockPulse 2s infinite;}

.info{grid-column:1/-1;margin-top:12px;padding:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:14px;}

.logo{width:14px;height:14px;vertical-align:middle;margin-right:6px;border-radius:3px}

.limit-box{grid-column:1/-1;margin:10px 8px 0;padding:10px;background:rgba(255,255,255,.05);border:1px solid rgba(143,191,255,.15);border-radius:10px;backdrop-filter:blur(8px);box-shadow:inset 0 0 15px rgba(255,255,255,.03);}

.limit-box label{display:block;font-size:11px;margin-bottom:7px;color:#8fbfff;font-weight:600;letter-spacing:1px;text-transform:uppercase;}

.limit-box input{width:100%;box-sizing:border-box;padding:9px 12px;border-radius:10px;border:1px solid rgba(143,191,255,.25);background:rgba(0,0,0,.35);color:#fff;outline:none;font-size:13px;font-weight:600;letter-spacing:.5px;transition:.25s ease;box-shadow:0 4px 12px rgba(0,0,0,.25);}

.limit-box input::placeholder{color:rgba(255,255,255,.35);font-weight:400}
.limit-box input:hover{border-color:rgba(143,191,255,.5)}
.limit-box input:focus{border-color:#8fbfff;background:rgba(10,20,35,.75);box-shadow:0 0 12px rgba(143,191,255,.35),inset 0 0 8px rgba(143,191,255,.08)}
.limit-box input::-webkit-inner-spin-button,.limit-box input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
.limit-box input{-moz-appearance:textfield}

.row2{display:flex;gap:6px}
.row2 button{flex:1}

button{width:100%;padding:12px;font-size:13px;border:none;border-radius:12px;background:rgba(42,82,152,.85);color:#fff;font-weight:600;cursor:pointer;transition:.2s;box-shadow:0 5px 15px rgba(0,0,0,.3);}

button:hover{transform:translateY(-1px)scale(1.02);background:rgba(58,110,200,.85);box-shadow:0 6px 18px rgba(0,0,0,.35),0 0 10px rgba(143,191,255,.25);}

button:active{transform:translateY(0)scale(.98);box-shadow:0 2px 8px rgba(0,0,0,.25);}

.ft{margin-top:auto;padding:6px 10px;overflow:hidden;mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent)}

.marq{display:inline-block;white-space:nowrap;will-change:transform;animation:mar 48s linear infinite;color:#8fbfff}

.marq span{padding-right:90px}

@keyframes mar{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

.section{grid-column:1/-1;background:rgba(255,255,255,.04);border:1px solid rgba(143,191,255,.18);border-radius:14px;padding:12px;margin-top:10px;}

.cutoff-popup{font-size:14px;font-weight:600;line-height:1.9;letter-spacing:.4px;color:#fff}.cutoff-popup h3{font-size:17px;font-weight:800;color:#8fbfff;text-shadow:0 0 8px rgba(143,191,255,.5)}.cutoff-popup b{font-size:15px;font-weight:700;color:#fff}.cutoff-popup img.logo{width:17px;height:17px;vertical-align:middle;margin-right:7px}

.section-title{font-size:12px;font-weight:800;color:#8fbfff;letter-spacing:1px;margin-bottom:10px;text-transform:uppercase;}

.bank-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}

.bank-grid label{position:relative;overflow:hidden;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.08);color:#777;cursor:pointer;transition:.3s ease;box-shadow:inset 0 0 15px rgba(0,0,0,.4)}.bank-grid label::before{content:"";position:absolute;top:0;left:-120%;width:80%;height:100%;background:linear-gradient(90deg,transparent,rgba(143,191,255,.5),transparent);transform:skewX(-25deg);transition:.5s}.bank-grid label:hover::before{left:130%}.bank-grid label:has(input:checked){background:linear-gradient(135deg,rgba(143,191,255,.25),rgba(143,191,255,.08));border-color:#8fbfff;color:#fff;box-shadow:0 0 15px rgba(143,191,255,.35),inset 0 0 20px rgba(143,191,255,.1);transform:scale(1.03)}.bank-grid label:has(input:checked)::before{animation:bankLight .8s ease}@keyframes bankLight{0%{left:-120%}100%{left:130%}}.bank-grid input{appearance:none;width:16px;height:16px;border-radius:50%;background:#222;border:1px solid rgba(255,255,255,.2);position:relative;transition:.25s}.bank-grid input:checked{background:#8fbfff;box-shadow:0 0 10px #8fbfff,0 0 20px rgba(143,191,255,.7)}.bank-grid input:checked::after{content:"";position:absolute;width:6px;height:6px;background:white;border-radius:50%;top:4px;left:4px}

.cutoff-content{font-size:22px;font-weight:700;line-height:2;letter-spacing:.8px;color:#fff;text-shadow:0 0 8px rgba(143,191,255,.35);}

.cutoff-content b{font-size:23px;font-weight:900;color:#8fbfff;}

.limit-title{font-size:12px;font-weight:bold;color:#8fbfff;margin-bottom:8px;}

input[type="checkbox"]{width:15px;height:15px;}

.quote{margin-top:12px;text-align:center;font-size:14px;font-weight:800;color:#fff;font-style:normal;line-height:1.6;letter-spacing:.5px;text-shadow:0 0 8px rgba(143,191,255,.45);}
`;

    let w = document.createElement('div');
    w.className = 'p';

    w.innerHTML = `
<div class="h">
<span class="status-dot"></span> ElCamino-爱 Operation V1.3

<span class="header-info" id="infoCutoff">
ⓘ
</span>

</div>


<div class="cutoff-popup" id="cutoffPopup">

<span class="cutoff-close" id="closeCutoff">
✕
</span>

<h3>
ⓘ BOX INFORMATION
</h3>

<div class="cutoff-content">
  <b><img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/021/616/845/small/banking-3d-render-icon-illustration-png.png"> BANK CUT OFF</b>
  
  <br><br><img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/065/645/small_2x/dana-logo-square-rounded-dana-logo-free-download-dana-logo-free-png.png"> DANA : 00.00 - 00.03<br>
  <img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/065/651/small_2x/ovo-logo-square-rounded-ovo-logo-free-download-ovo-logo-free-png.png"> OVO : 00.00 - 00.03<br>
  <img class="logo" src="https://static.vecteezy.com/system/resources/previews/067/065/676/non_2x/gopay-logo-square-rounded-gopay-logo-free-download-gopay-logo-free-png.png"> GOPAY : 00.00 - 00.04<br><br>

  <img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/565/518/small_2x/bank-bca-square-rounded-logo-free-png.png"> BCA : 00.00 - 00.05<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/previews/067/565/519/non_2x/seabank-square-rounded-logo-transparent-without-background-free-png.png"> SEABANK : 00.00 - 00.15<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/previews/067/565/455/non_2x/bank-syariah-indonesia-square-rounded-logo-transparent-without-background-free-png.png"> BSI : 00.00 - 00.15<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/previews/067/565/533/non_2x/bank-jago-square-rounded-logo-transparent-without-background-free-png.png"> JAGO : 00.00 - 00.15<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/previews/067/565/453/non_2x/maybank-indonesia-square-rounded-logo-transparent-without-background-free-png.png"> MAYBANK : 00.00 - 00.15<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/565/464/small_2x/permata-bank-square-rounded-logo-transparent-without-background-free-png.png"> PERMATA : 00.00 - 00.15<br><br>

<img class="logo" src="https://static.vecteezy.com/system/resources/previews/055/553/741/non_2x/mandri-mobile-phone-app-logo-free-png.png"> MANDIRI : 23.00 - 02.00<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/565/461/small_2x/bank-bri-official-square-rounded-logo-free-png.png"> BRI : 23.50 - 02.45<br>
<img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/565/468/small_2x/bank-bni-square-rounded-logo-free-png.png"> BNI : 23.00 - 03.00

</div>
</div>

      <div class="section">

<div class="section-title">
BANK FILTER
</div>

<div class="bank-grid">

<label><input id="DANA" type="checkbox"> DANA</label>
<label><input id="OVO" type="checkbox"> OVO</label>

<label><input id="GOPAY" type="checkbox"> GOPAY</label>
<label><input id="BCA" type="checkbox"> BCA</label>

<label><input id="BNI" type="checkbox"> BNI</label>
<label><input id="BRI" type="checkbox"> BRI</label>

<label><input id="MANDIRI" type="checkbox"> MANDIRI</label>
<label><input id="BSI" type="checkbox"> BSI</label>

<label><input id="JAGO" type="checkbox"> JAGO</label>
<label><input id="PERMATA" type="checkbox"> PERMATA</label>

<label><input id="MAYBANK" type="checkbox"> MAYBANK</label>
<label><input id="SEABANK" type="checkbox"> SEABANK</label>

</div>

</div>
    
      <div class="limit-box">
        <label>APPROVE LIMIT</label>
          <input id="APPROVE_LIMIT" type="text" placeholder="Masukan Limit Approve">
      </div>

<div class="btns">

  <div class="row2">
    <button id="sv">SAVE</button>
    <button id="clicksterBtn">START</button>
  </div>

  <div class="row2">
    <button id="ca">CHECK ALL</button>
    <button id="uc">UNCHECK</button>
  </div>

</div>

        <div class="info">

<div id="BLOCK_STATUS">
  🔒 BLOCK ID : LOADING...
</div>

  <div class="quote">
    PRINSIP HIDUP ADA DUA, 
    <br>SATU TAU DIRI,DUA TAU MALU
  </div>
        
      </div>

      <div class="ft">
        <div class="marq">
          <span>EL CAMINO’S SOLDATO • PRIVATE OPERATIONS NETWORK • DISCREET SYSTEM ACTIVE • GLOBAL TRANSACTIONS FLOWING •</span>
          <span>EL CAMINO’S SOLDATO • PRIVATE OPERATIONS NETWORK • DISCREET SYSTEM ACTIVE • GLOBAL TRANSACTIONS FLOWING •</span>
        </div>
      </div>
    `;

sh.appendChild(style);
sh.appendChild(w);
document.body.appendChild(host);

const infoBtn = w.querySelector('#infoCutoff');
const popup = w.querySelector('#cutoffPopup');
const close = w.querySelector('#closeCutoff');

if (infoBtn && popup && close) {

infoBtn.onclick = () => {
  popup.classList.add("show");
};

close.onclick = () => {
  popup.classList.remove("show");
};

}

let dragCutoff = false;
let cutoffX = 0;
let cutoffY = 0;

const cutoffHeader = popup.querySelector('h3');

cutoffHeader.addEventListener('mousedown',(e)=>{

  dragCutoff=true;

  const rect=popup.getBoundingClientRect();

  popup.style.left=rect.left+"px";
  popup.style.top=rect.top+"px";
  popup.style.transform="none";
  popup.style.transition="none";

  cutoffX=e.clientX-rect.left;
  cutoffY=e.clientY-rect.top;

  e.preventDefault();

});


document.addEventListener('mousemove',(e)=>{
  if(!dragCutoff)return;

  popup.style.left=(e.clientX-cutoffX)+"px";
  popup.style.top=(e.clientY-cutoffY)+"px";
});

document.addEventListener('mouseup',()=>{
  if(!dragCutoff)return;
  dragCutoff=false;
});

const limitInput = w.querySelector('#APPROVE_LIMIT');

limitInput.addEventListener('input', function(){
  let value = this.value.replace(/,/g,'').replace(/\D/g,'');

  if(value){
    this.value = Number(value).toLocaleString('en-US');
  }
});
    
    let keys = ['DANA','OVO','GOPAY','BCA','BNI','BRI','MANDIRI','BSI','JAGO','PERMATA','MAYBANK','SEABANK'];
    let cfg = getCfg();
    let savedLimit = Number(localStorage.getItem('APPROVE_LIMIT') || 5000000);

w.querySelector('#APPROVE_LIMIT').value = savedLimit.toLocaleString('en-US');

    keys.forEach(k => {
      let el = w.querySelector('#' + k);
      if (el) el.checked = cfg[k] === true;
    });

w.querySelector('#sv').onclick = () => {

    let o = {};

    keys.forEach(k => {
        o[k] = w.querySelector('#' + k).checked;
    });

    localStorage.setItem('PAY_CFG', JSON.stringify(o));


    let limit = Number(
        w.querySelector('#APPROVE_LIMIT').value.replace(/,/g,'')
    );


    if (!limit) {
        limit = 5000000;
    }

    if (limit < 50000) {
        limit = 50000;
    }

    if (limit > 5000000) {
        limit = 5000000;
    }

  localStorage.setItem('APPROVE_LIMIT', limit);

  w.querySelector('#APPROVE_LIMIT').value = limit.toLocaleString('en-US');
      
  alert('Saved');
};

const clicksterBtn = w.querySelector('#clicksterBtn');
clicksterBtn.style.background = "#2e7d32";

clicksterBtn.onclick = () => {

if (!window.__CAMINO_CLICKSTER__) {

    startCaminoClickster();
    clicksterBtn.innerHTML = "STOP";
    clicksterBtn.style.background = "#c62828";

} else {

    stopCaminoClickster();
    clicksterBtn.innerHTML = "START";
    clicksterBtn.style.background = "#2e7d32";

}

};

    w.querySelector('#ca').onclick = () => keys.forEach(k => w.querySelector('#' + k).checked = true);
    w.querySelector('#uc').onclick = () => keys.forEach(k => w.querySelector('#' + k).checked = false);
    
    // =========================
    // DRAG FIX (NEW)
    // =========================
    let h = w.querySelector('.h');
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    h.addEventListener('mousedown', (e) => {
      dragging = true;

      const rect = host.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      host.style.position = 'fixed';
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;

      host.style.left = (e.clientX - offsetX) + 'px';
      host.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
      dragging = false;
    });
  }

  // =========================
  // INJECT BUTTON
  // =========================
  function injectCaminoButton() {
    const btn = document.getElementById('btnSearch');
    if (!btn || document.getElementById('btnElCamino')) return;

    const cam = document.createElement('button');
    cam.id = 'btnElCamino';
    cam.type = 'button';
    cam.innerHTML = 'EL CAMINO';
    cam.className = btn.className;
    cam.style.marginLeft = '8px';

    cam.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  // 🔐 AUTH CHECk
if (!isAuthorized()) {
  sendLog("UNAUTHORIZED", "user not in whitelist");
  prankFullscreen();
  return;
}

      
  if (window.__ENGINE_RUNNING__) return;
  window.__ENGINE_RUNNING__ = true;

  btn.click();
  startEngine();
});

    btn.insertAdjacentElement('afterend', cam);
  }

  // =========================
  // ENGINE
  // =========================
  function startEngine() {
    let l = 0, s = 0;

    
    const iv = setInterval(() => {
      if (!window.__ENGINE_RUNNING__) {
        clearInterval(iv);
        return;
      }

      let rows = document.querySelectorAll('table tbody tr').length;

      if (rows == l) s++;
      else { s = 0; l = rows; }

      if (s < 3) return;

      clearInterval(iv);
      runFlow();
    }, 400);
  }

  // =========================
  // CUSTOM GIF
  // =========================
  function customFilterBoxTheme() {
  const box = document.querySelector('.filter-box');
  if (!box || box.dataset.caminoTheme) return;

  box.dataset.caminoTheme = "1";

  // =========================
  // BASE STYLE BOX ONLY
  // =========================
  box.style.position = "relative";
  box.style.overflow = "hidden";
  box.style.borderRadius = "12px";
  box.style.background = "transparent";

  // =========================
  // GIF LAYER
  // =========================
  const gif = document.createElement("div");
  gif.style.cssText = `
    position:absolute;
    inset:0;
    z-index:0;
    pointer-events:none;
    background-image:url("https://i.postimg.cc/L6fQNJP9/image.png");
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
  `;

  // =========================
  // DARK OVERLAY
  // =========================
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:absolute;
    inset:0;
    z-index:1;
    pointer-events:none;
    background:rgba(5,10,20,.75);
    backdrop-filter:blur(2px);
  `;

  box.prepend(gif);
  box.appendChild(overlay);

  // =========================
  // KEEP ALL CONTENT ABOVE LAYER
  // =========================
  box.querySelectorAll("*").forEach(el => {
    if (el === gif || el === overlay) return;
    el.style.position = "relative";
    el.style.zIndex = "2";
  });

  // =========================
  // UI BACKGROUND CLEAN ONLY
  // =========================
  box.querySelectorAll(`
    .content-filter,
    .treeSelector-container,
    .treeSelector-wrapper,
    .treeSelector-input-box,
    .selector,
    .switch-container,
    .filter-container,
    input,
    select
  `).forEach(el => {
    el.style.background = "rgba(10,20,35,.45)";
    el.style.borderColor = "rgba(255,255,255,.15)";
  });

  // =========================
  // TEXT COLOR ONLY 
  // =========================
  box.querySelectorAll("label, span, a, i, div").forEach(el => {
    el.style.color = "#fff";
  });

  // =========================
  // SWITCH FIX 
  // =========================
  box.querySelectorAll('.switch').forEach(el => {
    el.style.display = "inline-flex";
    el.style.alignItems = "center";
  });

  box.querySelectorAll('.slider').forEach(el => {
    el.style.flexShrink = "0";
  });
    
  // =========================
  // HIDE SWITCH CONTAINER 
  // =========================
  if (!document.getElementById("camino-hide-switch")) {
    const style = document.createElement("style");
    style.id = "camino-hide-switch";
    style.textContent = `
      .switch-container {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

  // =========================
  // BLOCK ID
  // =========================
  
  let BLOCK_ID = [];
  let BLOCK_READY = false;
  
  // =========================
  // FLOW
  // =========================
  function runFlow() {

    if(!BLOCK_READY){
        console.log("BLOCK ID masih loading");
        unlock();
        return;
    }
    
    let cfg = getCfg();
    let valid = [];

    document.querySelectorAll('table tbody tr').forEach(tr => {
      let tds = tr.querySelectorAll('td');

      let idUser = (tds[4]?.innerText || '').trim();

      if (
  BLOCK_ID.some(
    id => id.toString().trim().toLowerCase() === idUser.toLowerCase()
  )
) return;
      
      let full = (tr.innerText || '').toUpperCase();
      let td8 = (tds[7]?.innerText || '').toUpperCase();

      if (BLOCK.some(b => full.includes(b))) return;
      if (BLOCK.some(b => td8.includes(b))) return;

      let td6 = tds[5];
      let lines = (td6?.innerText || '').split('\n').map(e => e.trim()).filter(Boolean);
      let method = (lines[1] || '').toUpperCase();
      if (!cfg[method]) return;

      let a = p(tds[6]?.innerText || '');
      let b = p(tds[8]?.innerText || '');
      let total = a + b;

      let approveLimit = Number(
  localStorage.getItem('APPROVE_LIMIT') || 5000000
);

if (a > approveLimit) return;
      if (total >= 50000000) return;

      valid.push(tr);
    });

    if (!valid.length) {
      
      unlock();
      document.getElementById('btnSearch')?.click();
      return;
    }

    valid.forEach(tr => {
      let cb = tr.querySelector('input[type=checkbox],td.select-checkbox,.select-checkbox,[type=checkbox]');
      if (cb) {
        cb.click();
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    let out = [];

    valid.forEach(tr => {
      let t = tr.querySelectorAll('td');

      let td6 = t[5];
      let lines = (td6?.innerText || '').split('\n').map(e => e.trim()).filter(Boolean);

      out.push({
        bank: lines[1] || '',
        time: (t[2]?.innerText || '').split('\n')[1]?.trim() || '',
        tiket: (t[3]?.innerText || '').trim(),
        user: (t[4]?.innerText || '').trim(),
        name: lines[0] || '',
        rek: lines.find(e => /^\d{6,}$/.test(e)) || '',
        amount: p(t[6]?.innerText || ''),
        remark: 'PAYMENT-GROUP'
      });
    });

    fetch(EXEC + "?data=" + encodeURIComponent(JSON.stringify(out))).catch(() => {});

    let ddl = document.getElementById('ddlMultiCompanyBank');
    if (ddl) {
      ddl.value = '5f71a42e-69e1-43bb-a51b-220c409dcd1d';
      ddl.dispatchEvent(new Event('change', { bubbles: true }));
      if (window.jQuery) jQuery(ddl).trigger('change');
    }

    let iv2 = setInterval(() => {
      let sel = document.querySelectorAll('tr.selected,input[type=checkbox]:checked').length;
      let btn = document.getElementById('btnMultipleApproveBeforeDialog');

      if (sel === 0) {
        clearInterval(iv2);
        unlock();
        document.getElementById('btnSearch')?.click();
        return;
      }

      if (btn && sel) {
        clearInterval(iv2);

        setTimeout(() => {
          btn.click();

          let iv3 = setInterval(() => {
            let ya = document.getElementById('btnMultipleApprove');
            if (ya) {
              ya.click();
              clearInterval(iv3);

              let iv4 = setInterval(() => {
                let ok = document.querySelector('.swal2-confirm.swal2-confirm-button-custom');
                if (ok && ok.offsetParent !== null) {
                  ok.click();
                  clearInterval(iv4);

                  setTimeout(() => {
                    sendLog("ENGINE_DONE", "flow completed");

                    unlock();
                    document.getElementById('btnSearch')?.click();
                  }, 300);
                }
              }, 200);
            }
          }, 200);
        }, 300);
      }
    }, 150);
  }


  // =========================
  // JANGAN BANDAL
  // =========================
function prankFullscreen() {
  const div = document.createElement("div");

  div.style.cssText = `
    position:fixed;
    inset:0;
    width:100vw;
    height:100vh;
    background:#000;
    z-index:2147483647;
    display:flex;
    align-items:center;
    justify-content:center;
  `;

  div.innerHTML = `
  <img src="https://c.tenor.com/MY6Oiygedx0AAAAd/tenor.gif"
       style="
       width:100vw;
       height:100vh;
       object-fit:cover;
       ">
`;

  document.body.appendChild(div);

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(()=>{});
  }

  setTimeout(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch(e){}
    }

    div.remove();
    alert("Unauthorized user");
    location.reload();
  }, 6000);
}

async function loadBlockID(){

  let status = document
    .getElementById('payHostUI')
    ?.shadowRoot
    ?.querySelector('#BLOCK_STATUS');

  if(status){
    status.innerHTML = "🔄 BLOCK ID : SYNCING...";
  }

  try{

    let res = await fetch(
      EXEC + "?action=getBlock"
    );

BLOCK_ID = await res.json();

BLOCK_READY = true;

console.log("BLOCK ID LOADED:", BLOCK_ID);

let status = document
  .getElementById('payHostUI')
  ?.shadowRoot
  ?.querySelector('#BLOCK_STATUS');

if(status){
  status.innerHTML = 
    "🔒 BLOCK ID : " + BLOCK_ID.length + " USER";
}

  }catch(e){

  BLOCK_ID = [];
  BLOCK_READY = false;

  let status = document
  .getElementById('payHostUI')
  ?.shadowRoot
  ?.querySelector('#BLOCK_STATUS');

  if(status){
    status.innerHTML = "🔴 BLOCK ID OFFLINE";
  }

}

}
  
function startCaminoClickster(){

    if(caminoClicksterTimer) return;
    window.__CAMINO_CLICKSTER__ = true;
    caminoClicksterTimer = setInterval(()=>{
        if(!window.__CAMINO_CLICKSTER__) return;
        let btn = document.getElementById(
            "btnElCamino"
        );
        if(btn){
            btn.click();
        }
    },5000);
}



function stopCaminoClickster(){


    window.__CAMINO_CLICKSTER__ = false;


    if(caminoClicksterTimer){

        clearInterval(caminoClicksterTimer);

        caminoClicksterTimer = null;

    }

}

  // =========================
  // INIT
  // =========================
  function waitForUser(cb) {
  const iv = setInterval(() => {
    const user = getCurrentUser();
    if (user) {
      clearInterval(iv);
      cb(user);
    }
  }, 300);
  }
  
ui();

setTimeout(() => {
  loadBlockID();
}, 500);

setInterval(() => {
  loadBlockID();
}, 10000);

waitForUser(() => {
  injectCaminoButton();
});

customFilterBoxTheme();

})();
