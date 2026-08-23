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

const remixIconStyle =
    document.createElement("link");

remixIconStyle.rel =
    "stylesheet";

remixIconStyle.href =
    "https://cdn.jsdelivr.net/npm/remixicon@4.9.0/fonts/remixicon.css";

sh.appendChild(
    remixIconStyle
);

let style = document.createElement('style');
    style.textContent = `

/* =========================================================
   EL CAMINO — MAIN PANEL
   VISUAL ONLY
========================================================= */

.p{
    position:relative;
    isolation:isolate;
    box-sizing:border-box;

    width:760px;
    height:620px;

    padding:0;

    overflow:hidden;

    resize:both;

    color:#fff;

    font-family:Inter,Arial,sans-serif;

    border:1px solid rgba(120,145,255,.45);
    border-radius:16px;

    background:
        linear-gradient(
            rgba(3,6,18,.68),
            rgba(6,7,24,.82)
        ),
        url("https://media1.tenor.com/m/tCehYWM8AOkAAAAC/cat-eye-yellow-cat-eye.gif");

    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-attachment:local;

    box-shadow:
        inset 0 0 35px rgba(70,110,255,.12),
        inset 0 0 80px rgba(120,70,255,.08),
        0 15px 45px rgba(0,0,0,.5);

    scroll-behavior:smooth;

    scrollbar-width:none;

    --camino-blue:#5c9dff;
    --camino-blue-light:#62d5ff;
    --camino-purple:#746cff;
    --camino-purple-light:#a06fff;
}


/* =========================================================
   PANEL ATMOSPHERE
========================================================= */

.p::before{
    content:"";

    position:absolute;
    inset:0;

    border-radius:16px;

    pointer-events:none;

    background:
        linear-gradient(
            180deg,
            rgba(3,6,20,.28),
            rgba(5,7,24,.48) 50%,
            rgba(3,5,18,.78)
        ),
        radial-gradient(
            circle at 15% 10%,
            rgba(70,130,255,.18),
            transparent 30%
        ),
        radial-gradient(
            circle at 90% 15%,
            rgba(130,80,255,.18),
            transparent 32%
        ),
        radial-gradient(
            circle at 15% 90%,
            rgba(80,100,255,.12),
            transparent 30%
        ),
        radial-gradient(
            circle at 90% 90%,
            rgba(160,80,255,.12),
            transparent 32%
        );

    z-index:0;
}

.p::after{
    content:"";

    position:absolute;
    inset:0;

    border-radius:16px;

    pointer-events:none;

    background:
        linear-gradient(
            115deg,
            transparent 18%,
            rgba(100,150,255,.035) 40%,
            rgba(120,110,255,.10) 48%,
            rgba(150,110,255,.12) 52%,
            rgba(90,190,255,.05) 57%,
            transparent 70%
        );

    background-size:240% 100%;

    animation:blueAnimeSweep 8s linear infinite;

    box-shadow:
        inset 0 0 35px rgba(80,120,255,.05),
        inset 0 0 75px rgba(130,80,255,.05);

    z-index:1;
}

.p > *{
    position:relative;
    z-index:2;
}

@keyframes blueAnimeSweep{
    0%{
        background-position:240% 0;
    }

    45%,100%{
        background-position:-140% 0;
    }
}


/* =========================================================
   PANEL SCROLLBAR
========================================================= */

.p::-webkit-scrollbar{
    width:3px;
    height:3px;
}

.p::-webkit-scrollbar-track{
    background:transparent;
}

.p::-webkit-scrollbar-thumb{
    background:
        linear-gradient(
            180deg,
            #6fa8ff,
            #7478ff,
            #9a6cff,
            #6f55d9
        );

    border-radius:10px;
}

.p::-webkit-scrollbar-thumb:hover{
    background:
        linear-gradient(
            180deg,
            #8bc0ff,
            #8c90ff,
            #b083ff
        );
}


/* =========================================================
   TOP HEADER
========================================================= */

/* =========================================================
   CAMINO MUSIC PLAYING HEADER
========================================================= */

.h{
    position:relative;

    height:58px;
    min-height:58px;

    box-sizing:border-box;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:0 15px;

    overflow:hidden;

    color:#fff;

    font-family:
        Inter,
        Arial,
        sans-serif;

    font-size:20px;
    font-weight:950;

    letter-spacing:2px;

    background:
        linear-gradient(
            180deg,
            rgba(12,16,32,.97),
            rgba(6,9,20,.97)
        );

    border-bottom:
        1px solid rgba(110,145,255,.20);

    white-space:nowrap;

    z-index:20;

    text-shadow:
        0 0 5px rgba(100,160,255,.35),
        0 0 12px rgba(130,90,255,.18);
}


/* =========================================================
   HEADER TITLE
========================================================= */

.h > span:not(.status-dot):not(.header-info){
    position:relative;
    display:inline-block;

    animation:
        caminoMusicText 5.5s ease-in-out infinite;
}


/* =========================================================
   MUSIC GLOW
========================================================= */

.h > span:not(.status-dot):not(.header-info)::before{

    content:"";

    position:absolute;

    left:-10%;
    right:-10%;

    bottom:-8px;

    height:16px;

    border-radius:50%;

    background:
        radial-gradient(
            ellipse at center,
            rgba(95,170,255,.20),
            rgba(130,90,255,.08) 45%,
            transparent 75%
        );

    filter:blur(5px);

    opacity:.45;

    animation:
        caminoMusicGlow 1.4s ease-in-out infinite;

    pointer-events:none;
}


/* =========================================================
   AUDIO EQUALIZER
========================================================= */

.h::before{

    content:"";

    position:absolute;

    left:50%;

    bottom:0;

    width:150px;

    height:10px;

    transform:
        translateX(-50%);

    background:

        linear-gradient(
            90deg,
            transparent 0 8%,
            rgba(92,157,255,.35) 8% 12%,
            transparent 12% 16%,

            rgba(116,108,255,.55) 16% 20%,
            transparent 20% 24%,

            rgba(160,111,255,.72) 24% 28%,
            transparent 28% 32%,

            rgba(98,213,255,.55) 32% 36%,
            transparent 36% 40%,

            rgba(160,111,255,.72) 40% 44%,
            transparent 44% 48%,

            rgba(98,213,255,.55) 48% 52%,
            transparent 52% 56%,

            rgba(160,111,255,.72) 56% 60%,
            transparent 60% 64%,

            rgba(116,108,255,.55) 64% 68%,
            transparent 68% 72%,

            rgba(92,157,255,.35) 72% 76%,
            transparent 76% 100%
        );

    background-size:100% 100%;

    opacity:.55;

    filter:
        drop-shadow(
            0 0 4px rgba(100,150,255,.35)
        );

    animation:
        caminoEqualizer 1s ease-in-out infinite alternate;

    pointer-events:none;

    z-index:2;
}


/* =========================================================
   SUBTLE TOP SHINE
========================================================= */

.h::after{

    content:"";

    position:absolute;

    top:0;

    left:-30%;

    width:35%;

    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(160,210,255,.28),
            transparent
        );

    opacity:.35;

    animation:
        caminoMusicSweep 4s linear infinite;

    pointer-events:none;

    z-index:3;
}


/* =========================================================
   HEADER FLOAT
========================================================= */

@keyframes caminoMusicText{

    0%,100%{
        transform:rotate(0deg);
    }

    25%{
        transform:rotate(-0.7deg);
    }

    50%{
        transform:rotate(0.7deg);
    }

    75%{
        transform:rotate(-0.4deg);
    }
}


/* =========================================================
   GLOW PULSE
========================================================= */

@keyframes caminoMusicGlow{

    0%,100%{
        transform:scaleX(.82);

        opacity:.22;
    }

    50%{
        transform:scaleX(1.08);

        opacity:.48;
    }

}


/* =========================================================
   EQUALIZER MOTION
========================================================= */

@keyframes caminoEqualizer{

    0%{
        transform:
            translateX(-50%)
            scaleY(.45);
    }

    25%{
        transform:
            translateX(-50%)
            scaleY(.85);
    }

    50%{
        transform:
            translateX(-50%)
            scaleY(.55);
    }

    75%{
        transform:
            translateX(-50%)
            scaleY(1);
    }

    100%{
        transform:
            translateX(-50%)
            scaleY(.65);
    }

}


/* =========================================================
   SWEEP
========================================================= */

@keyframes caminoMusicSweep{

    0%{
        left:-30%;
        opacity:0;
    }

    20%{
        opacity:.35;
    }

    50%{
        opacity:.25;
    }

    100%{
        left:120%;
        opacity:0;
    }

}


/* =========================================================
   STATUS DOT HIDDEN
========================================================= */

.h .status-dot{
    position:absolute;

    width:1px;
    height:1px;

    opacity:0;

    pointer-events:none;
}


/* =========================================================
   INFO BUTTON
========================================================= */

.h .header-info{
    position:absolute;

    z-index:50;
}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media(prefers-reduced-motion:reduce){

    .h > span:not(.status-dot):not(.header-info),
    .h > span:not(.status-dot):not(.header-info)::before,
    .h::before,
    .h::after{

        animation:none !important;

    }

}


/* =========================================================
   TOP SWEEP
   ::after
========================================================= */

.h::after{
    content:"";

    position:absolute;

    top:0;
    left:-130%;

    width:75%;
    height:100%;

    background:
        linear-gradient(
            110deg,
            transparent,
            rgba(130,180,255,.25),
            rgba(170,130,255,.30),
            transparent
        );

    transform:skewX(-25deg);

    animation:
        headerScan 3.2s linear infinite;

    pointer-events:none;

    z-index:1;
}


@keyframes caminoFullRunningLight{

    0%{
        background-position:200% 0;
    }

    100%{
        background-position:-200% 0;
    }

}


/* sweep */

.h::after{
    content:"";

    position:absolute;

    top:0;
    left:-130%;

    width:75%;
    height:100%;

    background:
        linear-gradient(
            110deg,
            transparent,
            rgba(130,180,255,.25),
            rgba(170,130,255,.30),
            transparent
        );

    transform:skewX(-25deg);

    animation:headerScan 3.2s linear infinite;

    pointer-events:none;

    z-index:1;
}


/* title */

.camino-main-title{
    position:relative;

    z-index:4;

    font-size:16px;

    font-weight:950;

    letter-spacing:3px;

    color:#fff;

    text-shadow:
        0 0 7px rgba(100,160,255,.75),
        0 0 18px rgba(130,90,255,.45);
}


/* old status dot hidden visually */

.h .status-dot{
    position:absolute;

    width:1px;
    height:1px;

    opacity:0;

    pointer-events:none;
}

@keyframes headerFloat{
    0%,100%{
        transform:translateX(0);
    }

    50%{
        transform:translateX(2px);
    }
}

@keyframes headerScan{
    0%{
        left:-130%;
    }

    100%{
        left:145%;
    }
}

@keyframes headerRunningLight{
    0%{
        background-position:220% 0;
        opacity:.45;
    }

    25%{
        opacity:.8;
    }

    50%{
        opacity:1;
    }

    75%{
        opacity:.8;
    }

    100%{
        background-position:-220% 0;
        opacity:.45;
    }
}


/* =========================================================
   HEADER INFO BUTTON
========================================================= */

.header-info{
    position:absolute;

    top:calc(100% + 105px);
    left:-159px;

    width:145px;
    height:44px;

    box-sizing:border-box;

    display:flex;
    align-items:center;
    justify-content:flex-start;

    padding-left:14px;

    margin:0;

    border:1px solid rgba(110,145,255,.18);
    border-radius:9px;

    background:
        linear-gradient(
            90deg,
            rgba(40,50,90,.88),
            rgba(70,55,110,.82)
        );

    color:#fff;

    font-family:Inter,Arial,sans-serif;

    font-size:0;

    text-shadow:
        0 0 7px rgba(100,150,255,.55);

    box-shadow:none;

    cursor:pointer;

    transition:
        transform .2s ease,
        border-color .2s ease,
        background .2s ease,
        box-shadow .2s ease;

    z-index:50;
}

.header-info::after{
    content:"INFO CUTOFF";

    font-size:12px;

    font-weight:900;

    letter-spacing:1.2px;
}

.header-info:hover{
    transform:translateX(2px);

    background:
        linear-gradient(
            90deg,
            rgba(70,120,255,.18),
            rgba(120,70,255,.10),
            transparent
        );

    border-left:2px solid #62d5ff;

    box-shadow:
        0 0 14px rgba(70,110,255,.08);
}


/* =========================================================
   SIDEBAR
========================================================= */

.camino-sidebar{
    position:absolute;

    top:58px;
    left:0;
    bottom:0;

    width:165px;

    min-width:58px;
    max-width:165px;

    box-sizing:border-box;

    padding:20px 12px;

    background:
        linear-gradient(
            180deg,
            rgba(5,8,19,.98),
            rgba(10,8,24,.98)
        );

    border-right:
        1px solid rgba(110,145,255,.18);

    box-shadow:
        inset -10px 0 25px rgba(70,100,255,.035);

    z-index:10;

    display:flex;
    flex-direction:column;

    align-items:stretch;

    gap:7px;
}


/* handle resize */

.camino-sidebar::after{
    content:"";

    position:absolute;

    top:0;
    right:-3px;

    width:6px;
    height:100%;

    cursor:ew-resize;

    background:
        linear-gradient(
            180deg,
            transparent,
            rgba(100,150,255,.22),
            rgba(140,100,255,.30),
            transparent
        );

    opacity:0;

    transition:opacity .2s ease;
}

.camino-sidebar:hover::after{
    opacity:1;
}

.camino-tab-text{
    display:inline;
}

.camino-tab-icon{
    display:none;
}

.camino-sidebar.camino-compact{
    padding-left:7px;
    padding-right:7px;
}

.camino-sidebar.camino-compact .camino-tab{
    justify-content:center;

    padding:0 !important;

    font-size:0 !important;
}

.camino-sidebar.camino-compact .camino-tab-text{
    display:none;
}

.camino-sidebar.camino-compact .camino-tab-icon{
    display:flex;

    align-items:center;
    justify-content:center;

    width:100%;
    height:100%;

    font-size:19px;

    line-height:1;

    text-shadow:
        0 0 7px rgba(100,160,255,.65),
        0 0 15px rgba(130,90,255,.35);
}

.camino-sidebar.camino-compact .camino-brand{
    font-size:18px;
    letter-spacing:2px;
}

/* =========================================================
   ELC BRAND
========================================================= */

.camino-brand{
    height:100px;
    min-height:100px;

    display:flex;
    align-items:center;
    justify-content:center;

    margin-bottom:18px;

    border-bottom:1px solid rgba(110,145,255,.14);

    overflow:hidden;
}

.camino-brand-gif{
    width:150px;
    height:100px;

    object-fit:contain;
    display:block;

    border-radius:12px;

    filter:
        drop-shadow(0 0 5px rgba(90,160,255,.8))
        drop-shadow(0 0 10px rgba(130,80,255,.45));

    user-select:none;
    pointer-events:none;
}

.camino-sidebar.camino-compact .camino-brand-gif{
    width:34px;
    height:34px;

    border-radius:8px;
}

/* =========================================================
   SIDEBAR TABS
========================================================= */

.camino-tab{
    position:relative;

    width:100% !important;
    min-height:44px;

    display:flex;
    align-items:center;
    justify-content:flex-start;

    box-sizing:border-box;

    padding:0 13px !important;
    margin:0 !important;

    border:1px solid transparent !important;
    border-radius:9px !important;

    background:transparent !important;

    color:#7784a3 !important;

    font-family:Inter,Arial,sans-serif !important;

    font-size:12px !important;

    font-weight:900 !important;

    letter-spacing:1.5px !important;

    text-align:left;

    cursor:pointer;

    box-shadow:none !important;

    transform:none !important;

    transition:
        color .2s ease,
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;
}


/* active line */

.camino-tab::before{
    content:"";

    position:absolute;

    left:0;

    top:8px;
    bottom:8px;

    width:2px;

    border-radius:10px;

    background:
        linear-gradient(
            180deg,
            #5c9dff,
            #9a6cff,
            #62d5ff
        );

    opacity:0;

    transform:scaleY(.4);

    transition:
        opacity .2s ease,
        transform .2s ease;

    pointer-events:none;
}


/* shine */

.camino-tab::after{
    content:"";

    position:absolute;

    top:0;
    left:-100%;

    width:60%;
    height:100%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(120,180,255,.12),
            rgba(160,110,255,.14),
            transparent
        );

    transform:skewX(-20deg);

    opacity:0;

    pointer-events:none;
}

.camino-tab:hover{
    color:#e7edff !important;

    background:
        linear-gradient(
            90deg,
            rgba(70,120,255,.10),
            rgba(120,70,255,.06),
            transparent
        ) !important;

    transform:translateX(2px) !important;

    box-shadow:
        inset 0 0 18px rgba(80,110,255,.035) !important;
}

.camino-tab:hover::after{
    opacity:1;

    animation:caminoTabSweep .6s ease;
}

.camino-tab.active{
    color:#fff !important;

    background:
        linear-gradient(
            90deg,
            rgba(70,120,255,.17),
            rgba(120,70,255,.10),
            transparent
        ) !important;

    border-color:
        rgba(110,145,255,.08) !important;

    box-shadow:
        inset 0 0 18px rgba(80,110,255,.045),
        0 0 14px rgba(70,110,255,.06) !important;
}

.camino-tab.active::before{
    opacity:1;

    transform:scaleY(1);

    box-shadow:
        0 0 8px rgba(80,150,255,.9),
        0 0 16px rgba(130,80,255,.55);
}

@keyframes caminoTabSweep{
    0%{
        left:-100%;
    }

    100%{
        left:140%;
    }
}


/* =========================================================
   CONTENT AREA
========================================================= */

.camino-content{
    position:absolute;

    top:58px;
    left:165px;
    right:0;
    bottom:0;

    box-sizing:border-box;

    padding:18px;

    overflow-y:auto;
    overflow-x:hidden;

    scrollbar-width:none;

    z-index:3;
}

.camino-content::-webkit-scrollbar{
    width:0;
    height:0;
}


/* content elements remain normal */

.camino-content > .section,
.camino-content > .limit-box,
.camino-content > .btns,
.camino-content > .info{
    width:100%;

    margin-left:0;
    margin-right:0;

    box-sizing:border-box;
}


/* =========================================================
   ENGINE SECTION
========================================================= */

.section{
    position:relative;

    width:100%;

    padding:12px;

    margin-top:10px;

    box-sizing:border-box;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.025),
            rgba(60,110,255,.035),
            rgba(120,80,255,.035)
        );

    border:1px solid rgba(110,130,255,.18);

    border-radius:13px;

    backdrop-filter:blur(8px);

    overflow:visible;
}

.section::before{
    content:"";

    position:absolute;

    top:0;

    left:12px;
    right:12px;

    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(80,150,255,.65),
            rgba(120,100,255,.65),
            rgba(170,100,255,.45),
            transparent
        );

    pointer-events:none;
}

.section-title{
    font-size:12px;

    font-weight:900;

    color:#91b4ff;

    letter-spacing:1.4px;

    margin-bottom:10px;

    text-transform:uppercase;

    text-shadow:
        0 0 7px rgba(80,140,255,.55),
        0 0 14px rgba(120,80,255,.25);
}


/* =========================================================
   BANK GRID
========================================================= */

.bank-grid{
    display:grid;

    grid-template-columns:1fr 1fr;

    gap:8px;
}

.bank-grid label{
    position:relative;

    overflow:hidden;

    display:flex;
    align-items:center;

    gap:8px;

    padding:10px;

    border-radius:11px;

    border:1px solid rgba(255,255,255,.065);

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.025),
            rgba(50,70,140,.035),
            rgba(80,50,130,.025)
        );

    color:#777;

    cursor:pointer;

    transition:
        transform .3s ease,
        border-color .3s ease,
        background .3s ease,
        box-shadow .3s ease;

    box-shadow:
        inset 0 0 15px rgba(0,0,0,.4);
}

.bank-grid label::before{
    content:"";

    position:absolute;

    top:-30%;
    left:-120%;

    width:45%;
    height:160%;

    background:
        linear-gradient(
            105deg,
            transparent 0%,
            rgba(255,255,255,.025) 25%,
            rgba(120,180,255,.18) 42%,
            rgba(255,255,255,.65) 50%,
            rgba(150,120,255,.22) 58%,
            transparent 100%
        );

    transform:skewX(-20deg);

    opacity:0;

    pointer-events:none;

    z-index:1;
}

.bank-grid label > *{
    position:relative;

    z-index:2;
}

.bank-grid label:hover{
    transform:translateY(-1px) scale(1.015);

    color:#fff;

    border-color:rgba(120,160,255,.55);

    background:
        linear-gradient(
            120deg,
            rgba(60,120,255,.08),
            rgba(100,80,255,.09),
            rgba(160,80,255,.05)
        );

    box-shadow:
        0 0 12px rgba(70,120,255,.12),
        0 0 20px rgba(120,70,255,.08),
        inset 0 0 18px rgba(100,100,255,.05);
}

.bank-grid label:hover::before{
    opacity:1;

    animation:bankFullShine .7s ease;
}

@keyframes bankFullShine{
    0%{
        left:-120%;
        opacity:0;
    }

    15%{
        opacity:1;
    }

    100%{
        left:145%;
        opacity:0;
    }
}

.bank-grid label:has(input:checked){
    background:
        linear-gradient(
            120deg,
            rgba(60,130,255,.13),
            rgba(100,80,255,.14),
            rgba(150,80,255,.07)
        );

    border-color:rgba(120,150,255,.65);

    color:#fff;

    box-shadow:
        0 0 15px rgba(70,120,255,.16),
        0 0 22px rgba(120,70,255,.1),
        inset 0 0 20px rgba(100,100,255,.06);

    transform:scale(1.025);
}

.bank-grid label:has(input:checked):hover{
    border-color:rgba(170,190,255,.85);

    background:
        linear-gradient(
            120deg,
            rgba(70,140,255,.18),
            rgba(110,85,255,.18),
            rgba(165,85,255,.10)
        );

    box-shadow:
        0 0 16px rgba(70,130,255,.22),
        0 0 28px rgba(125,75,255,.14),
        inset 0 0 22px rgba(100,100,255,.08);
}

.bank-grid label:has(input:checked)::before{
    animation:bankLightBlue .8s ease;
}

.bank-grid input{
    appearance:none;
    -webkit-appearance:none;

    width:18px;
    height:18px;

    min-width:18px;
    min-height:18px;

    position:relative;

    flex-shrink:0;

    border-radius:50%;

    border:1px solid rgba(145,165,215,.35);

    background:
        radial-gradient(
            circle at 35% 30%,
            rgba(255,255,255,.10),
            rgba(255,255,255,.025) 28%,
            rgba(10,12,28,.96) 72%
        );

    cursor:pointer;

    overflow:hidden;

    transition:
        transform .25s ease,
        border-color .25s ease,
        box-shadow .25s ease;
}

.bank-grid input:hover{
    transform:scale(1.06);

    border-color:rgba(145,170,220,.55);

    background:
        radial-gradient(
            circle at 35% 30%,
            rgba(255,255,255,.16),
            rgba(255,255,255,.035) 30%,
            rgba(12,14,30,.96) 72%
        );

    box-shadow:
        inset 0 0 5px rgba(0,0,0,.75),
        0 0 5px rgba(90,120,180,.12);
}

.bank-grid input:hover::before{
    content:"";

    position:absolute;

    top:-40%;
    left:-130%;

    width:35%;
    height:180%;

    background:
        linear-gradient(
            105deg,
            transparent,
            rgba(255,255,255,.08),
            rgba(255,255,255,.22),
            rgba(180,210,255,.08),
            transparent
        );

    transform:skewX(-20deg);

    animation:checkboxSoftShine .7s ease;

    pointer-events:none;
}

.bank-grid input:checked{
    background:
        radial-gradient(
            circle at 35% 30%,
            #fff 0%,
            #eaf4ff 9%,
            #91c8ff 23%,
            #668cff 42%,
            #765cff 61%,
            #a05cff 78%,
            #38206d 100%
        );

    border-color:rgba(195,215,255,.98);

    box-shadow:
        inset 0 0 4px rgba(255,255,255,.95),
        0 0 6px rgba(80,155,255,.95),
        0 0 13px rgba(110,85,255,.85),
        0 0 22px rgba(160,80,255,.42),
        0 0 30px rgba(100,120,255,.16);

    animation:animeCorePulse 2s ease-in-out infinite;
}

.bank-grid input:checked:hover{
    transform:scale(1.1);

    border-color:#d6e4ff;

    box-shadow:
        inset 0 0 5px rgba(255,255,255,1),
        0 0 8px rgba(90,170,255,1),
        0 0 17px rgba(115,90,255,.95),
        0 0 28px rgba(170,80,255,.48),
        0 0 38px rgba(100,130,255,.18);
}

.bank-grid input:checked::after{
    content:"";

    position:absolute;

    width:6px;
    height:6px;

    top:50%;
    left:50%;

    transform:translate(-50%,-50%);

    border-radius:50%;

    background:#fff;

    box-shadow:
        0 0 4px #fff,
        0 0 9px rgba(130,190,255,1),
        0 0 15px rgba(135,100,255,.85);
}

@keyframes checkboxSoftShine{
    0%{
        left:-130%;
        opacity:0;
    }

    20%{
        opacity:.6;
    }

    100%{
        left:150%;
        opacity:0;
    }
}

@keyframes bankLightBlue{
    0%{
        left:-120%;
        opacity:0;
    }

    20%{
        opacity:1;
    }

    100%{
        left:145%;
        opacity:0;
    }
}

@keyframes animeCorePulse{
    0%,100%{
        filter:brightness(1);
    }

    50%{
        filter:brightness(1.12);
    }
}


/* =========================================================
   APPROVE LIMIT
========================================================= */

.limit-box{
    position:relative;

    width:100%;

    margin:12px 0 0;

    padding:12px;

    box-sizing:border-box;

    background:
        linear-gradient(
            135deg,
            rgba(60,120,255,.06),
            rgba(100,80,255,.07),
            rgba(150,80,255,.035)
        );

    border:1px solid rgba(110,130,255,.22);

    border-radius:12px;

    backdrop-filter:blur(12px);

    box-shadow:
        inset 0 0 25px rgba(80,100,255,.04),
        0 4px 18px rgba(0,0,0,.3);

    overflow:hidden;
}

.limit-box::before{
    content:"";

    position:absolute;

    top:0;
    left:-120%;

    width:75%;
    height:100%;

    background:
        linear-gradient(
            110deg,
            transparent,
            rgba(80,150,255,.12),
            rgba(140,100,255,.16),
            transparent
        );

    transform:skewX(-25deg);

    animation:limitScanBlue 4s linear infinite;

    pointer-events:none;
}

.limit-box label{
    display:block;

    margin-bottom:10px;

    font-size:14px;

    color:#91b4ff;

    font-weight:900;

    letter-spacing:2px;

    text-transform:uppercase;

    text-shadow:
        0 0 7px rgba(80,140,255,.75),
        0 0 16px rgba(130,80,255,.4);
}

.limit-box input{
    width:100%;

    box-sizing:border-box;

    padding:13px 15px;

    border-radius:10px;

    border:1px solid rgba(110,140,255,.3);

    background:rgba(2,4,12,.68);

    color:#fff;

    outline:none;

    font-size:16px;

    font-weight:800;

    letter-spacing:.8px;

    transition:.3s ease;

    box-shadow:
        inset 0 0 14px rgba(0,0,0,.35),
        0 4px 14px rgba(0,0,0,.2);
}

.limit-box input::placeholder{
    color:rgba(180,190,255,.32);

    font-size:15px;

    font-weight:500;
}

.limit-box input:hover{
    border-color:rgba(110,160,255,.65);

    box-shadow:
        0 0 12px rgba(70,130,255,.18),
        inset 0 0 14px rgba(0,0,0,.4);
}

.limit-box input:focus{
    border-color:#789cff;

    background:rgba(8,10,28,.92);

    box-shadow:
        0 0 8px rgba(80,140,255,.6),
        0 0 20px rgba(120,80,255,.22),
        inset 0 0 12px rgba(80,120,255,.1);

    text-shadow:
        0 0 8px rgba(100,150,255,.45);
}

.limit-box input::-webkit-inner-spin-button,
.limit-box input::-webkit-outer-spin-button{
    -webkit-appearance:none;
    margin:0;
}

.limit-box input{
    -moz-appearance:textfield;
}

@keyframes limitScanBlue{
    0%{
        left:-120%;
        opacity:0;
    }

    15%{
        opacity:1;
    }

    45%,100%{
        left:145%;
        opacity:0;
    }
}


/* =========================================================
   BUTTONS
========================================================= */

.btns{
    display:flex;

    flex-direction:column;

    gap:10px;

    width:100%;

    margin-top:15px;

    padding:0;
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

    padding:12px;

    font-size:13px;

    border:none;

    border-radius:10px;

    background:
        linear-gradient(
            115deg,
            #29365c,
            #40366a,
            #3b4d78,
            #302b5a
        );

    background-size:300% 100%;

    color:#fff;

    font-weight:800;

    letter-spacing:.3px;

    cursor:pointer;

    transition:.3s;

    position:relative;

    overflow:hidden;

    box-shadow:
        0 5px 15px rgba(0,0,0,.4),
        inset 0 1px rgba(255,255,255,.1);
}

button::before{
    content:"";

    position:absolute;

    top:0;
    left:-100%;

    width:50%;
    height:100%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(120,180,255,.2),
            rgba(170,130,255,.2),
            transparent
        );

    transform:skewX(-25deg);

    pointer-events:none;
}

button:hover::before{
    animation:buttonBlueSweep .55s ease;
}

button:hover{
    transform:translateY(-1px) scale(1.02);

    background-position:100% 0;

    box-shadow:
        0 7px 18px rgba(0,0,0,.4),
        0 0 10px rgba(70,130,255,.18),
        0 0 20px rgba(130,80,255,.12);
}

button:active{
    transform:translateY(0) scale(.98);

    box-shadow:
        0 2px 8px rgba(0,0,0,.3);
}

@keyframes buttonBlueSweep{
    0%{
        left:-100%;
    }

    100%{
        left:140%;
    }
}


/* =========================================================
   START / STOP ENGINE BUTTON
========================================================= */

#clicksterBtn{
    position:relative !important;

    overflow:hidden !important;
}

#clicksterBtn .camino-border-svg{
    position:absolute;

    inset:0;

    width:100%;
    height:100%;

    pointer-events:none;

    z-index:20;

    overflow:visible;
}

#clicksterBtn .camino-border-svg rect{
    fill:none;

    stroke:#ff4141;

    stroke-width:2.5;

    stroke-linecap:round;

    stroke-dasharray:45 955;

    stroke-dashoffset:0;

    filter:
        drop-shadow(0 0 2px #ffffff)
        drop-shadow(0 0 5px #ffffff)
        drop-shadow(0 0 9px #ff5555)
        drop-shadow(0 0 16px #ff2222)
        drop-shadow(0 0 28px rgba(255,30,30,.8))
        drop-shadow(0 0 42px rgba(255,0,0,.35));

    animation:caminoBorderTravel 1s linear infinite;
}

@keyframes caminoBorderTravel{
    to{
        stroke-dashoffset:-1000;
    }
}

@keyframes caminoEngineSweep{
    0%{
        background-position:-200% 0;
    }

    100%{
        background-position:200% 0;
    }
}


/* =========================================================
   EL CAMINO VERIFIER BUTTON
========================================================= */

#accountValidatorBtn{

    display:none !important;

    width:100%;

    min-height:44px;

    box-sizing:border-box;

    margin:0;

    position:relative;

    font-size:12px;

    letter-spacing:1.2px;
}


/* =========================================================
   BLOCK STATUS
========================================================= */

.info{
    position:relative;

    width:100%;

    margin-top:12px;

    padding:12px;

    box-sizing:border-box;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.025),
            rgba(80,120,255,.035),
            rgba(120,80,255,.025)
        );

    border:1px solid rgba(120,140,255,.15);

    border-radius:13px;

    box-shadow:
        inset 0 0 20px rgba(70,100,255,.025);

    overflow:visible;
}

#BLOCK_STATUS{
    position:relative;

    width:100%;

    box-sizing:border-box;

    margin:5px auto 12px;

    padding:14px;

    border-radius:13px;

    background:
        linear-gradient(
            115deg,
            rgba(60,120,255,.12),
            rgba(100,80,255,.14),
            rgba(150,80,255,.08)
        );

    border:1px solid rgba(105,140,255,.4);

    color:#9dbdff;

    font-size:14px;

    font-weight:900;

    letter-spacing:1.2px;

    text-align:center;

    display:flex;

    align-items:center;

    justify-content:center;

    overflow:visible;

    box-shadow:
        0 0 15px rgba(70,110,255,.12),
        0 0 25px rgba(120,70,255,.06),
        inset 0 0 20px rgba(90,100,255,.05);

    animation:statusPulse 2.5s ease-in-out infinite;
}


/* =========================================================
   INFO CUTOFF POPUP
   EXISTING FUNCTION/BEHAVIOR PRESERVED
========================================================= */

.cutoff-popup{
    position:fixed;

    top:50%;
    left:50%;

    width:380px;

    padding:25px;

    box-sizing:border-box;

    transform:
        translate(-50%,-50%)
        scale(.85);

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(80,140,255,.12),
            transparent 42%
        ),
        linear-gradient(
            145deg,
            rgba(5,8,20,.99),
            rgba(15,10,30,.99),
            rgba(7,10,24,.99)
        );

    border:1px solid rgba(110,140,255,.55);

    border-radius:17px;

    z-index:999999;

    box-shadow:
        0 0 40px #000,
        0 0 25px rgba(80,120,255,.20),
        0 0 50px rgba(130,70,255,.12),
        inset 0 0 25px rgba(80,120,255,.05);

    font-size:14px;

    line-height:1.9;

    letter-spacing:.4px;

    font-weight:600;

    color:#e9edff;

    text-shadow:
        0 0 8px rgba(120,150,255,.25);

    cursor:default;

    opacity:0;

    visibility:hidden;

    transition:
        opacity .25s ease,
        transform .25s ease;

    will-change:left,top;

    user-select:none;

    backdrop-filter:blur(18px);

    overflow:hidden;
}

.cutoff-popup::before{
    content:"";

    position:absolute;

    top:0;
    left:-100%;

    width:70%;
    height:2px;

    background:
        linear-gradient(
            90deg,
            transparent,
            #5ca8ff,
            #8170ff,
            #b06cff,
            #62d5ff,
            transparent
        );

    box-shadow:
        0 0 6px rgba(90,160,255,.9),
        0 0 14px rgba(120,90,255,.7),
        0 0 25px rgba(90,150,255,.4);

    animation:infoBlueRunner 2.2s linear infinite;

    pointer-events:none;
}

.cutoff-popup::after{
    content:"";

    position:absolute;

    inset:0;

    background:
        radial-gradient(
            circle at 10% 10%,
            rgba(70,130,255,.08),
            transparent 30%
        ),
        radial-gradient(
            circle at 90% 90%,
            rgba(140,70,255,.07),
            transparent 35%
        );

    pointer-events:none;
}

.cutoff-popup.show{
    opacity:1;

    visibility:visible;

    transform:
        translate(-50%,-50%)
        scale(1);

    animation:cutoffBlueAnime .35s ease;
}

.cutoff-popup h3{
    margin-top:0;

    color:#91b4ff;

    font-size:18px;

    font-weight:900;

    letter-spacing:1px;

    text-shadow:
        0 0 8px rgba(80,140,255,.9),
        0 0 17px rgba(100,110,255,.6),
        0 0 28px rgba(150,80,255,.3);

    padding-right:35px;

    cursor:move;

    position:relative;

    z-index:2;
}

.cutoff-close{
    position:absolute;

    right:15px;
    top:12px;

    cursor:pointer;

    color:#789cff;

    font-size:20px;

    font-weight:900;

    transition:.2s;

    text-shadow:
        0 0 8px rgba(70,120,255,.9),
        0 0 16px rgba(120,80,255,.45);

    z-index:5;
}

.cutoff-close:hover{
    color:#c3b8ff;

    transform:
        scale(1.15)
        rotate(8deg);

    text-shadow:
        0 0 10px rgba(100,160,255,1),
        0 0 22px rgba(130,80,255,.7),
        0 0 35px rgba(100,140,255,.4);
}

.cutoff-content{
    position:relative;

    z-index:2;

    font-size:22px;

    font-weight:700;

    line-height:2;

    letter-spacing:.8px;

    color:#e9edff;

    text-shadow:
        0 0 7px rgba(100,140,255,.35);
}

.cutoff-content b{
    font-size:23px;

    font-weight:900;

    color:#91b4ff;

    text-shadow:
        0 0 8px rgba(80,140,255,.8),
        0 0 16px rgba(130,80,255,.45);
}

.cutoff-popup img.logo{
    width:17px;
    height:17px;

    vertical-align:middle;

    margin-right:7px;

    border-radius:3px;

    filter:
        drop-shadow(0 0 4px rgba(80,150,255,.65))
        drop-shadow(0 0 8px rgba(130,80,255,.35));
}

.cutoff-title{
    color:#91b4ff;

    font-weight:900;

    text-shadow:
        0 0 7px rgba(80,140,255,.75),
        0 0 15px rgba(130,80,255,.35);
}

@keyframes cutoffBlueAnime{
    0%{
        opacity:0;

        transform:
            translate(-50%,-50%)
            scale(.85);

        box-shadow:
            0 0 0 rgba(80,130,255,0);
    }

    100%{
        opacity:1;

        transform:
            translate(-50%,-50%)
            scale(1);

        box-shadow:
            0 0 40px #000,
            0 0 25px rgba(70,120,255,.18),
            0 0 45px rgba(130,70,255,.10),
            inset 0 0 25px rgba(80,120,255,.05);
    }
}

@keyframes infoBlueRunner{
    0%{
        left:-100%;
        opacity:0;
    }

    15%{
        opacity:1;
    }

    50%{
        opacity:1;
    }

    100%{
        left:150%;
        opacity:0;
    }
}


/* =========================================================
   LOGO / MISC
========================================================= */

.logo{
    width:14px;
    height:14px;

    vertical-align:middle;

    margin-right:6px;

    border-radius:3px;
}

.limit-title{
    font-size:12px;

    font-weight:bold;

    color:#91b4ff;

    margin-bottom:8px;

    text-shadow:
        0 0 7px rgba(80,140,255,.65),
        0 0 14px rgba(130,80,255,.3);
}


/* =========================================================
   QUOTE
========================================================= */

.quote{
    margin-top:12px;

    text-align:center;

    font-size:14px;

    font-weight:800;

    color:#fff;

    font-style:normal;

    line-height:1.6;

    letter-spacing:.5px;

    text-shadow:
        0 0 8px rgba(90,140,255,.45);

    animation:blueQuote 1.5s ease-in-out infinite;
}

.music-note{
    display:inline-block;

    animation:
        blueNote .65s ease-in-out infinite alternate;
}

@keyframes blueQuote{
    0%,100%{
        transform:scale(1);

        opacity:.85;

        text-shadow:
            0 0 6px rgba(80,130,255,.3);
    }

    50%{
        transform:scale(1.025);

        opacity:1;

        text-shadow:
            0 0 8px rgba(80,150,255,.8),
            0 0 18px rgba(130,90,255,.5),
            0 0 30px rgba(170,80,255,.2);
    }
}

@keyframes blueNote{
    0%{
        transform:
            translateY(2px)
            rotate(-8deg);

        text-shadow:
            0 0 5px rgba(80,140,255,.4);
    }

    100%{
        transform:
            translateY(-3px)
            rotate(8deg);

        text-shadow:
            0 0 8px rgba(90,150,255,.9),
            0 0 16px rgba(140,90,255,.6);
    }
}


/* =========================================================
   FOOTER / MARQUEE
========================================================= */

.ft{
    position:relative;

    overflow:hidden;

    padding:6px 10px;

    mask-image:
        linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
        );

    background:
        linear-gradient(
            90deg,
            rgba(3,6,16,.98),
            rgba(8,10,25,.92),
            rgba(3,6,16,.98)
        );

    border-top:1px solid rgba(110,145,255,.16);

    border-bottom:1px solid rgba(110,145,255,.16);

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.025),
        inset 0 -1px 0 rgba(0,0,0,.45),
        0 0 18px rgba(50,80,180,.08);
}

.marq{
    display:inline-flex;

    align-items:center;

    white-space:nowrap;

    width:max-content;

    will-change:transform;

    animation:mar 42s linear infinite;

    font-size:11px;

    font-weight:900;

    letter-spacing:2.2px;

    color:#a8c3ff;

    text-shadow:
        0 0 5px rgba(100,150,255,.65),
        0 0 12px rgba(80,120,255,.28),
        0 0 22px rgba(120,80,255,.12);

    filter:saturate(1.15);
}

.marq span{
    display:inline-block;

    padding-right:100px;

    color:#a8c3ff;

    text-shadow:
        0 0 5px rgba(100,150,255,.65),
        0 0 12px rgba(80,120,255,.28),
        0 0 22px rgba(120,80,255,.12);
}

.ft::before{
    content:"";

    position:absolute;

    top:0;
    bottom:0;

    left:-20%;

    width:18%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(120,160,255,.08),
            transparent
        );

    transform:skewX(-20deg);

    animation:marqScan 5s ease-in-out infinite;

    pointer-events:none;
}

.ft::after{
    content:"";

    position:absolute;

    left:0;
    right:0;
    bottom:0;

    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(100,145,255,.35),
            rgba(150,100,255,.25),
            transparent
        );

    opacity:.7;
}

@keyframes mar{
    0%{
        transform:translateX(0);
    }

    100%{
        transform:translateX(-50%);
    }
}

@keyframes marqScan{
    0%,65%{
        left:-20%;
        opacity:0;
    }

    75%{
        opacity:1;
    }

    100%{
        left:110%;
        opacity:0;
    }
}


/* =========================================================
   CHECKBOX / GENERAL
========================================================= */

input[type="checkbox"]{
    width:15px;
    height:15px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media(max-width:800px){

    .p{
        width:calc(100vw - 25px);
        height:calc(100vh - 35px);
    }

    .camino-sidebar{
        width:135px;
    }

    .camino-content{
        left:135px;
    }

    .camino-brand{
        font-size:23px;
    }

    .camino-tab{
        font-size:10px !important;
        letter-spacing:1px !important;
    }

    .header-info{
        left:-139px;
        width:135px;
    }
}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media(prefers-reduced-motion:reduce){

    .p::after,
    .h,
    .h::before,
    .limit-box::before,
    #BLOCK_STATUS,
    #BLOCK_STATUS::before,
    .cutoff-popup::before,
    .ft::before,
    .bank-grid input,
    .camino-tab::after{
        animation:none !important;
    }
}

.camino-view{
    display:none;
    width:100%;
    height:100%;
    box-sizing:border-box;

    animation:caminoViewIn .22s ease;
}

.camino-view.active{
    display:block;
}

.camino-view-title{
    margin-bottom:15px;

    color:#91b4ff;

    font-size:15px;

    font-weight:950;

    letter-spacing:2px;

    text-shadow:
        0 0 7px rgba(80,140,255,.65),
        0 0 15px rgba(130,80,255,.3);
}

@keyframes caminoViewIn{
    from{
        opacity:0;
        transform:translateY(4px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }
}

.camino-view[data-view="cutoff"] .cutoff-popup{
    position:relative;

    top:auto;
    left:auto;

    width:100%;

    margin:0;

    box-sizing:border-box;

    transform:none;

    opacity:1;
    visibility:visible;

    padding:22px;

    z-index:2;

    backdrop-filter:none;
}

.camino-view[data-view="cutoff"] .cutoff-close{
    display:none;
}

.camino-view[data-view="cutoff"] .cutoff-popup h3{
    cursor:default;
}

/* =========================================================
   VALIDATOR — VISUAL INTEGRATION
========================================================= */

#account-validator-panel{
    position:fixed !important;

    top:calc(60px + 58px + 18px) !important;
    left:auto !important;

    width:560px !important;
    min-width:0 !important;
    max-width:none !important;

    height:calc(100vh - 155px) !important;
    min-height:0 !important;
    max-height:none !important;

    margin:0 !important;

    transform:none !important;

    resize:none !important;

    border-radius:14px !important;

    z-index:999999999 !important;
}

/* =========================================================
   VALIDATOR INTEGRATED VISUAL
========================================================= */

#account-validator-panel{
    box-sizing:border-box !important;

    margin:0 !important;

    overflow:hidden !important;

    resize:none !important;

    transition:
        left .2s ease,
        top .2s ease,
        width .2s ease,
        height .2s ease !important;
}

/* ketika validator sedang tampil */
#account-validator-panel.camino-validator-open{
    display:block !important;
}

/* =========================================================
   VALIDATOR INSIDE CAMINO TAB
========================================================= */

.camino-view[data-view="validator"]{
    width:100%;
    height:100%;
    box-sizing:border-box;

    padding:0;
}

.camino-view[data-view="validator"] .camino-view-title{
    display:none;
}

.camino-view[data-view="validator"] #validator-view-mount{
    width:100%;
    height:100%;
    box-sizing:border-box;
}


/* =========================================
   VALIDATOR PANEL
========================================= */

.camino-view[data-view="validator"] #account-validator-panel{
    position:relative !important;

    top:auto !important;
    left:auto !important;

    width:100% !important;
    height:auto !important;

    min-width:0 !important;
    min-height:0 !important;

    max-width:none !important;
    max-height:none !important;

    margin:0 !important;

    padding:0 !important;

    transform:none !important;

    resize:none !important;

    overflow:hidden !important;

    box-sizing:border-box;

    border-radius:14px !important;

    background:
        linear-gradient(
            145deg,
            rgba(7,10,20,.98),
            rgba(10,14,28,.98),
            rgba(12,12,27,.98)
        ) !important;

    border:
        1px solid rgba(110,140,220,.28) !important;

    box-shadow:
        0 12px 30px rgba(0,0,0,.35),
        inset 0 0 25px rgba(70,100,200,.035) !important;
}


/* =========================================
   HEADER
========================================= */

.camino-view[data-view="validator"] .av-header{
    height:72px !important;

    padding:
        15px 18px !important;

    cursor:default !important;

    background:
        linear-gradient(
            180deg,
            rgba(13,18,32,.98),
            rgba(8,11,20,.98)
        ) !important;

    border-bottom:
        1px solid rgba(110,135,205,.16) !important;
}


.camino-view[data-view="validator"] .av-title{
    font-size:16px !important;

    letter-spacing:1.5px !important;

    font-weight:950 !important;
}


.camino-view[data-view="validator"] .av-subtitle{
    margin-top:4px !important;

    font-size:9px !important;

    letter-spacing:1.2px !important;

    color:#8493ba !important;
}


/* close button tetap ada tetapi kecil */
.camino-view[data-view="validator"] #av-close{
    width:30px !important;
    height:30px !important;

    border-radius:8px !important;

    font-size:20px !important;
}


/* =========================================
   BODY
========================================= */

.camino-view[data-view="validator"] .av-body{
    width:100% !important;

    height:auto !important;

    min-height:0 !important;

    padding:
        18px !important;

    overflow:visible !important;
}


/* =========================================
   LABEL
========================================= */

.camino-view[data-view="validator"] .av-body label{
    font-size:11px !important;

    letter-spacing:1.2px !important;

    margin-bottom:7px !important;

    color:#aeb9d8 !important;
}


/* =========================================
   INPUT
========================================= */

.camino-view[data-view="validator"] .av-body input{
    height:46px !important;

    font-size:14px !important;

    border-radius:9px !important;

    background:
        rgba(5,9,18,.88) !important;
}


.camino-view[data-view="validator"] .av-bank-picker{
    margin-bottom:15px !important;
}


.camino-view[data-view="validator"] #av-account{
    margin-bottom:15px !important;
}


/* =========================================
   BANK DROPDOWN
========================================= */

.camino-view[data-view="validator"] .av-bank-list{
    max-height:220px !important;

    border-radius:9px !important;

    background:#080d18 !important;

    box-shadow:
        0 15px 35px rgba(0,0,0,.65) !important;
}


/* =========================================
   VALIDATE BUTTON
========================================= */

.camino-view[data-view="validator"] #av-validate{
    height:48px !important;

    border-radius:9px !important;

    font-size:13px !important;

    letter-spacing:1.3px !important;
}


/* =========================================
   RESULT
========================================= */

.camino-view[data-view="validator"] #av-result{
    margin-top:15px !important;

    padding:15px !important;

    border-radius:10px !important;

    background:
        linear-gradient(
            145deg,
            rgba(7,11,20,.96),
            rgba(10,14,24,.96)
        ) !important;
}


.camino-view[data-view="validator"] .av-result-title{
    margin-bottom:9px !important;

    font-size:11px !important;

    letter-spacing:1.2px !important;
}


/* =========================================
   REMOVE OLD PANEL LOOK
========================================= */

.camino-view[data-view="validator"] #account-validator-panel::before{
    border-radius:14px !important;

    opacity:.7;
}


.camino-view[data-view="validator"] #account-validator-panel::after{
    opacity:.55;
}

.camino-clock{
    margin-top:auto;

    width:100%;

    padding-top:12px;
    padding-bottom:4px;

    border-top:1px solid rgba(110,145,255,.14);

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    gap:4px;

    box-sizing:border-box;
}

.camino-clock-time{
    font-family:
        "JetBrains Mono",
        "Consolas",
        monospace;

    font-size:18px;

    font-weight:900;

    letter-spacing:1.5px;

    color:#a8c6ff;

    text-shadow:
        0 0 6px rgba(90,160,255,.75),
        0 0 15px rgba(120,80,255,.35);

    white-space:nowrap;
}

.camino-clock-label{
    font-size:8px;

    font-weight:800;

    letter-spacing:1.8px;

    color:#66779f;

    text-transform:uppercase;
}

.camino-sidebar.camino-compact .camino-clock-time{
    font-size:11px;
    letter-spacing:.5px;
}

.camino-sidebar.camino-compact .camino-clock-label{
    display:none;
}

/* =========================================================
   HEADER MINIMIZE
========================================================= */

.camino-minimize-btn{
    position:absolute;

    right:12px;
    top:50%;

    transform:translateY(-50%);

    width:32px;
    height:32px;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:0;

    border:1px solid rgba(110,145,255,.20);
    border-radius:8px;

    background:
        linear-gradient(
            145deg,
            rgba(20,28,52,.90),
            rgba(12,16,32,.90)
        );

    color:#a9c5ff;

    font-family:
        Arial,
        sans-serif;

    font-size:22px;
    font-weight:400;

    line-height:1;

    cursor:pointer;

    z-index:60;

    box-shadow:
        0 0 8px rgba(70,120,255,.08),
        inset 0 1px 0 rgba(255,255,255,.06);

    transition:
        transform .18s ease,
        background .2s ease,
        border-color .2s ease,
        box-shadow .2s ease,
        color .2s ease;
}

.camino-minimize-btn:hover{
    transform:
        translateY(-50%)
        scale(1.06);

    color:#fff;

    border-color:
        rgba(120,160,255,.55);

    background:
        linear-gradient(
            145deg,
            rgba(35,48,82,.95),
            rgba(18,24,48,.95)
        );

    box-shadow:
        0 0 10px rgba(80,140,255,.20),
        0 0 20px rgba(120,80,255,.10),
        inset 0 1px 0 rgba(255,255,255,.08);
}

.camino-minimize-btn:active{
    transform:
        translateY(-50%)
        scale(.94);
}

/* =========================================================
   MINIMIZED PANEL
   KEEP ORIGINAL WIDTH
========================================================= */

.p.camino-minimized{
    height:58px !important;
    min-height:58px !important;

    /* JANGAN TENTUKAN WIDTH */
    overflow:hidden !important;

    border-radius:16px !important;

    box-sizing:border-box !important;

    border:1px solid rgba(120,145,255,.45) !important;

    box-shadow:
        0 10px 30px rgba(0,0,0,.55),
        0 0 18px rgba(80,120,255,.12),
        inset 0 0 20px rgba(70,110,255,.08) !important;
}


/* sembunyikan isi */
.p.camino-minimized .camino-sidebar,
.p.camino-minimized .camino-content{
    display:none !important;
}


/* header tetap mengikuti lebar panel */
.p.camino-minimized .h{
    width:100% !important;

    height:58px !important;
    min-height:58px !important;

    border-radius:16px !important;

    overflow:hidden !important;

    box-sizing:border-box !important;

    border-bottom:none !important;
}

/* NORMAL */
.p {
    transition: none !important;
}

/* ISI HILANG SMOOTH */
.p.camino-minimized .camino-sidebar,
.p.camino-minimized .camino-content {
    opacity: 0 !important;
    pointer-events: none !important;

    transition: opacity .25s ease !important;
}

/* MINIMIZE SMOOTH */
.p.camino-minimized {
    transition:
        width .35s cubic-bezier(.22,1,.36,1),
        height .35s cubic-bezier(.22,1,.36,1),
        border-radius .3s ease !important;
}

.p.camino-minimized .h {
    width: 100% !important;
    height: 58px !important;
    min-height: 58px !important;

    border-radius: 16px !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    border-bottom: none !important;
}

.p {
    resize: both !important;

    min-width: 500px !important;
    min-height: 475px !important;

    max-width: 1000px !important;
    max-height: 800px !important;

    transition: none !important;
}

`;

    let w = document.createElement('div');
    w.className = 'p';
