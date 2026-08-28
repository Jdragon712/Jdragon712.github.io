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
    "일하면서 만든 네 가지 도구입니다. 만든 이유와 작동하는 원리를 소개합니다.",
    "왜 만들었는지, 어떻게 돌아가는지만 짧게 말합니다.",
    "같은 문형 초안을 매번 처음부터 쓰느라 만들었습니다. 원인·주장·사실을 넣으면 초안이 나오고, 마지막 줄은 사람이 씁니다. 웹을 열어 보여 주십시오.",
    "청년 사연이 현장에 닿게 하려고 만들었습니다. 사연과 장소를 받으면 접수 후 찾아갑니다.",
    "시트마다 나눠 암호를 거는 반복을 없애려고 만들었습니다. 클릭 한 번에 파일로 떨어집니다.",
    "장부만으로는 단골 자리가 안 보여서 만들었습니다. 방문 횟수를 지도 위에 올립니다. 지도를 직접 움직여 보십시오.",
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
  const Demo = window.UigeolDemo;

  const total = slides.length;
  let index = 0;
  let touchX = null;
  let liveKey = null;
  let spinTimer = 0;

  const pad = (n) => String(n + 1).padStart(2, "0");
  const liveOpen = () => liveEl && !liveEl.hasAttribute("hidden");
  const demoOpen = () => Demo && Demo.isOpen && Demo.isOpen();
  const overlayOpen = () =>
    liveOpen() ||
    demoOpen() ||
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
      el.closest("a, button, input, textarea, label, .live, .demo, .help, .gridview, .preview, .tool, .end-card, .portfolio-btn, .example-btn")
    );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (demoOpen()) Demo.close();
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
