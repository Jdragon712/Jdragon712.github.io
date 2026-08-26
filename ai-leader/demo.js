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
  let auto = true;
  let timers = [];
  let built = false;
  let meterTimer = 0;

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
    '    <div class="sec" style="font-size:15px">1. 신청원인</div>' +
    "    <p>신청인은 2018. 5. 2. 대 987㎡ 및 전 193㎡에 건축신고를 하고 2개 동을 건축하였다. 피신청인은 2020. 8. 3. 2차선 국도를 이 민원 토지 바로 앞으로 착공하여 2025. 12. 19. 개통하였다. 도로가 이 민원 건물과 5m도 안 되게 가깝고, 방음벽으로 조망·일조가 차단되며 소음·진동 및 배수·침수 피해가 있으므로 정당한 보상을 구한다.</p>" +
    '    <div class="sec" style="font-size:15px">2. 피신청인의 주장</div>' +
    "    <p>피신청인은 소규모환경영향평가 야간 소음 56.6dB(기준 55dB)에 따라 투명형 방음벽을 계획하였고, 신청인 요청을 수용하여 길이를 90m에서 36m로 조정하여 설치하였다. 일조 피해는 건축법 제61조 및 시행령 제86조에 저촉되지 않으며, 공익사업 손실보상 대상이 아니어서 별도 보상은 불가하다고 주장한다.</p>" +
    '    <div class="sec" style="font-size:15px">3. 사실관계</div>' +
    "    <p>가. 이 민원 건물(부1)은 지1층·1층 일반창고 각 94.01㎡이고, 소유자는 박길동이다.</p>" +
    "    <p>나. 피신청인은 2020. 8. 3. 이 민원 도로를 착공하여 2025. 12. 준공·개통하였다. 위원회 조사관은 2026. 4. 15. 현장조사를 하였다. 방음벽은 당초 90m 계획에서 36m로 조정되어 설치되었다.</p>" +
    '    <div class="sec" style="font-size:15px">4. 판단</div>' +
    "    <p>국도 신설 및 방음벽 설치 자체는 관련 법령과 소규모환경영향평가 절차를 거친 것으로 보이며, 건축법상 일조 규정 위반으로 단정하기는 어렵다. 다만 신청인의 2024. 11. 11.자 동의서를 주거환경 피해 일체에 대한 포괄 승낙으로 보기 어렵고, 사용승인된 기존 건축물에 5미터 이내로 국도와 옹벽·방음벽이 밀착되어 주거·창고 기능과 배수·차량 이용이 현저히 저해된 사정은 신청인에게 지나치게 가혹하다.</p>" +
    '    <div class="sec" style="font-size:15px">5. 결론</div>' +
    "    <p>그러므로 신설도로로 인한 주거환경 피해 구제를 구하는 신청인의 주장이 상당한 이유가 있다고 인정되므로 「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」 제46조 제2항에 따라 피신청인에게 의견을 표명하기로 하여 주문과 같이 의결한다.</p>" +
    '    <p class="demo-hint">이 산출물은 인공지능 초안이며 국민권익위원회 공식 의결이 아닙니다.</p>' +
    "  </article>" +
    "</section>" +
    '<div class="demo-peek" id="demo-peek" hidden>' +
    "  <figure>" +
    '    <img id="demo-peek-img" alt="">' +
    "    <figcaption><span id=\"demo-peek-cap\"></span><button type=\"button\" class=\"demo-x\" id=\"demo-peek-x\">닫기</button></figcaption>" +
    "  </figure>" +
    "</div>" +
    "</article>";

  const crumbs = [
    "1 안내  →  <b>2 열쇠</b>  →  3 작성",
    "1 안내  →  2 열쇠  →  <b>3 작성</b>",
    "1 안내  →  2 열쇠  →  <b>3 작성</b>",
    "<b>내용 검토</b>",
    "<b>의결서 초안</b>",
  ];

  const build = () => {
    if (built) return;
    body.innerHTML = html();
    built = true;
  };

  const syncNav = () => {
    if (!nav) return;
    nav.querySelectorAll("li").forEach((li, i) => {
      li.classList.toggle("is-on", i === step);
      li.classList.toggle("is-done", i < step);
    });
    const crumb = document.getElementById("demo-crumbs");
    if (crumb) crumb.innerHTML = crumbs[step] || "";
    body.querySelectorAll(".demo-panel").forEach((p) => {
      p.hidden = Number(p.getAttribute("data-panel")) !== step;
    });
    el.setAttribute("data-step", String(step));
    el.classList.toggle("is-ready", step === 1);
    body.scrollTo({ top: 0, behavior: step === 1 ? "auto" : "smooth" });
  };

  const runAnalyze = () => {
    const jobs = body.querySelectorAll("#demo-jobs li");
    const meter = document.getElementById("demo-meter");
    jobs.forEach((li) => li.classList.remove("is-on", "is-done"));
    if (meter) meter.style.width = "8%";
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
        if (auto) later(520, () => go(3));
      }
    };
    later(200, tick);
  };

  const go = (n) => {
    if (n < 0 || n > 4) return;
    step = n;
    syncNav();
    if (step === 2) runAnalyze();
  };

  const next = () => {
    if (step < 4) go(step + 1);
  };
  const prev = () => {
    if (step > 0) go(step - 1);
  };

  const scheduleAuto = () => {
    if (!auto) return;
    later(1400, () => {
      if (auto && step === 0) go(1);
    });
    later(1400 + 2400, () => {
      if (auto && step === 1) go(2);
    });
    later(1400 + 2400 + 6200, () => {
      if (auto && step === 3) go(4);
    });
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
  };

  const closePeek = () => {
    const peek = document.getElementById("demo-peek");
    if (peek) peek.setAttribute("hidden", "");
  };

  const open = () => {
    build();
    clearTimers();
    auto = true;
    step = 0;
    el.removeAttribute("hidden");
    document.body.classList.add("is-demo");
    closePeek();
    syncNav();
    scheduleAuto();
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
    auto = true;
    closePeek();
    go(0);
    scheduleAuto();
  };

  el.addEventListener("click", (e) => {
    const file = e.target.closest(".demo-file");
    if (file) {
      e.preventDefault();
      auto = false;
      clearTimers();
      openPeek(file.getAttribute("data-src"), file.getAttribute("data-name"));
      return;
    }
    if (e.target.id === "demo-peek-x" || e.target.id === "demo-peek") {
      closePeek();
      return;
    }
    const jump = e.target.closest("[data-goto-step]");
    if (jump && el.contains(jump)) {
      auto = false;
      clearTimers();
      go(Number(jump.getAttribute("data-goto-step")));
      return;
    }
    if (e.target.closest("[data-next]")) {
      auto = false;
      clearTimers();
      next();
    }
  });

  nav.addEventListener("click", (e) => {
    const li = e.target.closest("[data-goto-step]");
    if (!li) return;
    auto = false;
    clearTimers();
    go(Number(li.getAttribute("data-goto-step")));
  });

  document.getElementById("demo-close").addEventListener("click", close);
  document.getElementById("demo-replay").addEventListener("click", replay);

  window.UigeolDemo = {
    open,
    close,
    replay,
    next,
    prev,
    go,
    isOpen,
    pause() {
      auto = false;
      clearTimers();
    },
  };
})();