w.innerHTML = `
<div class="h">

    <span class="status-dot"></span>

    <span class="camino-header-title">
        ElCamino-爱 Operation V1.3
    </span>

    <span
        class="header-info"
        id="infoCutoff"
    >
        ⓘ
    </span>

    <button
        type="button"
        id="caminoMinimizeBtn"
        class="camino-minimize-btn"
    >
        −
    </button>

</div>


<!-- =====================================================
     SIDEBAR
===================================================== -->

<div class="camino-sidebar">

<div class="camino-brand">
    <img
        src="https://media.tenor.com/aJ79h53uS8QAAAAi/anonalien.gif"
        alt="ELC"
        class="camino-brand-gif"
    >
</div>

    <button
        type="button"
        class="camino-tab active"
        data-full="ENGINE"
        data-mini="⚙"
    >
        <span class="camino-tab-text">
            ENGINE
        </span>
        <span class="camino-tab-icon">
            ⚙
        </span>
    </button>

    <button
        type="button"
        class="camino-tab"
        data-full="VALIDATOR"
        data-mini="✓"
    >
        <span class="camino-tab-text">
            VALIDATOR
        </span>
        <span class="camino-tab-icon">
            🛡
        </span>
    </button>

    <button
        type="button"
        class="camino-tab"
        data-full="INFO CUTOFF"
        data-mini="ⓘ"
    >
        <span class="camino-tab-text">
            BANK CUTOFF
        </span>
        <span class="camino-tab-icon">
            ⓘ
        </span>
    </button>

    <div class="camino-clock">
        <span class="camino-clock-time" id="caminoClock">
            00:00:00
        </span>

        <span class="camino-clock-label">
            HANYA DI PRD
        </span>
    </div>

</div>


<!-- =====================================================
     CONTENT AREA
===================================================== -->

<div class="camino-content">


    <!-- =================================================
         ENGINE VIEW
    ================================================== -->

    <div
        class="camino-view active"
        data-view="engine"
    >


        <!-- =========================
             EXISTING CUTOFF POPUP
        ========================== -->

        <div
            class="cutoff-popup"
            id="cutoffPopup"
        >

            <span
                class="cutoff-close"
                id="closeCutoff"
            >
                ✕
            </span>


            <h3>
                ⓘ JADWAL BANK CUT OFF
            </h3>


            <div class="cutoff-content">

                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/dana.webp?v=607200919"
                >
                DANA : 00.00 - 00.03


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/ovo.webp?v=607200919"
                >
                OVO : 00.00 - 00.03


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/gopay.webp?v=607200919"
                >
                GOPAY : 00.00 - 00.04


                <br><br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/bca.webp?v=607200919"
                >
                BCA : 00.00 - 00.05


                <br>


                <img
                    class="logo"
                    src="https://crystalpng.com/wp-content/uploads/2025/11/Seabank-Logo-1.png"
                >
                SEABANK : 00.00 - 00.15


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/bsi.webp?v=607200919"
                >
                BSI : 00.00 - 00.15


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/jago.webp?v=607200919"
                >
                JAGO : 00.00 - 00.15


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/maybank.webp?v=607200919"
                >
                MAYBANK : 00.00 - 00.15


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/permata.webp?v=607200919"
                >
                PERMATA : 00.00 - 00.15


                <br><br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/mandiri.webp?v=607200919"
                >
                MANDIRI : 23.00 - 02.00


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/bri.webp?v=607200919"
                >
                BRI : 23.50 - 02.45


                <br>


                <img
                    class="logo"
                    src="https://d33egg70nrp50s.cloudfront.net/Images/bank-thumbnails/bni.webp?v=607200919"
                >
                BNI : 23.00 - 03.00

            </div>

        </div>


        <!-- =========================
             BANK FILTER
        ========================== -->

        <div class="section">

            <div class="section-title">
                BANK FILTER
            </div>


            <div class="bank-grid">

                <label>
                    <input
                        id="DANA"
                        type="checkbox"
                    >
                    DANA
                </label>


                <label>
                    <input
                        id="OVO"
                        type="checkbox"
                    >
                    OVO
                </label>


                <label>
                    <input
                        id="GOPAY"
                        type="checkbox"
                    >
                    GOPAY
                </label>


                <label>
                    <input
                        id="BCA"
                        type="checkbox"
                    >
                    BCA
                </label>


                <label>
                    <input
                        id="BNI"
                        type="checkbox"
                    >
                    BNI
                </label>


                <label>
                    <input
                        id="BRI"
                        type="checkbox"
                    >
                    BRI
                </label>


                <label>
                    <input
                        id="MANDIRI"
                        type="checkbox"
                    >
                    MANDIRI
                </label>


                <label>
                    <input
                        id="BSI"
                        type="checkbox"
                    >
                    BSI
                </label>


                <label>
                    <input
                        id="JAGO"
                        type="checkbox"
                    >
                    JAGO
                </label>


                <label>
                    <input
                        id="PERMATA"
                        type="checkbox"
                    >
                    PERMATA
                </label>


                <label>
                    <input
                        id="MAYBANK"
                        type="checkbox"
                    >
                    MAYBANK
                </label>


                <label>
                    <input
                        id="SEABANK"
                        type="checkbox"
                    >
                    SEABANK
                </label>

            </div>

        </div>


        <!-- =========================
             APPROVE LIMIT
        ========================== -->

        <div class="limit-box">

            <label>
                APPROVE LIMIT
            </label>


            <input
                id="APPROVE_LIMIT"
                type="text"
                placeholder="Masukan Limit Approve"
            >

        </div>


        <!-- =========================
             ENGINE BUTTONS
        ========================== -->

        <div class="btns">

            <div class="row2">

                <button id="sv">
                    SAVE
                </button>


                <button id="clicksterBtn">
                    START
                </button>

            </div>


            <div class="row2">

                <button id="ca">
                    CHECK ALL
                </button>


                <button id="uc">
                    UNCHECK
                </button>

            </div>


            <button id="accountValidatorBtn">
                ✦ EL CAMINO VERIFIER
            </button>

        </div>


        <!-- =========================
             BLOCK STATUS
        ========================== -->

        <div class="info">

            <div id="BLOCK_STATUS">
                🔒 BLOCK ID : LOADING...
            </div>

        </div>


    </div>
    <!-- END ENGINE VIEW -->


    <!-- =================================================
         VALIDATOR VIEW
    ================================================== -->

    <div
        class="camino-view"
        data-view="validator"
    >

        <div class="camino-view-title">
            EL CAMINO VALIDATOR
        </div>


        <div id="validator-view-mount"></div>

    </div>
    <!-- END VALIDATOR VIEW -->


    <!-- =================================================
         INFO CUTOFF VIEW
    ================================================== -->

    <div
        class="camino-view"
        data-view="cutoff"
    >

        <div class="camino-view-title">
            INFO CUTOFF
        </div>


        <div id="cutoff-view-mount"></div>

    </div>
    <!-- END CUTOFF VIEW -->


</div>
<!-- END CAMINO CONTENT -->

`;

