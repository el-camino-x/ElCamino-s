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

.p{
    background:
        linear-gradient(
            rgba(3,6,18,.64),
            rgba(6,7,24,.72)
        ),
        url("https://media1.tenor.com/m/crO6TPpohx8AAAAC/flying-butterfly.gif");

    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-attachment:local;

    color:#fff;

    border-radius:16px;

    font-family:Inter,Arial,sans-serif;

    width:420px;
    height:750px;

    resize:both;

    overflow-y:auto;
    overflow-x:hidden;

    border:1px solid rgba(120,145,255,.45);

    box-shadow:
        inset 0 0 35px rgba(70,110,255,.12),
        inset 0 0 80px rgba(120,70,255,.08),
        0 15px 45px rgba(0,0,0,.5);

    position:relative;

    scroll-behavior:smooth;

    /* =========================
       HIDDEN SCROLLBAR
    ========================= */

    scrollbar-width:none;

    box-sizing:border-box;

    padding:3px;

    isolation:isolate;
}


/* =========================
   CHROME / EDGE / SAFARI
   HILANGKAN SCROLLBAR
========================= */

.p::-webkit-scrollbar{
    width:0;
    height:0;
}

.p::-webkit-scrollbar-track{
    background:transparent;
}

.p::-webkit-scrollbar-thumb{
    background:transparent;
}

/* =========================
   BLUE / PURPLE ATMOSPHERE
========================= */

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

z-index:0
}


/* =========================
   ANIME ENERGY SWEEP
========================= */

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

z-index:1;

box-shadow:
inset 0 0 35px rgba(80,120,255,.05),
inset 0 0 75px rgba(130,80,255,.05)
}

.p > *{
position:relative;
z-index:2
}

@keyframes blueAnimeSweep{
0%{
background-position:240% 0
}
45%,100%{
background-position:-140% 0
}
}


/* =========================
   SCROLLBAR
========================= */

.p::-webkit-scrollbar{
width:3px
}

.p::-webkit-scrollbar-track{
background:transparent
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
border-radius:10px
}

.p::-webkit-scrollbar-thumb:hover{
background:
linear-gradient(
180deg,
#8bc0ff,
#8c90ff,
#b083ff
)
}


/* =========================
   HEADER
========================= */

.h{
    position:relative;
    overflow:hidden;

    display:flex;
    align-items:center;
    gap:8px;

    min-height:34px;
    padding:7px 11px;

    color:#fff;

    font-weight:900;
    letter-spacing:1px;

    text-shadow:
        0 0 5px rgba(100,160,255,.55),
        0 0 15px rgba(130,90,255,.3);

    border-bottom:1px solid rgba(110,145,255,.2);

    white-space:nowrap;

    animation:headerFloat 4s ease-in-out infinite;

    will-change:transform;
}


/* =========================
   HEADER TOP SHINY
========================= */

.h::before{
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
            rgba(170,130,255,.3),
            transparent
        );

    transform:skewX(-25deg);

    animation:
        headerScan 3.2s linear infinite;

    pointer-events:none;
}


/* =========================
   RUNNING LIGHT
   DI BAWAH JUDUL
========================= */

.h::after{
    content:"";

    position:absolute;

    bottom:-1px;
    left:0;

    width:100%;
    height:2px;

    background:
        linear-gradient(
            90deg,

            transparent 0%,

            transparent 12%,

            #5c9dff 25%,

            #746cff 38%,

            #a06fff 50%,

            #62d5ff 62%,

            #746cff 75%,

            #5c9dff 88%,

            transparent 100%
        );

    background-size:220% 100%;

    animation:
        headerRunningLight 2.5s linear infinite;

    box-shadow:
        0 0 5px rgba(100,140,255,.8),
        0 0 10px rgba(120,90,255,.45),
        0 0 18px rgba(90,180,255,.2);

    opacity:.9;

    pointer-events:none;
}


/* =========================
   STATUS DOT
========================= */

.h .status-dot{
    flex-shrink:0;
}


/* =========================
   HEADER INFO
========================= */

.h .header-info{
    margin-left:auto;

    flex-shrink:0;

    z-index:3;
}


/* =========================
   HEADER FLOAT
========================= */

@keyframes headerFloat{

    0%,100%{
        transform:translateX(0);
    }

    50%{
        transform:translateX(2px);
    }
}


/* =========================
   TOP SHINY SCAN
========================= */

@keyframes headerScan{

    0%{
        left:-130%;
    }

    100%{
        left:145%;
    }
}


/* =========================
   BOTTOM RUNNING LIGHT
========================= */

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

/* =========================
   BODY
========================= */

.b{
padding:14px 16px;
display:grid;
grid-template-columns:1fr 1fr;
gap:8px;
font-size:12px
}

.b label{
display:flex;
align-items:center;
gap:6px
}


/* =========================
   BUTTON AREA
========================= */

.btns{
grid-column:1/-1;
display:flex;
flex-direction:column;
gap:10px;
margin-top:15px;
padding:0 8px
}


/* =========================
   HEADER INFO
========================= */

.header-info{
float:right;
cursor:pointer;
font-size:18px;

color:#82adff;

text-shadow:
0 0 7px rgba(80,140,255,.7),
0 0 16px rgba(130,90,255,.4);

transition:.25s
}

.header-info:hover{
color:#c3b8ff;

transform:
scale(1.12)
rotate(8deg);

text-shadow:
0 0 8px rgba(100,160,255,.9),
0 0 20px rgba(150,100,255,.6)
}


/* =========================
   BLOCK STATUS
========================= */

#BLOCK_STATUS{
width:100%;
box-sizing:border-box;

margin:5px auto 12px auto;
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

position:relative;
overflow:hidden;

box-shadow:
0 0 15px rgba(70,110,255,.12),
0 0 25px rgba(120,70,255,.06),
inset 0 0 20px rgba(90,100,255,.05);

animation:statusPulse 2.5s ease-in-out infinite
}

#BLOCK_STATUS::before{
content:"";
position:absolute;
left:0;
top:0;

width:100%;
height:1px;

background:
linear-gradient(
90deg,
transparent,
#65a9ff,
#8170ff,
#a06cff,
#65dfff,
transparent
);

animation:statusLine 2.5s linear infinite
}

@keyframes statusPulse{
0%,100%{
box-shadow:
0 0 12px rgba(70,110,255,.1),
inset 0 0 20px rgba(90,100,255,.035)
}

50%{
box-shadow:
0 0 22px rgba(70,120,255,.2),
0 0 32px rgba(120,70,255,.1),
inset 0 0 22px rgba(100,100,255,.07)
}
}

@keyframes statusLine{
0%{
transform:translateX(-100%)
}
100%{
transform:translateX(100%)
}
}


/* =========================
   INFO
========================= */

.info{
grid-column:1/-1;

margin-top:12px;
padding:12px;

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
inset 0 0 20px rgba(70,100,255,.025)
}

.logo{
width:14px;
height:14px;
vertical-align:middle;
margin-right:6px;
border-radius:3px
}


