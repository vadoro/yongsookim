/* 김용수 · Yongsoo Kim — Curriculum Vitæ
 * 모든 목록은 assets/js/data.js 의 window.CV 에서 그려집니다. */
(function () {
  "use strict";

  var CV = window.CV;
  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  function lang() { return root.getAttribute("lang") === "en" ? "en" : "ko"; }

  /* ---------------------------------------------------------------- strings */
  var T = {
    ko: {
      night: "Night", day: "Day",
      all: "전체", article: "논문", book: "저서", translation: "역서", review: "서평",
      count: function (n, total) { return "전체 " + total + "건 중 " + n + "건"; },
      sortDesc: "최신순 ↓", sortAsc: "오래된 순 ↑",
      reset: "필터 초기화",
      empty: "조건에 맞는 성과가 없습니다. 필터를 줄이거나 검색어를 바꿔 보세요.",
      yearPill: function (y) { return y + "년 ×"; },
      themePill: function (l) { return l + " ×"; },
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
      lecture: "특강·강연", keynote: "기조 강연", talk: "주제 발표",
      more: function (n) { return "이전 강연 " + n + "건 더 보기"; }, less: "접기",
      abroad: "해외 발표", session: "Session",
      present: "현재",
      groups: { education: "학력", career: "경력", societies: "학회" },
      now: function (d) { return "현재 " + d; },
      copied: "복사됨 ✓",
      search: "제목·학술지 검색 (예: Faulkner, 연결망)",
      issue: function (y, s) { return y + "년 " + s + "호"; },
      seasons: ["겨울", "봄", "여름", "가을"],
      asof: function (y, m) { return y + "." + m + " 기준"; },
      runTop: "표지"
    },
    en: {
      night: "Night", day: "Day",
      all: "All", article: "Article", book: "Book", translation: "Translation", review: "Review",
      count: function (n, total) { return n + " of " + total + " entries"; },
      sortDesc: "Newest first ↓", sortAsc: "Oldest first ↑",
      reset: "Clear filters",
      empty: "Nothing matches these filters. Remove a filter or try another search.",
      yearPill: function (y) { return y + " ×"; },
      themePill: function (l) { return l + " ×"; },
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
      lecture: "Lectures", keynote: "Keynotes", talk: "Panel talks",
      more: function (n) { return "Show " + n + " earlier lectures"; }, less: "Show fewer",
      abroad: "Abroad", session: "Session",
      present: "present",
      groups: { education: "Education", career: "Appointments", societies: "Service" },
      now: function (d) { return "Now " + d; },
      copied: "Copied ✓",
      search: "Search titles & journals (e.g. Faulkner)",
      issue: function (y, s) { return s + " " + y; },
      seasons: ["Winter", "Spring", "Summer", "Autumn"],
      asof: function (y, m) { return "As of " + y + "." + m; },
      runTop: "Cover"
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
  function highlight(s, q) {
    if (!q) return esc(s);
    var re = new RegExp(reEsc(q), "gi"), out = "", last = 0, m;
    while ((m = re.exec(s))) {
      out += esc(s.slice(last, m.index)) + "<mark>" + esc(m[0]) + "</mark>";
      last = m.index + m[0].length;
      if (!m[0].length) re.lastIndex++;
    }
    return out + esc(s.slice(last));
  }
  /* *별표* → <em>, 나머지는 이스케이프 + 검색어 강조 */
  function rich(text, q) {
    return String(text || "").split("*").map(function (part, i) {
      var h = highlight(part, q);
      return i % 2 ? "<em>" + h + "</em>" : h;
    }).join("");
  }
  function plain(s) { return String(s || "").replace(/\*/g, ""); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  var NOW = new Date();
  var NOW_Y = NOW.getFullYear();
  var NOW_M = NOW.getMonth() + 1;
  var NOW_DEC = NOW_Y + (NOW_M - 0.5) / 12;

  function parseStart(s) {
    var p = String(s).split(".");
    return +p[0] + (p[1] ? (+p[1] - 1) / 12 : 0);
  }
  function parseEnd(s) {
    if (!s) return NOW_DEC;
    var p = String(s).split(".");
    return +p[0] + (p[1] ? +p[1] / 12 : 0.5);
  }

  /* ---------------------------------------------------------------- derived data */
  var THEME_ORDER = ["theory", "amlit", "film", "dh"];   // 차트 쌓는 순서 (아래 → 위)
  var THEME_KEYS = ["dh", "theory", "amlit", "film"];     // 필터 표시 순서

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

  /* ---------------------------------------------------------------- state */
  var state = { theme: null, type: "all", year: null, q: "", sort: "desc", lecType: "all", lecExpanded: false };

  /* ================================================================ chrome */
  function setIssue() {
    var season = T[lang()].seasons[Math.floor((NOW_M % 12) / 3)];
    $("#issue").innerHTML = '<span class="issue-cv">Curriculum Vitæ · </span>Vol. ' + NOW_Y + " · No. " + NOW_M;
    $("#issue-long").textContent = t("issue", NOW_Y, season);
    $("#glance-asof").textContent = t("asof", NOW_Y, pad2(NOW_M));
    $("#year-now").textContent = NOW_Y;
  }

  function setStats() {
    $$("[data-stat]").forEach(function (el) { el.textContent = STATS[el.getAttribute("data-stat")]; });
    $$("[data-count]").forEach(function (el) { el.textContent = STATS[el.getAttribute("data-count")]; });
  }

  function countUp() {
    var els = $$("[data-count]");
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
    els.forEach(function (el) { io.observe(el); });
  }

  /* theme */
  function effectiveTheme() {
    var a = root.getAttribute("data-theme");
    if (a) return a;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncThemeButton() {
    var dark = effectiveTheme() === "dark";
    var btn = $("#theme-toggle");
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "밝은 화면으로 Light mode" : "어두운 화면으로 Dark mode");
    $("#theme-label").textContent = dark ? t("day") : t("night");
  }
  function initTheme() {
    $("#theme-toggle").addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("cv-theme", next);
      syncThemeButton();
    });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", syncThemeButton);
    }
    syncThemeButton();
  }

  /* language */
  function applyLang(l) {
    root.setAttribute("lang", l);
    $$("[data-set-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-set-lang") === l ? "true" : "false"); });
    $("#pub-search").setAttribute("placeholder", t("search"));
    setIssue();
    syncThemeButton();
    renderChrono();
    renderAwards();
    renderPubFilters();
    renderPubs();
    renderLectures();
    renderConferences();
    updateRunhead();
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

  /* running head, progress, topbar */
  var sections = [];
  function updateRunhead() {
    var y = window.scrollY || window.pageYOffset;
    var topbar = $("#topbar");
    var cover = $(".cover-grid");
    topbar.classList.toggle("is-scrolled", cover ? cover.getBoundingClientRect().top < 40 : y > 200);
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    $("#progress-bar").style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    var line = window.innerHeight * 0.35, current = null;
    sections.forEach(function (s) { if (s.getBoundingClientRect().top < line) current = s; });
    $("#runhead-sec").textContent = current ? current.getAttribute("data-run-" + lang()) : t("runTop");
  }
  function initScroll() {
    sections = $$("[data-run-ko]");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateRunhead(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", updateRunhead);
    updateRunhead();

    var heads = $$(".sec-head");
    if (!("IntersectionObserver" in window)) { heads.forEach(function (h) { h.classList.add("is-drawn"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-drawn"); io.unobserve(en.target); }
      });
    }, { threshold: 0.3 });
    heads.forEach(function (h) {
      if (h.getBoundingClientRect().top < window.innerHeight) h.classList.add("is-drawn");
      else io.observe(h);
    });
  }

  /* ornaments */
  var knotSeq = 0;
  function knotSVG() {
    var id = "kc-" + (++knotSeq);
    var B = '<circle class="halo" cx="42.83" cy="39.25" r="20"/><circle class="ring" cx="42.83" cy="39.25" r="20"/>';
    return '<svg class="knot" viewBox="-2 -4 68 68" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="' + id + '"><circle cx="32" cy="56.07" r="6"/><circle cx="32" cy="22.43" r="6"/></clipPath></defs>' +
      B +
      '<circle class="halo" cx="32" cy="20.5" r="20"/><circle class="ring" cx="32" cy="20.5" r="20"/>' +
      '<circle class="halo" cx="21.17" cy="39.25" r="20"/><circle class="ring" cx="21.17" cy="39.25" r="20"/>' +
      '<g clip-path="url(#' + id + ')">' + B + '</g></svg>';
  }
  function initOrnaments() {
    $$("[data-knot]").forEach(function (el) { el.innerHTML = knotSVG(); });
    if (CV.person.photo) {
      var plate = $("#plate");
      plate.innerHTML = '<img src="' + esc(CV.person.photo) + '" alt="김용수 Yongsoo Kim" width="800" height="1000">';
      plate.classList.add("has-photo");
      $("#plate-caption").innerHTML = "<b>FIG. 1</b>김용수 <em>Yongsoo Kim</em>";
    }
  }

  /* copy email */
  function initCopy() {
    var btn = $("#copy-email");
    var original = btn.innerHTML;
    btn.addEventListener("click", function () {
      var email = CV.person.email;
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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, fallback);
      } else { fallback(); }
    });
  }

  function initPrint() {
    var btn = $("#print-btn");
    var embedded = false;
    try { embedded = window.self !== window.top; } catch (e) { embedded = true; }
    if (embedded || !window.print) { btn.hidden = true; return; }
    btn.addEventListener("click", function () { window.print(); });
  }

  /* ================================================================ II. chronology */
  function rangeText(item) {
    return item.start + " – " + (item.end || t("present"));
  }
  function renderChrono() {
    var el = $("#chrono");
    var MIN = 1986, MAX = Math.max(NOW_Y + 1, 2027) + 1;
    function pct(y) { return ((y - MIN) / (MAX - MIN) * 100).toFixed(3) + "%"; }
    var ticks = [];
    for (var y = 1990; y < MAX; y += 5) ticks.push(y);

    var gridHtml = '<div class="chrono-grid" aria-hidden="true">' +
      ticks.map(function (y) { return '<span class="tick" style="left:' + pct(y) + '"></span>'; }).join("") +
      '<span class="now-line" style="left:' + pct(NOW_DEC) + '"></span>' +
      '<span class="now-label" style="left:' + pct(NOW_DEC) + '">' + esc(t("now", NOW_Y + "." + pad2(NOW_M))) + "</span></div>";

    function axis(cls) {
      return '<div class="chrono-axis ' + cls + '" aria-hidden="true"><span></span><div class="axis-track">' +
        ticks.map(function (y) { return '<span style="left:' + pct(y) + (cls === "top" ? ';bottom:0' : ';top:0.2rem') + '">' + y + "</span>"; }).join("") +
        '<i class="span-mark"></i></div></div>';
    }

    var groups = [
      { key: "education", en: "Education", items: CV.education },
      { key: "career", en: "Appointments", items: CV.career },
      { key: "societies", en: "Professional Service", items: CV.societies }
    ];
    var rows = groups.map(function (g) {
      var items = g.items.slice().sort(function (a, b) { return parseStart(a.start) - parseStart(b.start); });
      return '<div class="chrono-group-head"><h3>' + esc(T.ko.groups[g.key]) + " <em>" + esc(g.en) + "</em></h3></div>" +
        items.map(function (it) {
          var s = parseStart(it.start), e = parseEnd(it.end), current = !it.end;
          var w = ((e - s) / (MAX - MIN) * 100).toFixed(3) + "%";
          return '<div class="chrono-row" tabindex="0" data-s="' + s + '" data-e="' + e + '" aria-label="' + esc(it.ko + ", " + rangeText(it)) + '">' +
            '<div class="chrono-label"><strong>' + esc(it.ko) + (it.degree ? '<span class="deg">' + esc(it.degree) + "</span>" : "") + "</strong>" +
            '<span class="when">' + esc(rangeText(it)) + "</span></div>" +
            '<div class="chrono-track" aria-hidden="true"><span class="chrono-bar' + (current ? " is-current" : "") + '" style="left:' + pct(s) + ";width:" + w + '"></span></div></div>';
        }).join("");
    }).join("");

    el.innerHTML = gridHtml + axis("top") + rows + axis("bottom");

    var marks = $$(".span-mark", el);
    function show(row) {
      var s = +row.getAttribute("data-s"), e = +row.getAttribute("data-e");
      marks.forEach(function (m) {
        m.style.left = pct(s);
        m.style.width = ((e - s) / (MAX - MIN) * 100).toFixed(3) + "%";
        m.classList.add("is-on");
      });
    }
    function hide() { marks.forEach(function (m) { m.classList.remove("is-on"); }); }
    $$(".chrono-row", el).forEach(function (row) {
      row.addEventListener("mouseenter", function () { show(row); });
      row.addEventListener("focus", function () { show(row); });
      row.addEventListener("mouseleave", hide);
      row.addEventListener("blur", hide);
    });
  }

  /* ================================================================ III. awards */
  function renderAwards() {
    $("#awards-list").innerHTML = CV.awards.map(function (a) {
      return '<li class="award"><span class="award-year">' + esc(a.year) + "</span>" +
        '<span class="award-name">' + esc(a.ko) + "</span>" +
        (a.note ? '<span class="award-note">' + esc(a.note) + "</span>" : "") +
        '<span class="award-org">' + esc(a.org) + "</span></li>";
    }).join("");
  }

  /* ================================================================ IV. publications */
  function themeLabel(k) { return CV.themes[k][lang()]; }

  function matches(p, opts) {
    opts = opts || {};
    if (state.type !== "all" && p.cat !== state.type) return false;
    if (state.theme && p.themes.indexOf(state.theme) < 0) return false;
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
      b.type = "button";
      b.className = "chip";
      b.setAttribute("data-theme-key", k);
      b.setAttribute("aria-pressed", state.theme === k ? "true" : "false");
      b.innerHTML = '<span class="swatch sw-' + k + '"></span>' + esc(themeLabel(k)) + ' <span class="count">' + n + "</span>";
      b.addEventListener("click", function () {
        state.theme = state.theme === k ? null : k;
        renderPubFilters();
        renderPubs();
      });
      themeBox.appendChild(b);
    });
    [["all", PUBS.length], ["article", STATS.articles], ["book", STATS.books], ["translation", STATS.translations]].forEach(function (pair) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("aria-pressed", state.type === pair[0] ? "true" : "false");
      b.innerHTML = esc(t(pair[0])) + ' <span class="count">' + pair[1] + "</span>";
      b.addEventListener("click", function () {
        state.type = pair[0];
        renderPubFilters();
        renderPubs();
      });
      typeBox.appendChild(b);
    });
  }

  function pubHTML(p, q) {
    var themes = p.themes.map(function (k) {
      return '<span class="pub-theme"><span class="swatch sw-' + k + '"></span>' + esc(themeLabel(k)) + "</span>";
    }).join("");
    var source = "";
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
      '<h3 class="pub-title">' + rich(p.title, q) + "</h3>" +
      '<p class="pub-source">' + source + "</p>" +
      (p.original ? '<p class="pub-orig">' + esc(t("original")) + ": " + rich(p.original, q) + "</p>" : "") +
      "</article>";
  }

  function renderPubs() {
    var q = state.q.trim();
    var list = PUBS.filter(function (p) { return matches(p); });
    var years = {};
    list.forEach(function (p) { (years[p.year] = years[p.year] || []).push(p); });
    var keys = Object.keys(years).map(Number).sort(function (a, b) { return state.sort === "desc" ? b - a : a - b; });

    $("#pub-list").innerHTML = keys.length ? keys.map(function (y) {
      return '<section class="year-group" aria-label="' + y + '"><div class="year-label"><span class="year-label-inner">' + y + "</span></div>" +
        '<div class="year-items">' + years[y].map(function (p) { return pubHTML(p, q); }).join("") + "</div></section>";
    }).join("") : '<p class="empty">' + esc(t("empty")) + "</p>";

    $("#pub-count").textContent = t("count", list.length, PUBS.length);
    $("#pub-sort").textContent = state.sort === "desc" ? t("sortDesc") : t("sortAsc");

    var pills = [];
    if (state.year) pills.push(["year", t("yearPill", state.year)]);
    if (state.theme) pills.push(["theme", t("themePill", themeLabel(state.theme))]);
    if (q) pills.push(["q", t("queryPill", q)]);
    if (state.type !== "all") pills.push(["type", t("themePill", t(state.type))]);
    var af = $("#active-filters");
    af.innerHTML = "";
    pills.forEach(function (pl) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "af-pill";
      b.textContent = pl[1];
      b.addEventListener("click", function () {
        if (pl[0] === "year") state.year = null;
        if (pl[0] === "theme") state.theme = null;
        if (pl[0] === "type") state.type = "all";
        if (pl[0] === "q") { state.q = ""; $("#pub-search").value = ""; }
        renderPubFilters();
        renderPubs();
      });
      af.appendChild(b);
    });
    if (pills.length > 1) {
      var r = document.createElement("button");
      r.type = "button";
      r.className = "text-btn";
      r.textContent = t("reset");
      r.addEventListener("click", resetPubs);
      af.appendChild(r);
    }
    renderChart();
  }

  function resetPubs() {
    state.theme = null; state.type = "all"; state.year = null; state.q = "";
    $("#pub-search").value = "";
    renderPubFilters();
    renderPubs();
  }

  function initPubs() {
    var input = $("#pub-search");
    input.addEventListener("input", function () { state.q = input.value; renderPubs(); });
    $("#pub-sort").addEventListener("click", function () {
      state.sort = state.sort === "desc" ? "asc" : "desc";
      renderPubs();
    });
    $$("[data-jump-theme]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.theme = b.getAttribute("data-jump-theme");
        state.type = "all"; state.year = null; state.q = ""; input.value = "";
        renderPubFilters();
        renderPubs();
        $("#publications").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  /* ---------------------------------------------------------------- chart */
  var SVGNS = "http://www.w3.org/2000/svg";
  var chartWidth = 0;

  function svgEl(name, attrs, parent) {
    var el = document.createElementNS(SVGNS, name);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(el);
    return el;
  }
  function primary(p) { return p.themes[0]; }

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

    var svg = svgEl("svg", {
      "class": "chart-svg" + (state.year ? " has-year" : ""),
      viewBox: "0 0 " + W + " " + H, width: W, height: H,
      role: "group", "aria-label": t("chartLabel")
    });
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
        var yTop = base - (k + 1) * unit;
        var h = unit - 2;
        var top = k === items.length - 1;
        var r = top ? Math.min(4, bw / 2, h / 2) : 0;
        var d = "M" + x0 + "," + (yTop + h) +
          "V" + (yTop + r) +
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

    /* annotation: the turn to digital humanities */
    var dhYears = all.filter(function (p) { return primary(p) === "dh"; }).map(function (p) { return p.year; });
    var dhFirst = dhYears.length ? Math.min.apply(null, dhYears) : null;
    if (dhFirst && byYear[dhFirst] && (!state.theme || state.theme === "dh")) {
      var ax = cx(dhFirst);
      var colTop = base - byYear[dhFirst].length * unit;
      var ann = svgEl("g", { "class": "annot", "aria-hidden": "true" }, svg);
      var text = svgEl("text", { "class": "annot-text", y: m.t - 14 }, ann);
      text.textContent = t("annot", dhFirst);
      var tw = text.getComputedTextLength ? text.getComputedTextLength() || 170 : 170;
      var toLeft = ax + 8 + tw > W - m.r;
      text.setAttribute("x", toLeft ? ax - 6 : ax + 6);
      text.setAttribute("text-anchor", toLeft ? "end" : "start");
      svgEl("line", { "class": "annot-line", x1: ax, x2: ax, y1: m.t - 24, y2: colTop - 6 }, ann);
      svgEl("circle", { "class": "annot-dot", cx: ax, cy: colTop - 6, r: 2 }, ann);
    }

    if (!shown.length) {
      var msg = document.createElement("p");
      msg.className = "chart-empty";
      msg.textContent = state.type === "translation" ? t("noChart") : t("empty");
      wrap.appendChild(msg);
    }

    /* accessible table twin */
    var table = $("#chart-table");
    table.innerHTML = "<caption>" + esc(t("chartLabel")) + "</caption><thead><tr><th>Year</th>" +
      THEME_ORDER.map(function (k) { return "<th>" + esc(themeLabel(k)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      years.filter(function (yr) { return byYear[yr]; }).map(function (yr) {
        return "<tr><th>" + yr + "</th>" + THEME_ORDER.map(function (k) {
          return "<td>" + byYear[yr].filter(function (p) { return primary(p) === k; }).length + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody>";

    bindChart(svg, byYear, { cx: cx, base: base, unit: unit, W: W });
  }

  function bindChart(svg, byYear, geo) {
    var wrap = $("#pub-chart");
    var tip = $("#chart-tip");
    var hoverCol = null, hoverBlock = null;

    function place(x, yTop) {
      tip.classList.add("is-on");
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var left = Math.max(0, Math.min(geo.W - w, x - w / 2));
      var top = Math.max(-8, yTop - h - 12);
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    }
    function colTip(yr) {
      var items = byYear[yr] || [];
      var counts = {};
      items.forEach(function (p) { counts[primary(p)] = (counts[primary(p)] || 0) + 1; });
      tip.innerHTML = '<div class="tt-head"><span class="tt-year">' + yr + '</span><span class="tt-total">' + esc(t("items", items.length)) + "</span></div>" +
        THEME_ORDER.slice().reverse().filter(function (k) { return counts[k]; }).map(function (k) {
          return '<div class="tt-row"><span class="tt-key" style="background:var(--t-' + k + ')"></span><b>' + counts[k] + "</b><span>" + esc(themeLabel(k)) + "</span></div>";
        }).join("") +
        '<div class="tt-hint">' + esc(state.year === yr ? t("hintColOn") : t("hintCol")) + "</div>";
      place(geo.cx(yr), geo.base - items.length * geo.unit);
    }
    function blockTip(p, el) {
      var k = primary(p);
      var bb = el.getBBox();
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
        clear();
        hoverBlock = block;
        block.classList.add("is-hover");
        blockTip(find(block.getAttribute("data-id")), block);
      } else if (col && byYear[col.getAttribute("data-year")]) {
        if (col === hoverCol && !hoverBlock) return;
        clear();
        hoverCol = col;
        col.classList.add("is-hover");
        colTip(+col.getAttribute("data-year"));
      } else {
        clear();
      }
    });
    svg.addEventListener("pointerleave", clear);

    function toggleYear(yr) {
      state.year = state.year === yr ? null : yr;
      renderPubs();
    }
    svg.addEventListener("click", function (ev) {
      var block = ev.target.closest(".block");
      var col = ev.target.closest(".col");
      if (block) {
        var p = find(block.getAttribute("data-id"));
        state.year = p.year;
        renderPubs();
        var art = document.getElementById(p.id);
        if (art) {
          art.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
          art.classList.add("is-flash");
          setTimeout(function () { art.classList.remove("is-flash"); }, 1600);
        }
      } else if (col && byYear[col.getAttribute("data-year")]) {
        toggleYear(+col.getAttribute("data-year"));
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
    var wrap = $("#pub-chart");
    var raf = 0;
    function check() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { if (wrap.clientWidth !== chartWidth) renderChart(); });
    }
    if ("ResizeObserver" in window) new ResizeObserver(check).observe(wrap);
    else window.addEventListener("resize", check);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderChart);
  }

  /* ================================================================ V. lectures */
  var LEC_LIMIT = 12;
  function renderLectures() {
    var box = $("#lec-filters");
    $$(".chip", box).forEach(function (c) { c.remove(); });
    var types = [["all"], ["keynote"], ["talk"], ["lecture"]];
    types.forEach(function (tp) {
      var k = tp[0];
      var n = k === "all" ? CV.lectures.length : CV.lectures.filter(function (l) { return l.type === k; }).length;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("aria-pressed", state.lecType === k ? "true" : "false");
      b.innerHTML = esc(t(k)) + ' <span class="count">' + n + "</span>";
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
      if (!state.lecExpanded) $("#lectures").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ================================================================ VI. conferences */
  function renderConferences() {
    $("#conf-list").innerHTML = CV.conferences.map(function (c) {
      return '<li class="dispatch"><div class="dateline">' +
        '<span class="city">' + esc(c.city) + '</span><span class="country">' + esc(c.country) + "</span>" +
        "<time>" + esc(c.date) + "</time>" +
        (c.abroad ? '<span class="abroad-tag">' + esc(t("abroad")) + "</span>" : "") +
        '</div><div class="dispatch-body">' +
        '<h3 class="dispatch-title">' + rich(c.title) + "</h3>" +
        (c.session ? '<p class="dispatch-session"><span class="label">' + esc(t("session")) + "</span>" + rich(c.session) + "</p>" : "") +
        '<p class="dispatch-event">' + rich(c.event) + "</p>" +
        '<p class="dispatch-venue">' + esc(c.venue) + "</p>" +
        (c.links ? '<div class="dispatch-links">' + c.links.map(function (l) {
          return '<a class="doi" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>";
        }).join("") + "</div>" : "") +
        "</div></li>";
    }).join("");
  }

  /* ================================================================ boot */
  function boot() {
    setStats();
    initOrnaments();
    initTheme();
    initLang();
    initPubs();
    initLectures();
    initCopy();
    initPrint();
    applyLang(lang());
    initScroll();
    countUp();
    initChartResize();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
