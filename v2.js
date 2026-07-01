(function () {
  if (window.__EL_CAMINO_LOADED__) return;
  window.__EL_CAMINO_LOADED__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";

  window.__ENGINE_RUNNING__ = false;

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
  // INFORMATION TEXT
  // =========================
  const INFORMATION = `
📌 BANK CUT OFF INFORMATION

💳 E-WALLET
• DANA   : 00.00 - 00.03
• OVO    : 00.00 - 00.03

🏦 BANK ONLINE
• BCA     : 00.00 - 00.05
• SEABANK : 00.00 - 00.15
• BSI     : 00.00 - 00.15
• JAGO    : 00.00 - 00.15
• MAYBANK : 00.00 - 00.15
• PERMATA : 00.00 - 00.15

⛔ MAINTENANCE
• BNI     : 23.00 - 03.00
• MANDIRI : 23.00 - 02.00
• BRI     : 23.50 - 02.30
• GOPAY   : 23.30 - 00.30
`;

  // =========================
  // UI PANEL
  // =========================
  function ui() {
    if (document.getElementById('payHostUI')) return;
    if (!document.body) return setTimeout(ui, 200);

    const host = document.createElement('div');
    host.id = 'payHostUI';
    host.style = 'position:fixed;top:100px;left:100px;z-index:999999';

    const sh = host.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      .p{
        background:#111;
        color:#fff;
        border-radius:12px;
        font-family:Arial;
        width:280px;
        height:460px;
        resize:both;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,.5);
        position:relative;
        padding-bottom:28px;
      }

      .h{
        cursor:move;
        background:#222;
        padding:8px;
        font-weight:bold;
        user-select:none;
      }

      .b{
        padding:10px;
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:6px;
        font-size:12px;
      }

      .b label{
        display:flex;
        align-items:center;
        gap:6px;
      }

      .btns{
        grid-column:1/-1;
        display:flex;
        flex-direction:column;
        gap:6px;
        margin-top:8px;
      }

      .row2{
        display:flex;
        gap:6px;
      }

      .row2 button{
        flex:1;
      }

      button{
        width:100%;
        padding:6px;
        font-size:11px;
        border:none;
        border-radius:8px;
        background:#2a5298;
        color:#fff;
        font-weight:500;
        cursor:pointer;
      }

      button:hover{
        filter:brightness(1.1);
      }

      /* INFO BOX */
      .infoBox{
        grid-column:1/-1;
        background:rgba(20,30,50,.65);
        border:1px solid rgba(255,255,255,.08);
        border-radius:10px;
        padding:10px;
        font-size:10px;
        white-space:pre-line;
        line-height:1.35;
        max-height:150px;
        overflow:auto;
        margin-top:8px;
      }

      /* ===== PREMIUM SCROLLBAR ===== */
.infoBox::-webkit-scrollbar {
  width: 6px;
}

.infoBox::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}

.infoBox::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #2a5298, #1b3b6f);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
}

.infoBox::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #3b6fd6, #2a5298);
}

/* Firefox */
.infoBox {
  scrollbar-width: thin;
  scrollbar-color: #2a5298 rgba(255,255,255,0.05);
}

      /* FOOTER FIX (NO OVERLAP) */
      .ft{
        position:absolute;
        bottom:0;
        left:0;
        right:0;
        padding:6px 10px;
        overflow:hidden;
        background:rgba(10,15,25,.7);
        backdrop-filter:blur(2px);
      }

      .marq{
        display:inline-block;
        white-space:nowrap;
        animation:mar 48s linear infinite;
        color:#8fbfff;
      }

      .marq span{
        padding-right:90px;
      }

      @keyframes mar{
        0%{transform:translateX(0)}
        100%{transform:translateX(-50%)}
      }
    `;

    const w = document.createElement('div');
    w.className = 'p';

    w.innerHTML = `
      <div class="h">ElCamino-爱 Operation V1.2</div>

      <div class="b">

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

        <div class="btns">
          <button id="sv">SAVE</button>

          <div class="row2">
            <button id="ca">CHECK ALL</button>
            <button id="uc">UNCHECK</button>
          </div>
        </div>

        <!-- INFORMATION -->
        <div class="infoBox" id="infoBox"></div>

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

    // inject info
    w.querySelector('#infoBox').textContent = INFORMATION;

    const keys = ['DANA','OVO','GOPAY','BCA','BNI','BRI','MANDIRI','BSI','JAGO','PERMATA','MAYBANK','SEABANK'];
    const cfg = getCfg();

    keys.forEach(k => {
      const el = w.querySelector('#' + k);
      if (el) el.checked = cfg[k] === true;
    });

    w.querySelector('#sv').onclick = () => {
      let o = {};
      keys.forEach(k => o[k] = w.querySelector('#' + k).checked);
      localStorage.setItem('PAY_CFG', JSON.stringify(o));
      alert('Saved');
    };

    w.querySelector('#ca').onclick = () => keys.forEach(k => w.querySelector('#' + k).checked = true);
    w.querySelector('#uc').onclick = () => keys.forEach(k => w.querySelector('#' + k).checked = false);

    // DRAG
    let h = w.querySelector('.h');
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    h.addEventListener('mousedown', (e) => {
      dragging = true;
      const r = host.getBoundingClientRect();
      offsetX = e.clientX - r.left;
      offsetY = e.clientY - r.top;
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

  function injectCaminoButton() {
    const btn = document.getElementById('btnSearch');
    if (!btn || document.getElementById('btnElCamino')) return;

    const cam = document.createElement('button');
    cam.id = 'btnElCamino';
    cam.innerHTML = 'EL CAMINO';

    cam.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (window.__ENGINE_RUNNING__) return;
      window.__ENGINE_RUNNING__ = true;

      btn.click();
      startEngine();
    };

    btn.insertAdjacentElement('afterend', cam);
  }

  function startEngine() {
    let l = 0, s = 0;

    const iv = setInterval(() => {
      if (!window.__ENGINE_RUNNING__) return clearInterval(iv);

      const rows = document.querySelectorAll('table tbody tr').length;

      if (rows === l) s++;
      else { s = 0; l = rows; }

      if (s < 3) return;

      clearInterval(iv);
      runFlow();
    }, 400);
  }

  function runFlow() {
    let cfg = getCfg();
    let valid = [];

    document.querySelectorAll('table tbody tr').forEach(tr => {
      let tds = tr.querySelectorAll('td');
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

      if (a > 5000000) return;
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
      if (cb) cb.click();
    });

    unlock();
    document.getElementById('btnSearch')?.click();
  }

  function customFilterBoxTheme() {
    const box = document.querySelector('.filter-box');
    if (!box || box.dataset.caminoTheme) return;

    box.dataset.caminoTheme = "1";
    box.style.position = "relative";
    box.style.overflow = "hidden";

    const gif = document.createElement("div");
    gif.style.cssText = `
      position:absolute;inset:0;z-index:0;
      background:url("https://media1.tenor.com/m/3y_DrAG1pBoAAAAd/el-camino-a-breaking-bad-movie.gif");
      background-size:cover;
    `;

    box.prepend(gif);
  }

  ui();
  injectCaminoButton();
  customFilterBoxTheme();

})();
