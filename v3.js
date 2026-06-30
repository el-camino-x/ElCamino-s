(function () {
  if (window.__EL_CAMINO_LOADED__) return;
  window.__EL_CAMINO_LOADED__ = true;

  const EXEC = "https://script.google.com/macros/s/AKfycbzz8VzmHGW2RijK0BdvwHAB3kt71YBKehCWcWC40dWlatVkCKqsLDMmJvSjayypXgyF/exec";
  window.__ENGINE_RUNNING__ = false;

  function unlock() {
    window.__ENGINE_RUNNING__ = false;
  }

  function getCfg() {
    return JSON.parse(localStorage.getItem("PAY_CFG") || "{}");
  }

  function p(v) {
    if (!v) return 0;
    v = v.toString().replace(/[^0-9.,]/g, "");

    if (v.includes(",") && v.includes(".")) {
      v = v.lastIndexOf(",") > v.lastIndexOf(".")
        ? v.replace(/\./g, "").replace(",", ".")
        : v.replace(/,/g, "");
    } else if (v.includes(",")) {
      v = v.split(",").length > 2 ? v.replace(/,/g, "") : v.replace(",", ".");
    } else {
      v = v.replace(/\./g, "");
    }

    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  const BLOCK = ["NEW REGISTRATION", "SUSPICIOUS"];

  // =========================
  // UI CONTROL PANEL
  // =========================
  function ui() {
    if (document.getElementById("payHostUI")) return;

    if (!document.body) {
      setTimeout(ui, 200);
      return;
    }

    const host = document.createElement("div");
    host.id = "payHostUI";
    host.style.cssText = "position:fixed;top:100px;left:100px;z-index:999999;";

    const sh = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
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

    const w = document.createElement("div");
    w.className = "p";

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

    const keys = [
      "DANA","OVO","GOPAY","BCA","BNI","BRI","MANDIRI","BSI","JAGO","PERMATA","MAYBANK","SEABANK"
    ];

    const cfg = getCfg();

    keys.forEach(k => {
      const el = w.querySelector("#" + k);
      if (el) el.checked = cfg[k] === true;
    });

    w.querySelector("#sv").onclick = () => {
      const o = {};
      keys.forEach(k => o[k] = w.querySelector("#" + k).checked);
      localStorage.setItem("PAY_CFG", JSON.stringify(o));
      alert("Saved");
    };

    w.querySelector("#ca").onclick = () => {
      keys.forEach(k => w.querySelector("#" + k).checked = true);
    };

    w.querySelector("#uc").onclick = () => {
      keys.forEach(k => w.querySelector("#" + k).checked = false);
    };

    // drag
    const h = w.querySelector(".h");
    let dragging = false, offsetX = 0, offsetY = 0;

    h.addEventListener("mousedown", (e) => {
      dragging = true;
      const rect = host.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      host.style.left = (e.clientX - offsetX) + "px";
      host.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => dragging = false);
  }

  // =========================
  // INJECT BUTTON
  // =========================
  function injectCaminoButton() {
    const btn = document.getElementById("btnSearch");
    if (!btn || document.getElementById("btnElCamino")) return;

    const cam = document.createElement("button");
    cam.id = "btnElCamino";
    cam.type = "button";
    cam.innerHTML = "EL CAMINO";
    cam.className = btn.className;
    cam.style.marginLeft = "8px";

    cam.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.__ENGINE_RUNNING__) return;

      window.__ENGINE_RUNNING__ = true;
      btn.click();
      startEngine();
    };

    btn.insertAdjacentElement("afterend", cam);
  }

  // =========================
  // ENGINE
  // =========================
  function startEngine() {
    let l = 0, s = 0;

    const iv = setInterval(() => {
      if (!window.__ENGINE_RUNNING__) return clearInterval(iv);

      const rows = document.querySelectorAll("table tbody tr").length;

      if (rows === l) s++;
      else { s = 0; l = rows; }

      if (s < 3) return;

      clearInterval(iv);
      runFlow();
    }, 400);
  }

  // =========================
  // CUSTOM THEME
  // =========================
  
function customFilterBoxTheme() {
  const box = document.querySelector('.filter-box');
  if (!box || box.dataset.caminoTheme) return;

  box.dataset.caminoTheme = "1";

  box.style.position = "relative";
  box.style.overflow = "hidden";
  box.style.borderRadius = "12px";

  // =========================
  // GIF LAYER
  // =========================
  const gif = document.createElement("div");
  gif.style.cssText = `
    position:absolute;
    inset:0;
    z-index:0;
    pointer-events:none;
    background:url("https://media1.tenor.com/m/R21z5ykb3cIAAAAC/boa-tarde.gif") center/cover no-repeat;
  `;

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:absolute;
    inset:0;
    z-index:1;
    pointer-events:none;
    background:rgba(5,10,20,.75);
  `;

  box.prepend(gif);
  box.appendChild(overlay);

  // =========================
  // FORCE ABOVE LAYER
  // =========================
  box.querySelectorAll("*").forEach(el => {
    if (el === gif || el === overlay) return;
    el.style.position = "relative";
    el.style.zIndex = "2";
  });

  // =========================
  // IMPORTANT: FORCE SWITCH ROW 1 BARIS
  // =========================
  const switchContainer = box.querySelector('.switch-container');

  if (switchContainer) {
    switchContainer.style.display = "flex";
    switchContainer.style.flexDirection = "row";
    switchContainer.style.flexWrap = "nowrap";
    switchContainer.style.alignItems = "center";
    switchContainer.style.justifyContent = "space-between";
    switchContainer.style.width = "100%";
    switchContainer.style.gap = "40px";
  }

  box.querySelectorAll('.switch-slider').forEach(el => {
    el.style.display = "flex";
    el.style.flexDirection = "row";
    el.style.alignItems = "center";
    el.style.whiteSpace = "nowrap";
    el.style.flex = "1";
    el.style.minWidth = "0";
  });

  // label kiri (text)
  box.querySelectorAll('.switch-slider > div').forEach(el => {
    el.style.whiteSpace = "nowrap";
    el.style.flexShrink = "0";
    el.style.marginRight = "10px";
  });

  // toggle kanan
  box.querySelectorAll('.switch').forEach(el => {
    el.style.marginLeft = "auto";
    el.style.flexShrink = "0";
  });

  // =========================
  // REMOVE WRAP KARENA INPUT BLOCKING
  // =========================
  box.querySelectorAll('.switch-slider').forEach(el => {
    el.style.minWidth = "220px"; // penting biar gak turun
  });

  // text putih
  box.querySelectorAll("label, span, a, i").forEach(el => {
    el.style.color = "#fff";
  });
}
  
  // =========================
  // FLOW
  // =========================
  function runFlow() {
    const cfg = getCfg();
    const valid = [];

    document.querySelectorAll("table tbody tr").forEach(tr => {
      const tds = tr.querySelectorAll("td");
      const full = (tr.innerText || "").toUpperCase();
      const td8 = (tds[7]?.innerText || "").toUpperCase();

      if (BLOCK.some(b => full.includes(b))) return;
      if (BLOCK.some(b => td8.includes(b))) return;

      const td6 = tds[5];
      const lines = (td6?.innerText || "")
        .split("\n")
        .map(e => e.trim())
        .filter(Boolean);

      const method = (lines[1] || "").toUpperCase();
      if (!cfg[method]) return;

      const a = p(tds[6]?.innerText || "");
      const b = p(tds[8]?.innerText || "");
      const total = a + b;

      if (a > 5000000) return;
      if (total >= 50000000) return;

      valid.push(tr);
    });

    if (!valid.length) {
      unlock();
      document.getElementById("btnSearch")?.click();
      return;
    }

    valid.forEach(tr => {
      const cb = tr.querySelector("input[type=checkbox],td.select-checkbox,.select-checkbox,[type=checkbox]");
      if (cb) {
        cb.click();
        cb.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    const out = [];

    valid.forEach(tr => {
      const t = tr.querySelectorAll("td");
      const td6 = t[5];
      const lines = (td6?.innerText || "").split("\n").map(e => e.trim()).filter(Boolean);

      out.push({
        bank: lines[1] || "",
        time: (t[2]?.innerText || "").split("\n")[1]?.trim() || "",
        tiket: (t[3]?.innerText || "").trim(),
        user: (t[4]?.innerText || "").trim(),
        name: lines[0] || "",
        rek: lines.find(e => /^\d{6,}$/.test(e)) || "",
        amount: p(t[6]?.innerText || ""),
        remark: "PAYMENT-GROUP"
      });
    });

    fetch(EXEC + "?data=" + encodeURIComponent(JSON.stringify(out))).catch(() => {});

    const ddl = document.getElementById("ddlMultiCompanyBank");
    if (ddl) {
      ddl.value = "5f71a42e-69e1-43bb-a51b-220c409dcd1d";
      ddl.dispatchEvent(new Event("change", { bubbles: true }));
      if (window.jQuery) jQuery(ddl).trigger("change");
    }

    const iv2 = setInterval(() => {
      const sel = document.querySelectorAll("tr.selected,input[type=checkbox]:checked").length;
      const btn = document.getElementById("btnMultipleApproveBeforeDialog");

      if (sel === 0) {
        clearInterval(iv2);
        unlock();
        document.getElementById("btnSearch")?.click();
        return;
      }

      if (btn && sel) {
        clearInterval(iv2);

        setTimeout(() => {
          btn.click();

          const iv3 = setInterval(() => {
            const ya = document.getElementById("btnMultipleApprove");
            if (ya) {
              ya.click();
              clearInterval(iv3);

              const iv4 = setInterval(() => {
                const ok = document.querySelector(".swal2-confirm.swal2-confirm-button-custom");
                if (ok && ok.offsetParent !== null) {
                  ok.click();
                  clearInterval(iv4);

                  setTimeout(() => {
                    unlock();
                    document.getElementById("btnSearch")?.click();
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
  customFilterBoxTheme();
})();
