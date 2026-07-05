/* global window */
/**
 * 교재 블록 — O'Reilly·MDN·Coursera식 구조
 * (학습목표 → 본문 → 용어 → 실습 → 요약)
 */
window.STUDY_TMPL = {
  module: function (num, title, total) {
    return (
      '<div class="module-head">' +
      '<span class="module-head__num">Part ' +
      num +
      " / " +
      total +
      "</span>" +
      '<span class="module-head__title">' +
      title +
      "</span></div>"
    );
  },
  /** 영문 용어 — 도메인 맥락만 짧게 (본문 인라인용) */
  en: function (english, korean) {
    if (!korean) {
      return '<span class="term-en"><strong>' + english + "</strong></span>";
    }
    return (
      '<span class="term-en" title="' +
      korean +
      '"><strong>' +
      english +
      '</strong> <span class="term-ko">(' +
      korean +
      ")</span></span>"
    );
  },
  goal: function (items) {
    var lis = (items || [])
      .map(function (t) {
        return "<li>" + t + "</li>";
      })
      .join("");
    return (
      '<div class="page-goal">' +
      '<strong class="page-goal__title">학습 목표</strong>' +
      '<p class="page-goal__sub">이 페이지를 마친 뒤 아래 항목을 설명하거나 직접 실행할 수 있어야 합니다.</p>' +
      '<ul class="page-goal__list">' +
      lis +
      "</ul></div>"
    );
  },
  prereq: function (items) {
    var lis = (items || [])
      .map(function (t) {
        return "<li>" + t + "</li>";
      })
      .join("");
    return (
      '<div class="block-prereq">' +
      '<strong class="block-prereq__title">선수 지식</strong>' +
      '<ul class="study-ul">' +
      lis +
      "</ul></div>"
    );
  },
  /** 한 문장 = 한 단락 (줄바꿈·가독성용) */
  paras: function (items) {
    return (items || [])
      .map(function (t) {
        return '<p class="study-p">' + t + "</p>";
      })
      .join("");
  },
  concept: function (title, body) {
    return (
      '<div class="block-concept">' +
      '<strong class="block-concept__title">' +
      title +
      "</strong>" +
      '<div class="block-concept__body">' +
      body +
      "</div></div>"
    );
  },
  glossary: function (rows) {
    var trs = (rows || [])
      .map(function (r) {
        var th = r[0];
        var ko = r[2] || "";
        if (ko) {
          th = r[0] + ' <span class="term-ko">(' + ko + ")</span>";
        }
        return "<tr><th>" + th + "</th><td>" + r[1] + "</td></tr>";
      })
      .join("");
    return (
      '<div class="block-glossary">' +
      '<strong class="block-glossary__title">용어 정의</strong>' +
      '<p class="block-glossary__sub">영문 용어는 프로젝트 맥락에서의 뜻을 설명합니다. 코드·명령어는 원문 그대로 사용합니다.</p>' +
      '<table class="study-table study-table--glossary">' +
      trs +
      "</table></div>"
    );
  },
  pitfalls: function (items) {
    var lis = (items || [])
      .map(function (t) {
        return "<li>" + t + "</li>";
      })
      .join("");
    return (
      '<div class="block-pitfalls">' +
      '<strong class="block-pitfalls__title">주의 · 흔한 오해</strong>' +
      '<ul class="study-ul">' +
      lis +
      "</ul></div>"
    );
  },
  checkpoint: function (question) {
    return (
      '<div class="block-checkpoint">' +
      '<strong class="block-checkpoint__title">이해 점검</strong>' +
      "<p>" +
      question +
      "</p></div>"
    );
  },
  recap: function (text) {
    return (
      '<div class="block-recap">' +
      '<strong class="block-recap__title">요약</strong>' +
      "<p>" +
      text +
      "</p></div>"
    );
  },
  tip: function (text) {
    return '<div class="callout callout--tip"><strong>참고</strong>' + text + "</div>";
  },
  warn: function (text) {
    return '<div class="callout callout--warn"><strong>주의</strong>' + text + "</div>";
  },
  exercise: function (title, code, explain) {
    return (
      '<div class="lab-step">' +
      '<p class="lab-step__label">실습</p>' +
      "<p><strong>" +
      title +
      "</strong></p>" +
      '<pre class="study-code">' +
      code +
      "</pre>" +
      (explain ? '<p class="study-p lab-step__note">' + explain + "</p>" : "") +
      "</div>"
    );
  },
  lab: function (title, code, explain) {
    return window.STUDY_TMPL.exercise(title, code, explain);
  },
  /** 학습 후 직접 해 보기 — study-demos.js (본문·용어 다음, 요약 직전) */
  demo: function (type, caption) {
    return (
      '<div class="study-demo-wrap">' +
      '<p class="study-demo-wrap__label">직접 해 보기</p>' +
      '<p class="study-demo-wrap__sub">위에서 읽은 내용을 아래에서 동작으로 확인합니다.</p>' +
      (caption ? '<p class="study-demo-wrap__cap">' + caption + "</p>" : "") +
      '<div class="study-demo" data-demo="' +
      type +
      '"></div></div>'
    );
  },
  seeAlso: function (links) {
    var lis = (links || [])
      .map(function (l) {
        return '<li><a href="' + l[1] + '">' + l[0] + "</a></li>";
      })
      .join("");
    return (
      '<div class="block-seealso">' +
      '<strong class="block-seealso__title">관련 항목</strong>' +
      '<ul class="study-ul">' +
      lis +
      "</ul></div>"
    );
  },
  /* 하위 호환 */
  section: function (part, total) {
    var names = ["", "기초", "데이터 파이프라인", "웹·운영", "실습·검증", "소스 코드"];
    return window.STUDY_TMPL.module(part, names[part] || "", total);
  },
  analogy: function (title, body) {
    return window.STUDY_TMPL.concept(title, "<p>" + body + "</p>");
  },
  confusion: function (items) {
    return window.STUDY_TMPL.pitfalls(items);
  },
};