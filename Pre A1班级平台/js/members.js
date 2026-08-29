/* ==========================================================================
   Pre A1 · Class Hub — 班级成员页
   类型/书院筛选 / 首字母头像 / 点击查看成员档案
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const D = () => PA1.D();
  const t = (k, v) => PA1.t(k, v);

  let type = "all"; /* all | teacher | student */
  let house = "all"; /* all | austen | beckingham | hamonde | valpy */

  /* ---------- 生日格式化："03-12" → "3月12日" / "Mar 12" ---------- */
  function fmtBirthday(mmdd) {
    if (!mmdd || !/^\d{2}-\d{2}$/.test(mmdd)) return "—";
    const m = Number(mmdd.slice(0, 2));
    const d = Number(mmdd.slice(3, 5));
    if (PA1.lang() === "zh") return m + "月" + d + "日";
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return MONTHS[m - 1] + " " + d;
  }

  /* ---------- 名称（按语言取主次） ---------- */
  function namePair(p) {
    const zh = (p.name && p.name.zh) || "";
    const en = (p.name && p.name.en) || "";
    return PA1.lang() === "zh"
      ? { main: zh || en, sub: zh ? en : "" }
      : { main: en || zh, sub: en ? zh : "" };
  }

  /* ---------- 卡片 ---------- */
  function cardHTML(p, isTeacher) {
    const np = namePair(p);
    const houseObj = PA1.houseOf(p.house);
    const ring = isTeacher ? "var(--gold-500)" : houseObj ? PA1.houseRing(houseObj.color) : "var(--gold-500)";
    const initial = PA1.initials(np.main);

    let roleLine = "";
    if (isTeacher) {
      const label = p.role === "homeroom" ? t("mb.role.homeroom") : PA1.subjectOf(p.subject) ? PA1.pick(PA1.subjectOf(p.subject)) : "";
      roleLine = label
        ? '<span class="house-badge" style="--house:var(--gold-500)">' + PA1.esc(label) + "</span>"
        : "";
    } else {
      roleLine = p.role ? '<div class="m-role">' + PA1.esc(p.role) + "</div>" : "";
    }

    /* 书院一律显示英文名；白色书院（Valpy）用深灰文字 + 浅灰底保证可读 */
    const houseBadge = !isTeacher && houseObj
      ? '<div style="margin-top:10px"><span class="house-badge" style="--house:' + houseObj.color +
        (PA1.isLightColor(houseObj.color) ? ";color:#5a6064;background:#f6f5f2;border-color:#c9cdd1" : "") + '">' +
        PA1.esc(houseObj.name.en || houseObj.name.zh) + "</span></div>"
      : "";

    const motto = PA1.pick(p.motto);

    return (
      '<div class="card member-card' + (isTeacher ? " teacher" : "") + '" style="--house:' + ring + '"' +
      ' data-i="' + PA1.esc(p._idx) + '" data-teacher="' + (isTeacher ? 1 : 0) + '" tabindex="0" role="button">' +
      '<div class="avatar" style="background:' + PA1.avatarColor(np.main) + '">' + PA1.esc(initial) + "</div>" +
      '<div style="flex:1;min-width:0">' +
      '<div class="m-name">' + PA1.esc(np.main) + "</div>" +
      (np.sub ? '<div class="m-en">' + PA1.esc(np.sub) + "</div>" : "") +
      roleLine +
      houseBadge +
      (motto ? '<div class="m-motto">" ' + PA1.esc(motto) + ' "</div>' : "") +
      "</div></div>"
    );
  }

  /* ---------- 档案弹窗 ---------- */
  function openProfile(p, isTeacher) {
    const np = namePair(p);
    const houseObj = PA1.houseOf(p.house);
    const subject = PA1.subjectOf(p.subject);

    const details = isTeacher
      ? [
          [t("mb.modal.subject"), subject ? PA1.pick(subject) : "—"],
          [t("mb.modal.role"), p.role === "homeroom" ? t("mb.role.homeroom") : "—"],
        ]
      : [
          [t("mb.modal.house"), houseObj ? (houseObj.name.en || houseObj.name.zh) : "—"],
          [t("mb.modal.birthday"), fmtBirthday(p.birthday)],
          [t("mb.modal.role"), p.role || "—"],
          [t("mb.modal.hobby"), PA1.pick(p.hobbies) || "—"],
        ];

    const bannerStyle = isTeacher && subject
      ? '<div class="subj-banner" style="--subj:' + subject.color + '"><h3>' + PA1.esc(np.main) + "</h3><p>" +
        PA1.esc(subject ? (PA1.lang() === "zh" ? subject.en : subject.zh) : "") + "</p></div>"
      : "";

    const motto = PA1.pick(p.motto);

    PA1.openModal({
      title: np.sub ? np.main + " · " + np.sub : np.main,
      body:
        bannerStyle +
        '<div style="display:flex;align-items:center;gap:18px;margin-bottom:14px">' +
        '<div class="avatar" style="background:' + PA1.avatarColor(np.main) + ";width:64px;height:64px;font-size:1.3rem;margin:0;flex:none;outline-color:" +
        (houseObj ? PA1.houseRing(houseObj.color) : "var(--gold-500)") + '">' + PA1.esc(PA1.initials(np.main)) + "</div>" +
        '<div style="font-family:var(--serif);font-size:1.15rem;font-weight:700">' + PA1.esc(np.main) +
        (np.sub ? '<div style="font-family:var(--sans);font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-600);font-weight:700;margin-top:2px">' + PA1.esc(np.sub) + "</div>" : "") +
        "</div></div>" +
        '<div class="detail-grid">' +
        details.map(([k, v]) => '<div class="detail-item"><span class="k">' + PA1.esc(k) + '</span><span class="v">' + PA1.esc(v) + "</span></div>").join("") +
        "</div>" +
        (motto
          ? '<div style="border-left:3px solid var(--gold-500);padding:10px 16px;background:var(--bg-soft);border-radius:0 10px 10px 0;margin-top:14px;font-family:var(--serif);font-style:italic;color:var(--ink-2)">' +
            PA1.esc(motto) + "</div>"
          : ""),
    });
  }

  /* ---------- 渲染 ---------- */
  function render() {
    const d = D();
    const teachers = d.members.teachers || [];
    const students = d.members.students || [];
    const houses = d.houses || [];

    $("#footer-rights").textContent = t("footer.rights", { year: new Date().getFullYear() });

    /* 筛选 chips */
    const typeChips = [
      ["all", t("mb.filter.all"), teachers.length + students.length],
      ["teacher", t("mb.filter.teacher"), teachers.length],
      ["student", t("mb.filter.student"), students.length],
    ];
    const houseChips = [["all", t("mb.filter.all"), students.length]].concat(
      houses.map((h) => [h.id, h.name.en || h.name.zh, students.filter((s) => s.house === h.id).length])
    );

    $("#mb-filters").innerHTML =
      typeChips
        .map(
          ([id, label, cnt]) =>
            '<button class="filter-chip' + (type === id ? " active" : "") + '" data-type="' + id + '">' +
            PA1.esc(label) + '<span class="cnt">' + cnt + "</span></button>"
        )
        .join("") +
      '<span style="width:12px" aria-hidden="true"></span>' +
      houseChips
        .map(
          ([id, label, cnt]) =>
            '<button class="filter-chip' + (house === id ? " active" : "") + '" data-house="' + id + '">' +
            PA1.esc(label) + '<span class="cnt">' + cnt + "</span></button>"
        )
        .join("");

    /* 筛选逻辑 */
    const showTeachers = house === "all" && (type === "all" || type === "teacher");
    const showStudents = type === "all" || type === "student";
    const visibleStudents = house === "all" ? students : students.filter((s) => s.house === house);

    $("#teachers-sec").style.display = showTeachers ? "" : "none";
    $("#students-sec").style.display = showStudents ? "" : "none";

    /* 老师卡片 */
    const tg = $("#teachers-grid");
    if (!teachers.length) {
      tg.innerHTML =
        '<div class="card" style="padding:36px 24px;text-align:center;grid-column:1/-1">⏳ ' +
        PA1.esc(t("mb.dataEmpty")) + "</div>";
    } else {
      teachers.forEach((p, i) => (p._idx = i));
      tg.innerHTML = teachers.map((p) => cardHTML(p, true)).join("");
    }

    /* 学生卡片 */
    const sg = $("#students-grid");
    if (!students.length) {
      sg.innerHTML =
        '<div class="card" style="padding:36px 24px;text-align:center;grid-column:1/-1">⏳ ' +
        PA1.esc(t("mb.dataEmpty")) + "</div>";
    } else if (!visibleStudents.length) {
      sg.innerHTML =
        '<div class="card" style="padding:36px 24px;text-align:center;grid-column:1/-1">⏳ ' +
        PA1.esc(t("mb.dataEmpty")) + "</div>";
    } else {
      visibleStudents.forEach((p) => (p._idx = students.indexOf(p)));
      sg.innerHTML = visibleStudents.map((p) => cardHTML(p, false)).join("");
    }

    /* 事件绑定 */
    $("#mb-filters").querySelectorAll("[data-type]").forEach((el) =>
      el.addEventListener("click", () => { type = el.dataset.type; render(); })
    );
    $("#mb-filters").querySelectorAll("[data-house]").forEach((el) =>
      el.addEventListener("click", () => { house = el.dataset.house; render(); })
    );

    const bindCards = (grid, list, isTeacher) => {
      grid.querySelectorAll(".member-card").forEach((el) => {
        const open = () => {
          const p = list[Number(el.dataset.i)];
          if (p) openProfile(p, isTeacher);
        };
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      });
    };
    bindCards(tg, teachers, true);
    bindCards(sg, visibleStudents, false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    window.addEventListener("pa1:lang", render);
  });
})();
