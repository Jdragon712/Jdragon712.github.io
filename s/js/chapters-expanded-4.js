/* global window, STUDY_TMPL */
window.STUDY_EXPANDED_4 = [
  {
    id: "e36-screenshots-all",
    title: "UI 참조 — 배포 산출물 스크린샷",
    keywords: "스크린샷 화면 reference",
    lead: "텍스트 설명과 실제 UI를 대조합니다. 기대 결과(reference) 스크린샷을 먼저 확인하면 실습 중 레이아웃·마커·목차 UI가 어긋났을 때 오류를 빠르게 발견할 수 있습니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal([
        "완성 지도·교재·강의 슬라이드 UI를 구분하여 설명할 수 있습니다",
        "스크린샷과 동일한 화면을 로컬·공개 URL에서 재현할 수 있습니다",
        "Figure 번호와 실제 산출물(지도·study·lecture)의 대응 관계를 설명할 수 있습니다",
      ]) +
      STUDY_TMPL.prereq(["Module 1–3 핵심 개념"]) +
      `
      <h2 class="study-h2">왜 스크린샷을 먼저 보는가</h2>
      <p class="study-p">교재의 명령·설명만으로는 「정상」과 「비정상」의 경계가 모호할 수 있습니다. 본 모듈의 Figure는 <strong>배포된 산출물의 기대 화면</strong>을 고정해 둔 reference(참조 기준)입니다. 실습 후 내 화면과 Figure를 나란히 비교하면 데이터 미갱신, SDK 폴백, 잘못된 URL 접속 등을 눈으로 걸러낼 수 있습니다.</p>

      <h2 class="study-h2">Figure 목록</h2>
      ` +
      `<figure class="study-figure"><img src="assets/img/map-overview.png" alt="지도" loading="lazy" /><figcaption>Figure 4.1 — 프로덕션 지도 (티어 마커, 범례, 출처 푸터)</figcaption></figure>
      <figure class="study-figure"><img src="assets/img/study-toc.png" alt="교재" loading="lazy" /><figcaption>Figure 4.2 — 본 학습 가이드 목차·진행률 UI</figcaption></figure>
      <figure class="study-figure"><img src="assets/img/lecture-slide.png" alt="슬라이드" loading="lazy" /><figcaption>Figure 4.3 — 강의용 14슬라이드 (<code>../index.html</code>)</figcaption></figure>` +
      `
      <table class="study-table">
        <tr><th>Figure</th><th>산출물</th><th>확인 URL·경로</th></tr>
        <tr><td>4.1</td><td>세종 공직자 단골 식당 지도</td><td>로컬 <code>127.0.0.1:5173</code> 또는 github.io</td></tr>
        <tr><td>4.2</td><td>본 study 교재 앱</td><td>study/index.html (로컬 study 서버)</td></tr>
        <tr><td>4.3</td><td>14슬라이드 강의</td><td><code>tutorial-web/index.html</code></td></tr>
      </table>
      ` +
      STUDY_TMPL.glossary([
        ["reference UI", "「이렇게 보여야 한다」는 기대 화면 기준입니다. 스크린샷 Figure가 reference UI 역할을 합니다.", "참조 UI"],
        ["Figure", "교재에서 그림·스크린샷에 붙이는 번호입니다. 본 모듈은 4.1~4.3을 다룹니다.", "그림 번호"],
        ["production", "최종 사용자에게 공개되는 환경을 뜻합니다. github.io 지도 URL이 production 예시입니다.", "프로덕션·운영"],
      ]) +
      STUDY_TMPL.exercise("직접 대조", "open https://jdragon712.github.io/sejong-official-restaurant-map/\nbash ~/hermes-restaurant-open.sh", "두 URL을 나란히 열어 Figure 4.1과 비교합니다.") +
      STUDY_TMPL.recap("스크린샷은 기대 UI의 reference입니다. 로컬·프로덕션 URL로 Figure 4.1과 대조하여 검증합니다."),
  },
  {
    id: "e37-lab-a",
    title: "Lab A — 환경 진단 (doctor)",
    keywords: "실습 doctor verify",
    lead: "코드·데이터를 수정하기 전에 실행 환경을 검증합니다. doctor 스크립트는 CI의 pre-flight check와 같은 역할을 하며, venv·API 키·JSON 경로 문제를 OK/NG로 보고합니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal([
        "doctor 출력의 OK/NG 항목을 해석할 수 있습니다",
        "NG 발생 시 --fix 또는 수동 조치 경로를 선택할 수 있습니다",
        "환경 문제와 데이터 문제를 구분할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">Lab A의 목적</h2>
      <p class="study-p">파이프라인이나 지도가 실패할 때, 원인이 <strong>환경 설정</strong>인지 <strong>데이터·코드</strong>인지 먼저 가릅니다. doctor는 Python venv 활성화 여부, Kakao REST 키 파일, 필수 JSON 경로 등을 자동 점검하여, enhance를 돌리기 전에 기초 오류를 제거합니다.</p>

      <h2 class="study-h2">출력 읽는 법</h2>
      <ul class="study-ul">
        <li><strong>OK</strong> — 해당 항목은 현재 설정으로 실행 가능합니다</li>
        <li><strong>NG</strong> — 수정 전까지 관련 스크립트가 실패할 가능성이 큽니다</li>
        <li>NG가 여러 개일 때는 <strong>위에서부터</strong> 순서대로 해결하는 것이 효율적입니다(venv → 키 → 경로 순)</li>
      </ul>
      ` +
      STUDY_TMPL.glossary([
        ["doctor", "Hermes 환경 진단 스크립트입니다. Lab A의 유일한 실행 명령이며, 모든 실습 전에 권장됩니다.", "환경 진단"],
        ["venv", "Python 가상 환경입니다. 프로젝트별 패키지 버전을 격리하며, doctor가 존재·활성화 여부를 검사합니다.", "가상 환경"],
        ["OK/NG", "점검 통과(OK)와 실패(NG) 표기입니다. 일본식 표기이나 본 프로젝트 doctor 출력에서 그대로 사용합니다.", "통과/실패"],
      ]) +
      STUDY_TMPL.exercise("실행", "bash ~/hermes-restaurant-doctor.sh", "venv 활성화, API 키, JSON 경로 등이 OK/NG로 보고됩니다.") +
      STUDY_TMPL.pitfalls([
        "doctor를 건너뛰고 파이프라인을 실행하면 venv 미설정 등 기초 오류에 시간을 낭비할 수 있습니다.",
        "NG 항목이 여러 개일 때는 위에서부터 순서대로 해결하는 것이 효율적입니다.",
        "doctor가 OK여도 raw가 비어 있으면 지도 데이터는 없을 수 있습니다. Lab A는 환경만 검증합니다.",
      ]) +
      STUDY_TMPL.demo("doctor-sim", "각 항목을 점검하며 OK/NG 결과가 어떻게 나오는지 확인합니다.") +
      STUDY_TMPL.recap("Lab A는 doctor로 환경 pre-flight 검증을 수행합니다. NG를 해소한 뒤 Lab B 이후 단계로 진행합니다."),
  },
  {
    id: "e38-lab-b",
    title: "Lab B — sync 및 로컬 미리보기",
    keywords: "실습 sync open",
    lead: "전체 ETL 없이 export → web/data 동기화만 수행하고 UI를 확인합니다. export 산출물이 이미 있을 때 프론트엔드만 검증하는 가장 가벼운 경로입니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal([
        "sync_web_data.py → open.sh 순서를 실행할 수 있습니다",
        "이 경로가 enhance 파이프라인 마지막 sync 단계와 동일함을 설명할 수 있습니다",
        "로컬 미리보기 URL에서 지도·푸터를 확인할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">sync가 하는 일</h2>
      <p class="study-p"><code>scripts/sync_web_data.py</code>는 <code>data/export/</code>에 있는 공개 JSON·manifest를 <code>web/data/</code>로 복사합니다. 브라우저의 fetch는 <code>web/data/restaurants.map.json</code>만 읽으므로, export가 갱신됐어도 sync 없으면 지도는 옛 데이터를 보여 줍니다.</p>

      <h2 class="study-h2">open.sh가 하는 일</h2>
      <p class="study-p"><code>hermes-restaurant-open.sh</code>는 <code>web/</code> 디렉터리를 포트 <strong>5173</strong>에서 정적 HTTP 서버로 띄우고 브라우저를 엽니다. GitHub Pages와 동일하게 서버 로직 없이 HTML·JS·JSON만 서빙하므로, 배포 전 검증에 적합합니다.</p>

      <h2 class="study-h2">확인 체크포인트</h2>
      <ul class="study-ul">
        <li>지도에 마커가 표시되는지</li>
        <li>푸터의 data_as_of 날짜가 기대와 맞는지</li>
        <li>드로어(목록) 클릭·스크롤이 동작하는지</li>
      </ul>
      ` +
      STUDY_TMPL.glossary([
        ["sync_web_data.py", "export 산출물을 web/data로 복사하는 Python 스크립트입니다. enhance 마지막 단계와 동일한 역할을 합니다.", "웹 데이터 동기화"],
        ["open.sh", "로컬 정적 서버(5173)를 띄우고 브라우저를 여는 Hermes 스크립트입니다.", "로컬 미리보기"],
        ["static HTTP server", "HTML·CSS·JS·JSON 파일만 제공하는 간단한 웹 서버입니다. Python 내장 http.server 등이 사용됩니다.", "정적 HTTP 서버"],
      ]) +
      STUDY_TMPL.exercise(
        "B — sync + preview",
        'cd "$HOME/Desktop/헤르메스 비서/부업/맛집앱"\nsource scripts/ensure_venv.sh\n"$RESTAURANT_MAP_PYTHON" scripts/sync_web_data.py\nbash ~/hermes-restaurant-open.sh',
        "export 산출물이 이미 있을 때 지도만 빠르게 확인하는 루틴입니다."
      ) +
      STUDY_TMPL.demo("sync-copy", "sync 실행 시 export/의 JSON이 web/data/로 복사되는 과정을 확인합니다.") +
      STUDY_TMPL.recap("Lab B는 sync 후 open.sh로 로컬 5173 미리보기를 확인합니다. enhance 없이 UI만 검증할 때 사용합니다."),
  },
  {
    id: "e39-lab-c",
    title: "Lab C — enhance 파이프라인 관찰",
    keywords: "실습 enhance pipeline",
    lead: "normalize 이후 6단계가 터미널에 [1/6]~[6/6] 순서로 출력되는 것을 관찰합니다. ETL 전체 흐름의 통합 실습이며, 완료 후 지도와 manifest의 data_as_of 갱신을 확인합니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal([
        "enhance 6단계 진행 로그를 읽고 각 단계 역할을 설명할 수 있습니다",
        "완료 후 지도·manifest의 data_as_of 갱신을 확인할 수 있습니다",
        "raw가 오래됐을 때 fetch를 먼저 실행해야 하는 이유를 설명할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">enhance가 포함하는 단계(개념)</h2>
      <p class="study-p"><code>hermes-restaurant-enhance.sh</code>는 raw 이후 <strong>normalize → geocode → 집계 → export → 린트 → sync</strong>에 해당하는 6단계를 한 번에 실행합니다. 터미널에 <code>[1/6]</code>부터 <code>[6/6]</code>까지 진행 로그가 찍히므로, 어느 단계에서 멈췄는지 추적할 수 있습니다.</p>

      <h2 class="study-h2">실습 후 검증</h2>
      <ol class="study-ol">
        <li>터미널에서 [6/6] 완료 메시지 확인</li>
        <li><code>cat data/export/manifest.json</code>으로 record_count·data_as_of 확인</li>
        <li><code>bash ~/hermes-restaurant-open.sh</code> 후 브라우저 <strong>강력 새로고침</strong></li>
        <li>푸터 날짜·마커 수가 기대와 맞는지 Figure 4.1과 대조</li>
      </ol>
      ` +
      STUDY_TMPL.glossary([
        ["enhance", "raw 이후 Transform·Load 6단계를 일괄 실행하는 Hermes 래퍼입니다. Lab C의 핵심 명령입니다.", "후처리 일괄 실행"],
        ["pipeline", "데이터가 단계별 스크립트를 거쳐 변환되는 연속 처리 흐름입니다. enhance가 파이프라인 후반을 담당합니다.", "파이프라인"],
        ["manifest.json", "export 메타데이터 파일입니다. data_as_of, record_count 등 배포·UI에 표시되는 정보가 들어 있습니다."],
      ]) +
      STUDY_TMPL.exercise("C — full enhance", "bash ~/hermes-restaurant-enhance.sh", "[1/6]~[6/6] 로그가 출력됩니다. 완료 후 브라우저 강력 새로고침.") +
      STUDY_TMPL.tip("raw가 최신이 아니면 먼저 fetch.sh를 실행하세요. enhance는 raw 이후 단계만 담당하며, 게시판에서 새 파일을 가져오지는 않습니다.") +
      STUDY_TMPL.pitfalls([
        "중간 단계에서 오류가 나면 이후 단계가 실행되지 않을 수 있습니다. 로그에서 실패한 [n/6] 단계를 먼저 읽으세요.",
        "enhance만 반복해도 raw 내용이 바뀌지 않으면 결과 스냅샷도 동일합니다. 월간 갱신 시 fetch 또는 update가 필요합니다.",
      ]) +
      STUDY_TMPL.demo("enhance-steps", "[1/6]~[6/6] 단계가 순서대로 진행되는 enhance 흐름을 확인합니다.") +
      STUDY_TMPL.recap("Lab C는 enhance 전체를 관찰한 뒤 UI·manifest로 검증합니다. raw 선행 여부를 확인하는 것이 중요합니다."),
  },
  {
    id: "e40-lab-d",
    title: "Lab D — JSON 스키마 검증",
    keywords: "실습 JSON manifest python",
    lead: "지도 UI 뒤의 정적 JSON을 터미널에서 직접 열어 필드 구조와 레코드 수를 확인합니다. 데이터 계약(contract)을 이해하면 프론트 오류와 백엔드 산출물 문제를 구분할 수 있습니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal([
        "manifest.json의 메타데이터 필드를 읽고 설명할 수 있습니다",
        "restaurants.map.json 레코드 수·키 목록을 Python으로 조회할 수 있습니다",
        "공개 JSON에 amount 관련 키가 없음을 확인할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">데이터 계약(contract)이란</h2>
      <p class="study-p">app.js는 restaurants.map.json이 특정 형태(배열, 필수 키, visit_count 등)를 따른다고 가정합니다. export·sync 단계가 이 계약을 만족하는 파일만 <code>web/data/</code>에 둡니다. Lab D는 UI 없이 JSON을 직접 열어 계약이 지켜졌는지 검증합니다.</p>

      <h2 class="study-h2">manifest vs map JSON</h2>
      <table class="study-table">
        <tr><th>파일</th><th>역할</th><th>주요 필드</th></tr>
        <tr><td><code>data/export/manifest.json</code></td><td>배포·운영 메타데이터</td><td>data_as_of, record_count 등</td></tr>
        <tr><td><code>web/data/restaurants.map.json</code></td><td>지도·목록용 레코드 배열</td><td>업체명, 좌표, visit_count_total 등</td></tr>
      </table>
      <p class="study-p">푸터에 보이는 기준일은 manifest·UI 설정과 연동됩니다. record_count가 0이면 파이프라인 중간 실패 또는 필터로 인한 빈 결과일 수 있습니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["manifest.json", "export 스냅샷의 요약 메타데이터입니다. data_as_of로 「언제까지 반영되었는지」를 기록합니다."],
        ["schema", "JSON이 가져야 할 필드·타입 규칙입니다. 본 프로젝트는 코드·린트로 암묵적 schema를 강제합니다.", "스키마·구조"],
        ["record_count", "공개 map JSON에 포함된 업체(레코드) 수입니다. manifest와 len(json)이 대략 일치해야 합니다.", "레코드 수"],
      ]) +
      STUDY_TMPL.exercise("manifest", "cat data/export/manifest.json", "data_as_of, record_count 등 배포 메타데이터") +
      STUDY_TMPL.exercise(
        "Python 조회",
        '"$RESTAURANT_MAP_PYTHON" -c "\nimport json\np=\'web/data/restaurants.map.json\'\nd=json.load(open(p))\nprint(\'records:\', len(d))\nprint(\'keys (first):\', list(d[0].keys())[:8])\n"',
        "공개 JSON에 amount 관련 키가 없는지 눈으로 확인하세요."
      ) +
      STUDY_TMPL.checkpoint("manifest의 data_as_of와 지도 푸터 날짜가 일치해야 하는 이유는 무엇입니까?") +
      STUDY_TMPL.demo("json-map", "JSON 레코드를 클릭하면 지도 마커로 연결되는 흐름을 확인합니다.") +
      STUDY_TMPL.recap("Lab D는 cat·Python으로 JSON 계약을 검증합니다. 금액 키 부재·record_count·data_as_of를 반드시 확인합니다."),
  },
  {
    id: "e41-lab-e",
    title: "Lab E — 로컬·프로덕션 비교",
    keywords: "실습 비교 github staging",
    lead: "동일 스냅샷이 로컬 미리보기와 GitHub Pages에 반영되었는지 data_as_of와 레코드 수로 대조합니다. 배포 전후 동기화 검증의 표준 절차입니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal([
        "127.0.0.1:5173과 github.io 환경 차이를 설명할 수 있습니다",
        "배포 전후 동기화 검증 방법을 수행할 수 있습니다",
        "불일치 시 sync → 로컬 확인 → publish → 캐시 무시 새로고침 순서를 적용할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">왜 두 URL을 비교하는가</h2>
      <p class="study-p">로컬 <code>open.sh</code>와 GitHub Pages는 같은 <code>web/</code> 폴더를 서빙해야 합니다. 그러나 <strong>배포 누락</strong>, <strong>브라우저 캐시</strong>, <strong>publish 전 로컬만 sync</strong> 등으로 github.io가 뒤처질 수 있습니다. data_as_of와 manifest record_count를 양쪽에서 맞추면 스냅샷 동일성을 확인할 수 있습니다.</p>
      ` +
      `
      <h2 class="study-h2">비교 절차</h2>
      <ol class="study-ol">
        <li>탭 A: <code>http://127.0.0.1:5173</code> (open.sh)</li>
        <li>탭 B: <code>https://jdragon712.github.io/sejong-official-restaurant-map/</code></li>
        <li>각 푸터·manifest의 <code>data_as_of</code> 일치 여부 확인</li>
        <li>불일치 시: sync → 로컬 확인 → publish → 캐시 무시 새로고침</li>
      </ol>

      <h2 class="study-h2">환경별 차이</h2>
      <table class="study-table">
        <tr><th>항목</th><th>로컬 5173</th><th>GitHub Pages</th></tr>
        <tr><td>파일 소스</td><td>내 PC의 web/</td><td>원격 저장소에 푸시된 web/</td></tr>
        <tr><td>갱신 방법</td><td>sync·enhance 즉시 반영</td><td>publish.sh 또는 --deploy 필요</td></tr>
        <tr><td>Kakao SDK</td><td>localhost:5173 도메인 등록 필요</td><td>github.io 도메인 등록 필요</td></tr>
      </table>
      ` +
      STUDY_TMPL.glossary([
        ["staging", "배포 전 검증 환경입니다. 본 프로젝트에서는 로컬 5173이 staging 역할을 합니다.", "스테이징·검증 환경"],
        ["production", "공개 사용자가 접속하는 github.io URL입니다. Lab E의 탭 B가 production입니다.", "프로덕션"],
        ["cache busting", "강력 새로고침·?v= 쿼리 등으로 브라우저가 옛 JS·JSON을 쓰지 않게 하는 방법입니다.", "캐시 무효화"],
      ]) +
      STUDY_TMPL.recap("Lab E는 로컬·프로덕션을 나란히 두고 data_as_of로 스냅샷 동일성을 검증합니다. 불일치 시 sync·publish·캐시 무시 순으로 조치합니다."),
  },
  {
    id: "e42-checklist",
    title: "학습 완료 기준 — 역량 체크리스트",
    keywords: "체크리스트 완료 outcomes",
    lead: "52모듈 완료 후 자가 평가용 체크리스트입니다. 모든 항목에 자신 있게 답할 수 있으면 1차 과정을 수료한 것으로 봅니다. 이후에는 월간 update 실전 운영으로 전환합니다.",
    html:
      STUDY_TMPL.module(4, "실습·검증", 5) +
      STUDY_TMPL.goal(["아래 역량 항목을 빈칸 없이 자가 점검할 수 있습니다"]) +
      `
      <h2 class="study-h2">체크리스트 사용 방법</h2>
      <p class="study-p">각 항목 옆 □를 mentally 체크하며, 설명이 막히면 해당 모듈로 돌아가 복습합니다. Module 5(소스 코드 해설)는 2회독 때 집중하면 코드 읽기 역량이 완성됩니다.</p>

      <h2 class="study-h2">필수 역량 (Course Outcomes 대응)</h2>
      <ul class="study-ul">
        <li>□ 터미널에서 cd, ls, cat을 사용해 프로젝트 경로를 탐색한다</li>
        <li>□ raw / export / web/data 디렉터리 역할과 데이터 흐름을 설명한다</li>
        <li>□ 파이프라인 8단계 순서와 각 스크립트 책임을 말한다</li>
        <li>□ visit_count 공개·금액 비공개의 기술·정책 근거를 설명한다</li>
        <li>□ hermes-restaurant-open.sh로 로컬 미리보기를 연다</li>
        <li>□ MIN_MAP_VISITS, 티어, 40m 클러스터 정책을 설명한다</li>
        <li>□ update.sh와 publish.sh, --deploy 옵션 차이를 구분한다</li>
        <li>□ normalize_expense의 FIELD_ALIASES 목적을 설명한다</li>
      </ul>

      <h2 class="study-h2">수료 후 다음 단계</h2>
      <ul class="study-ul">
        <li>월간 <code>update.sh</code>로 raw·지도 갱신</li>
        <li>로컬 검증 후 <code>publish.sh</code>로 github.io 반영</li>
        <li>Module 5에서 app.js·export_public.py 등 핵심 소스 줄 단위 복습</li>
      </ul>
      ` +
      STUDY_TMPL.glossary([
        ["Course Outcomes", "과정을 마친 뒤 학습자가 갖춰야 할 역량 목록입니다. 아래 체크 항목이 이에 대응합니다.", "과정 성과"],
        ["자가 평가", "스스로 이해도를 점검하는 과정입니다. 체크리스트는 자가 평가 도구입니다.", "셀프 체크"],
        ["FIELD_ALIASES", "normalize_expense에서 서로 다른 컬럼명을 하나의 표준 필드로 매핑하는 사전입니다. Module 5에서 코드로 확인합니다.", "필드 별칭"],
      ]) +
      STUDY_TMPL.tip("강의 진행 시: <code>../index.html</code> 14슬라이드 + 마지막에 공개 지도 URL 시연을 권장합니다.") +
      STUDY_TMPL.seeAlso([["교재 구성과 학습 방법", "#e01-welcome"], ["소스 해설 Module 5", "#e43-code-intro"]]) +
      STUDY_TMPL.recap("체크리스트를 모두 통과하면 1차 수료로 봅니다. 이후 월간 update 실전 운영과 Module 5 소스 복습으로 전환합니다."),
  },
];