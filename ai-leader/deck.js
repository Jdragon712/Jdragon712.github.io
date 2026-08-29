(() => {
  "use strict";

  const TOOLS = {
    uigeol: {
      title: "고충민원 의결서 초안 생성기",
      url: "https://web-seven-alpha-40.vercel.app",
      qr: "assets/qr-uigeol.png",
      slide: 2,
    },
    dallyeo: {
      title: "달리는 국민신문고",
      url: "https://dallyeoneun-gukminsinmungo.web.app",
      qr: "assets/qr-dallyeo.png",
      slide: 3,
    },
    sejong: {
      title: "세종 공직자 단골 식당 지도",
      url: "https://jdragon712.github.io/sejong-official-restaurant-map/",
      qr: "assets/qr-sejong-map.png",
      slide: 5,
    },
  };

  const NOTES = [
    "일하면서 만든 네 가지 도구를 소개합니다.",
    "일하면서 만든 도구 네 가지. 후임자를 위해 만든 프로그램부터, 애정 있는 업무를 위해 만든 웹서비스까지.",
    "글을 써 달라고 맡긴 것이 아닙니다. 신청인의 말, 기관의 말, 사실을 넣으면 초안이 나옵니다. 마지막 줄은 사람이 씁니다. 지금 웹을 열어 보여 주십시오.",
    "사연을 받아서 찾아가고, 현장에서 소통합니다.",
    "인트라넷 자유게시판에 프로그램으로 만들어 올렸습니다.",
    "공개된 업무추진비를 지도 위에 올렸습니다. 장부만으로는 잘 안 보이던 자리가 모입니다. 지도를 직접 움직여 보십시오.",
    "누구나 할 수 있지만, 아무나 할 수 없습니다. 모두가 할 수 있도록 AI혁신리더가 리드하겠습니다.",
  ];

  const GRID_TITLES = [
    "야근하기 싫었습니다",
    "일하면서 만든 도구 네 가지",
    "고충민원 의결서 초안",
    "달리는 국민신문고",
    "엑셀 자동 분리기",
    "단골 식당 지도",
    "누구나 할 수 있지만, 아무나 할 수 없습니다",
  ];

  const LIVE_FOR_SLIDE = [null, null, "uigeol", "dallyeo", null, "sejong", null];
  const EXAMPLE_FOR_SLIDE = [null, null, "uigeol", "dallyeo", null, null, null];

  const slides = Array.from(document.querySelectorAll(".slide"));
  const stage = document.getElementById("stage");
  const progress = document.getElementById("progress");
  const liveEl = document.getElementById("live");
  const liveFrame = document.getElementById("live-frame");
  const liveTitle = document.getElementById("live-title");
  const liveUrl = document.getElementById("live-url");
  const liveQr = document.getElementById("live-qr");
  const liveSpin = document.getElementById("live-spin");
  const liveClose = document.getElementById("live-close");
  const liveTab = document.getElementById("live-tab");
  const notesEl = document.getElementById("notes");
  const notesBody = document.getElementById("notes-body");
  const helpEl = document.getElementById("help");
  const gridEl = document.getElementById("gridview");
  const gridList = document.getElementById("gridview-list");
  const hud = document.getElementById("hud");
  const exampleBtn = document.getElementById("example-btn");
  const appdevEl = document.getElementById("appdev");
  const appdevImg = document.getElementById("appdev-img");
  const appdevTitle = document.getElementById("appdev-title");
  const appdevCue = document.getElementById("appdev-cue");
  const appdevCount = document.getElementById("appdev-count");
  const appdevClose = document.getElementById("appdev-close");
  const appdevPrev = document.getElementById("appdev-prev");
  const appdevNext = document.getElementById("appdev-next");
  const appdevBtn = document.getElementById("appdev-btn");
  const Demo = window.UigeolDemo;

  const APPDEV = [
    {
      src: "assets/appdev/01-first-review.jpg",
      title: "첫 심사 — 정보가 더 필요했습니다",
      cue: "Apple이 데모 계정으로 들어가지 못했다고 알려 왔습니다. Guideline 2.1. 여기서부터 심사팀과 메일이 오갔습니다.",
    },
    {
      src: "assets/appdev/02-reply-to-apple.jpg",
      title: "Apple에 보낸 답변",
      cue: "레슨생·코치 계정과 비밀번호를 적고, 쪽지가 미리 채워져 있다고 안내했습니다. 심사팀이 기능을 직접 눌러 보게 하려는 답이었습니다.",
    },
    {
      src: "assets/appdev/03-guideline-21a.jpg",
      title: "다시 온 요청 — 쪽지까지",
      cue: "재심사에서도 쪽지 같은 기능을 확인할 수 없다고 했습니다. 샘플이 들어 있는 데모 계정을 달라고 한 대목입니다.",
    },
    {
      src: "assets/appdev/04-approved.jpg",
      title: "1.0.1 승인",
      cue: "심사 완료, 승인됨. 앱 개발자로 이름이 등록되고, 업데이트가 스토어에 올라간 순간입니다.",
    },
    {
      src: "assets/appdev/05-app-store.jpg",
      title: "앱스토어에 올라간 민턴콕콕",
      cue: "제품 페이지입니다. 소개 이미지, 새로운 소식, 개발자 이름 jin yong park 을 보여 주시면 됩니다.",
    },
    {
      src: "assets/appdev/06-first-review.jpg",
      title: "첫 평가 5.0",
      cue: "사용자 리뷰입니다. 코치와 직접 이야기하고 레슨을 신청할 수 있다는 말이 앱의 핵심과 맞습니다.",
    },
  ];
  let appdevIndex = 0;

  const total = slides.length;
  let index = 0;
  let touchX = null;
  let liveKey = null;
  let spinTimer = 0;

  const pad = (n) => String(n + 1).padStart(2, "0");
  const liveOpen = () => liveEl && !liveEl.hasAttribute("hidden");
  const demoOpen = () => Demo && Demo.isOpen && Demo.isOpen();
  const appdevOpen = () => appdevEl && !appdevEl.hasAttribute("hidden");
  const overlayOpen = () =>
    liveOpen() ||
    demoOpen() ||
    appdevOpen() ||
    (helpEl && !helpEl.hasAttribute("hidden")) ||
    (gridEl && !gridEl.hasAttribute("hidden"));

  const setChrome = () => {
    if (progress) progress.style.width = ((index + 1) / total) * 100 + "%";
    const tone = slides[index].getAttribute("data-tone");
    document.body.classList.toggle("is-paper", tone === "paper");
    if (notesBody) notesBody.textContent = NOTES[index] || "";
    if (exampleBtn) {
      if (EXAMPLE_FOR_SLIDE[index]) exampleBtn.removeAttribute("hidden");
      else exampleBtn.setAttribute("hidden", "");
    }
  };

  const setHash = (n) => {
    const next = "#" + (n + 1);
    if (location.hash !== next && history.replaceState) history.replaceState(null, "", next);
  };

  const go = (n) => {
    if (n < 0 || n >= total || n === index) return;
    slides[index].classList.remove("is-active");
    slides[n].classList.add("is-active");
    index = n;
    setChrome();
    setHash(index);
    syncGrid();
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const parseHash = () => {
    const n = parseInt(String(location.hash || "").replace("#", ""), 10);
    return n >= 1 && n <= total ? n - 1 : 0;
  };

  const openLive = (key) => {
    const tool = TOOLS[key];
    if (!tool) return;
    liveKey = key;
    liveTitle.textContent = tool.title;
    liveUrl.textContent = tool.url;
    liveQr.src = tool.qr;
    liveQr.alt = tool.title + " QR";
    liveSpin.classList.remove("is-off");
    liveEl.removeAttribute("hidden");
    document.body.classList.add("is-live");
    liveFrame.src = tool.url;
    clearTimeout(spinTimer);
    spinTimer = window.setTimeout(() => liveSpin.classList.add("is-off"), 1400);
    liveClose.focus();
  };

  const closeLive = () => {
    if (!liveOpen()) return;
    liveEl.setAttribute("hidden", "");
    document.body.classList.remove("is-live");
    liveFrame.removeAttribute("src");
    liveKey = null;
  };

  const openTab = () => {
    const tool = TOOLS[liveKey];
    if (tool) window.open(tool.url, "_blank", "noopener");
  };

  const paintAppdev = () => {
    const shot = APPDEV[appdevIndex];
    if (!shot) return;
    appdevImg.src = shot.src;
    appdevImg.alt = shot.title;
    appdevTitle.textContent = shot.title;
    appdevCue.textContent = shot.cue;
    appdevCount.textContent = appdevIndex + 1 + " / " + APPDEV.length;
  };
  const openAppdev = (n) => {
    appdevIndex = Math.max(0, Math.min(APPDEV.length - 1, n || 0));
    paintAppdev();
    appdevEl.removeAttribute("hidden");
    document.body.classList.add("is-appdev");
    appdevClose.focus();
  };
  const closeAppdev = () => {
    if (!appdevOpen()) return;
    appdevEl.setAttribute("hidden", "");
    document.body.classList.remove("is-appdev");
  };
  const appdevStep = (d) => {
    appdevIndex = (appdevIndex + d + APPDEV.length) % APPDEV.length;
    paintAppdev();
  };

  liveFrame.addEventListener("load", () => liveSpin.classList.add("is-off"));

  const toggleFullscreen = () => {
    const root = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (root.requestFullscreen) root.requestFullscreen();
      else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
    } else if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  };

  const show = (el, on) => {
    if (!el) return;
    if (on) el.removeAttribute("hidden");
    else el.setAttribute("hidden", "");
  };

  const buildGrid = () => {
    gridList.innerHTML = "";
    GRID_TITLES.forEach((title, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "grid-item";
      btn.innerHTML = "<b>" + (i + 1) + "</b><span>" + title + "</span>";
      btn.addEventListener("click", () => {
        go(i);
        show(gridEl, false);
      });
      gridList.appendChild(btn);
    });
    syncGrid();
  };

  const syncGrid = () => {
    gridList.querySelectorAll(".grid-item").forEach((el, i) => {
      el.classList.toggle("is-on", i === index);
    });
  };

  const isInteractive = (el) =>
    !!(
      el &&
      el.closest &&
      el.closest("a, button, input, textarea, label, .live, .demo, .appdev, .help, .gridview, .preview, .tool, .end-card, .portfolio-btn, .example-btn, .extra-btn")
    );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (demoOpen()) Demo.close();
      else if (appdevOpen()) closeAppdev();
      else if (liveOpen()) closeLive();
      else if (helpEl && !helpEl.hasAttribute("hidden")) show(helpEl, false);
      else if (gridEl && !gridEl.hasAttribute("hidden")) show(gridEl, false);
      else if (notesEl && !notesEl.hasAttribute("hidden")) show(notesEl, false);
      else if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
      return;
    }

    if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
      e.preventDefault();
      show(helpEl, helpEl.hasAttribute("hidden"));
      return;
    }

    if (demoOpen()) {
      if (Demo.isPeekOpen && Demo.isPeekOpen()) {
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          Demo.closePeek();
        }
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        Demo.next();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        Demo.prev();
      } else if (e.key === "PageDown" || e.key === "ArrowDown") {
        e.preventDefault();
        Demo.scrollBy(e.key === "PageDown" ? 420 : 96);
      } else if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault();
        Demo.scrollBy(e.key === "PageUp" ? -420 : -96);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        Demo.replay();
      }
      return;
    }

    if (appdevOpen()) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        appdevStep(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "Backspace") {
        e.preventDefault();
        appdevStep(-1);
      }
      return;
    }

    if (overlayOpen() && e.key !== "F" && e.key !== "f") return;

    if ((e.key === "f" || e.key === "F") && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      toggleFullscreen();
      return;
    }
    if (e.key === "g" || e.key === "G") {
      e.preventDefault();
      const on = gridEl.hasAttribute("hidden");
      show(gridEl, on);
      if (on) syncGrid();
      return;
    }
    if (e.key === "n" || e.key === "N") {
      e.preventDefault();
      show(notesEl, notesEl.hasAttribute("hidden"));
      return;
    }
    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      openAppdev(0);
      return;
    }
    if (e.key === "e" || e.key === "E") {
      const kit = EXAMPLE_FOR_SLIDE[index];
      if (kit && Demo) {
        e.preventDefault();
        Demo.open(kit);
      }
      return;
    }
    if (e.key === "Enter") {
      const key = LIVE_FOR_SLIDE[index];
      if (key) {
        e.preventDefault();
        openLive(key);
      }
      return;
    }
    if (e.key >= "1" && e.key <= "7") {
      e.preventDefault();
      go(Number(e.key) - 1);
      return;
    }
    if ((e.key === " " || e.key === "Enter") && isInteractive(e.target)) return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "Backspace") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(total - 1);
    }
  });

  document.addEventListener("click", (e) => {
    const exampleHit = e.target.closest("[data-example], #example-btn");
    if (exampleHit && Demo) {
      e.preventDefault();
      e.stopPropagation();
      const kit =
        exampleHit.getAttribute("data-example") || EXAMPLE_FOR_SLIDE[index];
      if (kit) Demo.open(kit);
      return;
    }
    const liveBtn = e.target.closest("[data-live]");
    if (liveBtn) {
      e.preventDefault();
      e.stopPropagation();
      openLive(liveBtn.getAttribute("data-live"));
      return;
    }
    const gotoBtn = e.target.closest("[data-goto]");
    if (gotoBtn) {
      e.preventDefault();
      e.stopPropagation();
      go(Number(gotoBtn.getAttribute("data-goto")) - 1);
      return;
    }
    if (overlayOpen() || isInteractive(e.target)) return;
    const x = e.clientX / window.innerWidth;
    if (x <= 0.12) prev();
    else if (x >= 0.88) next();
  });

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.changedTouches[0]) touchX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  document.addEventListener(
    "touchend",
    (e) => {
      if (touchX == null || !e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (overlayOpen() || isInteractive(e.target)) return;
      if (Math.abs(dx) < 56) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );

  liveClose.addEventListener("click", closeLive);
  appdevBtn.addEventListener("click", () => openAppdev(0));
  appdevClose.addEventListener("click", closeAppdev);
  appdevPrev.addEventListener("click", () => appdevStep(-1));
  appdevNext.addEventListener("click", () => appdevStep(1));
  appdevEl.addEventListener("click", (e) => {
    if (e.target === appdevEl) closeAppdev();
  });
  liveTab.addEventListener("click", openTab);
  helpEl.addEventListener("click", (e) => {
    if (e.target === helpEl) show(helpEl, false);
  });

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      const wrap = img.closest(".preview, .stack-card, .qr-box, .end-card");
      if (wrap) wrap.classList.add("is-missing");
    });
  });

  buildGrid();
  index = parseHash();
  slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
  setChrome();
  window.addEventListener("hashchange", () => {
    const n = parseHash();
    if (n !== index) go(n);
  });

  if (hud) hud.style.opacity = "0";
})();
