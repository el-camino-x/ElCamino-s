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
      .p{background:#111;color:#fff;border-radius:12px;font-family:Arial;width:280px;height:320px;resize:both;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);position:relative}
      .h{cursor:move;background:#222;padding:8px;font-weight:bold;user-select:none}
      .b{padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px}
      .b label{display:flex;align-items:center;gap:6px}
      .btns{grid-column:1/-1;display:flex;flex-direction:column;gap:6px;margin-top:8px}
      .row2{display:flex;gap:6px}
      .row2 button{flex:1}
      button{width:100%;padding:6px;font-size:11px;border:none;border-radius:8px;background:#2a5298;color:#fff;font-weight:500;cursor:pointer}
      button:hover{filter:brightness(1.1)}
      .ft{position:absolute;bottom:6px;left:10px;right:10px;overflow:hidden}
      .marq{display:inline-block;white-space:nowrap;animation:mar 48s linear infinite;color:#8fbfff}
      .marq span{padding-right:90px}
      @keyframes mar{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    `;

    let w = document.createElement('div');
    w.className = 'p';

    w.innerHTML = `
      <div class="h">ElCamino-爱 Operation V1</div>
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
  // ENGINE
  // =========================

  function applyDarkFilterTheme() {
  if (document.getElementById('camino-dark-theme')) return;

  const style = document.createElement('style');
  style.id = 'camino-dark-theme';

  style.textContent = `

    /* =========================
       MAIN FILTER CONTAINER (NAVY BASE)
    ========================= */
    .filter-container {
      background: rgba(11, 27, 58, 0.75) !important;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
    }

    /* =========================
       FILTER BOX WRAPPER
    ========================= */
    .filter-box {
      background: rgba(10, 15, 30, 0.55) !important;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      color: #e5e7eb !important;
    }

    /* =========================
       INPUT / SELECT GLASS STYLE
    ========================= */
    .filter-box input,
    .filter-box select,
    .filter-box textarea {
      background: rgba(17, 24, 39, 0.65) !important;
      color: #e5e7eb !important;
      border: 1px solid rgba(255,255,255,0.08) !important;
      border-radius: 10px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .filter-box input:focus,
    .filter-box select:focus {
      outline: none;
      border: 1px solid rgba(59, 130, 246, 0.6) !important;
      box-shadow: 0 0 10px rgba(59,130,246,0.25);
    }

    /* =========================
       PLACEHOLDER
    ========================= */
    .filter-box input::placeholder,
    .filter-box textarea::placeholder {
      color: rgba(156, 163, 175, 0.85) !important;
    }

    /* =========================
       TREE SELECTOR GLASS
    ========================= */
    .treeSelector-container,
    .treeSelector-wrapper {
      background: rgba(10, 15, 30, 0.6) !important;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
    }

    .treeSelector-li:hover {
      background: rgba(59,130,246,0.15) !important;
    }

    .treeSelector-label {
      color: #e5e7eb !important;
    }

    /* =========================
       CHECKBOX STYLE
    ========================= */
    input[type="checkbox"] {
      accent-color: #3b82f6;
    }

    /* =========================
       ADVANCED FILTER SECTION
    ========================= */
    #advancedFiltersSection {
      background: rgba(10, 15, 30, 0.45) !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    hr {
      border-color: rgba(255,255,255,0.08) !important;
    }

    /* =========================
       BUTTONS (CLEAN GLOW)
    ========================= */
    .submit-button-new {
      background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
      color: white !important;
      border-radius: 10px;
      border: none;
      box-shadow: 0 6px 18px rgba(37,99,235,0.25);
    }

    .submit-button-new:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 22px rgba(37,99,235,0.35);
    }

    .reset-link {
      color: #f87171 !important;
    }

    .reset-link:hover {
      color: #ef4444 !important;
    }

    /* =========================
       TOGGLE / SWITCH
    ========================= */
    .switch .slider {
      background-color: rgba(55,65,81,0.8) !important;
    }

    input:checked + .slider {
      background-color: #3b82f6 !important;
    }

    /* =========================
       DROPDOWN / BOOKMARK FILTER
    ========================= */
    .filter-dropdown-content {
      background: rgba(10, 15, 30, 0.85) !important;
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.08);
    }

    .filter-item:hover {
      background: rgba(59,130,246,0.12) !important;
    }

    /* =========================
       TEXT DEFAULT
    ========================= */
    .filter-box,
    .filter-container {
      color: #e5e7eb !important;
    }

  `;

  document.head.appendChild(style);
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
  // FLOW
  // =========================
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
  ui();
  injectCaminoButton();
  applyDarkFilterTheme();

})();
