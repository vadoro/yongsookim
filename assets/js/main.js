/* 김용수 · Yongsoo Kim — Network
 * 모든 내용은 assets/js/data.js 의 window.CV 에서 그려집니다.
 * 표지의 연결망은 논문·저서·강연·발표 제목에서 CV.keywords 의 키워드를 찾아 그린 공기어 연결망입니다. */
(function () {
  "use strict";

  var CV = window.CV;
  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  function lang() { return root.getAttribute("lang") === "en" ? "en" : "ko"; }

  /* ---------------------------------------------------------------- strings */
  var T = {
    ko: {
      all: "전체", article: "논문", book: "저서", translation: "역서", review: "서평", conference: "학술 발표", lecture: "강연",
      count: function (n, total) { return "전체 " + total + "건 중 " + n + "건"; },
      sortDesc: "최신순 ↓", sortAsc: "오래된 순 ↑",
      reset: "필터 초기화",
      empty: "조건에 맞는 성과가 없습니다. 필터를 줄이거나 검색어를 바꿔 보세요.",
      yearPill: function (y) { return y + "년 ×"; },
      pill: function (l) { return l + " ×"; },
      kwPill: function (l) { return "키워드: " + l + " ×"; },
      queryPill: function (q) { return "“" + q + "” ×"; },
      items: function (n) { return n + "편"; },
      hintCol: "눌러서 이 해의 성과만 보기", hintColOn: "다시 누르면 모든 연도 보기",
      hintBlock: "눌러서 목록에서 보기",
      annot: function (y) { return y + " · 첫 디지털인문학 논문"; },
      noChart: "역서는 주제 그림에 포함되지 않습니다.",
      chartLabel: "연도별 논문·저서 수를 주제별로 쌓은 막대그래프",
      roles: { "공저": "공저", "단독": "단독", "공역": "공역" },
      by: function (a) { return a + " 지음"; },
      original: "원저",
      lecAll: "전체", keynote: "기조 강연", talk: "주제 발표", lectureType: "특강·강연",
      more: function (n) { return "이전 강연 " + n + "건 더 보기"; }, less: "접기",
      abroad: "해외 발표", session: "Session",
      present: "현재",
      now: function (d) { return "현재 " + d; },
      copied: "복사됨 ✓",
      search: "제목·학술지 검색 (예: Faulkner, 연결망)",
      /* network */
      howKicker: "How to read",
      howTitle: "제목으로 그린 연구 연결망",
      howText: function (n, k, e) {
        return "논문·저서·강연·학술 발표의 제목 " + n + "개에서 키워드 " + k + "개를 찾아, 한 제목에 함께 나온 키워드끼리 이었습니다(선 " + e + "개). " +
          "원의 크기는 그 키워드가 나온 제목 수, 선의 굵기는 함께 나온 횟수입니다. 원을 누르면 관련 연구가 여기에 나타나고, 끌어서 옮길 수도 있습니다.";
      },
      topKw: "자주 나온 키워드",
      titles: function (n) { return "제목 " + n + "개"; },
      coKw: "함께 나온 키워드",
      related: "이 키워드가 나온 제목",
      moreItems: function (n) { return "외 " + n + "건"; },
      toWorks: function (n) { return "연구 성과에서 " + n + "편 보기 →"; },
      clear: "선택 해제",
      caption: function (n, k, e) { return "그림 1 — 제목 " + n + "개 · 키워드 " + k + "개 · 연결 " + e + "개의 공기어 연결망"; },
      graphLabel: "연구 키워드 연결망. 키워드를 선택하면 관련 연구가 표시됩니다."
    },
    en: {
      all: "All", article: "Article", book: "Book", translation: "Translation", review: "Review", conference: "Conference", lecture: "Lecture",
      count: function (n, total) { return n + " of " + total + " entries"; },
      sortDesc: "Newest first ↓", sortAsc: "Oldest first ↑",
      reset: "Clear filters",
      empty: "Nothing matches these filters. Remove a filter or try another search.",
      yearPill: function (y) { return y + " ×"; },
      pill: function (l) { return l + " ×"; },
      kwPill: function (l) { return "Keyword: " + l + " ×"; },
      queryPill: function (q) { return "“" + q + "” ×"; },
      items: function (n) { return n === 1 ? "1 item" : n + " items"; },
      hintCol: "Select to show this year only", hintColOn: "Select again to show all years",
      hintBlock: "Select to find it in the list",
      annot: function (y) { return y + " · first DH article"; },
      noChart: "Translations are not part of the theme figure.",
      chartLabel: "Stacked columns of articles and books per year, by theme",
      roles: { "공저": "co-authored", "단독": "sole author", "공역": "co-translation" },
      by: function (a) { return a; },
      original: "Original",
      lecAll: "All", keynote: "Keynotes", talk: "Panel talks", lectureType: "Lectures",
      more: function (n) { return "Show " + n + " earlier lectures"; }, less: "Show fewer",
      abroad: "Abroad", session: "Session",
      present: "present",
      now: function (d) { return "Now " + d; },
      copied: "Copied ✓",
      search: "Search titles & journals (e.g. Faulkner)",
      howKicker: "How to read",
      howTitle: "A network drawn from titles",
      howText: function (n, k, e) {
        return "Keywords (" + k + ") were found in " + n + " titles of articles, books, lectures, and conference papers, and linked whenever two appear in the same title (" + e + " links). " +
          "Circle size is the number of titles with that keyword; line width is how often two keywords appear together. Select a circle to list related work here, or drag it to rearrange.";
      },
      topKw: "Most frequent keywords",
      titles: function (n) { return n === 1 ? "1 title" : n + " titles"; },
      coKw: "Appears together with",
      related: "Titles with this keyword",
      moreItems: function (n) { return "and " + n + " more"; },
      toWorks: function (n) { return "Show " + n + " in Publications →"; },
      clear: "Clear",
      caption: function (n, k, e) { return "Fig. 1 — Co-occurrence network of " + k + " keywords in " + n + " titles (" + e + " links)"; },
      graphLabel: "Network of research keywords. Select a keyword to list related work."
    }
  };
  function t(key) {
    var v = T[lang()][key];
    if (typeof v === "function") return v.apply(null, Array.prototype.slice.call(arguments, 1));
    return v;
  }

  /* ---------------------------------------------------------------- helpers */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  /* q: 문자열 또는 문자열 배열. 일치하는 부분을 <mark>로 감쌉니다 */
  function highlight(s, q) {
    var list = (Array.isArray(q) ? q : [q]).filter(function (x) { return x && String(x).trim(); });
    if (!list.length) return esc(s);
    var re = new RegExp(list.map(function (x) { return reEsc(String(x).trim()); }).join("|"), "gi"), out = "", last = 0, m;
    while ((m = re.exec(s))) {
      out += esc(s.slice(last, m.index)) + "<mark>" + esc(m[0]) + "</mark>";
      last = m.index + m[0].length;
      if (!m[0].length) re.lastIndex++;
    }
    return out + esc(s.slice(last));
  }
  function rich(text, q) {
    return String(text || "").split("*").map(function (part, i) {
      var h = highlight(part, q);
      return i % 2 ? "<em>" + h + "</em>" : h;
    }).join("");
  }
  function plain(s) { return String(s || "").replace(/\*/g, ""); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function svgEl(name, attrs, parent) {
    var el = document.createElementNS(SVGNS, name);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(el);
    return el;
  }
  function scrollToEl(el, block) {
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: block || "start" });
  }

  var NOW = new Date();
  var NOW_Y = NOW.getFullYear();
  var NOW_M = NOW.getMonth() + 1;
  var NOW_DEC = NOW_Y + (NOW_M - 0.5) / 12;
  function parseStart(s) { var p = String(s).split("."); return +p[0] + (p[1] ? (+p[1] - 1) / 12 : 0); }
  function parseEnd(s) {
    if (!s) return NOW_DEC;
    var p = String(s).split(".");
    return +p[0] + (p[1] ? +p[1] / 12 : 0.5);
  }

  /* ---------------------------------------------------------------- derived data */
  var THEME_ORDER = ["theory", "amlit", "film", "dh"];   // 차트 쌓는 순서 (아래 → 위)
  var THEME_KEYS = ["dh", "theory", "amlit", "film"];
  function themeLabel(k) { return CV.themes[k][lang()]; }
  function primary(p) { return p.themes[0]; }

  var PUBS = [];
  CV.articles.forEach(function (a) { PUBS.push(Object.assign({}, a, { cat: "article", kind: a.review ? "review" : "article" })); });
  CV.books.forEach(function (b) { PUBS.push(Object.assign({}, b, { cat: "book", kind: "book" })); });
  CV.translations.forEach(function (b) { PUBS.push(Object.assign({}, b, { cat: "translation", kind: "translation" })); });
  PUBS.forEach(function (p, i) {
    p.id = "pub-" + i;
    p.search = [plain(p.title), p.venue, p.detail, p.publisher, plain(p.original), p.author, p.year, p.doi]
      .filter(Boolean).join(" ").toLowerCase();
  });

  var firstHallym = Math.min.apply(null, CV.career.map(function (c) { return Math.floor(parseStart(c.start)); }));
  var STATS = {
    articles: CV.articles.length,
    books: CV.books.length,
    translations: CV.translations.length,
    lectures: CV.lectures.length,
    conferences: CV.conferences.length,
    years: NOW_Y - firstHallym
  };

  /* keyword network: corpus = titles of articles, books, conference papers, lectures */
  var KW = (CV.keywords || []).map(function (k, i) { return Object.assign({ id: i, freq: 0, nb: {} }, k); });
  function kwOf(title) {
    var s = plain(title);
    return KW.filter(function (k) { return k.match.some(function (m) { return s.indexOf(m) >= 0; }); }).map(function (k) { return k.id; });
  }
  var CORPUS = [];
  PUBS.forEach(function (p) {
    p.kws = kwOf(p.title);
    if (p.cat !== "translation") CORPUS.push({ kind: p.kind, year: p.year, title: p.title, pub: p, kws: p.kws });
  });
  CV.conferences.forEach(function (c) { CORPUS.push({ kind: "conference", year: +c.date.slice(0, 4), title: c.title, kws: kwOf(c.title) }); });
  CV.lectures.forEach(function (l) { var ti = l.title || l.label; CORPUS.push({ kind: "lecture", year: l.year, title: ti, kws: kwOf(ti) }); });
  var EDGES = {};
  CORPUS.forEach(function (it) {
    it.kws.forEach(function (a, i) {
      KW[a].freq++;
      it.kws.slice(i + 1).forEach(function (b) {
        var key = Math.min(a, b) + "-" + Math.max(a, b);
        EDGES[key] = (EDGES[key] || 0) + 1;
        KW[a].nb[b] = (KW[a].nb[b] || 0) + 1;
        KW[b].nb[a] = (KW[b].nb[a] || 0) + 1;
      });
    });
  });
  var NODES = KW.filter(function (k) { return k.freq > 0; });
  var LINKS = Object.keys(EDGES).map(function (key) {
    var ab = key.split("-");
    return { a: KW[+ab[0]], b: KW[+ab[1]], w: EDGES[key] };
  });
  var MAXF = Math.max.apply(null, NODES.map(function (n) { return n.freq; }));

  /* ---------------------------------------------------------------- state */
  var state = { theme: null, type: "all", year: null, q: "", kw: null, sort: "desc", lecType: "all", lecExpanded: false, sel: null };

  /* ================================================================ chrome */
  function setStats() {
    $$("[data-count]").forEach(function (el) { el.textContent = STATS[el.getAttribute("data-count")]; });
    $("#year-now").textContent = NOW_Y;
  }
  function countUp() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = STATS[el.getAttribute("data-count")], t0 = performance.now(), dur = 1300;
        (function step(now) {
          var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(to * e);
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    $$(".stat [data-count]").forEach(function (el) { io.observe(el); });
  }

  function applyLang(l) {
    root.setAttribute("lang", l);
    $$("[data-set-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-set-lang") === l ? "true" : "false"); });
    $("#pub-search").setAttribute("placeholder", t("search"));
    renderGraph();
    renderInspector();
    renderFieldChips();
    renderChrono();
    renderAwards();
    renderPubFilters();
    renderPubs();
    renderLectures();
    renderConferences();
  }
  function initLang() {
    $$("[data-set-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-set-lang");
        store.set("cv-lang", l);
        applyLang(l);
      });
    });
  }

  /* nav highlight + progress */
  function initScroll() {
    var secs = $$("main .section[id]");
    var links = $$("[data-nav]");
    var ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      $("#progress-bar").style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      var line = window.innerHeight * 0.35, cur = null;
      secs.forEach(function (s) { if (s.getBoundingClientRect().top < line) cur = s.id; });
      links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-nav") === cur); });
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* star field */
  function drawStars() {
    var c = $("#stars");
    if (!c || !c.getContext) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = window.innerWidth, h = window.innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    var ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    var rnd = mulberry32(11), n = Math.round(w * h / 7000);
    for (var i = 0; i < n; i++) {
      var x = rnd() * w, y = rnd() * h, r = rnd() < 0.92 ? 0.3 + rnd() * 0.7 : 1 + rnd() * 0.6;
      var a = 0.12 + rnd() * 0.5;
      ctx.fillStyle = rnd() < 0.15 ? "rgba(108,224,240," + a + ")" : "rgba(220,230,255," + a + ")";
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t1 = Math.imul(a ^ a >>> 15, 1 | a);
      t1 = t1 + Math.imul(t1 ^ t1 >>> 7, 61 | t1) ^ t1;
      return ((t1 ^ t1 >>> 14) >>> 0) / 4294967296;
    };
  }

  function initCopy() {
    var btn = $("#copy-email");
    var original = btn.innerHTML;
    btn.addEventListener("click", function () {
      function done() {
        btn.textContent = t("copied");
        btn.classList.add("is-done");
        setTimeout(function () { btn.innerHTML = original; btn.classList.remove("is-done"); }, 2000);
      }
      function fallback() {
        var r = document.createRange();
        r.selectNodeContents($("#email-text"));
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CV.person.email).then(done, fallback);
      else fallback();
    });
  }
  function initPrint() {
    var btn = $("#print-btn");
    var embedded = false;
    try { embedded = window.self !== window.top; } catch (e) { embedded = true; }
    if (embedded || !window.print) { btn.hidden = true; return; }
    btn.addEventListener("click", function () { window.print(); });
  }

  /* ================================================================ keyword network */
  var G = { W: 0, H: 0, svg: null, laidOut: false, drag: null, hover: null };

  function nodeR(n) { return (G.W < 560 ? 4 : 5) + (G.W < 560 ? 10 : 13) * Math.sqrt(n.freq / MAXF); }
  function nodeFont(n) { return (G.W < 560 ? 10.5 : 11) + (G.W < 560 ? 3.5 : 5) * Math.sqrt(n.freq / MAXF); }
  function nodeLabel(n) { return n[lang()]; }
  function labelWidth(n) {
    var s = nodeLabel(n), f = nodeFont(n), w = 0;
    for (var i = 0; i < s.length; i++) w += /[ㄱ-힝]/.test(s[i]) ? f * 0.98 : f * 0.56;
    return w;
  }

  /* d3-style simulation: inverse-distance charge, springs with a rest length,
     a pull toward the centre (weaker along x), and label-aware collision.
     A fixed seed keeps the map the same on every visit. */
  function layout(W, H) {
    var rnd = mulberry32(7);
    var cx = W / 2, cy = H / 2;
    var tall = H > W * 1.05;
    var ang = tall ? { dh: Math.PI * 0.5, film: Math.PI * 1.15, theory: -Math.PI * 0.5, amlit: 0 }
                   : { dh: 0, film: Math.PI * 0.62, theory: Math.PI, amlit: -Math.PI * 0.5 };
    NODES.forEach(function (n) {
      var a = ang[n.group] + (rnd() - 0.5) * 1.1, d = Math.min(W, H) * (0.1 + rnd() * 0.2);
      n.x = cx + Math.cos(a) * d * (tall ? 1 : 1.3); n.y = cy + Math.sin(a) * d * (tall ? 1.3 : 1);
      n.vx = 0; n.vy = 0; n.r = nodeR(n);
      n.deg = Object.keys(n.nb).length;
    });
    var area = W * H;
    G.charge = -Math.max(60, area * 0.00055);
    G.linkLen = Math.max(34, Math.sqrt(area) / 9);
    var alpha = 1;
    for (var it = 0; it < 340; it++) {
      step(alpha, null);
      alpha += (0.001 - alpha) * 0.0228;
    }
    for (var k = 0; k < 4; k++) labelPass();
  }
  function step(alpha, fixed) {
    var i, j, a, b, dx, dy, d2, d, f;
    for (i = 0; i < NODES.length; i++) {
      a = NODES[i];
      for (j = i + 1; j < NODES.length; j++) {
        b = NODES[j];
        dx = b.x - a.x; dy = b.y - a.y; d2 = dx * dx + dy * dy || 1;
        f = G.charge * alpha / d2;
        a.vx += dx * f; a.vy += dy * f;
        b.vx -= dx * f; b.vy -= dy * f;
      }
    }
    LINKS.forEach(function (l) {
      a = l.a; b = l.b;
      dx = b.x + b.vx - a.x - a.vx; dy = b.y + b.vy - a.y - a.vy;
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      var len = G.linkLen * (1.15 - 0.12 * Math.min(4, l.w)) + (a.r + b.r) * 0.6;
      var s = 1 / Math.min(a.deg, b.deg);
      f = (d - len) / d * alpha * s * 0.9;
      dx *= f; dy *= f;
      var bias = a.deg / (a.deg + b.deg);
      b.vx -= dx * bias; b.vy -= dy * bias;
      a.vx += dx * (1 - bias); a.vy += dy * (1 - bias);
    });
    var cx = G.W / 2, cy = G.H / 2, wide = G.W > G.H;
    var sx = wide ? 0.032 : 0.07, sy = wide ? 0.036 : 0.03;
    NODES.forEach(function (n) {
      n.vx += (cx - n.x) * sx * alpha;
      n.vy += (cy - n.y) * sy * alpha;
    });
    for (i = 0; i < NODES.length; i++) {
      a = NODES[i];
      for (j = i + 1; j < NODES.length; j++) {
        b = NODES[j];
        dx = b.x + b.vx - a.x - a.vx; dy = b.y + b.vy - a.y - a.vy;
        d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        var min = a.r + b.r + 14;
        if (d < min) {
          f = (min - d) / d * 0.5;
          b.vx += dx * f; b.vy += dy * f;
          a.vx -= dx * f; a.vy -= dy * f;
        }
      }
    }
    NODES.forEach(function (n) {
      if (n === fixed) { n.vx = n.vy = 0; return; }
      n.vx *= 0.6; n.vy *= 0.6;
      n.x += n.vx; n.y += n.vy;
      clampNode(n);
    });
  }
  /* keep labels from sitting on top of each other: nudge nodes apart vertically */
  function labelBox(n) {
    var lw = labelWidth(n), left = n.x + n.r + 6 + lw > G.W - 4;
    var x0 = left ? n.x - n.r - 6 - lw : n.x - n.r, x1 = left ? n.x + n.r : n.x + n.r + 6 + lw;
    return { x0: x0, x1: x1, h: nodeFont(n) + 4 };
  }
  function labelPass() {
    for (var i = 0; i < NODES.length; i++) {
      for (var j = i + 1; j < NODES.length; j++) {
        var a = NODES[i], b = NODES[j], A = labelBox(a), B = labelBox(b);
        if (A.x1 < B.x0 || B.x1 < A.x0) continue;
        var need = Math.max(A.h, B.h, a.r + b.r + 4), dy = b.y - a.y;
        if (Math.abs(dy) < need) {
          var push = (need - Math.abs(dy)) / 2 * (dy >= 0 ? 1 : -1);
          a.y -= push; b.y += push;
          clampNode(a); clampNode(b);
        }
      }
    }
  }
  function clampNode(n) {
    var m = n.r + 8;
    n.x = Math.max(m, Math.min(G.W - m, n.x));
    n.y = Math.max(m + 4, Math.min(G.H - m - 4, n.y));
  }

  function neighborsOf(id) { return Object.keys(KW[id].nb).map(Number); }

  function renderGraph() {
    var wrap = $("#graph");
    var W = wrap.clientWidth, H = wrap.clientHeight;
    if (!W || !H) return;
    if (!G.laidOut || Math.abs(W - G.W) > 2 || Math.abs(H - G.H) > 2) {
      G.W = W; G.H = H;
      layout(W, H);
      G.laidOut = true;
    }
    var narrow = W < 560;
    var old = $("svg", wrap);
    if (old) old.remove();
    var svg = svgEl("svg", { "class": "graph-svg", viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "group", "aria-label": t("graphLabel") });
    wrap.insertBefore(svg, $("#graph-tip"));
    G.svg = svg;
    var defs = svgEl("defs", {}, svg);
    var flt = svgEl("filter", { id: "glow", x: "-150%", y: "-150%", width: "400%", height: "400%" }, defs);
    svgEl("feGaussianBlur", { stdDeviation: "6" }, flt);

    var eg = svgEl("g", { "class": "edges", "aria-hidden": "true" }, svg);
    LINKS.forEach(function (l) {
      l.el = svgEl("line", { "class": "edge", "stroke-width": (0.6 + 0.7 * Math.log(1 + l.w) * 1.4).toFixed(2), "stroke-opacity": Math.min(0.9, 0.35 + 0.12 * l.w).toFixed(2) }, eg);
    });
    var ng = svgEl("g", { "class": "nodes" }, svg);
    NODES.slice().sort(function (a, b) { return a.freq - b.freq; }).forEach(function (n, i) {
      var g = svgEl("g", {
        "class": "node" + (n.freq < 3 ? " is-minor" : "") + (narrow && n.freq < 4 ? " label-hidden" : ""),
        tabindex: "0", role: "button", "data-id": n.id,
        "aria-label": nodeLabel(n) + ", " + t("titles", n.freq)
      }, ng);
      var body = svgEl("g", { "class": "node-body", style: "--i:" + (NODES.length - i) }, g);
      svgEl("circle", { "class": "halo th-" + n.group, r: (n.r * 1.9).toFixed(1), filter: "url(#glow)" }, body);
      svgEl("circle", { "class": "ring", r: (n.r + 5).toFixed(1) }, body);
      svgEl("circle", { "class": "core th-" + n.group, r: n.r.toFixed(1) }, body);
      var tx = svgEl("text", { "font-size": nodeFont(n).toFixed(1) }, body);
      tx.textContent = nodeLabel(n);
      n.el = g; n.text = tx;
    });
    placeGraph();
    bindGraph(svg);
    applyFocus();
    var n = CORPUS.length, k = NODES.length, e = LINKS.length;
    $("#graph-caption").textContent = t("caption", n, k, e);
  }

  function placeGraph() {
    LINKS.forEach(function (l) {
      l.el.setAttribute("x1", l.a.x.toFixed(1)); l.el.setAttribute("y1", l.a.y.toFixed(1));
      l.el.setAttribute("x2", l.b.x.toFixed(1)); l.el.setAttribute("y2", l.b.y.toFixed(1));
    });
    NODES.forEach(function (n) {
      n.el.setAttribute("transform", "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")");
      var lw = labelWidth(n), left = n.x + n.r + 6 + lw > G.W - 4;
      n.text.setAttribute("x", left ? -(n.r + 6) : n.r + 6);
      n.text.setAttribute("y", (nodeFont(n) * 0.36).toFixed(1));
      n.text.setAttribute("text-anchor", left ? "end" : "start");
    });
  }

  function applyFocus() {
    if (!G.svg) return;
    var focus = G.hover != null ? G.hover : state.sel;
    G.svg.classList.toggle("has-focus", focus != null);
    var hi = {};
    if (focus != null) { hi[focus] = true; neighborsOf(focus).forEach(function (id) { hi[id] = true; }); }
    NODES.forEach(function (n) {
      n.el.classList.toggle("is-hi", !!hi[n.id]);
      n.el.classList.toggle("is-selected", state.sel === n.id);
      n.el.setAttribute("aria-pressed", state.sel === n.id ? "true" : "false");
    });
    LINKS.forEach(function (l) { l.el.classList.toggle("is-hi", focus != null && (l.a.id === focus || l.b.id === focus)); });
  }

  function showTip(n) {
    var tip = $("#graph-tip");
    tip.innerHTML = "<b>" + esc(nodeLabel(n)) + "</b><span>" + esc(t("titles", n.freq)) + "</span>";
    tip.classList.add("is-on");
    var w = tip.offsetWidth;
    tip.style.left = Math.max(0, Math.min(G.W - w, n.x - w / 2)) + "px";
    tip.style.top = Math.max(0, n.y - n.r - 34) + "px";
  }
  function hideTip() { $("#graph-tip").classList.remove("is-on"); }

  function selectKw(id, opts) {
    state.sel = id;
    applyFocus();
    renderInspector();
    if (opts && opts.scroll) scrollToEl($("#inspector"), "nearest");
  }

  function bindGraph(svg) {
    function toLocal(ev) {
      var r = svg.getBoundingClientRect();
      return { x: (ev.clientX - r.left) * G.W / r.width, y: (ev.clientY - r.top) * G.H / r.height };
    }
    function nodeFrom(ev) {
      var g = ev.target.closest && ev.target.closest(".node");
      return g ? KW[+g.getAttribute("data-id")] : null;
    }
    svg.addEventListener("pointerover", function (ev) {
      var n = nodeFrom(ev);
      if (!n || G.drag) return;
      G.hover = n.id; applyFocus(); showTip(n);
    });
    svg.addEventListener("pointerout", function (ev) {
      var n = nodeFrom(ev);
      if (!n || G.drag) return;
      var to = ev.relatedTarget && ev.relatedTarget.closest && ev.relatedTarget.closest(".node");
      if (to === n.el) return;
      G.hover = null; applyFocus(); hideTip();
    });
    svg.addEventListener("pointerdown", function (ev) {
      var n = nodeFrom(ev);
      if (!n) { G.bgDown = { x: ev.clientX, y: ev.clientY }; return; }
      ev.preventDefault();
      var p = toLocal(ev);
      G.drag = { n: n, ox: n.x - p.x, oy: n.y - p.y, sx: ev.clientX, sy: ev.clientY, moved: false, id: ev.pointerId };
      try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
    });
    svg.addEventListener("pointermove", function (ev) {
      var d = G.drag;
      if (!d) return;
      if (!d.moved && Math.abs(ev.clientX - d.sx) + Math.abs(ev.clientY - d.sy) < 5) return;
      if (!d.moved) { d.moved = true; svg.classList.add("is-dragging"); hideTip(); startSim(); }
      var p = toLocal(ev);
      d.n.x = p.x + d.ox; d.n.y = p.y + d.oy;
      clampNode(d.n);
    });
    function end(ev) {
      var bg = G.bgDown;
      G.bgDown = null;
      if (bg && !G.drag && Math.abs(ev.clientX - bg.x) + Math.abs(ev.clientY - bg.y) < 5 && state.sel != null) { selectKw(null); return; }
      var d = G.drag;
      if (!d) return;
      G.drag = null;
      svg.classList.remove("is-dragging");
      if (!d.moved) {
        selectKw(state.sel === d.n.id ? null : d.n.id);
      } else {
        G.alpha = 0.25;
      }
      if (ev.type === "pointercancel") G.hover = null;
      applyFocus();
    }
    svg.addEventListener("pointerup", end);
    svg.addEventListener("pointercancel", end);
    $$(".node", svg).forEach(function (g) {
      var n = KW[+g.getAttribute("data-id")];
      g.addEventListener("focus", function () { G.hover = n.id; applyFocus(); showTip(n); });
      g.addEventListener("blur", function () { G.hover = null; applyFocus(); hideTip(); });
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectKw(state.sel === n.id ? null : n.id, { scroll: window.innerWidth < 1024 }); }
        if (ev.key === "Escape") { selectKw(null); }
      });
    });
  }

  var simRaf = 0;
  function startSim() {
    if (simRaf) return;
    G.alpha = 0.3;
    (function frame() {
      var fixed = G.drag ? G.drag.n : null;
      if (G.drag) G.alpha = Math.max(G.alpha, 0.12);
      step(G.alpha, fixed);
      G.alpha += (0 - G.alpha) * 0.04;
      if (!G.drag && G.alpha < 0.02) labelPass();
      placeGraph();
      if (G.drag || G.alpha > 0.01) simRaf = requestAnimationFrame(frame);
      else simRaf = 0;
    })();
  }

  /* inspector */
  function kindLabel(k) { return t(k === "lecture" ? "lecture" : k); }
  function renderInspector() {
    var box = $("#inspector");
    var legend = '<div class="insp-legend">' + THEME_KEYS.map(function (k) {
      return '<span><i class="dot ' + k + '"></i>' + esc(themeLabel(k)) + "</span>";
    }).join("") + "</div>";
    if (state.sel == null) {
      var top = NODES.slice().sort(function (a, b) { return b.freq - a.freq; }).slice(0, 8);
      box.innerHTML =
        '<div class="insp-kicker"><span class="label">' + esc(t("howKicker")) + "</span></div>" +
        '<h3 class="insp-title">' + esc(t("howTitle")) + "</h3>" +
        '<p class="insp-text" style="margin-top:.5rem">' + esc(t("howText", CORPUS.length, NODES.length, LINKS.length)) + "</p>" +
        legend +
        '<div class="insp-section"><span class="label">' + esc(t("topKw")) + '</span><div class="insp-chips">' +
        top.map(function (n) {
          return '<button type="button" class="chip small" data-kw="' + n.id + '"><i class="dot ' + n.group + '"></i>' + esc(nodeLabel(n)) + ' <span class="count">' + n.freq + "</span></button>";
        }).join("") + "</div></div>";
    } else {
      var n = KW[state.sel];
      var nbs = neighborsOf(n.id).sort(function (a, b) { return n.nb[b] - n.nb[a] || KW[b].freq - KW[a].freq; }).slice(0, 8);
      var items = CORPUS.filter(function (it) { return it.kws.indexOf(n.id) >= 0; }).sort(function (a, b) { return b.year - a.year; });
      var pubCount = PUBS.filter(function (p) { return p.kws.indexOf(n.id) >= 0; }).length;
      var shown = items.slice(0, 5);
      box.innerHTML =
        '<div class="insp-kicker"><span class="label"><i class="dot ' + n.group + '" style="margin-right:.45em;vertical-align:1px"></i>' + esc(themeLabel(n.group)) + '</span><span class="label">' + esc(t("titles", n.freq)) + "</span></div>" +
        '<h3 class="insp-title">' + esc(n.ko) + (n.en !== n.ko ? " <em>" + esc(n.en) + "</em>" : "") + "</h3>" +
        (nbs.length ? '<div class="insp-section"><span class="label">' + esc(t("coKw")) + '</span><div class="insp-chips">' +
          nbs.map(function (id) {
            var m = KW[id];
            return '<button type="button" class="chip small" data-kw="' + id + '"><i class="dot ' + m.group + '"></i>' + esc(nodeLabel(m)) + ' <span class="count">' + n.nb[id] + "</span></button>";
          }).join("") + "</div></div>" : "") +
        '<div class="insp-section"><span class="label">' + esc(t("related")) + '</span><ol class="insp-list">' +
        shown.map(function (it) {
          return '<li><span class="y">' + it.year + '</span><span><span class="k">' + esc(kindLabel(it.kind)) + "</span>" + rich(it.title, n.match) + "</span></li>";
        }).join("") + "</ol>" +
        (items.length > shown.length ? '<p class="insp-more">' + esc(t("moreItems", items.length - shown.length)) + "</p>" : "") + "</div>" +
        '<div class="insp-actions">' +
        (pubCount ? '<button type="button" class="btn" data-act="works">' + esc(t("toWorks", pubCount)) + "</button>" : "") +
        '<button type="button" class="btn ghost" data-act="clear">' + esc(t("clear")) + "</button></div>";
    }
    $$("[data-kw]", box).forEach(function (b) {
      b.addEventListener("click", function () { selectKw(+b.getAttribute("data-kw")); });
    });
    var w = $('[data-act="works"]', box);
    if (w) w.addEventListener("click", function () {
      state.kw = state.sel; state.theme = null; state.type = "all"; state.year = null; state.q = ""; $("#pub-search").value = "";
      renderPubFilters(); renderPubs();
      scrollToEl($("#works"));
    });
    var c = $('[data-act="clear"]', box);
    if (c) c.addEventListener("click", function () { selectKw(null); });
  }

  function initGraphResize() {
    var wrap = $("#graph"), raf = 0;
    function check() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        if (Math.abs(wrap.clientWidth - G.W) > 2 || Math.abs(wrap.clientHeight - G.H) > 2) renderGraph();
      });
    }
    if ("ResizeObserver" in window) new ResizeObserver(check).observe(wrap);
    else window.addEventListener("resize", check);
  }

  /* ================================================================ about: field chips */
  function renderFieldChips() {
    var box = $("#field-chips");
    box.innerHTML = ["amlit", "film", "theory", "dh"].map(function (k) {
      return '<button type="button" class="chip small" data-jump-theme="' + k + '"><i class="dot ' + k + '"></i>' + esc(themeLabel(k)) + "</button>";
    }).join("");
    $$("[data-jump-theme]", box).forEach(function (b) {
      b.addEventListener("click", function () {
        state.theme = b.getAttribute("data-jump-theme");
        state.type = "all"; state.year = null; state.q = ""; state.kw = null; $("#pub-search").value = "";
        renderPubFilters(); renderPubs();
        scrollToEl($("#works"));
      });
    });
  }

  /* ================================================================ timeline */
  function rangeText(item) { return item.start + " – " + (item.end || t("present")); }
  function renderChrono() {
    var el = $("#chrono");
    /* 2000년 이전은 축소: 트랙의 SPLIT%만 1986–2000에 쓰고 나머지를 2000–현재에 씁니다 */
    var MIN = 1986, BREAK = 2000, SPLIT = 14;
    var MAX = Math.max(NOW_DEC + 0.7, 2027.5);
    function pos(y) {
      return y <= BREAK ? (y - MIN) / (BREAK - MIN) * SPLIT
                        : SPLIT + (y - BREAK) / (MAX - BREAK) * (100 - SPLIT);
    }
    function pct(y) { return pos(y).toFixed(3) + "%"; }
    function span(s, e) { return (pos(e) - pos(s)).toFixed(3) + "%"; }
    var ticks = [1990, BREAK];
    for (var y = BREAK + 5; y < MAX; y += 5) ticks.push(y);
    var minor = [];
    for (var my = BREAK + 1; my < MAX; my++) if (my % 5) minor.push(my);

    var gridHtml = '<div class="chrono-grid" aria-hidden="true">' +
      '<span class="zone-compressed" style="width:' + SPLIT + '%"></span>' +
      minor.map(function (v) { return '<span class="tick minor" style="left:' + pct(v) + '"></span>'; }).join("") +
      ticks.map(function (v) { return '<span class="tick ' + (v === BREAK ? "break" : "major") + '" style="left:' + pct(v) + '"></span>'; }).join("") +
      '<span class="now-line" style="left:' + pct(NOW_DEC) + '"></span>' +
      '<span class="now-label" style="left:' + pct(NOW_DEC) + '">' + esc(t("now", NOW_Y + "." + pad2(NOW_M))) + "</span></div>";
    function axis(cls) {
      return '<div class="chrono-axis ' + cls + '" aria-hidden="true"><span></span><div class="axis-track">' +
        ticks.map(function (v) { return '<span style="left:' + pct(v) + (cls === "top" ? ";bottom:0" : ";top:0.2rem") + '">' + v + "</span>"; }).join("") +
        '<i class="span-mark"></i></div></div>';
    }
    var groups = [
      { ko: "학력", en: "Education", items: CV.education },
      { ko: "경력", en: "Appointments", items: CV.career },
      { ko: "학회", en: "Professional Service", items: CV.societies }
    ];
    var rows = groups.map(function (g) {
      var items = g.items.slice().sort(function (a, b) { return parseStart(a.start) - parseStart(b.start); });
      return '<div class="chrono-group-head"><h3>' + esc(g.ko) + " <em>" + esc(g.en) + "</em></h3></div>" +
        items.map(function (it) {
          var s = parseStart(it.start), e = parseEnd(it.end), current = !it.end;
          return '<div class="chrono-row" tabindex="0" data-s="' + s + '" data-e="' + e + '" aria-label="' + esc(it.ko + ", " + rangeText(it)) + '">' +
            '<div class="chrono-label"><strong>' + esc(it.ko) + (it.degree ? '<span class="deg">' + esc(it.degree) + "</span>" : "") + "</strong>" +
            '<span class="when">' + esc(rangeText(it)) + "</span></div>" +
            '<div class="chrono-track" aria-hidden="true"><span class="chrono-bar' + (current ? " is-current" : "") + '" style="left:' + pct(s) + ";width:" + span(s, e) + '"></span></div></div>';
        }).join("");
    }).join("");
    el.innerHTML = gridHtml + axis("top") + rows + axis("bottom");

    var marks = $$(".span-mark", el);
    function show(row) {
      var s = +row.getAttribute("data-s"), e = +row.getAttribute("data-e");
      marks.forEach(function (m) { m.style.left = pct(s); m.style.width = span(s, e); m.classList.add("is-on"); });
    }
    function hide() { marks.forEach(function (m) { m.classList.remove("is-on"); }); }
    $$(".chrono-row", el).forEach(function (row) {
      row.addEventListener("mouseenter", function () { show(row); });
      row.addEventListener("focus", function () { show(row); });
      row.addEventListener("mouseleave", hide);
      row.addEventListener("blur", hide);
    });
  }

  /* ================================================================ awards */
  function renderAwards() {
    $("#awards-list").innerHTML = CV.awards.map(function (a) {
      return '<li class="award"><span class="award-year">' + esc(a.year) + "</span>" +
        '<span class="award-name">' + esc(a.ko) + "</span>" +
        (a.note ? '<span class="award-note">' + esc(a.note) + "</span>" : "") +
        '<span class="award-org">' + esc(a.org) + "</span></li>";
    }).join("");
  }

  /* ================================================================ works */
  function matches(p, opts) {
    opts = opts || {};
    if (state.type !== "all" && p.cat !== state.type) return false;
    if (state.theme && p.themes.indexOf(state.theme) < 0) return false;
    if (state.kw != null && p.kws.indexOf(state.kw) < 0) return false;
    if (!opts.ignoreYear && state.year && p.year !== state.year) return false;
    var q = state.q.trim().toLowerCase();
    if (q && p.search.indexOf(q) < 0) return false;
    return true;
  }

  function renderPubFilters() {
    var themeBox = $("#theme-filters"), typeBox = $("#type-filters");
    $$(".chip", themeBox).forEach(function (c) { c.remove(); });
    $$(".chip", typeBox).forEach(function (c) { c.remove(); });
    THEME_KEYS.forEach(function (k) {
      var n = PUBS.filter(function (p) { return p.themes.indexOf(k) >= 0; }).length;
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip";
      b.setAttribute("aria-pressed", state.theme === k ? "true" : "false");
      b.innerHTML = '<i class="dot ' + k + '"></i>' + esc(themeLabel(k)) + ' <span class="count">' + n + "</span>";
      b.addEventListener("click", function () { state.theme = state.theme === k ? null : k; renderPubFilters(); renderPubs(); });
      themeBox.appendChild(b);
    });
    [["all", PUBS.length], ["article", STATS.articles], ["book", STATS.books], ["translation", STATS.translations]].forEach(function (pair) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip";
      b.setAttribute("aria-pressed", state.type === pair[0] ? "true" : "false");
      b.innerHTML = esc(t(pair[0])) + ' <span class="count">' + pair[1] + "</span>";
      b.addEventListener("click", function () { state.type = pair[0]; renderPubFilters(); renderPubs(); });
      typeBox.appendChild(b);
    });
  }

  function pubHTML(p, marks) {
    var themes = p.themes.map(function (k) {
      return '<span class="pub-theme"><i class="dot ' + k + '"></i>' + esc(themeLabel(k)) + "</span>";
    }).join("");
    var q = state.q.trim(), source;
    if (p.cat === "article") {
      source = '<span class="venue">' + highlight(p.venue, q) + "</span>" +
        (p.detail ? '<span class="detail">' + highlight(p.detail, q) + "</span>" : "") +
        (p.doi ? '<a class="doi" href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener" title="doi:' + esc(p.doi) + '">DOI ↗</a>' : "");
    } else if (p.cat === "book") {
      source = "<span>" + esc(T[lang()].roles[p.role] || p.role) + "</span><span>" + highlight(p.publisher, q) + "</span>";
    } else {
      source = "<span>" + highlight(t("by", p.author), q) + "</span><span>" + esc(T[lang()].roles[p.role] || p.role) + "</span><span>" + highlight(p.publisher, q) + "</span>";
    }
    return '<article class="pub" id="' + p.id + '">' +
      '<div class="pub-meta"><span class="pub-type">' + esc(t(p.kind)) + "</span>" + themes + "</div>" +
      '<h3 class="pub-title">' + rich(p.title, marks) + "</h3>" +
      '<p class="pub-source">' + source + "</p>" +
      (p.original ? '<p class="pub-orig">' + esc(t("original")) + ": " + rich(p.original, q) + "</p>" : "") +
      "</article>";
  }

  function renderPubs() {
    var q = state.q.trim();
    var marks = [q].concat(state.kw != null ? KW[state.kw].match : []);
    var list = PUBS.filter(function (p) { return matches(p); });
    var years = {};
    list.forEach(function (p) { (years[p.year] = years[p.year] || []).push(p); });
    var keys = Object.keys(years).map(Number).sort(function (a, b) { return state.sort === "desc" ? b - a : a - b; });
    $("#pub-list").innerHTML = keys.length ? keys.map(function (y) {
      return '<section class="year-group" aria-label="' + y + '"><div class="year-label"><span class="year-label-inner">' + y + "</span></div>" +
        '<div class="year-items">' + years[y].map(function (p) { return pubHTML(p, marks); }).join("") + "</div></section>";
    }).join("") : '<p class="empty">' + esc(t("empty")) + "</p>";

    $("#pub-count").textContent = t("count", list.length, PUBS.length);
    $("#pub-sort").textContent = state.sort === "desc" ? t("sortDesc") : t("sortAsc");

    var pills = [];
    if (state.kw != null) pills.push(["kw", t("kwPill", KW[state.kw][lang()])]);
    if (state.year) pills.push(["year", t("yearPill", state.year)]);
    if (state.theme) pills.push(["theme", t("pill", themeLabel(state.theme))]);
    if (q) pills.push(["q", t("queryPill", q)]);
    if (state.type !== "all") pills.push(["type", t("pill", t(state.type))]);
    var af = $("#active-filters");
    af.innerHTML = "";
    pills.forEach(function (pl) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "af-pill"; b.textContent = pl[1];
      b.addEventListener("click", function () {
        if (pl[0] === "kw") state.kw = null;
        if (pl[0] === "year") state.year = null;
        if (pl[0] === "theme") state.theme = null;
        if (pl[0] === "type") state.type = "all";
        if (pl[0] === "q") { state.q = ""; $("#pub-search").value = ""; }
        renderPubFilters(); renderPubs();
      });
      af.appendChild(b);
    });
    if (pills.length > 1) {
      var r = document.createElement("button");
      r.type = "button"; r.className = "text-btn"; r.textContent = t("reset");
      r.addEventListener("click", function () {
        state.theme = null; state.type = "all"; state.year = null; state.q = ""; state.kw = null;
        $("#pub-search").value = "";
        renderPubFilters(); renderPubs();
      });
      af.appendChild(r);
    }
    renderChart();
  }

  function initPubs() {
    var input = $("#pub-search");
    input.addEventListener("input", function () { state.q = input.value; renderPubs(); });
    $("#pub-sort").addEventListener("click", function () { state.sort = state.sort === "desc" ? "asc" : "desc"; renderPubs(); });
  }

  /* ---------------------------------------------------------------- chart */
  var chartWidth = 0;
  function renderChart() {
    var wrap = $("#pub-chart");
    var tip = $("#chart-tip");
    var old = $("svg", wrap);
    if (old) old.remove();
    var oldMsg = $(".chart-empty", wrap);
    if (oldMsg) oldMsg.remove();
    var W = wrap.clientWidth;
    if (!W) return;
    chartWidth = W;
    var narrow = W < 560;
    var m = { t: 34, r: 6, b: 26, l: 22 };
    var plotH = narrow ? 170 : 210;
    var H = m.t + plotH + m.b;

    var all = PUBS.filter(function (p) { return p.cat !== "translation"; });
    var minY = Math.min.apply(null, all.map(function (p) { return p.year; }));
    var maxY = Math.max.apply(null, all.map(function (p) { return p.year; }));
    var years = [];
    for (var y = minY; y <= maxY; y++) years.push(y);
    var perYearAll = {};
    all.forEach(function (p) { perYearAll[p.year] = (perYearAll[p.year] || 0) + 1; });
    var yMax = Math.max.apply(null, Object.keys(perYearAll).map(function (k) { return perYearAll[k]; }));

    var shown = all.filter(function (p) { return matches(p, { ignoreYear: true }); });
    var byYear = {};
    shown.forEach(function (p) { (byYear[p.year] = byYear[p.year] || []).push(p); });
    Object.keys(byYear).forEach(function (k) {
      byYear[k].sort(function (a, b) { return THEME_ORDER.indexOf(primary(a)) - THEME_ORDER.indexOf(primary(b)); });
    });

    var band = (W - m.l - m.r) / years.length;
    var bw = Math.max(5, Math.min(18, band * 0.66));
    var unit = plotH / yMax;
    var base = m.t + plotH;
    function cx(yr) { return m.l + (yr - minY + 0.5) * band; }

    var svg = svgEl("svg", { "class": "chart-svg" + (state.year ? " has-year" : ""), viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "group", "aria-label": t("chartLabel") });
    wrap.insertBefore(svg, tip);

    var grid = svgEl("g", { "class": "grid", "aria-hidden": "true" }, svg);
    for (var i = 1; i <= yMax; i++) {
      var gy = Math.round(base - i * unit) + 0.5;
      svgEl("line", { x1: m.l, x2: W - m.r, y1: gy, y2: gy }, grid);
      var lab = svgEl("text", { "class": "tick-label", x: m.l - 8, y: gy + 3.5, "text-anchor": "end" }, grid);
      lab.textContent = i;
    }
    var cols = svgEl("g", { "class": "cols" }, svg);
    years.forEach(function (yr) {
      var items = byYear[yr] || [];
      var g = svgEl("g", { "class": "col" + (state.year === yr ? " is-selected" : ""), "data-year": yr }, cols);
      if (items.length) {
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
        g.setAttribute("aria-pressed", state.year === yr ? "true" : "false");
        g.setAttribute("aria-label", yr + ": " + items.length + " — " + items.map(function (p) { return plain(p.title); }).join("; "));
      }
      svgEl("rect", { "class": "col-hit", x: m.l + (yr - minY) * band, y: m.t - 6, width: band, height: plotH + 6 }, g);
      var x0 = cx(yr) - bw / 2;
      items.forEach(function (p, k) {
        var yTop = base - (k + 1) * unit, h = unit - 2, top = k === items.length - 1;
        var r = top ? Math.min(4, bw / 2, h / 2) : 0;
        var d = "M" + x0 + "," + (yTop + h) + "V" + (yTop + r) +
          (r ? "Q" + x0 + "," + yTop + " " + (x0 + r) + "," + yTop : "") +
          "H" + (x0 + bw - r) +
          (r ? "Q" + (x0 + bw) + "," + yTop + " " + (x0 + bw) + "," + (yTop + r) : "") +
          "V" + (yTop + h) + "Z";
        svgEl("path", { "class": "block th-" + primary(p), d: d, "data-id": p.id }, g);
      });
      svgEl("rect", { "class": "sel-mark", x: cx(yr) - bw / 2 - 2, y: base + 3, width: bw + 4, height: 2 }, g);
    });
    svgEl("line", { "class": "baseline", x1: m.l, x2: W - m.r, y1: base + 0.5, y2: base + 0.5 }, svg);
    var xl = svgEl("g", { "aria-hidden": "true" }, svg);
    years.forEach(function (yr) {
      if (yr === minY || yr % 5 === 0) {
        var tx = svgEl("text", { "class": "tick-label", x: cx(yr), y: base + 18, "text-anchor": "middle" }, xl);
        tx.textContent = yr;
      }
    });

    var dhYears = all.filter(function (p) { return primary(p) === "dh"; }).map(function (p) { return p.year; });
    var dhFirst = dhYears.length ? Math.min.apply(null, dhYears) : null;
    if (dhFirst && byYear[dhFirst] && (!state.theme || state.theme === "dh")) {
      var ax = cx(dhFirst), colTop = base - byYear[dhFirst].length * unit;
      var ann = svgEl("g", { "class": "annot", "aria-hidden": "true" }, svg);
      var text = svgEl("text", { "class": "annot-text", y: m.t - 14 }, ann);
      text.textContent = t("annot", dhFirst);
      var tw = text.getComputedTextLength ? text.getComputedTextLength() || 170 : 170;
      var toLeft = ax + 8 + tw > W - m.r;
      text.setAttribute("x", toLeft ? ax - 6 : ax + 6);
      text.setAttribute("text-anchor", toLeft ? "end" : "start");
      svgEl("line", { "class": "annot-line", x1: ax, x2: ax, y1: m.t - 24, y2: colTop - 6 }, ann);
      svgEl("circle", { "class": "annot-dot", cx: ax, cy: colTop - 6, r: 2.5 }, ann);
    }
    if (!shown.length) {
      var msg = document.createElement("p");
      msg.className = "chart-empty";
      msg.textContent = state.type === "translation" ? t("noChart") : t("empty");
      wrap.appendChild(msg);
    }
    $("#chart-table").innerHTML = "<caption>" + esc(t("chartLabel")) + "</caption><thead><tr><th>Year</th>" +
      THEME_ORDER.map(function (k) { return "<th>" + esc(themeLabel(k)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      years.filter(function (yr) { return byYear[yr]; }).map(function (yr) {
        return "<tr><th>" + yr + "</th>" + THEME_ORDER.map(function (k) {
          return "<td>" + byYear[yr].filter(function (p) { return primary(p) === k; }).length + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody>";
    bindChart(svg, byYear, { cx: cx, base: base, unit: unit, W: W });
  }

  function bindChart(svg, byYear, geo) {
    var wrap = $("#pub-chart"), tip = $("#chart-tip");
    var hoverCol = null, hoverBlock = null;
    function place(x, yTop) {
      tip.classList.add("is-on");
      var w = tip.offsetWidth, h = tip.offsetHeight;
      tip.style.left = Math.max(0, Math.min(geo.W - w, x - w / 2)) + "px";
      tip.style.top = Math.max(-8, yTop - h - 12) + "px";
    }
    function colTip(yr) {
      var items = byYear[yr] || [], counts = {};
      items.forEach(function (p) { counts[primary(p)] = (counts[primary(p)] || 0) + 1; });
      tip.innerHTML = '<div class="tt-head"><span class="tt-year">' + yr + '</span><span class="tt-total">' + esc(t("items", items.length)) + "</span></div>" +
        THEME_ORDER.slice().reverse().filter(function (k) { return counts[k]; }).map(function (k) {
          return '<div class="tt-row"><span class="tt-key" style="background:var(--t-' + k + ')"></span><b>' + counts[k] + "</b><span>" + esc(themeLabel(k)) + "</span></div>";
        }).join("") +
        '<div class="tt-hint">' + esc(state.year === yr ? t("hintColOn") : t("hintCol")) + "</div>";
      place(geo.cx(yr), geo.base - items.length * geo.unit);
    }
    function blockTip(p, el) {
      var k = primary(p), bb = el.getBBox();
      tip.innerHTML = '<div class="tt-head"><span class="tt-year">' + p.year + '</span><span class="tt-total">' + esc(t(p.kind)) + "</span></div>" +
        '<div class="tt-row"><span class="tt-key" style="background:var(--t-' + k + ')"></span><span></span><span>' + esc(themeLabel(k)) + "</span></div>" +
        '<div class="tt-title">' + rich(p.title) + "</div>" +
        '<div class="tt-venue">' + esc(p.venue || p.publisher || "") + "</div>" +
        '<div class="tt-hint">' + esc(t("hintBlock")) + "</div>";
      place(bb.x + bb.width / 2, bb.y);
    }
    function clear() {
      tip.classList.remove("is-on");
      if (hoverCol) hoverCol.classList.remove("is-hover");
      if (hoverBlock) hoverBlock.classList.remove("is-hover");
      hoverCol = hoverBlock = null;
    }
    function find(id) { return PUBS.filter(function (p) { return p.id === id; })[0]; }
    svg.addEventListener("pointermove", function (ev) {
      var block = ev.target.closest && ev.target.closest(".block");
      var col = ev.target.closest && ev.target.closest(".col");
      if (block) {
        if (block === hoverBlock) return;
        clear(); hoverBlock = block; block.classList.add("is-hover");
        blockTip(find(block.getAttribute("data-id")), block);
      } else if (col && byYear[col.getAttribute("data-year")]) {
        if (col === hoverCol && !hoverBlock) return;
        clear(); hoverCol = col; col.classList.add("is-hover");
        colTip(+col.getAttribute("data-year"));
      } else { clear(); }
    });
    svg.addEventListener("pointerleave", clear);
    svg.addEventListener("click", function (ev) {
      var block = ev.target.closest(".block"), col = ev.target.closest(".col");
      if (block) {
        var p = find(block.getAttribute("data-id"));
        state.year = p.year;
        renderPubs();
        var art = document.getElementById(p.id);
        if (art) {
          scrollToEl(art, "center");
          art.classList.add("is-flash");
          setTimeout(function () { art.classList.remove("is-flash"); }, 1600);
        }
      } else if (col && byYear[col.getAttribute("data-year")]) {
        var yr = +col.getAttribute("data-year");
        state.year = state.year === yr ? null : yr;
        renderPubs();
      }
    });
    $$(".col[tabindex]", svg).forEach(function (col) {
      var yr = +col.getAttribute("data-year");
      col.addEventListener("focus", function () { clear(); hoverCol = col; colTip(yr); });
      col.addEventListener("blur", clear);
      col.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          state.year = state.year === yr ? null : yr;
          renderPubs();
          var again = $('.col[data-year="' + yr + '"]', wrap);
          if (again) again.focus({ preventScroll: true });
        }
      });
    });
  }
  function initChartResize() {
    var wrap = $("#pub-chart"), raf = 0;
    function check() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { if (wrap.clientWidth !== chartWidth) renderChart(); });
    }
    if ("ResizeObserver" in window) new ResizeObserver(check).observe(wrap);
    else window.addEventListener("resize", check);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { renderChart(); });
  }

  /* ================================================================ talks */
  function initTabs() {
    var tabs = $$('[role="tab"]');
    function activate(tab, focus) {
      tabs.forEach(function (tb) {
        var on = tb === tab;
        tb.setAttribute("aria-selected", on ? "true" : "false");
        tb.tabIndex = on ? 0 : -1;
        document.getElementById(tb.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(tab); });
      tab.addEventListener("keydown", function (ev) {
        if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
          ev.preventDefault();
          activate(tabs[(i + (ev.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length], true);
        }
      });
    });
  }

  var LEC_LIMIT = 12;
  function renderLectures() {
    var box = $("#lec-filters");
    $$(".chip", box).forEach(function (c) { c.remove(); });
    [["all", "lecAll"], ["keynote", "keynote"], ["talk", "talk"], ["lecture", "lectureType"]].forEach(function (tp) {
      var k = tp[0];
      var n = k === "all" ? CV.lectures.length : CV.lectures.filter(function (l) { return l.type === k; }).length;
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip";
      b.setAttribute("aria-pressed", state.lecType === k ? "true" : "false");
      b.innerHTML = esc(t(tp[1])) + ' <span class="count">' + n + "</span>";
      b.addEventListener("click", function () { state.lecType = k; renderLectures(); });
      box.appendChild(b);
    });
    var list = CV.lectures.filter(function (l) { return state.lecType === "all" || l.type === state.lecType; });
    var collapsible = list.length > LEC_LIMIT + 2;
    var visible = collapsible && !state.lecExpanded ? LEC_LIMIT : list.length;
    var groups = [], idx = 0;
    list.forEach(function (l) {
      var g = groups[groups.length - 1];
      if (!g || g.year !== l.year) { g = { year: l.year, items: [] }; groups.push(g); }
      g.items.push({ l: l, hidden: idx++ >= visible });
    });
    $("#lec-list").innerHTML = groups.map(function (g) {
      var allHidden = g.items.every(function (x) { return x.hidden; });
      return '<section class="year-group"' + (allHidden ? " hidden" : "") + '><div class="year-label"><span class="year-label-inner">' + g.year + "</span></div>" +
        '<ol class="lec-list year-items">' + g.items.map(function (x) {
          var l = x.l;
          var chip = l.title ? l.label : "Lecture";
          var title = l.title ? "“" + esc(l.title) + "”" : esc(l.label);
          return '<li class="lec"' + (x.hidden ? " hidden" : "") + '><span class="lec-type' + (l.type === "keynote" ? " is-keynote" : "") + '">' + esc(chip) + "</span>" +
            '<div class="lec-body"><p class="lec-title">' + title + "</p>" +
            (l.subtitle ? '<p class="lec-sub">' + esc(l.subtitle) + "</p>" : "") +
            '<p class="lec-where">' + esc(l.where) + "</p></div>" +
            '<span class="lec-date">' + esc(l.date) + "</span></li>";
        }).join("") + "</ol></section>";
    }).join("");
    var moreWrap = $("#lec-more-wrap"), more = $("#lec-more");
    moreWrap.hidden = !collapsible;
    more.textContent = state.lecExpanded ? t("less") : t("more", list.length - LEC_LIMIT);
    more.setAttribute("aria-expanded", state.lecExpanded ? "true" : "false");
  }
  function initLectures() {
    $("#lec-more").addEventListener("click", function () {
      state.lecExpanded = !state.lecExpanded;
      renderLectures();
      if (!state.lecExpanded) scrollToEl($("#talks"));
    });
  }
  function renderConferences() {
    $("#conf-list").innerHTML = CV.conferences.map(function (c) {
      return '<li class="conf"><div class="conf-where">' +
        '<span class="conf-city">' + esc(c.city) + '</span><span class="conf-country">' + esc(c.country) + "</span>" +
        '<span class="conf-date">' + esc(c.date) + "</span>" +
        (c.abroad ? '<span class="abroad-tag">' + esc(t("abroad")) + "</span>" : "") +
        '</div><div class="conf-body">' +
        '<h3 class="conf-title">' + rich(c.title) + "</h3>" +
        (c.session ? '<p class="conf-session"><span class="label">' + esc(t("session")) + "</span>" + rich(c.session) + "</p>" : "") +
        '<p class="conf-event">' + rich(c.event) + "</p>" +
        '<p class="conf-venue">' + esc(c.venue) + "</p>" +
        (c.links ? '<div class="conf-links">' + c.links.map(function (l) {
          return '<a class="doi" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>";
        }).join("") + "</div>" : "") +
        "</div></li>";
    }).join("");
  }

  /* ================================================================ boot */
  function boot() {
    setStats();
    drawStars();
    window.addEventListener("resize", (function () { var tmr; return function () { clearTimeout(tmr); tmr = setTimeout(drawStars, 200); }; })());
    initLang();
    initPubs();
    initLectures();
    initTabs();
    initCopy();
    initPrint();
    applyLang(lang());
    initScroll();
    countUp();
    initGraphResize();
    initChartResize();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
