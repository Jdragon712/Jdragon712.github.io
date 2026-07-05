/**
 * GitHub Pages 서브경로·로컬 모두에서 상대 경로가 동작하도록 <base> 설정
 * (CSP 적용을 위해 index.html 인라인 스크립트 대신 외부 파일)
 */
(function () {
  var p = location.pathname || "/";
  if (/\.html?$/i.test(p)) p = p.slice(0, p.lastIndexOf("/") + 1);
  else if (!/\/$/.test(p)) p += "/";
  var b = document.createElement("base");
  b.href = p;
  document.head.appendChild(b);
})();