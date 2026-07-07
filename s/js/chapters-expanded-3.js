/* global window, STUDY_TMPL */
window.STUDY_EXPANDED_3 = [
  {
    id: "e25-monthly-update",
    title: "운영 — 월간 데이터 갱신 절차",
    keywords: "update monthly data-as-of deploy",
    lead: "공개 업무추진비가 갱신되면 Extract 이후 파이프라인을 재실행하고, 필요 시 GitHub Pages에 배포합니다. 월간 운영의 핵심은 「데이터를 최신화한 뒤 로컬에서 검증하고, 그다음 공개 URL에 반영한다」는 순서를 지키는 것입니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "update.sh가 fetch와 enhance를 오케스트레이션하는 방식을 설명할 수 있습니다",
        "--data-as-of, --deploy 옵션의 사용자·운영 의미를 구분하여 설명할 수 있습니다",
        "데이터 갱신과 배포(deploy)의 차이를 한 문장으로 말할 수 있습니다",
      ]) +
      STUDY_TMPL.prereq(["Part 2 · ETL 8단계(12장) 이해"]) +
      `
      <h2 class="study-h2">월간 갱신 워크플로</h2>
      <p class="study-p">정부·기관 게시판에 신규 업무추진비 raw 파일이 올라오면, 지도에 반영하려면 <strong>Extract(수집)</strong> 이후 단계를 다시 돌려야 합니다. Hermes의 <code>update.sh</code>는 <code>fetch</code>(raw 수집)와 <code>enhance</code>(normalize 이후 6단계 일괄 실행)를 <strong>하나의 진입점</strong>으로 묶어 월간 운영을 단순화합니다.</p>
      <p class="study-p">아래 세 가지 호출 방식은 같은 스크립트이며, 옵션만 다릅니다. 옵션 없이 실행하면 기본 기준일로 갱신하고, <code>--data-as-of</code>로 사용자에게 보여 줄 기준일을 명시하며, <code>--deploy</code>를 붙이면 갱신 후 GitHub Pages까지 푸시합니다.</p>
      <pre class="study-code">bash ~/hermes-restaurant-update.sh
bash ~/hermes-restaurant-update.sh --data-as-of 2026-06-30
bash ~/hermes-restaurant-update.sh --data-as-of 2026-06-30 --deploy</pre>
      <h2 class="study-h2">단계별로 무엇이 바뀌는가</h2>
      <table class="study-table">
        <tr><th>단계</th><th>갱신되는 산출물</th><th>브라우저에서 확인</th></tr>
        <tr><td>fetch만</td><td><code>data/raw/</code></td><td>지도 UI 변화 없음</td></tr>
        <tr><td>enhance(또는 update의 후반)</td><td><code>data/export/</code>, <code>web/data/</code></td><td>로컬 미리보기에서 마커·목록 갱신</td></tr>
        <tr><td>publish / --deploy</td><td>원격 gh-pages(또는 Pages 소스)</td><td>github.io URL에서 동일 스냅샷 표시</td></tr>
      </table>
      ` +
      STUDY_TMPL.glossary([
        ["data-as-of", "지도 푸터·manifest.json에 표시되는 「이 데이터가 어느 시점까지 반영되었는가」를 나타내는 기준일 메타데이터입니다. 사용자 신뢰와 재현 가능성의 핵심입니다.", "데이터 기준일"],
        ["--deploy", "로컬에서 검증이 끝난 web/ 디렉터리를 GitHub Pages에 푸시하여 공개 URL을 갱신하는 옵션입니다. 데이터 처리와 원격 반영을 한 번에 수행합니다.", "배포 옵션"],
        ["enhance", "normalize 이후 geocode·집계·export·sync 등 6단계를 순서대로 실행하는 Hermes 래퍼 스크립트입니다. raw만 있고 enhance를 생략하면 지도 JSON은 갱신되지 않습니다.", "후처리 일괄 실행"],
        ["오케스트레이션", "여러 스크립트를 정해진 순서와 환경에서 자동으로 이어 실행하는 것입니다. update.sh가 fetch와 enhance를 오케스트레이션합니다.", "작업 순서 조율"],
      ]) +
      STUDY_TMPL.concept(
        "갱신 vs 배포 (update vs publish)",
        "<p><strong>데이터 갱신</strong>은 로컬 프로젝트의 <code>data/export/</code>와 <code>web/data/</code>를 최신 스냅샷으로 맞추는 작업입니다. <strong>배포(deploy)</strong>는 그 결과물 중 공개 대상인 <code>web/</code>만 원격 정적 호스팅(GitHub Pages)에 올리는 작업입니다.</p><p>권장 순서는 <code>update</code> → 로컬 <code>open.sh</code>로 UI·manifest의 <code>data_as_of</code> 확인 → 문제 없을 때 <code>publish.sh</code> 또는 <code>--deploy</code>입니다. 배포 전 검증(verify)을 생략하면 공개 URL에 잘못된 스냅샷이 노출될 수 있습니다.</p>"
      ) +
      STUDY_TMPL.pitfalls([
        "fetch만 실행하고 enhance를 생략하면 raw는 늘어나지만 <code>web/data/restaurants.map.json</code>은 이전 버전 그대로이므로, 지도는 갱신되지 않은 것처럼 보입니다.",
        "<code>--data-as-of</code>를 실제 raw 반영 기간과 다르게 지정하면 푸터·manifest와 사용자 기대가 어긋나 신뢰가 떨어집니다. 기준일은 운영 메모와 함께 기록하는 것이 좋습니다.",
        "update.sh와 publish.sh를 혼동하기 쉽습니다. update는 주로 데이터 파이프라인이고, publish는 web/만 원격에 반영합니다. --deploy는 둘을 연속 실행하는 편의 옵션입니다.",
      ]) +
      STUDY_TMPL.checkpoint("update.sh와 publish.sh의 차이를 한 문장으로 설명할 수 있습니까?") +
      STUDY_TMPL.recap("월간 운영의 중심은 update.sh입니다. 기준일을 지정한 뒤 로컬에서 검증하고, 필요할 때만 --deploy 또는 publish.sh로 공개 URL을 갱신합니다."),
  },
  {
    id: "e26-shell-cheatsheet",
    title: "Hermes CLI 참조 — 핵심 명령 6개",
    keywords: "hermes doctor open update enhance",
    lead: "Hermes CLI는 반복되는 파이프라인·미리보기·배포 작업을 쉘 스크립트 하나로 표준화한 진입점입니다. 일상 운영에서는 아래 6개만 먼저 익혀도 대부분의 상황을 처리할 수 있습니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "6개 Hermes 스크립트의 책임 범위를 표로 정리할 수 있습니다",
        "장애 발생 시 doctor를 1차 진단으로 실행할 수 있습니다",
        "상황에 맞는 스크립트(fetch / enhance / update / publish)를 선택할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">CLI(Command-Line Interface)란</h2>
      <p class="study-p"><strong>CLI</strong>는 터미널에 명령을 입력해 프로그램을 실행하는 방식입니다. Hermes 스크립트는 긴 Python 경로·venv 활성화·작업 디렉터리 이동을 스크립트 안에 캡슐화하여, 문서에 적힌 한 줄과 실제 실행이 일치하도록 합니다.</p>

      <h2 class="study-h2">명령 참조표</h2>
      <table class="study-table">
        <tr><th>스크립트</th><th>ETL 단계</th><th>용도</th><th>실행 후 확인</th></tr>
        <tr><td><code>hermes-restaurant-doctor.sh</code></td><td>진단</td><td>venv, API 키, 경로, JSON 존재 여부를 OK/NG로 점검합니다</td><td>터미널 OK/NG 목록</td></tr>
        <tr><td><code>hermes-restaurant-open.sh</code></td><td>미리보기</td><td>로컬 HTTP 서버(포트 5173)로 <code>web/</code> 정적 호스팅 후 브라우저를 엽니다</td><td><code>127.0.0.1:5173</code></td></tr>
        <tr><td><code>hermes-restaurant-fetch.sh</code></td><td>Extract</td><td>업무추진비 raw를 <code>data/raw/</code>에 수집합니다</td><td>raw 파일 개수·날짜</td></tr>
        <tr><td><code>hermes-restaurant-enhance.sh</code></td><td>Transform+Load</td><td>raw 이후 normalize~sync 6단계를 일괄 실행합니다</td><td>export·web/data 갱신</td></tr>
        <tr><td><code>hermes-restaurant-update.sh</code></td><td>오케스트레이션</td><td>fetch + enhance를 연속 실행합니다(월간 갱신 진입점)</td><td>manifest data_as_of</td></tr>
        <tr><td><code>hermes-restaurant-publish.sh</code></td><td>배포</td><td><code>web/</code>만 GitHub Pages에 푸시합니다</td><td>github.io URL</td></tr>
      </table>

      <h2 class="study-h2">상황별 빠른 선택</h2>
      <ul class="study-ul">
        <li><strong>처음 환경을 점검할 때</strong> — doctor</li>
        <li><strong>지도 UI만 빠르게 볼 때</strong>(export가 이미 있을 때) — open (또는 Lab B의 sync 후 open)</li>
        <li><strong>게시판에 새 raw가 올라왔을 때</strong> — update 또는 fetch → enhance</li>
        <li><strong>로컬 검증 후 공개 사이트를 맞출 때</strong> — publish</li>
      </ul>
      ` +
      STUDY_TMPL.glossary([
        ["doctor", "프로젝트 실행에 필요한 venv, API 키 파일, JSON 경로 등을 사전 점검하는 진단 스크립트입니다. CI의 pre-flight check와 같은 역할을 합니다.", "환경 진단"],
        ["pre-flight check", "본 작업 전에 환경·의존성·필수 파일을 검사하는 절차입니다. doctor가 이에 해당합니다.", "사전 점검"],
        ["bash", "macOS Terminal에서 쉘 스크립트(.sh)를 실행할 때 사용하는 명령입니다. <code>bash ~/hermes-restaurant-open.sh</code> 형태로 호출합니다.", "셸 실행"],
      ]) +
      STUDY_TMPL.tip("전체 Hermes 스크립트 목록은 <code>ls ~/hermes-restaurant-*.sh</code>로 확인할 수 있습니다. setup, verify 등 보조 스크립트도 있으며, 본 교재에서는 위 6개를 핵심으로 다룹니다.") +
      STUDY_TMPL.recap("doctor·open·fetch·enhance·update·publish — 진단, 미리보기, 수집, 변환·적재, 월간 갱신, 배포의 표준 진입점입니다."),
  },
  {
    id: "e27-html-basics",
    title: "HTML 문서 구조 — index.html 스켈레톤",
    keywords: "HTML index.html semantic",
    lead: "HTML(HyperText Markup Language)은 웹 페이지의 골격을 정의하는 마크업 언어입니다. 본 프로젝트는 서버 없이 정적 HTML 파일에 JavaScript가 JSON 데이터를 불러와 DOM을 채우는 구조를 사용합니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "HTML이 구조(semantic markup)만 담당함을 설명할 수 있습니다",
        "web/index.html의 핵심 컨테이너 id와 각 역할을 열거할 수 있습니다",
        "HTML·CSS·JavaScript의 관심사 분리를 한 문장으로 설명할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "관심사 분리 (Separation of Concerns)",
        "<p><strong>HTML</strong>은 제목, 목록, 지도가 들어갈 <strong>영역(구조)</strong>만 정의합니다. <strong>CSS</strong>(Cascading Style Sheets)는 색·간격·반응형 레이아웃 등 <strong>표현</strong>을 담당합니다. <strong>JavaScript</strong>는 JSON을 fetch하고 지도 API와 연결하는 <strong>동작·데이터 바인딩</strong>을 담당합니다. MDN·W3C가 권장하는 3계층 분리와 동일한 패턴입니다.</p><p>이렇게 나누면 디자인 변경 시 CSS만, 데이터 로직 변경 시 JS만 수정하면 되어 유지보수가 쉬워집니다.</p>"
      ) +
      `
      <h2 class="study-h2">DOM(Document Object Model)이란</h2>
      <p class="study-p">브라우저는 HTML을 파싱하여 <strong>DOM</strong> 트리를 만듭니다. JavaScript는 <code>document.getElementById()</code> 등으로 DOM 노드를 찾아 내용·속성을 바꿉니다. 지도 마커·식당 목록은 초기 HTML에 하드코딩되지 않고, 런타임에 JS가 DOM을 갱신합니다.</p>

      <h2 class="study-h2">주요 DOM 노드 (web/index.html)</h2>
      <table class="study-table">
        <tr><th>선택자</th><th>역할</th><th>JS 연동</th></tr>
        <tr><td><code>#map</code></td><td>지도 타일·마커가 그려지는 뷰포트(화면 영역)입니다</td><td>Kakao Maps / Leaflet이 이 div에 렌더링합니다</td></tr>
        <tr><td><code>#venue-drawer</code></td><td>식당 목록·상세 정보가 표시되는 사이드 패널(드로어)입니다</td><td>마커 클릭 시 목록·상세 HTML을 주입합니다</td></tr>
        <tr><td><code>footer</code></td><td>데이터 출처, data_as_of 기준일, 면책 고지를 표시합니다</td><td>manifest·설정 값을 반영해 텍스트를 채웁니다</td></tr>
      </table>
      <p class="study-p">파일 경로: <code>web/index.html</code>. 스크립트는 문서 하단에서 <code>config.js</code>(API 키·상수), <code>app.js</code>(애플리케이션 진입점) 순으로 로드됩니다. 스크립트를 body 끝에 두는 이유는 DOM이 준비된 뒤 JS가 실행되도록 하기 위함입니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["HTML", "웹 문서의 구조를 태그로 표현하는 마크업 언어입니다. 본 프로젝트에서는 지도·목록이 들어갈 빈 컨테이너를 정의합니다.", "초월문자표시언어"],
        ["DOM", "HTML 문서를 브라우저가 객체 트리로 표현한 모델입니다. JavaScript가 이 트리를 읽고 수정합니다.", "문서 객체 모델"],
        ["semantic markup", "div 남용 대신 header, footer, main 등 의미 있는 태그로 구조를 표현하는 방식입니다. 접근성·유지보수에 유리합니다.", "의미 있는 마크업"],
      ]) +
      STUDY_TMPL.pitfalls([
        "HTML 파일만 수정했을 때는 Python 파이프라인을 다시 돌릴 필요가 없습니다. 브라우저 새로고침으로 충분합니다.",
        "id 선택자(<code>#map</code>) 이름을 바꾸면 app.js의 querySelector와 불일치하여 지도가 비어 보일 수 있습니다. 구조 변경 시 JS도 함께 확인해야 합니다.",
      ]) +
      STUDY_TMPL.demo("web-stack", "HTML → CSS → JS를 순서대로 켜며 마커 클릭 반응이 달라지는지 확인합니다.") +
      STUDY_TMPL.recap("HTML은 DOM 골격입니다. #map, #venue-drawer, footer가 지도 UI의 뼈대이며, 실제 데이터는 JavaScript가 런타임에 채웁니다."),
  },
  {
    id: "e28-css-basics",
    title: "CSS 스타일시트 — presentation layer",
    keywords: "CSS style.css responsive",
    lead: "CSS는 글꼴, 색상, 여백, z-index, 미디어 쿼리 등 시각적 표현을 담당하는 presentation layer입니다. 기능 로직이나 데이터 처리는 포함하지 않습니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "CSS가 presentation layer임을 설명할 수 있습니다",
        "style.css의 주요 관심 영역(드로어, 티어 색, 토스트, 반응형)을 나열할 수 있습니다",
        "CSS만 변경했을 때 파이프라인 재실행이 불필요한 이유를 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">CSS가 하는 일</h2>
      <p class="study-p">HTML이 「어디에 무엇이 있는가」를 정의한다면, CSS는 「그것이 어떻게 보이는가」를 정의합니다. 본 프로젝트의 <code>web/css/style.css</code>는 지도 위에 겹치는 UI(드로어, 토스트, 범례)의 레이아웃과 티어별 마커 색상을 한곳에서 관리합니다.</p>

      <h2 class="study-h2">스타일시트 구조 (web/css/style.css)</h2>
      <ul class="study-ul">
        <li><strong>드로어(venue-drawer)</strong> — 너비, 스크롤, z-index로 지도 위 패널이 가리지 않고 읽히도록 합니다</li>
        <li><strong>티어 마커 색상</strong> — visit_count 구간별 CSS 변수·범례 스타일로 지도에서 빈도를 색으로 구분합니다</li>
        <li><strong>토스트·로딩</strong> — fetch 중 「로딩중…」 등 사용자 피드백 UI의 위치·애니메이션을 정의합니다</li>
        <li><strong>미디어 쿼리(media query)</strong> — 화면 너비에 따라 모바일·태블릿에서 드로어·지도 비율을 조정합니다</li>
      </ul>

      <h2 class="study-h2">캐시와 강력 새로고침</h2>
      <p class="study-p">브라우저는 CSS 파일을 캐시에 저장해 재방문 시 빠르게 불러옵니다. style.css를 수정했는데 화면이 안 바뀌면 <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>(강력 새로고침)으로 캐시를 무시하고 최신 파일을 받아야 합니다. index.html의 <code>?v=</code> 쿼리(cache busting)도 배포 시 함께 올려야 합니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["CSS", "HTML 요소의 색·크기·배치를 규칙으로 지정하는 스타일시트 언어입니다. 본 프로젝트에서는 web/css/style.css 한 파일이 UI 표현의 중심입니다.", "종속형 스타일시트"],
        ["presentation layer", "데이터·로직과 분리된 「보이는 방식」 계층입니다. CSS가 이 계층을 담당합니다.", "표현 계층"],
        ["media query", "화면 너비·해상도 등 조건에 따라 다른 CSS 규칙을 적용하는 문법입니다. 반응형(responsive) 레이아웃의 기본입니다.", "미디어 쿼리"],
        ["z-index", "겹치는 요소의 앞뒤 순서(층)를 숫자로 지정하는 CSS 속성입니다. 드로어가 지도 컨트롤 위에 오도록 설정합니다.", "쌓임 순서"],
      ]) +
      STUDY_TMPL.tip("스타일 변경 후 <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>(강력 새로고침)으로 캐시를 무시하고 확인하세요. 로컬 open.sh 환경에서도 동일합니다.") +
      STUDY_TMPL.pitfalls([
        "CSS만 수정할 때는 ETL 파이프라인 재실행이 필요 없습니다. 저장 후 브라우저 새로고침만 하면 됩니다.",
        "인라인 style 속성을 HTML에 남발하면 style.css와 규칙이 분산되어 유지보수가 어려워집니다. 본 프로젝트는 외부 style.css를 사용합니다.",
        "티어 색을 CSS만 바꾸고 app.js의 티어 구간 상수는 그대로 두면 범례 설명과 실제 색 의미가 어긋날 수 있습니다.",
      ]) +
      STUDY_TMPL.recap("CSS는 표현 계층입니다. web/css/style.css에서 드로어·티어·토스트·반응형을 정의하며, 변경 시 브라우저 새로고침으로 확인합니다."),
  },
  {
    id: "e29-js-basics",
    title: "클라이언트 JavaScript — 데이터 바인딩",
    keywords: "JavaScript app.js fetch JSON",
    lead: "JavaScript는 사용자 브라우저에서 실행되는 클라이언트 측 언어입니다. 정적 호스팅된 JSON을 fetch API로 불러와 파싱하고, 지도 SDK와 DOM을 연결하여 마커·목록 UI를 그립니다. ETL은 서버(Python) 측에서 끝난 뒤, 브라우저는 결과 JSON만 소비합니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "클라이언트 측 데이터 흐름(fetch → parse → render)을 설명할 수 있습니다",
        "app.js가 애플리케이션 진입점(entry point)임을 설명할 수 있습니다",
        "SPA(경량) 패턴이 본 지도 UI에 어떻게 적용되는지 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">왜 서버 없이 동작하는가</h2>
      <p class="study-p">GitHub Pages는 HTML·CSS·JS·JSON 파일만 제공하는 <strong>정적 호스팅</strong>입니다. 따라서 식당 목록 조회·필터링·지도 마커 생성은 모두 브라우저 안의 JavaScript가 담당합니다. Python ETL이 미리 만들어 둔 <code>web/data/restaurants.map.json</code>이 「API 응답」 역할을 합니다.</p>

      <h2 class="study-h2">런타임 파이프라인 (브라우저)</h2>
      <pre class="study-code">fetch("data/restaurants.map.json")
  → Response를 JSON으로 파싱 → restaurants[] 배열
  → 좌표 해석 · 중복 병합(merge)
  → buildMapMarkerItems() — MIN_MAP_VISITS 필터 · 티어 색
  → 지도에 마커 렌더링
  → 마커 클릭 → openMarkerDrawer() — 목록·상세 DOM 갱신</pre>
      <p class="study-p">진입점 파일은 <code>web/js/app.js</code>입니다. 페이지 로드 시 fetch가 완료될 때까지 로딩 토스트를 보여 주고, 실패 시 사용자에게 오류 메시지를 표시하는 흐름도 여기서 처리합니다.</p>

      <h2 class="study-h2">config.js와의 분리</h2>
      <p class="study-p"><code>web/js/config.js</code>에는 Kakao JavaScript 키, 지도 초기 중심 좌표, 공개 상수 등 환경별로 바뀔 수 있는 설정이 모여 있습니다. app.js는 비즈니스 로직(필터·마커·드로어)에 집중하고, config는 배포 환경 차이를 흡수합니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["JavaScript", "브라우저에서 HTML·CSS와 함께 동작하며 DOM 조작·네트워크 요청을 수행하는 스크립트 언어입니다. 본 프로젝트의 지도 상호작용 전부가 여기서 실행됩니다.", "자바스크립트"],
        ["JSON", "JavaScript Object Notation. 키·값 쌍으로 데이터를 표현하는 텍스트 형식입니다. restaurants.map.json이 이 형식입니다.", "자바스크립트 객체 표기"],
        ["fetch API", "브라우저 내장 HTTP 클라이언트입니다. 정적 호스팅에서도 상대 경로로 JSON 파일을 비동기 로드할 수 있습니다.", "데이터 가져오기 API"],
        ["SPA (경량)", "Single Page Application. 페이지 전체를 새로 고치지 않고 JavaScript가 DOM만 갱신하는 패턴입니다. 본 지도는 전통적인 멀티 페이지가 아닌 경량 SPA에 가깝습니다.", "단일 페이지 앱"],
        ["entry point", "프로그램 실행이 시작되는 파일·함수입니다. 브라우저 관점에서 app.js가 애플리케이션 진입점입니다.", "진입점"],
      ]) +
      STUDY_TMPL.pitfalls([
        "JSON 경로가 잘못되면 fetch가 404를 반환하고 지도가 비어 보입니다. Network 탭에서 restaurants.map.json 요청 상태를 먼저 확인하세요.",
        "app.js만 수정했을 때도 파이프라인 재실행은 필요 없습니다. 다만 JSON 스키마를 바꿨다면 export·sync와 JS 파싱 코드를 함께 맞춰야 합니다.",
      ]) +
      STUDY_TMPL.demo("json-map", "JSON 레코드를 클릭하면 fetch 이후 지도에서 해당 마커가 강조되는 흐름을 확인합니다.") +
      STUDY_TMPL.recap("JavaScript는 fetch → 변환 → 마커·드로어 렌더링을 수행합니다. 진입점은 web/js/app.js이며, 데이터 소스는 ETL이 만든 정적 JSON입니다."),
  },
  {
    id: "e30-marker-rules",
    title: "지도 마커 정책 — 필터·티어·클러스터",
    keywords: "MIN_MAP_VISITS 티어 마트",
    lead: "지도 가독성과 서비스 범위를 위해 마커 표시 조건을 app.js 상수로 고정합니다. 방문 횟수 임계값, 티어 색상, 40m 클러스터, 비식당 제외 규칙을 이해하면 지도가 「왜 이렇게 보이는지」를 설명할 수 있습니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "MIN_MAP_VISITS=10 임계값의 목적을 설명할 수 있습니다",
        "마트·편의점 등 비식당 제외 규칙의 의도를 설명할 수 있습니다",
        "1~5티어 색상과 40m 클러스터(무지개 마커)의 의미를 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">정책이 코드에 있는 이유</h2>
      <p class="study-p">모든 식당을 무조건 지도에 찍으면 저빈도·비식음료 업체까지 포함되어 지도가 복잡해집니다. 본 서비스는 「공직자 단골 식당」에 초점을 맞추므로, <strong>방문 횟수 하한</strong>과 <strong>업종 필터</strong>로 노이즈를 줄입니다. 정책 변경 시에는 주로 <code>web/js/app.js</code> 상수·함수를 수정합니다.</p>

      <h2 class="study-h2">표시 정책 요약</h2>
      <table class="study-table">
        <tr><th>규칙</th><th>구현(개념)</th><th>사용자에게 보이는 효과</th></tr>
        <tr><td>방문 10회 이상 (<code>MIN_MAP_VISITS</code>)</td><td>visit_count_total이 임계값 미만이면 마커·목록에서 제외</td><td>저빈도 업체가 사라져 지도 밀도가 관리됩니다</td></tr>
        <tr><td>1~5티어 색상</td><td>visit_count 구간별로 마커 색·범례 티어 매핑</td><td>단골 빈도를 색으로 한눈에 구분합니다</td></tr>
        <tr><td>40m 이내 겹침 → 무지개 마커</td><td>근접 좌표 마커를 클러스터(cluster)로 묶음</td><td>단골 밀집 구역을 하나의 마커로 표현합니다</td></tr>
        <tr><td>마트·편의점·유통 브랜드 제외</td><td>업종·브랜드 키워드 블록리스트</td><td>식음료 업체 중심 범위를 유지합니다</td></tr>
      </table>

      <h2 class="study-h2">목록과 지도의 일관성</h2>
      <p class="study-p">필터는 지도 마커뿐 아니라 사이드 목록에도 동일하게 적용됩니다. MIN_MAP_VISITS를 낮추면 마커 수가 늘고 성능·가독성이 나빠질 수 있고, 높이면 「있을 법한 식당」이 안 보일 수 있습니다. 운영·기획 결정이므로 변경 시 로컬에서 반드시 미리보기합니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["MIN_MAP_VISITS", "지도·목록에 표시할 최소 방문 횟수 임계값 상수입니다. 기본 10회 미만 업체는 숨깁니다.", "최소 방문 횟수"],
        ["tier", "visit_count 구간별로 나눈 시각적 등급(1~5티어)입니다. 색상·범례와 연결됩니다.", "티어·등급"],
        ["cluster", "지도에서 가까운 여러 마커를 하나의 표시로 묶는 기법입니다. 40m 이내 겹침 시 무지개 마커로 표현합니다.", "클러스터·군집"],
        ["visit_count_total", "집계 기간 동안 해당 업체에 대한 방문 횟수 합계입니다. 금액 필드는 공개 JSON에 없습니다.", "총 방문 횟수"],
      ]) +
      STUDY_TMPL.seeAlso([["app.js 상수 해설 (Module 51)", "#e51-appjs-constants"]]) +
      STUDY_TMPL.demo("marker-filter", "슬라이더로 MIN_MAP_VISITS를 바꾸며 마커 표시 조건을 확인합니다.") +
      STUDY_TMPL.recap("10회 이상, 티어 색, 40m 클러스터, 비식당 제외 — 네 가지 정책이 app.js 상수·함수로 정의되어 지도 UX를 결정합니다."),
  },
  {
    id: "e31-kakao-leaflet",
    title: "지도 렌더링 엔진 — Naver Map / Leaflet 폴백",
    keywords: "naver leaflet OSM 폴백",
    lead: "1차 지도 엔진은 Naver Maps JavaScript SDK이며, 초기화 실패 시 Leaflet과 OpenStreetMap(OSM) 타일로 graceful degradation합니다. 키·도메인 문제가 있어도 지도 자체는 비어 있지 않게 하는 가용성 우선 설계입니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "Kakao Maps와 Leaflet+OSM 엔진의 장단점을 비교 설명할 수 있습니다",
        "OSM만 표시되는 것이 폴백(fallback) 정상 동작일 수 있음을 설명할 수 있습니다",
        "graceful degradation이 본 서비스에서 어떻게 구현되는지 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">두 엔진 비교</h2>
      <table class="study-table">
        <tr><th>엔진</th><th>장점</th><th>요구사항</th><th>본 프로젝트에서의 역할</th></tr>
        <tr><td>Kakao Maps</td><td>국내 주소·POI 정밀도, 익숙한 한국 지도 스타일</td><td>JavaScript 키, Kakao 콘솔 도메인 화이트리스트</td><td>Primary(1차) 렌더링 엔진</td></tr>
        <tr><td>Leaflet + OSM</td><td>API 키 불필요, 오픈소스 타일</td><td>네트워크로 타일 서버 접근 가능</td><td>Fallback(2차) — Kakao 실패 시</td></tr>
      </table>

      <h2 class="study-h2">초기화 실패가 나는 대표 원인</h2>
      <ul class="study-ul">
        <li><code>web/js/config.js</code>의 JavaScript 키 오타·미설정</li>
        <li>Kakao Developers 콘솔에 <code>localhost:5173</code>, <code>jdragon712.github.io</code> 도메인 미등록</li>
        <li>네트워크·광고 차단으로 Kakao SDK 스크립트 로드 실패</li>
      </ul>
      <p class="study-p">위 경우 브라우저 콘솔에 Kakao 관련 오류가 보일 수 있으며, 화면에는 OSM 기반 지도가 표시됩니다. 이는 「완전 실패」가 아니라 의도된 폴백 경로입니다. 다만 운영 환경에서는 Kakao가 정상 동작하도록 키·도메인을 맞추는 것이 권장됩니다.</p>
      ` +
      STUDY_TMPL.concept(
        "Graceful degradation (우아한 성능 저하)",
        "<p>카카오 SDK 로드·초기화가 실패해도 서비스는 <strong>기능 저하 모드</strong>로 지도를 제공합니다. POI·타일 스타일은 달라질 수 있으나, 마커·목록·JSON 데이터는 동일하게 동작합니다. 운영 중 OSM만 보인다면 키·도메인 설정을 doctor와 Kakao 콘솔에서 점검해야 합니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["Kakao Maps SDK", "브라우저에서 카카오 지도 타일·오버레이를 그리는 JavaScript 라이브러리입니다. config.js의 JavaScript 키가 필요합니다.", "카카오 지도 SDK"],
        ["Leaflet", "가벼운 오픈소스 지도 라이브러리입니다. API 키 없이 타일 레이어를 올릴 수 있어 폴백 엔진으로 사용합니다.", "리플릿"],
        ["OpenStreetMap (OSM)", "전 세계 지도 데이터를 오픈 라이선스로 제공하는 프로젝트입니다. Leaflet 폴백 시 타일 배경으로 쓰입니다.", "오픈스트리트맵"],
        ["graceful degradation", "일부 구성요소 실패 시 전체 중단 대신 축소된 기능으로 서비스를 유지하는 설계 원칙입니다.", "우아한 성능 저하"],
        ["fallback", "주 경로 실패 시 대체로 사용하는 보조 경로·구현입니다. Kakao → Leaflet 순서가 이에 해당합니다.", "폴백·대체"],
      ]) +
      STUDY_TMPL.recap("Primary는 Kakao Maps, Fallback은 Leaflet+OSM입니다. OSM만 보이면 폴백이 동작 중일 수 있으며, 키·도메인 점검이 필요합니다."),
  },
  {
    id: "e32-github-pages",
    title: "정적 배포 — GitHub Pages",
    keywords: "GitHub Pages deploy publish",
    lead: "GitHub Pages는 GitHub 저장소의 정적 파일(HTML, CSS, JavaScript, JSON)만으로 웹 사이트를 호스팅하는 서비스입니다. 본 프로젝트는 web/ 디렉터리만 publish하여 공개 URL을 제공하며, 서버리스(serverless) 정적 배포 모델을 따릅니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "배포 아티팩트가 web/로 제한되는 이유를 설명할 수 있습니다",
        "로컬 미리보기 URL(127.0.0.1:5173)과 프로덕션 URL(github.io)을 구분할 수 있습니다",
        "publish.sh 실행 후 공개 사이트에서 확인할 항목을 나열할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">정적 배포란</h2>
      <p class="study-p"><strong>deploy(배포)</strong>는 로컬에서 검증한 산출물을 원격 호스팅에 올려 사용자가 접근할 수 있게 하는 과정입니다. GitHub Pages는 PHP·Python 서버 없이 파일만 서빙하므로, 본 지도 앱처럼 JSON+JS 구조에 적합합니다. 런타임에 서버가 DB를 조회하지 않습니다.</p>

      <h2 class="study-h2">배포 명령과 URL</h2>
      <pre class="study-code">bash ~/hermes-restaurant-publish.sh
<span class="cmt"># Production URL:</span>
https://jdragon712.github.io/sejong-official-restaurant-map/</pre>
      <p class="study-p"><strong>로컬 미리보기</strong>: <code>http://127.0.0.1:5173</code> — <code>open.sh</code>가 같은 <code>web/</code> 폴더를 띄웁니다. 배포 전에 여기서 마커·푸터·manifest와 동일한지 확인하는 것이 표준 절차입니다.</p>

      <h2 class="study-h2">배포에 포함되지 않는 것</h2>
      <ul class="study-ul">
        <li><code>scripts/</code>, <code>data/raw/</code>, <code>data/private/</code> — ETL·금액 데이터</li>
        <li><code>.env</code>, <code>kakao_keys.paste</code> — 비밀 API 키</li>
        <li>Python venv — 로컬 실행 환경 전용</li>
      </ul>
      <p class="study-p"><code>export_public.py</code>의 FORBIDDEN 키 린트와 .gitignore가 실수로 민감 파일이 web/에 섞이는 것을 막는 보조 장치입니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["GitHub Pages", "GitHub 저장소의 특정 브랜치·폴더를 정적 웹 사이트로 공개 호스팅하는 기능입니다. 본 프로젝트의 프로덕션 URL이 여기서 제공됩니다.", "깃허브 페이지스"],
        ["deploy", "로컬 산출물을 원격 환경에 반영하여 사용자가 접근할 수 있게 하는 행위입니다. publish.sh가 deploy를 자동화합니다.", "배포"],
        ["serverless", "운영자가 직접 서버 프로세스를 띄우지 않고 플랫폼이 정적 파일만 서빙하는 모델입니다. GitHub Pages가 이에 해당합니다.", "서버리스"],
        ["artifact", "빌드·파이프라인 결과로 배포 대상이 되는 파일 묶음입니다. 본 프로젝트에서는 web/ 디렉터리가 artifact입니다.", "산출물·아티팩트"],
      ]) +
      STUDY_TMPL.warn("scripts/, data/raw, data/private, .env, API 키 원본은 배포 대상에서 제외해야 합니다. export_public의 린트가 금액 키 유출을 보조 검사합니다.") +
      STUDY_TMPL.checkpoint("로컬 5173과 github.io가 같은 data_as_of를 보여야 하는 조건은 무엇입니까?") +
      STUDY_TMPL.recap("publish.sh는 web/만 GitHub Pages에 올립니다. 로컬 미리보기와 동일 스냅샷을 맞춘 뒤 배포하고, 푸터·manifest의 data_as_of로 동기화를 검증합니다."),
  },
  {
    id: "e33-ethics",
    title: "데이터 윤리 — 공개 범위와 면책",
    keywords: "면책 윤리 금액 출처",
    lead: "공공데이터를 활용한 서비스는 사실 표시, 출처 고지, 오해 방지 설계가 핵심입니다. 본 지도는 맛집 추천·평가가 아니라 방문 횟수 집계 사실을 보여 주며, 금액 비공개는 정책과 기술 린트가 함께 지킵니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "서비스가 평가·추천이 아닌 집계 사실 표시임을 설명할 수 있습니다",
        "금액 비공개의 정책적·기술적 근거를 설명할 수 있습니다",
        "푸터 메타데이터(기준일·출처)가 사용자 신뢰에 어떤 역할을 하는지 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">서비스가 하지 않는 것</h2>
      <p class="study-p">업무추진비 공개 자료는 「어디에 얼마나 자주 갔는가」에 대한 사실 기록입니다. 본 서비스는 이를 식음료 업체 단위로 집계해 지도에 올릴 뿐, 맛·품질·추천 순위를 제공하지 않습니다. 방문 횟수가 많다고 「좋은 식당」을 의미하지 않으며, 푸터·면책 문구로 이를 반복 고지합니다.</p>

      <h2 class="study-h2">공개 원칙</h2>
      <table class="study-table">
        <tr><th>공개</th><th>비공개</th><th>이유</th></tr>
        <tr><td>방문 횟수(집계)</td><td>금액·총액·건당 비용</td><td>금액은 「낭비」 프레이밍으로 왜곡되기 쉽고, 횟수만으로도 패턴 파악이 가능합니다</td></tr>
        <tr><td>기간·출처·data_as_of</td><td>직급·개인 식별</td><td>재현 가능성과 책임 있는 인용을 위해 출처를 명시합니다</td></tr>
        <tr><td>인허가 기반 위치</td><td>맛 평가·순위 해석 유도 UI</td><td>집계 사실과 소비자 리뷰 서비스를 구분합니다</td></tr>
      </table>

      <h2 class="study-h2">기술적 안전장치</h2>
      <ul class="study-ul">
        <li><code>export_public.py</code>의 <strong>FORBIDDEN</strong> 키 목록 — amount 등 금액 필드가 공개 JSON에 들어가면 빌드·린트 단계에서 차단합니다</li>
        <li><code>data/private/</code> — 금액 집계는 git·호스팅에서 제외됩니다</li>
        <li>푸터 — 데이터 기준일·원천 게시판 링크로 사용자가 원문을 추적할 수 있게 합니다</li>
      </ul>
      ` +
      STUDY_TMPL.glossary([
        ["visit_count", "특정 업체에 대한 방문 횟수 집계값입니다. 공개 JSON·지도 UI에 표시되는 핵심 지표이며 금액과는 별개입니다.", "방문 횟수"],
        ["FORBIDDEN keys", "export_public 단계에서 공개 JSON에 포함되면 안 되는 필드 이름 목록입니다. 금액 유출 방지 린트에 사용됩니다.", "금지 키 목록"],
        ["면책(disclaimer)", "데이터 한계·오해 방지를 사용자에게 알리는 고지 문구입니다. 푸터에 표시됩니다.", "면책 고지"],
        ["출처(attribution)", "데이터의 원 게시판·기관을 명시하는 것입니다. 공공데이터 이용 윤리의 기본입니다.", "출처 표기"],
      ]) +
      STUDY_TMPL.recap("방문 횟수만 공개하고 출처·기준일을 명시합니다. 평가·추천 서비스가 아니며, 금액 비공개는 정책과 export_public 린트로 기술적으로 뒷받침됩니다."),
  },
  {
    id: "e34-ai-agent",
    title: "AI 보조 개발 — 역할과 한계",
    keywords: "AI agent 프롬프트",
    lead: "LLM(Large Language Model) 기반 AI 에이전트는 반복 자동화, 문서 초안, 스크립트 보일러플레이트 작성에 유효합니다. 다만 배포 승인, 공개 범위 정책, 데이터 해석의 최종 책임은 항상 운영자(사람)에게 있습니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "AI에 위임하기 적합한 작업과 부적합한 작업을 구분할 수 있습니다",
        "효과적인 프롬프트 구조(목표·경로·검증)를 작성할 수 있습니다",
        "AI 출력을 검증 없이 배포하면 안 되는 이유를 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">AI가 잘하는 일</h2>
      <p class="study-p">명령어·파일 경로·기대 출력이 분명한 작업은 AI가 빠르게 실행 계획을 제시하거나 스크립트를 생성합니다. 예: 「<code>--data-as-of 2026-06-30</code>으로 update 실행 후 doctor로 OK 확인」처럼 <strong>목표·경로·검증</strong>이 포함된 지시는 성공률이 높습니다.</p>

      <h2 class="study-h2">적합 vs 부적합</h2>
      <table class="study-table">
        <tr><th>적합</th><th>부적합</th><th>이유</th></tr>
        <tr><td>「data-as-of 2026-06-30으로 update 후 doctor 실행」</td><td>「지도가 안 돼」(로그·URL 없음)</td><td>재현 조건이 없으면 AI도 원인 특정이 어렵습니다</td></tr>
        <tr><td>ETL 스크립트 보일러플레이트, README·교재 초안</td><td>금액 필드 공개 여부 같은 정책 단독 결정</td><td>윤리·법적 맥락은 사람이 판단해야 합니다</td></tr>
        <tr><td>에러 로그 기반 원인 가설·체크리스트</td><td>검증 없는 자동 배포</td><td>공개 URL 손상·데이터 유출 위험이 있습니다</td></tr>
      </table>

      <h2 class="study-h2">효과적인 프롬프트 구성</h2>
      <ol class="study-ol">
        <li><strong>목표</strong> — 무엇을 달성할지 (예: manifest data_as_of 갱신)</li>
        <li><strong>경로</strong> — 프로젝트 루트, 관련 파일·스크립트 이름</li>
        <li><strong>검증</strong> — doctor, open.sh, cat manifest 등 확인 방법</li>
        <li><strong>제약</strong> — 금액 비공개, web/만 배포 등 정책</li>
      </ol>
      <p class="study-p">본 교재, Hermes 스크립트, 운영 문서는 AI 보조와 사람 검토를 병행하여 작성되었습니다. AI가 생성한 명령도 터미널에 붙여 넣기 전에 내용을 읽는 습관이 필요합니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["LLM", "대규모 언어 모델. 텍스트·코드 생성에 쓰이며, 본 맥락에서는 코딩·운영 보조 AI의 기반입니다.", "대규모 언어 모델"],
        ["AI agent", "도구(터미널·파일 편집)를 호출하며 목표를 수행하는 AI 시스템입니다. 사람의 지시를 받아 자동화를 돕습니다."],
        ["prompt", "AI에게 주는 지시문입니다. 목표·경로·검증이 구체적일수록 결과 품질이 올라갑니다.", "프롬프트·지시문"],
      ]) +
      STUDY_TMPL.recap("AI는 실행·문서화 보조 도구입니다. 방향 설정, 출력 검증, 배포 승인은 사람이 담당해야 합니다."),
  },
  {
    id: "e35-troubleshoot",
    title: "장애 진단 — 표준 체크리스트",
    keywords: "트러블슈팅 doctor 404",
    lead: "지도 미표시, JSON 404, 파이프라인 실패가 발생하면 동일한 5단계 순서로 원인 범위를 좁힙니다. 재현 가능한 진단 절차를 따르면 수정 시간을 크게 줄일 수 있습니다.",
    html:
      STUDY_TMPL.module(3, "웹·운영", 5) +
      STUDY_TMPL.goal([
        "5단계 진단 순서를 처음부터 끝까지 실행할 수 있습니다",
        "각 단계에서 확인하는 대표 실패 모드를 설명할 수 있습니다",
        "doctor --fix가 도움이 되는 상황을 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">진단 전 준비</h2>
      <p class="study-p">증상만으로 바로 코드를 수정하기보다, <strong>환경 → 산출물 → 네트워크 → 동기화 → 지도 SDK</strong> 순으로 층을 나누면 원인이 데이터인지 프론트인지 인프라인지 빠르게 갈립니다. 아래 순서는 Module 4 Lab과도 동일한 사고방식입니다.</p>

      <h2 class="study-h2">진단 순서 (5단계)</h2>
      <ol class="study-ol">
        <li><strong>환경</strong> — <code>bash ~/hermes-restaurant-doctor.sh</code>로 venv, API 키, 경로, JSON 존재를 OK/NG로 확인합니다</li>
        <li><strong>산출물</strong> — <code>ls -la web/data/restaurants.map.json</code>로 파일 크기·수정 시각이 최근 enhance/sync와 맞는지 봅니다</li>
        <li><strong>네트워크</strong> — 브라우저 DevTools → Network 탭에서 JSON 요청이 404/403인지 확인합니다</li>
        <li><strong>동기화</strong> — <code>sync_web_data.py</code> 재실행 후 강력 새로고침으로 export→web/data 복사 누락을 해소합니다</li>
        <li><strong>지도 SDK</strong> — 카카오 JavaScript 키·도메인 등록을 점검합니다(OSM만 보이면 이 단계가 유력합니다)</li>
      </ol>

      <h2 class="study-h2">단계별 흔한 원인</h2>
      <table class="study-table">
        <tr><th>단계</th><th>증상</th><th>대표 원인</th></tr>
        <tr><td>환경</td><td>Python 스크립트 즉시 실패</td><td>venv 미활성화, REST API 키 누락</td></tr>
        <tr><td>산출물</td><td>빈 지도·0 records</td><td>enhance 미실행, sync 누락</td></tr>
        <tr><td>네트워크</td><td>JSON 404</td><td>web/data 경로 없음, 서버 루트 잘못됨</td></tr>
        <tr><td>동기화</td><td>로컬만 옛날 데이터</td><td>export는 갱신됐으나 web/data 미복사</td></tr>
        <tr><td>지도 SDK</td><td>OSM만 표시</td><td>Kakao 키·도메인 화이트리스트 문제</td></tr>
      </table>
      ` +
      STUDY_TMPL.glossary([
        ["404 on JSON", "브라우저가 restaurants.map.json을 찾지 못했다는 HTTP 상태입니다. export/sync 누락 또는 잘못된 상대 경로가 흔한 원인입니다.", "파일 없음 오류"],
        ["doctor --fix", "doctor가 자동 복구 가능하다고 판단한 항목(예: venv 생성 시도)을 수정하는 옵션입니다. 모든 NG가 고쳐지는 것은 아닙니다.", "자동 복구 옵션"],
        ["DevTools", "브라우저에 내장된 개발자 도구입니다. Network 탭에서 fetch 실패·상태 코드를 확인합니다.", "개발자 도구"],
        ["troubleshooting", "증상에서 원인을 좁혀 해결하는 체계적 절차입니다. 본 모듈의 5단계가 표준 troubleshooting 흐름입니다.", "장애 진단"],
      ]) +
      STUDY_TMPL.tip("한 단계에서 원인이 확정되면 다음 단계는 건너뛰어도 됩니다. 다만 처음 학습할 때는 1→5를 한 번씩 실행해 각 단계 출력에 익숙해지는 것이 좋습니다.") +
      STUDY_TMPL.recap("doctor → 파일 존재 → Network → sync → Kakao 키/도메인 순으로 진단합니다. 층별로 나누면 데이터 문제와 UI·SDK 문제를 빠르게 구분할 수 있습니다."),
  },
];