/* =========================
   LIMIT BOX
========================= */

.limit-box{
grid-column:1/-1;

margin:10px 8px 0;
padding:12px;

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

position:relative;
overflow:hidden
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

pointer-events:none
}

/* =========================
   APPROVE LIMIT — CAMINO THEME
========================= */

.limit-box{
    grid-column:1/-1;

    margin:10px 8px 0;
    padding:12px;

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

    position:relative;
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
font-size:14px;
margin-bottom:10px;
color:#91b4ff;
font-weight:900;
letter-spacing:2px;
text-transform:uppercase;
text-shadow:
0 0 7px rgba(80,140,255,.75),
0 0 16px rgba(130,80,255,.4)
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
0 4px 14px rgba(0,0,0,.2)
}

.limit-box input::placeholder{
color:rgba(180,190,255,.32);
font-size:15px;
font-weight:500
}

.limit-box input:hover{
border-color:rgba(110,160,255,.65);
box-shadow:
0 0 12px rgba(70,130,255,.18),
inset 0 0 14px rgba(0,0,0,.4)
}

.limit-box input:focus{
border-color:#789cff;
background:rgba(8,10,28,.92);
box-shadow:
0 0 8px rgba(80,140,255,.6),
0 0 20px rgba(120,80,255,.22),
inset 0 0 12px rgba(80,120,255,.1);
text-shadow:
0 0 8px rgba(100,150,255,.45)
}

.limit-box input::-webkit-inner-spin-button,
.limit-box input::-webkit-outer-spin-button{
-webkit-appearance:none;
margin:0
}

.limit-box input{
-moz-appearance:textfield
}

@keyframes limitScanBlue{
0%{
left:-120%;
opacity:0
}
15%{
opacity:1
}
45%,100%{
left:145%;
opacity:0
}
}


/* =========================
   ROW
========================= */

.row2{
display:flex;
gap:6px
}

.row2 button{
flex:1
}


/* =========================
   BUTTON
========================= */

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
inset 0 1px rgba(255,255,255,.1)
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

transform:skewX(-25deg)
}

button:hover::before{
animation:buttonBlueSweep .55s ease
}

button:hover{
transform:
translateY(-1px)
scale(1.02);

background-position:100% 0;

box-shadow:
0 7px 18px rgba(0,0,0,.4),
0 0 10px rgba(70,130,255,.18),
0 0 20px rgba(130,80,255,.12)
}

button:active{
transform:
translateY(0)
scale(.98);

box-shadow:
0 2px 8px rgba(0,0,0,.3)
}