sh.appendChild(style);
sh.appendChild(w);
document.body.appendChild(host);

const caminoTabs =
    w.querySelectorAll(".camino-tab");

const caminoMinimizeBtn =
    w.querySelector(
        "#caminoMinimizeBtn"
    );

caminoMinimizeBtn?.addEventListener(
    "click",
    () => {

        const panel =
            w;

        const minimized =
            panel.classList.toggle(
                "camino-minimized"
            );

        caminoMinimizeBtn.textContent =
            minimized
                ? "+"
                : "−";

    }
);

    const caminoSidebar =
    w.querySelector(".camino-sidebar");

const caminoClock =
    w.querySelector("#caminoClock");

function updateCaminoClock(){

    if (!caminoClock) {
        return;
    }

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    caminoClock.textContent =
        `${hours}:${minutes}:${seconds}`;
}

updateCaminoClock();

setInterval(
    updateCaminoClock,
    1000
);


const caminoContent =
    w.querySelector(".camino-content");

let caminoSidebarWidth = 165;

let caminoSidebarResizing = false;

const CAMINO_SIDEBAR_MIN = 58;
const CAMINO_SIDEBAR_MAX = 165;

const caminoViews =
    w.querySelectorAll(".camino-view");

function updateCaminoSidebar() {

    caminoSidebar.style.width =
        caminoSidebarWidth + "px";

    caminoContent.style.left =
        caminoSidebarWidth + "px";

    if (
        caminoSidebarWidth <=
        CAMINO_SIDEBAR_MIN
    ) {
        caminoSidebar.classList.add(
            "camino-compact"
        );
    } else {
        caminoSidebar.classList.remove(
            "camino-compact"
        );
    }
}

