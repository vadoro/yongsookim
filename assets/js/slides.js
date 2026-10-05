/* 발표 자료 페이지: assets/js/data.js 의 CV.slides 를 최근 순으로 그립니다. */
(function () {
  "use strict";

  var CV = window.CV, P = window.Page;
  var esc = P.esc;
  var $ = function (s) { return document.querySelector(s); };

  var T = {
    ko: {
      count: function (n) { return n + "개"; },
      slides: function (n) { return "슬라이드 " + n + "장"; },
      outline: "목차",
      open: "슬라이드 보기",
      empty: "아직 올린 자료가 없습니다."
    },
    en: {
      count: function (n) { return String(n); },
      slides: function (n) { return n + " slides"; },
      outline: "Outline",
      open: "Open slides",
      empty: "No decks yet."
    }
  };

  function sortKey(d) { return String(d.year || "") + "." + String(d.date || "").replace(/[^0-9.]/g, ""); }

  function card(d) {
    var s = T[P.lang()], c = d.cover || {};
    var when = [d.kind, d.date || d.year].filter(Boolean).join(" · ");
    var vars = ["--d-bg:" + (c.bg || "#15171C"), "--d-glow:" + (c.glow || c.bg || "#15171C"), "--d-ink:" + (c.ink || "#EDEAE3"),
      "--d-accent:" + (c.accent || "#6CE0F0"), "--d-muted:" + (c.muted || "#AEB4BF")].join(";");
    var summary = d.summary ? (d.summary[P.lang()] || d.summary.ko || "") : "";
    return '<li class="deck">' +
      '<a class="deck-cover" href="' + esc(d.url) + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true" style="' + esc(vars) + '">' +
        (c.prompt ? '<span class="dc-prompt">' + esc(c.prompt) + "</span>" : '<span class="dc-prompt"></span>') +
        '<span class="dc-main"><span class="dc-title">' + esc(d.title) + "</span>" +
          (d.subtitle ? '<span class="dc-sub">' + esc(d.subtitle) + "</span>" : "") + "</span>" +
        '<span class="dc-foot"><span>김용수</span><span>' + esc(when.toUpperCase()) + "</span></span>" +
      "</a>" +
      '<div class="deck-body">' +
        '<p class="deck-kicker">' + esc(when) + "</p>" +
        '<h3 class="deck-title"><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.title) + "</a>" +
          (d.subtitle ? '<span class="deck-sub">' + esc(d.subtitle) + "</span>" : "") + "</h3>" +
        (summary ? '<p class="deck-sum">' + esc(summary) + "</p>" : "") +
        (d.outline && d.outline.length ? '<div class="deck-outline"><p class="label">' + esc(s.outline) + "</p><ol>" +
          d.outline.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ol></div>" : "") +
        '<div class="deck-actions">' +
          '<a class="btn" href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(s.open) + " ↗</a>" +
          (d.slides ? '<span class="deck-meta">' + esc(s.slides(d.slides)) + "</span>" : "") +
        "</div>" +
      "</div></li>";
  }

  function render() {
    var list = (CV.slides || []).map(function (d, i) { return { d: d, i: i }; })
      .sort(function (a, b) { return sortKey(b.d) > sortKey(a.d) ? 1 : sortKey(b.d) < sortKey(a.d) ? -1 : a.i - b.i; })
      .map(function (x) { return x.d; });
    var s = T[P.lang()];
    $("#deck-count").textContent = s.count(list.length);
    $("#deck-list").innerHTML = list.length ? list.map(card).join("") : '<li class="empty">' + esc(s.empty) + "</li>";
  }

  P.onLang(render);
})();
