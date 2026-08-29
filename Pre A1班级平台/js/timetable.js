/* ==========================================================================
   Pre A1 · Class Hub — 课程表页
   周视图网格 / 今日列高亮 / 点击课程查看详情 / 科目图例
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const D = () => PA1.D();
  const t = (k, v) => PA1.t(k, v);

  const DAYS = ["mon", "tue", "wed", "thu", "fri"];
  const TODAY = new Date();
  const TODAY_IDX = TODAY.getDay() - 1; /* 0=周一 … 4=周五；周末为 -1 / 5 */

  function todayISO() {
    return (
      TODAY.getFullYear() + "-" +
      String(TODAY.getMonth() + 1).padStart(2, "0") + "-" +
      String(TODAY.getDate()).padStart(2, "0")
    );
  }

  /* ---------- 空状态 ---------- */
  function renderEmpty(root) {
    root.innerHTML =
      '<div class="card" style="padding:46px 28px;text-align:center">' +
      '<div style="font-size:2.2rem;margin-bottom:12px" aria-hidden="true">📋</div>' +
      '<h3 class="h3" style="margin-bottom:10px">' + PA1.esc(t("tt.dataEmpty")) + "</h3>" +
      '<p style="color:var(--ink-2);max-width:520px;margin:0 auto;font-size:.92rem">' +
      PA1.esc(t("tt.dataEmptyHint")) + "</p></div>";
  }

  /* ---------- 渲染 ---------- */
  function render() {
    const d = D();
    const tt = d.timetable;
    const periods = d.periods || [];
    const lunchAfter = d.lunchAfter;
    const root = $("#tt-root");

    $("#footer-rights").textContent = t("footer.rights", { year: TODAY.getFullYear() });
    $("#tt-sub").textContent = t("tt.pageSub", { date: PA1.fmtDateFull(todayISO()) });

    const isEmpty = DAYS.every((k) => !(tt[k] || []).length);
    if (isEmpty) {
      renderEmpty(root);
      renderLegend([]);
      return;
    }

    const isToday = (i) => i === TODAY_IDX;

    let html = '<div class="timetable-wrap"><div class="timetable">';

    /* 表头 */
    html += '<div class="tt-cell tt-corner">Period</div>';
    DAYS.forEach((_, i) => {
      html +=
        '<div class="tt-cell tt-head' + (isToday(i) ? " today" : "") + '">' +
        '<span class="wk">' + PA1.esc(PA1.weekdayName(i)) + "</span>" +
        (isToday(i) ? '<span class="day">★ ' + PA1.esc(t("tt.today")) + "</span>" : "") +
        "</div>";
    });

    /* 每节课 */
    periods.forEach((p, i) => {
      html +=
        '<div class="tt-cell tt-period"><b>' +
        PA1.esc(t("tt.period", { n: p.n })) +
        '</b><i>' + p.start + "–" + p.end + "</i></div>";

      DAYS.forEach((day, di) => {
        const c = (tt[day] || [])[i];
        const cls = 'tt-cell tt-col' + (isToday(di) ? " today" : "");
        if (!c) {
          html += '<div class="' + cls + '"><span style="font-size:.74rem;color:var(--ink-3)">' + PA1.esc(t("tt.empty")) + "</span></div>";
          return;
        }
        const subj = PA1.subjectOf(c.subject);
        const color = subj ? subj.color : "#8a8fa3";
        const meta = [c.teacher ? PA1.nameOf(c.teacher) : "", c.room || ""].filter(Boolean).join(" · ");
        html +=
          '<div class="' + cls + '">' +
          '<div class="tt-course" style="--subj:' + color + '" tabindex="0" role="button" ' +
          'data-day="' + day + '" data-idx="' + i + '">' +
          '<span class="cname">' + PA1.esc(subj ? PA1.pick(subj) : c.subject) + "</span>" +
          (meta ? '<span class="cmeta">' + PA1.esc(meta) + "</span>" : "") +
          "</div></div>";
      });

      /* 午休行 */
      if (lunchAfter && i + 1 === lunchAfter) {
        html += '<div class="tt-cell tt-lunch">' + PA1.esc(t("tt.lunch")) + "</div>";
      }
    });

    html += "</div></div>";
    root.innerHTML = html;

    /* 图例 */
    const used = new Set();
    DAYS.forEach((day) =>
      (tt[day] || []).forEach((c) => { if (c && c.subject) used.add(c.subject); })
    );
    renderLegend([...used]);

    /* 点击课程 → 详情 */
    root.querySelectorAll(".tt-course").forEach((el) => {
      const open = () => {
        const day = el.dataset.day;
        const idx = Number(el.dataset.idx);
        const c = (tt[day] || [])[idx];
        if (!c) return;
        const subj = PA1.subjectOf(c.subject);
        const color = subj ? subj.color : "#8a8fa3";
        const p = periods[idx];

        PA1.openModal({
          title: t("tt.modal.title"),
          body:
            '<div class="subj-banner" style="--subj:' + color + '">' +
            "<h3>" + PA1.esc(subj ? PA1.pick(subj) : c.subject) + "</h3>" +
            "<p>" + PA1.esc(subj ? (PA1.lang() === "zh" ? subj.en : subj.zh) : "") + "</p></div>" +
            '<div class="detail-grid">' +
            '<div class="detail-item"><span class="k">' + PA1.esc(t("tt.modal.period")) + '</span><span class="v">' +
            PA1.esc(t("tt.period", { n: p ? p.n : idx + 1 })) + "</span></div>" +
            '<div class="detail-item"><span class="k">' + PA1.esc(t("tt.modal.time")) + '</span><span class="v">' +
            (p ? p.start + " – " + p.end : "—") + "</span></div>" +
            '<div class="detail-item"><span class="k">' + PA1.esc(t("tt.modal.teacher")) + '</span><span class="v">' +
            (c.teacher ? PA1.esc(PA1.nameOf(c.teacher)) : "—") + "</span></div>" +
            '<div class="detail-item"><span class="k">' + PA1.esc(t("tt.modal.room")) + '</span><span class="v">' +
            (c.room ? PA1.esc(c.room) : "—") + "</span></div>" +
            "</div>",
        });
      };
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
  }

  function renderLegend(used) {
    const legend = $("#tt-legend");
    const subjects = D().subjects;
    const keys = used.length ? used : Object.keys(subjects);

    if (!keys.length) { legend.innerHTML = ""; return; }

    const label = PA1.esc(t("tt.legend")) + " ";
    legend.innerHTML =
      '<span style="background:var(--navy-800);color:#fff;border-color:var(--navy-800)">' + label + "</span>" +
      keys
        .map((k) => {
          const s = subjects[k];
          if (!s) return "";
          return '<span style="--subj:' + s.color + '"><i></i>' + PA1.esc(PA1.pick(s)) + "</span>";
        })
        .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    window.addEventListener("pa1:lang", render);
  });
})();
