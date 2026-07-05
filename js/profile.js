(function () {
  "use strict";

  var ICONS = {
    github:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    x: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12.6 1h2.45L10.2 6.78 16 15h-4.47L7.5 10.2 3.2 15H.74l5.7-6.52L1 1h4.58l3.28 4.35L12.6 1zm-.86 12.6h1.36L4.4 2.33H3.02l8.72 11.27z"/></svg>',
    arrow:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h8.59L9.3 5.71 10.71 4.3 16 9.59l-5.29 5.29-1.41-1.41L11.59 10H3V8z"/></svg>',
  };

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "className") node.className = attrs[k];
        else if (k === "style") Object.assign(node.style, attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function findLink(links, icon) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].icon === icon) return links[i];
    }
    return null;
  }

  function renderNav(links) {
    var navLinks = document.getElementById("nav-links");
    if (!navLinks) return;

    navLinks.appendChild(
      el("a", { className: "nav__link nav__link--text", href: "#projects" }, "프로젝트")
    );

    links.forEach(function (link) {
      var a = el("a", {
        className: "nav__icon-link",
        href: link.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": link.label,
      });
      a.innerHTML = ICONS[link.icon] || link.label;
      navLinks.appendChild(a);
    });
  }

  function renderHero(profile, links) {
    var name = document.getElementById("hero-name");
    var tagline = document.getElementById("hero-tagline");
    var bio = document.getElementById("hero-bio");
    var avatar = document.getElementById("hero-avatar");
    if (name) name.textContent = profile.name;
    if (tagline) tagline.textContent = profile.tagline;
    if (bio) bio.textContent = profile.bio;
    if (avatar) avatar.textContent = profile.name.slice(0, 2).toUpperCase();
    document.title = profile.name + " — AI 네이티브 빌더";

    renderHeroActions(links);
  }

  function renderHeroActions(links) {
    var wrap = document.getElementById("hero-actions");
    if (!wrap) return;
    wrap.innerHTML = "";

    var xLink = findLink(links, "x");
    var ghLink = findLink(links, "github");

    if (xLink) {
      var xBtn = el("a", {
        className: "hero__btn hero__btn--x hero__btn--icon",
        href: xLink.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": xLink.label,
      });
      xBtn.innerHTML = ICONS.x;
      wrap.appendChild(xBtn);
    }

    if (ghLink) {
      var ghBtn = el("a", {
        className: "hero__btn hero__btn--ghost",
        href: ghLink.href,
        target: "_blank",
        rel: "noopener noreferrer",
      });
      ghBtn.innerHTML = ICONS.github + "<span>GitHub</span>";
      wrap.appendChild(ghBtn);
    }
  }

  function renderProjects(projects) {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    grid.innerHTML = "";

    projects.forEach(function (p) {
      var statusClass =
        p.status === "live" ? "project-card__status" : "project-card__status project-card__status--soon";
      var statusLabel = p.status === "live" ? "운영 중" : "준비 중";
      var target = p.external ? "_blank" : "_self";
      var rel = p.external ? "noopener noreferrer" : "";

      var card = el("a", {
        className: "project-card",
        href: p.href,
        target: target,
        rel: rel,
        style: { "--card-accent": p.accent || "#0071e3" },
      });

      card.innerHTML =
        '<div class="project-card__top">' +
        '<span class="project-card__category">' + escapeHtml(p.category) + "</span>" +
        '<span class="' + statusClass + '">' + statusLabel + "</span>" +
        "</div>" +
        "<h3 class=\"project-card__title\">" + escapeHtml(p.title) + "</h3>" +
        "<p class=\"project-card__desc\">" + escapeHtml(p.description) + "</p>" +
        '<div class="project-card__tags">' +
        p.tags.map(function (t) {
          return '<span class="project-card__tag">' + escapeHtml(t) + "</span>";
        }).join("") +
        "</div>" +
        '<span class="project-card__arrow">열기 ' + ICONS.arrow + "</span>";

      grid.appendChild(card);
    });
  }

  function renderFooter(profile, links) {
    var copy = document.getElementById("foot-copy");
    var footLinks = document.getElementById("foot-links");
    if (copy) copy.textContent = "© " + profile.name + " · 업데이트 " + profile.updated;
    if (!footLinks) return;
    footLinks.innerHTML = "";
    links.forEach(function (link) {
      footLinks.appendChild(
        el("a", {
          className: "foot__link",
          href: link.href,
          target: "_blank",
          rel: "noopener noreferrer",
        }, link.label)
      );
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function scrollToTopUnlessHash() {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    requestAnimationFrame(function () {
      window.scrollTo(0, 0);
    });
  }

  function init(data) {
    renderNav(data.links);
    renderHero(data.profile, data.links);
    renderProjects(data.projects);
    renderFooter(data.profile, data.links);
    scrollToTopUnlessHash();
  }

  fetch("data/profile.json")
    .then(function (res) {
      if (!res.ok) throw new Error("profile.json load failed");
      return res.json();
    })
    .then(init)
    .catch(function () {
      var main = document.querySelector(".page");
      if (main) {
        main.innerHTML =
          '<p style="text-align:center;color:#6e6e73;padding:3rem 0;">프로필 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>';
      }
    });
})();