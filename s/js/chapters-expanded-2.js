/* global window, STUDY_TMPL */
window.STUDY_EXPANDED_2 = [
  {
    id: "e13-kakao-intro",
    title: "지도 API 선택 — Kakao Maps vs Naver Map 비교와 Naver 선택 이유",
    keywords: "카카오 네이버 지도 API 비교 geocode",
    lead: "공개 데이터 지도 서비스에서 지도 플랫폼 선택은 사용자 경험과 연계 서비스에 큰 영향을 줍니다. 본 프로젝트는 현재 Naver Map을 사용합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "Kakao Map과 Naver Map의 주요 차이점을 설명할 수 있습니다",
        "Naver Map을 선택한 이유(이용자 규모, 예약 연계 등)를 말할 수 있습니다",
        "지도 SDK와 geocode 키의 역할 구분을 이해할 수 있습니다",
      ]) +
      STUDY_TMPL.prereq([
        "Part 1(12장) — 프로젝트 구조, data/ 레이어, ETL 흐름 개요",
        "bash 명령을 실행할 수 있음",
      ]) +
      `
      <h2 class="study-h2">Kakao Maps vs Naver Map 비교</h2>
      <p class="study-p">두 플랫폼 모두 한국에서 널리 쓰이는 지도 서비스이며, 웹 SDK와 지오코딩 API를 제공합니다. 선택은 서비스 대상 사용자와 연계 가능성에 따라 달라집니다.</p>
      <table class="study-table">
        <tr><th>항목</th><th>Kakao Maps</th><th>Naver Map</th></tr>
        <tr><td>국내 이용자 규모</td><td>높음 (특히 젊은 층·카카오 연계)</td><td>매우 높음 (전 연령, 네이버 포털 연계)</td></tr>
        <tr><td>예약·장소 연계</td><td>카카오톡·플레이스 연계 강점</td><td>네이버 예약, 네이버 플레이스, 지역 서비스 연계가 풍부</td></tr>
        <tr><td>지도 타일 품질·POI</td><td>실시간 교통·로컬 POI 강점</td><td>상세 POI, 리뷰·예약 연동, 행정구역 정확도 높음</td></tr>
        <tr><td>개발자 키·도메인</td><td>REST + JS 키 분리, 도메인 제한</td><td>Client ID (ncpKeyId), 도메인 등록 필요</td></tr>
        <tr><td>무료 사용 한도</td><td>일/월 쿼터 있음</td><td>일/월 쿼터 있음 (서비스 규모에 따라 유리)</td></tr>
        <tr><td>공개 데이터 지도 적합성</td><td>좋음</td><td>국내 사용자 많아 추천</td></tr>
      </table>

      <h2 class="study-h2">Naver Map을 선택한 이유</h2>
      <p class="study-p">본 프로젝트는 <strong>네이버 지도</strong>를 주 지도 플랫폼으로 사용합니다. 이유:</p>
      <ul class="study-ul">
        <li><strong>이용자 규모</strong>: 네이버 포털과 연동되어 전국적으로 이용자가 많습니다. 특히 지역 기반 검색에서 노출이 유리합니다.</li>
        <li><strong>연계 서비스</strong>: 네이버 예약, 네이버 플레이스 등과 연동 시 이용자가 자연스럽게 유입될 수 있습니다. 단골 식당 정보가 예약으로 이어지는 흐름을 기대할 수 있습니다.</li>
        <li><strong>POI와 데이터 품질</strong>: 행정구역·상호 데이터가 풍부하고, 공개 데이터와의 매칭이 상대적으로 안정적입니다.</li>
        <li><strong>웹 SDK</strong>: Naver Maps JavaScript API (ncpKeyId 방식)로 Leaflet과 유사한 방식으로 통합이 가능합니다.</li>
      </ul>
      <p class="study-p">Kakao Maps도 훌륭한 선택지이지만, 현재 서비스 타깃과 연계 가능성을 고려해 Naver를 우선했습니다. 필요 시 config에서 preferKakaoMap으로 전환할 수 있는 구조를 유지하고 있습니다.</p>
      ` +
      STUDY_TMPL.concept(
        "지도 SDK vs Geocoding",
        "<p>지도 SDK는 브라우저에서 <strong>타일·마커·줌</strong>을 그리는 역할을 합니다 (Naver Maps JavaScript API). Geocoding은 <strong>주소 → 좌표</strong> 변환으로, 보통 서버(Python)에서 REST API로 호출합니다. 두 기능은 별도 키·인증이 필요할 수 있습니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        [
          "Naver Cloud Platform (NCP)",
          "네이버 지도 API를 사용하기 위한 콘솔. Client ID (ncpKeyId)를 발급받아 사용합니다.",
        ],
        [
          "ncpKeyId",
          "Naver Maps JS SDK에서 사용하는 키 파라미터 (?ncpKeyId=...). 도메인 등록이 필요합니다.",
        ],
        [
          "Geocoding API",
          "주소를 좌표로, 또는 좌표를 주소로 변환하는 API. 본 프로젝트에서는 서버 측에서 주소 정규화에 사용합니다.",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "Naver Cloud 콘솔에서 http://localhost:5173, https://jdragon712.github.io 등 정확한 도메인을 등록해야 SDK가 로드됩니다.",
        "Client ID만 설정하고 SDK 스크립트 로드를 잊으면 지도가 뜨지 않습니다.",
        "Kakao와 Naver 키를 혼용하면 에러가 발생하니 config의 preferNaverMap / preferKakaoMap을 명확히 설정하세요.",
      ]) +
      STUDY_TMPL.checkpoint(
        "Kakao와 Naver 중 왜 Naver를 선택했는지, 그리고 두 플랫폼의 geocode/지도 SDK 차이를 한 문장으로 설명할 수 있나요?"
      ) +
      STUDY_TMPL.recap(
        "Naver Map은 국내 이용자 규모와 예약·플레이스 연계에서 강점을 가집니다. 본 프로젝트는 preferNaverMap: true로 Naver를 주로 사용하며, 필요 시 Kakao로 전환 가능합니다."
      ),
  },

  {
    id: "e14-kakao-setup",
    title: "Naver Map API 키 프로비저닝 (Kakao → Naver 전환 포함)",
    keywords: "setup naver_keys",
    lead: "초기 1회 설정 절차입니다. naver_keys.paste (또는 기존 kakao_keys.paste)에 Client ID를 작성한 뒤 setup.sh를 실행하면 .env와 config.js가 생성되고, Naver 지도 SDK가 동작합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "kakao_keys.paste 파일 형식을 직접 작성할 수 있습니다",
        "setup.sh 실행 결과(성공·재시도·편집기 열림)를 해석할 수 있습니다",
        "카카오 개발자 콘솔에서 등록해야 할 도메인 목록을 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "Provisioning이란",
        "<p>" +
          STUDY_TMPL.en("Provisioning", "초기 설정") +
          "은 서비스가 동작하는 데 필요한 비밀 값·설정 파일을 한곳에 모아 배포 가능한 상태로 만드는 과정입니다. 본 프로젝트에서는 <code>naver_keys.paste</code> (또는 kakao_keys.paste) → 적용 스크립트 → <code>scripts/.env</code> + <code>web/js/config.js</code> 순으로 진행됩니다.</p>" +
          "<p><code>hermes-restaurant-setup.sh</code>는 키가 없으면 예시 파일을 복사하고 편집기를 연 뒤 종료합니다. 키를 저장한 후 <strong>동일 명령을 다시 실행</strong>해야 적용이 완료됩니다. 키가 있으면 apply 후 전체 파이프라인(<code>run_pipeline.sh</code>)까지 이어질 수 있습니다.</p>"
      ) +
      `<pre class="study-code">NAVER_CLIENT_ID=your_ncp_key_id_here
# (이전 Kakao 사용 시)
# KAKAO_REST_API_KEY=
# KAKAO_JS_KEY=</pre>` +
      `<p class="study-p">Naver Cloud 콘솔에서 발급한 <code>ncpKeyId</code> (Client ID)를 붙여넣습니다. Kakao에서 Naver로 전환 시 기존 kakao_keys.paste를 naver 중심으로 업데이트하세요.</p>` +
      STUDY_TMPL.glossary([
        [
          "NAVER_CLIENT_ID",
          "Naver Cloud Platform에서 발급받은 Client ID (ncpKeyId). JS SDK에서 ?ncpKeyId= 로 사용됩니다.",
          "네이버 클라이언트 ID",
        ],
        [
          "apply_naver_keys.py (또는 기존 apply)",
          "paste 파일을 읽어 .env와 config.js를 생성/업데이트하는 스크립트. Naver Client ID를 MAP_CONFIG에 반영합니다.",
          "키 적용 스크립트",
        ],
        [
          "Naver Cloud Console",
          "https://console.ncloud.com/ 또는 Naver Maps 콘솔에서 애플리케이션 생성, Client ID 발급, 도메인 등록.",
          "네이버 클라우드 콘솔",
        ],
      ]) +
      STUDY_TMPL.exercise(
        "키 적용",
        "bash ~/hermes-restaurant-setup.sh",
        "키가 비어 있으면 편집기가 열립니다. naver_keys.paste (또는 kakao_keys.paste)에 Naver Client ID를 저장한 뒤 동일 명령을 다시 실행합니다. 성공 시 .env·config.js가 생성되고 preferNaverMap이 반영됩니다."
      ) +
      STUDY_TMPL.concept(
        "도메인 등록 체크리스트 (Naver)",
        "<p>Naver Maps JS SDK는 브라우저 노출 키이므로, Naver Cloud 콘솔 → Application → Platform → Web → Site URL에 아래를 등록합니다.</p>" +
          "<ul class='study-ul'>" +
          "<li>로컬 미리보기: <code>http://127.0.0.1:5173</code>, <code>http://localhost:5173</code></li>" +
          "<li>공개 배포: <code>https://jdragon712.github.io</code> (또는 실제 Pages URL)</li>" +
          "</ul>" +
          "<p>등록하지 않으면 SDK 로드 실패. fallback으로 Leaflet(OSM)이 동작할 수 있지만, Naver POI와 연계 기능이 제한됩니다.</p>"
      ) +
      STUDY_TMPL.pitfalls([
        "Naver Cloud 콘솔에 localhost:5173, github.io 도메인을 정확히 등록하지 않으면 Naver Maps SDK 초기화가 실패합니다.",
        "Client ID만 config에 넣고 SDK 스크립트 로드(<script> with ncpKeyId)를 하지 않으면 지도가 뜨지 않습니다.",
        "preferNaverMap: true 인데 naverClientId가 비어 있으면 Naver 시도가 실패하고 Kakao fallback으로 갈 수 있습니다 (설정 확인).",
        "키 앞뒤 공백·따옴표가 들어가면 API 호출 거부. 복사 시 한 줄 정확히.",
      ]) +
      STUDY_TMPL.tip(
        "Naver 키 확인: config.js의 naverClientId와 콘솔 도메인 일치 여부, 브라우저 콘솔에서 'ncpKeyId' 파라미터 확인."
      ) +
      STUDY_TMPL.checkpoint(
        "setup.sh를 처음 실행했을 때 편집기만 열리고 종료되었다면, 다음에 해야 할 일은 무엇인가요? (Naver 전환 시에도 동일한가요?)"
      ) +
      STUDY_TMPL.recap(
        "Naver Client ID → paste → setup.sh → .env + config.js (preferNaverMap: true). 도메인 등록 필수이며, Kakao에서 전환 시에도 동일 절차."
      ),
  },
  {
    id: "e15-fetch-intro",
    title: "Extract — 업무추진비 raw 수집",
    keywords: "fetch extract raw",
    lead: "ETL의 E(Extract) 단계입니다. 기관 게시판 첨부파일을 원본 그대로 data/raw/expense/에 저장합니다. 아직 파싱·집계는 하지 않습니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "fetch가 Transform을 수행하지 않음을 설명할 수 있습니다",
        "수집만으로는 지도 UI가 변하지 않음을 이해합니다",
        "raw 레이어가 재현성·감사에 왜 필요한지 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "Extract 레이어",
        "<p>" +
          STUDY_TMPL.en("Extract") +
          "는 " +
          STUDY_TMPL.en("ETL", "수집·변환·적재") +
          "의 첫 단계입니다. <code>fetch_expense_raw_2026.py</code>는 엑셀·HWP 내용을 읽거나 집계하지 않고, 게시판에서 받은 <strong>원본 바이너리 파일</strong>을 디스크에 그대로 보존합니다.</p>" +
          "<p>파서 로직이 바뀌어도 같은 raw에서 Transform을 다시 실행할 수 있습니다.</p>" +
          "<p>원본을 덮어쓰지 않는 것이 데이터 파이프라인의 기본 원칙입니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        [
          "Extract",
          "외부 소스(게시판)에서 파일을 가져와 로컬에 저장하는 단계입니다. 본 모듈에서는 업무추진비 첨부만 대상입니다.",
          "추출",
        ],
        [
          "raw",
          "가공 전 원본 파일이 쌓이는 data/raw/ 레이어입니다. 재파싱·감사·오류 추적의 근거가 됩니다.",
          "원본(raw)",
        ],
        [
          "fetch_expense_raw_2026.py",
          "2025-01 이후 게시물을 크롤링해 기관별·연도별 폴더에 첨부를 저장하는 수집 스크립트입니다.",
          "수집 스크립트",
        ],
      ]) +
      `<p class="study-p">진입점: <code>bash ~/hermes-restaurant-fetch.sh</code> — 내부에서 fetch_status → fetch → fetch_status 순으로 실행해 수집 전후를 비교합니다.</p>` +
      `<pre class="study-code">data/raw/expense/{기관슬러그}/{연도}/파일.xlsx
data/raw/expense/_manifest/fetch_2026_log.jsonl</pre>` +
      STUDY_TMPL.pitfalls([
        "fetch만 실행하고 enhance·parse를 생략하면 지도 JSON은 갱신되지 않습니다. 수집과 변환은 별도 단계입니다.",
        "수집 직후 브라우저를 새로고침해도 마커 수가 바뀌지 않는 것이 정상입니다. raw는 아직 UI에 연결되지 않았습니다.",
      ]) +
      STUDY_TMPL.checkpoint(
        "fetch가 끝난 뒤 data/raw/expense/에 파일이 늘었는데 지도가 그대로라면, 아직 실행되지 않은 ETL 단계는 무엇인가요?"
      ) +
      STUDY_TMPL.recap(
        "fetch = raw 적재(Extract). 파싱·정규화는 normalize 등 Transform 단계에서 진행합니다. 다음 모듈에서 CLI 옵션을 다룹니다."
      ),
  },
  {
    id: "e16-fetch-detail",
    title: "fetch 실행 — CLI 옵션과 모니터링",
    keywords: "fetch_status delay",
    lead: "수집 전후 상태를 fetch_status.py로 확인하고, rate limit을 고려한 --delay 옵션으로 안전하게 실행합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "fetch_status.py로 수집 현황을 조회할 수 있습니다",
        "--from-date, --delay 옵션의 목적을 설명할 수 있습니다",
        "수집 로그(manifest) 위치를 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "CLI 옵션과 서버 예의",
        "<p>" +
          STUDY_TMPL.en("CLI", "명령줄") +
          " 옵션은 스크립트 동작을 미세 조정합니다. <code>--from-date</code>는 이 날짜 이후 게시물만 수집해 범위를 제한하고, <code>--delay</code>는 HTTP 요청 사이에 초 단위 대기를 넣어 <strong>대상 서버 부하</strong>와 차단(rate limit) 위험을 줄입니다.</p>" +
          "<p>공공 게시판도 과도한 연속 요청은 차단될 수 있으므로, 기본값 0.45초 간격을 유지하는 것을 권장합니다.</p>"
      ) +
      STUDY_TMPL.exercise(
        "현황 조회",
        'source scripts/ensure_venv.sh\n"$RESTAURANT_MAP_PYTHON" scripts/fetch_status.py',
        "기관별·파일별 수집 통계가 출력됩니다. fetch 전후에 두 번 실행하면 새로 받은 파일 수를 비교할 수 있습니다."
      ) +
      `<pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/fetch_expense_raw_2026.py \\
  --from-date 2025-01-01 --delay 0.45</pre>` +
      STUDY_TMPL.glossary([
        [
          "--from-date",
          "이 ISO 날짜(YYYY-MM-DD) 이후에 게시된 자료만 수집합니다. 전체 재수집 범위의 시작점입니다.",
          "시작일 옵션",
        ],
        [
          "--delay",
          "연속 HTTP 요청 사이 대기 시간(초)입니다. 0.45는 약 2회/초 속도로 서버에 부담을 줄입니다.",
          "요청 간격",
        ],
        [
          "fetch_status",
          "data/raw/expense/ 아래 파일·기관별 통계를 요약해 보여 주는 점검 스크립트입니다.",
          "수집 현황",
        ],
        [
          "rate limit",
          "짧은 시간에 너무 많은 요청을 내면 서버가 일시 차단하는 정책입니다. delay로 완화합니다.",
          "요청 제한",
        ],
        [
          "--retry-zero",
          "0바이트로 실패한 파일만 재다운로드합니다. 월간 갱신 시 유용합니다.",
          "실패 재시도",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "--delay를 0에 가깝게 줄이면 수집은 빨라지지만 차단·불완전 다운로드 위험이 커집니다.",
        "fetch_status 없이 fetch만 반복하면 어떤 기관이 비었는지 파악하기 어렵습니다. status → fetch → status 패턴을 권장합니다.",
      ]) +
      STUDY_TMPL.recap(
        "status → fetch → status로 수집을 검증합니다. --from-date로 범위, --delay로 서버 예의를 조절합니다."
      ),
  },
  {
    id: "e17-pipeline-intro",
    title: "ETL 파이프라인 — 8단계 오케스트레이션",
    keywords: "pipeline run_pipeline enhance",
    lead: "run_pipeline.sh가 Transform·Load 단계를 순차 실행합니다. 8개 Python 스크립트의 순서·산출물·실행 시점(parse vs enhance)을 한 번에 정리합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "8단계 순서와 각 단계의 산출물을 연결할 수 있습니다",
        "parse(전체)와 enhance(증분) 실행 시점을 구분할 수 있습니다",
        "ETL 세 글자가 각각 어느 단계에 해당하는지 설명할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "ETL 8단계 한눈에 보기",
        "<p>" +
          STUDY_TMPL.en("ETL", "Extract·Transform·Load") +
          "에서 <strong>Extract</strong>는 fetch(모듈 15–16), <strong>Transform</strong>은 1~5단계(import→export), <strong>Load</strong>는 6~7단계(geocode→sync)에 해당합니다. <code>run_pipeline.sh</code>는 venv 활성화·카카오 키 적용 후 아래 8단계를 <strong>한 번에 순서대로</strong> 실행합니다.</p>" +
          "<p>처음(raw·POI 없음)에는 <code>bash ~/hermes-restaurant-parse.sh</code>(전체 8단계)를 씁니다. raw만 새로 쌓인 운영 상황에서는 <code>bash ~/hermes-restaurant-enhance.sh</code>(match 이후 6단계)로 시간을 줄입니다.</p>"
      ) +
      `<table class="study-table">
        <tr><th>#</th><th>스크립트</th><th>하는 일</th><th>주요 산출</th></tr>
        <tr><td>1</td><td>import_restaurant_lists</td><td>인허가·여민전 CSV → POI 마스터</td><td>processed/permit…</td></tr>
        <tr><td>2</td><td>normalize_expense</td><td>raw 업추비 → 통일된 행(line items)</td><td>expense_line_items.parquet</td></tr>
        <tr><td>3</td><td>aggregate_visits</td><td>상호별 방문 횟수·금액 분리 집계</td><td>visit_count, private(금액)</td></tr>
        <tr><td>4</td><td>match_venues</td><td>업추비 상호 ↔ 인허가 POI 연결</td><td>venue_matches.parquet</td></tr>
        <tr><td>5</td><td>export_public</td><td>공개 JSON + 금지 필드 린트</td><td>export/*.json, manifest</td></tr>
        <tr><td>6</td><td>geocode_venues</td><td>카카오 REST로 주소→좌표</td><td>restaurants.map.json</td></tr>
        <tr><td>7</td><td>sync_web_data</td><td>export → web/data 복제</td><td>web/data/*.json</td></tr>
        <tr><td>8</td><td>verify_setup</td><td>환경·파일·키 점검</td><td>콘솔 리포트</td></tr>
      </table>
      <pre class="study-code">bash ~/hermes-restaurant-parse.sh    <span class="cmt"># 초기·전체 8단계</span>
bash ~/hermes-restaurant-enhance.sh  <span class="cmt"># raw 갱신 후 증분</span></pre>` +
      STUDY_TMPL.glossary([
        [
          "Orchestration",
          "여러 스크립트를 정해진 순서·조건으로 묶어 실행하는 것입니다. run_pipeline.sh가 이 역할을 합니다.",
          "오케스트레이션",
        ],
        [
          "parse (full pipeline)",
          "인허가 import부터 verify까지 8단계 전체를 돌리는 모드입니다. 최초 셋업·대규모 재처리에 사용합니다.",
          "전체 파이프라인",
        ],
        [
          "enhance (incremental)",
          "raw가 이미 있을 때 match·export·geocode·sync 등 후반만 실행하는 빠른 경로입니다.",
          "증분 갱신",
        ],
        [
          "parquet",
          "열(column) 단위로 압축 저장하는 표 형식 파일입니다. Excel이 아니며 Python pandas로 읽습니다.",
          "패킷(parquet)",
        ],
        [
          "manifest.json",
          "export 기준일(data_as_of)·레코드 수 등 메타데이터입니다. 웹 푸터에 표시됩니다.",
          "매니페스트",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "단계 순서를 바꾸면 입력 파일이 없어 실패합니다. 예: export 전에 match_venues가 먼저 필요합니다.",
        "parse와 enhance를 혼동하면 import·normalize를 건너뛰어 오래된 집계가 남을 수 있습니다. raw가 처음 쌓였다면 parse를 고려합니다.",
        "run_pipeline.sh 안의 --data-as-of, --as-of 날짜는 실제 반영 기간과 맞춰야 합니다(현재 예: 2026-05-31).",
      ]) +
      STUDY_TMPL.checkpoint(
        "fetch(Extract) 다음에 run_pipeline의 1단계(import)가 오는 이유를, POI 마스터 관점에서 설명할 수 있나요?"
      ) +
      STUDY_TMPL.demo("pipeline-flow", "파이프라인 실행 시 8단계가 순서대로 활성화되는 흐름을 확인합니다.") +
      STUDY_TMPL.recap(
        "8단계 ETL: import→normalize→aggregate→match→export→geocode→sync→verify. 초기는 parse, 운영은 enhance로 시간을 절약합니다."
      ),
  },
  {
    id: "e18-step-import",
    title: "Step 1 — import_restaurant_lists",
    keywords: "import 인허가 POI",
    lead: "세종 인허가·여민전 CSV에서 POI(Point of Interest, 관심 지점) 마스터를 구축합니다. 이후 match·geocode의 기준 데이터가 됩니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "인허가 POI가 match 단계의 기준 데이터임을 설명할 수 있습니다",
        "입력·출력 경로를 명시할 수 있습니다",
        "업무추진비 상호만으로는 주소를 알 수 없는 이유를 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "POI 마스터",
        "<p>" +
          STUDY_TMPL.en("POI", "지도·목록의 관심 지점") +
          " 마스터는 세종 음식점·휴게음식점·여민전 등 <strong>인허가 공개 CSV</strong>를 합쳐 만든 기준 테이블입니다. 업무추진비 레코드는 종종 「○○식당」 같은 <strong>상호 문자열만</strong> 포함합니다.</p>" +
          "<p>인허가 POI는 <strong>도로명 주소·지번·영업 상태·식별 ID(restaurant_id)</strong>를 제공해 Step 4 match와 Step 6 geocode의 정확도를 높입니다.</p>" +
          "<p>POI 없이는 상호 이름만으로 지도에 핀을 꽂기 어렵습니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        [
          "import_restaurant_lists.py",
          "data/raw/permit/ CSV를 읽어 processed 레이어에 인허가 POI parquet을 저장합니다.",
          "인허가 로드",
        ],
        [
          "restaurant_id",
          "인허가 레코드를 식별하는 안정적인 ID입니다. match 성공 시 업추비 상호와 연결됩니다.",
          "식당 ID",
        ],
        [
          "permit",
          "행정 인허가 데이터입니다. 상호·주소·업종·영업 상태가 공신력 있는 출처입니다.",
          "인허가",
        ],
        [
          "data/raw/permit/",
          "인허가·여민전 원본 CSV가 위치하는 입력 폴더입니다.",
          "인허가 raw",
        ],
      ]) +
      `<pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/import_restaurant_lists.py</pre>` +
      STUDY_TMPL.pitfalls([
        "인허가 CSV가 갱신되어도 import를 다시 돌리지 않으면 match가 옛 주소를 참조할 수 있습니다. enhance 시 --refresh-permit 옵션을 함께 씁니다.",
        "세종 주소가 아닌 인허가 행은 match 인덱스에서 제외됩니다. 지역 필터가 적용됩니다.",
      ]) +
      STUDY_TMPL.recap(
        "Step 1 = 인허가 POI 로드. 상호·주소·ID 기준 데이터를 만들어 이후 match·geocode의 뼈대가 됩니다."
      ),
  },
  {
    id: "e19-step-normalize-intro",
    title: "Step 2 — normalize_expense (개요)",
    keywords: "normalize 스키마 통일",
    lead: "기관별로 제각각인 엑셀·HWP 헤더를 canonical(표준) line item 스키마로 정규화합니다. 식음료 관련 행만 남기는 food_only 필터도 적용합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "헤더 별칭 매핑의 필요성을 설명할 수 있습니다",
        "food_only 필터의 역할을 이해합니다",
        "normalize 산출물 경로를 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "스키마 정규화(Schema Normalization)",
        "<p>기관마다 같은 의미의 열 이름이 다릅니다. 「집행장소」「사용처」「상호」는 모두 <code>venue_name</code>(업체 이름)이라는 <strong>동일 semantic field</strong>입니다. normalize_expense.py는 별칭 테이블로 열을 통일합니다.</p>" +
          "<p><code>food_only=True</code>이면 식음료·접대 관련 행만 유지해 지도 서비스 범위에 맞는 레코드만 다음 단계로 넘깁니다.</p>" +
          "<p>금액(amount)은 normalize에서 읽히지만, aggregate 이후 <code>data/private/</code>로만 분리·보관됩니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        [
          "normalize",
          "이기종 원본을 하나의 통일 스키마(열 이름·타입)로 바꾸는 Transform 단계입니다.",
          "정규화",
        ],
        [
          "line item",
          "한 건의 집행 행입니다. executed_at(날짜), venue_name(상호), amount(금액) 등으로 표현됩니다.",
          "개별 행",
        ],
        [
          "canonical schema",
          "프로젝트 전체가 공유하는 표준 열 정의입니다. 기관별 다른 헤더를 여기로 매핑합니다.",
          "표준 스키마",
        ],
        [
          "food_only",
          "식음료 관련 행만 남기는 필터입니다. 비식음료 지출은 지도 대상에서 제외됩니다.",
          "식음료 필터",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "「집행장소」「사용처」「상호」 등은 동일 semantic field(venue_name)입니다. 별칭 누락 시 해당 열이 비어 레코드가 스킵될 수 있습니다.",
        "food_only=True 시 식음료 관련 행만 유지합니다. 필터가 너무 강하면 방문 수가 줄어들 수 있어 normalize_report.json을 확인합니다.",
      ]) +
      `<p class="study-p">산출: <code>data/processed/expense_line_items.parquet</code></p>
      <p class="study-p">상세 구현: Module 43–47 (소스 해설)</p>` +
      STUDY_TMPL.recap(
        "Step 2 = 스키마 정규화 → line items. 기관별 다른 헤더를 venue_name 등 표준 열로 통일합니다."
      ),
  },
  {
    id: "e20-step-aggregate",
    title: "Step 3 — aggregate_visits",
    keywords: "aggregate visit_count private",
    lead: "상호별 방문 빈도를 집계합니다. visit_count는 공개 경로로, amount(금액)는 data/private/에만 기록해 UI와 물리적으로 분리합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "visit_count_total 정의를 설명할 수 있습니다",
        "public/private parquet 분리 정책을 이해합니다",
        "--from-date와 --as-of 옵션의 차이를 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "지표 분리(Metric Separation)",
        "<p>" +
          STUDY_TMPL.en("aggregate") +
          "는 line item 수천 행을 상호(venue) 단위로 묶어 <code>visit_count_total</code> 같은 <strong>방문 횟수</strong>를 계산합니다. 공개 UI·export JSON은 <code>visit_count_*</code> 필드만 사용합니다.</p>" +
          "<p><code>amount_*</code> 필드(집행 금액)는 <code>data/private/</code>에만 기록됩니다. export·sync·web/ 경로와 겹치지 않도록 설계되어, 실수로 배포 JSON에 금액이 실리는 경로를 차단합니다.</p>"
      ) +
      `<pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/aggregate_visits.py \\
  --from-date 2025-01-01 --as-of 2026-05-31</pre>` +
      STUDY_TMPL.glossary([
        [
          "visit_count_total",
          "--from-date부터 --as-of까지 동일 업체(상호)가 line item에 등장한 횟수입니다. 지도 마커·목록의 핵심 숫자입니다.",
          "총 방문 횟수",
        ],
        [
          "--from-date",
          "집계 구간의 시작일입니다. 2025-01-01부터 누적할 때 사용합니다.",
          "집계 시작일",
        ],
        [
          "--as-of",
          "집계 구간의 종료 기준일입니다. manifest의 data_as_of와 맞춥니다.",
          "집계 종료일",
        ],
        [
          "data/private/",
          "금액 등 비공개 지표만 저장하는 폴더입니다. Git·GitHub Pages에 포함하지 않습니다.",
          "비공개 데이터",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "--as-of를 manifest data_as_of와 다르게 두면 푸터 날짜와 실제 집계 구간이 어긋나 사용자 신뢰가 떨어집니다.",
        "금액은 private에만 있다고 가정해 export를 느슨하게 하면 안 됩니다. Step 5 FORBIDDEN 린트가 2차 방어선입니다.",
      ]) +
      STUDY_TMPL.recap(
        "Step 3 = 방문 집계. 횟수는 processed·export로, 금액은 private로 분리합니다."
      ),
  },
  {
    id: "e21-step-match",
    title: "Step 4 — match_venues",
    keywords: "match fuzzy entity resolution",
    lead: "업무추진비 venue_name과 인허가 POI 사이에서 entity resolution을 수행합니다. exact·contains·fuzzy 순으로 후보를 찾습니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "fuzzy·contains 매칭의 목적을 설명할 수 있습니다",
        "unmatched 레코드가 발생할 수 있음을 이해합니다",
        "Entity Resolution이 지도 품질에 미치는 영향을 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "entity resolution",
        "<p>" +
          STUDY_TMPL.en("Entity Resolution", "개체 연결") +
          "은 서로 다른 데이터 소스에서 <strong>같은 현실 세계의 업소</strong>를 하나의 레코드로 묶는 작업입니다. 업무추진비에는 「(주)맛있는집 세종점」처럼 적히고, 인허가에는 「맛있는집」처럼 적힐 수 있습니다. 띄어쓰기·지점명·괄호 표기 차이를 흡수해야 합니다.</p>" +
          "<p><code>match_venues.py</code>는 다음 순서로 시도합니다.</p>" +
          "<ol class='study-ol'>" +
          "<li><strong>exact</strong> — 정규화된 상호 키가 완전 일치</li>" +
          "<li><strong>contains</strong> — 한 문자열이 다른 문자열에 포함(유사도 ≥ 0.50)</li>" +
          "<li><strong>corp_in_permit</strong> — 지점명을 뗀 본사명이 인허가 텍스트에 포함</li>" +
          "<li><strong>fuzzy</strong> — 문자열 유사도 ≥ <code>FUZZY_MIN=0.78</code>인 최적 후보</li>" +
          "<li><strong>unmatched</strong> — 위 모두 실패 시 주소·ID 없음</li>" +
          "</ol>" +
          "<p>매칭에 성공하면 <code>restaurant_id</code>, <code>address_road</code>, <code>match_method</code>, <code>match_score</code>가 venue_matches.parquet에 기록됩니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        [
          "Entity Resolution",
          "여러 소스의 이름·주소 표기를 같은 업소 하나로 연결하는 기법입니다. 본 프로젝트의 핵심 데이터 품질 단계입니다.",
          "개체 연결",
        ],
        [
          "fuzzy matching",
          "완전 일치가 아닐 때 편집 거리·유사도 점수로 가장 가까운 후보를 고르는 방식입니다. FUZZY_MIN=0.78 미만은 채택하지 않습니다.",
          "유사 매칭",
        ],
        [
          "contains matching",
          "짧은 상호 키가 인허가 상호 안에 포함되는지 검사합니다. 부분 문자열 일치에 유용합니다.",
          "포함 매칭",
        ],
        [
          "unmatched",
          "어떤 인허가 POI와도 연결되지 않은 업추비 상호입니다. 주소·geocode·지도 마커에서 누락될 수 있습니다.",
          "미매칭",
        ],
        [
          "venue_matches.parquet",
          "상호·방문수·주소·매칭 방법이 합쳐진 중간 산출물입니다. export_public의 직접 입력입니다.",
          "매칭 결과",
        ],
      ]) +
      `<pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/match_venues.py --refresh-permit</pre>` +
      STUDY_TMPL.pitfalls([
        "fuzzy 임계값을 낮추면 잘못된 업소에 연결(오매칭)될 위험이 커집니다. 0.78은 보수적 기본값입니다.",
        "unmatched가 많으면 지도에 마커가 적게 보입니다. 인허가 갱신·별칭 규칙 점검이 필요할 수 있습니다.",
        "같은 상호가 여러 지점이면 지점 힌트(branch_hints)와 주소 우선 점수로 후보를 고릅니다. 완벽하지 않을 수 있습니다.",
      ]) +
      STUDY_TMPL.checkpoint(
        "「맘스터치 세종점」과 인허가 「맘스터치」가 fuzzy로 연결될 수 있는 이유를, 표기 차이 관점에서 설명할 수 있나요?"
      ) +
      STUDY_TMPL.recap(
        "Step 4 = 상호→주소·ID 매칭(Entity Resolution). exact→contains→fuzzy 순으로 시도하며, 실패 시 unmatched로 남습니다."
      ),
  },
  {
    id: "e22-step-export",
    title: "Step 5 — export_public",
    keywords: "export FORBIDDEN lint",
    lead: "공개 JSON을 생성하고, FORBIDDEN_SUBSTRINGS 린트 검사를 통과해야만 파일이 저장됩니다. Fail-safe export로 금액·직급 키 이름 유출을 차단합니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "export_public 산출 파일을 나열할 수 있습니다",
        "FORBIDDEN_SUBSTRINGS 린트의 목적을 설명할 수 있습니다",
        "Fail-safe export가 왜 프로세스를 중단하는지 이해합니다",
      ]) +
      STUDY_TMPL.concept(
        "Fail-safe export",
        "<p>" +
          STUDY_TMPL.en("Fail-safe", "문제 시 안전하게 멈춤") +
          " 설계는 「잘못된 데이터를 보내는 것」보다 「보내기를 중단하는 것」이 낫다는 원칙입니다. <code>export_public.py</code>는 JSON을 쓰기 <strong>전에</strong> 모든 키 이름을 재귀적으로 검사합니다.</p>" +
          "<p><code>FORBIDDEN_SUBSTRINGS</code> 정규식에 걸리는 키(예: amount, price, 집행액, 직급, 장관…)가 하나라도 있으면 <code>export_lint failed</code>로 <strong>프로세스가 즉시 종료</strong>됩니다. 배포 가능한 잘못된 JSON이 생기지 않도록 강제합니다.</p>" +
          "<p>값(value) 내용이 아니라 <strong>키 이름(key name)</strong>만 검사합니다. 실수로 aggregate에서 금액 열이 export 경로에 합쳐져도 필드명으로 2차 차단됩니다.</p>"
      ) +
      `<pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/export_public.py \\
  --from-date 2025-01-01 --data-as-of 2026-05-31</pre>
      <pre class="study-code">FORBIDDEN_SUBSTRINGS = re.compile(
    r"amount|total_amount|price|cost|집행액|원\\"|attendee|직급|직위|장관|차관|부서장",
    re.I,
)</pre>` +
      STUDY_TMPL.glossary([
        [
          "export_public.py",
          "venue_matches를 읽어 restaurants.public.json·manifest.json을 data/export/에 씁니다. visit_count만 공개합니다.",
          "공개보내기",
        ],
        [
          "FORBIDDEN_SUBSTRINGS",
          "공개 JSON 키 이름에 금지된 부분 문자열 패턴입니다. 금액·가격·직급·인명 관련 키를 차단합니다.",
          "금지 패턴",
        ],
        [
          "lint",
          "배포 전 자동 규칙 검사입니다. 위반 시 저장하지 않고 종료합니다.",
          "린트 검사",
        ],
        [
          "Fail-safe",
          "오류·위험 감지 시 출력을 막고 운영자가 수정하도록 강제하는 안전 장치입니다.",
          "안전 실패",
        ],
        [
          "restaurants.public.json",
          "웹 앱이 로드하는 공개 식당 목록입니다. 좌표는 geocode 후 map JSON에 병합됩니다.",
          "공개 JSON",
        ],
        [
          "data_as_of",
          "--data-as-of 인자로 manifest·JSON에 기록되는 데이터 기준일입니다. 푸터에 표시됩니다.",
          "데이터 기준일",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "린트를 끄거나 예외 처리로 우회하면 금액 필드명이 GitHub Pages에 올라갈 수 있습니다. FORBIDDEN 목록 수정은 정책 검토 후에만 합니다.",
        "export는 match_venues 산출물이 없으면 시작조차 하지 않습니다. Step 4 완료 여부를 먼저 확인합니다.",
        "matched_count·unmatched_count는 JSON 메타에 포함되어 품질을 투명하게 보여 줍니다.",
      ]) +
      STUDY_TMPL.checkpoint(
        "금액 값이 JSON에 없어도 키 이름에 amount가 들어가면 린트가 실패하는 이유를 설명할 수 있나요?"
      ) +
      STUDY_TMPL.demo("export-lint", "금지 키가 포함된 JSON과 정상 JSON을 비교해 린트 동작을 확인합니다.") +
      STUDY_TMPL.recap(
        "Step 5 = public JSON + manifest + FORBIDDEN 린트. Fail-safe export로 금지 키가 있으면 저장 전에 중단합니다."
      ),
  },
  {
    id: "e23-step-geocode-sync",
    title: "Step 6–7 — geocode_venues · sync_web_data",
    keywords: "geocode sync load",
    lead: "카카오 REST API로 좌표를 부여한 뒤(Load 준비), export 산출물을 web/data로 동기화합니다. 브라우저는 sync된 JSON만 읽습니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "geocode의 API 의존성과 --limit 옵션을 설명할 수 있습니다",
        "sync가 export→web/data 복제임을 이해합니다",
        "좌표 없는 레코드가 지도에서 어떻게 되는지 말할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "Load — 좌표 부여와 배포 폴더 동기화",
        "<p>Step 6 <code>geocode_venues.py</code>는 <code>address_road</code>가 있는 레코드에 대해 카카오 REST API로 위도·경도를 조회해 <code>restaurants.map.json</code> 등에 기록합니다. <code>--limit</code>은 한 번에 처리할 최대 건수로, API 할당량·실행 시간을 조절합니다.</p>" +
          "<p>Step 7 <code>sync_web_data.py</code>는 <code>data/export/</code>의 JSON을 <code>web/data/</code>로 <strong>복사</strong>합니다. GitHub Pages는 <code>web/</code>만 배포하므로, export만 갱신하고 sync를 빼면 브라우저는 옛 파일을 계속 읽습니다.</p>"
      ) +
      `<pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/geocode_venues.py --limit 1000
"$RESTAURANT_MAP_PYTHON" scripts/sync_web_data.py</pre>` +
      STUDY_TMPL.glossary([
        [
          "geocode_venues.py",
          "주소 문자열을 카카오 REST로 검색해 lat/lng 좌표를 붙입니다. KAKAO_REST_API_KEY(.env)가 필요합니다.",
          "geocode",
        ],
        [
          "--limit",
          "한 실행에서 geocode할 최대 건수입니다. 미처리 건은 다음 실행·--missing-only로 이어갈 수 있습니다.",
          "처리 건수 제한",
        ],
        [
          "sync_web_data.py",
          "data/export/*.json을 web/data/로 복제합니다. 배포 전 로컬 미리보기도 이 경로를 봅니다.",
          "웹 동기화",
        ],
        [
          "Load",
          "가공 결과를 최종 소비자(브라우저)가 읽는 위치에 적재하는 단계입니다. sync가 해당합니다.",
          "적재",
        ],
        [
          "restaurants.map.json",
          "식당 목록 + 좌표가 합쳐진 지도용 JSON입니다. 마커 렌더링의 직접 입력입니다.",
          "지도 JSON",
        ],
      ]) +
      STUDY_TMPL.pitfalls([
        "좌표 미보유 레코드는 클라이언트 마커에서 제외될 수 있습니다. unmatched·주소 누락·geocode 실패를 구분해 점검합니다.",
        "sync 없이 브라우저만 새로고침해도 web/data는 갱신되지 않습니다. export 후 반드시 sync합니다.",
        "REST API 키가 없으면 geocode 단계가 스킵되거나 실패합니다. Module 13–14 키 설정을 먼저 확인합니다.",
      ]) +
      STUDY_TMPL.demo("geocode-sim", "주소 문자열이 위도·경도 좌표로 변환되어 지도에 핀으로 표시되는 과정을 확인합니다.") +
      STUDY_TMPL.demo("sync-copy", "export JSON이 web/data/로 복사되는 sync 단계를 확인합니다.") +
      STUDY_TMPL.recap(
        "Step 6=카카오 REST로 좌표, Step 7=export→web/data sync. 둘 다 있어야 로컬·배포 지도에 최신 마커가 반영됩니다."
      ),
  },
  {
    id: "e24-step-verify-open",
    title: "Step 8 — 검증 및 로컬 미리보기",
    keywords: "verify open 로컬",
    lead: "verify_setup·doctor로 환경과 산출물을 검증한 뒤, 로컬 호스트에서 UI를 확인합니다. ETL 완료의 마지막 관문입니다.",
    html:
      STUDY_TMPL.module(2, "데이터 파이프라인", 5) +
      STUDY_TMPL.goal([
        "파이프라인 완료 후 검증 절차를 수행할 수 있습니다",
        "로컬 지도 URL에서 산출물을 확인할 수 있습니다",
        "manifest data_as_of와 푸터 표시가 일치하는지 점검할 수 있습니다",
      ]) +
      STUDY_TMPL.concept(
        "검증(Verification)과 미리보기",
        "<p>Step 8 <code>verify_setup.py</code>는 venv, 카카오 키, export·web/data JSON 존재, 레코드 수 등을 <strong>자동 체크리스트</strong>로 출력합니다. <code>hermes-restaurant-doctor.sh</code>는 여기에 환경 복구 힌트까지 포함한 진단 진입점입니다.</p>" +
          "<p>검증 후 <code>hermes-restaurant-open.sh</code>로 <code>http://127.0.0.1:5173</code>에서 지도를 띄웁니다. 마커 수, drawer 상세, 푸터 <code>data_as_of</code>가 manifest와 일치하는지 눈으로 확인합니다.</p>"
      ) +
      STUDY_TMPL.exercise(
        "검증 + 미리보기",
        "bash ~/hermes-restaurant-doctor.sh\nbash ~/hermes-restaurant-open.sh",
        "http://127.0.0.1:5173 — 마커·manifest data_as_of 일치 확인. 문제 시 doctor 출력의 FAIL 항목부터 해결합니다."
      ) +
      STUDY_TMPL.glossary([
        [
          "verify_setup.py",
          "파이프라인 산출물·환경 변수·키 파일을 점검해 PASS/FAIL 리포트를 출력합니다. run_pipeline 8/8 단계입니다.",
          "설정 검증",
        ],
        [
          "doctor.sh",
          "venv·키·경로·JSON을 한 번에 진단하는 Hermes 래퍼입니다. 장애 시 1차로 실행합니다.",
          "환경 진단",
        ],
        [
          "open.sh",
          "포트 5173 정적 서버를 띄우고 브라우저로 지도를 엽니다. 배포 전 로컬 QA에 사용합니다.",
          "로컬 미리보기",
        ],
      ]) +
      `<figure class="study-figure"><img src="assets/img/map-drawer.png" alt="드로어" loading="lazy" /><figcaption>Figure 2.1 — 마커 선택 시 venue-drawer</figcaption></figure>` +
      STUDY_TMPL.pitfalls([
        "verify가 PASS여도 카카오 도메인 미등록이면 SDK는 실패하고 OSM 폴백 지도가 보일 수 있습니다. 키·도메인을 함께 점검합니다.",
        "로컬에서만 확인하고 publish를 생략하면 공개 URL은 갱신되지 않습니다. 배포는 Module 3에서 다룹니다.",
      ]) +
      STUDY_TMPL.seeAlso([
        ["Module 3 — 월간 갱신·배포", "#e25-monthly-update"],
        ["Module 4 — 완료 체크리스트", "#e42-checklist"],
      ]) +
      STUDY_TMPL.recap(
        "Step 8 + doctor + open.sh = ETL 완료 검증. manifest·마커·drawer를 로컬에서 확인한 뒤 운영·배포로 넘어갑니다."
      ),
  },
];