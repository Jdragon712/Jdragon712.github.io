/* global window */
window.STUDY_CHAPTERS_2 = [
  {
    id: "ch10-enhance-monthly",
    title: "증분 갱신(enhance)과 월간 업데이트",
    keywords: "enhance monthly update data-as-of deploy",
    lead: "처음 전체 파이프라인 이후에는 새 업추비만 추가되므로, 더 짧은 enhance 경로를 씁니다.",
    html: `
      <h2 class="study-h2">enhance vs full pipeline</h2>
      <table class="study-table">
        <tr><th>전체 (parse)</th><td>raw 없을 때, 처음부터, 인허가·정규화 포함 8단계</td></tr>
        <tr><th>enhance</th><td>raw 이미 있음 → 매칭·export·geocode·sync만 (빠름)</td></tr>
      </table>

      <h2 class="study-h2">run_enhance.sh (6단계)</h2>
      <pre class="study-code">bash ~/hermes-restaurant-enhance.sh
<span class="cmt"># = scripts/run_enhance.sh</span></pre>
      <ol class="study-ol">
        <li><code>match_venues.py --refresh-permit</code></li>
        <li><code>export_public.py --from-date 2025-01-01 --data-as-of 2026-05-31</code></li>
        <li><code>geocode_venues.py --purge-invalid --missing-only --limit 1000</code></li>
        <li><code>coord_backfill.py</code></li>
        <li><code>audit_quality.py</code> (실패해도 계속)</li>
        <li><code>sync_web_data.py</code></li>
      </ol>

      <h2 class="study-h2">월간 통합 — hermes-restaurant-update.sh</h2>
      <pre class="study-code">bash ~/hermes-restaurant-update.sh
bash ~/hermes-restaurant-update.sh --deploy
bash ~/hermes-restaurant-update.sh --data-as-of 2026-06-30 --deploy</pre>

      <p class="study-p">내부 (<code>scripts/run_monthly_update.sh</code>):</p>
      <ol class="study-ol">
        <li><code>hermes-restaurant-fetch.sh</code> — 새 raw 수집</li>
        <li>match → export (DATA_AS_OF) → geocode 2회 → coord_backfill → sync → audit → verify</li>
        <li><code>--deploy</code> 이면 <code>deploy_github_pages.sh</code></li>
      </ol>

      <h2 class="study-h2">data-as-of 바꿔야 하는 곳</h2>
      <ul class="study-ul">
        <li><code>run_enhance.sh</code> 16행</li>
        <li><code>run_pipeline.sh</code> 46·52행</li>
        <li><code>run_monthly_update.sh</code> — <code>--data-as-of</code> 인자로 덮어씀</li>
        <li><code>data/export/manifest.json</code> → 웹 푸터에 자동 반영</li>
      </ul>

      <div class="callout callout--cmd">
        <strong>현재 기준 (2026-07)</strong>
        data-as-of: <strong>2026-05-31</strong> · 다음 추가: <strong>2026년 6월</strong> 업추비
      </div>
    `,
  },
  {
    id: "ch11-shell-scripts",
    title: "Hermes 쉘 스크립트 완전 레퍼런스",
    keywords: "hermes-restaurant sh bash 스크립트",
    lead: "홈 디렉터리(~/ )의 hermes-restaurant-*.sh 파일은 모두 이 프로젝트를 위한 단축키입니다.",
    html: `
      <h2 class="study-h2">전체 목록</h2>
      <table class="study-table">
        <tr><th>스크립트</th><th>역할</th></tr>
        <tr><td><code>hermes-restaurant-setup.sh</code></td><td>카카오 키 paste → apply → full pipeline</td></tr>
        <tr><td><code>hermes-restaurant-fetch.sh</code></td><td>업추비 raw 수집</td></tr>
        <tr><td><code>hermes-restaurant-parse.sh</code></td><td>8단계 전체 파이프라인</td></tr>
        <tr><td><code>hermes-restaurant-enhance.sh</code></td><td>매칭·export·geocode·sync</td></tr>
        <tr><td><code>hermes-restaurant-sync.sh</code></td><td>export → web/data 복사만</td></tr>
        <tr><td><code>hermes-restaurant-serve.sh</code></td><td>지도 로컬 서버 :5173</td></tr>
        <tr><td><code>hermes-restaurant-open.sh</code></td><td>serve + 브라우저 open</td></tr>
        <tr><td><code>hermes-restaurant-update.sh</code></td><td>월간 fetch+enhance (+--deploy)</td></tr>
        <tr><td><code>hermes-restaurant-doctor.sh</code></td><td>환경 점검 (--fix 시 복구)</td></tr>
        <tr><td><code>hermes-restaurant-verify.sh</code></td><td>verify_setup.py</td></tr>
        <tr><td><code>hermes-restaurant-publish.sh</code></td><td>GitHub Pages 배포</td></tr>
        <tr><td><code>hermes-tutorial-open.sh</code></td><td>강의 슬라이드 :5180</td></tr>
      </table>

      <h2 class="study-h2">환경변수</h2>
      <table class="study-table">
        <tr><th><code>RESTAURANT_MAP_PROJ</code></th><td>프로젝트 루트 경로 (기본: Desktop/…/맛집앱)</td></tr>
        <tr><th><code>RESTAURANT_MAP_PYTHON</code></th><td>.venv/bin/python 경로 (ensure_venv가 설정)</td></tr>
        <tr><th><code>DATA_AS_OF</code></th><td>월간 업데이트 시 export 기준일</td></tr>
      </table>

      <h2 class="study-h2">일상 작업 치트시트</h2>
      <pre class="study-code"><span class="cmt"># 상태 점검</span>
bash ~/hermes-restaurant-doctor.sh

<span class="cmt"># 지도 로컬 보기</span>
bash ~/hermes-restaurant-open.sh

<span class="cmt"># JSON만 웹에 반영</span>
bash ~/hermes-restaurant-sync.sh

<span class="cmt"># 새 업추비 반영 (배포 없이)</span>
bash ~/hermes-restaurant-update.sh

<span class="cmt"># 반영 + GitHub 공개</span>
bash ~/hermes-restaurant-update.sh --deploy</pre>
    `,
  },
  {
    id: "ch12-web-frontend",
    title: "웹 프론트엔드 구조 (HTML / CSS / JS)",
    keywords: "index.html style.css leaflet kakao",
    lead: "web/ 폴더는 서버 없이 브라우저만으로 동작하는 정적 사이트입니다.",
    html: `
      <h2 class="study-h2">index.html</h2>
      <ul class="study-ul">
        <li>지도 컨테이너 <code>#map</code>, 왼쪽 드로어 <code>#venue-drawer</code></li>
        <li>유지보수 패널 <code>#site-maintenance</code> — <code>data/maintenance.json</code> 으로 원격 on/off</li>
        <li><code>&lt;base&gt;</code> 자동 삽입 — GitHub Pages 하위 경로에서 asset 경로 보정</li>
        <li>로컬(<code>127.0.0.1</code>)에서는 유지보수 안내 숨김</li>
      </ul>

      <h2 class="study-h2">css/style.css</h2>
      <ul class="study-ul">
        <li>반응형 레이아웃, 드로어, 티어 범례, 토스트</li>
        <li>물방울 마커는 JS가 HTML 문자열로 생성 (CSS는 크기·z-index 보조)</li>
      </ul>

      <h2 class="study-h2">JS 로드 순서</h2>
      <pre class="study-code">app-loader.js  →  app.js (type=module)
  imports map-kakao.js, map-geocode.js, map-overlap-stack.js
  dynamic import config.js (카카오 키)</pre>

      <h2 class="study-h2">데이터 로드</h2>
      <pre class="study-code">fetch(resolvePublicUrl("data/restaurants.map.json?v=캐시버전"))
fetch(resolvePublicUrl("data/manifest.json"))</pre>
      <p class="study-p"><code>resolvePublicUrl()</code> — GitHub Pages 서브경로에서도 상대 경로가 깨지지 않게 합니다.</p>

      <h2 class="study-h2">지도 제공자 선택</h2>
      <ol class="study-ol">
        <li><code>config.js</code> 에 JS 키 + <code>preferKakaoMap: true</code></li>
        <li><code>loadKakaoSdk()</code> + <code>verifyKakaoMapReady()</code></li>
        <li>실패 시 → Leaflet + OSM 타일 (폴백 토스트)</li>
      </ol>

      <h2 class="study-h2">로컬에서 웹만 수정할 때</h2>
      <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱/web
<span class="cmt"># JS/CSS 수정 후</span>
bash ~/hermes-restaurant-serve.sh
<span class="cmt"># 브라우저 강력 새로고침 Cmd+Shift+R</span></pre>
    `,
  },
  {
    id: "ch13-app-js",
    title: "app.js 핵심 로직 읽기",
    keywords: "MIN_MAP_VISITS tier dedupe drawer exclude",
    lead: "app.js는 1800줄 이상입니다. 전부 외울 필요 없고, 상수·필터·티어·드로어 네 가지만 잡으면 됩니다.",
    html: `
      <h2 class="study-h2">핵심 상수 (파일 상단)</h2>
      <pre class="study-code">const MIN_MAP_VISITS = 10;        <span class="cmt"># 10회 미만 마커 제외</span>
const STALE_VENUE_MONTHS = 12;    <span class="cmt"># 12개월 업추비 없고 POI 없으면 폐업 추정</span>
const RETAIL_VENDOR_RE = /코레일유통|하나로마트|.../;
const IMART_RETAIL_RE = /이마트24|이마트에브리데이|.../;
const NON_RESTAURANT_EXACT_NAMES = new Set(["운산"]);
const TIER_COLORS = { 1: 빨, 2: 주, 3: 노, 4: 초, 5: 파 };</pre>

      <h2 class="study-h2">마커 제외 — isExcludedFromMapMarkers()</h2>
      <pre class="study-code">function isExcludedFromMapMarkers(r) {
  return isLikelyClosedForMap(r) || isNonRestaurantMapVenue(r);
}</pre>
      <ul class="study-ul">
        <li><code>isLikelyClosedForMap</code> — 오래된 업소, 인허가 휴·폐업</li>
        <li><code>isNonRestaurantMapVenue</code> — 마트, 코레일, 이마트 본점(회코너 인허가는 예외)</li>
      </ul>

      <h2 class="study-h2">지도에 올라가는 조건</h2>
      <pre class="study-code">visitCount(r) >= MIN_MAP_VISITS
&& !isExcludedFromMapMarkers(r)
&& (좌표 있음 또는 resolveVenueCoords로 연결)</pre>

      <h2 class="study-h2">티어 — buildVisitRankMeta()</h2>
      <table class="study-table">
        <tr><th>티어</th><th>방문 순위 (클러스터 단위)</th></tr>
        <tr><td>1</td><td>1 ~ 20</td></tr>
        <tr><td>2</td><td>21 ~ 50</td></tr>
        <tr><td>3</td><td>51 ~ 100</td></tr>
        <tr><td>4</td><td>101 ~ 200</td></tr>
        <tr><td>5</td><td>201 ~</td></tr>
      </table>

      <h2 class="study-h2">중복 합산 — dedupeAndMergeVenues()</h2>
      <p class="study-p">같은 <code>restaurant_id</code> 또는 상호 변형(띄어쓰기·괄호)은 방문 횟수를 합칩니다. UI에 「N건 합산」 문구는 넣지 않습니다.</p>

      <h2 class="study-h2">드로어 (venue-drawer)</h2>
      <table class="study-table">
        <tr><th>openMarkerDrawer</th><td>마커 클릭 시 왼쪽 목록</td></tr>
        <tr><th>renderDrawerList</th><td>묶인 식당 리스트</td></tr>
        <tr><th>buildInlineDetailHtml</th><td>행 펼침 상세</td></tr>
      </table>

      <h2 class="study-h2">직접 읽어볼 함수 목록</h2>
      <ol class="study-ol">
        <li><code>loadRestaurants()</code> — JSON fetch</li>
        <li><code>resolveVenueCoords()</code> — 주소 peer 좌표</li>
        <li><code>buildMapMarkerItems()</code> — 마커 목록 생성</li>
        <li><code>mergeOverlappingMarkerItems()</code> — 40m 겹침 (overlap 모듈)</li>
        <li><code>renderSources()</code> — 푸터 출처</li>
      </ol>
    `,
  },
  {
    id: "ch14-map-modules",
    title: "지도 보조 모듈 3개",
    keywords: "map-kakao overlap geocode 40m",
    lead: "app.js를 나눈 이유: 카카오 SDK, 겹침 처리, 브라우저 geocode를 각각 교체·테스트하기 쉽게.",
    html: `
      <h2 class="study-h2">map-kakao.js</h2>
      <ul class="study-ul">
        <li><code>loadKakaoSdk(jsKey)</code> — SDK script 태그 삽입</li>
        <li><code>verifyKakaoMapReady()</code> — 지도 객체가 정상인지 (깨지면 Leaflet 전환)</li>
        <li><code>dropletPinHtml(tier)</code> — 물방울 모양 HTML</li>
        <li><code>addKakaoMarkersBatched</code> — 마커를 나눠 그려 멈춤 방지</li>
        <li>기본 중심: <code>SEJONG_OFFICE_VIEW</code> (정부세종청사 근처)</li>
      </ul>

      <h2 class="study-h2">map-overlap-stack.js</h2>
      <pre class="study-code">OVERLAP_RADIUS_M = 40  <span class="cmt"># 40미터 이내</span>
mergeOverlappingMarkerItems(items) → 무지개 스택 마커 1개</pre>
      <ul class="study-ul">
        <li>2곳 이상 겹치면 「단골 밀집」 무지개 핀</li>
        <li>앵커 = 가장 높은 순위(낮은 티어 번호) 업소</li>
        <li><code>haversineDistanceM</code> — 두 좌표 거리(미터)</li>
      </ul>

      <h2 class="study-h2">map-geocode.js</h2>
      <ul class="study-ul">
        <li><code>refineRestaurantCoords()</code> — 브라우저에서 Kakao Places로 POI 라벨 보정</li>
        <li>파이프라인 geocode와 별개 — 사용자 화면에서 표시명·핀 위치 개선</li>
        <li>localStorage 캐시 사용 (API 호출 절약)</li>
      </ul>

      <h2 class="study-h2">캐시 버전</h2>
      <p class="study-p">JS/CSS URL에 <code>?v=20260727</code> 같은 쿼리를 붙입니다. 배포 후 사용자 브라우저가 옛 파일을 쓰지 않게 하려고 <strong>index.html과 함께</strong> 버전을 올립니다.</p>
    `,
  },
  {
    id: "ch15-deploy",
    title: "GitHub Pages 배포",
    keywords: "deploy github pages rsync sejong-official-restaurant-map",
    lead: "배포되는 것은 web/ 폴더뿐입니다. scripts/, data/raw/, data/private/ 는 절대 올리지 않습니다.",
    html: `
      <h2 class="study-h2">배포 명령</h2>
      <pre class="study-code">bash ~/hermes-restaurant-publish.sh
<span class="cmt"># 또는</span>
bash ~/Desktop/헤르메스\ 비서/부업/맛집앱/scripts/deploy_github_pages.sh</pre>

      <h2 class="study-h2">deploy_github_pages.sh 동작</h2>
      <ol class="study-ol">
        <li>임시 폴더에 <code>git clone https://github.com/Jdragon712/sejong-official-restaurant-map.git</code></li>
        <li>저장소 루트를 비우고 <code>rsync web/</code> → 루트 (private 경로 exclude)</li>
        <li><code>.nojekyll</code> 없으면 생성 (Jekyll 비활성화)</li>
        <li>commit + push → GitHub Actions/Pages 빌드</li>
      </ol>

      <h2 class="study-h2">배포 전 체크리스트</h2>
      <ul class="study-ul">
        <li><code>web/js/config.js</code> 존재 (카카오 JS 키)</li>
        <li><code>web/data/manifest.json</code> 의 data_as_of 최신</li>
        <li><code>data/maintenance.json</code> → <code>active: false</code> (평상시)</li>
        <li>금액·raw·.env 가 web/ 에 없는지 <code>find web -name '*.env'</code></li>
      </ul>

      <h2 class="study-h2">공개 URL</h2>
      <pre class="study-code">https://jdragon712.github.io/sejong-official-restaurant-map/</pre>

      <h2 class="study-h2">강의 슬라이드·학습 교재 배포 (별도)</h2>
      <p class="study-p"><code>tutorial-web/</code> 전체를 새 GitHub 저장소에 올리면 Pages로 강의 자료 URL을 줄 수 있습니다. 구조는 이미 <code>.nojekyll</code> 포함.</p>
    `,
  },
  {
    id: "ch16-ai-agent",
    title: "AI 에이전트로 이 프로젝트 배우고 운영하기",
    keywords: "AI agent hermes grok cursor 프롬프트",
    lead: "AI는 코드·문서·명령 실행을 돕지만, 방향과 검증은 사람이 합니다.",
    html: `
      <h2 class="study-h2">이 프로젝트에서 AI가 실제로 한 일</h2>
      <ul class="study-ul">
        <li>운영 매뉴얼 <code>docs/operations/06_최종운영매뉴얼_20260705.md</code> 정리</li>
        <li>좌표 갭 분석·<code>coord_backfill.py</code> 실행 절차</li>
        <li>GitHub Pages 경로·카카오 폴백 버그 수정 (<code>resolvePublicUrl</code>)</li>
        <li><code>hermes-restaurant-*.sh</code> 단축 스크립트 생성</li>
        <li>마커 필터 (MIN_MAP_VISITS=10, 이마트·마트 제외)</li>
      </ul>

      <h2 class="study-h2">효과적인 요청 문장 예시</h2>
      <table class="study-table">
        <tr><th>나쁜 예</th><td>「지도 고쳐줘」</td></tr>
        <tr><th>좋은 예</th><td>「2026-06 업추비 반영해서 data-as-of 2026-06-30으로 update하고 로컬 serve까지」</td></tr>
        <tr><th>좋은 예</th><td>「restaurants.map.json에서 visit_count_total>=10인데 좌표 없는 곳 몇 개인지 audit_coord_display.py로 확인」</td></tr>
        <tr><th>좋은 예</th><td>「app.js isExcludedFromMapMarkers 조건을 docs/operations/02 와 맞는지 검토」</td></tr>
      </table>

      <h2 class="study-h2">AI에게 맡기면 안 되는 것</h2>
      <ul class="study-ul">
        <li>금액 데이터를 공개 JSON·GitHub에 넣는 것</li>
        <li>카카오·공공데이터 이용약관 위반 (과도한 API 호출, 출처 미표시)</li>
        <li>배포 전 최종 확인 없이 <code>--deploy</code></li>
      </ul>

      <h2 class="study-h2">셸이 실패할 때</h2>
      <pre class="study-code">bash ~/hermes-restaurant-doctor.sh
bash ~/hermes-restaurant-doctor.sh --fix
cat ~/Desktop/헤르메스\ 비서/부업/맛집앱/data/processed/verify_last_run.json</pre>
    `,
  },
  {
    id: "ch17-troubleshooting",
    title: "트러블슈팅 사전",
    keywords: "오류 문제 해결 지도 안뜸 geocode",
    lead: "자주 막히는 지점과 확인 명령을 모았습니다.",
    html: `
      <h2 class="study-h2">지도가 비어 있음</h2>
      <ol class="study-ol">
        <li><code>web/data/restaurants.map.json</code> 존재·크기 확인</li>
        <li>브라우저 개발자도구 Network — JSON 404? → <code>sync_web_data.py</code></li>
        <li>GitHub Pages면 <code>&lt;base&gt;</code> / <code>resolvePublicUrl</code> 경로</li>
      </ol>

      <h2 class="study-h2">마커가 너무 적음</h2>
      <ul class="study-ul">
        <li><code>MIN_MAP_VISITS = 10</code> — 10회 미만은 의도적으로 제외</li>
        <li><code>isExcludedFromMapMarkers</code> — 마트·폐업 추정</li>
        <li>좌표 없음 → <code>geocode_venues.py</code>, <code>coord_backfill.py</code></li>
      </ul>

      <h2 class="study-h2">카카오 지도 안 뜨고 OSM만</h2>
      <ul class="study-ul">
        <li>JS 키·도메인 등록 (localhost, github.io)</li>
        <li><code>web/js/config.js</code> 확인</li>
        <li>의도된 폴백일 수 있음 — Leaflet으로도 서비스 가능</li>
      </ul>

      <h2 class="study-h2">export_public 실패 (FORBIDDEN)</h2>
      <p class="study-p">공개 JSON에 금액·직급 관련 <strong>필드 이름</strong>이 들어갔다는 뜻. export_public.py 또는 match 결과 컬럼명을 점검합니다.</p>

      <h2 class="study-h2">venv / pip 오류</h2>
      <pre class="study-code">rm -rf .venv
source scripts/ensure_venv.sh</pre>

      <h2 class="study-h2">진단 스크립트</h2>
      <pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/audit_web_display.py
"$RESTAURANT_MAP_PYTHON" scripts/audit_coord_display.py
"$RESTAURANT_MAP_PYTHON" scripts/fetch_status.py</pre>
    `,
  },
  {
    id: "ch18-lab",
    title: "종합 실습 — 처음부터 끝까지",
    keywords: "실습 lab 종합 연습",
    lead: "아래 순서를 직접 따라 하면 전체 파이프라인을 한 번 체험합니다. (시간: 30분~수시간, raw·네트워크에 따라 다름)",
    html: `
      <h2 class="study-h2">실습 A — 환경 확인만 (5분)</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">bash ~/hermes-restaurant-doctor.sh
source ~/Desktop/헤르메스\ 비서/부업/맛집앱/scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/verify_setup.py</pre>
        </div>
      </div>

      <h2 class="study-h2">실습 B — 웹 데이터 동기화 + 지도 (10분)</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
source scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/sync_web_data.py
bash ~/hermes-restaurant-open.sh</pre>
          <p>브라우저에서 마커·드로어·푸터 출처를 확인합니다.</p>
        </div>
      </div>

      <h2 class="study-h2">실습 C — enhance 한 바퀴 (15~30분)</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">bash ~/hermes-restaurant-enhance.sh
bash ~/hermes-restaurant-open.sh</pre>
          <p>터미널 로그에서 [1/6]~[6/6] 단계가 순서대로 나가는지 봅니다.</p>
        </div>
      </div>

      <h2 class="study-h2">실습 D — manifest와 JSON 직접 읽기</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <pre class="study-code">cat data/export/manifest.json
"$RESTAURANT_MAP_PYTHON" -c "
import json
p='web/data/restaurants.map.json'
d=json.load(open(p))
print('records', len(d))
print('sample keys', list(d[0].keys())[:8])
print('visit', d[0].get('visit_count_total'))
"</pre>
        </div>
      </div>

      <h2 class="study-h2">실습 E — 공개 지도와 비교</h2>
      <div class="lab-steps">
        <div class="lab-step">
          <p>로컬 <code>127.0.0.1:5173</code> 과 아래 URL을 나란히 열어 같은 data-as-of 인지 확인합니다.</p>
          <pre class="study-code">open https://jdragon712.github.io/sejong-official-restaurant-map/</pre>
        </div>
      </div>

      <h2 class="study-h2">학습 완료 체크리스트</h2>
      <ul class="study-ul">
        <li>□ raw / export / web/data 차이 설명할 수 있다</li>
        <li>□ 8단계 파이프라인 이름과 순서를 말할 수 있다</li>
        <li>□ <code>hermes-restaurant-update.sh</code> 와 <code>--deploy</code> 차이를 안다</li>
        <li>□ <code>MIN_MAP_VISITS</code>, 티어, 40m 겹침을 안다</li>
        <li>□ 금액이 공개되지 않는 이유와 FORBIDDEN_SUBSTRINGS 를 안다</li>
        <li>□ 로컬에서 지도를 띄우고, 강의 슬라이드·이 교재 URL을 연다</li>
      </ul>

      <div class="callout callout--tip">
        <strong>다음 단계</strong>
        2026-06 업추비가 공개되면 <code>bash ~/hermes-restaurant-update.sh --data-as-of 2026-06-30</code> 로 실전 월간 갱신을 연습하세요.
      </div>
    `,
  },
];