/* =========================
   PERFECT BORDER RUNNER
========================= */

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

    stroke:
        #ff4141;

    stroke-width:2.5;

    stroke-linecap:round;

    stroke-dasharray:
        45 955;

    stroke-dashoffset:0;

    filter:
        drop-shadow(0 0 2px #ffffff)
        drop-shadow(0 0 5px #ffffff)
        drop-shadow(0 0 9px #ff5555)
        drop-shadow(0 0 16px #ff2222)
        drop-shadow(0 0 28px rgba(255,30,30,.8))
        drop-shadow(0 0 42px rgba(255,0,0,.35));

    animation:
        caminoBorderTravel 1s linear infinite;
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

@keyframes buttonBlueSweep{
0%{
left:-100%
}

100%{
left:140%
}
}


/* =========================
   SECTION
========================= */

.section{
grid-column:1/-1;

position:relative;

background:
linear-gradient(
135deg,
rgba(255,255,255,.025),
rgba(60,110,255,.035),
rgba(120,80,255,.035)
);

border:1px solid rgba(110,130,255,.18);

border-radius:13px;

padding:12px;
margin-top:10px;

backdrop-filter:blur(8px);

overflow:hidden
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
)
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
0 0 14px rgba(120,80,255,.25)
}


/* =========================
   BANK GRID
========================= */

.bank-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:8px
}

.bank-grid label{
position:relative;
overflow:hidden;

display:flex;
align-items:center;
gap:8px;

background:
linear-gradient(
135deg,
rgba(255,255,255,.025),
rgba(50,70,140,.035),
rgba(80,50,130,.025)
);

padding:10px;

border-radius:11px;

border:1px solid rgba(255,255,255,.065);

color:#777;

cursor:pointer;

transition:.3s ease;

box-shadow:
inset 0 0 15px rgba(0,0,0,.4)
}

.bank-grid label::before{
content:"";

position:absolute;
top:0;
left:-130%;

width:90%;
height:100%;

background:
linear-gradient(
90deg,
transparent,
rgba(70,150,255,.35),
rgba(120,100,255,.45),
rgba(170,90,255,.25),
transparent
);

transform:skewX(-25deg)
}

.bank-grid label:hover::before{
animation:bankSweepBlue .6s ease
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

transform:scale(1.025)
}

.bank-grid label:has(input:checked)::before{
animation:bankLightBlue .8s ease
}

/* =========================
   PREMIUM ANIME BANK ITEM
   FULL ITEM SHINY
========================= */

.bank-grid label{
    position:relative;
    overflow:hidden;

    display:flex;
    align-items:center;
    gap:8px;

    padding:10px;

    border-radius:11px;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.025),
            rgba(50,70,140,.035),
            rgba(80,50,130,.025)
        );

    border:1px solid rgba(255,255,255,.065);

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


/* =========================
   FULL CARD SHINY SWEEP
========================= */

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


/* =========================
   MOUSE OVER
========================= */

.bank-grid label:hover{

    transform:
        translateY(-1px)
        scale(1.015);

    color:#fff;

    border-color:
        rgba(120,160,255,.55);

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


/* =========================
   SHINE ANIMATION
========================= */

.bank-grid label:hover::before{

    opacity:1;

    animation:
        bankFullShine .7s ease;
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


/* =========================
   CONTENT ABOVE SHINE
========================= */

.bank-grid label > *{
    position:relative;
    z-index:2;
}


/* =========================
   ACTIVE BANK
========================= */

.bank-grid label:has(input:checked){

    background:
        linear-gradient(
            120deg,
            rgba(60,130,255,.13),
            rgba(100,80,255,.14),
            rgba(150,80,255,.07)
        );

    border-color:
        rgba(120,150,255,.65);

    color:#fff;

    box-shadow:

        0 0 15px rgba(70,120,255,.16),

        0 0 22px rgba(120,70,255,.1),

        inset 0 0 20px rgba(100,100,255,.06);

    transform:
        scale(1.025);
}


/* =========================
   ACTIVE HOVER
========================= */

.bank-grid label:has(input:checked):hover{

    border-color:
        rgba(170,190,255,.85);

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


/* =========================
   OFF CHECKBOX
   SUBTLE HOVER
========================= */

.bank-grid input{
    appearance:none;
    -webkit-appearance:none;

    width:18px;
    height:18px;

    min-width:18px;
    min-height:18px;

    position:relative;

    border-radius:50%;

    background:
        radial-gradient(
            circle at 35% 30%,
            rgba(255,255,255,.10),
            rgba(255,255,255,.025) 28%,
            rgba(10,12,28,.96) 72%
        );

    border:1px solid rgba(145,165,215,.35);

    cursor:pointer;

    flex-shrink:0;

    overflow:hidden;

    transition:
        transform .25s ease,
        border-color .25s ease,
        box-shadow .25s ease;
}


/* =========================
   OFF HOVER
   CUMA SEDIKIT RESPONSIVE
========================= */

.bank-grid input:hover{

    transform:scale(1.06);

    border-color:
        rgba(145,170,220,.55);

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


/* =========================
   OFF HOVER SHINE
   TIPIS BANGET
========================= */

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

    animation:
        checkboxSoftShine .7s ease;

    pointer-events:none;
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


/* =========================
   ON / CHECKED
   BARU BOLEH TERANG
========================= */

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

    border-color:
        rgba(195,215,255,.98);

    box-shadow:

        inset 0 0 4px rgba(255,255,255,.95),

        0 0 6px rgba(80,155,255,.95),

        0 0 13px rgba(110,85,255,.85),

        0 0 22px rgba(160,80,255,.42),

        0 0 30px rgba(100,120,255,.16);

    animation:
        animeCorePulse 2s ease-in-out infinite;
}


/* =========================
   ON HOVER
========================= */

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


/* =========================
   ON CORE
========================= */

.bank-grid input:checked::after{

    content:"";

    position:absolute;

    width:6px;
    height:6px;

    top:50%;
    left:50%;

    transform:
        translate(-50%,-50%);

    border-radius:50%;

    background:#fff;

    box-shadow:
        0 0 4px #fff,
        0 0 9px rgba(130,190,255,1),
        0 0 15px rgba(135,100,255,.85);
}


/* =========================
   INFORMATION POPUP
   EL CAMINO BLUE / PURPLE
========================= */

.cutoff-popup{
    position:fixed;

    top:50%;
    left:50%;

    transform:
        translate(-50%,-50%)
        scale(.85);

    width:380px;

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

    padding:25px;

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


/* =========================
   TOP BLUE / PURPLE RUNNER
========================= */

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

    animation:
        infoBlueRunner 2.2s linear infinite;

    pointer-events:none;
}


/* =========================
   BLUE / PURPLE ATMOSPHERE
========================= */

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


/* =========================
   SHOW
========================= */

.cutoff-popup.show{
    opacity:1;

    visibility:visible;

    transform:
        translate(-50%,-50%)
        scale(1);

    animation:
        cutoffBlueAnime .35s ease;
}


/* =========================
   TITLE
========================= */

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


/* =========================
   CLOSE
========================= */

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


/* =========================
   CONTENT
========================= */

.cutoff-content{
    font-size:22px;

    font-weight:700;

    line-height:2;

    letter-spacing:.8px;

    color:#e9edff;

    text-shadow:
        0 0 7px rgba(100,140,255,.35);

    position:relative;

    z-index:2;
}


/* =========================
   BOLD CONTENT
========================= */

.cutoff-content b{
    font-size:23px;

    font-weight:900;

    color:#91b4ff;

    text-shadow:
        0 0 8px rgba(80,140,255,.8),
        0 0 16px rgba(130,80,255,.45);
}


/* =========================
   LOGO
========================= */

.cutoff-popup img.logo{
    width:17px;

    height:17px;

    vertical-align:middle;

    margin-right:7px;

    filter:
        drop-shadow(0 0 4px rgba(80,150,255,.65))
        drop-shadow(0 0 8px rgba(130,80,255,.35));
}


/* =========================
   CUTOFF
========================= */

.cutoff-title{
    color:#91b4ff;

    font-weight:900;

    text-shadow:
        0 0 7px rgba(80,140,255,.75),
        0 0 15px rgba(130,80,255,.35);
}


/* =========================
   LIMIT TITLE
========================= */

.limit-title{
    font-size:12px;

    font-weight:bold;

    color:#91b4ff;

    margin-bottom:8px;

    text-shadow:
        0 0 7px rgba(80,140,255,.65),
        0 0 14px rgba(130,80,255,.3);
}


/* =========================
   BLUE / PURPLE POPUP ANIMATION
========================= */

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


/* =========================
   RUNNING LIGHT
========================= */

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


/* =========================
   QUOTE
========================= */

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

animation:blueQuote 1.5s ease-in-out infinite
}

.music-note{
display:inline-block;

animation:blueNote .65s ease-in-out infinite alternate
}

@keyframes blueQuote{
0%,100%{
transform:scale(1);

opacity:.85;

text-shadow:
0 0 6px rgba(80,130,255,.3)
}

50%{
transform:scale(1.025);

opacity:1;

text-shadow:
0 0 8px rgba(80,150,255,.8),
0 0 18px rgba(130,90,255,.5),
0 0 30px rgba(170,80,255,.2)
}
}

@keyframes blueNote{
0%{
transform:
translateY(2px)
rotate(-8deg);

text-shadow:
0 0 5px rgba(80,140,255,.4)
}

100%{
transform:
translateY(-3px)
rotate(8deg);

text-shadow:
0 0 8px rgba(90,150,255,.9),
0 0 16px rgba(140,90,255,.6)
}
}


/* =========================
   FOOTER
========================= */

.ft{
margin-top:auto;

padding:6px 10px;

overflow:hidden;

mask-image:
linear-gradient(
to right,
transparent,
black 10%,
black 90%,
transparent
)
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


.ft{
position:relative;

overflow:hidden;

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




/* =========================
   CHECKBOX
========================= */

input[type="checkbox"]{
width:15px;
height:15px
}
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

  <button id="accountValidatorBtn">
    ✦ ACCOUNT VALIDATOR
  </button>

</div>

        <div class="info">

<div id="BLOCK_STATUS">
  🔒 BLOCK ID : LOADING...
</div>

<div class="quote">
    <span class="music-note">♫</span> NOW PLAYING — BEK PANIK TURBO DISCO (BKB) BREAKBEAT X INDOBOUNCE
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

// =========================
// CAMINO TOAST
// =========================
function caminoToast(message = "SETTINGS SAVED") {

    let old = document.getElementById("caminoToast");
    if (old) old.remove();

    const toast = document.createElement("div");
    toast.id = "caminoToast";

    toast.innerHTML = `
        <div class="camino-toast-icon">✓</div>
        <div class="camino-toast-text">${message}</div>
    `;

toast.style.cssText = `
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%) scale(.85);

    min-width:340px;
    padding:30px 42px;

    display:flex;
    align-items:center;
    justify-content:center;
    gap:18px;

    background:
        linear-gradient(
            135deg,
            rgba(8,12,30,.98),
            rgba(25,15,48,.98)
        );

    border:1px solid rgba(120,155,255,.65);
    border-radius:20px;

    color:#fff;

    font-family:Inter,Arial,sans-serif;
    font-size:24px;
    font-weight:900;
    letter-spacing:2px;

    box-shadow:
        0 0 30px rgba(70,120,255,.22),
        0 0 60px rgba(130,80,255,.15),
        0 20px 50px rgba(0,0,0,.6),
        inset 0 0 30px rgba(80,120,255,.06);

    z-index:2147483647;

    opacity:0;

    transition:
        opacity .25s ease,
        transform .25s cubic-bezier(.2,.8,.2,1);

    pointer-events:none;
`;

    const icon = toast.querySelector(".camino-toast-icon");

icon.style.cssText = `
    width:42px;
    height:42px;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:50%;

    background:
        radial-gradient(
            circle,
            #9fc8ff 0%,
            #6f8dff 45%,
            #6b4ed8 100%
        );

    color:#fff;

    font-size:27px;
    font-weight:900;

    box-shadow:
        0 0 10px rgba(90,150,255,.9),
        0 0 22px rgba(120,80,255,.6);
`;

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

        // =========================
        // STOP STATE
        // =========================

        clicksterBtn.innerHTML = `
            <span style="
                position:relative;
                z-index:3;
                display:flex;
                align-items:center;
                justify-content:center;
                gap:9px;
            ">
                <span style="
                    font-size:17px;
                    line-height:1;
                    text-shadow:
                        0 0 8px rgba(255,90,90,.9),
                        0 0 18px rgba(255,50,50,.55);
                ">■</span>

                <span>STOP ENGINE</span>
            </span>
        `;
        clicksterBtn.classList.add('camino-running');

clicksterBtn.insertAdjacentHTML('beforeend', `
<svg
    class="camino-border-svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
>
    <rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx="14"
        ry="14"
        pathLength="1000"
    />
</svg>
`);

        clicksterBtn.style.cssText = `
            flex:1;
            height:46px;

            border-radius:14px;
            border:1px solid rgba(255,100,100,.55);

            cursor:pointer;

            background:
                radial-gradient(
                    circle at 50% -20%,
                    rgba(255,110,110,.22),
                    transparent 55%
                ),
                linear-gradient(
                    145deg,
                    #170c12 0%,
                    #32121c 45%,
                    #18090e 100%
                );

            color:#fff;

            font-family:Inter,Arial,sans-serif;
            font-size:11px;
            font-weight:950;
            letter-spacing:2.2px;

            box-shadow:
                0 0 8px rgba(255,70,70,.35),
                0 0 22px rgba(255,50,50,.18),
                inset 0 1px 0 rgba(255,255,255,.14),
                inset 0 -8px 20px rgba(0,0,0,.28);

            transition:
                transform .2s ease,
                box-shadow .25s ease,
                border-color .25s ease;

            position:relative;
            overflow:hidden;
        `;

        clicksterBtn.classList.add('camino-running');

    } else {

        clicksterBtn.classList.remove('camino-running');

        // =========================
        // START STATE
        // =========================

        clicksterBtn.innerHTML = `
            <span style="
                position:relative;
                z-index:3;
                display:flex;
                align-items:center;
                justify-content:center;
                gap:9px;
            ">
                <span style="
                    font-size:18px;
                    line-height:1;
                    text-shadow:
                        0 0 8px rgba(80,210,255,.95),
                        0 0 18px rgba(80,130,255,.7);
                ">✦</span>

                <span>START ENGINE</span>
            </span>
        `;

        clicksterBtn.style.cssText = `
            flex:1;
            height:46px;

            border-radius:14px;
            border:1px solid rgba(80,190,255,.55);

            cursor:pointer;

            background:
                radial-gradient(
                    circle at 50% -20%,
                    rgba(80,220,255,.25),
                    transparent 55%
                ),
                linear-gradient(
                    145deg,
                    #071522 0%,
                    #102c4b 45%,
                    #081521 100%
                );

            color:#fff;

            font-family:Inter,Arial,sans-serif;
            font-size:11px;
            font-weight:950;
            letter-spacing:2.2px;

            box-shadow:
                0 0 8px rgba(60,190,255,.4),
                0 0 24px rgba(60,130,255,.2),
                inset 0 1px 0 rgba(255,255,255,.16),
                inset 0 -8px 20px rgba(0,0,0,.28);

            transition:
                transform .2s ease,
                box-shadow .25s ease,
                border-color .25s ease;

            position:relative;
            overflow:hidden;
        `;
    }
}


// =========================
// HOVER EFFECT
// =========================

clicksterBtn.addEventListener('mouseenter', () => {

    if (window.__CAMINO_CLICKSTER__) {

        clicksterBtn.style.transform =
            'translateY(-2px) scale(1.015)';

        clicksterBtn.style.boxShadow =
            '0 0 14px rgba(255,70,70,.55), ' +
            '0 0 35px rgba(255,50,50,.25), ' +
            'inset 0 1px 0 rgba(255,255,255,.2)';

    } else {

        clicksterBtn.style.transform =
            'translateY(-2px) scale(1.015)';

        clicksterBtn.style.boxShadow =
            '0 0 14px rgba(70,210,255,.6), ' +
            '0 0 35px rgba(70,130,255,.3), ' +
            'inset 0 1px 0 rgba(255,255,255,.2)';
    }

});

clicksterBtn.addEventListener('mouseleave', () => {

    clicksterBtn.style.transform = 'translateY(0) scale(1)';

    setClicksterButton(
        window.__CAMINO_CLICKSTER__
    );

});


// =========================
// PRESS EFFECT
// =========================

clicksterBtn.addEventListener('mousedown', () => {
    clicksterBtn.style.transform =
        'translateY(1px) scale(.985)';
});

clicksterBtn.addEventListener('mouseup', () => {
    clicksterBtn.style.transform =
        'translateY(-2px) scale(1.015)';
});


// =========================
// INITIAL STATE
// =========================

setClicksterButton(false);

// ============================================================
// ACCOUNT VALIDATOR
// APIVALIDASI V4
// EL-CAMINO SYSTEM
// ============================================================


// ============================================================
// CONFIG
// ============================================================

const API_KEY = "ew_18371fce5b6cdb8aaf9356ef2777fd06ef3fe82c";

const API_BASE =
    "https://app.apivalidasi.my.id";


// ============================================================
// BANK / E-WALLET LIST
// Sesuai daftar APIVALIDASI V4
// ============================================================

const AV_BANK_LIST = [

    // =========================
    // BANK
    // =========================

    ["BRI", "002"],
    ["MANDIRI", "008"],
    ["BNI", "009"],
    ["DANAMON", "011"],
    ["BANK PERMATA SYARIAH", "013"],
    ["BCA", "014"],
    ["BANK MAYBANK SYARIAH", "016"],
    ["PANIN", "019"],
    ["CIMB NIAGA", "022"],
    ["UOB", "023"],
    ["OCBC", "028"],
    ["CITIBANK", "031"],
    ["JPMCC1IN", "032"],
    ["BANK OF AMERICA", "033"],
    ["CCB INDONESIA", "036"],
    ["AG INT", "037"],
    ["HSBC", "041"],
    ["TOKYO MUFJ", "042"],
    ["DBS", "046"],
    ["BANK RESONA PERDANIA", "047"],
    ["BANK MIZUHO", "048"],
    ["STANDARD CHARTER", "050"],
    ["CAPITAL INDONESIA", "054"],
    ["BNP PARIBAS", "057"],
    ["RABOBANK", "060"],
    ["ANZ", "061"],
    ["DEUTSCHE", "067"],
    ["CHINA LTD", "069"],

    ["BUMI ARTA", "076"],
    ["EKONOMI RAHARJA", "087"],
    ["ANTAR DAERAH", "088"],
    ["J TRUST", "095"],
    ["MAYAPADA", "097"],

    ["BJB BPD JABAR BANTEN", "110"],
    ["BANK JAKARTA SYARIAH", "111"],
    ["BPD YOGYAKARTA", "112"],
    ["BPD JATENG", "113"],
    ["BPD JAWA TIMUR SYARIAH", "114"],
    ["BPD JAMBI", "115"],
    ["ACEH", "116"],
    ["BPD SUMUT", "117"],
    ["BANK NAGARI", "118"],
    ["BPD RIAU KEPRI", "119"],
    ["BPD SUMATERA SELATAN DAN BANGKA BELITUNG SYARIAH", "120"],
    ["BPD LAMPUNG", "121"],
    ["BPD KALIMANTAN SELATAN SYARIAH", "122"],
    ["BPD KALBAR", "123"],
    ["BPD KALTIM", "124"],
    ["KALTENG", "125"],
    ["BPD SULSEL SELBAR", "126"],
    ["BPD SULUTGO", "127"],
    ["BPD NTB", "128"],
    ["BPD BALI", "129"],
    ["BPD NTT", "130"],
    ["BPD MALUKU", "131"],
    ["BPD PAPUA", "132"],
    ["BPD BENGKULU", "133"],
    ["BPD SULTENG", "134"],
    ["BPD BANTEN", "137"],

    ["BNP", "145"],
    ["BOII", "146"],
    ["MUAMALAT", "147"],
    ["MESTIKA", "151"],
    ["BANK SHINHAN", "152"],
    ["SINARMAS", "153"],
    ["MASPION", "157"],
    ["GANESHA", "161"],
    ["ICBC", "164"],
    ["QNB", "167"],

    ["BTN", "200"],
    ["BWS", "212"],
    ["SMBC", "213"],

    ["BRI SYARIAH", "422"],
    ["BJB SYARIAH", "425"],
    ["MEGA", "426"],
    ["BNI SYARIAH", "427"],
    ["KB BUKOPIN", "441"],
    ["BSI", "451"],
    ["BISNIS INTERNASIONAL", "459"],
    ["JASA JAKARTA", "472"],
    ["HANA", "484"],
    ["MNC", "485"],
    ["NEO COMMERCE", "490"],
    ["BRI AGRO", "494"],
    ["SBI", "498"],
    ["BCA DIGITAL", "501"],
    ["NOBU", "503"],
    ["MEGA SYARIAH", "506"],
    ["INA", "513"],
    ["PANIN SYARIAH", "517"],
    ["PRIMA MASTER", "520"],
    ["BANK BUKOPIN SYARIAH", "521"],
    ["SAMPOERNA", "523"],
    ["BANK OKE INDONESIA", "526"],
    ["AMAR BANK", "531"],
    ["SEABANK", "535"],
    ["BCA SYARIAH", "536"],
    ["JAGO", "542"],
    ["BANK NANO SYARIAH", "546"],
    ["BTPN SYARIAH", "547"],
    ["MAS", "548"],
    ["MAYORA", "553"],
    ["INDEX", "555"],
    ["CENTRATAMA", "559"],
    ["SUPERBANK", "562"],
    ["MANTAP", "564"],
    ["VICTORIA", "566"],
    ["ALLO BANK", "567"],
    ["BANK IBK", "945"],
    ["BANK ALADIN SYARIAH", "947"],
    ["CHINATRUST", "949"],


    // =========================
    // E-WALLET
    // =========================

    ["DANA", "dana"],
    ["GOPAY", "gopay"],
    ["GOPAY DRIVER", "gopaydriver"],
    ["LINKAJA", "linkaja"],
    ["MAXIM", "maxim"],
    ["OVO", "ovo"],
    ["SHOPEEPAY", "shopeepay"]

];


// ============================================================
// ESCAPE HTML
// ============================================================

function avEscape(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// VALIDATE ACCOUNT
// ============================================================

async function validateAccount(
    bankCode,
    accountNumber
) {

    if (!bankCode) {

        throw new Error(
            "BANK TIDAK DIDUKUNG"
        );

    }


    if (!accountNumber) {

        throw new Error(
            "NOMOR REKENING KOSONG"
        );

    }


    const url =
        `${API_BASE}/api/v3/validate` +
        `?code=${encodeURIComponent(bankCode)}` +
        `&accountNumber=${encodeURIComponent(accountNumber)}`;


    console.log(
        "[ACCOUNT VALIDATOR] REQUEST:",
        url
    );


    const response =
        await fetch(
            url,
            {

                method: "GET",

                headers: {

                    "X-API-Key":
                        API_KEY,

                    "X-Idempotency-Key":
                        "elcamino-validator-" +
                        Date.now()

                }

            }
        );


    let data;


    try {

        data =
            await response.json();

    }

    catch {

        throw new Error(
            `Response API tidak valid (HTTP ${response.status})`
        );

    }


    console.log(
        "[ACCOUNT VALIDATOR] RESPONSE:",
        response.status,
        data
    );


    // ========================================================
    // ERROR
    // ========================================================

    if (!response.ok) {

        throw new Error(

            data?.message ||

            data?.error ||

            data?.error_code ||

            `HTTP ${response.status}`

        );

    }


    if (
        data?.success === false
    ) {

        throw new Error(

            data?.message ||

            data?.error ||

            "Validasi gagal"

        );

    }


    return data;

}


// ============================================================
// CREATE PANEL
// ============================================================

function createAccountValidator() {


    // Jangan double panel
    if (
        document.getElementById(
            "account-validator-panel"
        )
    ) {

        return;

    }


    const panel =
        document.createElement("div");


    panel.id =
        "account-validator-panel";


    panel.innerHTML = `

        <!-- =================================================
             HEADER
        ================================================= -->

        <div class="av-header">

            <div class="av-header-info">

                <div class="av-title">
                    ACCOUNT VALIDATOR
                </div>

                <div class="av-subtitle">
                    EL-CAMINO BANK VERIFICATION
                </div>

            </div>


            <button
                id="av-close"
                type="button"
            >
                ×
            </button>

        </div>


        <!-- =================================================
             BODY
        ================================================= -->

        <div class="av-body">


            <!-- BANK -->

            <label>
                BANK / E-WALLET
            </label>


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


            <!-- ACCOUNT -->

            <label>
                ACCOUNT NUMBER
            </label>


            <input
                id="av-account"
                type="text"
                inputmode="numeric"
                autocomplete="off"
                placeholder="Masukkan nomor rekening"
            />


            <!-- VALIDATE -->

            <button
                id="av-validate"
                type="button"
            >
                VALIDATE
            </button>


            <!-- RESULT -->

            <div id="av-result">

                <div class="av-result-title">
                    RESULT
                </div>


                <div id="av-status">

                    <div class="av-ready">
                        READY TO VALIDATE
                    </div>

                </div>

            </div>


        </div>

    `;


    document.body.appendChild(
        panel
    );


    // ========================================================
    // ELEMENT
    // ========================================================

    const closeButton =
        document.getElementById(
            "av-close"
        );


    const bankSearch =
        document.getElementById(
            "av-bank-search"
        );


    const bankValue =
        document.getElementById(
            "av-bank-value"
        );


    const bankList =
        document.getElementById(
            "av-bank-list"
        );


    const accountInput =
        document.getElementById(
            "av-account"
        );


    const validateButton =
        document.getElementById(
            "av-validate"
        );


    const statusBox =
        document.getElementById(
            "av-status"
        );


    // ========================================================
    // RENDER BANK LIST
    // ========================================================

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


    // ========================================================
    // BANK SEARCH
    // ========================================================

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


    document.addEventListener(
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


    // ========================================================
    // CLOSE
    // ========================================================

    closeButton.onclick =
        () => {

            panel.remove();

        };


    // ========================================================
    // DRAG PANEL
    // ========================================================

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


    // ========================================================
    // VALIDATE
    // ========================================================

    validateButton.onclick =
        async () => {


            const bankCode =
                bankValue.value;


            const bankName =
                bankSearch.value
                    .trim();


            const accountNumber =
                accountInput.value
                    .trim();


            // ------------------------------------------------
            // CHECK BANK
            // ------------------------------------------------

            if (
                !bankCode
            ) {

                statusBox.innerHTML = `

                    <div class="av-error">
                        ✕ PILIH BANK TERLEBIH DAHULU
                    </div>

                `;

                return;

            }


            // ------------------------------------------------
            // CHECK ACCOUNT
            // ------------------------------------------------

            if (
                !accountNumber
            ) {

                statusBox.innerHTML = `

                    <div class="av-error">
                        ✕ NOMOR REKENING KOSONG
                    </div>

                `;

                accountInput.focus();

                return;

            }


            // ------------------------------------------------
            // LOADING
            // ------------------------------------------------

            validateButton.disabled =
                true;


            validateButton.textContent =
                "CHECKING...";


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


                const result =
                    await validateAccount(
                        bankCode,
                        accountNumber
                    );


                console.log(
                    "[ACCOUNT VALIDATOR] RESULT:",
                    result
                );


                // =================================================
                // ACCOUNT NAME
                // =================================================

                const name =

                    result?.data?.account_name ||

                    result?.data?.nama ||

                    result?.account_name ||

                    result?.nama ||

                    result?.data?.accountName ||

                    result?.accountName;


                // =================================================
                // SUCCESS
                // =================================================

                if (
                    result?.success &&
                    name
                ) {

                    statusBox.innerHTML = `

                        <div class="av-success">

                            <span class="av-success-icon">
                                ✓
                            </span>

                            ACCOUNT VALID

                        </div>


                        <div class="av-name-label">
                            ACCOUNT NAME
                        </div>


                        <div class="av-name">
                            ${avEscape(name)}
                        </div>


                        <div class="av-bank-confirm">

                            ${avEscape(bankName)}

                            <span>•</span>

                            ${avEscape(accountNumber)}

                        </div>

                    `;

                }

                else if (
                    result?.success
                ) {

                    statusBox.innerHTML = `

                        <div class="av-success">

                            ✓ REQUEST SUCCESS

                        </div>


                        <pre class="av-json">${avEscape(
                            JSON.stringify(
                                result,
                                null,
                                2
                            )
                        )}</pre>

                    `;

                }

                else {

                    throw new Error(
                        result?.message ||
                        "Validasi gagal"
                    );

                }


            }


            catch (
                error
            ) {


                console.error(
                    "[ACCOUNT VALIDATOR]",
                    error
                );


                statusBox.innerHTML = `

                    <div class="av-error">

                        ✕ VALIDATION ERROR

                    </div>


                    <div class="av-error-detail">

                        ${avEscape(
                            error.message
                        )}

                    </div>

                `;

            }


            finally {


                validateButton.disabled =
                    false;


                validateButton.textContent =
                    "VALIDATE";

            }

        };


    // ========================================================
    // ENTER = VALIDATE
    // ========================================================

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


    // ========================================================
    // DEFAULT FOCUS
    // ========================================================

    setTimeout(
        () => {

            bankSearch.focus();

        },
        100
    );

}


(function injectAccountValidatorCSS() {

    if (
        document.getElementById(
            "account-validator-style"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "account-validator-style";

    style.textContent = `

        /* ============================================================
           EL CAMINO ACCOUNT VALIDATOR
           DARK / SOLID PREMIUM STYLE
           CSS ONLY
        ============================================================ */


        /* ============================================================
           MAIN PANEL
        ============================================================ */

        #account-validator-panel {

            position: fixed;

            top: 50%;
            left: 50%;

            transform:
                translate(-50%, -50%);

            width: 400px;

            min-width: 340px;

            max-width: 700px;

            min-height: 340px;

            max-height: 85vh;

            resize: both;

            overflow: hidden;

            box-sizing: border-box;

            isolation: isolate;


            background:

                linear-gradient(
                    145deg,

                    #080b16 0%,

                    #0a0d1b 48%,

                    #0d0b1d 100%
                );


            color:
                #f5f7ff;


            font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Arial,
                sans-serif;


            border:
                1px solid
                rgba(112,137,220,.42);


            border-radius:
                16px;


            box-shadow:

                0 18px 45px
                rgba(0,0,0,.72),

                0 0 25px
                rgba(55,75,150,.10),

                inset
                0 1px 0
                rgba(255,255,255,.035);


            z-index:
                999999999;

        }


        /* ============================================================
           VERY SUBTLE BACKGROUND LIGHT
        ============================================================ */

        #account-validator-panel::before {

            content:
                "";

            position:
                absolute;

            inset:
                0;

            border-radius:
                16px;

            pointer-events:
                none;

            z-index:
                0;


            background:

                radial-gradient(
                    circle at 10% 0%,

                    rgba(55,95,190,.09),

                    transparent 32%
                ),

                radial-gradient(
                    circle at 100% 100%,

                    rgba(105,65,180,.07),

                    transparent 35%
                );

        }


        /* ============================================================
           SUBTLE RUNNING LIGHT
        ============================================================ */

        #account-validator-panel::after {

            content:
                "";

            position:
                absolute;

            left:
                0;

            right:
                0;

            bottom:
                0;

            height:
                2px;


            background:

                linear-gradient(
                    90deg,

                    transparent,

                    #527edc,

                    #7264d9,

                    #527edc,

                    transparent
                );


            background-size:
                220% 100%;


            animation:
                avRunningLine
                3.5s linear infinite;


            opacity:
                .65;


            pointer-events:
                none;

            z-index:
                3;

        }


        @keyframes avRunningLine {

            0% {

                background-position:
                    220% 0;

            }

            100% {

                background-position:
                    -220% 0;

            }

        }


        /* ============================================================
           CONTENT ABOVE BACKGROUND
        ============================================================ */

        #account-validator-panel > * {

            position:
                relative;

            z-index:
                2;

        }


        /* ============================================================
           HEADER
        ============================================================ */

        .av-header {

            display:
                flex;

            align-items:
                center;

            justify-content:
                space-between;


            height:
                76px;


            box-sizing:
                border-box;


            padding:
                17px 20px;


            border-bottom:
                1px solid
                rgba(110,130,200,.18);


            cursor:
                move;


            user-select:
                none;


            background:

                linear-gradient(
                    180deg,

                    #0b0f1d,

                    #090c17
                );


            position:
                relative;

            overflow:
                hidden;

        }


        /* ============================================================
           HEADER ACCENT
        ============================================================ */

        .av-header::after {

            content:
                "";

            position:
                absolute;

            left:
                20px;

            right:
                20px;

            bottom:
                0;

            height:
                1px;


            background:

                linear-gradient(
                    90deg,

                    transparent,

                    rgba(88,130,230,.8),

                    rgba(120,95,220,.8),

                    transparent
                );


            box-shadow:

                0 0 6px
                rgba(80,120,230,.25);

        }


        /* ============================================================
           HEADER INFO
        ============================================================ */

        .av-header-info {

            min-width:
                0;

        }


        .av-title {

            font-size:
                18px;

            line-height:
                22px;

            font-weight:
                800;


            letter-spacing:
                .4px;


            color:
                #ffffff;


            white-space:
                nowrap;


            text-shadow:
                0 1px 2px
                rgba(0,0,0,.7);

        }


        .av-subtitle {

            margin-top:
                5px;


            font-size:
                10px;


            line-height:
                13px;


            font-weight:
                600;


            letter-spacing:
                1px;


            color:
                #8998c7;

        }


        /* ============================================================
           CLOSE BUTTON
        ============================================================ */

        #av-close {

            width:
                32px;

            height:
                32px;


            flex-shrink:
                0;


            padding:
                0;


            border:
                1px solid
                rgba(120,140,200,.22);


            border-radius:
                8px;


            background:
                #151a2a;


            color:
                #e9ecf7;


            font-size:
                20px;


            line-height:
                30px;


            font-weight:
                400;


            cursor:
                pointer;


            transition:
                .2s;


            box-shadow:
                inset
                0 1px 0
                rgba(255,255,255,.04);

        }


        #av-close:hover {

            background:
                #20263a;


            border-color:
                rgba(120,155,240,.55);


            color:
                #ffffff;


            box-shadow:
                0 0 12px
                rgba(75,115,220,.18);

        }


        #av-close:active {

            transform:
                scale(.96);

        }


        /* ============================================================
           BODY
        ============================================================ */

        .av-body {

            box-sizing:
                border-box;


            height:
                calc(100% - 76px);


            min-height:
                260px;


            padding:
                22px;


            overflow-y:
                auto;


            scrollbar-width:
                thin;


            scrollbar-color:
                #3d4d78
                transparent;

        }


        .av-body::-webkit-scrollbar {

            width:
                4px;

        }


        .av-body::-webkit-scrollbar-track {

            background:
                transparent;

        }


        .av-body::-webkit-scrollbar-thumb {

            background:
                #3d4d78;

            border-radius:
                10px;

        }


        /* ============================================================
           LABELS
        ============================================================ */

        .av-body label {

            display:
                block;


            margin:
                0 0 8px;


            font-size:
                11px;


            line-height:
                14px;


            font-weight:
                800;


            color:
                #b8c4e8;


            letter-spacing:
                .8px;


            text-transform:
                uppercase;

        }


        /* ============================================================
           BANK PICKER
           FUNCTION TETAP
        ============================================================ */

        .av-bank-picker {

            position:
                relative;

            width:
                100%;

            margin-bottom:
                18px;

        }


        /* ============================================================
           INPUTS
        ============================================================ */

        .av-body input {

            box-sizing:
                border-box;


            width:
                100%;


            height:
                46px;


            padding:
                0 14px;


            border:
                1px solid
                #293450;


            border-radius:
                9px;


            outline:
                none;


            background:
                #0d1220;


            color:
                #f7f9ff;


            font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Arial,
                sans-serif;


            font-size:
                14px;


            font-weight:
                500;


            letter-spacing:
                .15px;


            box-shadow:

                inset
                0 1px 3px
                rgba(0,0,0,.45);


            transition:
                border-color .2s,
                box-shadow .2s,
                background .2s;

        }


        .av-body input::placeholder {

            color:
                #7f8aaa;


            opacity:
                1;

        }


        .av-body input:focus {

            border-color:
                #5877c4;


            background:
                #0f1525;


            box-shadow:

                0 0 0 2px
                rgba(70,105,190,.12),

                inset
                0 1px 3px
                rgba(0,0,0,.5);

        }


        #av-account {

            margin-bottom:
                18px;

        }


        /* ============================================================
           BANK DROPDOWN
           FUNCTION TETAP
        ============================================================ */

        .av-bank-list {

            display:
                none;


            position:
                absolute;


            top:
                calc(100% + 6px);


            left:
                0;


            right:
                0;


            max-height:
                260px;


            overflow-y:
                auto;


            background:
                #0a0f1c;


            border:
                1px solid
                #34415f;


            border-radius:
                9px;


            box-shadow:

                0 18px 35px
                rgba(0,0,0,.75);


            z-index:
                1000;

        }


        .av-bank-list.show {

            display:
                block;

        }


        .av-bank-list::-webkit-scrollbar {

            width:
                4px;

        }


        .av-bank-list::-webkit-scrollbar-track {

            background:
                #080c16;

        }


        .av-bank-list::-webkit-scrollbar-thumb {

            background:
                #3f4f78;


            border-radius:
                10px;

        }


        .av-bank-item {

            display:
                flex;


            align-items:
                center;


            justify-content:
                space-between;


            gap:
                12px;


            min-height:
                44px;


            box-sizing:
                border-box;


            padding:
                10px 13px;


            border-bottom:
                1px solid
                rgba(110,130,180,.10);


            cursor:
                pointer;


            transition:
                background .18s,
                border-color .18s;

        }


        .av-bank-item:last-child {

            border-bottom:
                none;

        }


        .av-bank-item:hover {

            background:
                #151d31;


            box-shadow:
                inset
                2px 0
                #5b7fd3;

        }


        .av-bank-name {

            color:
                #f0f3fb;


            font-size:
                12px;


            font-weight:
                650;


            overflow:
                hidden;


            text-overflow:
                ellipsis;


            white-space:
                nowrap;

        }


        .av-bank-code {

            flex-shrink:
                0;


            color:
                #8999c8;


            font-size:
                10px;


            font-weight:
                600;


            letter-spacing:
                .4px;

        }


        .av-bank-empty {

            padding:
                18px;


            text-align:
                center;


            color:
                #7885a5;


            font-size:
                11px;

        }


        /* ============================================================
           VALIDATE BUTTON
        ============================================================ */

        #av-validate {

            width:
                100%;


            height:
                46px;


            border:
                1px solid
                rgba(100,125,195,.32);


            border-radius:
                9px;


            background:

                linear-gradient(
                    110deg,

                    #253253,

                    #303d66,

                    #34305d
                );


            color:
                #ffffff;


            font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Arial,
                sans-serif;


            font-size:
                13px;


            font-weight:
                800;


            letter-spacing:
                .7px;


            cursor:
                pointer;


            transition:
                .2s;


            box-shadow:

                0 5px 15px
                rgba(0,0,0,.4),

                inset
                0 1px 0
                rgba(255,255,255,.06);

        }


        #av-validate:hover {

            background:

                linear-gradient(
                    110deg,

                    #30446f,

                    #3c4d7a,

                    #403a70
                );


            border-color:
                rgba(110,145,225,.55);


            transform:
                translateY(-1px);


            box-shadow:

                0 8px 18px
                rgba(0,0,0,.45),

                0 0 14px
                rgba(70,110,210,.14);

        }


        #av-validate:active {

            transform:
                translateY(0);

        }


        #av-validate:disabled {

            opacity:
                .5;


            cursor:
                not-allowed;

        }


        /* ============================================================
           RESULT PANEL
        ============================================================ */

        #av-result {

            margin-top:
                18px;


            padding:
                16px;


            border:
                1px solid
                #273451;


            border-radius:
                10px;


            background:
                #0b101c;


            box-sizing:
                border-box;


            box-shadow:

                inset
                0 1px 3px
                rgba(0,0,0,.35);

        }


        .av-result-title {

            margin-bottom:
                10px;


            font-size:
                11px;


            line-height:
                14px;


            font-weight:
                800;


            color:
                #aab7df;


            letter-spacing:
                .8px;


            text-transform:
                uppercase;

        }


        /* ============================================================
           READY
        ============================================================ */

        .av-ready {

            font-size:
                12px;


            line-height:
                18px;


            color:
                #7d8aa8;

        }


        /* ============================================================
           LOADING
        ============================================================ */

        .av-loading {

            display:
                flex;


            align-items:
                center;


            gap:
                8px;


            font-size:
                12px;


            color:
                #b2bad0;

        }


        .av-loading-dot {

            display:
                inline-block;


            color:
                #7193e4;


            animation:
                avPulse
                1s infinite;

        }


        @keyframes avPulse {

            0%,
            100% {
                opacity:
                    .35;
            }

            50% {
                opacity:
                    1;
            }

        }


        /* ============================================================
           SUCCESS
        ============================================================ */

        .av-success {

            display:
                flex;


            align-items:
                center;


            gap:
                7px;


            font-size:
                13px;


            line-height:
                18px;


            font-weight:
                800;


            color:
                #70e3a1;

        }


        .av-success-icon {

            font-size:
                15px;

        }


        .av-name-label {

            margin-top:
                15px;


            font-size:
                10px;


            line-height:
                13px;


            font-weight:
                800;


            color:
                #8795bd;


            letter-spacing:
                .8px;


            text-transform:
                uppercase;

        }


        .av-name {

            margin-top:
                5px;


            font-size:
                17px;


            line-height:
                23px;


            font-weight:
                800;


            color:
                #ffffff;


            word-break:
                break-word;

        }


        .av-bank-confirm {

            display:
                flex;


            gap:
                5px;


            margin-top:
                8px;


            color:
                #7d89a7;


            font-size:
                10px;


            line-height:
                15px;


            word-break:
                break-word;

        }


        /* ============================================================
           ERROR
        ============================================================ */

        .av-error {

            font-size:
                13px;


            line-height:
                18px;


            font-weight:
                800;


            color:
                #ff7474;

        }


        .av-error-detail {

            margin-top:
                7px;


            font-size:
                11px;


            line-height:
                17px;


            color:
                #a1a9ba;


            word-break:
                break-word;

        }


        /* ============================================================
           JSON
        ============================================================ */

        .av-json {

            max-height:
                180px;


            overflow:
                auto;


            margin-top:
                10px;


            padding:
                11px;


            border-radius:
                7px;


            background:
                #070b14;


            border:
                1px solid
                #202b44;


            color:
                #9eadd5;


            font-size:
                10px;


            line-height:
                15px;


            font-family:
                "Cascadia Code",
                "SFMono-Regular",
                Consolas,
                "Courier New",
                monospace;


            white-space:
                pre-wrap;


            word-break:
                break-word;

        }


        .av-json::-webkit-scrollbar {

            width:
                4px;

        }


        .av-json::-webkit-scrollbar-thumb {

            background:
                #3f4f78;


            border-radius:
                10px;

        }


        /* ============================================================
           CSS VARIABLES
        ============================================================ */

        #account-validator-panel {

            --av-blue:
                #7193e4;

            --av-purple:
                #7568c8;

        }


        /* ============================================================
           RESPONSIVE
        ============================================================ */

        @media (max-width: 520px) {

            #account-validator-panel {

                width:
                    calc(100vw - 30px);

            }


            .av-body {

                padding:
                    18px;

            }


            .av-title {

                font-size:
                    16px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

})();

// ============================================================
// ACCOUNT VALIDATOR BUTTON
// OPEN ONLY WHEN BUTTON IS CLICKED
// ============================================================

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


    // Hindari event listener dobel
    if (button.dataset.avBound === "1") {
        return;
    }

    button.dataset.avBound = "1";


    button.addEventListener("click", () => {

        console.log(
            "[ACCOUNT VALIDATOR] Opening..."
        );


        // Kalau panel sudah ada,
        // jangan bikin panel kedua
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


// ============================================================
// WAIT UNTIL MAIN EL-CAMINO UI EXISTS
// ============================================================

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

// =========================
// CLICKSTER CONTROL
// =========================

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

        // RESET CSS BAWAAN WEBSITE
        td.style.setProperty('background', 'rgba(138,130,250,.25)', 'important');
        td.style.setProperty('background-image', 'none', 'important');

        td.style.setProperty('color', '#111', 'important');
        td.style.setProperty('font-weight', '500', 'important');

        td.style.setProperty('text-shadow', 'none', 'important');

        td.style.setProperty('box-shadow', 'none', 'important');

        td.style.setProperty('border-color', 'rgba(0,0,0,.05)', 'important');

        // biar icon / link tetap kebaca
        td.querySelectorAll('*').forEach(el => {
          el.style.setProperty('color', 'inherit', 'important');
          el.style.setProperty('text-shadow', 'none', 'important');
        });

      });


      // paksa row ikut warna
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
