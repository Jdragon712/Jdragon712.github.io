/* global window, document */
/**
 * 교재 직접 해 보기 데모
 * 챕터 렌더 후 data-demo 속성으로 자동 부트
 */
(function () {
  "use strict";

  var timers = [];

  function later(fn, ms) {
    var id = window.setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function clearTimers() {
    timers.forEach(function (id) {
      window.clearTimeout(id);
    });
    timers = [];
  }

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function btn(label, onClick, cls) {
    var b = el("button", "demo-btn" + (cls ? " " + cls : ""), label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  /* ── Terminal 시뮬레이터 ── */
  function initTerminalSim(root) {
    var cwd = "/Users/student";
    var screen = el("div", "demo-term__screen");
    var inputRow = el("div", "demo-term__input-row");
    var prompt = el("span", "demo-term__prompt", "student@mac " + cwd + " % ");
    var input = el("input", "demo-term__input");
    input.type = "text";
    input.setAttribute("aria-label", "터미널 명령 입력");
    input.placeholder = "pwd, ls, cd …";
    inputRow.appendChild(prompt);
    inputRow.appendChild(input);

    function println(text, cls) {
      var line = el("div", "demo-term__line" + (cls ? " " + cls : ""), text);
      screen.appendChild(line);
      screen.scrollTop = screen.scrollHeight;
    }

    function runCommand(raw) {
      var cmd = (raw || "").trim();
      if (!cmd) return;
      println(prompt.textContent + cmd, "demo-term__line--cmd");
      var parts = cmd.split(/\s+/);
      var op = parts[0];
      if (op === "pwd") {
        println(cwd);
      } else if (op === "ls") {
        println("docs  data  scripts  web  README.md");
      } else if (op === "cd" && parts[1] === "~") {
        cwd = "/Users/student";
        prompt.textContent = "student@mac " + cwd + " % ";
        println("(홈 디렉터리로 이동했습니다)");
      } else if (op === "cd" && parts[1]) {
        var target = parts[1].replace(/^~/, "/Users/student");
        cwd = target;
        prompt.textContent = "student@mac " + cwd + " % ";
        println("(디렉터리를 변경했습니다)");
      } else if (op === "cat" && parts[1] && parts[1].indexOf("manifest") >= 0) {
        println('{ "data_as_of": "2026-05-31", "record_count": 142 }', "demo-term__line--json");
      } else {
        println("zsh: command not found: " + op, "demo-term__line--err");
      }
    }

    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        runCommand(input.value);
        input.value = "";
      }
    });

    var chips = el("div", "demo-term__chips");
    ["pwd", "ls", "cd ~", "cat data/export/manifest.json"].forEach(function (c) {
      chips.appendChild(
        btn(c, function () {
          input.value = c;
          runCommand(c);
          input.value = "";
        }, "demo-btn--chip")
      );
    });

    root.appendChild(screen);
    root.appendChild(inputRow);
    root.appendChild(chips);
    println("명령을 입력하거나 아래 버튼을 눌러 동작을 확인해 보세요.", "demo-term__line--hint");
  }

  /* ── ETL 파이프라인 애니메이션 ── */
  function initPipelineFlow(root) {
    var steps = [
      { n: 1, name: "fetch", out: "raw/" },
      { n: 2, name: "normalize", out: "line items" },
      { n: 3, name: "aggregate", out: "visit_count" },
      { n: 4, name: "match", out: "venue_matches" },
      { n: 5, name: "export", out: "public JSON" },
      { n: 6, name: "geocode", out: "좌표" },
      { n: 7, name: "sync", out: "web/data" },
      { n: 8, name: "verify", out: "OK" },
    ];
    var track = el("div", "demo-pipe__track");
    var nodes = [];
    steps.forEach(function (s, i) {
      var node = el(
        "div",
        "demo-pipe__step",
        '<span class="demo-pipe__num">' + s.n + "</span>" +
          '<span class="demo-pipe__name">' + s.name + "</span>" +
          '<span class="demo-pipe__out">' + s.out + "</span>"
      );
      track.appendChild(node);
      nodes.push(node);
      if (i < steps.length - 1) track.appendChild(el("div", "demo-pipe__arrow", "→"));
    });
    var packet = el("div", "demo-pipe__packet", "📦");
    var log = el("div", "demo-pipe__log", "「파이프라인 실행」을 누르면 데이터 묶음이 단계를 따라 이동합니다.");
    var running = false;

    function setStep(idx, state) {
      nodes.forEach(function (n, i) {
        n.classList.remove("is-active", "is-done");
        if (state === "active" && i === idx) n.classList.add("is-active");
        if (state === "done" && i <= idx) n.classList.add(i === idx ? "is-active" : "is-done");
      });
    }

    function runPipeline() {
      if (running) return;
      running = true;
      packet.style.opacity = "1";
      var i = 0;
      function tick() {
        if (i >= steps.length) {
          log.textContent = "✓ 파이프라인 완료 — web/data JSON이 갱신되었습니다. 이제 브라우저에서 지도를 새로고침합니다.";
          running = false;
          return;
        }
        setStep(i, "done");
        log.textContent = "[" + steps[i].n + "/8] " + steps[i].name + " 실행 중… → " + steps[i].out;
        var pct = (i / (steps.length - 1)) * 100;
        packet.style.left = "calc(" + pct + "% - 12px)";
        i += 1;
        later(tick, 750);
      }
      nodes.forEach(function (n) {
        n.classList.remove("is-active", "is-done");
      });
      packet.style.left = "0";
      tick();
    }

    var controls = el("div", "demo-pipe__controls");
    controls.appendChild(btn("▶ 파이프라인 실행", runPipeline, "demo-btn--primary"));
    controls.appendChild(
      btn("처음부터", function () {
        running = false;
        nodes.forEach(function (n) {
          n.classList.remove("is-active", "is-done");
        });
        packet.style.left = "0";
        log.textContent = "초기화되었습니다. 다시 실행해 보세요.";
      }, "demo-btn--ghost")
    );

    var stage = el("div", "demo-pipe__stage");
    stage.appendChild(track);
    stage.appendChild(packet);
    root.appendChild(stage);
    root.appendChild(controls);
    root.appendChild(log);
  }

  /* ── 데이터 레이어 흐름 ── */
  function initDataLayers(root) {
    var layers = [
      { id: "raw", label: "data/raw/", desc: "원본 엑셀", icon: "📥" },
      { id: "processed", label: "processed/", desc: "parquet", icon: "⚙️" },
      { id: "export", label: "export/", desc: "공개 JSON", icon: "📄" },
      { id: "web", label: "web/data/", desc: "지도가 읽음", icon: "🗺️" },
    ];
    var row = el("div", "demo-layers__row");
    var boxes = {};
    layers.forEach(function (L, i) {
      var box = el(
        "div",
        "demo-layers__box",
        '<span class="demo-layers__icon">' + L.icon + "</span>" +
          "<strong>" + L.label + "</strong><span>" + L.desc + "</span>"
      );
      boxes[L.id] = box;
      row.appendChild(box);
      if (i < layers.length - 1) row.appendChild(el("div", "demo-layers__conn", "→"));
    });
    var flyer = el("div", "demo-layers__flyer", "📦");
    flyer.style.display = "none";
    var browser = el("div", "demo-layers__browser", "🌐 브라우저 — JSON을 fetch합니다");
    var status = el("p", "demo-layers__status", "단계 버튼을 눌러 데이터가 어디로 이동하는지 확인합니다.");
    var step = 0;

    function flyTo(targetId, msg, next) {
      var target = boxes[targetId];
      if (!target) return;
      Object.keys(boxes).forEach(function (k) {
        boxes[k].classList.remove("is-hot");
      });
      target.classList.add("is-hot");
      var rect = root.getBoundingClientRect();
      var tRect = target.getBoundingClientRect();
      flyer.style.display = "block";
      flyer.style.left = tRect.left - rect.left + tRect.width / 2 - 14 + "px";
      flyer.style.top = tRect.top - rect.top - 8 + "px";
      flyer.classList.add("is-landed");
      later(function () {
        flyer.classList.remove("is-landed");
      }, 400);
      status.textContent = msg;
      if (next) later(next, 600);
    }

    var controls = el("div", "demo-layers__controls");
    controls.appendChild(
      btn("1. fetch (수집)", function () {
        step = 1;
        browser.classList.remove("is-live");
        flyTo("raw", "게시판에서 받은 엑셀이 raw/에 저장되었습니다.");
      })
    );
    controls.appendChild(
      btn("2. ETL (가공)", function () {
        if (step < 1) {
          status.textContent = "먼저 fetch(수집)을 실행하세요.";
          return;
        }
        flyTo("processed", "Python이 raw를 읽어 parquet로 변환합니다.", function () {
          flyTo("export", "집계·매칭 후 공개 JSON이 export/에 생성됩니다.");
        });
        step = 2;
      })
    );
    controls.appendChild(
      btn("3. sync (복사)", function () {
        if (step < 2) {
          status.textContent = "먼저 ETL(가공)까지 진행하세요.";
          return;
        }
        flyTo("web", "export JSON이 web/data/로 복사되었습니다.", function () {
          browser.classList.add("is-live");
          status.textContent = "✓ 브라우저가 web/data/restaurants.map.json을 읽어 지도가 갱신됩니다!";
        });
        step = 3;
      })
    );

    root.appendChild(row);
    root.appendChild(flyer);
    root.appendChild(controls);
    root.appendChild(browser);
    root.appendChild(status);
  }

  /* ── HTML / CSS / JS 3계층 ── */
  function initWebStack(root) {
    var preview = el("div", "demo-webstack__preview");
    var mapBox = el("div", "demo-webstack__map", "");
    mapBox.id = "demo-map-box";
    var drawer = el("div", "demo-webstack__drawer is-hidden", "<strong>○○식당</strong><br>방문 24회");
    var marker = el("button", "demo-webstack__marker", "📍");
    marker.type = "button";
    mapBox.appendChild(marker);
    preview.appendChild(mapBox);
    preview.appendChild(drawer);

    var layers = { html: false, css: false, js: false };
    var code = el("pre", "demo-webstack__code", "");

    function refresh() {
      preview.className = "demo-webstack__preview";
      drawer.classList.add("is-hidden");
      marker.disabled = true;
      var lines = [];
      if (layers.html) {
        preview.classList.add("has-html");
        lines.push("&lt;div id=\"map\"&gt; … &lt;/div&gt;");
        lines.push("&lt;div id=\"drawer\"&gt; … &lt;/div&gt;");
      }
      if (layers.css) {
        preview.classList.add("has-css");
        lines.push("#map { background: … }");
        lines.push(".marker { color: blue; }");
      }
      if (layers.js) {
        preview.classList.add("has-js");
        marker.disabled = false;
        lines.push("marker.onclick = () => openDrawer()");
      }
      code.innerHTML = lines.length ? lines.join("\n") : "// 레이어를 켜 보세요";
    }

    marker.addEventListener("click", function () {
      if (layers.js) drawer.classList.remove("is-hidden");
    });

    var toggles = el("div", "demo-webstack__toggles");
    ["html", "css", "js"].forEach(function (key) {
      var label = key.toUpperCase();
      var t = btn(label + " 켜기", function () {
        layers[key] = !layers[key];
        t.textContent = (layers[key] ? "✓ " : "") + label + (layers[key] ? " ON" : " 켜기");
        t.classList.toggle("is-on", layers[key]);
        refresh();
      }, "demo-btn--toggle");
      toggles.appendChild(t);
    });

    root.appendChild(toggles);
    root.appendChild(preview);
    root.appendChild(code);
    refresh();
  }

  /* ── 마커 필터 (방문 횟수) ── */
  function initMarkerFilter(root) {
    var venues = [
      { name: "세종한식당", visits: 28, x: 22, y: 35 },
      { name: "청사식당", visits: 15, x: 55, y: 48 },
      { name: "조은밥상", visits: 9, x: 38, y: 62 },
      { name: "마트식당", visits: 22, x: 72, y: 30, retail: true },
      { name: "정부세종식당", visits: 41, x: 48, y: 22 },
    ];
    var minVisits = 10;
    var map = el("div", "demo-markers__map");
    var list = el("ul", "demo-markers__list");
    var slider = el("input", "demo-markers__slider");
    slider.type = "range";
    slider.min = "1";
    slider.max = "20";
    slider.value = "10";
    var label = el("p", "demo-markers__label", "MIN_MAP_VISITS = 10 — 이상만 지도에 표시");

    function tierColor(v) {
      if (v >= 30) return "tier-5";
      if (v >= 20) return "tier-4";
      if (v >= 15) return "tier-3";
      if (v >= 12) return "tier-2";
      return "tier-1";
    }

    function render() {
      map.innerHTML = "";
      list.innerHTML = "";
      venues.forEach(function (v) {
        var show = v.visits >= minVisits && !v.retail;
        var li = el(
          "li",
          "demo-markers__item" + (show ? " is-on" : " is-off"),
          v.name + " — " + v.visits + "회" + (v.retail ? " (마트·제외)" : "")
        );
        list.appendChild(li);
        if (show) {
          var pin = el("button", "demo-markers__pin " + tierColor(v.visits), "●");
          pin.type = "button";
          pin.style.left = v.x + "%";
          pin.style.top = v.y + "%";
          pin.title = v.name + " (" + v.visits + "회)";
          map.appendChild(pin);
        }
      });
      label.textContent =
        "MIN_MAP_VISITS = " + minVisits + " — " + minVisits + "회 이상만 지도에 표시 (마트는 항상 제외)";
    }

    slider.addEventListener("input", function () {
      minVisits = parseInt(slider.value, 10);
      render();
    });

    root.appendChild(label);
    root.appendChild(slider);
    root.appendChild(map);
    root.appendChild(list);
    render();
  }

  /* ── JSON → 지도 ── */
  function initJsonMap(root) {
    var data = [
      { name: "세종한식당", visits: 28, lat: 36.48 },
      { name: "청사식당", visits: 15, lat: 36.51 },
      { name: "조은밥상", visits: 9, lat: 36.49 },
    ];
    var jsonEl = el("pre", "demo-jsonmap__json");
    var map = el("div", "demo-jsonmap__map");
    var status = el("p", "demo-jsonmap__status", "JSON 레코드를 클릭하면 지도 마커가 강조됩니다.");

    function renderJson(highlight) {
      var lines = data.map(function (r, i) {
        var cls = i === highlight ? "demo-jsonmap__hl" : "";
        return (
          '<span class="' + cls + '" data-idx="' + i + '">{ "name": "' + r.name + '", "visit_count_total": ' + r.visits + " }</span>"
        );
      });
      jsonEl.innerHTML = "[\n  " + lines.join(",\n  ") + "\n]";
      jsonEl.querySelectorAll("[data-idx]").forEach(function (span) {
        span.addEventListener("click", function () {
          var idx = parseInt(span.getAttribute("data-idx"), 10);
          pick(idx);
        });
      });
    }

    function pick(idx) {
      map.innerHTML = "";
      data.forEach(function (r, i) {
        if (r.visits < 10) return;
        var pin = el("div", "demo-jsonmap__pin" + (i === idx ? " is-active" : ""), "●");
        pin.style.left = 15 + i * 28 + "%";
        pin.style.top = 30 + (i % 2) * 25 + "%";
        map.appendChild(pin);
      });
      renderJson(idx);
      status.textContent = "fetch() → JSON.parse() → 「" + data[idx].name + "」 마커 강조";
    }

    root.appendChild(jsonEl);
    root.appendChild(map);
    root.appendChild(status);
    pick(0);
  }

  /* ── 헤더 별칭 매핑 ── */
  function initAliasMap(root) {
    var sources = ["집행장소", "사용처", "업소명", "상호"];
    var target = "venue_name";
    var srcRow = el("div", "demo-alias__sources");
    var tgt = el("div", "demo-alias__target", "<span>표준 필드</span><strong>" + target + "</strong>");
    var svg = el("div", "demo-alias__lines");
    var idx = 0;

    function pulse() {
      srcRow.querySelectorAll(".demo-alias__chip").forEach(function (c, i) {
        c.classList.toggle("is-active", i === idx);
      });
      tgt.classList.add("is-pulse");
      later(function () {
        tgt.classList.remove("is-pulse");
      }, 500);
      idx = (idx + 1) % sources.length;
    }

    sources.forEach(function (s) {
      srcRow.appendChild(el("div", "demo-alias__chip", s));
    });

    var controls = el("div", "demo-alias__controls");
    controls.appendChild(btn("▶ 다음 헤더 매핑", pulse, "demo-btn--primary"));
    controls.appendChild(
      btn("자동 재생", function auto() {
        pulse();
        later(auto, 1200);
      }, "demo-btn--ghost")
    );

    root.appendChild(el("p", "demo-alias__hint", "기관마다 다른 열 이름이 _resolve_field()로 venue_name에 매핑됩니다."));
    root.appendChild(srcRow);
    root.appendChild(svg);
    root.appendChild(tgt);
    root.appendChild(controls);
  }

  /* ── sync 파일 복사 ── */
  function initSyncCopy(root) {
    var files = ["restaurants.map.json", "restaurants.public.json", "manifest.json"];
    var from = el("div", "demo-sync__from", "<strong>data/export/</strong>");
    var to = el("div", "demo-sync__to", "<strong>web/data/</strong>");
    var status = el("p", "demo-sync__status", "sync_web_data.py — export → web/data 복사");
    var running = false;

    function buildFile(name, side) {
      return el("div", "demo-sync__file demo-sync__file--" + side, "📄 " + name);
    }

    function runSync() {
      if (running) return;
      running = true;
      from.innerHTML = "<strong>data/export/</strong>";
      to.innerHTML = "<strong>web/data/</strong>";
      var i = 0;
      function next() {
        if (i >= files.length) {
          status.textContent = "✓ 3개 파일 복사 완료 — 브라우저가 web/data/를 읽습니다.";
          running = false;
          return;
        }
        var name = files[i];
        from.appendChild(buildFile(name, "from"));
        status.textContent = "shutil.copy2(export/" + name + " → web/data/" + name + ")";
        later(function () {
          var f = buildFile(name, "to");
          f.classList.add("is-arrive");
          to.appendChild(f);
          i += 1;
          next();
        }, 700);
      }
      next();
    }

    var controls = btn("▶ sync 실행", runSync, "demo-btn--primary");
    var row = el("div", "demo-sync__row");
    row.appendChild(from);
    row.appendChild(el("div", "demo-sync__arrow", "⇒"));
    row.appendChild(to);
    root.appendChild(row);
    root.appendChild(controls);
    root.appendChild(status);
  }

  /* ── 폴더 탐색 (cd / ls) ── */
  function initFolderExplorer(root) {
    var fs = {
      "~": {
        project: {
          type: "dir",
          children: {
            data: {
              type: "dir",
              children: { raw: { type: "dir", children: {} }, export: { type: "dir", children: {} } },
            },
            scripts: { type: "dir", children: { "normalize_expense.py": { type: "file" } } },
            web: { type: "dir", children: { data: { type: "dir", children: {} }, "index.html": { type: "file" } } },
            "README.md": { type: "file" },
          },
        },
      },
    };
    var cwd = ["~", "project"];
    var pathEl = el("p", "demo-folder__path", "");
    var list = el("div", "demo-folder__list");
    var status = el("p", "demo-folder__status", "폴더를 클릭해 이동하고, ls로 목록을 확인합니다.");

    function pathStr() {
      return cwd.join("/").replace("~/", "~/");
    }

    function nodeAt() {
      var n = fs;
      for (var i = 0; i < cwd.length; i++) {
        var key = cwd[i];
        if (i === 0) n = n[key];
        else n = n.children[key];
      }
      return n;
    }

    function render() {
      pathEl.textContent = pathStr();
      list.innerHTML = "";
      var cur = nodeAt();
      if (!cur.children) return;
      Object.keys(cur.children).forEach(function (name) {
        var item = cur.children[name];
        var row = el(
          "button",
          "demo-folder__item" + (item.type === "dir" ? " is-dir" : " is-file"),
          (item.type === "dir" ? "📁 " : "📄 ") + name
        );
        row.type = "button";
        if (item.type === "dir") {
          row.addEventListener("click", function () {
            cwd.push(name);
            status.textContent = "cd " + name + " — 하위 폴더로 이동했습니다.";
            render();
          });
        } else {
          row.addEventListener("click", function () {
            status.textContent = "cat " + name + " — 파일 내용은 실제 터미널에서 확인합니다.";
          });
        }
        list.appendChild(row);
      });
    }

    var controls = el("div", "demo-folder__controls");
    controls.appendChild(
      btn("cd ..", function () {
        if (cwd.length > 2) {
          cwd.pop();
          status.textContent = "상위 폴더로 이동했습니다.";
          render();
        } else {
          status.textContent = "이미 프로젝트 루트입니다.";
        }
      })
    );
    controls.appendChild(
      btn("ls", function () {
        var names = Object.keys(nodeAt().children || {});
        status.textContent = names.join("  ");
      })
    );
    controls.appendChild(
      btn("cd ~", function () {
        cwd = ["~", "project"];
        status.textContent = "홈(프로젝트 루트)으로 이동했습니다.";
        render();
      }, "demo-btn--ghost")
    );

    root.appendChild(pathEl);
    root.appendChild(list);
    root.appendChild(controls);
    root.appendChild(status);
    render();
  }

  /* ── venv 격리 ── */
  function initVenvSim(root) {
    var active = false;
    var sysBox = el("div", "demo-venv__box demo-venv__box--sys");
    var venvBox = el("div", "demo-venv__box demo-venv__box--venv");
    var status = el("p", "demo-venv__status", "source scripts/ensure_venv.sh 로 venv를 활성화해 보세요.");

    function paint() {
      sysBox.innerHTML =
        "<strong>시스템 Python</strong>" +
        '<span class="demo-venv__path">/usr/bin/python3</span>' +
        '<span class="demo-venv__pkg">pandas ✗ · requests ✗</span>';
      venvBox.innerHTML =
        "<strong>프로젝트 .venv</strong>" +
        '<span class="demo-venv__path">.venv/bin/python</span>' +
        '<span class="demo-venv__pkg">pandas ✓ · requests ✓</span>';
      sysBox.classList.toggle("is-active", !active);
      venvBox.classList.toggle("is-active", active);
      status.textContent = active
        ? "✓ venv 활성화 — pip install이 프로젝트에만 적용됩니다."
        : "비활성 — 시스템 Python을 사용 중입니다. doctor가 NG를 보고할 수 있습니다.";
    }

    var toggleBtn;
    var controls = el("div", "demo-venv__controls");
    toggleBtn = btn("source ensure_venv.sh", function () {
      active = !active;
      toggleBtn.textContent = active ? "deactivate" : "source ensure_venv.sh";
      paint();
    });
    controls.appendChild(toggleBtn);

    var row = el("div", "demo-venv__row");
    row.appendChild(sysBox);
    row.appendChild(el("div", "demo-venv__arrow", "⇄"));
    row.appendChild(venvBox);
    root.appendChild(row);
    root.appendChild(controls);
    root.appendChild(status);
    paint();
  }

  /* ── export 린트 ── */
  function initExportLint(root) {
    var samples = {
      bad: '{\n  "name": "세종한식당",\n  "visit_count_total": 24,\n  "amount_krw": 15000\n}',
      good: '{\n  "name": "세종한식당",\n  "visit_count_total": 24,\n  "lat": 36.48,\n  "lng": 127.26\n}',
    };
    var forbidden = ["amount", "price", "salary", "user_label"];
    var pre = el("pre", "demo-lint__json");
    var verdict = el("p", "demo-lint__verdict", "샘플을 선택한 뒤 린트를 실행하세요.");
    var current = "bad";

    function show(which) {
      current = which;
      pre.textContent = samples[which];
      pre.className = "demo-lint__json demo-lint__json--" + which;
      verdict.textContent = "";
    }

    var tabs = el("div", "demo-lint__tabs");
    tabs.appendChild(
      btn("금지 키 포함", function () {
        show("bad");
      }, "demo-btn--chip")
    );
    tabs.appendChild(
      btn("정상 JSON", function () {
        show("good");
      }, "demo-btn--chip")
    );

    var controls = btn(
      "▶ export_public 린트 실행",
      function () {
        var text = samples[current];
        var hit = forbidden.filter(function (f) {
          return text.indexOf(f) >= 0;
        });
        if (hit.length) {
          verdict.innerHTML =
            '<span class="demo-lint__ng">NG</span> FORBIDDEN 키 감지: <code>' +
            hit.join(", ") +
            "</code> — 저장이 중단됩니다.";
          pre.classList.add("is-fail");
        } else {
          verdict.innerHTML = '<span class="demo-lint__ok">OK</span> 금지 패턴 없음 — data/export/에 저장됩니다.';
          pre.classList.remove("is-fail");
          pre.classList.add("is-pass");
          later(function () {
            pre.classList.remove("is-pass");
          }, 1200);
        }
      },
      "demo-btn--primary"
    );

    root.appendChild(tabs);
    root.appendChild(pre);
    root.appendChild(controls);
    root.appendChild(verdict);
    show("bad");
  }

  /* ── geocode ── */
  function initGeocodeSim(root) {
    var addresses = [
      { addr: "세종특별자치시 한누리대로 2130", lat: 36.480, lng: 127.289, x: 42, y: 38 },
      { addr: "세종시 조치원읍 세종로 123", lat: 36.601, lng: 127.298, x: 58, y: 55 },
      { addr: "세종시 나성동 정부세종청사", lat: 36.500, lng: 127.259, x: 35, y: 28 },
    ];
    var idx = 0;
    var input = el("input", "demo-geo__input");
    input.type = "text";
    input.value = addresses[0].addr;
    input.setAttribute("aria-label", "주소 입력");
    var coords = el("div", "demo-geo__coords", "lat: —  lng: —");
    var map = el("div", "demo-geo__map");
    var pin = el("div", "demo-geo__pin", "📍");
    pin.style.display = "none";
    map.appendChild(pin);
    var status = el("p", "demo-geo__status", "주소를 선택하거나 입력한 뒤 geocode를 실행하세요.");

    function place(i) {
      var a = addresses[i];
      pin.style.display = "block";
      pin.style.left = a.x + "%";
      pin.style.top = a.y + "%";
      pin.classList.add("is-drop");
      later(function () {
        pin.classList.remove("is-drop");
      }, 500);
      coords.textContent = "lat: " + a.lat + "  lng: " + a.lng;
      status.textContent = "Kakao REST → 좌표 변환 완료. restaurants.map.json에 기록됩니다.";
    }

    var chips = el("div", "demo-geo__chips");
    addresses.forEach(function (a, i) {
      chips.appendChild(
        btn(a.addr.slice(0, 14) + "…", function () {
          idx = i;
          input.value = a.addr;
        }, "demo-btn--chip")
      );
    });

    var run = btn(
      "▶ geocode_venues.py",
      function () {
        coords.textContent = "조회 중…";
        status.textContent = "Kakao REST API 호출 중…";
        later(function () {
          place(idx);
        }, 650);
      },
      "demo-btn--primary"
    );

    root.appendChild(input);
    root.appendChild(chips);
    root.appendChild(run);
    root.appendChild(coords);
    root.appendChild(map);
    root.appendChild(status);
  }

  /* ── enhance 6단계 ── */
  function initEnhanceSteps(root) {
    var steps = [
      { n: 1, name: "normalize", out: "parquet" },
      { n: 2, name: "geocode", out: "좌표" },
      { n: 3, name: "aggregate", out: "visit_count" },
      { n: 4, name: "export", out: "public JSON" },
      { n: 5, name: "lint", out: "FORBIDDEN 검사" },
      { n: 6, name: "sync", out: "web/data" },
    ];
    var log = el("pre", "demo-enhance__log", "$ bash ~/hermes-restaurant-enhance.sh\n");
    var bar = el("div", "demo-enhance__bar");
    var fills = [];
    steps.forEach(function (s) {
      var seg = el("div", "demo-enhance__seg", "[" + s.n + "/6] " + s.name);
      bar.appendChild(seg);
      fills.push(seg);
    });
    var running = false;

    function run() {
      if (running) return;
      running = true;
      log.textContent = "$ bash ~/hermes-restaurant-enhance.sh\n";
      fills.forEach(function (f) {
        f.classList.remove("is-done", "is-active");
      });
      var i = 0;
      function tick() {
        if (i >= steps.length) {
          log.textContent += "\n✓ [6/6] 완료 — manifest·지도를 확인하세요.";
          running = false;
          return;
        }
        fills.forEach(function (f, j) {
          f.classList.remove("is-active");
          if (j < i) f.classList.add("is-done");
        });
        fills[i].classList.add("is-active");
        log.textContent += "[" + steps[i].n + "/6] " + steps[i].name + " … → " + steps[i].out + "\n";
        log.scrollTop = log.scrollHeight;
        i += 1;
        later(tick, 800);
      }
      tick();
    }

    root.appendChild(bar);
    root.appendChild(btn("▶ enhance 실행", run, "demo-btn--primary"));
    root.appendChild(log);
  }

  /* ── doctor 진단 ── */
  function initDoctorSim(root) {
    var checks = [
      { id: "venv", label: "Python venv 활성화" },
      { id: "kakao", label: "KAKAO_REST_API_KEY" },
      { id: "export", label: "data/export/manifest.json" },
      { id: "webdata", label: "web/data/restaurants.map.json" },
      { id: "raw", label: "data/raw/expense 비어 있지 않음" },
    ];
    var list = el("ul", "demo-doctor__list");
    var status = el("p", "demo-doctor__status", "진단을 실행하면 doctor 출력 형식을 확인할 수 있습니다.");
    var inject = false;

    function renderResults() {
      list.innerHTML = "";
      var ng = 0;
      checks.forEach(function (c) {
        var pass = !(c.id === "raw" && inject);
        if (!pass) ng += 1;
        var li = el(
          "li",
          "demo-doctor__item" + (pass ? " is-ok" : " is-ng"),
          (pass ? "OK" : "NG") + "  " + c.label
        );
        list.appendChild(li);
      });
      status.textContent =
        ng === 0
          ? "✓ 모든 항목 OK — enhance를 실행할 수 있습니다."
          : ng + "개 NG — 위에서부터 순서대로 해결하세요.";
    }

    var controls = el("div", "demo-doctor__controls");
    controls.appendChild(btn("▶ doctor 실행", renderResults, "demo-btn--primary"));
    controls.appendChild(
      btn(inject ? "문제 제거" : "raw 비움 시뮬", function () {
        inject = !inject;
        controls.querySelectorAll(".demo-btn")[1].textContent = inject ? "문제 제거" : "raw 비움 시뮬";
        status.textContent = inject
          ? "raw 폴더가 비었다고 가정합니다. 실행하면 NG가 표시됩니다."
          : "정상 환경으로 되돌렸습니다.";
      }, "demo-btn--ghost")
    );

    root.appendChild(list);
    root.appendChild(controls);
    root.appendChild(status);
  }

  var REGISTRY = {
    "terminal-sim": initTerminalSim,
    "pipeline-flow": initPipelineFlow,
    "data-layers": initDataLayers,
    "web-stack": initWebStack,
    "marker-filter": initMarkerFilter,
    "json-map": initJsonMap,
    "alias-map": initAliasMap,
    "sync-copy": initSyncCopy,
    "folder-explorer": initFolderExplorer,
    "venv-sim": initVenvSim,
    "export-lint": initExportLint,
    "geocode-sim": initGeocodeSim,
    "enhance-steps": initEnhanceSteps,
    "doctor-sim": initDoctorSim,
  };

  function boot(container) {
    clearTimers();
    if (!container) return;
    container.querySelectorAll(".study-demo[data-demo]").forEach(function (node) {
      var type = node.getAttribute("data-demo");
      var fn = REGISTRY[type];
      if (!fn) return;
      node.innerHTML = "";
      node.classList.add("is-ready");
      fn(node);
    });
  }

  window.STUDY_DEMO_BOOT = boot;
  window.STUDY_DEMO_TEARDOWN = clearTimers;
})();