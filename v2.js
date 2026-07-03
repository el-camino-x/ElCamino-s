(function () {
  if (window.__EL_CAMINO_LOADED__) return;
  window.__EL_CAMINO_LOADED__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";

  window.__ENGINE_RUNNING__ = false;

  // =========================
  // WHITELIST AUTH SYSTEM
  // =========================
  const WHITELIST = [
  "phpradanicky",
  "pradarega",
  "phpradatiaamanda",
  "admin3",
  "admin4"
];

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
    host.style = 'position:fixed;top:100px;left:100px;z-index:999999';

    let sh = host.attachShadow({ mode: 'open' });

    let style = document.createElement('style');
    style.textContent = `
      .p{background:#111;color:#fff;border-radius:12px;font-family:Inter, Arial, sans-serif;width:275px;height:501px;resize:both;overflow-y:auto;overflow-x:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);position:relative;scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:rgba(143,191,255,.35) transparent}
      
      .p::-webkit-scrollbar{width:3px}
      .p::-webkit-scrollbar-track{background:transparent}
      .p::-webkit-scrollbar-thumb{background:rgba(143,191,255,.45);border-radius:10px}
      .p::-webkit-scrollbar-thumb:hover{background:rgba(143,191,255,.75)}
      
      .h{cursor:move;background:#222;padding:8px;font-weight:bold;user-select:none;position:sticky;top:0;z-index:10}
      
      .b{padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px}
      .b label{display:flex;align-items:center;gap:6px}
      
      .btns{grid-column:1/-1;display:flex;flex-direction:column;gap:6px;margin-top:8px}
      
      .info{grid-column:1/-1;margin-top:10px;padding:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:8px;font-size:12px;line-height:1.6;color:#e6e6e6;max-height:160px;overflow-y:auto}
      
      .logo{width:14px;height:14px;vertical-align:middle;margin-right:6px;border-radius:3px}

      .row2{display:flex;gap:6px}
      .row2 button{flex:1}
      
      button{width:100%;padding:7px;font-size:11px;border:none;border-radius:10px;background:rgba(42,82,152,.75);color:#fff;font-weight:500;cursor:pointer;transition:all .2s ease;backdrop-filter:blur(6px);box-shadow:0 4px 12px rgba(0,0,0,.25);position:relative;overflow:hidden}
      
      button:hover{transform:translateY(-1px) scale(1.02);background:rgba(58,110,200,.85);box-shadow:0 6px 18px rgba(0,0,0,.35),0 0 10px rgba(143,191,255,.25);}

      button:active{transform:translateY(0px) scale(.98);box-shadow:0 2px 8px rgba(0,0,0,.25);}

      .ft{margin-top:auto;padding:6px 10px;overflow:hidden;mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent)}
      .marq{display:inline-block;white-space:nowrap;will-change:transform;animation:mar 48s linear infinite;color:#8fbfff}
      .marq span{padding-right:90px}
      
      @keyframes mar{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
`;

    let w = document.createElement('div');
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

        <div class="info">
  <b><img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/021/616/845/small/banking-3d-render-icon-illustration-png.png"> BANK CUT OFF INFORMATION</b>
  
  <br><br><img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/065/645/small_2x/dana-logo-square-rounded-dana-logo-free-download-dana-logo-free-png.png"> DANA : 00.00 - 00.03<br>
  <img class="logo" src="https://static.vecteezy.com/system/resources/thumbnails/067/065/651/small_2x/ovo-logo-square-rounded-ovo-logo-free-download-ovo-logo-free-png.png"> OVO : 00.00 - 00.03<br>
  <img class="logo" src="https://static.vecteezy.com/system/resources/previews/067/065/676/non_2x/gopay-logo-square-rounded-gopay-logo-free-download-gopay-logo-free-png.png"> GOPAY : 23.30 - 00.30<br><br>

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

    let keys = ['DANA','OVO','GOPAY','BCA','BNI','BRI','MANDIRI','BSI','JAGO','PERMATA','MAYBANK','SEABANK'];
    let cfg = getCfg();

    keys.forEach(k => {
      let el = w.querySelector('#' + k);
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

  // 🔐 AUTH CHECK (INI INTINYA)
if (!isAuthorized()) {
  alert("Unauthorized user");
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
  
  const BLOCK_ID = [
  "fpso1",
  "fpso2",
  "fpso3",
  "fpjek1",
  "fpjek2",
  "rudyy888",
  "pradajuanda",
  "cobacoba1233",
  "forumwijaya",
  "pradachan",
  "pradapatrick",
  "userzoom",
  "jokerbanting",
  "ziroru99",
  "legendas123",
  "ASSEN",
  "je90",
  "pradataa",
  "asgardd",
  "barbara188xx",
  "dbjastin",
  "SPAMSMS",
  "Exquisiteboy",
  "spamwa188",
  "egolbca",
  "Idmaxwin",
  "torpedobasi",
  "ifanbca",
  "Cabegiling",
  "mandakafir",
  "Rendy9906",
  "kafirun05129",
  "Arifjp77",
  "icha19"
];
  
  // =========================
  // FLOW
  // =========================
  function runFlow() {
    let cfg = getCfg();
    let valid = [];

    document.querySelectorAll('table tbody tr').forEach(tr => {
      let tds = tr.querySelectorAll('td');

      let idUser = (tds[4]?.innerText || '').trim();

      if (BLOCK_ID.includes(idUser)) return;
      
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
  waitForUser(() => {
  injectCaminoButton();
});
  customFilterBoxTheme();

})();
