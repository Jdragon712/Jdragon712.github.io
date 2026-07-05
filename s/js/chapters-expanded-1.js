/* global window, STUDY_TMPL */
window.STUDY_EXPANDED_1 = [
  {
    id: "e01-welcome",
    title: "교재 구성과 학습 방법",
    keywords: "syllabus 학습방법 목차",
    lead: "실제로 동작하는 「세종 공직자 단골 식당 지도」를 소스·데이터·배포까지 역추적하는 프로젝트 기반 교재입니다. 도메인 용어는 용어 정의 표에서 맥락을 확인할 수 있습니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      `
      <h2 class="study-h2">이 교재에 대하여</h2>
      <p class="study-p">본 가이드는 공개 업무추진비를 활용한 지도 서비스의 <strong>설계 의도</strong>, <strong>ETL(Extract, Transform, Load) 파이프라인</strong>, <strong>웹 프론트엔드</strong>, <strong>운영·배포</strong>를 체계적으로 정리했습니다. 개념 설명과 실행 가능한 명령·코드 해설을 병행합니다.</p>
      <p class="study-p">슬라이드형 강의와 달리, 본 교재는 <strong>Terminal에서 직접 명령을 실행</strong>하고 <strong>소스 코드를 열어 읽는</strong> 과정까지 포함합니다. 전문 용어는 본문과 용어 정의 표에서 맥락과 함께 정리합니다.</p>

      <h2 class="study-h2">학습 방식 (권장)</h2>
      <table class="study-table">
        <tr><th>단계</th><th>방법</th><th>비고</th></tr>
        <tr><td>1. 읽기</td><td>학습 목표 확인 → 본문 → 용어 정의</td><td>한 페이지 = 하나의 개념</td></tr>
        <tr><td>2. 실행</td><td>실습 블록을 터미널에서 직접 수행</td><td>복사 후 한 줄씩 Enter</td></tr>
        <tr><td>3. 점검</td><td>이해 점검·요약으로 스스로 확인</td><td>「읽음 표시」로 진행률 저장</td></tr>
        <tr><td>4. 복습</td><td>Module 4 실습, Module 5 소스 해설</td><td>2회독 시 코드 파트 집중</td></tr>
      </table>
      <p class="study-p">한 번에 여러 모듈을 읽기보다 <strong>한 모듈을 읽고 → 실습하고 → 이해 점검</strong>하는 순환을 권장합니다. 실습을 건너뛰면 이후 모듈에서 경로·명령이 낯설어질 수 있습니다.</p>

      <h2 class="study-h2">선수 지식</h2>
      <ul class="study-ul">
        <li>맥(macOS) 환경에서 Terminal 실행</li>
        <li>파일·폴더 개념 (경로, 확장자)</li>
        <li>웹 브라우저로 URL 접속</li>
      </ul>
      <p class="study-p">Python·JavaScript 문법을 모두 알 필요는 없습니다. <strong>입력과 출력</strong>, <strong>파일 위치</strong>를 중심으로 읽으면 됩니다. 문법은 Module 5 소스 해설에서 필요한 부분만 다룹니다.</p>

      <h2 class="study-h2">과정 목표 (Course Outcomes)</h2>
      <p class="study-p">5개 Part(52장)를 완료하면 다음을 수행할 수 있습니다.</p>
      <ol class="study-ol">
        <li>프로젝트 디렉터리 구조와 데이터 흐름(raw → export → web)을 설명할 수 있습니다.</li>
        <li>파이프라인 8단계와 Hermes 쉘 스크립트를 상황에 맞게 실행할 수 있습니다.</li>
        <li>공개 JSON·지도 UI의 설계 원칙(횟수만 공개, 금액 비공개)을 설명할 수 있습니다.</li>
        <li>로컬 미리보기와 GitHub Pages 배포 절차를 수행할 수 있습니다.</li>
        <li>핵심 Python·JavaScript 소스의 책임 범위를 읽고 수정 지점을 찾을 수 있습니다.</li>
      </ol>

      <h2 class="study-h2">커리큘럼 (5 Part · 52장)</h2>
      <table class="study-table">
        <tr><th>Part</th><th>장 수</th><th>주제</th></tr>
        <tr><td>1 기초</td><td>12장</td><td>개요, 터미널, 프로젝트 구조, Python 환경</td></tr>
        <tr><td>2 데이터 파이프라인</td><td>12장</td><td>API 키, 수집, ETL 8단계(단계별)</td></tr>
        <tr><td>3 웹·운영</td><td>11장</td><td>운영, 웹 스택, 배포, 윤리, AI·진단</td></tr>
        <tr><td>4 실습·검증</td><td>7장</td><td>스크린샷, 실습 시리즈, 완료 체크리스트</td></tr>
        <tr><td>5 소스 코드</td><td>10장</td><td>소스 코드 줄 단위 해설</td></tr>
      </table>
      <p class="study-p">각 Part마다 <strong>1장부터 다시 번호</strong>가 매겨집니다. Part 1은 전체 지도를 한눈에 잡는 <strong>기초·맥락</strong>이고, Part 2부터 파이프라인을 단계별로 깊게 다루며, Part 5에서 실제 코드를 줄 단위로 해설합니다.</p>

      <h2 class="study-h2">예상 학습 시간</h2>
      <p class="study-p"><strong>1회독:</strong> 15~25시간 (실습 포함) · <strong>2회독(코드):</strong> +8~12시간. 하루 2~3모듈 페이스를 권장합니다.</p>
      <p class="study-p">실습 시간은 PC 성능·네트워크·데이터 다운로드 속도에 따라 달라질 수 있습니다. 파이프라인 전체 실행은 수 분 이상 걸릴 수 있으므로, Module 1에서는 구조 이해에 집중하고 실제 파이프라인 실행은 Module 2 이후에 진행합니다.</p>

      <h2 class="study-h2">프로젝트 경로 · 산출물</h2>
      <pre class="study-code">프로젝트: ~/Desktop/헤르메스 비서/부업/맛집앱/
로컬 지도: http://127.0.0.1:5173
공개 지도: https://jdragon712.github.io/sejong-official-restaurant-map/</pre>
      <p class="study-p"><code>~</code>는 홈 디렉터리(home directory)를 뜻하며, 맥에서는 <code>/Users/본인이름/</code>과 같습니다. 로컬 지도 URL의 <code>127.0.0.1</code>은 같은 컴퓨터 안에서만 접속 가능한 주소입니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["ETL", "Extract·Transform·Load로 데이터를 처리하는 3단계 처리 방식입니다. 본 프로젝트의 핵심 데이터 흐름입니다."],
        ["프로젝트 기반 학습", "실제 동작하는 소프트웨어를 만들며 개념을 익히는 방식입니다. 이론만 읽는 것보다 기억에 오래 남습니다."],
        ["Part", "주제별로 묶인 교재 단위입니다. Part마다 1장부터 번호가 다시 시작합니다(총 5 Part · 52장)."],
      ]) +
      STUDY_TMPL.checkpoint("이 교재가 「슬라이드」가 아니라 「실행·코드까지 다루는 가이드」인 이유를 한 문장으로 말할 수 있습니까?") +
      STUDY_TMPL.demo("data-layers", "fetch → ETL → sync 순서로 눌러 데이터가 raw에서 브라우저까지 이동하는 과정을 확인합니다.") +
      STUDY_TMPL.recap("프로젝트 기반 자기주도 학습 가이드입니다. Module 1부터 순서대로 읽으며, 실습과 소스 해설을 병행합니다."),
  },
  {
    id: "e02-what-is-coding",
    title: "소프트웨어 구성 — 이 프로젝트의 기술 스택",
    keywords: "Python JavaScript bash 스택",
    lead: "하나의 서비스는 여러 언어와 도구가 역할 분담하여 이루어집니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "데이터 처리·UI·자동화 계층을 구분하여 설명할 수 있습니다",
        "각 기술이 담당하는 폴더 경로를 연결할 수 있습니다",
      ]) +
      STUDY_TMPL.prereq(["Part 1 · 1장 읽기"]) +
      `
      <h2 class="study-h2">3계층 구조</h2>
      <p class="study-p">본 프로젝트는 크게 <strong>데이터 계층</strong>, <strong>표현 계층</strong>, <strong>자동화 계층</strong>으로 나뉩니다. 각 계층은 서로 다른 프로그래밍 언어를 사용하며, 한 언어로 모든 것을 처리하지 않습니다.</p>
      <table class="study-table">
        <tr><th>계층</th><th>기술</th><th>위치</th><th>책임</th></tr>
        <tr><td>데이터</td><td>Python 3</td><td><code>scripts/</code></td><td>수집·정규화·집계·export</td></tr>
        <tr><td>표현</td><td>HTML/CSS/JS</td><td><code>web/</code></td><td>지도 UI, JSON 로드, 상호작용</td></tr>
        <tr><td>자동화</td><td>bash</td><td><code>~/hermes-restaurant-*.sh</code></td><td>반복 작업 오케스트레이션</td></tr>
      </table>
      <p class="study-p"><strong>Python</strong>은 엑셀·CSV 같은 데이터 파일을 읽고 가공하는 데 적합합니다. <strong>JavaScript(JS)</strong>는 웹 브라우저 안에서 지도를 그리고 사용자 클릭에 반응합니다. <strong>bash</strong>는 여러 명령을 순서대로 실행하는 「실행 버튼」 역할을 합니다.</p>
      ` +
      STUDY_TMPL.concept(
        "프로그램이란",
        "<p>정해진 입력에 대해 정해진 순서로 변환·출력을 수행하는 실행 가능한 명세입니다. 본 프로젝트에서는 「업무추진비 raw 파일」이 입력, 「지도용 JSON + 브라우저 화면」이 출력입니다.</p><p>프로그램을 읽을 때 문법 전체를 외울 필요는 없습니다. <strong>어떤 파일을 읽어서(입력), 어떤 파일을 만드는지(출력)</strong>를 먼저 파악하면 이후 모듈에서 코드를 훨씬 수월하게 따라갈 수 있습니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["ETL", "Extract · Transform · Load의 3단계 데이터 처리입니다."],
        ["정적 웹", "서버에서 동적 로직 없이 HTML·JS·JSON 파일만으로 동작하는 구조입니다. GitHub Pages에 적합합니다."],
        ["오케스트레이션", "여러 스크립트를 정해진 순서·조건에 맞게 자동 실행하는 것입니다. Hermes .sh 파일이 이 역할을 합니다."],
        ["기술 스택", "한 서비스를 구성하는 언어·라이브러리·도구의 조합입니다. 본 프로젝트는 Python + HTML/CSS/JS + bash입니다."],
      ]) +
      STUDY_TMPL.pitfalls([
        "모든 코드를 한 언어로 읽으려 하지 마세요. Python은 데이터, JS는 브라우저, bash는 실행 자동화입니다.",
        "문법 암기보다 「이 스크립트의 입력/출력 파일」을 먼저 파악하는 것이 효율적입니다.",
        "HTML·CSS·JS를 한 덩어리로 부르기도 하지만, 역할은 다릅니다. HTML=구조, CSS=디자인, JS=동작입니다.",
      ]) +
      STUDY_TMPL.recap("Python=ETL, JS=지도 UI, bash=실행 자동화입니다. 계층별로 나누어 읽습니다."),
  },
  {
    id: "e03-project-story",
    title: "서비스 정의 — 단골 식당 지도의 범위",
    keywords: "서비스 정의 업무추진비 공개범위",
    lead: "기능 범위와 비공개 원칙을 먼저 고정해야 이후 기술 선택이 이해됩니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "서비스 In/Out 범위를 표로 설명할 수 있습니다",
        "금액 비공개가 기술적·정책적 결정임을 이해할 수 있습니다",
      ]) +
      `
      <figure class="study-figure">
        <img src="assets/img/map-overview.png" alt="완성 지도" loading="lazy" />
        <figcaption>Figure 1.1 — 배포된 지도 UI (티어 마커, 목록, 출처 고지)</figcaption>
      </figure>
      <h2 class="study-h2">서비스 정의</h2>
      <p class="study-p">세종 관련 기관의 공개 업무추진비에서 식음료 업체 방문을 집계하고, <strong>방문 횟수</strong>와 <strong>위치</strong>를 지도·목록으로 제공합니다. 「단골」은 특정 기간 동안 반복 방문한 업체를 시각적으로 구분하는 표현입니다.</p>
      <p class="study-p">데이터는 각 기관이 의무적으로 공개한 자료이며, 본 서비스는 이를 <strong>중립적으로 집계·시각화</strong>합니다. 맛 평가·추천·광고 기능은 의도적으로 포함하지 않습니다.</p>
      <table class="study-table">
        <tr><th>In (포함)</th><th>Out (제외)</th></tr>
        <tr><td>방문 횟수, 기간, 출처</td><td>금액·총액·건당 비용</td></tr>
        <tr><td>인허가 기반 주소·매칭</td><td>맛 평가·추천·광고</td></tr>
        <tr><td>정적 웹 + 월간 갱신</td><td>직급·계층별 랭킹</td></tr>
      </table>
      ` +
      STUDY_TMPL.concept(
        "공개 지표 설계",
        "<p>투명성 데이터를 서비스화할 때, 금액 공개는 「낭비」 프레임으로 해석될 위험이 있습니다. 본 프로젝트는 <strong>빈도(횟수)</strong>만 공개해 중립적 맥락을 유지하고, 금액은 <code>data/private/</code>에서 파이프라인과 분리합니다.</p><p>이는 단순한 UI 선택이 아니라 <strong>export 단계에서 금액 필드를 제외</strong>하는 기술적 설계입니다. <code>export_public.py</code>는 공개 JSON에 허용된 필드만 화이트리스트로보냅니다. 따라서 실수로 금액이 배포될 가능성을 구조적으로 줄입니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["visit_count_total", "집계 기간 내 동일 업체가 업무추진비 레코드에 등장한 총 횟수입니다. 지도 마커 크기·티어에 반영됩니다.", "방문 횟수"],
        ["data_as_of", "데이터 반영 기준일입니다. manifest.json에 기록되며, 사용자에게 「언제까지의 데이터인지」를 알려 줍니다.", "기준일"],
        ["In/Out", "서비스에 포함(In)할 기능과 의도적으로 제외(Out)할 기능을 명시하는 범위 정의 방식입니다.", "포함·제외"],
      ]) +
      STUDY_TMPL.pitfalls([
        "방문 횟수가 많다고 해서 「추천 식당」이 아닙니다. 공직 업무 맥락에서의 빈도 통계일 뿐입니다.",
        "금액 데이터는 파이프라인 내부에서 집계되지만, export·web 경로에는 절대 포함되지 않도록 설계되어 있습니다.",
      ]) +
      STUDY_TMPL.recap("방문 횟수만 공개하는 지도 서비스입니다. 금액·평가는 범위 밖입니다."),
  },
  {
    id: "e04-expense-data",
    title: "데이터 소스 — 업무추진비 공개 자료",
    keywords: "업무추진비 raw 데이터소스",
    lead: "1차 데이터는 기관 게시판에 게시된 공개 파일이며, 형식·스키마가 기관별로 상이합니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "1차 데이터의 출처와 저장 경로를 설명할 수 있습니다",
        "기관별 스키마 차이가 normalize 단계를 필요로 함을 이해할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">수집 대상</h2>
      <p class="study-p">세종시청, 정부세종청사, 중앙부처 등 — <code>data/manual/</code> 레지스트리에 URL·범위가 정의되어 있습니다. 각 기관은 법령에 따라 업무추진비를 주기적으로 게시하며, 파일 형식은 주로 <strong>엑셀(.xlsx)</strong> 또는 <strong>HWP</strong>입니다.</p>
      <p class="study-p">수집 스크립트는 게시판 첨부 파일을 <code>data/raw/expense/</code>에 원본 그대로 저장합니다.</p>
      <p class="study-p">fetch는 수집만 담당합니다. 파싱·집계는 이후 단계에서 진행합니다.</p>
      <h2 class="study-h2">일반적 필드 (기관별 명칭 상이)</h2>
      <table class="study-table">
        <tr><th>의미</th><th>열 이름 예</th></tr>
        <tr><td>집행일</td><td>집행일시, 사용일, 결제일 …</td></tr>
        <tr><td>업체</td><td>집행장소, 사용처, 상호 …</td></tr>
        <tr><td>목적</td><td>집행목적, 적요, 사용내역 …</td></tr>
        <tr><td>금액</td><td>집행금액, 사용금액(원) … → 비공개 경로</td></tr>
      </table>
      <p class="study-p">같은 「업체 이름」이라도 기관 A는 「집행장소」, 기관 B는 「사용처」로 표기할 수 있습니다. 이런 차이를 <strong>schema</strong> 차이라고 부르며, normalize 단계에서 표준 필드명으로 통일합니다.</p>
      <pre class="study-code">data/raw/expense/{기관}/{연도}/파일.xlsx</pre>
      ` +
      STUDY_TMPL.concept(
        "raw 레이어",
        "<p>원본 파일은 가공 없이 보관합니다. 재현성·감사·재파싱을 위해 삭제·덮어쓰기를 최소화하는 것이 ETL 설계의 기본입니다.</p><p>raw 파일이 있으면 나중에 파싱 로직을 개선했을 때 <strong>처음부터 다시 수집할 필요 없이</strong> 재처리할 수 있습니다. 데이터 엔지니어링에서는 「raw는 절대 수정하지 않는다」는 원칙을 자주 적용합니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["raw", "가공 전 원본 데이터를 보관하는 레이어입니다. 게시판에서 받은 파일 그대로 저장합니다."],
        ["스키마", "데이터의 구조·열 이름·타입을 정의한 것입니다. 기관마다 스키마가 달라 normalize가 필요합니다."],
        ["normalize", "이기종 스키마를 하나의 표준 형식(canonical schema)으로 통일하는 변환 단계입니다.", "정규화"],
      ]) +
      STUDY_TMPL.pitfalls([
        "raw 파일을 직접 수정하면 원본 증거가 훼손됩니다. 가공 결과는 processed/·export/에만 저장합니다.",
        "금액 열도 raw에는 존재하지만, 이후 export 단계에서 공개 JSON에는 포함되지 않습니다.",
      ]) +
      STUDY_TMPL.recap("공개 업무추진비 파일이 1차 소스입니다. raw/에 원본을 보관합니다."),
  },
  {
    id: "e05-terminal-open",
    title: "작업 환경 — Terminal과 셸",
    keywords: "터미널 shell 프롬프트",
    lead: "본 프로젝트의 파이프라인·서버 기동은 CLI(Command Line Interface)로 수행합니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "macOS Terminal을 실행하고 프롬프트에서 명령을 입력할 수 있습니다",
        "pwd로 현재 작업 디렉터리를 확인할 수 있습니다",
      ]) +
      `
      <h2 class="study-h2">Terminal 실행</h2>
      <ol class="study-ol">
        <li><kbd>Cmd</kbd>+<kbd>Space</kbd> → 「Terminal」입력 후 실행</li>
        <li>또는 Finder → 응용 프로그램 → 유틸리티 → Terminal</li>
      </ol>
      <p class="study-p">Terminal은 마우스 대신 <strong>텍스트 명령</strong>으로 컴퓨터를 조작하는 창입니다. 파이프라인 실행·파일 확인·서버 기동 등 개발 작업의 대부분이 여기서 이루어집니다.</p>
      <p class="study-p"><strong>프롬프트(Prompt)</strong> — 셸이 명령 입력을 대기하는 상태입니다. 예: <code>user@host ~ %</code>. 프롬프트가 보이면 명령을 입력할 수 있습니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["CLI", "키보드로 텍스트 명령을 입력해 작업하는 방식입니다. GUI와 대비됩니다.", "명령줄"],
        ["셸(shell)", "사용자가 입력한 명령을 해석·실행하는 프로그램입니다. macOS 기본값은 zsh 또는 bash입니다."],
        ["pwd", "Print Working Directory — 현재 작업 중인 폴더 경로를 출력합니다."],
        ["프롬프트", "명령 입력을 기다리는 셸의 표시 상태입니다. 커서가 깜빡이면 입력 가능합니다."],
      ]) +
      STUDY_TMPL.exercise("현재 경로 확인", "pwd", "출력 예: /Users/사용자이름 — 이후 모든 경로는 이를 기준으로 합니다. 경로가 출력되면 Terminal이 정상 동작하는 것입니다.") +
      STUDY_TMPL.pitfalls([
        "명령은 대소문자를 구분합니다. pwd는 소문자로 입력합니다.",
        "한글 IME(입력기) 상태에서 특수문자·따옴표 입력이 어긋날 수 있습니다. 영문 입력 모드로 전환하세요.",
        "명령 입력 후 Enter를 눌러야 실행됩니다. 입력만 하고 Enter를 누르지 않으면 아무 일도 일어나지 않습니다.",
      ]) +
      STUDY_TMPL.demo("terminal-sim", "pwd·ls를 입력하거나 아래 버튼을 눌러 Terminal 동작을 연습합니다.") +
      STUDY_TMPL.recap("Terminal과 pwd로 CLI 작업 환경을 확인합니다."),
  },
  {
    id: "e06-terminal-cd-ls",
    title: "디렉터리 탐색 — cd와 ls",
    keywords: "cd ls 경로",
    lead: "파일 시스템을 탐색하는 기본 연산입니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "cd로 디렉터리를 변경할 수 있습니다",
        "ls로 항목 목록을 확인할 수 있습니다",
        "프로젝트 루트로 이동할 수 있습니다",
      ]) +
      `
      <p class="study-p">파일과 폴더는 <strong>경로(Path)</strong>라는 주소로 위치가 정해집니다. <code>cd</code>는 그 주소로 이동하고, <code>ls</code>는 현재 위치의 파일·폴더 목록을 보여 줍니다.</p>
      <table class="study-table">
        <tr><th>명령</th><th>설명</th></tr>
        <tr><td><code>cd 경로</code></td><td>작업 디렉터리 변경</td></tr>
        <tr><td><code>cd ~</code></td><td>홈 디렉터리로 이동</td></tr>
        <tr><td><code>cd ..</code></td><td>상위(부모) 디렉터리로 이동</td></tr>
        <tr><td><code>ls</code></td><td>현재 디렉터리 항목 목록</td></tr>
        <tr><td><code>ls -la</code></td><td>숨김 항목 포함 상세 목록</td></tr>
      </table>
      <p class="study-p">경로에 공백이 있으면 따옴표로 감쌉니다: <code>"$HOME/Desktop/헤르메스 비서/..."</code>. <code>$HOME</code>은 홈 디렉터리 경로를 나타내는 환경 변수입니다.</p>
      <p class="study-p"><code>ls -la</code>에서 <code>.</code>은 현재 폴더, <code>..</code>은 상위 폴더를 뜻합니다. <code>.venv</code>처럼 점(.)으로 시작하는 항목은 일반 <code>ls</code>에서는 보이지 않습니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["cd", "Change Directory — 작업 디렉터리를 변경합니다."],
        ["ls", "List — 현재 디렉터리의 파일·폴더 목록을 출력합니다."],
        ["경로", "파일·폴더의 위치를 나타내는 문자열입니다. 절대 경로(/로 시작)와 상대 경로가 있습니다."],
      ]) +
      STUDY_TMPL.exercise(
        "프로젝트 루트 진입",
        'cd "$HOME/Desktop/헤르메스 비서/부업/맛집앱"\npwd\nls',
        "docs, data, scripts, web 디렉터리가 보이면 정상입니다. 보이지 않으면 경로 철자·따옴표를 다시 확인하세요."
      ) +
      STUDY_TMPL.pitfalls([
        "경로에 공백이 있는 폴더명(「헤르메스 비서」)은 반드시 따옴표로 감싸야 합니다.",
        "cd 후 pwd로 현재 위치를 확인하는 습관을 들이면 길을 잃었을 때 빠르게 복구할 수 있습니다.",
      ]) +
      STUDY_TMPL.demo("folder-explorer", "폴더를 클릭해 이동하고 ls로 목록을 확인합니다.") +
      STUDY_TMPL.recap("cd와 ls로 프로젝트 루트에 진입·확인합니다."),
  },
  {
    id: "e07-terminal-more",
    title: "파일 조회 — cat과 open",
    keywords: "cat open manifest",
    lead: "짧은 설정·메타데이터 파일을 터미널에서 확인하고, 필요 시 GUI로 폴더를 엽니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "cat으로 JSON 메타데이터를 확인할 수 있습니다",
        "open으로 Finder·브라우저를 호출할 수 있습니다",
      ]) +
      `
      <p class="study-p">터미널에서 파일 내용을 빠르게 확인하거나, macOS의 GUI 앱(Finder, Safari 등)을 호출할 수 있는 명령이 있습니다. 짧은 설정 파일은 <code>cat</code>, 폴더 탐색은 <code>open</code>이 편리합니다.</p>
      <table class="study-table">
        <tr><th>명령</th><th>용도</th></tr>
        <tr><td><code>cat 파일</code></td><td>소용량 텍스트·JSON 내용을 터미널에 출력</td></tr>
        <tr><td><code>open .</code></td><td>현재 폴더를 Finder에서 열기</td></tr>
        <tr><td><code>open URL</code></td><td>기본 브라우저로 URL 열기</td></tr>
      </table>
      <p class="study-p"><code>manifest.json</code>은 export된 데이터의 <strong>metadata</strong> 파일입니다. <code>data_as_of</code>(기준일), <code>record_count</code>(레코드 수) 등을 담고 있어, 지도 데이터가 언제 기준인지 확인할 수 있습니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["cat", "Concatenate — 파일 내용을 터미널 화면에 그대로 출력하는 명령입니다. 짧은 텍스트·JSON 확인에 사용합니다.", "내용 출력"],
        ["open", "macOS에서 파일·폴더·URL을 기본 앱으로 여는 명령입니다.", "열기"],
        ["manifest", "데이터 세트의 요약 정보(기준일, 건수, 버전 등)를 담은 JSON 파일입니다."],
      ]) +
      STUDY_TMPL.exercise("manifest 확인", "cat data/export/manifest.json", "data_as_of, record_count 필드를 확인합니다. JSON 형식이므로 중괄호·따옴표 구조를 관찰해 보세요.") +
      STUDY_TMPL.warn("대용량 JSON 전체를 cat으로 출력하는 것은 비권장입니다. 화면이 길어지고 터미널이 느려질 수 있습니다. 이후 모듈에서 Python·json 도구를 사용합니다.") +
      STUDY_TMPL.tip("<code>open data/export/</code>로 Finder에서 export 폴더를 열고, <code>manifest.json</code>을 더블클릭해 텍스트 편집기로 볼 수도 있습니다.") +
      STUDY_TMPL.recap("cat은 내용 확인, open은 GUI·브라우저 연동에 사용합니다."),
  },
  {
    id: "e08-bash-script",
    title: "셸 스크립트 — 반복 실행의 표준화",
    keywords: "bash hermes 스크립트",
    lead: "Hermes 스크립트는 자주 쓰는 파이프라인·서버 기동을 단일 진입점으로 제공합니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "bash 스크립트가 명령 시퀀스를 캡슐화함을 설명할 수 있습니다",
        "hermes-restaurant-open.sh의 동작을 단계별로 설명할 수 있습니다",
      ]) +
      `
      <p class="study-p">같은 명령을 매번 직접 입력하면 순서를 바꾸거나 경로를 잘못 입력할 수 있습니다. <strong>셸 스크립트(Shell Script)</strong>는 여러 명령을 파일에 저장해 <code>bash 파일명.sh</code> 한 줄로 실행하는 방식입니다.</p>
      <pre class="study-code">bash ~/hermes-restaurant-open.sh</pre>
      <ol class="study-ol">
        <li>포트 5173에서 <code>web/</code> 정적 서버 기동</li>
        <li>브라우저에서 <code>http://127.0.0.1:5173</code> 오픈</li>
      </ol>
      <p class="study-p">위 두 단계를 매번 수동으로 하면 포트 번호·경로를 틀리기 쉽습니다. 스크립트는 문서에 적힌 절차와 실제 실행을 일치시킵니다.</p>
      ` +
      STUDY_TMPL.concept(
        "왜 스크립트로 묶는가",
        "<p>단계·순서·환경변수가 고정된 작업은 스크립트로 표준화하면 실수를 줄이고, 문서와 실행이 일치합니다. 운영 매뉴얼의 「한 줄 갱신」이 이 패턴입니다.</p><p>Hermes 스크립트는 홈 디렉터리(<code>~/</code>)에 두어 <strong>어느 폴더에서든</strong> 동일한 명령으로 프로젝트 작업을 시작할 수 있게 합니다. 프로젝트 루트로 이동한 뒤 상대 경로를 외울 필요가 줄어듭니다.</p>"
      ) +
      STUDY_TMPL.glossary([
        ["~/", "홈 디렉터리를 뜻합니다. 맥에서는 /Users/사용자이름/ 과 같습니다.", "홈"],
        [".sh", "셸 스크립트 파일 확장자입니다. bash 명령으로 실행합니다.", "셸 스크립트"],
        ["Hermes", "본 프로젝트의 반복 작업을 표준화한 쉘 스크립트 모음의 이름입니다. doctor, open, fetch 등이 있습니다."],
      ]) +
      STUDY_TMPL.tip("스크립트 원문을 읽으려면 <code>cat ~/hermes-restaurant-open.sh</code>를 실행하세요. 어떤 명령이 순서대로 실행되는지 직접 확인할 수 있습니다.") +
      STUDY_TMPL.pitfalls([
        "스크립트 실행 중 터미널을 닫으면 서버가 종료될 수 있습니다. open.sh로 띄운 로컬 서버는 터미널 세션과 연결됩니다.",
        "스크립트 파일 경로에 <code>~/</code>를 빼먹으면 「파일을 찾을 수 없음」 오류가 납니다.",
      ]) +
      STUDY_TMPL.recap("Hermes .sh 파일은 문서화된 실행 진입점입니다."),
  },
  {
    id: "e09-folder-map-1",
    title: "디렉터리 구조 (1) — docs와 data",
    keywords: "docs data raw export private",
    lead: "데이터 라이프사이클은 폴더 이름에 인코딩되어 있습니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "data/ 하위 레이어(raw, processed, export, private)를 구분할 수 있습니다",
        "각 레이어의 신뢰도·공개 가능 여부를 설명할 수 있습니다",
      ]) +
      `
      <p class="study-p"><code>data/</code> 폴더는 데이터가 생성·가공·배포되기까지 거치는 <strong>단계(레이어)</strong>를 폴더 이름으로 표현합니다. 어느 폴더에 어떤 파일이 있는지 알면 파이프라인 전체를 이해하는 데 큰 도움이 됩니다.</p>
      <pre class="study-code">data/
├── raw/         원본 (게시판 다운로드)
├── processed/   중간 산출 (parquet, 캐시)
├── export/      공개 JSON 원본
├── private/     금액 등 — 배포·git 제외
└── manual/      수집 범위·URL 메타</pre>
      <table class="study-table">
        <tr><th>레이어</th><th>공개</th><th>역할</th></tr>
        <tr><td>raw</td><td>×</td><td>재현·재파싱용 원본 보관</td></tr>
        <tr><td>processed</td><td>×</td><td>정규화·집계 중간 결과 (parquet)</td></tr>
        <tr><td>export</td><td>△</td><td>방문 횟수만 포함한 공개 JSON 원본</td></tr>
        <tr><td>private</td><td>×</td><td>금액 집계 — 절대 호스팅·git 업로드 금지</td></tr>
        <tr><td>manual</td><td>△</td><td>수집 대상 URL·기관 메타데이터</td></tr>
      </table>
      <p class="study-p"><code>docs/</code>는 운영 문서·가이드가 들어 있는 폴더입니다. 코드 실행과 직접 관련은 없지만, 정책·절차를 확인할 때 참고합니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["레이어", "데이터 처리 단계를 구분하는 논리적 층입니다. raw → processed → export 순으로 신뢰도·가공 수준이 올라갑니다.", "층"],
        ["parquet", "열(column) 단위로 압축·저장하는 효율적인 데이터 파일 형식입니다. processed/ 중간 산출에 사용합니다."],
        ["export", "웹·공개에보낼 최종 JSON을 생성하는 레이어입니다. 금액 필드는 여기서 제외됩니다."],
      ]) +
      STUDY_TMPL.exercise("data 탐색", "ls data/\nls data/export/", "각 하위 폴더 이름을 확인합니다. export/에 JSON 파일이 있으면 이전 파이프라인 실행 결과가 남아 있는 것입니다.") +
      STUDY_TMPL.pitfalls([
        "private/ 내용을 git에 커밋하거나 web/에 복사하면 안 됩니다. .gitignore로 제외되어 있어도 수동 복사는 위험합니다.",
        "raw와 export를 혼동하지 마세요. raw는 원본, export는 가공·필터링된 공개용 결과입니다.",
      ]) +
      STUDY_TMPL.recap("data/ 폴더는 레이어별 데이터 라이프사이클을 담고 있습니다."),
  },
  {
    id: "e10-folder-map-2",
    title: "디렉터리 구조 (2) — scripts와 web",
    keywords: "scripts web 배포",
    lead: "가공 로직과 배포 산출물이 분리되어 있습니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "scripts/와 web/의 책임을 구분할 수 있습니다",
        "GitHub Pages 배포 대상이 web/ 뿐임을 이해할 수 있습니다",
      ]) +
      `
      <p class="study-p">데이터를 만드는 코드(<code>scripts/</code>)와 사용자에게 보여 주는 결과물(<code>web/</code>)은 물리적으로 분리되어 있습니다.</p>
      <p class="study-p"><strong>민감한 스크립트·raw 데이터 없이</strong> 지도만 공개 호스팅할 수 있는 구조입니다.</p>
      <pre class="study-code">scripts/     ETL·점검 (Python, bash)
