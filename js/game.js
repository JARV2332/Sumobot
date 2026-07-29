(() => {
  const STORAGE_KEY = "sumobot-academy-v1";

  const state = {
    player: null,
    currentWorldId: null,
    currentLessonId: null,
    challenge: {
      qIndex: 0,
      selected: null,
      sortOrder: [],
      match: { picked: null, done: new Set() }
    }
  };

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.player));
  }

  function defaultPlayer(name, colorId) {
    return {
      name,
      colorId,
      lessonsDone: {},
      worldsDone: {},
      parts: {},
      placed: {},
      stars: 0,
      arenaWon: false
    };
  }

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function $all(sel, root = document) {
    return [...root.querySelectorAll(sel)];
  }

  function showScreen(id) {
    $all(".screen").forEach((s) => s.classList.remove("active"));
    const screen = $(`#screen-${id}`);
    if (screen) screen.classList.add("active");

    if (id === "map") renderMap();
    if (id === "workshop") renderWorkshop();
    if (id === "rubric") renderRubric();
    if (id === "diploma") renderDiploma();
  }

  function playerColor() {
    return GAME_DATA.colors.find((c) => c.id === state.player?.colorId) || GAME_DATA.colors[0];
  }

  function worldById(id) {
    return GAME_DATA.worlds.find((w) => w.id === id);
  }

  function isWorldUnlocked(world) {
    if (!world.unlockAfter) return true;
    return !!state.player.worldsDone[world.unlockAfter];
  }

  function lessonsComplete(world) {
    return world.lessons.every((l) => state.player.lessonsDone[`${world.id}:${l.id}`]);
  }

  function partsCount() {
    return Object.keys(state.player.parts).length;
  }

  function updateHud() {
    if (!state.player) return;
    const color = playerColor();
    const av = `${color.emoji}`;
    $("#map-avatar").textContent = av;
    $("#map-avatar").style.background = color.hex;
    $("#map-player-name").textContent = state.player.name;
    $("#stat-parts").textContent = partsCount();
    $("#stat-stars").textContent = state.player.stars;
  }

  /* ---------- Title / Avatar ---------- */
  function initTitle() {
    const saved = load();
    const cont = $("#btn-continue");
    if (saved?.name) {
      cont.hidden = false;
      cont.onclick = () => {
        state.player = saved;
        updateHud();
        showScreen("map");
      };
    } else {
      cont.hidden = true;
    }
    $("#btn-start").onclick = () => showScreen("avatar");
  }

  function initAvatar() {
    const swatches = $("#avatar-swatches");
    swatches.innerHTML = "";
    let selected = GAME_DATA.colors[0].id;

    function paintPreview() {
      const c = GAME_DATA.colors.find((x) => x.id === selected);
      const preview = $("#avatar-preview");
      preview.style.background = c.hex;
      preview.textContent = c.emoji;
    }

    GAME_DATA.colors.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "swatch" + (c.id === selected ? " selected" : "");
      b.style.background = c.hex;
      b.title = c.id;
      b.onclick = () => {
        selected = c.id;
        $all(".swatch").forEach((s) => s.classList.remove("selected"));
        b.classList.add("selected");
        paintPreview();
      };
      swatches.appendChild(b);
    });
    paintPreview();

    $("#btn-save-avatar").onclick = () => {
      const name = ($("#avatar-name").value || "").trim().slice(0, 16);
      if (!name) {
        $("#avatar-name").focus();
        $("#avatar-name").placeholder = "¡Escribe tu nombre!";
        return;
      }
      state.player = defaultPlayer(name, selected);
      save();
      updateHud();
      showScreen("map");
    };
  }

  /* ---------- Map ---------- */
  function renderMap() {
    updateHud();
    const map = $("#world-map");
    map.innerHTML = "";

    GAME_DATA.worlds.forEach((world, i) => {
      if (i > 0) {
        const dot = document.createElement("div");
        dot.className = "path-dot";
        dot.style.gridColumn = "1 / -1";
        map.appendChild(dot);
      }

      const unlocked = isWorldUnlocked(world);
      const done = !!state.player.worldsDone[world.id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "world-node" + (unlocked ? "" : " locked") + (done ? " done" : "");
      btn.innerHTML = `
        <div class="node-icon" style="background:${world.color}">${world.icon}</div>
        <div class="node-info">
          <h3>${world.order}. ${world.title}</h3>
          <p>${world.short}</p>
        </div>
        <div class="node-meta">${done ? "⭐⭐⭐" : unlocked ? "Abrir" : "🔒"}</div>
      `;
      btn.onclick = () => {
        if (!unlocked) return;
        openWorld(world.id);
      };
      map.appendChild(btn);
    });
  }

  function openWorld(id) {
    state.currentWorldId = id;
    const world = worldById(id);
    $("#world-title").textContent = world.title;
    $("#world-banner").style.background = world.color;
    $("#world-banner").textContent = world.icon;
    $("#world-story").textContent = world.story;

    const list = $("#lesson-list");
    list.innerHTML = "";
    world.lessons.forEach((lesson) => {
      const key = `${world.id}:${lesson.id}`;
      const done = !!state.player.lessonsDone[key];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "lesson-card" + (done ? " done" : "");
      card.innerHTML = `
        <span class="lc-ico">${lesson.icon}</span>
        <span class="lc-text"><strong>${lesson.title}</strong><span>Lección</span></span>
        <span class="lc-check">${done ? "✓" : "›"}</span>
      `;
      card.onclick = () => openLesson(world.id, lesson.id);
      list.appendChild(card);
    });

    const challengeBtn = $("#btn-start-challenge");
    const ready = lessonsComplete(world);
    const already = !!state.player.worldsDone[world.id];
    challengeBtn.disabled = !ready;
    if (already) {
      challengeBtn.textContent = "Reto completado · Repetir";
      challengeBtn.disabled = false;
    } else if (ready) {
      challengeBtn.textContent = `▶ Reto: ganar ${GAME_DATA.parts[world.partId].name}`;
    } else {
      challengeBtn.textContent = "Completa las lecciones para el reto";
    }
    challengeBtn.onclick = () => startChallenge(world.id);
    showScreen("world");
  }

  /* ---------- Lessons ---------- */
  function openLesson(worldId, lessonId) {
    state.currentWorldId = worldId;
    state.currentLessonId = lessonId;
    const world = worldById(worldId);
    const lesson = world.lessons.find((l) => l.id === lessonId);
    $("#lesson-title").textContent = lesson.title;
    const visual = $("#lesson-visual");
    visual.style.background = "";
    visual.textContent = "";
    if (lesson.visual) {
      visual.className = "lesson-visual has-diagram";
      visual.innerHTML = lesson.visual;
    } else {
      visual.className = "lesson-visual";
      visual.style.background = world.color;
      visual.textContent = lesson.icon;
    }
    $("#lesson-body").innerHTML = lesson.body;
    $("#btn-lesson-back").onclick = () => openWorld(worldId);
    $("#btn-lesson-done").onclick = () => {
      state.player.lessonsDone[`${worldId}:${lessonId}`] = true;
      save();
      openWorld(worldId);
    };
    showScreen("lesson");
  }

  /* ---------- Challenges ---------- */
  function startChallenge(worldId) {
    state.currentWorldId = worldId;
    const world = worldById(worldId);
    const ch = world.challenge;
    $("#challenge-title").textContent = ch.title;
    state.challenge = {
      qIndex: 0,
      selected: null,
      sortOrder: ch.type === "sort" ? shuffle(ch.items.map((i) => i.id)) : [],
      match: { picked: null, done: new Set() },
      score: 0,
      total: 0
    };
    renderChallengeStep();
    showScreen("challenge");
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    // avoid starting already solved
    return a;
  }

  function renderChallengeStep() {
    const world = worldById(state.currentWorldId);
    const ch = world.challenge;
    const area = $("#challenge-area");
    const feedback = $("#challenge-feedback");
    const checkBtn = $("#btn-challenge-check");
    const nextBtn = $("#btn-challenge-next");
    feedback.hidden = true;
    checkBtn.hidden = true;
    nextBtn.hidden = true;
    area.innerHTML = "";

    if (ch.type === "quiz") {
      state.challenge.total = ch.questions.length;
      const q = ch.questions[state.challenge.qIndex];
      $("#challenge-progress").textContent = `${state.challenge.qIndex + 1}/${ch.questions.length}`;
      $("#challenge-prompt").textContent = q.q;
      const wrap = document.createElement("div");
      wrap.className = "quiz-options";
      q.options.forEach((opt, idx) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "quiz-opt";
        b.textContent = opt;
        b.onclick = () => {
          state.challenge.selected = idx;
          $all(".quiz-opt", wrap).forEach((x) => x.classList.remove("selected"));
          b.classList.add("selected");
          checkBtn.hidden = false;
        };
        wrap.appendChild(b);
      });
      area.appendChild(wrap);
      checkBtn.hidden = state.challenge.selected == null;
      checkBtn.onclick = () => {
        const correct = state.challenge.selected === q.answer;
        $all(".quiz-opt", wrap).forEach((el, idx) => {
          if (idx === q.answer) el.classList.add("correct");
          if (idx === state.challenge.selected && !correct) el.classList.add("wrong");
        });
        feedback.hidden = false;
        feedback.className = "feedback " + (correct ? "ok" : "bad");
        feedback.textContent = correct ? "¡Correcto! ⭐" : "Casi… revisa la lección y sigue.";
        if (correct) state.challenge.score += 1;
        checkBtn.hidden = true;
        nextBtn.hidden = false;
        nextBtn.textContent =
          state.challenge.qIndex < ch.questions.length - 1 ? "Siguiente →" : "Reclamar pieza →";
        nextBtn.onclick = () => {
          if (state.challenge.qIndex < ch.questions.length - 1) {
            state.challenge.qIndex += 1;
            state.challenge.selected = null;
            renderChallengeStep();
          } else {
            finishChallenge();
          }
        };
      };
      return;
    }

    if (ch.type === "sort") {
      state.challenge.total = 1;
      $("#challenge-progress").textContent = "Arrastra";
      $("#challenge-prompt").textContent =
        ch.prompt + " Arrastra cada bloque arriba o abajo.";
      if (arraysEqual(state.challenge.sortOrder, ch.answer)) {
        state.challenge.sortOrder = shuffle(state.challenge.sortOrder);
      }
      const list = document.createElement("div");
      list.className = "sort-list";
      let dragId = null;
      let touchId = null;
      let showHints = false;

      function positionHints() {
        const ok = [];
        const bad = [];
        state.challenge.sortOrder.forEach((id, index) => {
          if (id === ch.answer[index]) ok.push(index + 1);
          else bad.push(index + 1);
        });
        return { ok, bad };
      }

      function moveId(fromId, toId) {
        if (fromId == null || toId == null || fromId === toId) return;
        const arr = state.challenge.sortOrder;
        const from = arr.indexOf(fromId);
        const to = arr.indexOf(toId);
        if (from < 0 || to < 0) return;
        arr.splice(from, 1);
        arr.splice(to, 0, fromId);
        showHints = false;
        feedback.hidden = true;
        checkBtn.hidden = false;
        nextBtn.hidden = true;
        paint();
      }

      function paint() {
        list.innerHTML = "";
        state.challenge.sortOrder.forEach((id, index) => {
          const item = ch.items.find((x) => x.id === id);
          const correctHere = id === ch.answer[index];
          const row = document.createElement("div");
          row.className = "sort-item";
          if (showHints) {
            row.classList.add(correctHere ? "hint-ok" : "hint-bad");
          }
          row.draggable = true;
          row.dataset.id = id;
          row.setAttribute("role", "listitem");
          const badge = showHints
            ? correctHere
              ? `<span class="drag-hint ok">✓ Bien</span>`
              : `<span class="drag-hint bad">Mover</span>`
            : `<span class="drag-hint">Arrastra</span>`;
          row.innerHTML = `
            <span class="handle" aria-hidden="true">☰</span>
            <span class="sort-text"><b>${index + 1}.</b> ${item.text}</span>
            ${badge}
          `;

          row.addEventListener("dragstart", (e) => {
            dragId = id;
            row.classList.add("dragging");
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", id);
          });
          row.addEventListener("dragend", () => {
            dragId = null;
            row.classList.remove("dragging");
            $all(".sort-item", list).forEach((el) => el.classList.remove("drag-over"));
          });
          row.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            row.classList.add("drag-over");
          });
          row.addEventListener("dragleave", () => row.classList.remove("drag-over"));
          row.addEventListener("drop", (e) => {
            e.preventDefault();
            row.classList.remove("drag-over");
            const from = e.dataTransfer.getData("text/plain") || dragId;
            moveId(from, id);
          });

          row.addEventListener(
            "touchstart",
            () => {
              touchId = id;
              row.classList.add("dragging");
            },
            { passive: true }
          );
          row.addEventListener(
            "touchmove",
            (e) => {
              if (touchId == null) return;
              const t = e.touches[0];
              const el = document.elementFromPoint(t.clientX, t.clientY);
              const target = el && el.closest(".sort-item");
              $all(".sort-item", list).forEach((x) => x.classList.remove("drag-over"));
              if (target && target.dataset.id !== touchId) {
                target.classList.add("drag-over");
              }
            },
            { passive: true }
          );
          row.addEventListener("touchend", (e) => {
            const t = e.changedTouches[0];
            const el = document.elementFromPoint(t.clientX, t.clientY);
            const target = el && el.closest(".sort-item");
            if (target && touchId) moveId(touchId, target.dataset.id);
            touchId = null;
            $all(".sort-item", list).forEach((x) => {
              x.classList.remove("dragging", "drag-over");
            });
          });

          list.appendChild(row);
        });
      }
      paint();
      area.appendChild(list);
      checkBtn.hidden = false;
      checkBtn.onclick = () => {
        const ok = arraysEqual(state.challenge.sortOrder, ch.answer);
        showHints = true;
        paint();
        feedback.hidden = false;
        if (ok) {
          feedback.className = "feedback ok";
          feedback.textContent = "¡Orden perfecto! Esa es la metodología de retos.";
          state.challenge.score = 1;
          checkBtn.hidden = true;
          nextBtn.hidden = false;
          nextBtn.textContent = "Reclamar pieza →";
          nextBtn.onclick = finishChallenge;
        } else {
          const { ok: good, bad } = positionHints();
          feedback.className = "feedback bad";
          feedback.innerHTML = `
            <strong>Pista:</strong> ${good.length} bien · ${bad.length} por mejorar.<br/>
            ${good.length ? `✓ Correctos: posición ${good.join(", ")}.` : "Ninguno está en su lugar aún."}<br/>
            ${bad.length ? `→ Mueve los de la posición ${bad.join(", ")}.` : ""}
          `;
        }
      };
      return;
    }

    if (ch.type === "match") {
      state.challenge.total = ch.pairs.length;
      $("#challenge-progress").textContent = `${state.challenge.match.done.size}/${ch.pairs.length}`;
      $("#challenge-prompt").textContent = ch.prompt;
      const grid = document.createElement("div");
      grid.className = "match-grid";

      const left = ch.pairs.map((p, i) => ({ side: "a", key: i, text: p.a }));
      const right = ch.pairs.map((p, i) => ({ side: "b", key: i, text: p.b }));
      const cards = shuffle([...left, ...right]);

      cards.forEach((card) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "match-card";
        el.textContent = card.text;
        el.dataset.side = card.side;
        el.dataset.key = String(card.key);
        if (state.challenge.match.done.has(card.key)) el.classList.add("matched");
        el.onclick = () => {
          if (el.classList.contains("matched")) return;
          const m = state.challenge.match;
          if (m.picked == null) {
            m.picked = el;
            el.classList.add("picked");
            return;
          }
          if (m.picked === el) {
            el.classList.remove("picked");
            m.picked = null;
            return;
          }
          const a = m.picked;
          const samePair =
            a.dataset.key === el.dataset.key && a.dataset.side !== el.dataset.side;
          if (samePair) {
            a.classList.add("matched");
            el.classList.add("matched");
            a.classList.remove("picked");
            m.done.add(Number(a.dataset.key));
            m.picked = null;
            state.challenge.score = m.done.size;
            $("#challenge-progress").textContent = `${m.done.size}/${ch.pairs.length}`;
            if (m.done.size === ch.pairs.length) {
              feedback.hidden = false;
              feedback.className = "feedback ok";
              feedback.textContent = "¡Todas las parejas! ⭐";
              nextBtn.hidden = false;
              nextBtn.textContent = "Reclamar pieza →";
              nextBtn.onclick = finishChallenge;
            }
          } else {
            a.classList.remove("picked");
            el.classList.add("wrong");
            setTimeout(() => el.classList.remove("wrong"), 350);
            m.picked = null;
          }
        };
        grid.appendChild(el);
      });
      area.appendChild(grid);
    }
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }

  function finishChallenge() {
    const world = worldById(state.currentWorldId);
    const part = GAME_DATA.parts[world.partId];
    const ratio =
      state.challenge.total > 0 ? state.challenge.score / state.challenge.total : 1;
    const stars = ratio >= 0.99 ? 3 : ratio >= 0.66 ? 2 : 1;

    if (!state.player.worldsDone[world.id]) {
      state.player.stars += stars;
    }
    state.player.worldsDone[world.id] = { stars };
    state.player.parts[part.id] = true;
    save();

    $("#reward-piece").textContent = part.icon;
    $("#reward-name").textContent = part.name;
    $("#reward-desc").textContent = part.desc + " Ya puedes colocarla en el taller.";
    $("#reward-stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    showScreen("reward");
  }

  /* ---------- Workshop ---------- */
  function renderWorkshop() {
    updateHud();
    const inv = $("#inventory");
    inv.innerHTML = "";
    Object.values(GAME_DATA.parts).forEach((part) => {
      const owned = !!state.player.parts[part.id];
      if (!owned) return;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "inv-item" + (state.player.placed[part.id] ? " placed" : "");
      el.title = part.name;
      el.textContent = part.icon;
      el.onclick = () => placePart(part.id);
      inv.appendChild(el);
    });

    $all(".slot").forEach((slot) => {
      const id = slot.dataset.part;
      const part = GAME_DATA.parts[id];
      if (state.player.placed[id]) {
        slot.classList.add("filled");
        slot.innerHTML = part.icon;
      } else {
        slot.classList.remove("filled");
        slot.innerHTML = "<span>?</span>";
      }
    });

    const placedCount = Object.keys(state.player.placed).length;
    const btn = $("#btn-finish-bot");
    if (placedCount >= 7) {
      btn.disabled = false;
      btn.textContent = "⚔️ Ir a la Arena SumoBot";
      btn.onclick = () => {
        showScreen("arena");
        resetArena();
      };
    } else {
      btn.disabled = true;
      btn.textContent = `Coloca las piezas (${placedCount}/7)`;
    }
  }

  function placePart(id) {
    if (!state.player.parts[id] || state.player.placed[id]) return;
    state.player.placed[id] = true;
    save();
    renderWorkshop();
  }

  /* ---------- Rubric ---------- */
  function renderRubric() {
    const list = $("#rubric-list");
    list.innerHTML = "";
    GAME_DATA.rubric.forEach((r) => {
      const div = document.createElement("div");
      div.className = "rubric-item";
      div.innerHTML = `
        <span class="rubric-pts">${r.pts} pts</span>
        <h4>${r.title}</h4>
        <p>${r.tip}</p>
      `;
      list.appendChild(div);
    });
  }

  /* ---------- Arena ---------- */
  function resetArena() {
    $("#fighter-you").className = "fighter you";
    $("#fighter-rival").className = "fighter rival";
    $("#arena-msg").textContent = "¡Tu SumoBot está listo! Toca COMBATIR.";
    $("#btn-fight").hidden = false;
    $("#btn-diploma").hidden = true;
  }

  function initArena() {
    $("#btn-fight").onclick = () => {
      const you = $("#fighter-you");
      const rival = $("#fighter-rival");
      const msg = $("#arena-msg");
      $("#btn-fight").hidden = true;
      msg.textContent = "Buscando rival…";
      you.classList.add("charge");
      setTimeout(() => {
        you.style.left = "42%";
        you.style.top = "40%";
        rival.style.right = "42%";
        rival.style.top = "40%";
        msg.textContent = "¡CHOQUE!";
      }, 500);
      setTimeout(() => {
        rival.classList.add("lose");
        you.classList.remove("charge");
        you.classList.add("win");
        msg.textContent = "¡Victoria! Completaste el aprendizaje por retos.";
        state.player.arenaWon = true;
        state.player.stars += 2;
        save();
        $("#btn-diploma").hidden = false;
      }, 1200);
    };
  }

  function renderDiploma() {
    $("#diploma-name").textContent = state.player.name;
    $("#diploma-stars").textContent = "⭐".repeat(Math.min(5, Math.ceil(state.player.stars / 4)));
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    document.body.addEventListener("click", (e) => {
      const go = e.target.closest("[data-go]");
      if (!go) return;
      const target = go.getAttribute("data-go");
      if (target === "world" && state.currentWorldId) {
        openWorld(state.currentWorldId);
        return;
      }
      if (target === "title") {
        showScreen("title");
        initTitle();
        return;
      }
      showScreen(target);
    });

    $("#btn-workshop").onclick = () => showScreen("workshop");
    $("#btn-reset").onclick = () => {
      if (confirm("¿Borrar progreso y empezar de nuevo?")) {
        localStorage.removeItem(STORAGE_KEY);
        state.player = null;
        showScreen("title");
        initTitle();
      }
    };
  }

  /* ---------- Boot ---------- */
  function boot() {
    initTitle();
    initAvatar();
    initNav();
    initArena();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
