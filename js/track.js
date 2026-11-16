// 이용 기록(2026-11-16). 쿠키 없음.
// - 지금부터: 다른 사이트로 나가는 링크(플레이 스토어·쇼핑몰 등)를 누르면 구글 애널리틱스에 click_out 이벤트(개인정보처리방침 9항의 방문 통계)
// - 2026-11-23 0시부터: 연 쪽·누른 링크와 버튼을 물길 성과판(비공개)에도 남긴다(개인정보처리방침 10항, 그날 시행).
(function () {
  var ON = Date.now() >= Date.parse("2026-11-23T00:00:00+09:00");
  var EP = "https://moolgil-admin.pages.dev/api/hit";
  var utm = location.search.indexOf("utm_") >= 0 ? location.search.slice(1, 160) : "";
  function send(o) {
    if (!ON) return;
    try {
      var b = JSON.stringify(o);
      if (!(navigator.sendBeacon && navigator.sendBeacon(EP, b))) fetch(EP, { method: "POST", body: b, keepalive: true, mode: "no-cors" });
    } catch (e) {}
  }
  send({ k: "view", p: location.pathname, r: document.referrer, u: utm });
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest("a[href], button");
    if (!a) return;
    var abs = a.href || "";
    var label = (a.getAttribute("aria-label") || a.innerText || a.getAttribute("title") || "").trim().replace(/\s+/g, " ").slice(0, 60);
    send({ k: "click", p: location.pathname, t: abs, l: label, r: document.referrer, u: utm });
    if (window.gtag && abs && a.host && a.host !== location.host) {
      gtag("event", "click_out", { link_url: abs, link_domain: a.host, link_text: label });
    }
  }, true);
})();
