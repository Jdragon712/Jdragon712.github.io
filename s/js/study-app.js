(function () {
  "use strict";

  var STORAGE_DONE = "sejong-study-done-chapters";
  var STORAGE_LAST = "sejong-study-last-chapter";
  var MODULE_META = [
    { num: 1, title: "기초" },
    { num: 2, title: "데이터 파이프라인" },
    { num: 3, title: "웹·운영" },
    { num: 4, title: "실습·검증" },
    { num: 5, title: "소스 코드" },
  ];
  var parts = [
    window.STUDY_EXPANDED_1,
    window.STUDY_EXPANDED_2,
    window.STUDY_EXPANDED_3,
    window.STUDY_EXPANDED_4,
    window.STUDY_EXPANDED_5,
  ].filter(Boolean);
  var chapters = [];
  parts.forEach(function (arr, pi) {
    var meta = MODULE_META[pi] || { num: pi + 1, title: "" };
    (arr || []).forEach(function (ch, ci) {
      chapters.push({
        id: ch.id,
        title: ch.title,
        keywords: ch.keywords,
        lead: ch.lead,
        html: ch.html,
        moduleNum: meta.num,
        moduleTitle: meta.title,
        chapterNum: ci + 1,
        moduleChapterTotal: arr.length,
      });
    });
  });

  var nav = document.getElementById("chapter-nav");
  var content = document.getElementById("study-content");
  var progressFill = document.getElementById("progress-fill");
  var progressLabel = document.getElementById("progress-label");
  var searchInput = document.getElementById("search-input");

  var doneSet = new Set();
  try {
    var saved = JSON.parse(localStorage.getItem(STORAGE_DONE) || "[]");
    if (Array.isArray(saved)) saved.forEach(function (id) { doneSet.add(id); });
  } catch (_e) {}

  var currentIndex = 0;
  try {
    var last = localStorage.getItem(STORAGE_LAST);
    if (last) {
      var idx = chapters.findIndex(function (c) { return c.id === last; });
      if (idx >= 0) currentIndex = idx;
    }
  } catch (_e2) {}

  function saveDone() {
    try {
      localStorage.setItem(STORAGE_DONE, JSON.stringify(Array.from(doneSet)));
    } catch (_e3) {}
  }

  function saveLast(id) {
    try {
      localStorage.setItem(STORAGE_LAST, id);
    } catch (_e4) {}
  }

  function updateProgress() {
    var pct = chapters.length ? Math.round((doneSet.size / chapters.length) * 100) : 0;
    progressFill.style.width = pct + "%";
    progressLabel.textContent = "진행 " + pct + "% (" + doneSet.size + "/" + chapters.length + "장)";
  }

  function openTocPanel() {
    document.body.classList.remove("sidebar-hidden");
  }

  function closeTocPanel() {
    document.body.classList.add("sidebar-hidden");
  }

  function chapterMatches(ch, q) {
    if (!q) return true;
    return (
      ch.title.toLowerCase().indexOf(q) >= 0 ||
      (ch.keywords || "").toLowerCase().indexOf(q) >= 0 ||
      (ch.moduleTitle || "").toLowerCase().indexOf(q) >= 0
    );
  }

  function renderNav(filter) {
    var q = (filter || "").trim().toLowerCase();
    var html = "";
    MODULE_META.forEach(function (meta) {
      var items = [];
      chapters.forEach(function (ch, i) {
        if (ch.moduleNum !== meta.num) return;
        if (!chapterMatches(ch, q)) return;
        items.push({ ch: ch, index: i });
      });
      if (!items.length) return;

      html +=
        '<div class="chapter-nav__part" data-part="' +
        meta.num +
        '">' +
        '<div class="chapter-nav__label">' +
        '<span class="chapter-nav__label-text">Part ' +
        meta.num +
        " · " +
        meta.title +
        "</span>" +
        '<span class="chapter-nav__count">' +
        items.length +
        (q ? "개" : "장") +
        "</span>" +
        "</div>" +
        '<div class="chapter-nav__items">';

      items.forEach(function (item) {
        var cls = "chapter-link";
        if (item.index === currentIndex) cls += " is-active";
        if (doneSet.has(item.ch.id)) cls += " is-done";
        html +=
          '<a href="#' +
          item.ch.id +
          '" class="' +
          cls +
          '" data-index="' +
          item.index +
          '">' +
          '<span class="chapter-link__num">' +
          item.ch.chapterNum +
          "장</span>" +
          '<span class="chapter-link__title">' +
          item.ch.title +
          "</span></a>";
      });

      html += "</div></div>";
    });
    nav.innerHTML = html;
  }

  function renderChapter(index) {
    var ch = chapters[index];
    if (!ch) return;
    currentIndex = index;
    saveLast(ch.id);
    if (window.STUDY_DEMO_TEARDOWN) window.STUDY_DEMO_TEARDOWN();
    content.innerHTML =
      '<article class="chapter-doc" id="' +
      ch.id +
      '">' +
      '<header class="chapter-doc__header">' +
      '<p class="chapter-doc__eyebrow">Part ' +
      ch.moduleNum +
      " · " +
      ch.moduleTitle +
      "</p>" +
      '<p class="chapter-doc__chapter">제 ' +
      ch.chapterNum +
      "장 / " +
      ch.moduleChapterTotal +
      "장</p>" +
      "<h1 class=\"chapter-doc__title\">" +
      ch.title +
      "</h1>" +
      (ch.lead ? '<p class="chapter-doc__lead">' + ch.lead + "</p>" : "") +
      "</header>" +
      '<div class="chapter-doc__body">' +
      ch.html +
      "</div></article>";
    renderNav(searchInput.value);
    updateProgress();
    window.scrollTo(0, 0);
    document.getElementById("btn-mark").classList.toggle("is-done", doneSet.has(ch.id));
    document.getElementById("btn-mark").textContent = doneSet.has(ch.id) ? "읽음 ✓" : "읽음 표시";
    document.getElementById("btn-prev").disabled = index === 0;
    document.getElementById("btn-next").disabled = index === chapters.length - 1;
    if (window.STUDY_DEMO_BOOT) window.STUDY_DEMO_BOOT(content);
  }

  nav.addEventListener("click", function (ev) {
    var link = ev.target.closest(".chapter-link");
    if (!link) return;
    ev.preventDefault();
    var idx = parseInt(link.getAttribute("data-index"), 10);
    renderChapter(idx);
    closeTocPanel();
  });

  document.getElementById("btn-prev").addEventListener("click", function () {
    if (currentIndex > 0) renderChapter(currentIndex - 1);
  });

  document.getElementById("btn-next").addEventListener("click", function () {
    if (currentIndex < chapters.length - 1) renderChapter(currentIndex + 1);
  });

  document.getElementById("btn-mark").addEventListener("click", function () {
    var id = chapters[currentIndex].id;
    if (doneSet.has(id)) doneSet.delete(id);
    else doneSet.add(id);
    saveDone();
    renderChapter(currentIndex);
  });

  document.getElementById("btn-menu").addEventListener("click", openTocPanel);
  document.getElementById("btn-toc-rail").addEventListener("click", openTocPanel);
  document.getElementById("btn-sidebar-close").addEventListener("click", closeTocPanel);
  document.getElementById("sidebar-backdrop").addEventListener("click", closeTocPanel);

  searchInput.addEventListener("input", function () {
    renderNav(searchInput.value);
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.target && /input|textarea/i.test(ev.target.tagName)) return;
    if (ev.key === "Escape") closeTocPanel();
    if (ev.key === "ArrowLeft" && currentIndex > 0) renderChapter(currentIndex - 1);
    if (ev.key === "ArrowRight" && currentIndex < chapters.length - 1) renderChapter(currentIndex + 1);
  });

  document.body.classList.add("sidebar-hidden");
  renderNav();
  renderChapter(currentIndex);
})();