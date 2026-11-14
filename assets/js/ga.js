/* 구글 애널리틱스(GA4) 방문 통계 — 모든 페이지의 <head>에서 불러옵니다.
 * 사이트 주소(HOSTS)에서 연 페이지만 셉니다. 내 컴퓨터에서 연 파일, localhost,
 * Vercel 미리보기 주소는 세지 않습니다. 도메인을 새로 붙이면 HOSTS에 더하세요.
 * 통계는 https://analytics.google.com 에서 봅니다. */
(function () {
  "use strict";
  var ID = "G-9W6JM2ECKR";
  var HOSTS = ["yongsookim.vercel.app"];
  if (HOSTS.indexOf(location.hostname) < 0) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ID);
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);
})();