caminoSidebar.addEventListener(
    "mousedown",
    event => {

        const rect =
            caminoSidebar.getBoundingClientRect();

        const nearRightEdge =
            event.clientX >=
            rect.right - 8;

        if (!nearRightEdge) {
            return;
        }

        caminoSidebarResizing = true;

        document.body.style.userSelect =
            "none";

        event.preventDefault();
    }
);

document.addEventListener(
    "mousemove",
    event => {

        if (!caminoSidebarResizing) {
            return;
        }

        const panelRect =
            w.getBoundingClientRect();

        let newWidth =
            event.clientX -
            panelRect.left;

        newWidth =
            Math.max(
                CAMINO_SIDEBAR_MIN,
                Math.min(
                    CAMINO_SIDEBAR_MAX,
                    newWidth
                )
            );

        caminoSidebarWidth =
            newWidth;

        updateCaminoSidebar();
    }
);

document.addEventListener(
    "mouseup",
    () => {

        if (
            !caminoSidebarResizing
        ) {
            return;
        }

        caminoSidebarResizing = false;

        document.body.style.userSelect =
            "";
    }
);

updateCaminoSidebar();

function showCaminoValidator() {

    const existing =
        document.getElementById(
            "account-validator-panel"
        );

    if (!existing) {
        const validatorButton =
            w.querySelector(
                "#accountValidatorBtn"
            );

        if (validatorButton) {
            validatorButton.click();
        }
    }

    setTimeout(() => {

        const panel =
            document.getElementById(
                "account-validator-panel"
            );

        const content =
            w.querySelector(
                ".camino-content"
            );

        if (!panel || !content) {
            return;
        }

        const rect =
            content.getBoundingClientRect();

        panel.style.position = "fixed";

        panel.style.left =
            rect.left + "px";

        panel.style.top =
            rect.top + "px";

        panel.style.width =
            rect.width + "px";

        panel.style.height =
            rect.height + "px";

        panel.style.minWidth =
            "0";

        panel.style.maxWidth =
            "none";

        panel.style.minHeight =
            "0";

        panel.style.maxHeight =
            "none";

        panel.style.transform =
            "none";

        panel.style.resize =
            "none";

        panel.style.borderRadius =
            "0";

        panel.style.zIndex =
            "999999999";

        panel.style.display =
            "block";

    }, 50);
}

function positionValidatorPanel() {

    const panel =
        document.getElementById(
            "account-validator-panel"
        );

    if (!panel) {
        return;
    }

    const content =
        w.querySelector(
            ".camino-content"
        );

    if (!content) {
        return;
    }

    const rect =
        content.getBoundingClientRect();

    panel.style.position = "fixed";

    panel.style.left =
        rect.left + "px";

    panel.style.top =
        rect.top + "px";

    panel.style.width =
        rect.width + "px";

    panel.style.height =
        rect.height + "px";

    panel.style.transform =
        "none";

    panel.style.borderRadius =
        "0";

    panel.style.zIndex =
        "999999999";
}

const cutoffMount =
    w.querySelector("#cutoff-view-mount");

const cutoffPopup =
    w.querySelector("#cutoffPopup");

if (cutoffMount && cutoffPopup) {
    cutoffMount.appendChild(cutoffPopup);
}

caminoTabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {

        /* =========================
           ACTIVE TAB
        ========================= */

        caminoTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");


        /* =========================
           HIDE NORMAL VIEWS
        ========================= */

        caminoViews.forEach(view => {
            view.classList.remove("active");
        });


        /* =========================
           ENGINE
        ========================= */

        if (index === 0) {

            const validator =
                document.getElementById(
                    "account-validator-panel"
                );

            if (validator) {
                validator.style.display =
                    "none";
            }

            const engineView =
                w.querySelector(
                    '.camino-view[data-view="engine"]'
                );

            if (engineView) {
                engineView.classList.add("active");
            }

            return;
        }


        /* =========================
           VALIDATOR
        ========================= */

        if (index === 1) {

            const validatorView =
                w.querySelector(
                    '.camino-view[data-view="validator"]'
                );

            if (validatorView) {
                validatorView.classList.add("active");
            }

            showCaminoValidator();

            return;
        }


        /* =========================
           INFO CUTOFF
        ========================= */

        if (index === 2) {

            const validator =
                document.getElementById(
                    "account-validator-panel"
                );

            if (validator) {
                validator.style.display =
                    "none";
            }

            const cutoffView =
                w.querySelector(
                    '.camino-view[data-view="cutoff"]'
                );

            if (cutoffView) {
                cutoffView.classList.add("active");
            }

            return;
        }

    });

});

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

