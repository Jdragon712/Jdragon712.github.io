(() => {
  "use strict";

  const FILES = [
    { name: "신청원인.pdf", kind: "PDF", group: "claim", src: "assets/demo/claim.jpg" },
    { name: "피신청인의_주장.png", kind: "이미지", group: "agency", src: "assets/demo/agency.jpg" },
    { name: "01_일반건축물대장.png", kind: "이미지", group: "facts", src: "assets/demo/ledger.jpg" },
    { name: "02_토지대장.png", kind: "이미지", group: "facts", src: "assets/demo/land.jpg" },
    { name: "03_그림1_이_민원_건물.png", kind: "이미지", group: "facts", src: "assets/demo/building.jpg" },
    { name: "05_그림2_현장사진_1.png", kind: "이미지", group: "facts", src: "assets/demo/site1.jpg" },
    { name: "07_그림3_방음벽_횡단면도.png", kind: "이미지", group: "facts", src: "assets/demo/wall.jpg" },
    { name: "10_그림4_현장조사_사진.png", kind: "이미지", group: "facts", src: "assets/demo/survey.jpg" },
    { name: "11_그림5_현장사진_및_지도.png", kind: "이미지", group: "facts", src: "assets/demo/map.jpg" },
    { name: "04_건축신고_수리현황.png", kind: "이미지", group: "facts", src: "assets/demo/facts.jpg" },
    { name: "06_그림2_현장사진_2.png", kind: "이미지", group: "facts", src: "assets/demo/site1.jpg" },
    { name: "08_건축신고사항_변경.png", kind: "이미지", group: "facts", src: "assets/demo/facts.jpg" },
    { name: "09_증축신고_주요사항.png", kind: "이미지", group: "facts", src: "assets/demo/facts.jpg" },
  ];

  const JOBS = [
    "신청원인.pdf에서 구하는 바를 읽습니다",
    "피신청인 주장·회신 이미지를 읽습니다",
    "대장·현장사진 11장을 확인합니다",
    "건축법·보상법 조문을 맞춰 봅니다",
    "시정권고와 의견표명 중 가까운 쪽을 고릅니다",
  ];

  const el = document.getElementById("demo");
  const body = document.getElementById("demo-body");
  const nav = document.getElementById("demo-nav");
  if (!el || !body) return;

  let step = 0;
  let timers = [];
  let kit = "uigeol";
  let meterTimer = 0;
  let peekOpen = false;

  const KITS = {
    uigeol: {
      title: "예시 시연",
      sub: "신설도로에 의한 주거환경 피해 구제 요구",
      nav: ["열쇠", "자료", "분석", "검토", "초안"],
      crumbs: [
        "1 안내  →  <b>2 열쇠</b>  →  3 작성",
        "1 안내  →  2 열쇠  →  <b>3 작성</b>",
        "1 안내  →  2 열쇠  →  <b>3 작성</b>",
        "<b>내용 검토</b>",
        "<b>의결서 초안</b>",
      ],
      lastHint: "아래로 스크롤해 초안을 확인하세요",
    },
    dallyeo: {
      title: "예시 시연",
      sub: "달리는 국민신문고",
      nav: ["소개", "사연접수", "관리자"],
      crumbs: ["<b>소개 · 사례</b>", "<b>사연 접수</b>", "<b>관리자</b>"],
      lastHint: "관리자 화면을 확인하세요",
    },
  };

  const isOpen = () => !el.hasAttribute("hidden");

  const clearTimers = () => {
    timers.forEach((id) => clearTimeout(id));
    timers = [];
    clearInterval(meterTimer);
    meterTimer = 0;
  };

  const later = (ms, fn) => {
    const id = window.setTimeout(fn, ms);
    timers.push(id);
    return id;
  };

  const fileChip = (file, i) => {
    const delay = 90 + i * 90;
    return (
      '<button type="button" class="demo-file" data-src="' +
      file.src +
      '" data-name="' +
      file.name +
      '" style="animation-delay:' +
      delay +
      'ms">' +
      (file.src
        ? '<img src="' + file.src + '" alt="">'
        : '<span class="demo-ico">' + file.kind + "</span>") +
      "<div><b>" +
      file.name +
      "</b><span>" +
      file.kind +
      " · 클릭하면 원문을 봅니다</span></div><em>삭제</em></button>"
    );
  };

  const filesOf = (group) =>
    FILES.filter((f) => f.group === group)
      .map((f, i) => fileChip(f, i))
      .join("");

  const html = () =>
    '<article class="demo-app">' +
    '<header class="demo-head">' +
    "  <h1>고충민원 의결서 초안 생성기</h1>" +
    "  <p>국민권익위원회 고충민원 의결서 형식의 초안을 만듭니다.</p>" +
    "</header>" +
    '<p class="demo-crumbs" id="demo-crumbs"></p>' +
    '<section class="demo-panel" data-panel="0">' +
    '  <div class="demo-card">' +
    "    <h2>인공지능 열쇠 연결</h2>" +
    "    <p class=\"demo-hint\" style=\"margin:0 0 14px;font-size:14px;color:#6b7280\">웹은 열쇠만 받고, 분석은 각자 쓰는 AI가 합니다. 민원 내용은 서버에 저장하지 않습니다.</p>" +
    '    <div class="demo-key-row"><span class="demo-key-name">그록</span><span class="demo-key-dots">••••••••••••••••</span><span class="demo-ok">확인</span></div>' +
    '    <div class="demo-key-row"><span class="demo-key-name">제미나이</span><span class="demo-key-dots">••••••••••••••••</span><span class="demo-ok">확인</span></div>' +
    '    <div class="demo-key-row"><span class="demo-key-name">딥시크</span><span class="demo-key-dots">••••••••••••••••</span><span class="demo-ok">확인</span></div>' +
    '    <div class="demo-key-row"><span class="demo-key-name">오픈라우터</span><span class="demo-key-dots">••••••••••••••••</span><span class="demo-ok">확인</span></div>' +
    '    <div class="demo-actions"><button type="button" class="demo-btn" data-next>다음 · 자료 넣기</button></div>' +
    "  </div>" +
    "</section>" +
    '<section class="demo-panel" data-panel="1">' +
    '  <p class="demo-status">연결됨 · 그록 · grok-4.6 하나로 검토와 작성을 합니다.</p>' +
    '  <div class="demo-card">' +
    "    <h2>당사자</h2>" +
    '    <label class="demo-label">피신청인</label><div class="demo-field" >세명시장</div>' +
    '    <label class="demo-label">신청인</label><div class="demo-field">박길동</div>' +
    "  </div>" +
    '  <div class="demo-card">' +
    '    <div class="demo-block-head"><h3>1. 신청원인</h3><span class="demo-pill">파일 첨부</span></div>' +
    '    <p class="demo-note" >신청인은 2018. 5. 2. 대 987㎡ 외 1필지에 건축신고를 하고 2개 동을 지었습니다. 피신청인이 2020. 8. 3. 2차선 국도를 이 민원 토지 바로 앞으로 착공해 2025. 12. 개통하였고, 도로가 건물과 5m도 안 되게 가깝고 방음벽으로 조망·일조가 막히며 소음·진동·침수 피해가 있으니 정당한 보상을 구합니다.</p>' +
    '    <div class="demo-files">' +
    filesOf("claim") +
    "    </div>" +
    "  </div>" +
    '  <div class="demo-card">' +
    '    <div class="demo-block-head"><h3>2. 피신청인의 주장</h3><span class="demo-pill">파일 첨부</span></div>' +
    '    <p class="demo-note">소규모환경영향평가 야간 소음 56.6dB(기준 55dB)에 따라 투명형 방음벽을 계획하였고, 신청인 요청을 수용해 길이를 90m에서 36m로 줄여 설치하였습니다. 일조 피해는 건축법 제61조·시행령 제86조에 저촉되지 않으며, 공익사업 손실보상 대상이 아니어서 별도 보상은 불가하다고 주장합니다.</p>' +
    '    <div class="demo-files">' +
    filesOf("agency") +
    "    </div>" +
    "  </div>" +
    '  <div class="demo-card">' +
    '    <div class="demo-block-head"><h3>3. 사실관계</h3><span class="demo-pill">파일 첨부</span></div>' +
    '    <p class="demo-note">가. 이 민원 건물(부1)은 지1층·1층 일반창고 각 94.01㎡입니다.<br>나. 피신청인은 2020. 8. 3. 착공, 2025. 12. 준공·개통하였습니다.<br>다. 위원회 조사관은 2026. 4. 15. 현장조사를 하였습니다.<br>라. 방음벽은 당초 90m 계획에서 36m로 조정되어 설치되었습니다.</p>' +
    '    <div class="demo-files">' +
    filesOf("facts") +
    "    </div>" +
    "  </div>" +
    '  <div class="demo-actions">' +
    '    <button type="button" class="demo-btn" data-next>내용 검토</button>' +
    '    <button type="button" class="demo-btn ghost" data-goto-step="0">입력 비우기</button>' +
    "  </div>" +
    "</section>" +
    '<section class="demo-panel" data-panel="2">' +
    '  <div class="demo-analyze">' +
    '    <div class="demo-spinner" aria-hidden="true"></div>' +
    "    <h2>연결된 AI가 자료를 읽고 있습니다</h2>" +
    "    <p>그록이 PDF·이미지에서 당사자, 주장, 현장 사실을 뽑아 법령과 맞춥니다.</p>" +
    '    <div class="demo-meter"><i id="demo-meter"></i></div>' +
    '    <ol class="demo-jobs" id="demo-jobs">' +
    JOBS.map((t) => "<li><i></i><span>" + t + "</span></li>").join("") +
    "    </ol>" +
    '    <button type="button" class="demo-btn" data-next id="demo-analyze-next" hidden style="margin-top:22px">검토 결과 보기</button>' +
    "  </div>" +
    "</section>" +
    '<section class="demo-panel" data-panel="3">' +
    '  <div class="demo-rec">' +
    "    <h2>추천: 의견표명 · 보통</h2>" +
    '    <p class="lead">국도 신설은 공익사업으로 보이나, 기존 건축물과 근접 시공·방음벽으로 주거환경이 크게 나빠진 점은 상당한 이유가 있어 의견표명이 가깝습니다.</p>' +
    "    <h3>피신청인 처분: 현행 법령·지침에 어긋난다고 보기 어려움</h3>" +
    "    <p>도로 개설·방음벽 설치 자체는 관련 법령·환경영향평가 절차를 거친 것으로 보이며, 건축법상 일조 규정 위반으로 단정하기는 어렵습니다. 다만 동의 범위와 생활 피해는 별도로 살펴볼 여지가 있습니다.</p>" +
    "    <p>위법한 처분을 특정하기 어려워 시정권고보다는, 신청인의 주거환경 피해가 가혹한 사정에 해당하는 의견표명이 상당합니다.</p>" +
    "    <ul>" +
    "      <li>도로와 건물 이격·일조 · 건축법 제61조, 시행령 제86조 · 위반으로 보기 어려움</li>" +
    "      <li>손실보상 해당 여부 · 공익사업을 위한 토지 등의 취득 및 보상에 관한 법률 · 토지 수용 없이 인접 피해만 있는 경우 대상인지 다툼</li>" +
    "      <li>방음벽 동의 범위 · 90m에서 36m로 단축 · 동의의 범위 안인지 불명</li>" +
    "    </ul>" +
    "    <p style=\"margin-top:12px\">법령 후보: 부패방지권익위법 제46조 제2항, 건축법 제61조, 공익사업을 위한 토지 등의 취득 및 보상에 관한 법률</p>" +
    "    <p>더 볼 자료: 방음벽 동의서 원문, 소음 측정 자료</p>" +
    '    <p class="demo-hint">추천일 뿐 공식 결정이 아닙니다. 확인한 뒤 유형을 고르면 그 유형으로 의결서를 씁니다.</p>' +
    '    <div class="demo-types">' +
    '      <button type="button" class="demo-type"><b>시정권고</b><span>부패방지권익위법 제46조 제1항 · 처분 등이 위법·부당하다고 인정할 만한 상당한 이유가 있는 경우</span></button>' +
    '      <button type="button" class="demo-type is-on"><b>의견표명 · 추천</b><span>부패방지권익위법 제46조 제2항 · 신청인의 주장이 상당한 이유가 있다고 인정되는 사안</span></button>' +
    "    </div>" +
    '    <p class="demo-progress-label">100% 초안이 준비되었습니다. 내용을 검토한 뒤 내려받으세요.</p>' +
    '    <button type="button" class="demo-btn" data-next>의견표명 초안 만들기</button>' +
    "  </div>" +
    "</section>" +
    '<section class="demo-panel" data-panel="4">' +
    '  <div class="demo-actions" style="margin:0 0 14px;justify-content:flex-end">' +
    '    <span class="demo-pill" style="background:#eef2ff;color:#4f6fff">복사</span>' +
    '    <span class="demo-pill" style="background:#eef2ff;color:#4f6fff">텍스트</span>' +
    '    <span class="demo-pill">워드</span>' +
    "  </div>" +
    '  <article class="demo-draft">' +
    '    <div class="org">국민권익위원회</div>' +
    '    <div class="doc-name">의결서</div>' +
    '    <div class="kv">' +
    "      <b>의안번호</b><span></span>" +
    "      <b>민원표시</b><span></span>" +
    "      <b>의결일</b><span></span>" +
    "      <b>신청인</b><span>박길동</span>" +
    "      <b>피신청인</b><span>세명시장</span>" +
    "    </div>" +
    '    <div class="sec">주문</div>' +
    "    <p>피신청인에게, 신청인 소유의 대 987㎡ 외 1필지에 위치한 부1 건축물에 대하여 신설 2차선 국도로 인한 주거환경 피해를 조사하고 정당한 보상 또는 이에 상응하는 구제방안을 마련할 것을 의견표명한다.</p>" +
    '    <div class="sec">이유</div>' +
    '    <div class="sec sub">1. 신청원인</div>' +
    "    <p>신청인은 다음과 같이 주장한다.</p>" +
    "    <p>① 신청인은 2018. 5. 2. 000번지 대 987㎡ 및 같은 리 000번지 전 193㎡(이하 ‘이 민원 토지’라 한다)에 건축신고(신축)를 하고 주1·부1 2개 동의 건축물을 건축하였다.</p>" +
    "    <p>② 피신청인은 2020. 8. 3. 2차선 국도(이하 ‘이 민원 도로’라 한다)를 이 민원 토지 바로 앞을 통과하는 노선으로 착공하여 2025. 12. 19. 개통하였다.</p>" +
    "    <p>③ 이 민원 도로가 이미 건축된 부1 건축물(이하 ‘이 민원 건물’이라 한다)과 5m도 안 될 정도로 가깝게 시공되어 이 민원 건물은 도로 아래로 함몰된 형태가 되었고, 방음벽을 설치하였으나 조망과 일조가 심하게 차단되었으며, 차량 소음과 진동으로 온전한 기능을 하지 못하게 되었다.</p>" +
    "    <p>④ 신청인의 2024. 11. 11.자 동의서는 집 앞 도로 옹벽에 방음벽 공사를 한다는 설명을 듣고, 특정 구간에만 방음벽을 설치하고 나머지 구간은 불필요하다는 취지로 작성한 것이다. 신청인은 옹벽이 주차장 바닥 높이 정도에서 마무리될 것으로 이해하였고, 도로와 이 민원 건물의 높낮이, 이 민원 건물이 도로 아래로 보이는 현재의 모습 및 옹벽·방음벽으로 둘러싸여 조망·일조·개방감이 심각하게 침해되는 결과까지를 포괄적으로 승낙한 것은 아니었다.</p>" +
    "    <p>⑤ 준공 후 도로와의 간격이 5m도 안 되고, 주차장 앞은 차를 돌릴 수 없을 만큼 협소하며, 폭우 시 주변 우수가 흘러들어와 침수 가능성이 크고 실제로 물이 차기도 하였다. 방음벽은 전망과 바람만 막을 뿐 소음 차단 효과도 별로 없고, 공익사업 이전에 누리던 쾌적한 환경을 더 이상 누리지 못하므로 이 민원 건물에 대하여 정당한 보상을 해 줄 것을 구한다.</p>" +
    '    <div class="sec sub">2. 피신청인의 주장</div>' +
    "    <p>피신청인은 다음과 같이 주장한다.</p>" +
    "    <p>설계 시 소규모환경영향평가에서 이 민원 토지에 존재한 신축 전 가옥에 대한 교통 소음도가 야간에 56.6dB(기준 55dB)로 나와, 일조권 침해가 예상되는 지역에 설치하는 투명형 방음벽을 계획하였는데, 실제 신청인 요청사항을 수용하여 길이를 당초 90m에서 36m로 조정하여 설치하였다. 신청인이 주장하는 일조 등의 피해와 관련, 「건축법」 제61조 및 같은 법 시행령 제86조(일조 등의 확보를 위한 건축물의 높이 제한)의 규정에 저촉되지 않은 것으로 확인되며, 공익사업으로 인한 손실보상의 대상에 해당하지 않아 별도의 보상은 불가한 것으로 판단된다. 이 민원 건물 주변 도로에 투명방음벽 설치를 완료하였고, 이 민원 도로는 2025. 12. 준공하였다.</p>" +
    '    <div class="sec sub">3. 사실관계</div>' +
    "    <p>가. 신청인은 2018. 5. 2. 이 민원 토지(대 987㎡ 및 전 193㎡)에 건축신고(신축)를 하고 주1·부1 2개 동의 건축물을 건축하였다. 대 987㎡는 2023. 6. 11. 행정구역명칭변경이 있었고, 전 193㎡는 2024. 3. 8. 분할되어 본번에 -10, -11이 부합되었으며, 소유권 이전 등은 2024. 9. 13. 주소정정이 있다.</p>" +
    "    <p>나. 피신청인은 2020. 8. 3. 이 민원 도로를 이 민원 토지 바로 앞을 통과하는 노선으로 착공하였다. 소규모환경영향평가에서 신축 전 가옥에 대한 야간 교통 소음도가 56.6dB(기준 55dB)로 산정되어 투명형 방음벽이 계획되었고, 신청인 요청을 반영하여 방음벽 길이는 당초 90m에서 36m로 조정되어 설치되었다.</p>" +
    "    <p>다. 신청인은 2024. 11. 11. 집 앞 도로 옹벽에 대한 방음벽 공사와 관련하여 동의서를 작성하였다. 신청인은 특정 구간에만 방음벽을 설치하고 나머지는 불필요하다는 취지였고, 옹벽이 주차장 바닥 높이 정도에서 마무리될 것으로 이해하였다고 한다. 이 민원 도로는 2025. 12. 19. 개통·준공되었다.</p>" +
    "    <p>라. 제출된 단면도에 의하면 이 민원 건물과 도로 간 이격거리는 단면상에서 4.888m, 다른 단면도에서 3.476m이고, 방음벽 높이 등이 표시되어 있다. 현장 사진은 이 민원 건물이 도로면보다 낮게 위치하여 방음벽에 둘러싸인 형태이며, 주차장 전면은 협소하고, 우수 유입이 의심되는 배수 구조에 물이 고인 흔적이 확인된다.</p>" +
    "    <p>마. 피신청인은 일조 피해가 「건축법」 제61조 및 같은 법 시행령 제86조에 저촉되지 않고, 공익사업 손실보상 대상이 아니라 별도의 보상은 불가하다고 주장한다.</p>" +
    '    <div class="sec sub">4. 판단</div>' +
    "    <p><b>가. 관계법령</b></p>" +
    "    <p>「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」 제46조는 고충민원을, 같은 조 제2항은 신청인의 주장이 상당한 이유가 있다고 인정되는 경우 관계 행정기관의 장에게 의견을 표명할 수 있음을 규정한다.</p>" +
    "    <p>「공익사업을 위한 토지 등의 취득 및 보상에 관한 법률」(이하 ‘토지보상법’) 제2조, 제3조, 제73조, 제74조, 제75조, 제75조의2, 제79조는 공익사업으로 인한 손실의 정당한 보상, 잔여지의 가격 감액, 공사 손실 보상, 이전비·수선 보상, 간접손실 및 물건에 대한 손실보상, 영업손실 등 통상 손실의 보상을 정한다. 같은 법 시행규칙 제33조, 제47조 등은 손실 전보의 대가, 이전비, 이주대책 등 산정 기준을 둔다.</p>" +
    "    <p>「도로법」 제2조, 제10조, 제23조, 제76조 등은 도로의 종류·관리청·공사 시행 및 손실보상을 정한다. 「소음·진동관리법」 제2조, 제21조, 제26조 및 같은 법 시행규칙의 생활소음·진동 규제기준, 「환경정책기본법」은 도로교통 소음의 관리 의무를 정한다. 「건축법」 제61조 및 같은 법 시행령 제86조는 일조 등의 확보를 위한 건축물의 높이 제한을 정하나, 이는 인접 대지에 건축하는 건축물에 적용되는 규정이다.</p>" +
    "    <p>「민법」 제110조, 제750조는 착오·사기에 의한 의사표시의 취소와 불법행위를, 「행정절차법」 제4조, 제21조는 신의성실과 처분의 사전통지·의견제출을 정한다. 「환경영향평가법」상 소규모환경영향평가는 사업으로 인한 환경영향을 미리 조사·예측하고 저감대책을 마련할 것을 요구한다.</p>" +
    "    <p><b>나. 이 사건 검토</b></p>" +
    "    <p>먼저, 신청인이 이 민원 건물에 대한 정당한 보상을 해 줄 것을 구하는 신청에 대하여 살펴보면, 이 민원 건물은 이 민원 도로 착공(2020. 8. 3.) 이전인 2018. 5. 2. 적법한 건축신고에 따라 신축된 건축물이다. 토지보상법상 수용 대상이 아닌 인접 토지·건축물에 대하여도 가격 감소나 잔여지 제한 등 특수한 손실이 있으면 보상하도록 하고, 도로법 역시 도로공사에 대한 손실보상을 예정한다.</p>" +
    "    <p>다만, 피신청인은 손실보상 대상이 아니라고 하여 보상을 일률적으로 거부하였고, 이 민원 토지·건물이 수용되지 않았다는 점만으로 잔여지 가치 하락·사용 제한·배수 불량 등 통상 손실·간접손실을 개별적으로 심사하였는지는 나타나지 않는다. 수용 여부가 확인되지 않더라도 기존 건축물이 도로 구조물에 3.476m~4.888m까지 근접하고 도면의 여건상 주차장 회전이 곤란하며 우수 유입·침수 흔적이 있는 사정은, 잔여 건축물의 효용 감소로서 토지보상법상 손실 해당 여부를 구체적으로 조사할 상당한 이유가 된다.</p>" +
    "    <p>다음으로 2024. 11. 11.자 동의서의 효력·범위와 관련하여 보면, 신청인은 방음벽이 특정 구간 설치에 관한 설명만을 듣고 동의하였고, 옹벽이 주차장 바닥 높이에서 끝날 것으로 이해하였으며, 도로와 건물의 고저·함몰·조망·일조·개방감 침해까지 포괄 승낙한 것은 아니라고 한다. 피신청인이 신청인 요청을 받아 방음벽 길이를 90m에서 36m로 줄인 사실 자체는, 오히려 동의의 대상이 방음벽 구간 길이였음을 뒷받침한다. 「민법」상 착오 또는 그 내용이 특정되어 있고, 행정청이 중요한 공사 변경을 하면서 그 결과를 구체적으로 고지하지 않은 채 받은 동의는, 설명 범위 밖의 불이익까지 면책하는 포괄 포기로 보기 어렵다. 따라서 동의서를 이유로 일체의 보상·구제를 거절하는 것은 신청인에게 지나치게 가혹하다.</p>" +
    "    <p>일조·조망·소음·진동 등에 관하여, 피신청인은 「건축법」 제61조 및 시행령 제86조에 저촉되지 않는다고 한다. 위 규정은 인접 대지에 건축하는 건축물의 높이 제한이지 도로 신설에 직접 적용되는 규정이 아니므로, 일조 피해가 건축법상 위법이라고 단정하기는 어렵다. 소규모환경영향평가상 야간 소음 56.6dB가 기준 55dB을 초과하여 방음벽이 계획된 것이다. 신청인은 방음벽이 전망과 바람만 막을 뿐 소음 차단 효과가 없다고 한다. 이격 5m 이내, 함몰, 방음벽 효과, 침수는 측정·설계로 입증되어야 하나, 제출된 단면·사진은 이격 3.476m~4.888m로 도면과도 불일치하고 주차장·배수 불량이 이미 보이므로, 「소음·진동관리법」 및 환경정책기본법상 도로소음을 저감할 의무는 방음벽 설치로 종결되는 것이 아니라, 실제 수용 환경에서 기존 주거·창고 기능을 유지하는 것을 뜻한다.</p>" +
    "    <p>피신청인 측의 소규모환경영향평가·방음벽 조정·토지보상 비대상 주장은 이 사건 일부와 관련되나 요건을 충족하였다고 보기 어렵다. 환경평가는 신축 전 가옥을 대상으로 한 예측이고 현 건축의 대지·이용 환경을 충분히 반영하지 못한 점이 인정되며, 방음벽은 주거 환경의 유지를 해소하지 못하고, 건축법 일조 규정은 도로 구조물에 적용되지 않으며, 토지보상법 비대상 주장은 건축물·잔여지·물건·생활손실을 개별 심사하지 않은 채 일률 배제한 조치라 할 것이다. 고충민원 재결이 곧바로 항고소송의 대상이 되지 않는다는 법리(대법원 2016. 7. 14. 선고 2016두36396 판결 등)는 이 위원회가 의견표명을 하는 데 장애가 되지 않는다.</p>" +
    "    <p>이상을 종합하면, 이 민원 도로 공사 자체에 대한 위법성을 이 자료만으로 단정하기는 어려우나, 기존 건축물을 도로 아래로 함몰시키고 3m대 이격의 옹벽·방음벽으로 둘러싼 체감 범위는 신청인에게 지나치게 가혹하다. 피신청인으로서는 이격·표고·소음·진동·배수·잔여 건축물 효용을 조사하고, 토지보상법상 잔여지·물건·생활손실 해당 여부를 따져 도로법상 손실보상, 방음·침수 저감 효과 등 추가한 구제방안을 마련함이 상당하다.</p>" +
    '    <div class="sec sub">5. 결론</div>' +
    "    <p>그러므로 이 민원 건물에 대하여 정당한 보상을 하여 줄 것을 구하는 신청인의 주장이 상당한 이유가 있다고 인정되므로 「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」 제46조 제2항에 따라 피신청인에게 의견을 표명하기로 하여 주문과 같이 의결한다.</p>" +
    '    <p class="demo-hint">이 산출물은 인공지능 초안이며 국민권익위원회 공식 의결이 아닙니다.</p>' +
    "  </article>" +
    '  <section class="demo-card" style="margin-top:16px">' +
    "    <h2>참고한 자료</h2>" +
    "    <p>공개된 유사 고충 의결·행정심판 재결·판결을 찾아 보여 줍니다. 고충 의결 공개본이 적으면 재결·판결이 더 많이 나옵니다.</p>" +
    "    <h3>고충민원 의결 (0)</h3>" +
    '    <p class="demo-hint">비슷한 공개 고충 의결을 찾지 못했습니다.</p>' +
    "    <h3>행정심판 재결 (8)</h3>" +
    '    <div class="demo-file" style="opacity:1;transform:none;cursor:default"><div><b>행정심판청구의전자민원접수거부등록신청구</b><span>국민권익위원회 · 2003-09470 · 2003.12.15</span></div></div>' +
    '    <div class="demo-file" style="opacity:1;transform:none;cursor:default;margin-top:8px"><div><b>행정심판 각하재결 무효확인청구</b><span>국민권익위원회 · 2025-15202 · 2025.11.11</span></div></div>' +
    '    <div class="demo-file" style="opacity:1;transform:none;cursor:default;margin-top:8px"><div><b>행정심판 재결 이행청구</b><span>국민권익위원회 · 2025-11110 · 2025.11.11</span></div></div>' +
    "  </section>" +
    "</section>" +
    '<div class="demo-peek" id="demo-peek" hidden>' +
    "  <figure>" +
    '    <img id="demo-peek-img" alt="">' +
    "    <figcaption><span id=\"demo-peek-cap\"></span><button type=\"button\" class=\"demo-x\" id=\"demo-peek-x\">닫기</button></figcaption>" +
    "  </figure>" +
    "</div>" +
    "</article>";

  const htmlDallyeo = () =>
    '<article class="demo-app dly-app">' +
    '  <header class="dly-top">' +
    '    <p class="dly-brand">달리는 국민신문고</p>' +
    '    <p class="dly-brand-sub">청년들의 고충민원 사연 제보</p>' +
    "  </header>" +
    '  <p class="demo-crumbs" id="demo-crumbs"></p>' +
    '  <section class="demo-panel" data-panel="0">' +
    '    <div class="dly-home">' +
    '      <div class="dly-hero-copy"><h2>청년이 <em>원(願)</em>하면<br>달려갑니다!</h2></div>' +
    '      <div class="dly-about">' +
    '        <p class="dly-about-label">달리는 국민신문고란</p>' +
    "        <p>국민권익위원회의 권익구제 서비스를 모르거나 활용이 어려운 소외지역 및 취약계층 등을 직접 찾아가 현장에서 고충을 청취하고 해소하는 찾아가는 현장 권익구제 서비스입니다.</p>" +
    '        <p>“우리 학교·부대·동네에 <strong>달리는 국민신문고</strong>가 와서 상담해 줬으면 좋겠어”라고 사연을 보낼 수 있습니다.</p>' +
    "      </div>" +
    '      <div class="dly-jumps"><span>사례 보기</span><span class="is-fill">사연 보내기</span></div>' +
    '      <div class="dly-cases">' +
    "        <h3>청년 고충민원, 이렇게 해결되었어요</h3>" +
    '        <div class="dly-def">' +
    '          <p class="dly-def-label">고충민원이란</p>' +
    "          <p>행정기관 등의 위법·부당하거나 소극적인 처분(사실행위 포함), 불합리한 행정제도로 인하여 국민의 권리를 침해하거나 불편·부담을 주는 사항에 관한 민원을 말합니다.</p>" +
    "          <p class=\"dly-def-cite\">「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」 제2조 제5호</p>" +
    "        </div>" +
    "        <ol>" +
    "          <li><b>1</b><div><strong>출산지원금, 전입 하루 차이</strong><p>이사 준비는 끝났는데 출산이 하루 빨라 전입신고 전에 출산을 했고, 지원금을 받지 못한 상황입니다.</p><em>제도의 취지와 준비 과정을 보고 지급 방향으로 시정되었습니다.</em></div></li>" +
    "          <li><b>2</b><div><strong>청년 임대주택과 온라인 창업</strong><p>공공 임대에 살면서 온라인 쇼핑몰 사업자 주소를 바꾸려다 임대주택에서는 안 된다는 답을 받은 경우입니다.</p><em>용도를 바꾸지 않는 조건으로 거주와 사업이 함께 가능해졌습니다.</em></div></li>" +
    "        </ol>" +
    "      </div>" +
    "    </div>" +
    "  </section>" +
    '  <section class="demo-panel" data-panel="1">' +
    '    <div class="dly-shell">' +
    "      <h2>사연 보내기</h2>" +
    '      <p class="dly-note">보내 주신 사연은 지역과 민원 분야를 나누어 참고하기 위해 수집합니다. 개별 민원 접수·처리가 아니며, 이름·연락처 등 개인정보는 수집하지 않습니다.</p>' +
    '      <div class="dly-field">' +
    '        <p class="dly-label">나는 누구인가요?</p>' +
    '        <div class="dly-chips">' +
    '          <span class="is-on">학생</span><span>군인</span><span>취업 준비중</span><span>사회초년생</span><span>기타</span>' +
    "        </div>" +
    "      </div>" +
    '      <div class="dly-field">' +
    '        <p class="dly-label">어느 지역인가요?</p>' +
    '        <div class="dly-region"><div class="demo-field">세종특별자치시</div><div class="demo-field">세종시</div></div>' +
    "      </div>" +
    '      <div class="dly-field">' +
    '        <p class="dly-label">어디로 달려가면 될까요?</p>' +
    '        <div class="demo-field">○○대학교 학생회관</div>' +
    "      </div>" +
    '      <div class="dly-field">' +
    '        <p class="dly-label">전하고 싶은 사연</p>' +
    '        <p class="dly-guide">이름, 연락처, 주민번호 등 민감한 개인정보는 적지 마세요.</p>' +
    '        <div class="dly-story">국민권익위원회, 저의 고충을 상담해 주세요.</div>' +
    '        <p class="dly-char">24 / 220</p>' +
    "      </div>" +
    '      <label class="dly-check is-on"><i></i><span>정식 민원 접수가 아니라 사연 제보임을 알았어요</span></label>' +
    '      <label class="dly-check is-on"><i></i><span>개인정보는 적지 않았고, 지역·민원 분야 참고를 위한 사연 제공에 동의해요</span></label>' +
    '      <button type="button" class="demo-btn dly-send" data-next>내 사연 전하기</button>' +
    "    </div>" +
    "  </section>" +
    '  <section class="demo-panel" data-panel="2">' +
    '    <div class="dly-admin">' +
    '      <div class="dly-admin-head">' +
    "        <div><strong>사연 관리</strong><span>달리는 국민신문고</span></div>" +
    "        <em>공개 페이지</em>" +
    "      </div>" +
    '      <p class="dly-admin-stats">사연 3건</p>' +
    '      <div class="dly-admin-filters">' +
    "        <span>전체 지역</span><span>전체 기간</span><span>전체 대상</span>" +
    "        <span>새로고침</span><span>CSV 받기</span>" +
    "      </div>" +
    '      <table class="dly-table">' +
    "        <thead><tr><th>번호</th><th>접수</th><th>지역</th><th>대상</th><th>분야</th><th>장소</th><th>사연</th></tr></thead>" +
    "        <tbody>" +
    "          <tr><td>DS-202608-000041</td><td>08.26</td><td>세종</td><td>학생</td><td>행정문화교육</td><td>○○대학교 학생회관</td><td>국민권익위원회, 저의 고충을 상담해 주세요.</td></tr>" +
    "          <tr><td>DS-202608-000038</td><td>08.21</td><td>충남 계룡</td><td>군인</td><td>국방보훈</td><td>○○부대 정문</td><td>전역을 앞두고 상담을 받고 싶습니다.</td></tr>" +
    "          <tr><td>DS-202608-000027</td><td>08.12</td><td>대전 유성</td><td>취업 준비중</td><td>복지노동</td><td>○○일자리센터</td><td>청년 지원 제도를 현장에서 알고 싶습니다.</td></tr>" +
    "        </tbody>" +
    "      </table>" +
    "    </div>" +
    "  </section>" +
    "</article>";

  const spec = () => KITS[kit] || KITS.uigeol;

  const paintNav = () => {
    const s = spec();
    nav.innerHTML = s.nav
      .map((label, i) => '<li data-goto-step="' + i + '">' + label + "</li>")
      .join("");
    const sub = document.getElementById("demo-bar-sub");
    if (sub) sub.textContent = s.sub;
    el.classList.toggle("is-dallyeo", kit === "dallyeo");
  };

  const build = () => {
    body.innerHTML = kit === "dallyeo" ? htmlDallyeo() : html();
    paintNav();
  };

  const syncNav = () => {
    if (!nav) return;
    const s = spec();
    nav.querySelectorAll("li").forEach((li, i) => {
      li.classList.toggle("is-on", i === step);
      li.classList.toggle("is-done", i < step);
    });
    const crumb = document.getElementById("demo-crumbs");
    if (crumb) crumb.innerHTML = s.crumbs[step] || "";
    body.querySelectorAll(".demo-panel").forEach((p) => {
      p.hidden = Number(p.getAttribute("data-panel")) !== step;
    });
    el.setAttribute("data-step", String(step));
    el.classList.toggle("is-ready", kit === "uigeol" && step === 1);
    const hint = document.getElementById("demo-hint-bar");
    if (hint) {
      const last = s.nav.length - 1;
      hint.textContent = step === last ? s.lastHint : "스페이스 · → 다음";
    }
    body.scrollTo({ top: 0, behavior: step === 1 ? "auto" : "smooth" });
  };

  const runAnalyze = () => {
    const jobs = body.querySelectorAll("#demo-jobs li");
    const meter = document.getElementById("demo-meter");
    const nextBtn = document.getElementById("demo-analyze-next");
    jobs.forEach((li) => li.classList.remove("is-on", "is-done"));
    if (meter) meter.style.width = "8%";
    if (nextBtn) nextBtn.hidden = true;
    let i = 0;
    const tick = () => {
      if (step !== 2) return;
      jobs.forEach((li, idx) => {
        li.classList.toggle("is-done", idx < i);
        li.classList.toggle("is-on", idx === i);
      });
      if (meter) meter.style.width = Math.min(100, 12 + i * 18) + "%";
      i += 1;
      if (i <= jobs.length) later(420, tick);
      else {
        if (meter) meter.style.width = "100%";
        if (nextBtn) nextBtn.hidden = false;
      }
    };
    later(200, tick);
  };

  const go = (n) => {
    const max = spec().nav.length - 1;
    if (n < 0 || n > max) return;
    step = n;
    syncNav();
    if (kit === "uigeol" && step === 2) runAnalyze();
  };

  const next = () => {
    if (step < 4) go(step + 1);
  };
  const prev = () => {
    if (step > 0) go(step - 1);
  };

  const openPeek = (src, name) => {
    const peek = document.getElementById("demo-peek");
    const img = document.getElementById("demo-peek-img");
    const cap = document.getElementById("demo-peek-cap");
    if (!peek || !img) return;
    img.src = src;
    img.alt = name;
    if (cap) cap.textContent = name;
    peek.removeAttribute("hidden");
    peekOpen = true;
  };

  const closePeek = () => {
    const peek = document.getElementById("demo-peek");
    if (peek) peek.setAttribute("hidden", "");
    peekOpen = false;
  };

  const open = (kind) => {
    kit = kind === "dallyeo" ? "dallyeo" : "uigeol";
    clearTimers();
    step = 0;
    closePeek();
    build();
    el.removeAttribute("hidden");
    document.body.classList.add("is-demo");
    syncNav();
  };

  const close = () => {
    if (!isOpen()) return;
    clearTimers();
    closePeek();
    el.setAttribute("hidden", "");
    document.body.classList.remove("is-demo");
  };

  const replay = () => {
    clearTimers();
    closePeek();
    go(0);
  };

  el.addEventListener("click", (e) => {
    const file = e.target.closest(".demo-file");
    if (file && file.getAttribute("data-src")) {
      e.preventDefault();
      openPeek(file.getAttribute("data-src"), file.getAttribute("data-name"));
      return;
    }
    if (e.target.id === "demo-peek-x" || e.target.id === "demo-peek") {
      closePeek();
      return;
    }
    const jump = e.target.closest("[data-goto-step]");
    if (jump && el.contains(jump)) {
      go(Number(jump.getAttribute("data-goto-step")));
      return;
    }
    if (e.target.closest("[data-next]")) {
      next();
    }
  });

  nav.addEventListener("click", (e) => {
    const li = e.target.closest("[data-goto-step]");
    if (!li) return;
    go(Number(li.getAttribute("data-goto-step")));
  });

  document.getElementById("demo-close").addEventListener("click", close);
  document.getElementById("demo-replay").addEventListener("click", replay);

  const scrollBy = (dy) => {
    body.scrollBy({ top: dy, behavior: "smooth" });
  };

  window.UigeolDemo = {
    open,
    close,
    replay,
    next,
    prev,
    go,
    isOpen,
    isPeekOpen: () => peekOpen,
    closePeek,
    scrollBy,
    step: () => step,
    pause() {
      clearTimers();
    },
  };
})();
