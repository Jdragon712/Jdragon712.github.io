(function () {
  "use strict";

  var ICONS = {
    github:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    x: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12.6 1h2.45L10.2 6.78 16 15h-4.47L7.5 10.2 3.2 15H.74l5.7-6.52L1 1h4.58l3.28 4.35L12.6 1zm-.86 12.6h1.36L4.4 2.33H3.02l8.72 11.27z"/></svg>',
    arrow:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h8.59L9.3 5.71 10.71 4.3 16 9.59l-5.29 5.29-1.41-1.41L11.59 10H3V8z"/></svg>',
  };

  var state = {
    allProjects: [],
    filter: "all",
    filters: [],
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

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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
    navLinks.innerHTML = "";
    var ai = el("a", {
      className: "nav__ai-pill",
      href: "#projects",
      "aria-label": "프로젝트",
    });
    ai.innerHTML = '<span class="nav__ai-dot"></span>Projects';
    navLinks.appendChild(ai);
  }

  function buildBrandWordmark(brand) {
    var wrap = el("span", { className: "brand-logo__wordmark" });
    var parts = brand.match(/^([A-Z])([A-Za-z]+)(\d+)$/);
    if (parts) {
      wrap.appendChild(el("span", { className: "brand-logo__lead" }, parts[1]));
      wrap.appendChild(el("span", { className: "brand-logo__stem" }, parts[2]));
      wrap.appendChild(el("span", { className: "brand-logo__num" }, parts[3]));
    } else {
      wrap.textContent = brand;
    }
    return wrap;
  }

  function renderBrandMarks(profile) {
    var brand = profile.brand || "JDragon712";
    ["hero-mark", "nav-mark"].forEach(function (id) {
      var node = document.getElementById(id);
      if (!node) return;
      node.innerHTML = "";
      node.appendChild(buildBrandWordmark(brand));
      node.setAttribute("aria-label", brand);
    });
    document.title = profile.pageTitle || brand;
  }

  function renderHero(profile, links) {
    var role = document.getElementById("hero-role");
    var tagline = document.getElementById("hero-tagline");
    var bio = document.getElementById("hero-bio");
    var highlights = document.getElementById("hero-highlights");

    if (role) {
      role.textContent = profile.role || "AI 네이티브 빌더";
    }
    if (tagline) tagline.textContent = profile.tagline;
    if (bio) bio.textContent = profile.bio;

    if (highlights) {
      highlights.innerHTML = "";
      (profile.highlights || []).forEach(function (h) {
        highlights.appendChild(el("li", { className: "hero__highlight" }, escapeHtml(h)));
      });
    }

    renderBrandMarks(profile);
    renderHeroActions(links);
  }

  function renderHeroActions(links) {
    var wrap = document.getElementById("hero-actions");
    if (!wrap) return;
    wrap.innerHTML = "";
    var ghLink = findLink(links, "github");
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

  function statusLabel(status) {
    if (status === "live") return "운영 중";
    if (status === "building") return "앱 개발 중";
    if (status === "intro") return "소개";
    return "준비 중";
  }

  function renderFilters(filters) {
    var bar = document.getElementById("filter-bar");
    if (!bar) return;
    bar.innerHTML = "";
    (filters || [{ id: "all", label: "전체" }]).forEach(function (f) {
      var btn = el("button", {
        type: "button",
        className:
          "filter-chip" + (state.filter === f.id ? " filter-chip--active" : ""),
        "data-filter": f.id,
        role: "tab",
        "aria-selected": state.filter === f.id ? "true" : "false",
      });
      btn.textContent = f.label;
      btn.addEventListener("click", function () {
        state.filter = f.id;
        renderFilters(state.filters);
        renderProjects(state.allProjects);
      });
      bar.appendChild(btn);
    });
  }

  function filteredProjects(projects) {
    if (state.filter === "all") return projects;
    return projects.filter(function (p) {
      return (p.filter || "") === state.filter;
    });
  }

  function renderProjects(projects) {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;
    grid.innerHTML = "";

    var list = filteredProjects(projects);
    if (!list.length) {
      grid.appendChild(
        el(
          "p",
          { className: "projects-empty" },
          "이 분류에 해당하는 프로젝트가 없습니다.",
        ),
      );
      return;
    }

    list.forEach(function (p) {
      var isLive = p.status === "live";
      var statusClass = isLive
        ? "project-card__status"
        : "project-card__status project-card__status--soon";
      var target = p.external ? "_blank" : "_self";
      var rel = p.external ? "noopener noreferrer" : "";

      var card = el("a", {
        className: "project-card" + (p.featured ? " project-card--featured" : ""),
        href: p.href,
        target: target,
        rel: rel,
        style: { "--card-accent": p.accent || "#0071e3" },
      });

      var impact = p.impact
        ? '<p class="project-card__impact">' + escapeHtml(p.impact) + "</p>"
        : "";

      var tags = (p.tags || []).slice(0, 3);

      card.innerHTML =
        '<div class="project-card__top">' +
        '<span class="project-card__category">' +
        escapeHtml(p.category) +
        "</span>" +
        '<span class="' +
        statusClass +
        '">' +
        statusLabel(p.status) +
        "</span>" +
        "</div>" +
        '<h3 class="project-card__title">' +
        escapeHtml(p.title) +
        "</h3>" +
        impact +
        '<p class="project-card__desc">' +
        escapeHtml(p.description) +
        "</p>" +
        '<div class="project-card__tags">' +
        tags
          .map(function (t) {
            return (
              '<span class="project-card__tag">' + escapeHtml(t) + "</span>"
            );
          })
          .join("") +
        "</div>" +
        '<span class="project-card__arrow">열기 ' +
        ICONS.arrow +
        "</span>";

      grid.appendChild(card);
    });
  }

  function renderFooter(profile, links) {
    var copy = document.getElementById("foot-copy");
    var footLinks = document.getElementById("foot-links");
    if (copy) {
      copy.textContent =
        "© " +
        (profile.brand || "JDragon712") +
        " · 업데이트 " +
        profile.updated;
    }
    if (!footLinks) return;
    footLinks.innerHTML = "";
    (links || []).forEach(function (link) {
      footLinks.appendChild(
        el(
          "a",
          {
            className: "foot__link",
            href: link.href,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          link.label,
        ),
      );
    });
  }

  function scrollToTopUnlessHash() {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    requestAnimationFrame(function () {
      window.scrollTo(0, 0);
    });
  }

  function init(data) {
    state.allProjects = data.projects || [];
    state.filters = data.filters || [{ id: "all", label: "전체" }];
    state.filter = "all";
    renderNav(data.links || []);
    renderHero(data.profile, data.links || []);
    renderFilters(state.filters);
    renderProjects(state.allProjects);
    renderFooter(data.profile, data.links || []);
    scrollToTopUnlessHash();
  }

  fetch("data/profile.json?v=2026072708")
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