function caminoToast(message = "SETTINGS SAVED") {
    let old = document.getElementById("caminoToast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.id = "caminoToast";
    toast.innerHTML = `
        <div class="camino-toast-icon">✓</div>
        <div class="camino-toast-text">${message}</div>
    `;

toast.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.85);min-width:340px;padding:30px 42px;display:flex;align-items:center;justify-content:center;gap:18px;background:linear-gradient(135deg,rgba(8,12,30,.98),rgba(25,15,48,.98));border:1px solid rgba(120,155,255,.65);border-radius:20px;color:#fff;font-family:Inter,Arial,sans-serif;font-size:24px;font-weight:900;letter-spacing:2px;box-shadow:0 0 30px rgba(70,120,255,.22),0 0 60px rgba(130,80,255,.15),0 20px 50px rgba(0,0,0,.6),inset 0 0 30px rgba(80,120,255,.06);z-index:2147483647;opacity:0;transition:opacity .25s ease,transform .25s cubic-bezier(.2,.8,.2,1);pointer-events:none;`;;

    const icon = toast.querySelector(".camino-toast-icon");
icon.style.cssText = `width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:radial-gradient(circle,#9fc8ff 0%,#6f8dff 45%,#6b4ed8 100%);color:#fff;font-size:27px;font-weight:900;box-shadow:0 0 10px rgba(90,150,255,.9),0 0 22px rgba(120,80,255,.6);`;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translate(-50%,-50%) scale(1)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translate(-50%,-50%) scale(.92)";
        setTimeout(() => {
            toast.remove();
        }, 250);
    }, 450);
}

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
  caminoToast();
};

const clicksterBtn = w.querySelector('#clicksterBtn');
clicksterBtn.style.position = 'relative';
clicksterBtn.style.overflow = 'hidden';
function setClicksterButton(active) {
    if (active) {
        clicksterBtn.innerHTML = `<span style="position:relative;z-index:3;display:flex;align-items:center;justify-content:center;gap:9px;"><span style="font-size:17px;line-height:1;text-shadow:0 0 8px rgba(255,90,90,.9),0 0 18px rgba(255,50,50,.55);">■</span><span>STOP ENGINE</span></span>`;

        clicksterBtn.classList.add('camino-running');

        clicksterBtn.insertAdjacentHTML('beforeend', `<svg class="camino-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><rect x="1" y="1" width="98" height="98" rx="14" ry="14" pathLength="1000"/></svg>`);

        clicksterBtn.style.cssText = `flex:1;height:46px;border-radius:14px;border:1px solid rgba(255,100,100,.55);cursor:pointer;background:radial-gradient(circle at 50% -20%,rgba(255,110,110,.22),transparent 55%),linear-gradient(145deg,#170c12 0%,#32121c 45%,#18090e 100%);color:#fff;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:950;letter-spacing:2.2px;box-shadow:0 0 8px rgba(255,70,70,.35),0 0 22px rgba(255,50,50,.18),inset 0 1px 0 rgba(255,255,255,.14),inset 0 -8px 20px rgba(0,0,0,.28);transition:transform .2s ease,box-shadow .25s ease,border-color .25s ease;position:relative;overflow:hidden;`;

        clicksterBtn.classList.add('camino-running');

    } else {
        clicksterBtn.classList.remove('camino-running');

        clicksterBtn.innerHTML = `<span style="position:relative;z-index:3;display:flex;align-items:center;justify-content:center;gap:9px;"><span style="font-size:18px;line-height:1;text-shadow:0 0 8px rgba(80,210,255,.95),0 0 18px rgba(80,130,255,.7);">✦</span><span>START ENGINE</span></span>`;

        clicksterBtn.style.cssText = `flex:1;height:46px;border-radius:14px;border:1px solid rgba(80,190,255,.55);cursor:pointer;background:radial-gradient(circle at 50% -20%,rgba(80,220,255,.25),transparent 55%),linear-gradient(145deg,#071522 0%,#102c4b 45%,#081521 100%);color:#fff;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:950;letter-spacing:2.2px;box-shadow:0 0 8px rgba(60,190,255,.4),0 0 24px rgba(60,130,255,.2),inset 0 1px 0 rgba(255,255,255,.16),inset 0 -8px 20px rgba(0,0,0,.28);transition:transform .2s ease,box-shadow .25s ease,border-color .25s ease;position:relative;overflow:hidden;`;
    }
}

clicksterBtn.addEventListener('mouseenter',()=>{if(window.__CAMINO_CLICKSTER__){clicksterBtn.style.transform='translateY(-2px) scale(1.015)';clicksterBtn.style.boxShadow='0 0 14px rgba(255,70,70,.55),0 0 35px rgba(255,50,50,.25),inset 0 1px 0 rgba(255,255,255,.2)';}else{clicksterBtn.style.transform='translateY(-2px) scale(1.015)';clicksterBtn.style.boxShadow='0 0 14px rgba(70,210,255,.6),0 0 35px rgba(70,130,255,.3),inset 0 1px 0 rgba(255,255,255,.2)';}});

clicksterBtn.addEventListener('mouseleave',()=>{clicksterBtn.style.transform='translateY(0) scale(1)';setClicksterButton(window.__CAMINO_CLICKSTER__);});clicksterBtn.addEventListener('mousedown',()=>{clicksterBtn.style.transform='translateY(1px) scale(.985)';});clicksterBtn.addEventListener('mouseup',()=>{clicksterBtn.style.transform='translateY(-2px) scale(1.015)';});

setClicksterButton(false);


const API_KEY = "ew_18371fce5b6cdb8aaf9356ef2777fd06ef3fe82c";
const API_BASE =
    "https://app.apivalidasi.my.id";

window.AV_BANK_LIST = [["BRI","002"],["MANDIRI","008"],["BNI","009"],["DANAMON","011"],["BANK PERMATA SYARIAH","013"],["BCA","014"],["BANK MAYBANK SYARIAH","016"],["PANIN","019"],["CIMB NIAGA","022"],["UOB","023"],["OCBC","028"],["CITIBANK","031"],["JPMCC1IN","032"],["BANK OF AMERICA","033"],["CCB INDONESIA","036"],["AG INT","037"],["HSBC","041"],["TOKYO MUFJ","042"],["DBS","046"],["BANK RESONA PERDANIA","047"],["BANK MIZUHO","048"],["STANDARD CHARTER","050"],["CAPITAL INDONESIA","054"],["BNP PARIBAS","057"],["RABOBANK","060"],["ANZ","061"],["DEUTSCHE","067"],["CHINA LTD","069"],["BUMI ARTA","076"],["EKONOMI RAHARJA","087"],["ANTAR DAERAH","088"],["J TRUST","095"],["MAYAPADA","097"],["BJB BPD JABAR BANTEN","110"],["BANK JAKARTA SYARIAH","111"],["BPD YOGYAKARTA","112"],["BPD JATENG","113"],["BPD JAWA TIMUR SYARIAH","114"],["BPD JAMBI","115"],["ACEH","116"],["BPD SUMUT","117"],["BANK NAGARI","118"],["BPD RIAU KEPRI","119"],["BPD SUMATERA SELATAN DAN BANGKA BELITUNG SYARIAH","120"],["BPD LAMPUNG","121"],["BPD KALIMANTAN SELATAN SYARIAH","122"],["BPD KALBAR","123"],["BPD KALTIM","124"],["KALTENG","125"],["BPD SULSEL SELBAR","126"],["BPD SULUTGO","127"],["BPD NTB","128"],["BPD BALI","129"],["BPD NTT","130"],["BPD MALUKU","131"],["BPD PAPUA","132"],["BPD BENGKULU","133"],["BPD SULTENG","134"],["BPD BANTEN","137"],["BNP","145"],["BOII","146"],["MUAMALAT","147"],["MESTIKA","151"],["BANK SHINHAN","152"],["SINARMAS","153"],["MASPION","157"],["GANESHA","161"],["ICBC","164"],["QNB","167"],["BTN","200"],["BWS","212"],["SMBC","213"],["BRI SYARIAH","422"],["BJB SYARIAH","425"],["MEGA","426"],["BNI SYARIAH","427"],["KB BUKOPIN","441"],["BSI","451"],["BISNIS INTERNASIONAL","459"],["JASA JAKARTA","472"],["HANA","484"],["MNC","485"],["NEO COMMERCE","490"],["BRI AGRO","494"],["SBI","498"],["BCA DIGITAL","501"],["NOBU","503"],["MEGA SYARIAH","506"],["INA","513"],["PANIN SYARIAH","517"],["PRIMA MASTER","520"],["BANK BUKOPIN SYARIAH","521"],["SAMPOERNA","523"],["BANK OKE INDONESIA","526"],["AMAR BANK","531"],["SEABANK","535"],["BCA SYARIAH","536"],["JAGO","542"],["BANK NANO SYARIAH","546"],["BTPN SYARIAH","547"],["MAS","548"],["MAYORA","553"],["INDEX","555"],["CENTRATAMA","559"],["SUPERBANK","562"],["MANTAP","564"],["VICTORIA","566"],["ALLO BANK","567"],["BANK IBK","945"],["BANK ALADIN SYARIAH","947"],["CHINATRUST","949"],["DANA","dana"],["GOPAY","gopay"],["GOPAY DRIVER","gopaydriver"],["LINKAJA","linkaja"],["MAXIM","maxim"],["OVO","ovo"],["SHOPEEPAY","shopeepay"]];

window.getCaminoBankCode = function(bankName) {

    if (!bankName) {
        return null;
    }

    const found = window.AV_BANK_LIST.find(
        ([name]) =>
            name.toUpperCase() ===
            bankName.toUpperCase()
    );

    return found ? found[1] : null;
};

function avEscape(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function caminoValidateAccount(
    bankCode,
    accountNumber
) {

    if (!bankCode) {
        throw new Error(
            "BANK CODE TIDAK DITEMUKAN"
        );
    }

    if (!accountNumber) {
        throw new Error(
            "NOMOR REKENING TIDAK DITEMUKAN"
        );
    }

    console.log(
        "[CAMINO VALIDATOR] Sending validation request..."
    );

    console.log(
        "[CAMINO VALIDATOR] BANK CODE:",
        bankCode
    );

    console.log(
        "[CAMINO VALIDATOR] ACCOUNT:",
        accountNumber
    );

    const url =
        `${API_BASE}/api/cek` +
        `?code=${encodeURIComponent(bankCode)}` +
        `&nomor=${encodeURIComponent(accountNumber)}`;

    console.log(
        "[CAMINO VALIDATOR] REQUEST:",
        url
    );

    try {

        const response = await fetch(
            url,
            {
                method: "GET",

                headers: {
                    "X-API-Key": API_KEY,

                    "X-Idempotency-Key":
                        "elcamino-row-validator-" +
                        crypto.randomUUID()
                }
            }
        );

        console.log(
            "[CAMINO VALIDATOR] HTTP STATUS:",
            response.status
        );

        let data;

        try {

            data =
                await response.json();

        } catch {

            throw new Error(
                `Response API tidak valid (HTTP ${response.status})`
            );
        }

        console.log(
            "[CAMINO VALIDATOR] API RESPONSE:",
            data
        );

        if (!response.ok) {

            throw new Error(
                data?.message ||
                data?.error ||
                data?.error_code ||
                `HTTP ${response.status}`
            );
        }

        if (
            data?.success === false ||
            data?.status === false
        ) {

            throw new Error(
                data?.message ||
                data?.error ||
                data?.error_code ||
                "Validasi gagal"
            );
        }

        return data;

    } catch (error) {

        console.error(
            "[CAMINO VALIDATOR] API ERROR:",
            error
        );

        throw error;
    }
}

async function validateAccount(bankCode, accountNumber) {

    // ==============================
    // BASIC VALIDATION
    // ==============================

    if (!bankCode) {
        throw new Error("BANK TIDAK DIDUKUNG");
    }

    if (!accountNumber) {
        throw new Error("NOMOR REKENING KOSONG");
    }

    // ==============================
    // BUILD API URL
    // ==============================

    const url =
        `${API_BASE}/api/v3/validate` +
        `?code=${encodeURIComponent(bankCode)}` +
        `&accountNumber=${encodeURIComponent(accountNumber)}`;

    console.log(
        "[ACCOUNT VALIDATOR] REQUEST:",
        url
    );

    // ==============================
    // API REQUEST
    // ==============================

    let response;

    try {

        response = await fetch(
            url,
            {
                method: "GET",

                headers: {
                    "X-API-Key": API_KEY,
                    "X-Idempotency-Key":
                        "elcamino-validator-" +
                        Date.now()
                }
            }
        );

    } catch (error) {

        console.error(
            "[ACCOUNT VALIDATOR] FETCH ERROR:",
            error
        );

        throw new Error(
            "GAGAL TERHUBUNG KE SERVER API"
        );
    }

    // ==============================
    // PARSE RESPONSE
    // ==============================

    let data;

    try {

        data = await response.json();

    } catch {

        throw new Error(
            `Response API tidak valid (HTTP ${response.status})`
        );
    }

    console.log(
        "[ACCOUNT VALIDATOR] RESPONSE:",
        response.status,
        data
    );

    // ==============================
    // HTTP ERROR
    // ==============================

    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            data?.error_code ||
            `HTTP ${response.status}`
        );
    }

    // ==============================
    // API VALIDATION ERROR
    // ==============================

    if (data?.success === false) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Validasi gagal"
        );
    }

    // ==============================
    // SUCCESS
    // ==============================

    return data;
}

