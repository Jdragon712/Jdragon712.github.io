(function () {
  "use strict";

  var STORAGE_KEY = "sejong-tutorial-slide-index";
  var slides = window.TUTORIAL_SLIDES || [];
  var root = document.getElementById("slides-root");
  var counterEl = document.getElementById("slide-counter");
  var journeyFill = document.getElementById("journey-fill");
  var presenterPanel = document.getElementById("presenter-panel");
  var presenterText = document.getElementById("presenter-text");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildSlideHtml(slide, index) {
    return (
      '<div class="swiper-slide" data-slide-index="' +
      index +
      '">' +
      '<article class="slide-card">' +
      (slide.eyebrow ? '<p class="slide-eyebrow">' + escapeHtml(slide.eyebrow) + "</p>" : "") +
      '<h2 class="slide-title">' +
      escapeHtml(slide.title) +
      "</h2>" +
      (slide.lead ? '<p class="slide-lead">' + escapeHtml(slide.lead) + "</p>" : "") +
      (slide.body ? '<div class="slide-body">' + slide.body + "</div>" : "") +
      (slide.summary ? '<p class="slide-summary">✓ ' + escapeHtml(slide.summary) + "</p>" : "") +
      "</article>" +
      "</div>"
    );
  }

  root.innerHTML = slides.map(buildSlideHtml).join("");

  var initialIndex = 0;
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      var n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 0 && n < slides.length) initialIndex = n;
    }
  } catch (_e) {
    /* ignore */
  }

  function updateChrome(index) {
    var total = slides.length;
    var pct = total <= 1 ? 100 : (index / (total - 1)) * 100;
    counterEl.textContent = index + 1 + " / " + total;
    journeyFill.style.width = pct + "%";
    if (slides[index] && slides[index].presenter) {
      presenterText.textContent = slides[index].presenter;
    }
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
    } catch (_e2) {
      /* ignore */
    }
  }

  var swiper = new Swiper("#deck-swiper", {
    initialSlide: initialIndex,
    slidesPerView: 1,
    spaceBetween: 16,
    keyboard: { enabled: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        updateChrome(this.activeIndex);
      },
      slideChange: function () {
        updateChrome(this.activeIndex);
      },
    },
  });

  function togglePresenter(force) {
    var open = typeof force === "boolean" ? force : presenterPanel.hidden;
    presenterPanel.hidden = !open;
    document.body.classList.toggle("presenter-open", open);
  }

  document.getElementById("btn-presenter").addEventListener("click", function () {
    togglePresenter(presenterPanel.hidden);
  });

  document.getElementById("presenter-close").addEventListener("click", function () {
    togglePresenter(false);
  });

  document.getElementById("btn-reset").addEventListener("click", function () {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_e3) {
      /* ignore */
    }
    swiper.slideTo(0);
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "p" || ev.key === "P") {
      if (ev.target && /input|textarea/i.test(ev.target.tagName)) return;
      ev.preventDefault();
      togglePresenter(presenterPanel.hidden);
    }
  });

  root.addEventListener("click", function (ev) {
    var btn = ev.target.closest(".quiz-btn");
    if (!btn) return;
    var wrap = btn.closest("[data-quiz]");
    if (!wrap) return;
    var quizId = wrap.getAttribute("data-quiz");
    var feedback = document.getElementById("quiz-feedback-" + quizId);
    var correct = btn.getAttribute("data-answer") === "no";
    wrap.querySelectorAll(".quiz-btn").forEach(function (b) {
      b.classList.remove("is-correct", "is-wrong");
    });
    if (correct) {
      btn.classList.add("is-correct");
      if (feedback) {
        feedback.textContent = "맞아요! 우리 지도는 방문 횟수만 보여 줍니다.";
        feedback.style.color = "var(--ok)";
      }
    } else {
      btn.classList.add("is-wrong");
      if (feedback) {
        feedback.textContent = "아쉬워요. 금액은 오해를 부를 수 있어서 넣지 않았어요.";
        feedback.style.color = "#c0392b";
      }
    }
  });
})();