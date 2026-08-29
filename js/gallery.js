/* ==========================================================================
   Pre A1 · Class Hub — 活动相册页
   学期时间线 / 标签筛选 / 瀑布流照片墙 / 灯箱（键盘 + 手势）
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const D = () => PA1.D();
  const t = (k, v) => PA1.t(k, v);

  let tag = "all"; /* all | 标签名 */
  let month = "all"; /* all | "2026-09" */
  let items = []; /* 当前筛选结果 */
  let lbIdx = 0;

  /* ---------- 封面 ---------- */
  function coverStyle(p) {
    const presets = window.PRESET_COVERS || {};
    return presets[p.cover] || p.cover || presets.navy;
  }

  function coverHTML(p, big) {
    /* emoji 图标作为底层占位；真实照片盖在上面，加载失败时自动移除露出占位 */
    const emoji = '<span class="emoji">' + PA1.esc(p.emoji || "📷") + "</span>";
    const img = p.photo
      ? '<img src="' + PA1.esc(p.photo) + '" alt="" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">'
      : "";
    return emoji + img + (big ? "" : '<span class="zoom-hint" aria-hidden="true">🔍</span>');
  }

  function filtered() {
    return (D().gallery || [])
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter((p) => (tag === "all" || p.tag === tag) && (month === "all" || (p.date || "").slice(0, 7) === month));
  }

  /* ---------- 渲染 ---------- */
  function render() {
    const g = D().gallery || [];

    $("#footer-rights").textContent = t("footer.rights", { year: new Date().getFullYear() });

    /* 时间线：按月份分组 */
    const months = [...new Set(g.map((p) => (p.date || "").slice(0, 7)).filter(Boolean))].sort();
    const strip = $("#gl-timeline");
    if (!months.length) {
      strip.innerHTML =
        '<div class="tl-node" style="cursor:default"><span class="m-label" style="color:var(--ink-3)">⏳ ' +
        PA1.esc(t("common.dataPending")) + "</span></div>";
    } else {
      strip.innerHTML =
        '<div class="tl-node' + (month === "all" ? " active" : "") + '" data-m="all">' +
        '<div class="dot"></div><span class="m-label">' + PA1.esc(t("gl.filter.all")) + "</span></div>" +
        months
          .map(
            (m) =>
              '<div class="tl-node' + (month === m ? " active" : "") + '" data-m="' + m + '">' +
              '<div class="dot"></div><span class="m-label">' + PA1.esc(PA1.fmtMonth(m)) + "</span>" +
              '<div style="font-size:.68rem;color:var(--ink-3)">' + g.filter((p) => (p.date || "").slice(0, 7) === m).length + " 📷</div></div>"
          )
          .join("");
      strip.querySelectorAll(".tl-node[data-m]").forEach((el) =>
        el.addEventListener("click", () => { month = el.dataset.m; render(); })
      );
    }

    /* 标签筛选 */
    const tags = D().tags || {};
    const fb = $("#gl-filters");
    fb.innerHTML = [["all", t("gl.filter.all"), g.length]]
      .concat(
        Object.keys(tags).map((k) => [k, PA1.pick(tags[k]), g.filter((p) => p.tag === k).length])
      )
      .map(
        ([id, label, cnt]) =>
          '<button class="filter-chip' + (tag === id ? " active" : "") + '" data-tag="' + PA1.esc(id) + '">' +
          PA1.esc(label) + '<span class="cnt">' + cnt + "</span></button>"
      )
      .join("");
    fb.querySelectorAll("[data-tag]").forEach((el) =>
      el.addEventListener("click", () => { tag = el.dataset.tag; render(); })
    );

    /* 照片墙 */
    items = filtered();
    const grid = $("#gl-grid");
    if (!items.length) {
      grid.innerHTML =
        '<div class="card" style="padding:46px 28px;text-align:center;break-inside:avoid">' +
        '<div style="font-size:2.2rem;margin-bottom:12px" aria-hidden="true">📸</div>' +
        '<h3 class="h3" style="margin-bottom:10px">' + PA1.esc(t("gl.dataEmpty")) + "</h3></div>";
      return;
    }

    grid.innerHTML = items
      .map((p, i) => {
        const ratio = p.ratio || "4/3";
        const tagLabel = tags[p.tag] ? PA1.pick(tags[p.tag]) : p.tag;
        return (
          '<div class="card photo-card" data-i="' + i + '" tabindex="0" role="button">' +
          '<div class="photo-cover" style="aspect-ratio:' + ratio + ';--cover:' + coverStyle(p) + '">' +
          coverHTML(p, false) +
          "</div>" +
          '<div class="photo-info"><h3>' + PA1.esc(PA1.pick(p.title)) + "</h3>" +
          (p.date
            ? '<span class="p-date">' + PA1.esc(PA1.fmtDateFull(p.date)) + "</span>"
            : '<div style="margin-top:6px"><span class="chip chip-normal">⏳ ' + PA1.esc(t("common.dataPending")) + "</span></div>") +
          (p.people
            ? '<div style="font-size:.78rem;color:var(--ink-2);margin-top:4px">👥 ' +
              PA1.esc(t("gl.people", { people: PA1.pick(p.people) })) + "</div>"
            : "") +
          (tagLabel ? '<div style="margin-top:8px"><span class="chip chip-normal">' + PA1.esc(tagLabel) + "</span></div>" : "") +
          "</div></div>"
        );
      })
      .join("");

    grid.querySelectorAll(".photo-card").forEach((el) => {
      const open = () => openLb(Number(el.dataset.i));
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
  }

  /* ---------- 灯箱 ---------- */
  const lb = $("#lightbox");
  const frame = $("#lb-frame");
  const lbTitle = $("#lb-title");
  const lbMeta = $("#lb-meta");
  const lbCount = $("#lb-count");

  function openLb(i) {
    lbIdx = i;
    renderLb();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  function stepLb(delta) {
    if (!items.length) return;
    lbIdx = (lbIdx + delta + items.length) % items.length;
    renderLb();
  }

  function renderLb() {
    const p = items[lbIdx];
    if (!p) return;
    frame.style.setProperty("--cover", coverStyle(p));
    frame.innerHTML = coverHTML(p, true);
    lbTitle.textContent = PA1.pick(p.title);
    const tags = D().tags || {};
    const tagLabel = tags[p.tag] ? PA1.pick(tags[p.tag]) : "";
    lbMeta.textContent =
      PA1.fmtDateFull(p.date) +
      (p.people ? " · " + t("gl.people", { people: PA1.pick(p.people) }) : "") +
      (tagLabel ? " · " + tagLabel : "");
    lbCount.textContent = t("gl.lightbox.of", { n: lbIdx + 1, total: items.length });
  }

  $("#lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  $("#lb-prev").addEventListener("click", (e) => { e.stopPropagation(); stepLb(-1); });
  $("#lb-next").addEventListener("click", (e) => { e.stopPropagation(); stepLb(1); });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "ArrowRight") stepLb(1);
  });

  /* 移动端滑动手势 */
  let touchX = 0;
  $("#lb-stage").addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  $("#lb-stage").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 44) stepLb(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("DOMContentLoaded", () => {
    render();
    window.addEventListener("pa1:lang", () => { closeLb(); render(); });
  });
})();