function createAccountValidator() {

    let validationInProgress = false;

    const existingPanel =
        w.querySelector(
            "#account-validator-panel"
        );

    if (existingPanel) {
        return;
    }

    const panel =
        document.createElement("div");

    panel.id =
        "account-validator-panel";

    panel.innerHTML = `
    <div class="av-header">
        <div class="av-header-info">
            <div class="av-title">EL-CAMINO VALIDATOR</div>
            <div class="av-subtitle">EL-CAMINO BANK VERIFICATION</div>
        </div>

        <button id="av-close" type="button">×</button>
    </div>

    <div class="av-body">
        <label>BANK / E-WALLET</label>

        <div class="av-bank-picker">
            <input
                id="av-bank-search"
                type="text"
                autocomplete="off"
                placeholder="Cari bank / e-wallet..."
            />

            <input
                id="av-bank-value"
                type="hidden"
            />

            <div
                id="av-bank-list"
                class="av-bank-list"
            ></div>
        </div>

        <label>ACCOUNT NUMBER</label>

        <input
            id="av-account"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            placeholder="Masukkan nomor rekening"
        />

        <button
            id="av-validate"
            type="button"
        >
            VALIDATE
        </button>

        <div id="av-result">
            <div class="av-result-title">RESULT</div>
            <div id="av-status">
                <div class="av-ready">
                    READY TO VALIDATE
                </div>
            </div>
        </div>
    </div>
`;

    const validatorMount =
        w.querySelector(
            "#validator-view-mount"
        );

    if (!validatorMount) {
        console.warn(
            "[ACCOUNT VALIDATOR] validator-view-mount tidak ditemukan."
        );
        return;
    }

    validatorMount.appendChild(
        panel
    );


    const closeButton =
        panel.querySelector(
            "#av-close"
        );

    const bankSearch =
        panel.querySelector(
            "#av-bank-search"
        );

    const bankValue =
        panel.querySelector(
            "#av-bank-value"
        );

    const bankList =
        panel.querySelector(
            "#av-bank-list"
        );

    const accountInput =
        panel.querySelector(
            "#av-account"
        );

    const validateButton =
        panel.querySelector(
            "#av-validate"
        );

    const statusBox =
        panel.querySelector(
            "#av-status"
        );

validateButton.addEventListener("click", async () => {

    // =========================================
    // BLOCK DOUBLE CLICK
    // =========================================
    if (validationInProgress) {
        console.log(
            "[CAMINO VALIDATOR] Validation already running."
        );
        return;
    }

    // LOCK
    validationInProgress = true;

    // DISABLE BUTTON
    validateButton.disabled = true;
    validateButton.classList.add("is-loading");

    const originalText =
        validateButton.innerHTML;

    try {

        const bankCode =
            bankValue.value.trim();

        const accountNumber =
            accountInput.value.trim();

        // =========================================
        // BASIC VALIDATION
        // =========================================

        if (!bankCode) {
            throw new Error(
                "SILAKAN PILIH BANK / E-WALLET"
            );
        }

        if (!accountNumber) {
            throw new Error(
                "NOMOR REKENING KOSONG"
            );
        }

        // =========================================
        // LOADING
        // =========================================

        validateButton.innerHTML = `
            <span class="av-spinner"></span>
            VALIDATING...
        `;

        statusBox.innerHTML = `
            <div class="av-loading">
                VALIDATING ACCOUNT...
            </div>
        `;

        console.log(
            "[CAMINO VALIDATOR] Starting validation..."
        );

        // =========================================
        // API — CUMA SEKALI
        // =========================================

        const result =
            await caminoValidateAccount(
                bankCode,
                accountNumber
            );

        console.log(
            "[CAMINO VALIDATOR] VALIDATION RESULT:",
            result
        );

        // =========================================
        // SUCCESS
        // =========================================

        const data =
            result?.data || result;

        statusBox.innerHTML = `
            <div class="av-success">

                <div class="av-success-title">
                    ✓ ACCOUNT VALID
                </div>

                <div class="av-result-row">
                    <span>BANK</span>
                    <strong>
                        ${avEscape(bankSearch.value)}
                    </strong>
                </div>

                <div class="av-result-row">
                    <span>ACCOUNT</span>
                    <strong>
                        ${avEscape(
                            data?.account_number ||
                            accountNumber
                        )}
                    </strong>
                </div>

                <div class="av-result-row">
                    <span>NAME</span>
                    <strong>
                        ${avEscape(
                            data?.account_name || "-"
                        )}
                    </strong>
                </div>

            </div>
        `;

    } catch (error) {

        console.error(
            "[CAMINO VALIDATOR] VALIDATION ERROR:",
            error
        );

        statusBox.innerHTML = `
            <div class="av-error">

                <div class="av-error-title">
                    ✕ VALIDATION FAILED
                </div>

                <div class="av-error-message">
                    ${avEscape(
                        error?.message ||
                        "Terjadi kesalahan saat validasi"
                    )}
                </div>

            </div>
        `;

    } finally {

        // =========================================
        // UNLOCK SETELAH REQUEST SELESAI
        // =========================================

        validationInProgress = false;

        validateButton.disabled = false;

        validateButton.classList.remove(
            "is-loading"
        );

        validateButton.innerHTML =
            originalText;

        console.log(
            "[CAMINO VALIDATOR] Validation finished."
        );
    }
});

    function renderBankList(
        keyword = ""
    ) {
        const query =
            keyword
                .trim()
                .toLowerCase();
        const filtered =
            AV_BANK_LIST.filter(
                item => {
                    const name =
                        item[0]
                            .toLowerCase();
                    const code =
                        item[1]
                            .toLowerCase();
                    return (
                        name.includes(query) ||
                        code.includes(query)
                    );
                }
            );

        bankList.innerHTML =
            filtered.map(
                item => `
                    <div
                        class="av-bank-item"
                        data-name="${avEscape(item[0])}"
                        data-code="${avEscape(item[1])}"
                    >
                        <span class="av-bank-name">
                            ${avEscape(item[0])}
                        </span>
                        <span class="av-bank-code">
                            ${avEscape(item[1])}
                        </span>
                    </div>
                `
            ).join("");
        if (
            !filtered.length
        ) {
            bankList.innerHTML = `
                <div class="av-bank-empty">
                    BANK TIDAK DITEMUKAN
                </div>
            `;
        }

        bankList
            .querySelectorAll(
                ".av-bank-item"
            )
            .forEach(
                item => {

                    item.onclick =
                        () => {
                            bankSearch.value =
                                item.dataset.name;
                            bankValue.value =
                                item.dataset.code;
                            bankList.classList.remove(
                                "show"
                            );
                        };
                }
            );
        bankList.classList.add(
            "show"
        );
    }

    bankSearch.addEventListener(
        "focus",
        () => {
            renderBankList(
                bankSearch.value
            );
        }
    );

    bankSearch.addEventListener(
        "input",
        () => {
            bankValue.value =
                "";
            renderBankList(
                bankSearch.value
            );
        }
    );

w.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".av-bank-picker"
            )
        ) {
            bankList.classList.remove(
                "show"
            );
        }

    }
);

    closeButton.onclick =
        () => {
            panel.remove();
        };
    let isDragging =
        false;
    let dragOffsetX =
        0;
    let dragOffsetY =
        0;
    const header =
        panel.querySelector(
            ".av-header"
        );
    header.addEventListener(
        "mousedown",
        event => {
            if (
                event.target.closest(
                    "#av-close"
                )
            ) {
                return;
            }
            isDragging =
                true;
            const rect =
                panel.getBoundingClientRect();
            dragOffsetX =
                event.clientX -
                rect.left;
            dragOffsetY =
                event.clientY -
                rect.top;
            panel.style.left =
                rect.left + "px";
            panel.style.top =
                rect.top + "px";
            panel.style.transform =
                "none";
            document.body.style.userSelect =
                "none";
        }
    );
    document.addEventListener(
        "mousemove",
        event => {
            if (
                !isDragging
            ) {
                return;
            }
            let x =
                event.clientX -
                dragOffsetX;
            let y =
                event.clientY -
                dragOffsetY;
            const maxX =
                window.innerWidth -
                panel.offsetWidth;
            const maxY =
                window.innerHeight -
                panel.offsetHeight;
            x =
                Math.max(
                    0,
                    Math.min(
                        x,
                        maxX
                    )
                );
            y =
                Math.max(
                    0,
                    Math.min(
                        y,
                        maxY
                    )
                );
            panel.style.left =
                x + "px";
            panel.style.top =
                y + "px";
        }
    );
    document.addEventListener(
        "mouseup",
        () => {
            if (
                !isDragging
            ) {
                return;
            }
            isDragging =
                false;
            document.body.style.userSelect =
                "";
        }
    );
    validateButton.onclick =
        async () => {

            // =========================================
            // BLOCK DOUBLE CLICK / DOUBLE REQUEST
            // =========================================

            if (validationInProgress) {

                console.log(
                    "[CAMINO VALIDATOR] Validation already running."
                );

                return;
            }


            // =========================================
            // GET INPUT
            // =========================================

            const bankCode =
                bankValue.value.trim();

            const bankName =
                bankSearch.value.trim();

            const accountNumber =
                accountInput.value.trim();


            // =========================================
            // BASIC VALIDATION
            // =========================================

            if (!bankCode) {

                statusBox.innerHTML = `
                    <div class="av-error">
                        ✕ PILIH BANK TERLEBIH DAHULU
                    </div>
                `;

                return;
            }


            if (!accountNumber) {

                statusBox.innerHTML = `
                    <div class="av-error">
                        ✕ NOMOR REKENING KOSONG
                    </div>
                `;

                accountInput.focus();

                return;
            }


            // =========================================
            // LOCK
            // =========================================

            validationInProgress = true;

            validateButton.disabled =
                true;

            validateButton.classList.add(
                "is-loading"
            );


            // =========================================
            // LOADING
            // =========================================

            validateButton.innerHTML = `
                <span class="av-spinner"></span>
                VALIDATING...
            `;

            statusBox.innerHTML = `
                <div class="av-loading">
                    <span class="av-loading-dot">
                        ●
                    </span>
                    EL-CAMINO TEAM
                    ON CHECKING...
                </div>
            `;


            try {

                console.log(
                    "[CAMINO VALIDATOR] MANUAL VALIDATION START"
                );

                console.log(
                    "[CAMINO VALIDATOR] BANK:",
                    bankName
                );

                console.log(
                    "[CAMINO VALIDATOR] BANK CODE:",
                    bankCode
                );

                console.log(
                    "[CAMINO VALIDATOR] ACCOUNT:",
                    accountNumber
                );


                // =========================================
                // API
                // SATU REQUEST SAJA
                // =========================================

                const result =
                    await caminoValidateAccount(
                        bankCode,
                        accountNumber
                    );


                console.log(
                    "[CAMINO VALIDATOR] RESULT:",
                    result
                );


                // =========================================
                // RESPONSE DATA
                // =========================================

                const data =
                    result?.data ||
                    result ||
                    {};


                const name =
                    data?.account_name ||
                    data?.accountName ||
                    data?.nama ||
                    "-";


                const returnedAccount =
                    data?.account_number ||
                    data?.accountNumber ||
                    accountNumber;


                // =========================================
                // SUCCESS
                // =========================================

                statusBox.innerHTML = `
                    <div class="av-success">

                        <div class="av-success-title">
                            ✓ ACCOUNT VALID
                        </div>

                        <div class="av-result-row">
                            <span>BANK</span>
                            <strong>
                                ${avEscape(bankName)}
                            </strong>
                        </div>

                        <div class="av-result-row">
                            <span>ACCOUNT</span>
                            <strong>
                                ${avEscape(
                                    returnedAccount
                                )}
                            </strong>
                        </div>

                        <div class="av-result-row">
                            <span>NAME</span>
                            <strong>
                                ${avEscape(name)}
                            </strong>
                        </div>

                    </div>
                `;


            } catch (
                error
            ) {

                console.error(
                    "[CAMINO VALIDATOR] MANUAL VALIDATION ERROR:",
                    error
                );


                statusBox.innerHTML = `
                    <div class="av-error">

                        <div class="av-error-title">
                            ✕ VALIDATION FAILED
                        </div>

                        <div class="av-error-message">
                            ${avEscape(
                                error?.message ||
                                "Terjadi kesalahan saat validasi"
                            )}
                        </div>

                    </div>
                `;


            } finally {

                // =========================================
                // UNLOCK
                // =========================================

                validationInProgress = false;

                validateButton.disabled =
                    false;

                validateButton.classList.remove(
                    "is-loading"
                );

                validateButton.innerHTML =
                    "VALIDATE";


                console.log(
                    "[CAMINO VALIDATOR] MANUAL VALIDATION FINISHED"
                );

            }

        };

    accountInput.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Enter"
            ) {
                validateButton.click();
            }
        }
    );
}

