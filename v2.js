(function () {
  if (window.__BOOTSTRAPPED__) return;
  window.__BOOTSTRAPPED__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";

  function unlock() {
    window.__RUNNING__ = false;
  }

  function getCfg() {
    return JSON.parse(localStorage.getItem('PAY_CFG') || '{}');
  }

  // =========================
  // 🔥 SINGLE SOURCE OF TRIGGER
  // =========================
  window.EL_CAMINO_START = function () {
    if (window.__RUNNING__) return;
    window.__RUNNING__ = true;

    console.log("EL CAMINO STARTED");

    // start main engine
    document.getElementById('btnSearch')?.click();
  };

  // =========================
  // 🔥 INLINE BUTTON (EL CAMINO)
  // =========================
  function injectButton() {
    const searchBtn = document.getElementById('btnSearch');
    if (!searchBtn) return;
    if (document.getElementById('ELCAMINO_INLINE_BTN')) return;

    const btn = document.createElement('button');
    btn.id = 'ELCAMINO_INLINE_BTN';
    btn.type = 'button';
    btn.innerText = 'EL CAMINO';

    btn.style.marginLeft = '10px';
    btn.style.padding = '6px 14px';
    btn.style.border = '1px solid rgba(184, 39, 252, 0.9)';
    btn.style.borderRadius = '8px';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '12px';
    btn.style.fontWeight = '600';
    btn.style.background = 'linear-gradient(135deg,#0f0f0f,#1a1a1a)';
    btn.style.boxShadow = `
      0 0 0 1px rgba(184,39,252,0.6),
      0 0 0 2px rgba(44,144,252,0.5),
      0 0 12px rgba(184,253,51,0.25),
      0 0 18px rgba(253,24,146,0.25)
    `;

    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.filter = 'brightness(1.2)';
    };

    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1)';
      btn.style.filter = 'brightness(1)';
    };

    // 🔥 SAME TRIGGER (bookmark & button)
    btn.onclick = function () {
      window.EL_CAMINO_START();
    };

    searchBtn.parentNode.insertBefore(btn, searchBtn.nextSibling);
  }

  setInterval(injectButton, 1500);
  injectButton();

  // =========================
  // 🔥 UI PANEL (UNCHANGED)
  // =========================
  function ui() {
    if (document.getElementById('payHostUI')) return;

    let host = document.createElement('div');
    host.id = 'payHostUI';
    host.style = 'position:fixed;top:100px;left:100px;z-index:999999';

    let sh = host.attachShadow({ mode: 'open' });

    let style = document.createElement('style');
    style.textContent = `
      .p{background:#111;color:#fff;border-radius:12px;font-family:Arial;width:280px;height:320px;resize:both;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);position:relative}
      .h{cursor:move;background:#222;padding:8px;font-weight:bold}
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
            <button id="ca">CHECKLIST ALL</button>
            <button id="uc">UNCHECKLIST</button>
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

    w.querySelector('#sv').onclick = function () {
      let o = {};
      keys.forEach(k => o[k] = w.querySelector('#' + k).checked);
      localStorage.setItem('PAY_CFG', JSON.stringify(o));
      alert('Saved');
    };

    w.querySelector('#ca').onclick = function () {
      keys.forEach(k => w.querySelector('#' + k).checked = true);
    };

    w.querySelector('#uc').onclick = function () {
      keys.forEach(k => w.querySelector('#' + k).checked = false);
    };

    let h = w.querySelector('.h');
    let d = 0, ox = 0, oy = 0;

    h.onmousedown = e => {
      d = 1;
      ox = e.clientX - host.offsetLeft;
      oy = e.clientY - host.offsetTop;
    };

    document.onmouseup = () => d = 0;

    document.onmousemove = e => {
      if (!d) return;
      host.style.left = (e.clientX - ox) + 'px';
      host.style.top = (e.clientY - oy) + 'px';
    };
  }

  ui();
  document.getElementById('btnSearch')?.click();

  // =========================
  // 🔥 CORE ENGINE (UNCHANGED)
  // =========================
  const BLOCK = ['NEW REGISTRATION', 'SUSPICIOUS'];

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

  let l = 0, s = 0;

  const iv = setInterval(() => {
    let rows = document.querySelectorAll('table tbody tr').length;

    if (rows == l) s++;
    else { s = 0; l = rows; }

    if (s >= 3) {
      clearInterval(iv);

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

      if (rows === 0 || valid.length === 0) {
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
        if (t.length >= 7) {
          let td6 = t[5];
          let lines = (td6?.innerText || '').split('\n').map(e => e.trim()).filter(Boolean);

          let tiket = (t[3]?.innerText || '').trim();
          let user = (t[4]?.innerText || '').trim();
          let time = (t[2]?.innerText || '').split('\n')[1]?.trim() || '';

          let name = lines[0] || '';
          let bank = lines[1] || '';
          let rek = lines.find(e => /^\d{6,}$/.test(e)) || '';

          out.push({
            bank,
            time,
            tiket,
            user,
            name,
            rek,
            amount: p(t[6]?.innerText || ''),
            remark: 'PAYMENT-GROUP'
          });
        }
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

        if (document.querySelectorAll('table tbody tr').length === 0) {
          clearInterval(iv2);
          unlock();
          document.getElementById('btnSearch')?.click();
          return;
        }

        if (sel === 0) {
          clearInterval(iv2);
          unlock();
          document.getElementById('btnSearch')?.click();
          return;
        }

        if (sel && btn) {
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
  }, 400);

})();
