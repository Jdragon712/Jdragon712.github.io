/* global window */
window.TUTORIAL_SLIDES = [
  {
    eyebrow: "시작",
    title: "세종 단골 식당 지도 — 프로젝트 개요",
    lead: "공개된 업무추진비 자료를 모아, 식당 방문 횟수만 지도에 올린 실제 프로젝트를 소개합니다.",
    body: `
      <ul class="bullet-list">
        <li><strong>대상</strong> — 초등 고학년 + 학부모 (강의는 선생님이 진행합니다)</li>
        <li><strong>오늘 목표</strong> — 코딩·데이터·AI가 어떻게 연결되는지 한 바퀴 살펴봅니다</li>
        <li><strong>마지막</strong> — 완성된 지도 웹사이트를 함께 열어 봅니다</li>
      </ul>
      <div class="callout callout--parent">
        <span class="callout__label">학부모에게</span>
        이 자료는 「프로그래밍 문법 교재」가 아니라, <strong>공공데이터로 서비스를 만든 전체 여정</strong>을 보여 주는 강의 슬라이드입니다.
      </div>
    `,
    summary: "오늘은 「만들기」보다 「어떻게 이어졌는지」를 살펴봅니다.",
    presenter:
      "인사 후 오늘 흐름을 미리 말해 주세요. 아이들에게는 ‘마지막에 진짜 지도를 켠다’고 예고하면 집중도가 올라갑니다. 학부모에게는 금액 비공개·면책이 핵심 설계라는 점을 살짝 언급해 두면 좋습니다.",
  },
  {
    eyebrow: "1장 · 문제",
    title: "문제 정의 — 세종 맛집 정보의 한계",
    lead: "맛집 정보는 네이버, 카카오, SNS에 흩어져 있고, 세종은 상권이 빠르게 바뀝니다.",
    body: `
      <ul class="bullet-list">
        <li>「어디가 진짜 자주 가는 곳일까?」 — <strong>방문 횟수</strong>라는 사실 데이터가 힌트가 됩니다</li>
        <li>세종시·정부세종청사 등 기관이 <strong>업무추진비를 공개</strong>합니다 (식사 장소 포함)</li>
        <li>다만 금액만 나열하면 오해가 생길 수 있어, 우리는 <strong>횟수만</strong> 사용합니다</li>
      </ul>
      <div class="callout callout--tip">
        <span class="callout__label">핵심 질문</span>
        공개 자료를 어떻게 쓰면, 사람들에게 도움이 되면서도 논란을 줄일 수 있을까요?
      </div>
    `,
    summary: "문제는 정보 분산과 「어디가 단골인지」 알기 어려움입니다.",
    presenter:
      "아이들에게는 ‘학교 급식 메뉴판이 여러 곳에 나뉘어 있다’고 비유해 보세요. 학부모에게는 투명성 데이터의 활용 사례임을 강조합니다.",
  },
  {
    eyebrow: "2장 · 아이디어",
    title: "서비스 설계 — 방문 횟수만 공개하는 지도",
    lead: "서비스 이름: 세종 공직자 단골 식당 지도. 맛 평가가 아니라 방문 집계입니다.",
    body: `
      <div class="flow-row">
        <span class="flow-step">공개 업무추진비</span>
        <span class="flow-arrow">→</span>
        <span class="flow-step">식당 이름 매칭</span>
        <span class="flow-arrow">→</span>
        <span class="flow-step">방문 횟수 합산</span>
        <span class="flow-arrow">→</span>
        <span class="flow-step">지도에 표시</span>
      </div>
      <ul class="bullet-list">
        <li><strong>보여 주는 것</strong> — 방문 횟수, 위치, 기간(예: 2025~2026)</li>
        <li><strong>보여 주지 않는 것</strong> — 금액, 총액, 직급별 비교</li>
        <li><strong>한 줄 카피</strong> — 「공직자들이 자주 찾는 단골 식당」</li>
      </ul>
    `,
    summary: "아이디어는 횟수만 공개하는 중립적인 맛집 지도입니다.",
    presenter:
      "‘맛집 추천 앱’이 아니라 ‘공개 기록을 지도로 옮긴 것’이라고 분명히 구분하세요. 금액을 왜 빼는지는 아이들도 이해할 수 있는 윤리 이야기입니다.",
  },
  {
    eyebrow: "3장 · 전체 그림",
    title: "전체 파이프라인 — 수집부터 배포까지",
    lead: "네 단계로 나누면 기억하기 쉽습니다.",
    body: `
      <div class="pipeline-grid">
        <div class="pipeline-item"><span>① 수집</span>기관 게시판·인허가 파일 받기</div>
        <div class="pipeline-item"><span>② 가공</span>Python(파이썬)으로 정리·집계 — <strong>ETL</strong>(Extract·Transform·Load, 수집·변환·적재)</div>
        <div class="pipeline-item"><span>③ 화면</span><strong>HTML</strong>(마크업) · <strong>CSS</strong>(스타일) · <strong>JavaScript</strong>(동작) 지도 만들기</div>
        <div class="pipeline-item"><span>④ 공개</span><strong>GitHub Pages</strong>(깃허브 페이지, 정적 호스팅)에 올리기</div>
      </div>
      <div class="callout callout--parent">
        <span class="callout__label">학부모에게</span>
        매달 새 자료가 나오면 같은 파이프라인을 다시 돌려 <strong>자동 갱신</strong>할 수 있게 설계했습니다.
      </div>
    `,
    summary: "흐름은 수집 → 가공 → 화면 → 공개입니다.",
    presenter:
      "이 네 단계를 오늘 내내 반복해서 말해 주세요. 다음 슬라이드부터 각 단계를 조금씩 확대합니다.",
  },
  {
    eyebrow: "4장 · 데이터",
    title: "데이터 구조 — raw, export, web, private",
    lead: "컴퓨터도 사람처럼 「정리 전」과 「정리 후」 폴더가 있습니다.",
    body: `
      <table class="term-table">
        <tr><th>data/raw/</th><td>원본 파일 (엑셀, HWP 등) — 그대로 보관</td></tr>
        <tr><th>data/export/</th><td>웹에 올릴 <strong>JSON</strong>(제이슨, 자바스크립트 객체 표기) — 방문 횟수·이름·주소</td></tr>
        <tr><th>web/data/</th><td>지도 앱이 읽는 복사본</td></tr>
        <tr><th>data/private/</th><td>금액 등 — <strong>절대 공개하지 않습니다</strong></td></tr>
      </table>
      <p class="slide-lead" style="margin-top:0.5rem"><strong>JSON</strong>(제이슨)은 컴퓨터가 읽기 쉬운 메모장 형식입니다. 지도 앱은 이 파일을 불러와 핀을 찍습니다.</p>
    `,
    summary: "원본(raw)과 공개용(export/web)을 분리합니다.",
    presenter:
      "금고(private) 비유가 잘 통합니다. 학부모에게는 데이터 거버넌스·최소 공개 원칙을 짧게 언급할 수 있습니다.",
  },
  {
    eyebrow: "5장 · Python",
    title: "Python ETL — 8단계 자동 처리",
    lead: "<code>scripts/</code> 폴더에 있는 프로그램들이 차례로 실행됩니다.",
    body: `
      <div class="pipeline-grid">
        <div class="pipeline-item"><span>1</span>인허가 목록 가져오기</div>
        <div class="pipeline-item"><span>2</span>업추비 글자 정리</div>
        <div class="pipeline-item"><span>3</span>방문 횟수 세기</div>
        <div class="pipeline-item"><span>4</span>식당 이름 맞추기</div>
        <div class="pipeline-item"><span>5</span>공개 JSON 만들기</div>
        <div class="pipeline-item"><span>6</span>주소 → 지도 좌표</div>
        <div class="pipeline-item"><span>7</span>web 폴더에 복사</div>
        <div class="pipeline-item"><span>8</span>설정 점검</div>
      </div>
      <p>한 번에 돌리려면 터미널에서 <span class="code-chip">bash ~/hermes-restaurant-update.sh</span></p>
      <p class="slide-lead" style="margin-top:0.5rem"><strong>ETL</strong>(Extract·Transform·Load)은 「가져오기 → 정리하기 → 저장하기」를 자동으로 반복하는 방식입니다.</p>
    `,
    summary: "Python(파이썬)은 자료를 반복해서 정리하는 자동 처리 역할을 합니다.",
    presenter:
      "코드 한 줄씩 보여 줄 필요는 없습니다. ‘8번의 체크리스트’로 이해시키고, 실제로는 한 줄 명령으로 묶였다고 말하세요.",
  },
  {
    eyebrow: "6장 · 지도",
    title: "웹 지도 구현 — HTML, CSS, JavaScript",
    lead: "브라우저에서 돌아가는 세 가지 재료가 있습니다.",
    body: `
      <table class="term-table">
        <tr><th>HTML</th><td>뼈대(마크업) — 지도가 들어갈 상자, 목록, 버튼</td></tr>
        <tr><th>CSS</th><td>옷(스타일) — 색, 크기, 모바일 화면 맞춤</td></tr>
        <tr><th>JavaScript</th><td>움직임(동작) — 핀 찍기, 클릭, 정렬</td></tr>
      </table>
      <ul class="bullet-list">
        <li>지도 엔진: <strong>Leaflet</strong>(리플릿, 오픈소스) + 필요 시 카카오 지도</li>
        <li>데이터 파일 <span class="code-chip">restaurants.map.json</span>을 읽어 마커를 표시합니다</li>
        <li>로컬 미리보기: <span class="code-chip">bash ~/hermes-restaurant-open.sh</span></li>
      </ul>
    `,
    summary: "HTML + CSS + JavaScript가 JSON을 읽어 지도를 만듭니다.",
    presenter:
      "고학년 아이에게는 ‘레고 설명서(HTML), 색칠(CSS), 손으로 움직이기(JS)’ 비유가 좋습니다. 학부모에게는 서버 없이 정적 웹으로 비용을 줄였다고 설명할 수 있습니다.",
  },
  {
    eyebrow: "7장 · 디자인 규칙",
    title: "지도 표시 정책 — 마커, 티어, 필터",
    lead: "모든 식당을 다 찍지 않습니다. 보기 좋고 정확하게 골라 표시합니다.",
    body: `
      <ul class="bullet-list">
        <li><strong>10회 이상</strong> 방문한 곳만 지도에 표시합니다</li>
        <li>방문 순위에 따라 <strong>1~5티어</strong> 물방울 색 (1위권일수록 눈에 띕니다)</li>
        <li>40m 안에 2곳 이상 → <strong>「단골 밀집」</strong> 무지개 마커</li>
        <li>편의점·마트만 있는 곳, 폐업 추정 곳은 <strong>제외</strong>합니다</li>
      </ul>
      <div class="callout callout--tip">
        <span class="callout__label">왜 규칙이 필요할까요?</span>
        데이터가 많아도, 지도는 <strong>읽기 쉬워야</strong> 하고 <strong>잘못된 핀</strong>은 줄여야 합니다.
      </div>
    `,
    summary: "규칙은 보여 줄 것과 숨길 것을 미리 정하는 것입니다.",
    presenter:
      "게임 랭킹·레벨 시스템에 비유하면 아이들이 바로 이해합니다. 학부모에게는 품질 필터가 신뢰도와 직결된다고 말하세요.",
  },
  {
    eyebrow: "8장 · AI",
    title: "AI 활용 — 문서, 코드, 자동화 지원",
    lead: "AI는 대신 다 해 주는 마법이 아니라, 함께 일하는 조수입니다.",
    body: `
      <ul class="bullet-list">
        <li><strong>문서 정리</strong> — 긴 개발 기록을 운영 매뉴얼·체크리스트로</li>
        <li><strong>버그 수정</strong> — 지도가 안 뜨는 문제, 좌표 빈 곳 찾기</li>
        <li><strong>자동화 스크립트</strong> — <span class="code-chip">hermes-restaurant-*.sh</span> 로 한 줄 실행</li>
        <li><strong>반복 작업</strong> — 월간 데이터 갱신 절차를 기억해 두고 실행</li>
      </ul>
      <div class="callout callout--parent">
        <span class="callout__label">학부모·아이에게</span>
        방향(무엇을 만들지)은 <strong>사람</strong>이 정하고, AI는 글쓰기·코드·검색을 <strong>빠르게</strong> 돕습니다.
      </div>
    `,
    summary: "AI는 방향은 사람, 실행 보조는 AI입니다.",
    presenter:
      "AI에 대한 과장된 기대를 낮추고, 실제로 도움이 된 구체 사례(좌표 보강, 배포 수정)만 짚어 주세요.",
  },
  {
    eyebrow: "9장 · 자동화",
    title: "셸 스크립트 자동화 — 월간 갱신",
    lead: "같은 일을 사람이 매번 손으로 하면 실수하기 쉽습니다.",
    body: `
      <ul class="bullet-list">
        <li><span class="code-chip">hermes-restaurant-fetch.sh</span> — 새 자료 수집</li>
        <li><span class="code-chip">hermes-restaurant-update.sh</span> — 수집·가공·웹 반영</li>
        <li><span class="code-chip">hermes-restaurant-update.sh --deploy</span> — + 인터넷에 배포</li>
      </ul>
      <div class="callout callout--ok">
        <span class="callout__label">비유</span>
        세탁기 버튼 하나 — 넣기(수집) → 돌리기(가공) → 널기(배포)가 한 번에 이어집니다.
      </div>
      <p class="slide-lead" style="margin-top:0.5rem"><strong>셸 스크립트</strong>(shell script)는 터미널 명령을 모아 둔 「자동 실행 버튼」입니다.</p>
    `,
    summary: "셸 스크립트는 자주 하는 일을 버튼 하나로 묶습니다.",
    presenter:
      "터미널 화면을 실제로 보여 줄 계획이면, 미리 로컬에서 한 번 돌려 두세요. 강의 중에는 --deploy 없이 로컬만 보여 주는 것도 방법입니다.",
  },
  {
    eyebrow: "10장 · 배포",
    title: "정적 배포 — GitHub Pages",
    lead: "완성된 <code>web/</code> 폴더만 올려서 무료로 웹사이트를 운영합니다.",
    body: `
      <ul class="bullet-list">
        <li>저장소: <span class="code-chip">Jdragon712/sejong-official-restaurant-map</span></li>
        <li>공개 주소: 아래 마지막 장에서 함께 엽니다</li>
        <li>올리지 않는 것: API(애플리케이션 프로그래밍 인터페이스) 키, 원본 raw, 금액 데이터</li>
      </ul>
      <div class="callout callout--tip">
        <span class="callout__label">로컬 vs 인터넷</span>
        내 컴퓨터에서만 보면 <strong>127.0.0.1</strong>, <strong>GitHub Pages</strong>(깃허브 페이지)에 올리면 <strong>누구나 URL로</strong> 접속합니다.
      </div>
      <p class="slide-lead" style="margin-top:0.5rem"><strong>Git</strong>(깃)은 버전이 있는 클라우드 폴더로 이해하면 충분합니다.</p>
    `,
    summary: "배포는 정리된 web 폴더를 GitHub에 올리는 것입니다.",
    presenter:
      "Git 개념은 ‘버전이 있는 클라우드 폴더’ 정도로만 설명해도 충분합니다. 이 강의 슬라이드도 같은 방식으로 GitHub에 올릴 예정임을 알려 주세요.",
  },
  {
    eyebrow: "11장 · 약속",
    title: "서비스 원칙 — 면책, 출처, 비평가",
    lead: "공공데이터 서비스는 재미만큼 책임도 중요합니다.",
    body: `
      <ul class="bullet-list">
        <li>맛집 <strong>추천·평가</strong>가 아니라 <strong>방문 집계 사실</strong>만 표시합니다</li>
        <li>금액·총액·직급 비교는 공개 UI에 넣지 않습니다</li>
        <li>데이터 기준일·출처를 화면 아래에 표시합니다</li>
        <li>잘못된 매칭은 지속적으로 수정합니다</li>
      </ul>
    `,
    summary: "신뢰는 투명한 출처 + 최소 공개 + 비평가입니다.",
    presenter:
      "아이들에게 ‘출처 밝히기’는 과학 실험 보고서와 같다고 말해 보세요. 학부모에게는 서비스 지속 가능성·법적 리스크 관리 포인트입니다.",
  },
  {
    eyebrow: "12장 · 퀴즈",
    title: "이해 확인 퀴즈",
    lead: "방금 배운 내용을 한 문제로 확인해 봅니다.",
    body: `
      <p><strong>Q.</strong> 단골 식당 지도에 식당별 <em>총 사용 금액</em>을 공개해도 될까요?</p>
      <div class="quiz-options" data-quiz="money">
        <button type="button" class="quiz-btn" data-answer="no">① 안 됩니다 — 오해와 논란이 생길 수 있습니다</button>
        <button type="button" class="quiz-btn" data-answer="yes">② 됩니다 — 공개 자료니까 다 보여 줘도 됩니다</button>
      </div>
      <p id="quiz-feedback-money" class="quiz-feedback"></p>
    `,
    summary: "정답: ① — 우리 서비스는 횟수만 공개합니다.",
    presenter:
      "아이들에게 먼저 손 들어 보게 하세요. 정답 후 ‘왜 ②가 위험한지’ 30초만 설명하고 넘어갑니다.",
  },
  {
    eyebrow: "13장 · 마무리",
    title: "완성 지도 데모 — 공개 URL 열기",
    lead: "강의의 마지막 — 완성된 세종 공직자 단골 식당 지도입니다.",
    body: `
      <div class="final-actions">
        <p>아래 버튼을 누르면 새 탭에서 지도가 열립니다. 함께 다음을 찾아 보세요.</p>
        <ul class="bullet-list">
          <li>물방울 색이 다른 마커 (티어)</li>
          <li>왼쪽 식당 목록 (드로어)</li>
          <li>화면 아래 출처·면책 문구</li>
        </ul>
        <a
          id="btn-open-map"
          class="btn-primary btn-primary--large"
          href="https://jdragon712.github.io/sejong-official-restaurant-map/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🗺️ 단골 식당 지도 열기
        </a>
        <p class="slide-lead">이 강의 슬라이드도 GitHub에 올려, 같은 링크로 공유할 예정입니다.</p>
      </div>
    `,
    summary: "만든 여정의 끝은 실제로 동작하는 지도입니다.",
    presenter:
      "전체 화면(F11)으로 지도를 보여 주세요. 미리 열어 두었다가 전환해도 좋습니다. Q&A 시간을 5~10분 잡으세요. 감사 인사와 함께 슬라이드 GitHub 링크를 안내합니다.",
  },
];

window.TUTORIAL_MAP_URL = "https://jdragon712.github.io/sejong-official-restaurant-map/";