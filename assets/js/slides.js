/* 발표 자료 페이지: assets/js/data.js 의 CV.slides 를 그립니다.
 * 날짜 없이 계속 고쳐 쓰는 자료(ongoing: true)를 맨 위에, 나머지는 최근 순으로 놓습니다. */
(function () {
  "use strict";

  var CV = window.CV, P = window.Page;
  var esc = P.esc;
  var $ = function (s) { return document.querySelector(s); };

  var T = {
    ko: {
      count: function (n) { return n + "개"; },
      slides: function (n) { return "슬라이드 " + n + "장"; },
      ongoing: "계속 업데이트",
      outline: "목차",
      open: "슬라이드 보기",
      empty: "아직 올린 자료가 없습니다."
    },
    en: {
      count: function (n) { return String(n); },
      slides: function (n) { return n + " slides"; },
      ongoing: "Updated regularly",
      outline: "Outline",
      open: "Open slides",
      empty: "No decks yet."
    }
  };

  /* 글자 하나 또는 { ko, en } 를 지금 언어로 */
  function L(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[P.lang()] || v.ko || "";
  }

  function sortKey(d) { return String(d.year || "") + "." + String(d.date || "").replace(/[^0-9.]/g, ""); }

  /* 표지 오른쪽 위의 색 선(트랙 노선) — cover.lines 에 색을 적은 만큼 그립니다(최대 4개). */
  var LINES = [
    ["M 883 0 C 1100 167, 1233 317, 1600 383", [1185, 229], [1406, 334]],
    ["M 958 0 C 1167 142, 1308 258, 1600 275", [1248, 184], [1442, 253]],
    ["M 1033 0 C 1233 108, 1383 183, 1600 167", [1310, 130], [1477, 166]],
    ["M 1108 0 C 1300 75, 1458 100, 1600 58", [1373, 73], [1513, 76]]
  ];
  function coverLines(colors, bg) {
    return '<svg class="dc-lines" viewBox="0 0 1600 900" aria-hidden="true" focusable="false"><g transform="translate(400 0) scale(.75)">' +
      colors.slice(0, LINES.length).map(function (c, i) {
        var l = LINES[i], col = esc(c);
        return '<path d="' + l[0] + '" stroke="' + col + '"/>' +
          [l[1], l[2]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="' + esc(bg) + '" stroke="' + col + '"/>'; }).join("");
      }).join("") + "</g></svg>";
  }

  function card(d) {
    var s = T[P.lang()], c = d.cover || {};
    var when = [L(d.kind), d.ongoing ? s.ongoing : (d.date || d.year)].filter(Boolean).join(" · ");
    var bg = c.bg || "#15171C";
    var vars = ["--d-bg:" + bg, "--d-glow:" + (c.glow || bg), "--d-ink:" + (c.ink || "#EDEAE3"),
      "--d-accent:" + (c.accent || "#6CE0F0"), "--d-muted:" + (c.muted || "#AEB4BF")];
    if (c.grad && c.grad.length > 1) vars.push("--d-grad:linear-gradient(90deg," + c.grad.join(",") + ")");
    var summary = L(d.summary);
    var coverTitle = c.title || d.title, coverSub = c.sub || d.subtitle;
    var pts = d.points && d.points.items && d.points.items.length ? d.points : null;
    return '<li class="deck">' +
      '<a class="deck-cover' + (c.lines && c.lines.length ? " has-lines" : "") + '" href="' + esc(d.url) + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true" style="' + esc(vars.join(";")) + '">' +
        (c.lines && c.lines.length ? coverLines(c.lines, bg) : "") +
        '<span class="dc-prompt">' + esc(c.prompt || "") + "</span>" +
        '<span class="dc-main"><span class="dc-title' + (c.grad ? " is-grad" : "") + '">' + esc(coverTitle) + "</span>" +
          (coverSub ? '<span class="dc-sub">' + esc(coverSub) + "</span>" : "") + "</span>" +
        '<span class="dc-foot"><span>김용수</span><span>' + esc(when.toUpperCase()) + "</span></span>" +
      "</a>" +
      '<div class="deck-body">' +
        '<p class="deck-kicker">' + esc(when) + "</p>" +
        '<h3 class="deck-title"><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.title) + "</a>" +
          (d.subtitle ? '<span class="deck-sub">' + esc(d.subtitle) + "</span>" : "") + "</h3>" +
        (summary ? '<p class="deck-sum">' + esc(summary) + "</p>" : "") +
        (pts ? '<div class="deck-points">' + (pts.label ? '<p class="label">' + esc(L(pts.label)) + "</p>" : "") + "<ul>" +
          pts.items.map(function (p) {
            return '<li style="--p:' + esc(p.color || "var(--cyan)") + '">' +
              '<span class="dp-name">' + esc(L(p.name)) + "</span>" +
              (p.tag ? '<span class="dp-tag">' + esc(L(p.tag)) + "</span>" : "") +
              (p.note ? '<span class="dp-note">' + esc(L(p.note)) + "</span>" : "") + "</li>";
          }).join("") + "</ul></div>" : "") +
        (d.outline && d.outline.length ? '<div class="deck-outline"><p class="label">' + esc(s.outline) + "</p><ol>" +
          d.outline.map(function (o) { return "<li>" + esc(L(o)) + "</li>"; }).join("") + "</ol></div>" : "") +
        '<div class="deck-actions">' +
          '<a class="btn" href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(s.open) + " ↗</a>" +
          (d.slides ? '<span class="deck-meta">' + esc(s.slides(d.slides)) + "</span>" : "") +
        "</div>" +
      "</div></li>";
  }

  function render() {
    var list = (CV.slides || []).map(function (d, i) { return { d: d, i: i }; })
      .sort(function (a, b) {
        var oa = a.d.ongoing ? 1 : 0, ob = b.d.ongoing ? 1 : 0;
        if (oa !== ob) return ob - oa;
        var ka = sortKey(a.d), kb = sortKey(b.d);
        return kb > ka ? 1 : kb < ka ? -1 : a.i - b.i;
      })
      .map(function (x) { return x.d; });
    var s = T[P.lang()];
    $("#deck-count").textContent = s.count(list.length);
    $("#deck-list").innerHTML = list.length ? list.map(card).join("") : '<li class="empty">' + esc(s.empty) + "</li>";
  }

  P.onLang(render);
})();
