/* global window */
window.STUDY_CHAPTERS_3 = [
  {
    id: "ch19-screenshots",
    title: "스크린샷으로 보는 완성품",
    keywords: "스크린샷 화면 지도 슬라이드",
    lead: "실제 화면을 보면서 앞 장의 개념(마커, 드로어, 파이프라인)을 눈으로 확인합니다.",
    html: `
      <figure class="study-figure">
        <img src="assets/img/map-overview.png" alt="세종 단골 식당 지도 전체 화면" loading="lazy" />
        <figcaption>① 완성 지도 — 물방울 티어 마커, 왼쪽 목록, 하단 출처·면책</figcaption>
      </figure>
      <figure class="study-figure">
        <img src="assets/img/map-drawer.png" alt="마커 클릭 후 드로어" loading="lazy" />
        <figcaption>② 마커·겹침 클릭 시 venue-drawer 에 묶인 식당 목록</figcaption>
      </figure>
      <figure class="study-figure">
        <img src="assets/img/pipeline-terminal.png" alt="파이프라인 터미널 로그" loading="lazy" />
        <figcaption>③ <code>run_pipeline.sh</code> 실행 시 터미널에 찍히는 8단계 로그 (예시)</figcaption>
      </figure>
      <figure class="study-figure">
        <img src="assets/img/study-toc.png" alt="상세 학습 교재 목차" loading="lazy" />
        <figcaption>④ 이 교재(study) — 왼쪽 목차, 검색, 읽음 표시</figcaption>
      </figure>
      <figure class="study-figure">
        <img src="assets/img/lecture-slide.png" alt="강의 슬라이드" loading="lazy" />
        <figcaption>⑤ 강의 슬라이드(tutorial-web) — 고학년+학부모용 14장</figcaption>
      </figure>
      <div class="callout callout--tip">
        <strong>스크린샷 다시 찍기</strong>
        <pre class="study-code" style="margin:0.5rem 0 0">bash ~/hermes-restaurant-serve.sh   <span class="cmt"># :5173</span>
bash ~/hermes-tutorial-study-open.sh <span class="cmt"># :5180</span>
cd 맛집앱 && .venv/bin/python tutorial-web/study/scripts/capture_screenshots.py</pre>
      </div>
    `,
  },
  {
    id: "ch20-normalize-1",
    title: "소스 해설 — normalize_expense.py (1/3) 임포트·별칭",
    keywords: "normalize_expense VENUE_ALIASES FIELD_ALIASES",
    lead: "파일: scripts/normalize_expense.py (859줄). 기관마다 다른 엑셀 헤더를 하나의 표준 컬럼으로 맞추는 핵심 ETL입니다.",
    html: `
      <p class="study-p">이 장은 <strong>1~297행</strong> — 임포트, 경로, 헤더 별칭 사전, <code>_resolve_field</code> 까지입니다.</p>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">1</span><code class="code-walk__code">#!/usr/bin/env python3</code><div class="code-walk__explain">맥/리눅스에서 <code>python3 scripts/normalize_expense.py</code> 로 직접 실행 가능한 스크립트.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">2</span><code class="code-walk__code">"""Normalize multi-agency 업무추진비 xlsx ..."""</code><div class="code-walk__explain">여러 기관·형식의 업추비 파일 → <strong>canonical line items</strong>(통일된 한 줄 기록) 로 바꾼다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">17-32</span><code class="code-walk__code">from parse_sejong_expense import ...</code><div class="code-walk__explain">세종 전용·미디어·MPIS·텍스트 파서를 가져옴. 엑셀만으로 안 될 때 <strong>폴백 파서</strong> 로 넘김.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">34-37</span><code class="code-walk__code">ROOT = Path(__file__).resolve().parents[1]</code><div class="code-walk__explain"><code>scripts/</code> 의 부모 = 프로젝트 루트. 어디서 실행해도 경로가 깨지지 않음.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">35-37</span><code class="code-walk__code">DEFAULT_RAW = .../data/raw/expense</code><div class="code-walk__explain">입력: fetch가 받아 둔 원본. 출력은 <code>data/processed/expense_line_items.parquet</code>.</div></div>
      </div>

      <h2 class="study-h2">VENUE_ALIASES (41~77행) — 「식당 이름」 열 찾기</h2>
      <p class="study-p">기관마다 엑셀 첫 줄이 다릅니다. 「집행장소」「사용처」「상호명」… 전부 <code>venue_name</code> 으로 통일합니다.</p>
      <pre class="study-code">VENUE_ALIASES = frozenset({
    "집행장소", "사용처", "업소명", "상호", "가맹점", ...
})</pre>
      <p class="study-p"><code>frozenset</code> = 수정 불가 집합. <code>in</code> 검사가 빠르고 실수로 별칭이 바뀌지 않음.</p>

      <h2 class="study-h2">다른 FIELD_ALIASES (78~239행)</h2>
      <table class="study-table">
        <tr><th>표준 필드</th><th>엑셀에서 찾는 헤더 예</th></tr>
        <tr><td><code>executed_at</code></td><td>집행일시, 사용일, 결제일…</td></tr>
        <tr><td><code>purpose</code></td><td>집행목적, 적요, 사용내역…</td></tr>
        <tr><td><code>amount_krw</code></td><td>집행금액, 사용금액(원)… → <strong>비공개 경로로만</strong></td></tr>
        <tr><td><code>user_label</code></td><td>사용자, 직위 — export 시 공개 JSON에 안 넣음</td></tr>
        <tr><td><code>headcount</code></td><td>참석인원, 대상인원</td></tr>
      </table>

      <h2 class="study-h2">_normalize_header_key (259~266행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">260</span><code class="code-walk__code">unicodedata.normalize("NFKC", key)</code><div class="code-walk__explain">전각·반각 문자 통일 (예: 「집행장소」 표기 차이 흡수).</div></div>
        <div class="code-walk__line"><span class="code-walk__num">262-264</span><code class="code-walk__code">re.sub(r"[*★...]", "", s)</code><div class="code-walk__explain">엑셀 필수입력 별표·괄호 안 단위 제거 후 비교.</div></div>
      </div>

      <h2 class="study-h2">_resolve_field (269~297행) — 헤더 한 칸 → 표준 이름</h2>
      <ol class="study-ol">
        <li>별칭 사전에 <strong>완전 일치</strong> (<code>nk in aliases</code>)</li>
        <li>부분 포함 (<code>alias in nk</code>)</li>
        <li>키워드 휴리스틱: 「장소」「상호」→ venue, 「금액」→ amount</li>
        <li>못 찾으면 <code>None</code> (그 열은 무시)</li>
      </ol>
      <div class="callout callout--tip">
        <strong>왜 이렇게 복잡한가?</strong>
        10개 기관 × 연도별 × 부서별 시트마다 헤더가 달라서, 하드코딩 한 줄로는 불가능합니다.
      </div>
    `,
  },
  {
    id: "ch21-normalize-2",
    title: "소스 해설 — normalize_expense.py (2/3) 시트 파싱",
    keywords: "parse_workbook _extract_records header_layout",
    lead: "298~656행: 헤더 행 자동 탐지, 금액·날짜 파싱, 시트에서 레코드 추출, 워크북 로더.",
    html: `
      <h2 class="study-h2">_header_map · _find_header_layout (300~378행)</h2>
      <p class="study-p">엑셀 1행이 헤더가 아닐 수 있음 (제목·병합셀). <strong>처음 80행</strong>을 스캔해 점수가 가장 높은 헤더 조합을 고릅니다.</p>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">327-341</span><code class="code-walk__code">def _header_score(hmap): venue +3, date +3, purpose +2...</code><div class="code-walk__explain">「상호」「날짜」 열이 같이 잡히면 점수 ↑. 잘못된 행(합계·안내문)은 점수 ↓.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">344-349</span><code class="code-walk__code">def _header_usable: venue_name 필수</code><div class="code-walk__explain">식당 이름 열 없으면 그 시트는 파싱 불가.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">370-376</span><code class="code-walk__code">_combine_header_rows(row_i, row_i+1)</code><div class="code-walk__explain">2줄짜리 헤더(「집행」+「장소」)를 합쳐 「집행 장소」로 인식.</div></div>
      </div>

      <h2 class="study-h2">값 파싱 함수 (386~467행)</h2>
      <table class="study-table">
        <tr><th>함수</th><th>행</th><th>역할</th></tr>
        <tr><td><code>_parse_amount</code></td><td>386-400</td><td>「12,500원」→ 12500 정수. 공개 안 함, private 집계용.</td></tr>
        <tr><td><code>_parse_exec_date</code></td><td>420-445</td><td>엑셀 serial(숫자) 날짜·「2025.03.01」→ ISO <code>2025-03-01</code></td></tr>
        <tr><td><code>_merge_date_parts</code></td><td>448-467</td><td>날짜 열·시간 열 분리된 시트 병합</td></tr>
      </table>

      <h2 class="study-h2">_extract_records_from_sheet (592~653행) — 핵심 루프</h2>
      <pre class="study-code">for row in rows[data_start:]:
    venue = _normalize_venue(str(venue_raw))
    if venue in SKIP_VENUE or venue.startswith("합계"): continue
    if food_only and not _is_food_related(purpose, venue): continue
    records.append({
        "source_agency", "source_file", "dept_sheet",
        "executed_at", "venue_name", "purpose",
        "amount_krw", "headcount", ...
    })</pre>
      <ul class="study-ul">
        <li><code>food_only=True</code>(기본): 식음료 관련 행만 (FOOD_PURPOSE_KEYWORDS)</li>
        <li><code>lenient</code>: 세종 외 기관은 식별 규칙 완화</li>
        <li><code>fallback_period</code>: 날짜 없는 행에 파일명「2025년 3월」에서 추정</li>
      </ul>

      <h2 class="study-h2">parse_workbook (656~756행) — 파일 하나 처리</h2>
      <ol class="study-ol">
        <li>로더 순서: <code>.xls</code>→xlrd, openpyxl, pandas</li>
        <li>시트마다 <code>_extract_records_from_sheet</code></li>
        <li>실패 시 폴백: <code>parse_sejong_dept_workbook</code> (세종), MPIS, <code>parse_tabular_rows</code>, <code>parse_text_content</code></li>
      </ol>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">693-702</span><code class="code-walk__code">if not records and _is_sejong_path: parse_sejong_dept_workbook</code><div class="code-walk__explain">세종시청 형식은 전용 파서가 더 정확할 때가 많음.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">747-754</span><code class="code-walk__code">return DataFrame(), "no_header" / "no_parseable_rows"</code><div class="code-walk__explain">실패 이유를 리포트에 남김 → 나중에 수동 보완.</div></div>
      </div>
    `,
  },
  {
    id: "ch22-normalize-3",
    title: "소스 해설 — normalize_expense.py (3/3) 디렉터리·main",
    keywords: "load_expense_dir main parquet normalize_report",
    lead: "759~859행: raw 폴더 전체 순회, parse_media_expense 위임, parquet 저장.",
    html: `
      <h2 class="study-h2">load_expense_dir (759~822행)</h2>
      <pre class="study-code">for path in sorted(raw_dir.rglob("*")):
    if "_manifest" in path.parts: continue
    kind = classify_expense_file(path)
    if kind in {"skip", "unknown"}: continue
    ...
    df, err = parse_media_expense(path, parse_workbook_fn=parse_workbook)</pre>

      <table class="study-table">
        <tr><th>변수/로직</th><th>설명</th></tr>
        <tr><td><code>infer_source_agency(path)</code></td><td>경로 첫 폴더명 → 「교육부」「세종특별자치시」 등</td></tr>
        <tr><td><code>dedupe_key</code></td><td>같은 파일명 중복 수집 방지</td></tr>
        <tr><td><code>report</code></td><td>files_parsed/skipped, by_agency, skipped 사유 최대 100건</td></tr>
      </table>

      <h2 class="study-h2">main (825~859행) — 직접 실행</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">827-829</span><code class="code-walk__code">--raw-dir, --food-only, --out</code><div class="code-walk__explain">기본 출력: <code>data/processed/expense_line_items.parquet</code></div></div>
        <div class="code-walk__line"><span class="code-walk__num">835-837</span><code class="code-walk__code">normalize_report.json</code><div class="code-walk__explain">파싱 통계 JSON → <code>data/raw/expense/_manifest/</code></div></div>
        <div class="code-walk__line"><span class="code-walk__num">844</span><code class="code-walk__code">items.to_parquet(args.out)</code><div class="code-walk__explain">pandas DataFrame을 parquet(압축 표)로 저장. 다음 단계 aggregate가 읽음.</div></div>
      </div>

      <h2 class="study-h2">실습 명령</h2>
      <pre class="study-code">cd ~/Desktop/헤르메스\ 비서/부업/맛집앱
source scripts/ensure_venv.sh
"$RESTAURANT_MAP_PYTHON" scripts/normalize_expense.py
cat data/raw/expense/_manifest/normalize_report.json | head -40</pre>

      <div class="callout callout--cmd">
        <strong>다음 스크립트</strong>
        <code>aggregate_visits.py</code> 가 이 parquet(또는 raw 재로드)에서 <code>venue_name</code> 별 방문 횟수를 셉니다.
      </div>
    `,
  },
  {
    id: "ch23-aggregate",
    title: "소스 해설 — aggregate_visits.py 전체",
    keywords: "aggregate_visits visit_count_total private parquet",
    lead: "169줄. 방문 횟수(공개)와 금액(비공개)을 분리 집계하는 프로젝트 설계의 핵심입니다.",
    html: `
      <h2 class="study-h2">임포트·경로 (1~22행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">16</span><code class="code-walk__code">from normalize_expense import load_expense_dir</code><div class="code-walk__explain">raw를 다시 읽거나, 이미 만든 line_items를 쓸 수 있음.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">21</span><code class="code-walk__code">PRIVATE = ROOT / "data" / "private"</code><div class="code-walk__explain">금액 parquet 저장 위치 — git·배포 제외.</div></div>
      </div>

      <h2 class="study-h2">aggregate_visits() (29~97행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">40</span><code class="code-walk__code">df["executed_dt"] = pd.to_datetime(df["executed_at"])</code><div class="code-walk__explain">문자열 날짜 → datetime으로 기간 필터 가능하게.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">49-54</span><code class="code-walk__code">if from_date: window_start = from_date; count_col = visit_count_total</code><div class="code-walk__explain"><strong>우리 서비스 설정</strong>: 2025-01-01부터 누적 → 컬럼명 <code>visit_count_total</code></div></div>
        <div class="code-walk__line"><span class="code-walk__num">56</span><code class="code-walk__code">in_window = df[날짜 between window_start and as_of]</code><div class="code-walk__explain">기간 밖 업추비는 집계에서 제외.</div></div>
      </div>

      <h3 class="study-h3">공개 집계 (58~83행)</h3>
      <pre class="study-code">grp = in_window.groupby("venue_name").agg(
    visit_count=("venue_name", "size"),      <span class="cmt"># 행 개수 = 방문 횟수</span>
    last_visit_date=("executed_dt", "max"),
    distinct_depts=("dept_sheet", "nunique"),
)
grp["visit_rank_bucket"] = high/medium/low  <span class="cmt"># 상·중·하 33% 분위 (지도 색 보조)</span></pre>

      <h3 class="study-h3">비공개 집계 (85~95행)</h3>
      <pre class="study-code">priv = in_window.groupby("venue_name").agg(
    amount_total_krw=("amount_krw", "sum"),
    amount_avg_krw=("amount_krw", "mean"),
    headcount_sum=("headcount", "sum"),
)</pre>
      <p class="study-p">이 테이블은 <code>data/private/venue_amounts_total.parquet</code> 만. 웹 JSON 경로에 없음.</p>

      <h2 class="study-h2">main (100~164행)</h2>
      <table class="study-table">
        <tr><th>인자</th><th>기본값</th><th>의미</th></tr>
        <tr><td><code>--from-date</code></td><td>2025-01-01</td><td>누적 집계 시작</td></tr>
        <tr><td><code>--as-of</code></td><td>(데이터 최대일)</td><td>집계 종료일</td></tr>
        <tr><td><code>--food-only</code></td><td>True</td><td>식음료만</td></tr>
      </table>
      <p class="study-p">산출: <code>venue_visits_total.parquet</code>, <code>stats.json</code>(기관별 건수·top10)</p>
      <pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/aggregate_visits.py \\
  --from-date 2025-01-01 --as-of 2026-05-31</pre>
    `,
  },
  {
    id: "ch24-export",
    title: "소스 해설 — export_public.py 전체",
    keywords: "export_public FORBIDDEN_SUBSTRINGS lint manifest",
    lead: "167줄. match 결과를 웹용 JSON으로보내고, 금액·직급 필드 유출을 린트로 차단합니다.",
    html: `
      <h2 class="study-h2">FORBIDDEN_SUBSTRINGS (18~21행)</h2>
      <pre class="study-code">FORBIDDEN_SUBSTRINGS = re.compile(
    r"amount|total_amount|price|cost|집행액|...|직급|장관|차관",
    re.I,
)</pre>
      <p class="study-p"><code>_lint_public()</code> (24~34행)이 JSON 전체를 재귀 탐색해 <strong>키 이름</strong>에 위 패턴이 있으면 export 중단.</p>

      <h2 class="study-h2">main 흐름 (51~162행)</h2>
      <ol class="study-ol">
        <li><code>venue_matches.parquet</code> 로드 (match_venues 선행 필수)</li>
        <li><code>visit_count_total</code> 또는 <code>visit_count_6m</code> 컬럼 선택</li>
        <li>행마다 <code>restaurant_id</code>, <code>name</code>, 방문수, 주소, permit_name…</li>
        <li><code>payload</code> 조립 → <code>_lint_public</code> → <code>restaurants.public.json</code></li>
        <li><code>manifest.json</code> — data_as_of, record_count</li>
      </ol>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">96-125</span><code class="code-walk__code">for _, row in df.iterrows(): item = {...}</code><div class="code-walk__explain">공개 item에 넣는 필드만 화이트리스트 방식. amount 컬럼은 애초에 matches에 없음.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">144-146</span><code class="code-walk__code">if errs: raise SystemExit("export_lint failed")</code><div class="code-walk__explain">실수로 금액 키가 들어가면 배포 전에 프로세스가 죽음 = 안전장치.</div></div>
      </div>

      <h2 class="study-h2">restaurants.public.json 구조 (요약)</h2>
      <pre class="study-code">{
  "mode": "expense_visits",
  "data_as_of": "2026-05-31",
  "visit_count_field": "visit_count_total",
  "count": 2525,
  "restaurants": [
    {
      "restaurant_id": "...",
      "name": "○○식당",
      "visit_count_total": 42,
      "address_road": "세종시 ...",
      "permit_name": "..."
    }
  ]
}</pre>
    `,
  },
  {
    id: "ch25-match-sync",
    title: "소스 해설 — match_venues.py · sync_web_data.py",
    keywords: "match_venues fuzzy sync_web_data shutil",
    lead: "업추비 상호를 인허가 DB와 연결하고, export 파일을 web/data에 복사합니다.",
    html: `
      <h2 class="study-h2">match_venues.py 핵심</h2>
      <pre class="study-code">FUZZY_MIN = 0.78      <span class="cmt"># 유사도 이상이면 매칭</span>
CONTAINS_MIN = 0.50   <span class="cmt"># 포함 관계 매칭</span></pre>

      <h3 class="study-h3">build_permit_index (45~75행)</h3>
      <ul class="study-ul">
        <li>인허가 상호 → <code>by_exact</code>, 앞 2글자 → <code>by_prefix</code> 인덱스</li>
        <li>세종 주소 아닌 POI는 제외 (<code>is_sejong_address</code>)</li>
      </ul>

      <h3 class="study-h3">매칭 순서 (개념)</h3>
      <ol class="study-ol">
        <li>정규화 키 exact match</li>
        <li>지점명 제거(branch) 후 match</li>
        <li>fuzzy / contains (<code>venue_match_utils</code>)</li>
        <li>실패 시 <code>match_method: unmatched</code></li>
      </ol>
      <p class="study-p">출력: <code>data/processed/venue_matches.parquet</code> — visit 수 + address_road + restaurant_id</p>
      <pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/match_venues.py --refresh-permit</pre>

      <h2 class="study-h2">sync_web_data.py 전체 (35줄)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">13-19</span><code class="code-walk__code">FILES = (restaurants.map.json, restaurants.public.json, ...)</code><div class="code-walk__explain">복사할 5개 파일 고정 목록.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">24-28</span><code class="code-walk__code">shutil.copy2(src, WEB_DATA / name)</code><div class="code-walk__explain">메타데이터(수정시간) 유지 복사. GitHub 배포는 web/ 만 rsync.</div></div>
      </div>
      <pre class="study-code">"$RESTAURANT_MAP_PYTHON" scripts/sync_web_data.py
<span class="cmt"># 출력 예:</span>
copied restaurants.map.json
copied manifest.json</pre>
    `,
  },
  {
    id: "ch26-app-js",
    title: "소스 해설 — app.js 핵심 줄 (25~290, 580~750)",
    keywords: "app.js MIN_MAP_VISITS isExcludedFromMapMarkers buildVisitRankMeta",
    lead: "web/js/app.js 약 1874줄. 지도에 무엇을 그릴지 결정하는 브라우저 측 규칙입니다.",
    html: `
      <figure class="study-figure">
        <img src="assets/img/map-overview.png" alt="티어 마커가 보이는 지도" loading="lazy" />
        <figcaption>아래 상수들이 이 화면의 마커 개수·색·제외 규칙을 결정합니다.</figcaption>
      </figure>

      <h2 class="study-h2">상수 블록 (25~56행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">32</span><code class="code-walk__code">const MIN_MAP_VISITS = 10;</code><div class="code-walk__explain">10회 미만은 지도 마커 없음 (목록에는 있을 수 있음).</div></div>
        <div class="code-walk__line"><span class="code-walk__num">34</span><code class="code-walk__code">const STALE_VENUE_MONTHS = 12;</code><div class="code-walk__explain">1년간 업추비 없고 POI 없으면 폐업 추정.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">36-42</span><code class="code-walk__code">RETAIL_VENDOR_RE, IMART_RETAIL_RE, NON_RESTAURANT_EXACT_NAMES</code><div class="code-walk__explain">마트·코레일·이마트 본점 등 비식당 제외. 이마트 <strong>회코너 인허가</strong>는 <code>hasFoodCornerPermit()</code> 로 살림.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">50-56</span><code class="code-walk__code">TIER_COLORS 1~5: 빨주노초파</code><div class="code-walk__explain">방문 순위 티어 색. map-kakao <code>dropletPinHtml(tier)</code> 에 전달.</div></div>
      </div>

      <h2 class="study-h2">URL·설정 (101~120행)</h2>
      <pre class="study-code">function resolvePublicUrl(path) {
  return getAppBasePath() + path;  <span class="cmt"># GitHub Pages 하위경로 대응</span>
}
async function loadMapConfig() {
  const mod = await import("./config.js");
  return mod.MAP_CONFIG;  <span class="cmt"># kakaoJsKey, preferKakaoMap</span>
}</pre>

      <h2 class="study-h2">제외 로직 (272~290행)</h2>
      <pre class="study-code">function isNonRestaurantMapVenue(r) {
  return staleCheckMembers(r).some(row =>
    RETAIL_VENDOR_RE.test(name) || isImartRetailRow(row) || name === "운산"
  );
}
function isExcludedFromMapMarkers(r) {
  return isLikelyClosedForMap(r) || isNonRestaurantMapVenue(r);
}</pre>

      <h2 class="study-h2">마커 후보 (590~631행 근처)</h2>
      <pre class="study-code">.filter(r => visitCount(r) >= MIN_MAP_VISITS)
.filter(r => !isExcludedFromMapMarkers(r))</pre>

      <h2 class="study-h2">buildVisitRankMeta (725행~)</h2>
      <ul class="study-ul">
        <li>위치 클러스터(같은 건물·상호) 단위로 방문 합산 후 순위</li>
        <li>1~20위=1티어, 21~50=2티어 … 201~=5티어</li>
        <li><code>map-overlap-stack.js</code> 가 40m 이내 겹치면 무지개 1개로 합침</li>
      </ul>

      <h2 class="study-h2">직접 읽기 순서 (에디터에서)</h2>
      <ol class="study-ol">
        <li>상수 (32~56)</li>
        <li><code>loadRestaurants</code> → fetch JSON</li>
        <li><code>resolveVenueCoords</code></li>
        <li><code>dedupeAndMergeVenues</code></li>
        <li><code>buildMapMarkerItems</code></li>
        <li><code>openMarkerDrawer</code></li>
      </ol>
      <pre class="study-code">code ~/Desktop/헤르메스\ 비서/부업/맛집앱/web/js/app.js
bash ~/hermes-restaurant-open.sh</pre>
    `,
  },
];