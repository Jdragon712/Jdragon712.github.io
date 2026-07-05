/* global window */
window.STUDY_CHAPTERS_1 = [
  {
    id: "ch01-roadmap",
    title: "학습 로드맵 — 무엇을, 어떤 순서로 배울까",
    keywords: "로드맵 목차 순서 학습",
    lead: "이 교재는 「세종 공직자 단골 식당 지도」를 직접 이해·운영·수정할 수 있게, 명령어와 코드를 한 단계씩 풀어 씁니다.",
    html: `
      <h2 class="study-h2">이 프로젝트가 하는 일 (한 줄)</h2>
      <p class="study-p">세종 관련 기관이 공개한 <strong>업무추진비</strong> 파일에서 식당 방문 기록을 모으고, 방문 <strong>횟수만</strong> 세어 지도에 표시합니다. 금액은 공개하지 않습니다.</p>

      <h2 class="study-h2">학습 목표 4가지</h2>
      <ol class="study-ol">
        <li><strong>구조 이해</strong> — 폴더·파일·데이터가 어디에 있는지</li>
        <li><strong>명령 실행</strong> — 터미널에서 스크립트를 직접 돌려 보기</li>
        <li><strong>코드 읽기</strong> — Python ETL과 웹 JS가 각각 무엇을 하는지</li>
        <li><strong>운영</strong> — 월간 갱신, 로컬 확인, GitHub 배포</li>
      </ol>

      <h2 class="study-h2">권장 학습 순서 (26장)</h2>
      <table class="study-table">
        <tr><th>1~3장</th><td>터미널, 폴더 구조, Python 환경</td></tr>
        <tr><th>4~5장</th><td>카카오 키, 데이터 수집(fetch)</td></tr>
        <tr><th>6~8장</th><td>파이프라인 8단계 (Python ETL 전부)</td></tr>
        <tr><th>9~10장</th><td>증분 갱신(enhance), 월간 업데이트</td></tr>
        <tr><th>11장</th><td>Hermes 쉘 스크립트 레퍼런스</td></tr>
        <tr><th>12~14장</th><td>웹 HTML/CSS/JS, app.js, 지도 모듈</td></tr>
        <tr><th>15~18장</th><td>배포, AI 활용, 트러블슈팅, 종합 실습</td></tr>
        <tr><th>19장</th><td><strong>스크린샷</strong> — 지도·터미널·교재 화면</td></tr>
        <tr><th>20~26장</th><td><strong>소스 줄단위 해설</strong> — normalize, aggregate, export, match, app.js</td></tr>
      </table>

      <h2 class="study-h2">프로젝트 위치 (반드시 기억)</h2>
      <pre class="study-code">~/Desktop/헤르메스 비서/부업/맛집앱/</pre>
      <p class="study-p">홈 디렉터리 <code>~</code> 는 맥에서 <code>/Users/본인이름/</code> 과 같습니다.</p>

      <h2 class="study-h2">완성품 링크</h2>
      <ul class="study-ul">
        <li>공개 지도: <code>https://jdragon712.github.io/sejong-official-restaurant-map/</code></li>
        <li>로컬 지도: <code>http://127.0.0.1:5173</code> (serve 후)</li>
        <li>이 교재: <code>http://127.0.0.1:5180/study/</code></li>
      </ul>

      <div class="callout callout--tip">
        <strong>TIP</strong>
        매 장 끝의 「읽음 표시」를 누르면 진행률이 저장됩니다. 실습은 반드시 터미널에서 직접 입력해 보세요.
      </div>
    `,
  },
  {
    id: "ch02-terminal",
    title: "터미널과 명령어 기초",
    keywords: "터미널 bash cd ls pwd",
    lead: "맥의 Terminal(또는 iTerm)에서 텍스트로 컴퓨터에게 일을 시키는 방법입니다. 이 프로젝트의 모든 자동화는 여기서 시작합니다.",
    html: `
      <h2 class="study-h2">터미널이란?</h2>
      <p class="study-p">GUI(클릭) 대신 <strong>명령어</strong>로 파일 이동, 프로그램 실행, 서버 띄우기를 합니다. Python 파이프라인·로컬 웹 서버 모두 터미널에서 실행합니다.</p>

      <h2 class="study-h2">꼭 알아둘 명령어</h2>
      <table class="study-table">
        <tr><th><code>pwd</code></th><td>지금 있는 폴더 경로 출력 (Print Working Directory)</td></tr>
        <tr><th><code>cd 경로</code></th><td>폴더 이동. <code>cd ~</code> 는 홈으로</td></tr>
        <tr><th><code>ls</code></th><td>현재 폴더 파일 목록</td></tr>
        <tr><th><code>ls -la</code></th><td>숨김 파일 포함 상세 목록</td></tr>
        <tr><th><code>cat 파일</code></th><td>파일 내용 화면에 출력</td></tr>
        <tr><th><code>open .</code></th><td>맥 Finder로 현재 폴더 열기</td></tr>
        <tr><th><code>open URL</code></th><td>기본 브라우저로 URL 열기</td></tr>
      </table>

      <h2 class="study-h2">경로에 공백이 있을 때</h2>
      <p class="study-p">「헤르메스 비서」처럼 띄어쓰기가 있으면 따옴표로 감쌉니다.</p>
      <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
<span class="cmt"># 또는</span>
cd "$HOME/Desktop/헤르메스 비서/부업/맛집앱"</pre>

      <h2 class="study-h2">bash 스크립트 실행</h2>
      <p class="study-p">프로젝트는 <code>~/hermes-restaurant-*.sh</code> 파일로 자주 쓰는 명령을 묶어 두었습니다.</p>
      <pre class="study-code">bash ~/hermes-restaurant-open.sh
<span class="cmt"># = 쉘에게 "이 파일 안의 명령을 순서대로 실행해" 라고 지시</span></pre>

      <h2 class="study-h2">실습</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <p>터미널을 열고 프로젝트로 이동합니다.</p>
          <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
pwd
ls</pre>
        </div>
        <div class="lab-step">
          <p>문서 폴더를 확인합니다.</p>
          <pre class="study-code">ls docs/
ls docs/operations/</pre>
        </div>
      </div>

      <div class="callout callout--warn">
        <strong>주의</strong>
        명령어는 <strong>한 줄씩</strong> Enter 합니다. 복사할 때 앞뒤 공백이 붙지 않게 하세요.
      </div>
    `,
  },
  {
    id: "ch03-folders",
    title: "프로젝트 폴더 완전 지도",
    keywords: "data scripts web docs raw export private",
    lead: "파일이 어디에 있느냐가 전부입니다. ETL·배포·보안 규칙은 모두 폴더 구조에서 나옵니다.",
    html: `
      <h2 class="study-h2">최상위 구조</h2>
      <pre class="study-code">맛집앱/
├── docs/           <span class="cmt"># 기획·운영 문서 (사람이 읽는 글)</span>
├── data/           <span class="cmt"># 모든 데이터</span>
├── scripts/        <span class="cmt"># Python·bash ETL</span>
├── web/            <span class="cmt"># 브라우저 지도 앱 (배포 대상)</span>
├── app/            <span class="cmt"># (추후) Expo 모바일</span>
├── .venv/          <span class="cmt"># Python 가상환경 (자동 생성)</span>
├── kakao_keys.paste <span class="cmt"># API 키 (git 제외)</span>
└── LICENSE</pre>

      <h2 class="study-h2">data/ 세부</h2>
      <table class="study-table">
        <tr><th>data/raw/expense/</th><td>기관별 업추비 원본 (xlsx, hwp, pdf…). <strong>git 제외</strong></td></tr>
        <tr><th>data/raw/permit/</th><td>세종 음식점 인허가 CSV</td></tr>
        <tr><th>data/processed/</th><td>중간 산출 parquet, geocode 캐시, 검증 JSON</td></tr>
        <tr><th>data/private/</th><td><strong>금액</strong> 등 민감 데이터. 절대 공개·배포 금지</td></tr>
        <tr><th>data/export/</th><td>웹용 JSON 원본 (방문 횟수만)</td></tr>
        <tr><th>data/manual/</th><td>기관 URL 목록, 수집 범위 CSV</td></tr>
      </table>

      <h2 class="study-h2">web/ 세부</h2>
      <pre class="study-code">web/
├── index.html
├── css/style.css
├── js/
│   ├── app.js              <span class="cmt"># 메인 로직</span>
│   ├── map-kakao.js        <span class="cmt"># 카카오 지도</span>
│   ├── map-overlap-stack.js <span class="cmt"># 40m 겹침 무지개</span>
│   ├── map-geocode.js      <span class="cmt"># 브라우저 POI 보정</span>
│   └── config.js           <span class="cmt"># 카카오 JS 키 (배포에 포함)</span>
└── data/
    ├── restaurants.map.json   <span class="cmt"># 지도용 (좌표 포함)</span>
    ├── restaurants.public.json
    └── manifest.json          <span class="cmt"># data-as-of, 건수</span></pre>

      <h2 class="study-h2">데이터 흐름 (외울 것)</h2>
      <pre class="study-code">raw (원본) → processed (가공) → export (공개 JSON) → web/data (복사) → 브라우저</pre>

      <h2 class="study-h2">실습</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">ls -la data/export/
cat data/export/manifest.json</pre>
          <p>출력 예: <code>data_as_of</code>, <code>record_count</code> (약 2,525)</p>
        </div>
        <div class="lab-step">
          <pre class="study-code">ls web/data/
wc -l web/data/restaurants.map.json</pre>
          <p>export와 web/data가 같은 시점으로 맞춰져 있는지 확인합니다.</p>
        </div>
      </div>
    `,
  },
  {
    id: "ch04-python-env",
    title: "Python 가상환경(venv)과 패키지",
    keywords: "venv pip requirements python3",
    lead: "프로젝트 전용 Python 공간을 만들어, pandas·openpyxl 등 필요한 라이브러리만 설치합니다.",
    html: `
      <h2 class="study-h2">왜 venv가 필요한가?</h2>
      <p class="study-p">맥에 여러 Python 프로젝트가 있으면 패키지 버전이 충돌합니다. <code>.venv</code> 폴더는 이 맛집앱만의 격리된 Python입니다.</p>

      <h2 class="study-h2">ensure_venv.sh — 자동 세팅</h2>
      <p class="study-p">대부분의 스크립트는 시작할 때 <code>source scripts/ensure_venv.sh</code> 를 호출합니다.</p>
      <ul class="study-ul">
        <li><code>.venv</code> 없으면 → python3.11(또는 python3)로 생성</li>
        <li><code>scripts/requirements.txt</code> 설치</li>
        <li>환경변수 <code>RESTAURANT_MAP_PYTHON</code> 에 python 경로 저장</li>
      </ul>

      <h2 class="study-h2">requirements.txt 패키지</h2>
      <table class="study-table">
        <tr><th>pandas</th><td>표 데이터 처리 (parquet, 집계)</td></tr>
        <tr><th>openpyxl / xlrd</th><td>엑셀 읽기</td></tr>
        <tr><th>pyarrow</th><td>parquet 저장</td></tr>
        <tr><th>requests + beautifulsoup4</th><td>웹에서 업추비 파일 수집</td></tr>
        <tr><th>hwp-hwpx-parser / pyhwp</th><td>한글 파일 파싱</td></tr>
      </table>

      <h2 class="study-h2">수동으로 venv 만들기 (참고)</h2>
      <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
python3 -m venv .venv
.venv/bin/pip install -U pip
.venv/bin/pip install -r scripts/requirements.txt
.venv/bin/python --version</pre>

      <h2 class="study-h2">Python 스크립트 실행 패턴</h2>
      <pre class="study-code">.venv/bin/python scripts/verify_setup.py
<span class="cmt"># 또는 ensure_venv 후</span>
source scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/sync_web_data.py</pre>

      <h2 class="study-h2">실습</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
source scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/verify_setup.py</pre>
        </div>
      </div>
    `,
  },
  {
    id: "ch05-kakao-keys",
    title: "카카오 API 키 설정",
    keywords: "kakao REST JAVASCRIPT geocode config",
    lead: "주소→좌표(geocode)와 브라우저 지도에 카카오 키가 필요합니다. 키는 절대 공개 저장소에 raw 형태로 올리지 않습니다.",
    html: `
      <h2 class="study-h2">키 두 종류</h2>
      <table class="study-table">
        <tr><th>REST_API_KEY</th><td>Python <code>geocode_venues.py</code> 가 서버에서 주소 검색할 때 사용. <code>scripts/.env</code> 에 저장</td></tr>
        <tr><th>JAVASCRIPT_KEY</th><td>브라우저에서 카카오 지도 SDK 로드. <code>web/js/config.js</code> 에 저장 (배포됨 → <strong>도메인 제한 필수</strong>)</td></tr>
      </table>

      <h2 class="study-h2">설정 파일</h2>
      <pre class="study-code">kakao_keys.paste   <span class="cmt"># 직접 편집 (gitignore)</span>
REST_API_KEY=여기에_REST_키
JAVASCRIPT_KEY=여기에_JS_키</pre>

      <h2 class="study-h2">한 번에 세팅하는 명령</h2>
      <pre class="study-code">bash ~/hermes-restaurant-setup.sh</pre>
      <p class="study-p">동작 순서:</p>
      <ol class="study-ol">
        <li><code>kakao_keys.paste</code> 없으면 예시 파일 복사 후 편집기 열기 → 종료</li>
        <li>키 있으면 <code>apply_kakao_keys.py</code> → <code>.env</code> + <code>config.js</code> 생성</li>
        <li><code>run_pipeline.sh</code> 전체 실행</li>
      </ol>

      <h2 class="study-h2">geocode_venues.py 가 키 읽는 방법</h2>
      <pre class="study-code"><span class="cmt"># scripts/geocode_venues.py</span>
ENV_FILE = ROOT / "scripts" / ".env"
<span class="cmt"># KAKAO_REST_API_KEY 또는 REST_API_KEY 형태로 .env에 있음</span></pre>

      <h2 class="study-h2">로컬 vs GitHub 차이</h2>
      <ul class="study-ul">
        <li>로컬 <code>127.0.0.1:5173</code> — 카카오 콘솔에 도메인 등록 필요</li>
        <li>미등록 시 → Leaflet + OpenStreetMap 폴백 (지도는 뜨지만 카카오 POI 정밀도↓)</li>
        <li>공개 URL <code>jdragon712.github.io/sejong-official-restaurant-map</code> 도 등록</li>
      </ul>

      <div class="callout callout--warn">
        <strong>보안</strong>
        <code>kakao_keys.paste</code>, <code>scripts/.env</code>, <code>data/private/</code>, <code>data/raw/</code> 는 GitHub에 올리지 마세요.
      </div>
    `,
  },
  {
    id: "ch06-fetch",
    title: "데이터 수집 — fetch_expense_raw_2026.py",
    keywords: "fetch 수집 업무추진비 raw download",
    lead: "기관 게시판에서 업무추진비 첨부파일을 받아 data/raw/expense/ 에 저장합니다. 아직 파싱하지 않습니다.",
    html: `
      <h2 class="study-h2">수집 스크립트</h2>
      <p class="study-p"><code>scripts/fetch_expense_raw_2026.py</code> — 2025-01부터 현재까지 게시물을 크롤링합니다.</p>

      <h2 class="study-h2">입력(설정) 파일</h2>
      <ul class="study-ul">
        <li><code>data/manual/sejong_expense_scope_registry.csv</code> — 수집 대상 기관</li>
        <li><code>data/manual/public_agency_expense_urls.json</code></li>
        <li><code>data/manual/mois_expense_boards.json</code></li>
      </ul>

      <h2 class="study-h2">출력 구조</h2>
      <pre class="study-code">data/raw/expense/{기관슬러그}/{연도}/파일.xlsx
data/raw/expense/_manifest/fetch_2026_log.jsonl  <span class="cmt"># 수집 로그</span></pre>

      <h2 class="study-h2">Hermes 단축 명령</h2>
      <pre class="study-code">bash ~/hermes-restaurant-fetch.sh</pre>
      <p class="study-p">내부에서 실행하는 것:</p>
      <pre class="study-code">.venv/bin/python scripts/fetch_status.py
.venv/bin/python scripts/fetch_expense_raw_2026.py --from-date 2025-01-01 --delay 0.45
.venv/bin/python scripts/fetch_status.py</pre>

      <h2 class="study-h2">주요 옵션</h2>
      <table class="study-table">
        <tr><th><code>--from-date 2025-01-01</code></th><td>이 날짜 이후 게시물만</td></tr>
        <tr><th><code>--delay 0.45</code></th><td>요청 간격(초). 서버 부하 방지</td></tr>
        <tr><th><code>--retry-zero</code></th><td>0바이트로 실패한 파일 재시도 (월간 갱신 시)</td></tr>
      </table>

      <h2 class="study-h2">수집 현황 확인</h2>
      <pre class="study-code">source scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/fetch_status.py</pre>

      <div class="callout callout--cmd">
        <strong>다음 단계</strong>
        raw가 쌓이면 <code>normalize_expense.py</code> 가 엑셀·HWP 내용을 표 형태로 읽습니다.
      </div>
    `,
  },
  {
    id: "ch07-pipeline-overview",
    title: "파이프라인 8단계 개요",
    keywords: "pipeline run_pipeline 8단계 ETL",
    lead: "run_pipeline.sh 가 순서대로 8개 Python 스크립트를 실행합니다. 전체를 한 번에 돌리거나, 단계별로 따로 돌릴 수 있습니다.",
    html: `
      <h2 class="study-h2">전체 실행</h2>
      <pre class="study-code">bash ~/hermes-restaurant-parse.sh
<span class="cmt"># = scripts/run_pipeline.sh</span></pre>

      <h2 class="study-h2">8단계 표</h2>
      <table class="study-table">
        <tr><th>#</th><th>스크립트</th><th>하는 일</th><th>주요 산출물</th></tr>
        <tr><td>1</td><td>import_restaurant_lists.py</td><td>인허가·여민전 CSV → POI</td><td>processed/permit…</td></tr>
        <tr><td>2</td><td>normalize_expense.py</td><td>raw 업추비 → 통일된 행(line items)</td><td>processed/expense_lines…</td></tr>
        <tr><td>3</td><td>aggregate_visits.py</td><td>상호별 방문 횟수 집계</td><td>private(금액), processed(횟수)</td></tr>
        <tr><td>4</td><td>match_venues.py</td><td>업추비 상호 ↔ 인허가 매칭</td><td>venue_matches.parquet</td></tr>
        <tr><td>5</td><td>export_public.py</td><td>공개 JSON 생성 + 금액 필드 차단</td><td>export/*.json</td></tr>
        <tr><td>6</td><td>geocode_venues.py</td><td>카카오 REST로 좌표</td><td>restaurants.map.json</td></tr>
        <tr><td>7</td><td>sync_web_data.py</td><td>export → web/data 복사</td><td>web/data/*.json</td></tr>
        <tr><td>8</td><td>verify_setup.py</td><td>환경·파일 점검</td><td>콘솔 리포트</td></tr>
      </table>

      <h2 class="study-h2">run_pipeline.sh 핵심 인자 (현재 고정값)</h2>
      <pre class="study-code">aggregate_visits.py --from-date 2025-01-01 --as-of 2026-05-31
export_public.py --from-date 2025-01-01 --data-as-of 2026-05-31
geocode_venues.py --limit 2000</pre>
      <p class="study-p">새 달 데이터 반영 시 <code>--data-as-of</code> 날짜를 바꿉니다 (예: 2026-06-30).</p>

      <h2 class="study-h2">횟수 vs 금액 분리 (핵심 설계)</h2>
      <ul class="study-ul">
        <li><code>aggregate_visits.py</code> — 금액은 <code>data/private/</code>, 횟수는 processed</li>
        <li><code>export_public.py</code> — FORBIDDEN_SUBSTRINGS 로 금액·직급 필드명 차단</li>
      </ul>
    `,
  },
  {
    id: "ch08-pipeline-detail-1",
    title: "파이프라인 1~4단계 상세",
    keywords: "import normalize aggregate match venues",
    lead: "인허가 목록을 읽고, 업추비를 정규화한 뒤, 방문을 세고, 식당 이름을 맞춥니다.",
    html: `
      <h2 class="study-h2">1단계 — import_restaurant_lists.py</h2>
      <pre class="study-code">.venv/bin/python scripts/import_restaurant_lists.py</pre>
      <ul class="study-ul">
        <li>입력: <code>data/raw/permit/</code> 세종 음식점·휴게음식점·여민전 CSV</li>
        <li>출력: 인허가 기반 POI 테이블 (상호, 주소, 영업 상태)</li>
        <li>목적: 업추비에 나온 「○○식당」이 실제 어떤 주소의 업소인지 나중에 연결</li>
      </ul>

      <h2 class="study-h2">2단계 — normalize_expense.py</h2>
      <pre class="study-code">.venv/bin/python scripts/normalize_expense.py</pre>
      <ul class="study-ul">
        <li>입력: <code>data/raw/expense/</code> 각종 형식 (xlsx, hwp, pdf…)</li>
        <li>파서 분기: <code>parse_sejong_expense.py</code>, <code>parse_hwp_expense.py</code>, <code>parse_mpis_expense.py</code> 등</li>
        <li>출력: 통일 스키마 — <code>executed_at</code>(날짜), <code>venue_name</code>(상호), <code>amount</code>(금액, 비공개 경로로)</li>
      </ul>

      <h2 class="study-h2">3단계 — aggregate_visits.py</h2>
      <pre class="study-code">.venv/bin/python scripts/aggregate_visits.py --from-date 2025-01-01 --as-of 2026-05-31</pre>
      <p class="study-p">옵션 설명:</p>
      <table class="study-table">
        <tr><th><code>--from-date</code></th><td>집계 시작일 (2025-01-01부터 전체 누적)</td></tr>
        <tr><th><code>--as-of</code></th><td>집계 종료 기준일 (manifest의 data_as_of 와 맞춤)</td></tr>
        <tr><th><code>--months 6</code></th><td>최근 N개월 윈도우 (별도 컬럼 생성 시)</td></tr>
      </table>
      <p class="study-p">공개 필드 예: <code>visit_count_total</code> — 지도가 이 숫자를 사용합니다.</p>

      <h2 class="study-h2">4단계 — match_venues.py</h2>
      <pre class="study-code">.venv/bin/python scripts/match_venues.py
.venv/bin/python scripts/match_venues.py --refresh-permit  <span class="cmt"># 인허가 재로드</span></pre>
      <ul class="study-ul">
        <li>업추비 상호 문자열 ↔ 인허가 상호 fuzzy 매칭</li>
        <li>출력: <code>data/processed/venue_matches.parquet</code></li>
        <li>매칭 안 된 건은 주소 없이 횟수만 있을 수 있음 → geocode 어려움</li>
      </ul>

      <div class="callout callout--tip">
        <strong>읽는 법</strong>
        parquet는 Excel이 아닙니다. Python에서 <code>pd.read_parquet(...)</code> 로 열거나, export 이후 JSON을 보세요.
      </div>
    `,
  },
  {
    id: "ch09-pipeline-detail-2",
    title: "파이프라인 5~8단계 상세",
    keywords: "export_public geocode sync verify FORBIDDEN",
    lead: "공개 JSON을 만들고, 좌표를 붙이고, 웹 폴더에 복사한 뒤 점검합니다.",
    html: `
      <h2 class="study-h2">5단계 — export_public.py</h2>
      <pre class="study-code">.venv/bin/python scripts/export_public.py \\
  --from-date 2025-01-01 \\
  --data-as-of 2026-05-31</pre>

      <h3 class="study-h3">금액 차단 코드 (반드시 이해)</h3>
      <pre class="study-code">FORBIDDEN_SUBSTRINGS = re.compile(
    r"amount|total_amount|price|cost|집행액|원\\"|attendee|직급|직위|장관|차관|부서장",
    re.I,
)
<span class="cmt"># 공개 JSON 키 이름에 위 패턴이 있으면 export 실패 → 실수로 금액 유출 방지</span></pre>

      <p class="study-p">생성 파일:</p>
      <ul class="study-ul">
        <li><code>data/export/restaurants.public.json</code></li>
        <li><code>data/export/restaurants.map.json</code> (geocode 후 갱신)</li>
        <li><code>data/export/manifest.json</code> — data_as_of, record_count</li>
      </ul>

      <h2 class="study-h2">6단계 — geocode_venues.py</h2>
      <pre class="study-code">.venv/bin/python scripts/geocode_venues.py --limit 2000
.venv/bin/python scripts/geocode_venues.py --purge-invalid --missing-only --limit 1000</pre>
      <table class="study-table">
        <tr><th><code>--limit N</code></th><td>최대 N건 API 호출 (쿼터 절약)</td></tr>
        <tr><th><code>--missing-only</code></th><td>좌표 없는 것만</td></tr>
        <tr><th><code>--purge-invalid</code></th><td>세종 밖·잘못된 좌표 제거</td></tr>
      </table>
      <p class="study-p">전략: <strong>상호 키워드 검색 우선</strong>, 주소 검색 보조. 캐시: <code>data/processed/geocode_cache.json</code></p>

      <h2 class="study-h2">보조 — coord_backfill.py</h2>
      <pre class="study-code">.venv/bin/python scripts/coord_backfill.py</pre>
      <p class="study-p">같은 주소·비슷한 상호를 가진 다른 행에서 좌표를 빌려 옵니다. API 호출 없이 좌표 보유율을 올립니다.</p>

      <h2 class="study-h2">7단계 — sync_web_data.py</h2>
      <pre class="study-code">.venv/bin/python scripts/sync_web_data.py</pre>
      <p class="study-p">복사 목록 (전부 export → web/data):</p>
      <pre class="study-code">restaurants.map.json
restaurants.public.json
agencies.public.json
manifest.json
expense_scope_coverage.json</pre>

      <h2 class="study-h2">8단계 — verify_setup.py</h2>
      <pre class="study-code">.venv/bin/python scripts/verify_setup.py</pre>
      <p class="study-p">venv, 키 파일, JSON 존재 여부 등을 출력합니다. 에이전트 자동화 후에는 <code>data/processed/verify_last_run.json</code> 도 확인합니다.</p>

      <h2 class="study-h2">실습 — export만 다시</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
source scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/export_public.py --from-date 2025-01-01 --data-as-of 2026-05-31
"$RESTAURANT_MAP_PYTHON" scripts/sync_web_data.py
bash ~/hermes-restaurant-serve.sh</pre>
        </div>
      </div>
    `,
  },
];