/* global window, STUDY_TMPL */
window.STUDY_EXPANDED_5 = [
  {
    id: "e43-code-intro",
    title: "소스 읽기 전략 — 입력·출력(I/O) 중심",
    keywords: "소스 코드 읽기 strategy I/O",
    lead: "파일 전체를 암기할 필요는 없습니다. 각 모듈의 입력 파일·출력 파일·책임 범위를 먼저 매핑하면 효율적으로 읽을 수 있습니다. 본 Part 5는 Python ETL(데이터 가공)과 JavaScript(브라우저 동작) 소스를 줄 단위로 해설합니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "핵심 스크립트의 I/O(Input/Output, 입력·출력) 계약을 표로 정리할 수 있습니다",
        "Module 43–52 권장 읽기 순서를 설명할 수 있습니다",
        "소스 코드 읽기에서 「문법」보다 「데이터 흐름」을 우선하는 이유를 이해합니다",
      ]) +
      STUDY_TMPL.prereq(["Module 2 ETL(Extract·Transform·Load) 개요", "Lab D JSON 검증"]) +
      `
      <h2 class="study-h2">왜 I/O부터 읽을까요?</h2>
      <p class="study-p">소스 코드는 「어떤 파일을 읽어서, 어떤 파일을 쓰는가」라는 <strong>계약(contract, 약속)</strong>으로 이해하면 빠릅니다. 함수 이름·변수명은 그 계약을 지키기 위한 세부 구현입니다. 따라서 <code>normalize_expense.py</code>를 열 때는 먼저 <code>data/raw/expense/</code>와 <code>expense_line_items.parquet</code>의 관계를 떠올립니다.</p>

      <h2 class="study-h2">파일별 I/O 계약</h2>
      <table class="study-table">
        <tr><th>파일</th><th>입력</th><th>출력</th><th>책임</th></tr>
        <tr><td><code>normalize_expense.py</code></td><td><code>data/raw/expense/*.xlsx</code></td><td><code>expense_line_items.parquet</code></td><td>헤더 정규화, 행 추출</td></tr>
        <tr><td><code>aggregate_visits.py</code></td><td>line items parquet</td><td>visit_count(공개) + amount(비공개)</td><td>집계·기간 필터</td></tr>
        <tr><td><code>export_public.py</code></td><td><code>venue_matches.parquet</code></td><td><code>restaurants.public.json</code></td><td>화이트리스트 export + 린트</td></tr>
        <tr><td><code>app.js</code></td><td><code>restaurants.map.json</code></td><td>DOM·지도 마커</td><td>클라이언트 렌더링</td></tr>
      </table>
      ` +
      STUDY_TMPL.concept(
        "읽기 순서",
        "<p>권장 순서는 <strong>normalize → aggregate → export → match/sync → app.js</strong>입니다. 데이터가 어떻게 한 줄(line item)에서 공개 JSON으로 좁혀지는지를 따라가면, 이후 운영·디버깅 시 「어느 단계에서 깨졌는지」를 빠르게 좁힐 수 있습니다.</p>"
      ) +
      `
      <div class="block-glossary">
        <strong class="block-glossary__title">용어 정의 (3열)</strong>
        <table class="study-table">
          <tr><th>영문</th><th>한글</th><th>설명</th></tr>
          <tr><td>I/O</td><td>입력·출력</td><td>프로그램이 읽는 파일·쓰는 파일, 또는 stdin/stdout</td></tr>
          <tr><td>contract</td><td>데이터 계약</td><td>입력 스키마·출력 필드·금지 필드를 문서·코드로 고정한 것</td></tr>
          <tr><td>line item</td><td>지출 한 줄</td><td>엑셀 데이터 행 1개에 대응하는 dict·레코드</td></tr>
          <tr><td>presentation layer</td><td>표현 계층</td><td>브라우저에서 JSON을 화면(지도·목록)으로 그리는 JS 코드</td></tr>
        </table>
      </div>
      ` +
      STUDY_TMPL.tip("에디터에서 열기: <code>open -a \"Cursor\" web/js/app.js</code> — 상수 블록(약 32행)부터 읽으면 지도 정책을 빠르게 파악할 수 있습니다.") +
      STUDY_TMPL.recap("코드 읽기 = I/O 계약 먼저. 이하 normalize → aggregate → export → app.js 순으로 상세 해설합니다."),
  },
  {
    id: "e44-norm-aliases",
    title: "normalize (1) — FIELD_ALIASES와 열 이름 정규화",
    keywords: "VENUE_ALIASES FIELD_ALIASES schema mapping",
    lead: "기관·연도별로 다른 엑셀 헤더 문자열을 표준 필드명으로 매핑합니다. 이는 ETL의 schema normalization 단계이며, 이후 모든 Python 로직이 표준 키만 참조하도록 만듭니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "VENUE_ALIASES·FIELD_ALIASES의 목적을 설명할 수 있습니다",
        "_resolve_field()가 반환하는 표준명 또는 None의 의미를 이해합니다",
        "_normalize_header_key()가 헤더 비교 전에 수행하는 전처리를 나열할 수 있습니다",
      ]) +
      `<p class="study-p">대상 파일: <code>scripts/normalize_expense.py</code> (약 859행). 본 모듈은 <strong>1~297행</strong> — 임포트, 경로 상수, 별칭 사전, <code>_resolve_field</code>까지를 다룹니다.</p>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">1</span><code class="code-walk__code">#!/usr/bin/env python3</code><div class="code-walk__explain">shebang — macOS·Linux에서 <code>python3 scripts/normalize_expense.py</code>로 직접 실행 가능함을 선언합니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">17-32</span><code class="code-walk__code">from parse_sejong_expense import ...</code><div class="code-walk__explain">세종 전용·미디어·MPIS·텍스트 파서를 가져옵니다. 엑셀만으로 파싱이 안 될 때 <strong>fallback parser</strong>로 넘깁니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">34-37</span><code class="code-walk__code">ROOT = Path(__file__).resolve().parents[1]</code><div class="code-walk__explain"><code>scripts/</code>의 부모 = 프로젝트 루트입니다. 실행 위치와 무관하게 경로가 깨지지 않습니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">35-37</span><code class="code-walk__code">DEFAULT_RAW = .../data/raw/expense</code><div class="code-walk__explain">입력: fetch가 받아 둔 원본. 출력 기본값: <code>data/processed/expense_line_items.parquet</code>.</div></div>
      </div>

      <h2 class="study-h2">VENUE_ALIASES (41~77행) — 「식당 이름」 열 찾기</h2>
      <p class="study-p">기관마다 엑셀 첫 줄 표기가 다릅니다. 「집행장소」「사용처」「상호명」 등은 모두 내부 표준 키 <code>venue_name</code>으로 통일합니다.</p>
      <pre class="study-code">VENUE_ALIASES = frozenset({
    "집행장소", "사용처", "업소명", "상호", "가맹점", ...
})
FIELD_ALIASES = {
    "venue_name": VENUE_ALIASES,
    "executed_at": DATE_ALIASES,
    "purpose": PURPOSE_ALIASES,
    "amount_krw": AMOUNT_ALIASES,
    ...
}</pre>
      <p class="study-p"><code>frozenset</code>(수정 불가 집합)을 쓰는 이유는 <code>in</code> 멤버십 검사가 빠르고, 실수로 별칭이 런타임에 바뀌지 않기 때문입니다.</p>

      <h2 class="study-h2">FIELD_ALIASES 표준 필드 (78~239행)</h2>
      <table class="study-table">
        <tr><th>표준 필드</th><th>엑셀 헤더 예</th><th>비고</th></tr>
        <tr><td><code>executed_at</code></td><td>집행일시, 사용일, 결제일 …</td><td>ISO 날짜로 정규화</td></tr>
        <tr><td><code>purpose</code></td><td>집행목적, 적요, 사용내역 …</td><td>food_only 필터에 사용</td></tr>
        <tr><td><code>amount_krw</code></td><td>집행금액, 사용금액(원) …</td><td><strong>비공개 경로만</strong></td></tr>
        <tr><td><code>user_label</code></td><td>사용자, 직위 …</td><td>export JSON에 넣지 않음</td></tr>
      </table>

      <h2 class="study-h2">_normalize_header_key (259~266행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">260</span><code class="code-walk__code">unicodedata.normalize("NFKC", key)</code><div class="code-walk__explain">NFKC 정규화 — 전각·반각 문자 차이를 흡수합니다(예: 「집행장소」 표기 변형).</div></div>
        <div class="code-walk__line"><span class="code-walk__num">262-264</span><code class="code-walk__code">re.sub(r"[*★...]", "", s)</code><div class="code-walk__explain">엑셀 필수입력 별표·괄호 안 단위(원) 등을 제거한 뒤 별칭 사전과 비교합니다.</div></div>
      </div>

      <h2 class="study-h2">_resolve_field (269~297행) — 헤더 한 칸 → 표준 이름</h2>
      <ol class="study-ol">
        <li>별칭 사전에 <strong>완전 일치</strong> (<code>nk in aliases</code>)</li>
        <li>부분 포함 (<code>alias in nk</code> 또는 <code>nk in alias</code>)</li>
        <li>키워드 휴리스틱: 「장소」「상호」→ <code>venue_name</code>, 「금액」→ <code>amount_krw</code></li>
        <li>매칭 실패 시 <code>None</code> — 해당 열은 이후 로직에서 무시됩니다</li>
      </ol>
      ` +
      STUDY_TMPL.concept(
        "Schema mapping",
        "<p>기관 A는 「집행장소」, 기관 B는 「사용처」로 동일 개념을 표기합니다. <code>_resolve_field</code>가 헤더 문자열을 받아 <code>venue_name</code> 등 <strong>내부 표준 키</strong>로 통일합니다. 이후 파싱·집계·export는 표준 키만 참조하므로, 기관별 차이는 normalize 단계에 <strong>캡슐화</strong>됩니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["schema normalization", "기관별 상이한 열 이름을 하나의 표준 필드 집합으로 통일하는 과정", "스키마 정규화"],
        ["frozenset", "수정 불가 set — 별칭 사전에 적합한 자료구조", "고정 집합"],
        ["None", "Python의 「값 없음」 — 해당 열을 표준 필드로 인식하지 못했음을 뜻함", "없음"],
      ]) +
      STUDY_TMPL.pitfalls([
        "별칭 누락 시 해당 열이 None으로 처리되어 레코드가 스킵될 수 있습니다 — <code>normalize_report.json</code>의 <code>skipped</code> 배열을 확인하세요.",
        "헤더 문자열에 보이지 않는 공백·특수문자가 있으면 완전 일치가 실패합니다 — <code>_normalize_header_key</code>가 이를 완화합니다.",
      ]) +
      STUDY_TMPL.demo("alias-map", "기관별 다른 열 이름이 venue_name으로 매핑되는 과정을 확인합니다.") +
      STUDY_TMPL.recap("별칭 사전 = 기관별 헤더 → venue_name 등 표준 필드. _resolve_field가 매핑의 핵심입니다."),
  },
  {
    id: "e45-norm-header",
    title: "normalize (2) — 헤더 행 자동 탐지",
    keywords: "_find_header_layout _header_score heuristic",
    lead: "엑셀 상단에 제목·빈 행·병합 셀이 섞여 있어 헤더 위치가 파일마다 다릅니다. 점수 기반 휴리스틱(heuristic)으로 최적 헤더 행을 선택합니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "_header_score가 가산·감산하는 조건을 나열할 수 있습니다",
        "_combine_header_rows로 2행 헤더를 병합하는 이유를 설명할 수 있습니다",
        "_header_usable이 venue_name을 필수로 요구하는 이유를 이해합니다",
      ]) +
      `<p class="study-p">대상 구간: <strong>298~378행</strong> — <code>_header_map</code>, <code>_find_header_layout</code>, <code>_header_score</code>.</p>
      <p class="study-p">많은 업무추진비 파일은 1행이 「○○부 업무추진비」 같은 <strong>제목 행</strong>입니다. 실제 열 이름은 3~10행 근처에 있습니다. 따라서 스크립트는 상위 <strong>80행</strong>(<code>MAX_HEADER_SCAN</code>)을 스캔합니다.</p>

      <h2 class="study-h2">_header_map — 행을 필드 맵으로 변환</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">300-318</span><code class="code-walk__code">def _header_map(row): ...</code><div class="code-walk__explain">한 행의 각 셀 문자열에 <code>_resolve_field</code>를 적용해 <code>{표준필드: 열인덱스}</code> dict를 만듭니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">327-341</span><code class="code-walk__code">def _header_score(hmap):</code><div class="code-walk__explain"><code>venue_name</code> 열 매칭 → +3, 날짜(<code>executed_at</code>) → +3, <code>purpose</code> → +2, <code>amount_krw</code> → +2 등. 핵심 열이 함께 잡힐수록 점수가 올라갑니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">344-349</span><code class="code-walk__code">def _header_usable(hmap):</code><div class="code-walk__explain"><code>venue_name</code>이 없으면 False — 식당 이름 열 없이는 파싱 불가입니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">370-376</span><code class="code-walk__code">_combine_header_rows(row_i, row_i+1)</code><div class="code-walk__explain">2줄 헤더(「집행」+「장소」)를 합쳐 「집행 장소」로 인식합니다.</div></div>
      </div>

      <h2 class="study-h2">_find_header_layout (352~378행) 알고리즘 요약</h2>
      <ol class="study-ol">
        <li>0~79행 각 행(및 인접 2행 조합)에 대해 <code>_header_map</code> 생성</li>
        <li><code>_header_score</code>로 점수 계산 후 최고 점수 조합 선택</li>
        <li><code>_header_usable</code> 통과 시 <code>data_start</code>(데이터 시작 행) 확정</li>
        <li>실패 시 <code>no_header</code> 사유로 리포트에 기록</li>
      </ol>
      ` +
      STUDY_TMPL.concept(
        "Heuristic header detection",
        "<p>완벽한 규칙表 대신 <strong>점수화</strong>를 쓰는 이유는, 기관·연도·부서마다 레이아웃이 달라 하드코딩 한 줄로는 커버할 수 없기 때문입니다. 「합계」「소계」 행은 venue 열에 문자열이 들어가도 날짜·금액 열이 비어 점수가 낮아지는 경향이 있습니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["heuristic", "완전한 증명 대신 경험·점수로 최선의 후보를 고르는 방법", "휴리스틱"],
        ["MAX_HEADER_SCAN", "헤더 후보로 스캔하는 최대 행 수(80)", "헤더 스캔 상한"],
        ["data_start", "헤더 다음 행부터 실제 지출 데이터가 시작되는 인덱스", "데이터 시작 행"],
      ]) +
      STUDY_TMPL.pitfalls([
        "「합계」「소계」 행이 venue_name으로 파싱되면 집계 오염이 생깁니다 — 데이터 행 필터(<code>SKIP_VENUE</code>)로 제거합니다.",
        "헤더가 3행 이상에 걸쳐 있으면 단일 행 점수가 낮을 수 있습니다 — <code>_combine_header_rows</code> 조합을 반드시 시도합니다.",
      ]) +
      STUDY_TMPL.recap("헤더 탐지 = 상한 80행 스캔 + 점수 최대 조합 + venue_name 필수."),
  },
  {
    id: "e46-norm-extract",
    title: "normalize (3) — 레코드 추출 (line item)",
    keywords: "_extract_records_from_sheet food_only SKIP_VENUE",
    lead: "데이터 행 하나가 expense line item dict 하나에 대응합니다. food_only 필터로 식음료 관련 행만 downstream으로 전달합니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "records.append() dict의 핵심 필드를 열거할 수 있습니다",
        "amount_krw가 private 경로로만 사용됨을 설명할 수 있습니다",
        "_parse_amount·_parse_exec_date의 역할을 구분할 수 있습니다",
      ]) +
      `<p class="study-p">대상 구간: <strong>386~653행</strong> — 값 파싱 함수, <code>_extract_records_from_sheet</code> 루프.</p>

      <h2 class="study-h2">값 파싱 함수 (386~467행)</h2>
      <table class="study-table">
        <tr><th>함수</th><th>행</th><th>역할</th></tr>
        <tr><td><code>_parse_amount</code></td><td>386-400</td><td>「12,500원」→ 12500 정수. 공개 JSON에는 넣지 않고 private 집계용입니다.</td></tr>
        <tr><td><code>_parse_exec_date</code></td><td>420-445</td><td>엑셀 serial 날짜·「2025.03.01」→ ISO <code>2025-03-01</code></td></tr>
        <tr><td><code>_merge_date_parts</code></td><td>448-467</td><td>날짜 열·시간 열이 분리된 시트를 병합합니다.</td></tr>
      </table>

      <h2 class="study-h2">_extract_records_from_sheet (592~653행) — 핵심 루프</h2>
      <pre class="study-code">for row in rows[data_start:]:
    venue = _normalize_venue(str(venue_raw))
    if venue in SKIP_VENUE or venue.startswith("합계"): continue
    if food_only and not _is_food_related(purpose, venue): continue
    records.append({
        "source_agency": "교육부",
        "source_file": "파일명.xlsx",
        "dept_sheet": "시트명",
        "executed_at": "2025-03-15",
        "venue_name": "○○식당",
        "purpose": "간담회 식사",
        "amount_krw": 125000,   <span class="cmt"># private aggregate만</span>
        "headcount": 8,
        ...
    })</pre>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">루프 시작</span><code class="code-walk__code">for row in rows[data_start:]</code><div class="code-walk__explain">헤더 다음 행부터 끝까지 순회합니다. 각 반복이 잠재적 line item 1건입니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">SKIP_VENUE</span><code class="code-walk__code">if venue in SKIP_VENUE: continue</code><div class="code-walk__explain">「합계」「소계」「총계」 등 집계 행 라벨을 venue로 취급하지 않습니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">food_only</span><code class="code-walk__code">if food_only and not _is_food_related(...)</code><div class="code-walk__explain">기본값 True — 식음료 목적·업종 키워드(<code>FOOD_PURPOSE_KEYWORDS</code>)에 맞는 행만 유지합니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">append</span><code class="code-walk__code">records.append({...})</code><div class="code-walk__explain">출처 메타(<code>source_agency</code>, <code>source_file</code>)를 함께 넣어 감사·재현이 가능합니다.</div></div>
      </div>
      ` +
      `
      <div class="block-glossary">
        <strong class="block-glossary__title">용어 정의 (3열)</strong>
        <table class="study-table">
          <tr><th>영문</th><th>한글</th><th>설명</th></tr>
          <tr><td>line item</td><td>지출 한 줄</td><td>엑셀 데이터 행 1개 = 집계의 최소 단위 레코드</td></tr>
          <tr><td>food_only</td><td>식음료만</td><td>식사·간담회 등 식음료 관련 행만 남기는 필터 플래그</td></tr>
          <tr><td>SKIP_VENUE</td><td>제외 라벨</td><td>「합계」 등 집계 행 — venue_name으로 파싱하지 않음</td></tr>
          <tr><td>downstream</td><td>하류 단계</td><td>normalize 이후 aggregate·export 등 다음 ETL 단계</td></tr>
        </table>
      </div>
      ` +
      STUDY_TMPL.pitfalls([
        "<code>food_only=False</code>로 실행하면 비식사 행이 섞여 visit_count가 부풀려질 수 있습니다.",
        "날짜가 비어 있는 행은 <code>fallback_period</code>(파일명·시트명에서 연월 추정)로 보완되기도 합니다 — 리포트에서 확인하세요.",
      ]) +
      STUDY_TMPL.recap("1 엑셀 행 → 1 dict. food_only로 식사 관련만 유지하고 amount_krw는 비공개 경로로만 갑니다."),
  },
  {
    id: "e47-norm-main",
    title: "normalize (4) — load_expense_dir · main",
    keywords: "load_expense_dir main parquet normalize_report",
    lead: "raw 디렉터리 전체를 순회하며 파일별 parse → parquet 적재를 수행합니다. 실행 요약은 normalize_report.json에 기록되며, stdout에도 JSON 요약이 출력됩니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "main 실행 시 stdout JSON 요약 필드를 읽을 수 있습니다",
        "normalize_report.json의 skipped 배열 의미를 설명할 수 있습니다",
        "parse_workbook의 폴백 파서 순서를 개요 수준에서 말할 수 있습니다",
      ]) +
      `<h2 class="study-h2">parse_workbook (656~756행) — 파일 하나 처리</h2>
      <ol class="study-ol">
        <li>로더 순서: <code>.xls</code>→xlrd, openpyxl, pandas</li>
        <li>시트마다 <code>_extract_records_from_sheet</code> 호출</li>
        <li>실패 시 폴백: <code>parse_sejong_dept_workbook</code>(세종), MPIS, <code>parse_tabular_rows</code>, <code>parse_text_content</code></li>
      </ol>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">693-702</span><code class="code-walk__code">if not records and _is_sejong_path: parse_sejong_dept_workbook</code><div class="code-walk__explain">세종시청 형식은 전용 파서가 더 정확할 때가 많습니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">747-754</span><code class="code-walk__code">return DataFrame(), "no_header" / "no_parseable_rows"</code><div class="code-walk__explain">실패 이유를 문자열로 반환 — 리포트 <code>skipped</code>에 누적됩니다.</div></div>
      </div>

      <h2 class="study-h2">load_expense_dir (759~822행)</h2>
      <pre class="study-code">for path in sorted(raw_dir.rglob("*")):
    if "_manifest" in path.parts: continue
    kind = classify_expense_file(path)
    if kind in {"skip", "unknown"}: continue
    df, err = parse_media_expense(path, parse_workbook_fn=parse_workbook)
    ...</pre>
      <table class="study-table">
        <tr><th>로직</th><th>설명</th></tr>
        <tr><td><code>infer_source_agency(path)</code></td><td>경로 첫 폴더명 → 「교육부」「세종특별자치시」 등</td></tr>
        <tr><td><code>dedupe_key</code></td><td>같은 파일명 중복 수집 방지</td></tr>
        <tr><td><code>report</code></td><td>files_parsed/skipped, by_agency, skipped 사유(최대 100건)</td></tr>
      </table>

      <h2 class="study-h2">main (825~859행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">827-829</span><code class="code-walk__code">--raw-dir, --food-only, --out</code><div class="code-walk__explain">CLI 인자. 기본 출력: <code>data/processed/expense_line_items.parquet</code></div></div>
        <div class="code-walk__line"><span class="code-walk__num">835-837</span><code class="code-walk__code">normalize_report.json</code><div class="code-walk__explain">파싱 통계 JSON → <code>data/raw/expense/_manifest/</code>에 저장됩니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">844</span><code class="code-walk__code">items.to_parquet(args.out)</code><div class="code-walk__explain">pandas DataFrame을 parquet(열 지향 압축 테이블)로 저장 — aggregate가 읽습니다.</div></div>
      </div>
      ` +
      STUDY_TMPL.exercise(
        "실행",
        'cd "$HOME/Desktop/헤르메스 비서/부업/맛집앱"\nsource scripts/ensure_venv.sh\n"$RESTAURANT_MAP_PYTHON" scripts/normalize_expense.py',
        "stdout에 line_items 수, files_parsed 수가 JSON으로 출력됩니다."
      ) +
      `<p class="study-p"><code>data/raw/expense/_manifest/normalize_report.json</code> — 파싱 실패·스킵 파일 목록과 사유를 담습니다. 운영 시 이 파일을 먼저 열어 병목을 파악합니다.</p>` +
      STUDY_TMPL.glossary([
        ["parquet", "pandas·Spark 등에서 쓰는 열 지향 압축 파일 형식"],
        ["stdout", "표준 출력 — 터미널에 찍히는 텍스트", "표준 출력"],
        ["rglob", "하위 디렉터리까지 재귀적으로 파일 탐색", "재귀 탐색"],
      ]) +
      STUDY_TMPL.recap("main = raw 전체 순회 → parquet + normalize_report. 다음 단계는 aggregate_visits.py입니다."),
  },
  {
    id: "e48-aggregate-code",
    title: "aggregate_visits.py — groupby 집계",
    keywords: "aggregate_visits groupby private public split",
    lead: "동일 venue_name에 대한 행 수가 visit_count(방문 횟수)입니다. pandas groupby로 public·private 산출물을 분리 생성합니다. 이 분리가 금액 유출 방지의 구조적 핵심입니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "groupby(venue_name).size()가 visit_count임을 설명할 수 있습니다",
        "public parquet와 private parquet 분리 저장을 이해합니다",
        "--from-date·--as-of가 집계 윈도우에 미치는 영향을 말할 수 있습니다",
      ]) +
      `<p class="study-p">대상 파일: <code>scripts/aggregate_visits.py</code> (약 169행).</p>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">16</span><code class="code-walk__code">from normalize_expense import load_expense_dir</code><div class="code-walk__explain">raw를 다시 읽거나, 이미 만든 line_items parquet를 입력으로 쓸 수 있습니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">21</span><code class="code-walk__code">PRIVATE = ROOT / "data" / "private"</code><div class="code-walk__explain">금액 parquet 저장 위치 — git·배포·export 경로에서 제외됩니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">40</span><code class="code-walk__code">df["executed_dt"] = pd.to_datetime(df["executed_at"])</code><div class="code-walk__explain">문자열 날짜를 datetime으로 바꿔 기간 필터(between)가 가능해집니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">49-54</span><code class="code-walk__code">count_col = visit_count_total</code><div class="code-walk__explain">서비스 설정: 2025-01-01부터 누적 → 컬럼명 <code>visit_count_total</code></div></div>
        <div class="code-walk__line"><span class="code-walk__num">56</span><code class="code-walk__code">in_window = df[날짜 between window_start and as_of]</code><div class="code-walk__explain">기간 밖 업무추진비 행은 집계에서 제외됩니다.</div></div>
      </div>

      <h2 class="study-h2">공개 집계 (58~83행)</h2>
      <pre class="study-code"><span class="cmt"># 공개 — visit_count만</span>
grp = in_window.groupby("venue_name").agg(
    visit_count=("venue_name", "size"),
    last_visit_date=("executed_dt", "max"),
    distinct_depts=("dept_sheet", "nunique"),
)
grp["visit_rank_bucket"] = high / medium / low  <span class="cmt"># 33% 분위</span></pre>

      <h2 class="study-h2">비공개 집계 (85~95행)</h2>
      <pre class="study-code"><span class="cmt"># 비공개 — 금액만</span>
priv = in_window.groupby("venue_name").agg(
    amount_total_krw=("amount_krw", "sum"),
    amount_avg_krw=("amount_krw", "mean"),
    headcount_sum=("headcount", "sum"),
)</pre>
      <p class="study-p">비공개 테이블은 <code>data/private/venue_amounts_total.parquet</code>에만 저장됩니다. <code>web/data/</code>·export JSON 경로에는 존재하지 않습니다.</p>
      ` +
      STUDY_TMPL.concept(
        "Public / private split (공개·비공개 분리)",
        "<p><strong>visit_count</strong>는 export_public 경로로, <strong>amount 합계</strong>는 <code>data/private/</code>에만 기록됩니다. 단일 groupby 소스 DataFrame에서 파생하되 <strong>저장 경로가 갈라져</strong> 실수로 금액이 JSON에 들어가는 경로가 구조적으로 차단됩니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["groupby", "pandas에서 키(여기서는 venue_name)별로 행을 묶어 집계하는 연산", "그룹별 집계"],
        ["size()", "그룹 내 행 개수 — visit_count의 정의", "행 개수"],
        ["as_of", "집계 종료 기준일 — manifest data_as_of와 연결", "기준일"],
      ]) +
      STUDY_TMPL.recap("size() = 방문 횟수. 금액은 private parquet only. 공개·비공개는 저장 경로로 분리합니다."),
  },
  {
    id: "e49-export-code",
    title: "export_public.py — 화이트리스트와 린트",
    keywords: "export_public _lint_public FORBIDDEN whitelist",
    lead: "공개 JSON(JavaScript Object Notation, 자바스크립트 객체 표기)은 허용 필드만 포함합니다. _lint_public이 키 이름 패턴을 검사해 금액·직급 관련 키 유입을 차단합니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "_lint_public이 값이 아닌 키 이름을 검사함을 설명할 수 있습니다",
        "린트 실패 시 exit code 비정상 종료의 운영적 의미를 이해합니다",
        "restaurants.public.json 최상위 필드 구조를 개요할 수 있습니다",
      ]) +
      `<p class="study-p">대상 파일: <code>scripts/export_public.py</code> (약 167행).</p>

      <h2 class="study-h2">FORBIDDEN_SUBSTRINGS (18~21행)</h2>
      <pre class="study-code">FORBIDDEN_SUBSTRINGS = re.compile(
    r"amount|total_amount|price|cost|집행액|...|직급|장관|차관",
    re.I,
)</pre>
      <p class="study-p"><code>_lint_public()</code> (24~34행)은 JSON 전체를 <strong>재귀 탐색</strong>하며, 객체의 <strong>키 이름</strong>에 위 패턴이 매칭되면 오류 목록에 추가합니다. 값 내용은 검사하지 않습니다.</p>

      <h2 class="study-h2">main 흐름 (51~162행)</h2>
      <ol class="study-ol">
        <li><code>venue_matches.parquet</code> 로드 — <code>match_venues.py</code> 선행 필수</li>
        <li><code>visit_count_total</code> 또는 <code>visit_count_6m</code> 컬럼 선택</li>
        <li>행마다 화이트리스트 필드만 <code>item</code> dict에 담음</li>
        <li><code>payload</code> 조립 → <code>_lint_public</code> → <code>restaurants.public.json</code></li>
        <li><code>manifest.json</code> — data_as_of, record_count</li>
      </ol>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">96-125</span><code class="code-walk__code">for _, row in df.iterrows(): item = {...}</code><div class="code-walk__explain">공개 item에 넣는 필드만 명시적으로 나열합니다. amount 컬럼은 matches DataFrame에 애초에 없습니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">144-146</span><code class="code-walk__code">if errs: raise SystemExit("export_lint failed")</code><div class="code-walk__explain">금지 키가 하나라도 있으면 프로세스가 비정상 종료 — 배포 전 안전장치입니다.</div></div>
      </div>
      ` +
      STUDY_TMPL.warn("FORBIDDEN 패턴에 매칭되는 <strong>키 이름</strong>이 하나라도 있으면 export가 중단됩니다. 값 문자열 내용과는 무관합니다.") +
      STUDY_TMPL.glossary([
        ["whitelist", "허용 목록에 있는 필드만 출력하는 방식", "화이트리스트"],
        ["lint", "정적 검사 — 배포 전 금지 패턴·스키마 위반 탐지"],
        ["SystemExit", "Python 프로세스를 비정상 종료 코드와 함께 종료", "프로세스 종료"],
      ]) +
      STUDY_TMPL.recap("export = 화이트리스트 item 조립 + _lint_public 통과 후 JSON·manifest 저장."),
  },
  {
    id: "e50-match-sync-code",
    title: "match_venues · sync_web_data — 매칭과 배포 동기화",
    keywords: "match_venues fuzzy sync_web_data FUZZY",
    lead: "인허가 DB와 fuzzy matching으로 좌표·정식 상호를 연결하고, sync가 export 산출물 5파일을 web/data로 복사합니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "FUZZY_MIN=0.78 임계값의 의미를 설명할 수 있습니다",
        "sync_web_data.py가 복사하는 5개 파일 목록을 안다",
        "match_venues의 exact → fuzzy 순서를 개요할 수 있습니다",
      ]) +
      `<h2 class="study-h2">match_venues.py 핵심 상수</h2>
      <pre class="study-code">FUZZY_MIN = 0.78      <span class="cmt"># 유사도 이상이면 매칭 수락</span>
CONTAINS_MIN = 0.50   <span class="cmt"># 부분 포함 관계 매칭</span></pre>

      <h2 class="study-h2">build_permit_index (45~75행)</h2>
      <ul class="study-ul">
        <li>인허가 상호 → <code>by_exact</code> 인덱스</li>
        <li>앞 2글자 → <code>by_prefix</code> 인덱스 (후보 축소)</li>
        <li>세종 주소가 아닌 POI는 <code>is_sejong_address</code>로 제외</li>
      </ul>

      <h2 class="study-h2">매칭 순서 (개념)</h2>
      <ol class="study-ol">
        <li>정규화 키 exact match</li>
        <li>지점명 제거(branch strip) 후 재시도</li>
        <li>fuzzy / contains (<code>venue_match_utils</code>)</li>
        <li>실패 시 <code>match_method: unmatched</code></li>
      </ol>
      <p class="study-p">출력: <code>data/processed/venue_matches.parquet</code> — visit 수 + address_road + restaurant_id</p>

      <h2 class="study-h2">sync_web_data.py (35줄)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">13-19</span><code class="code-walk__code">FILES = (restaurants.map.json, restaurants.public.json, ...)</code><div class="code-walk__explain">복사 대상 5개 파일 고정 목록 — 누락 시 지도·manifest 불일치가 납니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">24-28</span><code class="code-walk__code">shutil.copy2(src, WEB_DATA / name)</code><div class="code-walk__explain">메타데이터를 유지한 채 <code>data/export/</code> → <code>web/data/</code>로 복사합니다.</div></div>
      </div>
      <pre class="study-code"><span class="cmt"># sync_web_data.py</span>
for name in FILES:
    shutil.copy2(export/name, web/data/name)</pre>
      ` +
      `
      <div class="block-glossary">
        <strong class="block-glossary__title">용어 정의 (3열)</strong>
        <table class="study-table">
          <tr><th>영문</th><th>한글</th><th>설명</th></tr>
          <tr><td>fuzzy matching</td><td>유사 문자열 매칭</td><td>오타·지점명 차이를 허용하는 상호 연결</td></tr>
          <tr><td>FUZZY_MIN</td><td>유사도 하한</td><td>0.78 미만이면 매칭 거부 — 오매칭 방지</td></tr>
          <tr><td>sync</td><td>동기화</td><td>export → web/data 정적 파일 복사 (배포 직전 필수)</td></tr>
          <tr><td>shutil.copy2</td><td>파일 복사</td><td>타임스탬프 등 메타데이터를 보존하는 복사</td></tr>
        </table>
      </div>
      ` +
      STUDY_TMPL.recap("match = 이름 유사도로 인허가·좌표 연결. sync = export 5파일 → web/data."),
  },
  {
    id: "e51-appjs-constants",
    title: "app.js (1) — 상수와 마커 제외 규칙",
    keywords: "MIN_MAP_VISITS isExcludedFromMapMarkers policy",
    lead: "지도에 렌더링하지 않을 조건을 상수·정규식·함수로 선언합니다. 정책 변경의 1차 수정 지점이며, Python ETL과 독립된 브라우저 측 presentation layer 규칙입니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "MIN_MAP_VISITS, STALE_VENUE_MONTHS, RETAIL_VENDOR_RE 역할을 설명할 수 있습니다",
        "isExcludedFromMapMarkers() 분기 조건을 읽을 수 있습니다",
        "TIER_COLORS가 지도 마커 색에 어떻게 쓰이는지 이해합니다",
      ]) +
      `<p class="study-p">대상 파일: <code>web/js/app.js</code> (약 1874행). 본 모듈은 <strong>25~290행</strong> 상수·제외 로직을 다룹니다.</p>
      <figure class="study-figure"><img src="assets/img/map-overview.png" alt="마커" loading="lazy" /><figcaption>Figure 5.1 — 상수 정책이 반영된 마커·범례·티어 색</figcaption></figure>

      <h2 class="study-h2">상수 블록 (32~56행)</h2>
      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">32</span><code class="code-walk__code">const MIN_MAP_VISITS = 10;</code><div class="code-walk__explain">10회 미만은 지도 마커에서 제외됩니다(목록·검색에는 남을 수 있음).</div></div>
        <div class="code-walk__line"><span class="code-walk__num">34</span><code class="code-walk__code">const STALE_VENUE_MONTHS = 12;</code><div class="code-walk__explain">12개월간 업무추진비 기록이 없고 POI도 없으면 폐업 추정으로 제외합니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">36-42</span><code class="code-walk__code">RETAIL_VENDOR_RE, IMART_RETAIL_RE, NON_RESTAURANT_EXACT_NAMES</code><div class="code-walk__explain">코레일·하나로마트·이마트 본점 등 비식당 제외. 이마트 <strong>푸드코너 인허가</strong>는 <code>hasFoodCornerPermit()</code>로 예외 허용합니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">50-56</span><code class="code-walk__code">TIER_COLORS 1~5</code><div class="code-walk__explain">방문 순위 티어 색(빨·주·노·초·파). <code>dropletPinHtml(tier)</code>에 전달됩니다.</div></div>
      </div>

      <h2 class="study-h2">제외 로직 (272~290행)</h2>
      <pre class="study-code">function isNonRestaurantMapVenue(r) {
  return staleCheckMembers(r).some(row =>
    RETAIL_VENDOR_RE.test(name) || isImartRetailRow(row) || ...
  );
}
function isExcludedFromMapMarkers(r) {
  return isLikelyClosedForMap(r) || isNonRestaurantMapVenue(r);
}</pre>
      <p class="study-p"><code>isExcludedFromMapMarkers</code>는 마커 후보 필터의 최종 관문입니다. <code>buildMapMarkerItems</code> (약 590행)에서 <code>MIN_MAP_VISITS</code>와 함께 적용됩니다.</p>
      ` +
      STUDY_TMPL.seeAlso([["지도 마커 정책 (Module 30)", "#e30-marker-rules"]]) +
      STUDY_TMPL.glossary([
        ["MIN_MAP_VISITS", "지도 마커 최소 방문 횟수 임계값(10)", "최소 방문"],
        ["정규식 (RegExp)", "문자열 패턴 매칭 — RETAIL_VENDOR_RE 등", "정규표현식"],
        ["presentation layer", "데이터(JSON)를 화면(지도·목록)으로 그리는 계층", "표현 계층"],
      ]) +
      STUDY_TMPL.recap("상수·정규식으로 10회+, 폐업 추정, 비식당 제외를 정의합니다. 정책 변경은 이 블록부터 수정합니다."),
  },
  {
    id: "e52-appjs-flow",
    title: "app.js (2) — 클라이언트 렌더 파이프라인",
    keywords: "fetch buildMapMarkerItems openMarkerDrawer pipeline",
    lead: "브라우저에서 실행되는 5단계 파이프라인입니다. Python ETL과 독립된 presentation layer 로직이며, 정적 JSON을 fetch한 뒤 DOM·지도 마커로 변환합니다.",
    html:
      STUDY_TMPL.module(5, "소스 코드", 5) +
      STUDY_TMPL.goal([
        "loadRestaurants → openMarkerDrawer까지 5단계를 순서대로 말할 수 있습니다",
        "grep으로 함수 정의 위치를 찾을 수 있습니다",
        "buildVisitRankMeta와 40m 클러스터의 관계를 개요할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">렌더 파이프라인 (5단계)</h2>
      <ol class="study-ol">
        <li><code>loadRestaurants()</code> — <code>fetch</code> + JSON parse. <code>restaurants.map.json</code>을 불러옵니다.</li>
        <li><code>resolveVenueCoords()</code> — 주소·좌표 바인딩. geocode 결과·인허가 좌표를 레코드에 붙입니다.</li>
        <li><code>dedupeAndMergeVenues()</code> — 동일 상호·근접 좌표 병합, visit 횟수 합산.</li>
        <li><code>buildMapMarkerItems()</code> — MIN_MAP_VISITS·제외 규칙·티어·40m 클러스터 적용.</li>
        <li>마커 click → <code>openMarkerDrawer()</code> — 좌측 목록·상세 패널 표시.</li>
      </ol>

      <div class="code-walk">
        <div class="code-walk__line"><span class="code-walk__num">fetch</span><code class="code-walk__code">loadRestaurants()</code><div class="code-walk__explain">브라우저 <code>fetch</code> API로 정적 JSON을 비동기 로드합니다. 서버 로직 없이 GitHub Pages에서 동작합니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">590~</span><code class="code-walk__code">.filter(r => visitCount(r) >= MIN_MAP_VISITS)</code><div class="code-walk__explain">방문 횟수·제외 규칙을 통과한 레코드만 마커 후보가 됩니다.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">725~</span><code class="code-walk__code">buildVisitRankMeta()</code><div class="code-walk__explain">클러스터 단위 방문 합산 후 1~20위=1티어 … 순위·티어 메타 생성.</div></div>
        <div class="code-walk__line"><span class="code-walk__num">overlap</span><code class="code-walk__code">map-overlap-stack.js</code><div class="code-walk__explain">40m 이내 2곳 이상이면 「단골 밀집」 무지개 마커 1개로 합칩니다.</div></div>
      </div>

      <h2 class="study-h2">URL·설정 (101~120행)</h2>
      <pre class="study-code">function resolvePublicUrl(path) {
  return getAppBasePath() + path;  <span class="cmt">// GitHub Pages 하위 경로 대응</span>
}
async function loadMapConfig() {
  const mod = await import("./config.js");
  return mod.MAP_CONFIG;  <span class="cmt">// kakaoJsKey, preferKakaoMap</span>
}</pre>
      ` +
      STUDY_TMPL.exercise(
        "함수 위치 찾기",
        'grep -n "function loadRestaurants" web/js/app.js\ngrep -n "openMarkerDrawer" web/js/app.js\ngrep -n "buildMapMarkerItems" web/js/app.js',
        "에디터에서 해당 줄로 이동해 구현을 읽습니다."
      ) +
      `
      <div class="block-glossary">
        <strong class="block-glossary__title">용어 정의 (3열)</strong>
        <table class="study-table">
          <tr><th>영문</th><th>한글</th><th>설명</th></tr>
          <tr><td>fetch</td><td>가져오기</td><td>브라우저에서 URL 리소스(JSON)를 비동기 요청하는 Web API</td></tr>
          <tr><td>DOM</td><td>문서 객체 모델</td><td>HTML 요소 트리 — JS가 목록·버튼·패널을 조작하는 대상</td></tr>
          <tr><td>pipeline</td><td>파이프라인</td><td>fetch → 좌표 → 병합 → 마커 → 드로어 순차 처리 흐름</td></tr>
          <tr><td>drawer</td><td>서랍 패널</td><td>마커 클릭 시 열리는 좌측 상세·목록 UI</td></tr>
        </table>
      </div>
      ` +
      STUDY_TMPL.checkpoint("Python 파이프라인이 끝난 뒤 브라우저에서 일어나는 일을 3문장으로 설명할 수 있나요?") +
      STUDY_TMPL.recap("app.js = fetch → 좌표 → 병합 → 마커 → 드로어. Module 52까지 — 입문·운영·소스 해설 과정을 마칩니다."),
  },
];