/* DH Tutorials 페이지
 * 튜토리얼 목록은 DH 튜토리얼 사이트의 assets/catalog.js (window.DH_CATALOG)에서 읽습니다.
 * 그 파일을 불러오지 못하면 아래 FALLBACK 목록을 보여 줍니다. */
(function () {
  "use strict";

  var BASE = "https://dhtutorials.vercel.app/";
  /* 영상(MP4)은 GitHub Releases의 videos 릴리스에 있습니다. 링크를 누르면 파일이 내려받아집니다. */
  var VIDEOS = "https://github.com/vadoro/dh_tutorials/releases/download/videos/";
  var FALLBACK = {
    tutorials: [
      {
        slug: "network-analysis", title: "점과 선의 과학", topic: "네트워크 분석",
        summary: "노드와 링크에서 출발해 연결정도, 경로, 밀도, 네 가지 중심성, 군집 계수, 커뮤니티, 네트워크 모델까지. 관계의 구조를 점과 선으로 읽는 법을 배웁니다.",
        length: "6:57", scenes: 13, features: ["음성 해설", "장면별 실습", "놀이터", "퀴즈", "용어집", "파이썬 예제"],
        tags: ["관계 데이터"], thumb: "network-analysis/docs/poster.jpg", video: VIDEOS + "network-analysis.mp4"
      },
      {
        slug: "bertopic", title: "BERTopic 토픽 지도", topic: "토픽 모델링",
        summary: "문서 더미가 임베딩, UMAP, HDBSCAN, c-TF-IDF를 거쳐 이름 붙은 토픽 지도가 되기까지. 짧은 한국어 문장 90개로 한 단계씩 따라갑니다.",
        length: "3:46", scenes: 9, features: ["음성 해설", "장면별 실습", "놀이터", "퀴즈", "용어집"],
        tags: ["텍스트 데이터"], thumb: "bertopic/docs/poster.jpg", video: VIDEOS + "bertopic-explainer.mp4"
      },
      {
        slug: "tf-idf", title: "단어의 무게, 문서의 거리", topic: "TF-IDF · 문서 유사도",
        summary: "고전 소설 여섯 편의 줄거리로 TF, IDF, TF-IDF를 계산해 문서마다 독특한 단어를 찾고, 문서를 벡터로 바꿔 코사인 유사도와 유클리드 거리로 문서 사이의 관계를 재 봅니다.",
        length: "5:56", scenes: 11, features: ["음성 해설", "장면별 실습", "놀이터", "퀴즈", "용어집", "파이썬 예제"],
        tags: ["텍스트 데이터"], thumb: "tf-idf/docs/poster.jpg", video: VIDEOS + "tf-idf.mp4"
      },
      {
        slug: "sentiment-analysis", title: "글에 담긴 마음", topic: "감정분석",
        summary: "감성 사전과 부정·강조·대조 규칙으로 점수를 매기는 법, 나이브 베이즈로 서평에서 낱말의 무게를 배우는 법, 시험 데이터로 정확도를 재는 법, 흥부전의 감정 곡선까지 따라갑니다.",
        length: "5:26", scenes: 10, features: ["음성 해설", "장면별 실습", "놀이터", "퀴즈", "용어집", "파이썬 예제"],
        tags: ["텍스트 데이터"], thumb: "sentiment-analysis/docs/poster.jpg", video: VIDEOS + "sentiment-analysis.mp4"
      }
    ]
  };

  var P = window.Page;
  var esc = P.esc, lang = P.lang;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  function abs(u) { return !u ? "" : /^https?:\/\//.test(u) ? u : BASE + String(u).replace(/^\.?\//, ""); }

  var T = {
    ko: {
      count: function (n) { return n + "개"; },
      meta: function (len, sc) { return "영상 " + len + " · 장면 " + sc + "개"; },
      open: "인터랙티브로 보기", video: "MP4 내려받기", videoTip: "GitHub Releases에서 영상 파일을 내려받습니다"
    },
    en: {
      count: function (n) { return String(n); },
      meta: function (len, sc) { return "Video " + len + " · " + sc + " scenes"; },
      open: "Open interactive", video: "Download MP4", videoTip: "Downloads the video file from GitHub Releases"
    }
  };
  var PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z"/></svg>';
  var DOWNLOAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>';

  function card(t) {
    var s = T[lang()];
    var url = BASE + t.slug + "/index.html";
    return '<li class="tut-card">' +
      '<a class="tut-thumb" href="' + esc(url) + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">' +
        (t.thumb ? '<img src="' + esc(abs(t.thumb)) + '" alt="" loading="lazy" width="1280" height="720">' : "") +
        '<span class="tut-glyph">' + esc(t.topic) + "</span>" +
        '<span class="tut-len">' + esc(t.length) + "</span></a>" +
      '<div class="tut-body">' +
        '<p class="tut-topic">' + esc(t.topic) + (t.tags && t.tags.length ? '<span class="tut-tag">' + esc(t.tags.join(" · ")) + "</span>" : "") + "</p>" +
        '<h3><a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(t.title) + "</a></h3>" +
        '<p class="tut-sum">' + esc(t.summary) + "</p>" +
        '<p class="tut-meta">' + esc(s.meta(t.length, t.scenes)) + "</p>" +
        '<ul class="tut-feats">' + (t.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<div class="tut-card-actions">' +
          '<a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">' + PLAY + esc(s.open) + " ↗</a>" +
          (t.video ? '<a class="btn ghost" href="' + esc(abs(t.video)) + '" title="' + esc(s.videoTip) + '">' + DOWNLOAD + esc(s.video) + "</a>" : "") +
        "</div>" +
      "</div></li>";
  }

  function render() {
    var cat = window.DH_CATALOG && window.DH_CATALOG.tutorials && window.DH_CATALOG.tutorials.length ? window.DH_CATALOG : FALLBACK;
    var grid = $("#tut-grid");
    grid.innerHTML = cat.tutorials.map(card).join("");
    $$(".tut-thumb img", grid).forEach(function (img) {
      function fail() { img.parentNode.classList.add("no-img"); }
      if (img.complete && !img.naturalWidth) fail();
      img.addEventListener("error", fail);
    });
    $("#tut-count").textContent = T[lang()].count(cat.tutorials.length);
  }
  window.DHT = { render: render };
  P.onLang(render);
})();