web/         정적 호스팅 산출물 (HTML, JS, data/*.json)</pre>
      <p class="study-p"><code>scripts/</code>에는 Python 파이프라인 스크립트, <code>ensure_venv.sh</code>, <code>requirements.txt</code> 등이 있습니다. <code>web/</code>에는 <code>index.html</code>, <code>js/app.js</code>, <code>css/style.css</code>, 배포용 <code>data/*.json</code>이 있습니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["scripts/", "데이터 수집·변환·검증 로직이 들어 있는 폴더입니다. 서버에 올리지 않고 로컬에서만 실행합니다.", "스크립트"],
        ["web/", "브라우저에 배포되는 정적 파일 묶음입니다. GitHub Pages의 루트가 됩니다.", "웹"],
        ["sync", "export/의 최신 JSON을 web/data/로 복제하는 단계입니다. 브라우저는 web/data/만 읽습니다.", "동기화"],
      ]) +
      STUDY_TMPL.pitfalls([
        "<code>data/export/</code>는 생성 원본, <code>web/data/</code>는 sync로 복제된 배포용 복사본입니다. export만 갱신하고 sync를 안 하면 지도가 바뀌지 않습니다.",
        "API 키·.env·private 데이터는 web/에 포함되면 안 됩니다. 공개 저장소에 노출될 수 있습니다.",
        "scripts/ 폴더 전체를 GitHub Pages에 올릴 필요가 없습니다. web/만 배포 대상입니다.",
      ]) +
      STUDY_TMPL.exercise("web 구조", "ls web/js/\nls web/data/", "app.js, config.js 등 JS 파일과 restaurants 관련 JSON이 보이면 정상입니다.") +
      STUDY_TMPL.recap("scripts/는 로직, web/은 배포 산출물입니다."),
  },
  {
    id: "e11-data-flow",
    title: "엔드투엔드 데이터 흐름",
    keywords: "ETL 흐름 pipeline",
    lead: "전체 파이프라인(Pipeline, 데이터 처리 경로)을 한 장의 맵으로 고정합니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "수집→정규화→집계→매칭→export→geocode→sync 흐름을 순서대로 말할 수 있습니다",
        "각 단계의 대표 스크립트를 연결할 수 있습니다",
      ]) +
      `
      <figure class="study-figure">
        <img src="assets/img/pipeline-terminal.png" alt="파이프라인" loading="lazy" />
        <figcaption>Figure 1.2 — run_pipeline.sh 실행 시 단계 로그 (예시)</figcaption>
      </figure>
      <p class="study-p">아래 7단계(+검증)는 Module 2에서 각각 자세히 다룹니다. 지금은 <strong>전체 순서와 산출물 위치</strong>만 기억하면 됩니다.</p>
      <ol class="study-ol">
        <li><strong>fetch</strong> → <code>data/raw/</code> (원본 수집)</li>
        <li><strong>normalize_expense</strong> → line items (행 단위 정규화)</li>
        <li><strong>aggregate_visits</strong> → visit_count (방문 횟수 집계)</li>
        <li><strong>match_venues</strong> → 주소·ID 매칭 (인허가 POI와 연결)</li>
        <li><strong>export_public</strong> → JSON + lint (공개용 export)</li>
        <li><strong>geocode_venues</strong> → 좌표 (주소→위도·경도)</li>
        <li><strong>sync_web_data</strong> → <code>web/data/</code> (브라우저용 복제)</li>
      </ol>
      <p class="study-p">브라우저는 <code>web/data/</code>의 JSON만 읽습니다. 파이프라인을 실행하지 않고 새로고침만 하면 화면 데이터는 변하지 않습니다.</p>
      ` +
      STUDY_TMPL.glossary([
        ["파이프라인", "데이터가 여러 처리 단계를 순서대로 거치는 경로입니다. 한 단계의 출력이 다음 단계의 입력이 됩니다."],
        ["geocode", "주소 문자열을 위도·경도 좌표로 변환하는 과정입니다. 지도 마커 위치에 필요합니다."],
        ["line item", "업무추진비 한 건(한 행)을 뜻하는 정규화된 레코드 단위입니다.", "행 단위 레코드"],
        ["lint", "export JSON이 스키마·정책(금액 미포함 등)을 만족하는지 자동 검사하는 단계입니다."],
      ]) +
      STUDY_TMPL.checkpoint("「sync 전에 브라우저만 새로고침」하면 데이터가 바뀌지 않는 이유를 설명할 수 있습니까?") +
      STUDY_TMPL.pitfalls([
        "fetch만 하고 enhance(또는 파이프라인)를 실행하지 않으면 raw는 늘어나지만 지도 JSON은 갱신되지 않습니다.",
        "geocode가 실패한 레코드는 좌표 없이 남아 지도 마커에서 제외될 수 있습니다.",
      ]) +
      STUDY_TMPL.demo("data-layers", "fetch → ETL → sync 순서로 데이터가 폴더를 따라 이동하는 과정을 확인합니다.") +
      STUDY_TMPL.demo("pipeline-flow", "파이프라인 실행 시 데이터가 8단계를 거치는 흐름을 확인합니다.") +
      STUDY_TMPL.recap("흐름은 raw → ETL → export → web/data → 브라우저입니다."),
  },
  {
    id: "e12-python-venv",
    title: "Python 실행 환경 — venv와 requirements",
    keywords: "venv pip requirements ensure_venv",
    lead: "프로젝트 격리 환경에서 의존성을 고정해 재현 가능한 실행을 보장합니다.",
    html:
      STUDY_TMPL.module(1, "기초", 5) +
      STUDY_TMPL.goal([
        "venv가 의존성 격리에 필요한 이유를 설명할 수 있습니다",
        "ensure_venv.sh로 실행 환경을 준비할 수 있습니다",
      ]) +
      `
      <p class="study-p">Python 스크립트는 <code>pandas</code>, <code>openpyxl</code> 같은 <strong>외부 package</strong>에 의존합니다. 맥에 설치된 Python과 프로젝트용 Python을 섞으면 버전 충돌이 날 수 있어, <strong>venv</strong>로 프로젝트 전용 공간을 만듭니다.</p>
      <p class="study-p"><code>.venv/</code> — 프로젝트 전용 Python 환경입니다. <code>scripts/requirements.txt</code>에 pandas, openpyxl, requests 등 필요한 패키지 목록이 정의되어 있습니다. <code>ensure_venv.sh</code>가 이 목록을 읽어 자동으로 설치합니다.</p>
      ` +
      STUDY_TMPL.concept(
        "왜 venv를 쓰는가",
        "<p>시스템 전역 Python에 패키지를 설치하면 다른 프로젝트와 버전이 충돌할 수 있습니다. venv는 <code>.venv/</code> 폴더 안에 독립된 Python과 패키지를 두어, 「이 프로젝트만의 실행 환경」을 보장합니다.</p><p><code>RESTAURANT_MAP_PYTHON</code> 환경 변수는 venv 안의 Python 실행 파일 경로를 가리킵니다. 이후 모든 스크립트는 <code>\"$RESTAURANT_MAP_PYTHON\" scripts/...</code> 형태로 실행합니다.</p>"
      ) +
      STUDY_TMPL.exercise(
        "환경 준비",
        'cd "$HOME/Desktop/헤르메스 비서/부업/맛집앱"\nsource scripts/ensure_venv.sh\necho $RESTAURANT_MAP_PYTHON\n"$RESTAURANT_MAP_PYTHON" scripts/verify_setup.py',
        "RESTAURANT_MAP_PYTHON 경로와 verify 리포트가 출력되면 Module 1 실습 완료입니다. 오류가 나면 doctor.sh로 진단할 수 있습니다."
      ) +
      STUDY_TMPL.glossary([
        ["venv", "Virtual Environment — 프로젝트별로 Python·패키지를 격리하는 가상 환경입니다.", "가상 환경"],
        ["pip", "Python 패키지를 설치·관리하는 도구입니다. requirements.txt 목록을 읽어 설치합니다.", "핍"],
        ["requirements.txt", "프로젝트에 필요한 Python 패키지와 버전을 나열한 파일입니다.", "의존성 목록"],
        ["ensure_venv.sh", "venv가 없으면 생성하고, requirements.txt를 설치한 뒤 환경 변수를 설정하는 스크립트입니다.", "환경 준비"],
      ]) +
      STUDY_TMPL.pitfalls([
        "python 대신 $RESTAURANT_MAP_PYTHON을 사용해야 venv 안의 패키지가 적용됩니다.",
        "source scripts/ensure_venv.sh는 현재 터미널 세션에만 환경 변수를 설정합니다. 새 Terminal 창을 열면 다시 source 해야 합니다.",
      ]) +
      STUDY_TMPL.seeAlso([["Module 02 — 파이프라인", "#e17-pipeline-intro"]]) +
      STUDY_TMPL.demo("venv-sim", "시스템 Python과 프로젝트 venv가 어떻게 분리되는지 확인합니다.") +
      STUDY_TMPL.recap("ensure_venv.sh로 격리된 Python을 준비하고, verify로 Module 1을 마무리합니다."),
  },
];