/* 하위 페이지(DH Tutorials, 발표 자료)가 함께 쓰는 공통 동작:
 * 언어 전환, 별 배경, 읽기 진행 표시줄, 연도 표시.
 * 페이지 스크립트는 Page.onLang(render)로 그리기 함수를 등록합니다. */
(function () {
  "use strict";

  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var hooks = [];

  function lang() { return root.getAttribute("lang") === "en" ? "en" : "ko"; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function applyLang(l) {
    root.setAttribute("lang", l);
    $$("[data-set-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-set-lang") === l ? "true" : "false"); });
    hooks.forEach(function (fn) { fn(l); });
  }
  $$("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-set-lang");
      try { localStorage.setItem("cv-lang", l); } catch (e) { /* storage unavailable */ }
      applyLang(l);
    });
  });

  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t1 = Math.imul(a ^ a >>> 15, 1 | a);
      t1 = t1 + Math.imul(t1 ^ t1 >>> 7, 61 | t1) ^ t1;
      return ((t1 ^ t1 >>> 14) >>> 0) / 4294967296;
    };
  }
  function drawStars() {
    var c = $("#stars");
    if (!c || !c.getContext) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1), w = window.innerWidth, h = window.innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    var ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    var rnd = mulberry32(11), n = Math.round(w * h / 7000);
    for (var i = 0; i < n; i++) {
      var x = rnd() * w, y = rnd() * h, r = rnd() < 0.92 ? 0.3 + rnd() * 0.7 : 1 + rnd() * 0.6, a = 0.12 + rnd() * 0.5;
      ctx.fillStyle = rnd() < 0.15 ? "rgba(108,224,240," + a + ")" : "rgba(220,230,255," + a + ")";
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }
  function progress() {
    var bar = $("#progress-bar");
    if (!bar) return;
    var y = window.scrollY || window.pageYOffset, max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
  }

  var year = $("#year-now");
  if (year) year.textContent = new Date().getFullYear();
  drawStars();
  var tmr;
  window.addEventListener("resize", function () { clearTimeout(tmr); tmr = setTimeout(drawStars, 200); progress(); });
  window.addEventListener("scroll", progress, { passive: true });
  applyLang(lang());
  progress();

  window.Page = {
    lang: lang,
    esc: esc,
    /* 그리기 함수를 등록하고 바로 한 번 실행합니다. 언어를 바꿀 때마다 다시 실행됩니다. */
    onLang: function (fn) { hooks.push(fn); fn(lang()); }
  };
})();
