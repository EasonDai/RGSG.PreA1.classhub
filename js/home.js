/* ==========================================================================
   Pre A1 · Class Hub — 首页逻辑
   校训 / 班级速览 / 今日一览 / 倒计时翻牌 / 快讯 / 班级角 / 生日撒花
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const D = () => PA1.D();
  const t = (k, v) => PA1.t(k, v);

  const TODAY = new Date();
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const WEEK_IDX = DAY_KEYS[TODAY.getDay()]; // 0=周日 6=周六
  const IS_WEEKEND = WEEK_IDX === "sat" || WEEK_IDX === "sun";
  const MM_DD = String(TODAY.getMonth() + 1).padStart(2, "0") + "-" + String(TODAY.getDate()).padStart(2, "0");

  const emptyHTML = (key) =>
    '<div class="today-empty"><span aria-hidden="true">⏳</span><span>' + PA1.esc(t(key)) + "</span></div>";

  /* ================= 1. 校训与页脚 ================= */
  function renderMotto() {
    const motto = PA1.pick(D().school.motto);
    const parts = motto.split("·").map((s) => s.trim()).filter(Boolean);
    $("#hero-motto").innerHTML = parts
      .map((p) => PA1.esc(p))
      .join('<span aria-hidden="true" style="opacity:.5"> ✦ </span>');
  }

  function renderFooter() {
    $("#footer-rights").textContent = t("footer.rights", { year: TODAY.getFullYear() });
  }

  /* ================= 2. 班级速览（英雄区统计） ================= */
  function renderStats() {
    const d = D();
    const students = (d.members.students || []).length;
    const teachers = (d.members.teachers || []).length;
    const houses = (d.houses || []).length;

    let weeks = "—";
    const ts = d.classInfo.termStart;
    if (ts) {
      const start = new Date(ts + "T00:00:00");
      const diff = Math.floor((TODAY - start) / 86400000);
      if (diff >= 0) weeks = String(Math.min(Math.floor(diff / 7) + 1, 52));
    }

    const stats = [
      [students, "hero.stat.students"],
      [teachers, "hero.stat.teachers"],
      [houses, "hero.stat.houses"],
      [weeks, "hero.stat.weeks"],
    ];
    $("#hero-stats").innerHTML = stats
      .map(
        ([n, k]) =>
          '<div class="stat"><div class="num">' + n + '</div><div class="lbl">' + PA1.esc(t(k)) + "</div></div>"
      )
      .join("");

    /* 班级合照（占位图可显示；真实照片加载失败时自动隐藏） */
    const photo = $("#hero-photo");
    const src = d.classInfo.photo;
    photo.hidden = !src;
    if (src) {
      photo.src = src;
      photo.onerror = () => { photo.hidden = true; };
    }
  }

  /* ================= 3. 今日一览 ================= */
  function todayItemHTML(html) {
    return '<div class="today-item">' + html + "</div>";
  }

  function renderClasses() {
    const box = $("#today-classes");
    const tt = D().timetable;

    /* 数据整体为空 → 待录入提示 */
    if (Object.values(tt).every((arr) => !arr.length)) {
      box.innerHTML = emptyHTML("common.dataPending");
      return;
    }

    const day = IS_WEEKEND ? "mon" : WEEK_IDX;
    const list = tt[day] || [];

    let head = "";
    if (IS_WEEKEND) {
      head =
        '<div class="today-empty"><span aria-hidden="true">🌤️</span><span>' +
        PA1.esc(t("today.weekend")) +
        "</span></div>";
    }

    const periods = D().periods;
    const html = list
      .map((c, i) => {
        if (!c) return "";
        const subj = PA1.subjectOf(c.subject);
        const p = periods[i];
        const name = subj ? PA1.pick(subj) : c.subject;
        return todayItemHTML(
          '<span class="subject-dot" style="background:' + (subj ? subj.color : "#8a8fa3") + '"></span>' +
            "<span>" + PA1.esc(name) + "</span>" +
            '<span class="t-time">' + (p ? PA1.esc(p.start) : "") + "</span>"
        );
      })
      .join("");

    box.innerHTML = head + html || emptyHTML("today.empty");
    if (!html && !IS_WEEKEND) box.innerHTML = emptyHTML("today.empty");
  }

  function renderDuty() {
    const box = $("#today-duty");
    const duty = D().duty;
    if (!Object.values(duty).some((arr) => arr.length)) {
      box.innerHTML = emptyHTML("common.dataPending");
      return;
    }
    const day = IS_WEEKEND ? null : WEEK_IDX;
    const names = day ? duty[day] || [] : [];
    if (!names.length) {
      box.innerHTML = emptyHTML("today.empty");
      return;
    }
    box.innerHTML = todayItemHTML(
      '<span aria-hidden="true">✨</span><span>' + PA1.esc(t("today.dutyNames", { names: names.join(" · ") })) + "</span>"
    );
  }

  function daysUntil(mmdd) {
    const now = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    let target = new Date(TODAY.getFullYear(), Number(mmdd.slice(0, 2)) - 1, Number(mmdd.slice(3, 5)));
    if (target < now) target = new Date(TODAY.getFullYear() + 1, target.getMonth(), target.getDate());
    return Math.round((target - now) / 86400000);
  }

  function renderBirthday() {
    const box = $("#today-birthday");
    const students = D().members.students || [];
    if (!students.length) {
      box.innerHTML = emptyHTML("common.dataPending");
      return;
    }

    const todayPeeps = students.filter((s) => s.birthday === MM_DD);

    if (todayPeeps.length) {
      box.innerHTML = todayItemHTML(
        '<span aria-hidden="true">🎉</span><span>' +
          PA1.esc(todayPeeps.map((s) => PA1.nameOf(s.name)).join(" · ")) +
          " 🎂</span>"
      );
      launchConfettiOnce();
      return;
    }

    /* 最近一个生日 */
    const upcoming = students
      .filter((s) => s.birthday && /^\d{2}-\d{2}$/.test(s.birthday))
      .map((s) => ({ s, d: daysUntil(s.birthday) }))
      .sort((a, b) => a.d - b.d)[0];

    if (upcoming && upcoming.d <= 60) {
      box.innerHTML = todayItemHTML(
        '<span aria-hidden="true">🎁</span><span>' +
          PA1.esc(t("today.nextBirthday", { name: PA1.nameOf(upcoming.s.name), days: upcoming.d })) +
          "</span>"
      );
    } else {
      box.innerHTML = emptyHTML("today.noBirthday");
    }
  }

  function renderDeadlines() {
    const box = $("#today-deadline");
    const dl = D().deadlines || [];
    if (!dl.length) {
      box.innerHTML = emptyHTML("today.noDeadline");
      return;
    }

    const now = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const upcoming = dl
      .map((x) => {
        const due = new Date(x.date + "T00:00:00");
        return { x, due, diff: Math.ceil((due - now) / 86400000) };
      })
      .filter((o) => o.diff >= 0)
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 3);

    if (!upcoming.length) {
      box.innerHTML = emptyHTML("today.noDeadline");
      return;
    }

    box.innerHTML = upcoming
      .map((o) => {
        const subj = PA1.subjectOf(o.x.subject);
        let label, cls;
        if (o.diff === 0) { label = t("deadline.today"); cls = "critical"; }
        else if (o.diff <= 2) { label = t("deadline.left", { d: o.diff }); cls = "critical"; }
        else if (o.diff <= 5) { label = t("deadline.left", { d: o.diff }); cls = "soon"; }
        else { label = t("deadline.left", { d: o.diff }); cls = "ok"; }
        return todayItemHTML(
          '<span class="subject-dot" style="background:' + (subj ? subj.color : "#8a8fa3") + '"></span>' +
            "<span>" + PA1.esc(PA1.pick(o.x.title)) + "</span>" +
            '<span class="urgency ' + cls + '">' + PA1.esc(label) + "</span>"
        );
      })
      .join("");
  }

  /* ================= 4. 生日撒花 ================= */
  function launchConfettiOnce() {
    const KEY = "pa1-bday-" + TODAY.getFullYear() + MM_DD;
    try {
      if (localStorage.getItem(KEY)) return;
      localStorage.setItem(KEY, "1");
    } catch (e) { /* ignore */ }
    launchConfetti();
  }

  function launchConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    window.addEventListener("resize", () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

    const COLORS = ["#C9A227", "#D9B64A", "#E8CF85", "#16224F", "#ffffff", "#2A3C7E"];
    const pieces = [];
    for (let i = 0; i < 160; i++) {
      pieces.push({
        x: Math.random() * W,
        y: -30 - Math.random() * H * 0.4,
        w: 6 + Math.random() * 7,
        h: 4 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        vy: 1.6 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 1.6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }

    const t0 = performance.now();
    const DURATION = 3200;
    (function frame(now) {
      const el = now - t0;
      ctx.clearRect(0, 0, W, H);
      pieces.forEach((p) => {
        p.x += p.vx + Math.sin(el / 400 + p.rot) * 0.6;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (el < DURATION) requestAnimationFrame(frame);
      else canvas.remove();
    })(t0);
  }

  /* ================= 5. 倒计时翻牌 ================= */
  function renderCountdown() {
    const grid = $("#countdown-grid");
    const events = D().events || [];

    if (!events.length) {
      grid.innerHTML =
        '<div class="card cd-card">' +
        '<div class="cd-top"><span class="cd-emoji" aria-hidden="true">⏳</span>' +
        '<span class="cd-name">' + PA1.esc(t("common.dataPending")) + "</span></div>" +
        '<div class="cd-ended">💡 ' + PA1.esc(t("common.dataPendingHint")) + "</div></div>";
      return;
    }

    grid.innerHTML = events
      .map(
        (ev, i) =>
          '<div class="card cd-card" data-i="' + i + '">' +
          '<div class="cd-top">' +
          '<span class="cd-emoji" aria-hidden="true">' + (ev.emoji || "📅") + "</span>" +
          '<span class="cd-name">' + PA1.esc(PA1.pick(ev.name)) + "</span>" +
          '<span class="cd-date">' + PA1.esc(PA1.fmtDateFull(ev.date)) + "</span>" +
          "</div>" +
          '<div class="flip-row">' +
          ["cd.day", "cd.hour", "cd.min", "cd.sec"]
            .map((k) => '<div class="flip-unit"><b data-u="' + k + '">00</b><i>' + PA1.esc(t(k)) + "</i></div>")
            .join("") +
          "</div></div>"
      )
      .join("");
    tickCountdown();
  }

  function tickCountdown() {
    const now = Date.now();
    $$(".cd-card").forEach((card) => {
      const ev = D().events[Number(card.dataset.i)];
      if (!ev) return;
      const target = new Date(ev.date + "T00:00:00").getTime();
      const diff = target - now;

      if (diff <= 0) {
        if (!card.classList.contains("ended")) {
          card.classList.add("ended");
          const row = card.querySelector(".flip-row");
          if (row) row.outerHTML = '<div class="cd-ended">🏁 ' + PA1.esc(t("cd.ended")) + "</div>";
        }
        return;
      }

      if (diff < 7 * 86400000) card.classList.add("urgent");
      const vals = {
        "cd.day": Math.floor(diff / 86400000),
        "cd.hour": Math.floor(diff / 3600000) % 24,
        "cd.min": Math.floor(diff / 60000) % 60,
        "cd.sec": Math.floor(diff / 1000) % 60,
      };
      Object.keys(vals).forEach((k) => {
        const el = card.querySelector('[data-u="' + k + '"]');
        if (!el) return;
        const txt = String(vals[k]).padStart(2, "0");
        if (el.textContent !== txt) {
          el.textContent = txt;
          el.classList.remove("tick");
          void el.offsetWidth; /* 重触发动画 */
          el.classList.add("tick");
        }
      });
    });
  }

  /* ================= 6. 班级快讯 ================= */
  function renderNews() {
    const list = $("#news-list");
    const news = (D().announcements || [])
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4);

    if (!news.length) {
      list.innerHTML =
        '<div class="card news-item"><div class="news-main"><p>⏳ ' +
        PA1.esc(t("common.dataPending")) + " —— " + PA1.esc(t("common.dataPendingHint")) + "</p></div></div>";
      return;
    }

    list.innerHTML = news
      .map((n, i) => {
        const dt = new Date(n.date + "T00:00:00");
        const tagMap = { urgent: "tag.urgent", important: "tag.important", normal: "tag.normal" };
        return (
          '<div class="card news-item" data-i="' + i + '" role="button" tabindex="0">' +
          '<div class="news-date"><b>' + dt.getDate() + "</b><i>" +
          (dt.getMonth() + 1) + "月</i></div>" +
          '<div class="news-main"><h3>' + PA1.esc(PA1.pick(n.title)) + "</h3>" +
          '<p>' + PA1.esc(PA1.pick(n.body)) + "</p>" +
          '<span class="chip chip-' + (n.tag || "normal") + '" style="margin-top:8px">' +
          PA1.esc(t(tagMap[n.tag] || "tag.normal")) + "</span></div>" +
          '<span class="news-arrow" aria-hidden="true">→</span></div>'
        );
      })
      .join("");

    $$(".news-item[data-i]", list).forEach((el) => {
      const open = () => {
        const n = (D().announcements || []).slice().sort((a, b) => b.date.localeCompare(a.date))[Number(el.dataset.i)];
        if (!n) return;
        const tagMap = { urgent: "tag.urgent", important: "tag.important", normal: "tag.normal" };
        PA1.openModal({
          title: PA1.pick(n.title),
          body:
            '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px">' +
            '<span class="chip chip-' + (n.tag || "normal") + '">' + PA1.esc(t(tagMap[n.tag] || "tag.normal")) + "</span>" +
            '<span style="font-size:.84rem;color:var(--ink-3)">' + PA1.esc(PA1.fmtDateFull(n.date)) + "</span>" +
            "</div>" +
            String(PA1.pick(n.body))
              .split("\n")
              .map((p) => "<p style='margin-bottom:10px;color:var(--ink-2)'>" + PA1.esc(p) + "</p>")
              .join(""),
        });
      };
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }

  /* ================= 7. 班级角 ================= */
  function renderClassCorner() {
    const grid = $("#honor-grid");
    const items = D().classCorner || [];
    if (!items.length) {
      grid.innerHTML =
        '<div class="card honor-card"><div class="honor-medal" aria-hidden="true">📸</div><h3>' +
        PA1.esc(t("honor.empty")) + "</h3></div>";
      return;
    }
    grid.innerHTML = items
      .map(
        (p) =>
          '<div class="card photo-card">' +
          '<div class="photo-cover has-photo" style="aspect-ratio:' + (p.ratio || "3/2") + '">' +
          '<span class="emoji">📷</span>' +
          (p.photo
            ? '<img src="' + PA1.esc(p.photo) + '" alt="" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">'
            : "") +
          "</div>" +
          (p.title
            ? '<div class="photo-info"><h3>' + PA1.esc(PA1.pick(p.title)) + "</h3></div>"
            : "") +
          "</div>"
      )
      .join("");
  }

  /* ================= 渲染入口 ================= */
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  function renderAll() {
    renderMotto();
    renderFooter();
    renderStats();
    $("#today-date").textContent = PA1.fmtDateFull(
      TODAY.getFullYear() + "-" + MM_DD.slice(0, 2) + "-" + MM_DD.slice(3, 5)
    );
    renderClasses();
    renderDuty();
    renderBirthday();
    renderDeadlines();
    renderCountdown();
    renderNews();
    renderClassCorner();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    setInterval(tickCountdown, 1000);
    window.addEventListener("pa1:lang", renderAll);
  });
})();
