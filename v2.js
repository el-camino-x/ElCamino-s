(function () {
  if (window.__ELCAMINO_BOOT__) return;
  window.__ELCAMINO_BOOT__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";

  // =========================
  // SAFE STATE CONTROL
  // =========================
  function unlock() {
    window.__RUNNING__ = false;

    if (window.__IV__) clearInterval(window.__IV__);
    if (window.__IV2__) clearInterval(window.__IV2__);
    if (window.__IV3__) clearInterval(window.__IV3__);
    if (window.__IV4__) clearInterval(window.__IV4__);
  }

  function getCfg() {
    return JSON.parse(localStorage.getItem('PAY_CFG') || '{}');
  }

  // =========================
  // MAIN ENGINE (YOUR ORIGINAL FLOW WRAPPED)
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

    window.__IV__ = setInterval(() => {

      let rows = document.querySelectorAll('table tbody tr').length;

      let l = window.__LAST_ROWS__ || 0;
      let s = window.__STABLE__ || 0;

      if (rows === l) s++;
      else { s = 0; l = rows; }

      window.__LAST_ROWS__ = l;
      window.__STABLE__ = s;

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

        if (a > 5000000) return;
        if (a + b >= 50000000) return;

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

        let td6 = t[5];
        let lines = (td6?.innerText || '').split('\n').map(e => e.trim()).filter(Boolean);

        out.push({
          bank: lines[1] || '',
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

      window.__IV2__ = setInterval(() => {

        let sel = document.querySelectorAll('tr.selected,input[type=checkbox]:checked').length;
        let btn = document.getElementById('btnMultipleApproveBeforeDialog');

        if (rows === 0 || sel === 0) {
          clearInterval(window.__IV2__);
          unlock();
          document.getElementById('btnSearch')?.click();
          return;
        }

        if (sel && btn) {
          clearInterval(window.__IV2__);

          setTimeout(() => {
            btn.click();

            window.__IV3__ = setInterval(() => {

              let ya = document.getElementById('btnMultipleApprove');
              if (ya) {
                ya.click();
                clearInterval(window.__IV3__);

                window.__IV4__ = setInterval(() => {

                  let ok = document.querySelector('.swal2-confirm.swal2-confirm-button-custom');
                  if (ok && ok.offsetParent !== null) {
                    ok.click();
                    clearInterval(window.__IV4__);

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
  // 🔥 SINGLE ENTRY POINT (IMPORTANT)
  // =========================
  window.EL_CAMINO_START = function () {

    if (window.__RUNNING__) return;
    window.__RUNNING__ = true;

    // reset state biar bisa repeat clean
    window.__LAST_ROWS__ = 0;
    window.__STABLE__ = 0;

    document.getElementById('btnSearch')?.click();

    setTimeout(() => {
      ENGINE();
    }, 500);
  };

  // =========================
  // BUTTON INJECT (EL CAMINO)
  // =========================
  function inject() {
    let btnSearch = document.getElementById('btnSearch');
    if (!btnSearch) return;

    if (document.getElementById('ELCAMINO_BTN')) return;

    let b = document.createElement('button');
    b.id = 'ELCAMINO_BTN';
    b.innerText = 'EL CAMINO';

    b.style.marginLeft = '10px';
    b.style.padding = '6px 12px';
    b.style.borderRadius = '8px';
    b.style.border = '1px solid #b827fc';
    b.style.background = '#111';
    b.style.color = '#fff';
    b.style.cursor = 'pointer';

    b.onclick = () => window.EL_CAMINO_START();

    btnSearch.parentNode.insertBefore(b, btnSearch.nextSibling);
  }

  setInterval(inject, 1000);
  inject();

  // auto init optional
  document.getElementById('btnSearch')?.click();

})();