(function injectAccountValidatorCSS() {

    function attachValidatorStyle() {

        const host =
            document.getElementById(
                "payHostUI"
            );

        const shadow =
            host?.shadowRoot;

        if (!shadow) {
            return false;
        }

        if (
            shadow.querySelector(
                "#account-validator-style"
            )
        ) {
            return true;
        }

        const style =
            document.createElement(
                "style"
            );

        style.id =
            "account-validator-style";

        style.textContent = `

#account-validator-panel {
    position:relative;
    width:100%;
    min-width:0;
    max-width:none;
    min-height:0;
    max-height:none;
    height:auto;

    resize:none;
    overflow:hidden;
    box-sizing:border-box;
    isolation:isolate;

    background:
        linear-gradient(
            145deg,
            #080b14 0%,
            #0b0f1a 48%,
            #0d101d 100%
        );

    color:#f8faff;

    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Arial,
        sans-serif;

    border:1px solid rgba(118,143,215,.42);
    border-radius:17px;

    box-shadow:
        0 25px 60px rgba(0,0,0,.78),
        0 10px 25px rgba(0,0,0,.45),
        0 0 35px rgba(64,88,170,.12),
        inset 0 1px 0 rgba(255,255,255,.045);

    z-index:10;

    --av-blue:#7193e4;
    --av-purple:#7568c8;
}

#account-validator-panel::before {
    content:"";
    position:absolute;
    inset:0;

    border-radius:17px;

    pointer-events:none;
    z-index:0;

    background:
        radial-gradient(
            circle at 0% 0%,
            rgba(72,105,205,.12),
            transparent 32%
        ),
        radial-gradient(
            circle at 100% 100%,
            rgba(113,75,190,.09),
            transparent 35%
        );
}

#account-validator-panel::after {
    content:"";

    position:absolute;
    left:0;
    right:0;
    bottom:0;

    height:2px;

    background:
        linear-gradient(
            90deg,
            transparent 0%,
            #527edc 25%,
            #8a72e8 50%,
            #527edc 75%,
            transparent 100%
        );

    background-size:220% 100%;

    animation:
        avRunningLine 3.2s linear infinite;

    opacity:.8;

    pointer-events:none;
    z-index:5;
}

@keyframes avRunningLine {
    0% {
        background-position:220% 0;
    }

    100% {
        background-position:-220% 0;
    }
}

#account-validator-panel > * {
    position:relative;
    z-index:2;
}

.av-header {
    display:flex;
    align-items:center;
    justify-content:space-between;

    height:84px;
    box-sizing:border-box;

    padding:18px 22px;

    border-bottom:
        1px solid rgba(110,130,200,.20);

    cursor:default;
    user-select:none;

    background:
        linear-gradient(
            180deg,
            #0d111e 0%,
            #090c15 100%
        );

    position:relative;
    overflow:hidden;
}

.av-header::before {
    content:"";

    position:absolute;
    top:0;
    left:-25%;

    width:55%;
    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(113,150,235,.8),
            transparent
        );

    animation:
        avHeaderLight 4s ease-in-out infinite;
}

@keyframes avHeaderLight {
    0% {
        left:-30%;
        opacity:0;
    }

    25% {
        opacity:.8;
    }

    60% {
        opacity:.8;
    }

    100% {
        left:130%;
        opacity:0;
    }
}

.av-header::after {
    content:"";

    position:absolute;

    left:22px;
    right:22px;
    bottom:0;

    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(88,130,230,.9),
            rgba(125,100,225,.9),
            transparent
        );

    box-shadow:
        0 0 8px rgba(80,120,230,.28);
}

.av-header-info {
    min-width:0;
}

.av-title {
    font-size:20px;
    line-height:24px;

    font-weight:850;
    letter-spacing:.6px;

    color:#fff;

    white-space:nowrap;

    text-shadow:
        0 1px 2px rgba(0,0,0,.8),
        0 0 15px rgba(115,145,225,.08);
}

.av-subtitle {
    margin-top:6px;

    font-size:11px;
    line-height:15px;

    font-weight:650;
    letter-spacing:1.15px;

    color:#9aa9d2;
}

#av-close {
    position:relative;

    width:34px;
    height:34px;

    flex-shrink:0;

    padding:0;

    border:
        1px solid rgba(125,145,200,.28);

    border-radius:9px;

    background:#151a28;

    color:#edf1ff;

    font-size:22px;
    line-height:30px;
    font-weight:400;

    cursor:pointer;

    transition:
        background .22s ease,
        border-color .22s ease,
        color .22s ease,
        box-shadow .22s ease,
        transform .18s ease;
}

#av-close:hover {
    background:#20283b;

    border-color:
        rgba(125,160,240,.65);

    color:#fff;

    box-shadow:
        0 0 14px rgba(75,115,220,.22),
        inset 0 1px 0 rgba(255,255,255,.08);

    transform:
        translateY(-1px);
}

#av-close:active {
    transform:scale(.94);
}

.av-body {
    box-sizing:border-box;

    width:100%;

    padding:
        25px 23px 24px;

    overflow-y:auto;
    overflow-x:hidden;

    scrollbar-width:none;
}

.av-body::-webkit-scrollbar {
    display:none;
}

.av-body label {
    display:block;

    margin:0 0 9px;

    font-size:12px;
    line-height:16px;

    font-weight:850;

    color:#d0d8f2;

    letter-spacing:.95px;

    text-transform:uppercase;
}

.av-bank-picker {
    position:relative;

    width:100%;

    margin-bottom:21px;
}

.av-body input {
    box-sizing:border-box;

    width:100%;
    height:50px;

    padding:0 16px;

    border:
        1px solid #33415f;

    border-radius:10px;

    outline:none;

    background:#0c111d;

    color:#fff;

    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Arial,
        sans-serif;

    font-size:15px;
    font-weight:550;

    letter-spacing:.2px;

    box-shadow:
        inset 0 1px 4px rgba(0,0,0,.55),
        0 1px 0 rgba(255,255,255,.015);

    transition:
        border-color .22s ease,
        background .22s ease,
        box-shadow .22s ease,
        transform .18s ease;
}

.av-body input::placeholder {
    color:#929fbd;
    opacity:1;
}

.av-body input:hover {
    border-color:#405071;
    background:#0e1422;
}

.av-body input:focus {
    border-color:#6586d5;
    background:#101625;

    box-shadow:
        0 0 0 3px rgba(79,116,210,.13),
        0 0 16px rgba(79,116,210,.08),
        inset 0 1px 4px rgba(0,0,0,.55);
}

#av-account {
    margin-bottom:20px;
}

.av-bank-list {
    display:none;

    position:absolute;

    top:calc(100% + 7px);
    left:0;
    right:0;

    max-height:280px;

    overflow-y:auto;

    background:#090e19;

    border:
        1px solid #3a4969;

    border-radius:10px;

    box-shadow:
        0 22px 45px rgba(0,0,0,.82),
        0 0 18px rgba(50,75,140,.08);

    z-index:1000;
}

.av-bank-list.show {
    display:block;

    animation:
        avDropdownIn .16s ease-out;
}

@keyframes avDropdownIn {
    from {
        opacity:0;
        transform:translateY(-4px);
    }

    to {
        opacity:1;
        transform:translateY(0);
    }
}

.av-bank-list::-webkit-scrollbar {
    width:5px;
}

.av-bank-list::-webkit-scrollbar-track {
    background:#070b13;
}

.av-bank-list::-webkit-scrollbar-thumb {
    background:#43547c;
    border-radius:10px;
}

.av-bank-item {
    display:flex;

    align-items:center;
    justify-content:space-between;

    gap:14px;

    min-height:48px;

    box-sizing:border-box;

    padding:11px 15px;

    border-bottom:
        1px solid rgba(110,130,180,.11);

    cursor:pointer;

    transition:
        background .18s ease,
        border-color .18s ease,
        padding-left .18s ease;
}

.av-bank-item:last-child {
    border-bottom:none;
}

.av-bank-item:hover {
    background:
        linear-gradient(
            90deg,
            #151e32,
            #11192a
        );

    border-bottom-color:
        rgba(95,130,215,.18);

    padding-left:18px;

    box-shadow:
        inset 2px 0 #6287dc;
}

.av-bank-name {
    color:#f5f7ff;

    font-size:13px;
    font-weight:700;
    line-height:18px;

    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}

.av-bank-code {
    flex-shrink:0;

    padding:3px 7px;

    border:
        1px solid rgba(100,125,180,.18);

    border-radius:5px;

    background:#111827;

    color:#a7b5da;

    font-size:11px;
    font-weight:700;

    letter-spacing:.5px;
}

.av-bank-empty {
    padding:20px;

    text-align:center;

    color:#909db9;

    font-size:12px;
    font-weight:600;
}

#av-validate {
    position:relative;

    display:flex;

    align-items:center;
    justify-content:center;

    overflow:hidden;

    isolation:isolate;

    width:100%;
    height:52px;

    border:
        1px solid rgba(112,142,220,.52);

    border-radius:10px;

    background:
        linear-gradient(
            110deg,
            #202d4b 0%,
            #2d3d63 48%,
            #302d5b 100%
        );

    color:#fff;

    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Arial,
        sans-serif;

    font-size:14px;

    font-weight:850;

    letter-spacing:1.05px;

    cursor:pointer;

    transition:
        transform .22s ease,
        background .25s ease,
        border-color .25s ease,
        box-shadow .25s ease,
        letter-spacing .22s ease;

    box-shadow:
        0 7px 18px rgba(0,0,0,.48),
        0 0 0 rgba(83,125,225,0),
        inset 0 1px 0 rgba(255,255,255,.08);

    text-shadow:
        0 1px 2px rgba(0,0,0,.65);
}

#av-validate {
    position: relative;
    transition:
        opacity .2s ease,
        transform .2s ease,
        filter .2s ease;
}

#av-validate.is-loading {
    cursor: wait;
    opacity: .85;
    pointer-events: none;
}

.av-spinner {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: -3px;
    margin-right: 9px;

    border: 2px solid rgba(255,255,255,.25);
    border-top-color: #fff;
    border-radius: 50%;

    animation: avSpin .7s linear infinite;
}

@keyframes avSpin {
    to {
        transform: rotate(360deg);
    }
}

#av-validate::before {
    content:"";

    position:absolute;

    top:-20%;
    bottom:-20%;

    left:-110%;

    width:55%;

    transform:skewX(-22deg);

    background:
        linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,.03) 20%,
            rgba(255,255,255,.28) 50%,
            rgba(255,255,255,.03) 80%,
            transparent 100%
        );

    pointer-events:none;

    z-index:-1;
}

#av-validate:hover::before,
#av-validate:disabled::before {
    animation:
        avButtonSweep .75s ease-out forwards;
}

@keyframes avButtonSweep {
    from {
        left:-110%;
    }

    to {
        left:155%;
    }
}

#av-validate::after {
    content:"";

    position:absolute;

    inset:0;

    border-radius:inherit;

    pointer-events:none;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,.055),
            transparent 45%
        );

    opacity:.75;
}

#av-validate:hover {
    background:
        linear-gradient(
            110deg,
            #2b3e66 0%,
            #3b4f7d 48%,
            #403a72 100%
        );

    border-color:
        rgba(137,166,235,.78);

    transform:
        translateY(-2px);

    letter-spacing:1.2px;

    box-shadow:
        0 11px 24px rgba(0,0,0,.52),
        0 0 10px rgba(78,118,220,.20),
        0 0 24px rgba(91,101,215,.13),
        inset 0 1px 0 rgba(255,255,255,.12);
}

#av-validate:active {
    transform:
        translateY(0)
        scale(.985);

    box-shadow:
        0 4px 10px rgba(0,0,0,.5),
        inset 0 2px 5px rgba(0,0,0,.25);
}

#av-validate:disabled {
    opacity:.72;

    cursor:wait;

    transform:none;

    letter-spacing:.8px;

    border-color:
        rgba(100,120,170,.35);

    background:
        linear-gradient(
            110deg,
            #1a2339,
            #232d48,
            #272440
        );

    box-shadow:
        0 5px 14px rgba(0,0,0,.35);
}

#av-validate:disabled::before {
    animation:
        avLoadingSweep 1.4s linear infinite;
}

@keyframes avLoadingSweep {
    from {
        left:-110%;
    }

    to {
        left:155%;
    }
}

#av-result {
    margin-top:20px;

    padding:18px;

    border:
        1px solid #2d3b59;

    border-radius:11px;

    background:
        linear-gradient(
            145deg,
            #0b101b,
            #0c111e
        );

    box-sizing:border-box;

    box-shadow:
        inset 0 1px 4px rgba(0,0,0,.38),
        0 4px 12px rgba(0,0,0,.18);
}

.av-result-title {
    margin-bottom:12px;

    font-size:12px;
    line-height:16px;

    font-weight:850;

    color:#c3cdeb;

    letter-spacing:1px;

    text-transform:uppercase;
}

.av-ready {
    display:flex;
    align-items:center;

    min-height:24px;

    font-size:13px;
    line-height:20px;

    font-weight:600;

    color:#9aa8c4;
}

.av-ready::before {
    content:"";

    width:7px;
    height:7px;

    margin-right:9px;

    border-radius:50%;

    background:#667692;

    box-shadow:
        0 0 7px rgba(102,118,146,.35);
}

.av-loading {
    display:flex;

    align-items:center;

    gap:9px;

    min-height:24px;

    font-size:13px;
    line-height:20px;

    font-weight:650;

    color:#c1cbe1;
}

.av-loading-dot {
    display:inline-block;

    font-size:13px;

    color:#7fa1f1;

    animation:
        avPulse 1s ease-in-out infinite;

    text-shadow:
        0 0 8px rgba(100,145,235,.55);
}

@keyframes avPulse {
    0%,100% {
        opacity:.3;
        transform:scale(.85);
    }

    50% {
        opacity:1;
        transform:scale(1.1);
    }
}

.av-success {
    display:flex;

    align-items:center;

    gap:9px;

    min-height:27px;

    font-size:15px;

    line-height:21px;

    font-weight:850;

    color:#72e6a5;

    text-shadow:
        0 0 12px rgba(72,220,145,.10);
}

.av-success-icon {
    display:inline-flex;

    align-items:center;
    justify-content:center;

    width:22px;
    height:22px;

    border:
        1px solid rgba(90,220,150,.35);

    border-radius:50%;

    background:
        rgba(70,190,125,.08);

    font-size:14px;
}

.av-name-label {
    margin-top:17px;

    font-size:11px;
    line-height:15px;

    font-weight:850;

    color:#9ca9c9;

    letter-spacing:.9px;

    text-transform:uppercase;
}

.av-name {
    margin-top:5px;

    font-size:20px;
    line-height:27px;

    font-weight:850;

    color:#fff;

    word-break:break-word;

    text-shadow:
        0 1px 3px rgba(0,0,0,.6);
}

.av-bank-confirm {
    display:flex;

    align-items:center;

    flex-wrap:wrap;

    gap:6px;

    margin-top:9px;

    color:#9aa7c3;

    font-size:12px;
    line-height:18px;

    font-weight:600;

    word-break:break-word;
}

.av-bank-confirm span {
    color:#657491;
}

.av-error {
    display:flex;

    align-items:center;

    min-height:24px;

    font-size:14px;
    line-height:20px;

    font-weight:850;

    color:#ff7777;

    text-shadow:
        0 0 10px rgba(255,80,80,.08);
}

.av-error-detail {
    margin-top:9px;

    padding:9px 11px;

    border-left:
        2px solid rgba(255,95,95,.45);

    border-radius:3px;

    background:
        rgba(255,70,70,.035);

    font-size:12px;
    line-height:18px;

    font-weight:550;

    color:#b5bdce;

    word-break:break-word;
}

.av-json {
    max-height:200px;

    overflow:auto;

    margin-top:11px;

    padding:12px;

    border-radius:8px;

    background:#070b13;

    border:
        1px solid #25314b;

    color:#aab9df;

    font-size:11px;

    line-height:16px;

    font-family:
        "Cascadia Code",
        "SFMono-Regular",
        Consolas,
        "Courier New",
        monospace;

    white-space:pre-wrap;

    word-break:break-word;
}

.av-json::-webkit-scrollbar {
    width:5px;
}

.av-json::-webkit-scrollbar-thumb {
    background:#43547b;

    border-radius:10px;
}

.av-json::-webkit-scrollbar-thumb:hover {
    background:#566a99;
}

#account-validator-panel ::selection {
    background:
        rgba(100,135,220,.30);

    color:#fff;
}

@media (max-width:520px) {

    #account-validator-panel {
        width:100%;

        min-width:0;

        border-radius:15px;
    }

    .av-header {
        height:78px;

        padding:
            17px 18px;
    }

    .av-body {
        padding:
            21px 18px 22px;
    }

    .av-title {
        font-size:18px;
    }

    .av-subtitle {
        font-size:10px;
    }

    .av-name {
        font-size:18px;
    }
}

@media (prefers-reduced-motion:reduce) {

    #account-validator-panel::after,
    .av-header::before,
    .av-bank-list.show,
    .av-loading-dot,
    #av-validate::before {

        animation:none !important;
    }

}

`;

        shadow.appendChild(
            style
        );

        return true;
    }


    if (
        !attachValidatorStyle()
    ) {

        const avStyleTimer =
            setInterval(() => {

                if (
                    attachValidatorStyle()
                ) {
                    clearInterval(
                        avStyleTimer
                    );
                }

            }, 100);

    }

})();



(function initCaminoValidator() {

    'use strict';

    const TABLE_ID = 'withdrawal-pending-table';
    const ACTION_CELL_INDEX = 10;

    let scanTimer = null;


    function getTable() {

        return document.getElementById(
            TABLE_ID
        );

    }

    function getActionCell(row) {

        if (!row) {
            return null;
        }

        const cells =
            row.querySelectorAll(
                ':scope > td'
            );

        return cells[ACTION_CELL_INDEX] || null;

    }


    // =========================================================
    // GET PAYMENT TO
    // =========================================================

    function getPaymentTo(row) {

        if (!row) {
            return null;
        }

        const cells =
            row.querySelectorAll(
                ':scope > td'
            );

        return cells[5] || null;

    }


    // =========================================================
    // VALIDATOR BUTTON
    // =========================================================

    function createValidatorButton(row) {

    const actionCell =
        getActionCell(row);

    if (!actionCell) {
        return;
    }


    // =====================================================
    // CLEAN ACTION CELL
    // =====================================================

    // Approve By Bank Date
    actionCell
        .querySelectorAll(
            '.new-approve-btn.light-green-btn'
        )
        .forEach(el => el.remove());


    // NexusPay / Banking Bot
    actionCell
        .querySelectorAll(
            '.nexuspay-actions-container'
        )
        .forEach(el => el.remove());


    // Edit / View / Winlose Report
    actionCell
        .querySelectorAll(
            '.action-container'
        )
        .forEach(el => el.remove());


    // =====================================================
    // JANGAN BUAT VALIDATOR DOUBLE
    // =====================================================

    if (
        actionCell.querySelector(
            '.camino-validator-btn'
        )
    ) {
        return;
    }



        const btn =
            document.createElement('button');

        btn.type =
            'button';

        btn.className =
            'camino-validator-btn';

        btn.title =
            'Validate Account';

        btn.innerHTML = `
            <i class="fa fa-search"></i>
            <span>Validate</span>
        `;


        // =====================================================
        // CLICK
        // =====================================================

        btn.addEventListener(
            'click',
            async function(event) {

                event.preventDefault();

                event.stopPropagation();


                // Double click protection
                if (
                    btn.dataset.validating === '1'
                ) {
                    return;
                }


                // Already validated
                if (
                    btn.dataset.validated === '1'
                ) {
                    return;
                }


                btn.dataset.validating =
                    '1';

                btn.disabled =
                    true;


                btn.classList.remove(
                    'camino-validator-error'
                );


                btn.innerHTML = `
                    <i class="fa fa-spinner fa-spin"></i>
                    <span>Checking...</span>
                `;


                try {

                    // =================================================
                    // PAYMENT TO
                    // =================================================

                    const paymentTo =
                        getPaymentTo(row);

                    if (!paymentTo) {

                        throw new Error(
                            'PAYMENT TO TIDAK DITEMUKAN'
                        );

                    }


                    const text =
                        paymentTo.innerText
                            .trim()
                            .replace(/\s+/g, ' ');


                    console.log(
                        '[CAMINO VALIDATOR] PAYMENT TO:',
                        text
                    );


                    // =================================================
                    // ACCOUNT NUMBER
                    // =================================================

                    const accountMatch =
                        text.match(
                            /(\d{6,20})$/
                        );


                    if (!accountMatch) {

                        throw new Error(
                            'ACCOUNT NUMBER TIDAK DITEMUKAN'
                        );

                    }


                    const accountNumber =
                        accountMatch[1];


                    const beforeAccount =
                        text
                            .slice(
                                0,
                                accountMatch.index
                            )
                            .trim();

                    let bank = null;

                    const normalizedBeforeAccount =
                        beforeAccount
                            .toUpperCase()
                            .replace(/\s+/g, " ")
                            .trim();

                    const matchedBank =
                        window.AV_BANK_LIST
                            .slice()
                            .sort(
                                (a, b) =>
                                    b[0].length -
                                    a[0].length
                            )
                            .find(
                                ([bankName]) => {

                                    const normalizedBankName =
                                        bankName
                                            .toUpperCase()
                                            .replace(
                                                /\s+/g,
                                                " "
                                            )
                                            .trim();


                                    if (
                                        normalizedBeforeAccount.endsWith(
                                            normalizedBankName
                                        )
                                    ) {
                                        return true;
                                    }


                                    const compactBefore =
                                        normalizedBeforeAccount.replace(
                                            /\s+/g,
                                            ""
                                        );

                                    const compactBank =
                                        normalizedBankName.replace(
                                            /\s+/g,
                                            ""
                                        );


                                    return compactBefore.endsWith(
                                        compactBank
                                    );

                                }
                            );


                    if (
                        matchedBank
                    ) {

                        bank =
                            matchedBank[0];

                    }


                    else {

                        const bankMatch =
                            beforeAccount.match(
                                /([A-Za-z0-9]+)$/
                            );


                        bank =
                            bankMatch
                                ? bankMatch[1]
                                : null;

                    }


                    const bankCode =
                        window.getCaminoBankCode
                            ? window.getCaminoBankCode(bank)
                            : null;


                    console.log(
                        '[CAMINO VALIDATOR] BANK:',
                        bank
                    );

                    console.log(
                        '[CAMINO VALIDATOR] BANK CODE:',
                        bankCode
                    );

                    console.log(
                        '[CAMINO VALIDATOR] ACCOUNT:',
                        accountNumber
                    );


                    if (!bankCode) {

                        throw new Error(
                            `BANK CODE TIDAK DITEMUKAN: ${bank || '-'}`
                        );

                    }


                    const result =
                        await caminoValidateAccount(
                            bankCode,
                            accountNumber
                        );


                    console.log(
                        '[CAMINO VALIDATOR] RESULT:',
                        result
                    );



                    const data =
                        result?.data ||
                        result ||
                        {};


                    const accountName =
                        data?.account_name ||
                        data?.accountName ||
                        data?.nama ||
                        'VALID';


                    btn.innerHTML = `
                        <i class="fa fa-check"></i>
                        <span class="camino-validator-name">
                            ${avEscape(accountName)}
                        </span>
                    `;

                    console.log(
                        '[CAMINO VALIDATOR] BUTTON NAME:',
                        accountName,
                        btn.innerHTML
                    );

                    btn.title = accountName;

                    btn.classList.add(
                        'camino-validator-success'
                    );

                    btn.dataset.validated = '1';


                }
                catch (error) {

                    console.error(
                        '[CAMINO VALIDATOR] ERROR:',
                        error
                    );


                    btn.innerHTML = `
                        <i class="fa fa-times"></i>
                    `;


                    btn.title =
                        error?.message ||
                        'Validation failed';


                    btn.classList.add(
                        'camino-validator-error'
                    );


                    btn.dataset.validated =
                        '0';

                }
                finally {

                    btn.dataset.validating =
                        '0';


                    if (
                        btn.dataset.validated ===
                        '1'
                    ) {

                        btn.disabled =
                            true;

                    }
                    else {

                        btn.disabled =
                            false;

                    }

                }

            }
        );

        const container =
            actionCell.querySelector(
                '.btn-container'
            );


        if (container) {

            container.appendChild(
                btn
            );

        }
        else {

            actionCell.appendChild(
                btn
            );

        }

    }


    function markHeader() {

        const table =
            getTable();

        if (!table) {
            return;
        }


        const scroll =
            table.closest(
                '.dataTables_scroll'
            );

        if (!scroll) {
            return;
        }


        // Visible header DataTables
        const headerTable =
            scroll.querySelector(
                '.dataTables_scrollHead table'
            );


        if (!headerTable) {
            return;
        }


        const headerCells =
            headerTable.querySelectorAll(
                'thead tr:first-child > th'
            );


        headerCells.forEach(
            th => {

                const label =
                    (
                        th.innerText ||
                        ''
                    )
                        .trim()
                        .toUpperCase();


                if (label === 'AKSI') {

                    th.classList.add(
                        'camino-action-header'
                    );

                }

            }
        );

    }



    function scan() {

        const table =
            getTable();

        if (!table) {
            return;
        }


        markHeader();


        const rows =
            table.querySelectorAll(
                'tbody > tr[role="row"]'
            );


        rows.forEach(
            row => {

                createValidatorButton(
                    row
                );

            }
        );

    }


    function scheduleScan() {

        if (scanTimer) {
            clearTimeout(
                scanTimer
            );
        }


        scanTimer =
            setTimeout(
                () => {

                    scanTimer =
                        null;

                    scan();

                },
                150
            );

    }


    function observe() {

        const table =
            getTable();

        if (!table) {

            setTimeout(
                observe,
                500
            );

            return;

        }


        const tbody =
            table.querySelector(
                'tbody'
            );


        if (!tbody) {

            setTimeout(
                observe,
                500
            );

            return;

        }


        const observer =
            new MutationObserver(
                () => {

                    scheduleScan();

                }
            );


        observer.observe(
            tbody,
            {
                childList: true,
                subtree: true
            }
        );


        // Initial
        scheduleScan();

    }


    // =========================================================
    // WAIT FOR TABLE
    // =========================================================

    function init() {

        if (
            !document.getElementById(
                TABLE_ID
            )
        ) {

            setTimeout(
                init,
                500
            );

            return;

        }


        observe();

    }


    init();

})();

