/* ==========================================================================
   Pre A1 · Class Hub — 公共交互逻辑
   导航 / 主题切换 / 语言切换 / 滚动渐入 / 返回顶部 / 模态框助手 / 工具函数
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- 1. 校徽 Logo：导航栏 / 抽屉 / 页脚均在 HTML 内嵌 <img>，无需 JS 注入 ---------- */

  /* ---------- 2. 当前页面高亮 ---------- */
  const page = document.body.dataset.page || "";
  $$(".nav-links a, .drawer nav a").forEach((a) => {
    if (a.dataset.page === page) a.classList.add("active");
  });

  /* ---------- 3. 移动端抽屉 ---------- */
  const drawer = $(".drawer");
  const backdrop = $(".backdrop");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open");
    backdrop.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("show");
    document.body.style.overflow = "";
  }
  const hamburger = $(".hamburger");
  if (hamburger) hamburger.addEventListener("click", openDrawer);
  $(".drawer-close") && $(".drawer-close").addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  $$(".drawer nav a").forEach((a) => a.addEventListener("click", closeDrawer));

  /* ---------- 4. 深色模式 ---------- */
  const themeBtn = $(".theme-btn");
  let theme = "light";
  try { theme = localStorage.getItem("pa1-theme") === "dark" ? "dark" : "light"; } catch (e) { /* ignore */ }

  function applyTheme(t) {
    theme = t;
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("pa1-theme", t); } catch (e) { /* ignore */ }
    if (themeBtn) themeBtn.setAttribute("aria-label", PA1.t(t === "dark" ? "theme.light" : "theme.dark"));
  }
  applyTheme(theme);
  if (themeBtn) {
    themeBtn.addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));
  }

  /* ---------- 5. 语言切换 ---------- */
  $$(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => PA1.applyLang(PA1.lang() === "zh" ? "en" : "zh"));
  });

  /* ---------- 6. 滚动渐入 ---------- */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $$(".stagger").forEach((box) => {
    Array.from(box.children).forEach((child, i) => child.style.setProperty("--i", i));
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => {
    if (prefersReduced) el.classList.add("revealed");
    else io.observe(el);
  });

  /* ---------- 7. 返回顶部 ---------- */
  const backTop = document.createElement("button");
  backTop.className = "backtop";
  backTop.setAttribute("aria-label", PA1.t("common.backTop"));
  backTop.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(backTop);
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        backTop.classList.toggle("show", window.scrollY > 640);
        ticking = false;
      });
    },
    { passive: true }
  );

  /* ---------- 8. 模态框助手 ---------- */
  function closeModal(m) {
    m.classList.remove("open");
    setTimeout(() => m.remove(), 380);
  }

  PA1.openModal = function (opts) {
    const m = document.createElement("div");
    m.className = "modal-backdrop";
    m.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
      '<div class="modal-head">' +
      '<h3 class="h3">' + (opts.title || "") + "</h3>" +
      '<button class="modal-close" aria-label="' + PA1.t("common.close") + '">✕</button>' +
      "</div>" +
      '<div class="modal-body">' + (opts.body || "") + "</div>" +
      "</div>";
    document.body.appendChild(m);
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("open")));

    const close = () => closeModal(m);
    $(".modal-close", m).addEventListener("click", close);
    m.addEventListener("click", (e) => { if (e.target === m) close(); });

    if (opts.onEsc !== false) {
      const esc = (e) => { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); } };
      document.addEventListener("keydown", esc);
    }
    if (opts.onOpen) opts.onOpen($(".modal", m), m);
    return { el: m, close };
  };

  /* ESC 关闭抽屉 */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) closeDrawer();
  });

  /* ---------- 9. 工具函数 ---------- */
  PA1.D = () => window.CLASS_DATA;

  PA1.houseOf = (id) => PA1.D().houses.find((h) => h.id === id) || null;

  /* 判断颜色是否偏浅（用于 Valpy 白色书院等浅色系，需要深色文字保证可读） */
  PA1.isLightColor = (hex) => {
    const h = String(hex || "").replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return false;
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.78;
  };

  /* 浅色书院的描边色：白色改用银灰，避免在浅色背景上看不见 */
  PA1.houseRing = (color) => (PA1.isLightColor(color) ? "#b8bdc2" : color);

  PA1.subjectOf = (key) => PA1.D().subjects[key] || null;

  PA1.WEEKDAYS = { zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] };

  PA1.weekdayName = (i) => PA1.WEEKDAYS[PA1.lang()][i];

  /* 本地化日期：fmtDate("2026-09-01") → "9月1日" / "1 Sep" */
  PA1.fmtDate = (d) => {
    const dt = new Date(d + "T00:00:00");
    if (isNaN(dt)) return d;
    return new Intl.DateTimeFormat(PA1.lang() === "zh" ? "zh-CN" : "en-GB", { month: "short", day: "numeric" }).format(dt);
  };
  PA1.fmtDateFull = (d) => {
    const dt = new Date(d + "T00:00:00");
    if (isNaN(dt)) return d;
    return new Intl.DateTimeFormat(PA1.lang() === "zh" ? "zh-CN" : "en-GB", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(dt);
  };

  /* 月份标签："2026-09" → "2026年9月" / "Sep 2026" */
  PA1.fmtMonth = (m) => {
    const dt = new Date(m + "-01T00:00:00");
    if (isNaN(dt)) return m;
    return new Intl.DateTimeFormat(PA1.lang() === "zh" ? "zh-CN" : "en-GB", { year: "numeric", month: "long" }).format(dt);
  };

  /* 姓名字符串：{zh,en} → 当前语言 */
  PA1.nameOf = (n) => PA1.pick(n);

  /* 转义 HTML（防注入） */
  PA1.esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* 生成首字母头像底色（按名字哈希取稳定色） */
  const AVATAR_COLORS = ["#2A3C7E", "#B03A3A", "#2E6B4F", "#7C5CD6", "#A04FBF", "#B08A2E", "#C8507E", "#2E9E8F", "#5460C8", "#9A6B4F"];
  PA1.avatarColor = (name) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return AVATAR_COLORS[h % AVATAR_COLORS.length];
  };

  /* 名字 → 首字母（中文取第一个字，英文取首字母大写） */
  PA1.initials = (name) => {
    if (!name) return "?";
    const s = name.trim();
    if (/[一-龥]/.test(s)) return s[0];
    const parts = s.split(/\s+/);
    return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  };
})();
