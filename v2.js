(function () {

  if (!window.__ELCAMINO_BOOTSTRAPPED__) {
    window.__ELCAMINO_BOOTSTRAPPED__ = true;
  }

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";

  // =========================
  // STATE CONTROL
  // =========================
  function unlock() {
    window.__RUNNING__ = false;
    if (window.__IV__) {
      clearInterval(window.__IV__);
      window.__IV__ = null;
    }
  }

  function getCfg() {
    return JSON.parse(localStorage.getItem('PAY_CFG') || '{}');
  }

  // =========================
  // ENGINE CORE (YOUR LOGIC WRAPPED)
  // =========================
  function ENGINE() {

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

    window.__IV__ = setInterval(() => {

      let rows = document.querySelectorAll('table tbody tr').length;

      if (rows == l) s++;
      else { s = 0; l = rows; }

      if (s < 3) return;

      clearInterval(window.__IV__);

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

          out.push({
            bank: lines[1] || '',
            name: lines[0] || '',
            rek: lines.find(e => /^\d{6,}$/.test(e)) || '',
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
          return;
        }

        if (sel === 0) {
          clearInterval(iv2);
          unlock();
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

    }, 400);
  }

  // =========================
  // START / STOP API
  // =========================
  window.EL_CAMINO_START = function () {
    if (window.__RUNNING__) return;

    window.__RUNNING__ = true;

    console.log("EL CAMINO START");

    document.getElementById('btnSearch')?.click();

    // delay kecil biar table ready
    setTimeout(() => {
      ENGINE();
    }, 500);
  };

  window.EL_CAMINO_STOP = function () {
    unlock();
    console.log("EL CAMINO STOP");
  };

  // =========================
  // INLINE BUTTON
  // =========================
  function injectButton() {
    const searchBtn = document.getElementById('btnSearch');
    if (!searchBtn || document.getElementById('ELCAMINO_INLINE_BTN')) return;

    const btn = document.createElement('button');
    btn.id = 'ELCAMINO_INLINE_BTN';
    btn.type = 'button';
    btn.innerText = 'EL CAMINO';

    btn.style.marginLeft = '10px';
    btn.style.padding = '6px 14px';
    btn.style.border = '1px solid rgba(184,39,252,0.9)';
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

    btn.onclick = () => window.EL_CAMINO_START();

    searchBtn.parentNode.insertBefore(btn, searchBtn.nextSibling);
  }

  setInterval(injectButton, 1500);

  // =========================
  // BOOT AUTO INIT
  // =========================
  document.getElementById('btnSearch')?.click();

})();