(function injectCaminoValidatorColumnCSS() {

    if (document.getElementById('camino-validator-column-css')) {
        return;
    }

    const style = document.createElement('style');

    style.id = 'camino-validator-column-css';

    style.textContent = `

/* =========================================================
   CAMINO VALIDATOR
   LARGE PREMIUM / 2-LINE ACCOUNT NAME
   DATATABLES SAFE
   ========================================================= */


/* =========================================================
   MAIN BUTTON
   ========================================================= */

.camino-validator-btn {

    width: 220px !important;
    min-width: 220px !important;
    max-width: 220px !important;

    height: 54px !important;
    min-height: 54px !important;

    margin-left: 6px !important;

    padding: 7px 12px !important;

    display: inline-flex !important;

    align-items: center !important;
    justify-content: center !important;

    gap: 10px !important;

    box-sizing: border-box !important;

    border:
        1px solid rgba(105, 130, 180, .40) !important;

    border-radius: 9px !important;

    background:
        linear-gradient(
            145deg,
            #1b2231 0%,
            #111722 55%,
            #0c111a 100%
        ) !important;

    color: #dce7ff !important;

    font-family: inherit !important;

    font-size: 19px !important;
    font-weight: 800 !important;

    line-height: 22px !important;

    white-space: normal !important;

    overflow: hidden !important;

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.08),
        inset 0 -1px 0 rgba(0,0,0,.45),
        0 3px 8px rgba(0,0,0,.48) !important;

    cursor: pointer !important;

    vertical-align: middle !important;

    transition:
        transform .18s ease,
        border-color .22s ease,
        background .22s ease,
        color .22s ease,
        box-shadow .22s ease,
        opacity .22s ease !important;
}



.camino-validator-btn i {

    display: inline-flex !important;

    align-items: center !important;
    justify-content: center !important;

    flex: 0 0 auto !important;

    width: 21px !important;
    height: 21px !important;

    font-size: 18px !important;

    line-height: 1 !important;
}



.camino-validator-name {

    display: -webkit-box !important;

    flex: 1 1 auto !important;

    min-width: 0 !important;

    width: auto !important;

    max-width: 175px !important;

    overflow: hidden !important;

    text-overflow: clip !important;

    white-space: normal !important;

    word-break: normal !important;

    overflow-wrap: anywhere !important;

    line-height: 21px !important;

    font-size: 19px !important;

    font-weight: 850 !important;

    letter-spacing: .15px !important;

    color: inherit !important;

    -webkit-box-orient: vertical !important;

    -webkit-line-clamp: 2 !important;
}


.camino-validator-btn:hover {

    transform:
        translateY(-1px) !important;

    border-color:
        rgba(125, 155, 215, .72) !important;

    background:
        linear-gradient(
            145deg,
            #252f43 0%,
            #182133 55%,
            #101722 100%
        ) !important;

    color: #f2f6ff !important;

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.10),
        0 5px 14px rgba(0,0,0,.55),
        0 0 12px rgba(90,120,190,.15) !important;
}


.camino-validator-btn:active {

    transform:
        translateY(0)
        scale(.97) !important;

    box-shadow:
        inset 0 2px 5px rgba(0,0,0,.45),
        0 2px 5px rgba(0,0,0,.4) !important;
}


.camino-validator-btn:disabled {
    cursor: wait !important;
    opacity: .88 !important;
    transform: none !important;
    pointer-events: none !important;
}


.camino-validator-btn.camino-validator-loading {

    border-color:
        rgba(80, 170, 255, .55) !important;

    background:
        linear-gradient(
            145deg,
            #19283a 0%,
            #111d2c 55%,
            #0b131f 100%
        ) !important;

    color: #8ecbff !important;

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.06),
        0 3px 10px rgba(0,0,0,.5),
        0 0 14px rgba(70,160,255,.15) !important;
}


.camino-validator-btn.camino-validator-loading i {

    animation:
        camino-validator-spin
        .8s linear infinite !important;
}


@keyframes camino-validator-spin {

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }

}


.camino-validator-btn.camino-validator-success {

    border-color:
        rgba(72, 220, 145, .48) !important;

    background:
        linear-gradient(
            145deg,
            #172a25 0%,
            #10201c 55%,
            #0b1613 100%
        ) !important;

    color: #72e6a5 !important;

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.06),
        0 3px 9px rgba(0,0,0,.45),
        0 0 12px rgba(72,220,145,.10) !important;
}


.camino-validator-btn.camino-validator-success i {

    color: #72e6a5 !important;

    text-shadow:
        0 0 7px rgba(72,220,145,.30) !important;
}


.camino-validator-btn.camino-validator-success:hover {

    border-color:
        rgba(90, 240, 160, .72) !important;

    background:
        linear-gradient(
            145deg,
            #1d342d 0%,
            #142821 55%,
            #0d1915 100%
        ) !important;

    color: #a2ffca !important;

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.08),
        0 5px 14px rgba(0,0,0,.5),
        0 0 16px rgba(72,220,145,.16) !important;
}


.camino-validator-btn.camino-validator-error {

    border-color:
        rgba(255, 80, 100, .48) !important;

    background:
        linear-gradient(
            145deg,
            #301b22 0%,
            #211319 55%,
            #140d11 100%
        ) !important;

    color: #ff777f !important;

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.05),
        0 3px 9px rgba(0,0,0,.45),
        0 0 12px rgba(255,70,90,.10) !important;
}

.camino-validator-btn.camino-validator-error:hover {
    border-color:
        rgba(255, 100, 120, .72) !important;
    background:
        linear-gradient(
            145deg,
            #3a2028 0%,
            #27151c 55%,
            #180d12 100%
        ) !important;
    color: #ff9aa5 !important;
}

.camino-action-header
.DataTables_sort_wrapper {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
}

.camino-action-header
.DataTables_sort_wrapper::after {
    content: "VALIDATOR";
    font-size: 12px !important;
    font-weight: 800 !important;
    letter-spacing: .10em !important;
    color: #00f5ff !important;
    opacity: .95 !important;
    text-shadow:
        0 0 8px rgba(0,245,255,.25) !important;
}

#withdrawal-pending-table
tbody
td.gridview.sticky-action-revamp.right {
    white-space: nowrap !important;
    overflow: visible !important;
}

#withdrawal-pending-table
tbody
.camino-validator-btn {
    flex-shrink: 0 !important;
    width: 220px !important;
    min-width: 220px !important;
    max-width: 220px !important;
    height: 54px !important;
    min-height: 54px !important;
}

#withdrawal-pending-table
.camino-validator-btn
.camino-validator-name {
    display: -webkit-box !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
    max-width: 175px !important;
    overflow: hidden !important;
    text-overflow: clip !important;
    white-space: normal !important;
    word-break: normal !important;
    overflow-wrap: anywhere !important;
    font-size: 19px !important;
    font-weight: 850 !important;
    line-height: 21px !important;
    letter-spacing: .15px !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 2 !important;
}

#withdrawal-pending-table
.action-btn-container {
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
    overflow: visible !important;
}

#withdrawal-pending-table
.camino-validator-btn {
    vertical-align: middle !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

@media (max-width: 1200px) {
    .camino-validator-btn {
        width: 195px !important;
        min-width: 195px !important;
        max-width: 195px !important;
        height: 52px !important;
        min-height: 52px !important;
    }

    .camino-validator-name {
        max-width: 150px !important;
        font-size: 17px !important;
        line-height: 19px !important;
    }
}

@media (prefers-reduced-motion: reduce) {
    .camino-validator-btn,
    .camino-validator-btn.camino-validator-loading i {
        animation: none !important;
        transition: none !important;
    }
}

#withdrawal-pending-table
tbody
.new-approve-btn,
#withdrawal-pending-table
tbody
.reject-btn,
#withdrawal-pending-table
tbody
.approve-btn {
    width: 220px !important;
    min-width: 220px !important;
    max-width: 220px !important;
    height: 54px !important;
    min-height: 54px !important;
    max-height: 54px !important;
    box-sizing: border-box !important;
    padding: 7px 12px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px !important;
    border-radius: 9px !important;
    font-size: 19px !important;
    font-weight: 800 !important;
    line-height: 22px !important;
    white-space: nowrap !important;
    vertical-align: middle !important;
}

#withdrawal-pending-table
tbody
.new-approve-btn i,
#withdrawal-pending-table
tbody
.reject-btn i,
#withdrawal-pending-table
tbody
.approve-btn i {
    width: 21px !important;
    height: 21px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 auto !important;
    font-size: 18px !important;
    line-height: 1 !important;
}

#withdrawal-pending-table
tbody
.new-approve-btn span,
#withdrawal-pending-table
tbody
.reject-btn span,
#withdrawal-pending-table
tbody
.approve-btn span {
    font-size: 19px !important;
    font-weight: 850 !important;
    line-height: 22px !important;
    white-space: nowrap !important;
}


#withdrawal-pending-table
tbody
.btn-container,
#withdrawal-pending-table
tbody
.action-btn-container {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    overflow: visible !important;
}


#withdrawal-pending-table
tbody
.camino-validator-btn,
#withdrawal-pending-table
tbody
.new-approve-btn,
#withdrawal-pending-table
tbody
.reject-btn,
#withdrawal-pending-table
tbody
.approve-btn {

    height: 54px !important;
    min-height: 54px !important;

    border-radius: 9px !important;

    font-size: 19px !important;
    font-weight: 800 !important;

    box-sizing: border-box !important;
}

    `;

    document.head.appendChild(style);

})();

function initAccountValidatorButton() {
    const host =
        document.getElementById("payHostUI");
    const button =
        host?.shadowRoot?.querySelector("#accountValidatorBtn");
    if (!button) {
        console.warn(
            "[ACCOUNT VALIDATOR] Button tidak ditemukan."
        );
        return;
    }
    if (button.dataset.avBound === "1") {
        return;
    }
    button.dataset.avBound = "1";
    button.addEventListener("click", () => {
        console.log(
            "[ACCOUNT VALIDATOR] Opening..."
        );
        const existing =
            document.getElementById(
                "account-validator-panel"
            );
        if (existing) {
            existing.style.display = "block";
            return;
        }
        createAccountValidator();
    });
}
(function waitForAccountValidatorButton() {
    const interval =
        setInterval(() => {
            const host =
                document.getElementById("payHostUI");
            const button =
                host?.shadowRoot?.querySelector(
                    "#accountValidatorBtn"
                );
            if (button) {
                clearInterval(interval);
                initAccountValidatorButton();
                console.log(
                    "[ACCOUNT VALIDATOR] Button connected."
                );
            }
        }, 300);
})();


clicksterBtn.onclick = () => {
    if (!window.__CAMINO_CLICKSTER__) {
        startCaminoClickster();
        setClicksterButton(true);
    } else {
        stopCaminoClickster();
        setClicksterButton(false);
    }
};
    w.querySelector('#ca').onclick = () => keys.forEach(k => w.querySelector('#' + k).checked = true);
    w.querySelector('#uc').onclick = () => keys.forEach(k => w.querySelector('#' + k).checked = false);
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
  function customFilterBoxTheme() {
  const box = document.querySelector('.filter-box');
  if (!box || box.dataset.caminoTheme) return;
  box.dataset.caminoTheme = "1";
  box.style.position = "relative";box.style.overflow = "hidden";box.style.borderRadius = "12px";box.style.background = "transparent";
  const gif = document.createElement("div");
  gif.style.cssText = `position:absolute;inset:0;z-index:0;pointer-events:none;background-image:url("https://i.postimg.cc/L6fQNJP9/image.png");background-size:cover;background-position:center;background-repeat:no-repeat;`;
  const overlay = document.createElement("div");
  overlay.style.cssText = `position:absolute;inset:0;z-index:1;pointer-events:none;background:rgba(5,10,20,.75);backdrop-filter:blur(2px);`;
  box.prepend(gif);
  box.appendChild(overlay);
  box.querySelectorAll("*").forEach(el => {
    if (el === gif || el === overlay) return;
    el.style.position = "relative";
    el.style.zIndex = "2";
  });
  box.querySelectorAll(`.content-filter,.treeSelector-container,.treeSelector-wrapper,.treeSelector-input-box,.selector,.switch-container,.filter-container,input,select`).forEach(el => {
    el.style.background = "rgba(10,20,35,.45)";
    el.style.borderColor = "rgba(255,255,255,.15)";
  });
  box.querySelectorAll("label, span, a, i, div").forEach(el => {
    el.style.color = "#fff";
  });
  box.querySelectorAll('.switch').forEach(el => {
    el.style.display = "inline-flex";
    el.style.alignItems = "center";
  });
  box.querySelectorAll('.slider').forEach(el => {
    el.style.flexShrink = "0";
  });
    
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
  let BLOCK_ID = [];
  let BLOCK_READY = false;
  
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
function prankFullscreen() {
  const div = document.createElement("div");
  div.style.cssText = `position:fixed;inset:0;width:100vw;height:100vh;background:#000;z-index:2147483647;display:flex;align-items:center;justify-content:center;`;
  div.innerHTML = `<img src="https://c.tenor.com/MY6Oiygedx0AAAAd/tenor.gif"style="width:100vw;height:100vh;object-fit:cover;">`;
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
startHighlightEngine();
highlightBlockedRows();
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

function highlightBlockedRows() {
  if (!BLOCK_READY) return;
  document.querySelectorAll('table tbody tr').forEach(tr => {
    const tds = tr.querySelectorAll('td');
    const idUser = (tds[4]?.innerText || '').trim();
    const isBlocked = BLOCK_ID.some(
      id => id.toString().trim().toLowerCase() === idUser.toLowerCase()
    );
    if (isBlocked) {
      tds.forEach(td => {
        td.style.setProperty('background', 'rgba(138,130,250,.25)', 'important');
        td.style.setProperty('background-image', 'none', 'important');
        td.style.setProperty('color', '#111', 'important');
        td.style.setProperty('font-weight', '500', 'important');
        td.style.setProperty('text-shadow', 'none', 'important');
        td.style.setProperty('box-shadow', 'none', 'important');
        td.style.setProperty('border-color', 'rgba(0,0,0,.05)', 'important');
        td.querySelectorAll('*').forEach(el => {
          el.style.setProperty('color', 'inherit', 'important');
          el.style.setProperty('text-shadow', 'none', 'important');
        });
      });
      tr.style.setProperty('background', 'rgba(138,130,250,.25)', 'important');
      tr.style.setProperty('background-image', 'none', 'important');
      tr.dataset.caminoBlocked = 'true';
    } else if (tr.dataset.caminoBlocked === 'true') {
      tds.forEach(td => {
        td.style.removeProperty('background');
        td.style.removeProperty('background-image');
        td.style.removeProperty('color');
        td.style.removeProperty('font-weight');
        td.style.removeProperty('text-shadow');
        td.style.removeProperty('box-shadow');
        td.style.removeProperty('border-color');
        td.querySelectorAll('*').forEach(el => {
          el.style.removeProperty('color');
          el.style.removeProperty('text-shadow');
        });
      });
      tr.style.removeProperty('background');
      tr.style.removeProperty('background-image');
      delete tr.dataset.caminoBlocked;
    }
  });
}
let caminoHighlightTimer = null;
function startHighlightEngine() {
  if (caminoHighlightTimer) return;
  caminoHighlightTimer = setInterval(() => {
    if (!BLOCK_READY) return;
    highlightBlockedRows();
  }, 500);
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
