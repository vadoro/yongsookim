/* 모든 페이지가 함께 쓰는 '맨 위로' 단추 (영어 튜토리얼 · DH 튜토리얼 사이트와 같은 동작).
 * 한 화면쯤 내려가면 오른쪽 아래에 나타나고, 누르면 페이지 맨 위로 올라갑니다.
 * 페이지가 짧아 한 화면만큼 내려갈 수 없으면, 내려갈 수 있는 거리의 절반(최소 400px)에서 나타납니다.
 * 넓은 화면에서는 화살표 + 글자, 휴대폰 너비에서는 화살표만 있는 동그란 단추입니다(모양은 style.css의 .to-top).
 * 키보드로 누르면 맨 위의 제목(h1)으로 초점도 옮깁니다. */
(function () {
  "use strict";

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.tabIndex = -1;
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '<span class="to-top-t"><span data-lang="ko">맨 위로</span><span data-lang="en">Back to top</span></span>';
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

  var queued = false;
  function sync() {
    queued = false;
    var room = document.documentElement.scrollHeight - window.innerHeight;
    var on = window.scrollY > Math.max(400, Math.min(window.innerHeight * 0.9, room / 2));
    btn.classList.toggle("on", on);
    btn.tabIndex = on ? 0 : -1;
    if (!on && document.activeElement === btn) btn.blur();
  }
  window.addEventListener("scroll", function () { if (!queued) { queued = true; requestAnimationFrame(sync); } }, { passive: true });
  window.addEventListener("resize", sync);

  btn.addEventListener("click", function (e) {
    window.scrollTo({ top: 0, behavior: reduce && reduce.matches ? "auto" : "smooth" });
    /* 키보드로 눌렀으면(e.detail === 0) 맨 위 제목으로 초점을 옮김 — 사라지는 단추에 초점이 남지 않게 */
    if (e.detail === 0) {
      var h = document.querySelector("h1");
      if (h) { if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
  });

  document.body.appendChild(btn);
  sync();
})();
