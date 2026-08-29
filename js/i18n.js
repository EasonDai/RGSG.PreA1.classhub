/* ==========================================================================
   Pre A1 · Class Hub — 中英双语引擎
   用法：
   - 静态文案：HTML 元素加 data-i18n="key" / data-i18n-ph="key"
   - 动态文案：JS 里调用 PA1.t("key") 或 PA1.pick({zh:"中文", en:"English"})
   - 切换语言后页面脚本监听 "pa1:lang" 事件重新渲染
   ========================================================================== */
(function () {
  "use strict";

  const I18N = {
    zh: {
      /* 导航 */
      "nav.home": "首页",
      "nav.timetable": "课程表",
      "nav.members": "班级成员",
      "nav.gallery": "活动相册",
      "nav.close": "关闭菜单",

      /* 首页 Hero */
      "hero.crest": "南京金地未来学校 · 国际高中",
      "hero.tagline": "欢迎来到 Pre A1 班的数字之家 —— 在这里，看见我们的每一天。",
      "hero.cta.timetable": "查看课程表",
      "hero.cta.members": "认识我们",
      "hero.panel.title": "班级速览",
      "hero.stat.students": "位同学",
      "hero.stat.teachers": "位老师",
      "hero.stat.houses": "大书院",
      "hero.stat.weeks": "学年周",

      /* 首页区块 */
      "sec.today.eyebrow": "Today",
      "sec.today.title": "今日一览",
      "sec.today.sub": "今天的课程、值日、生日与作业截止，一屏尽览。",
      "sec.countdown.eyebrow": "Countdown",
      "sec.countdown.title": "重要日子倒计时",
      "sec.countdown.sub": "每一个值得期待的日子，我们都在心里倒数。",
      "sec.news.eyebrow": "Notice Board",
      "sec.news.title": "班级快讯",
      "sec.news.sub": "最新的班级通知与大事小情。",
      "sec.quick.eyebrow": "Quick Access",
      "sec.quick.title": "快速入口",
      "sec.quick.sub": "常用板块一键直达。",
      "sec.honor.eyebrow": "Class Corner",
      "sec.honor.title": "班级角",
      "sec.honor.sub": "教室里属于我们的那一角，收藏着日常的点滴。",

      /* 今日一览卡片 */
      "today.classes": "今日课程",
      "today.duty": "今日值日",
      "today.birthday": "今日生日",
      "today.deadline": "作业截止",
      "today.empty": "今日暂无安排",
      "today.noBirthday": "今天没有同学过生日",
      "today.nextBirthday": "最近的生日：{name}（还有 {days} 天）",
      "today.noDeadline": "近期没有截止的作业",
      "today.birthdaySoon": "{name} · 还有 {days} 天",
      "today.weekend": "周末愉快！下周一课程：",
      "today.dutyNames": "值日同学：{names}",

      /* 倒计时 */
      "cd.day": "天",
      "cd.hour": "时",
      "cd.min": "分",
      "cd.sec": "秒",
      "cd.ended": "已结束",
      "cd.started": "进行中",
      "cd.today": "就是今天！",

      /* 作业紧迫度 */
      "deadline.overdue": "已截止",
      "deadline.left": "剩 {d} 天",
      "deadline.today": "今天截止",

      /* 快讯 */
      "news.detail": "查看详情",
      "tag.urgent": "紧急",
      "tag.important": "重要",
      "tag.normal": "通知",

      /* 快速入口 */
      "quick.timetable.t": "课程表",
      "quick.timetable.d": "本周课程一目了然，点击课程查看详情",
      "quick.members.t": "班级成员",
      "quick.members.d": "认识每一位同学与老师，还有我们的书院",
      "quick.gallery.t": "活动相册",
      "quick.gallery.d": "我们的高光时刻，都在这里珍藏",
      "quick.about.t": "班级角",
      "quick.about.d": "教室一角，记录我们的日常",

      /* 班级角 */
      "honor.empty": "班级角的照片正在布置中…",
      "honor.date": "{date} 获得",

      /* 课程表页 */
      "tt.pageTitle": "课程表",
      "tt.pageSub": "点击任意课程查看详情。当前日期：{date}",
      "tt.legend": "科目图例",
      "tt.lunch": "午 休 · Lunch Break",
      "tt.period": "第 {n} 节",
      "tt.today": "今天",
      "tt.empty": "本节暂无课程",
      "tt.modal.title": "课程详情",
      "tt.modal.time": "上课时间",
      "tt.modal.teacher": "任课教师",
      "tt.modal.room": "教室",
      "tt.modal.subject": "科目",
      "tt.modal.period": "节次",
      "tt.dataEmpty": "课程表数据待录入 —— 请将本周课表填入 js/data.js",
      "tt.dataEmptyHint": "格式见 data.js 中的注释示例，拍照发给我们也可以！",

      /* 成员页 */
      "mb.pageTitle": "班级成员",
      "mb.pageSub": "同学与老师，还有我们的四大书院。",
      "mb.filter.all": "全部",
      "mb.filter.teacher": "老师",
      "mb.filter.student": "同学",
      "mb.modal.title": "成员档案",
      "mb.modal.house": "书院",
      "mb.modal.birthday": "生日",
      "mb.modal.role": "职务",
      "mb.modal.hobby": "爱好",
      "mb.modal.motto": "座右铭",
      "mb.modal.subject": "科目",
      "mb.role.homeroom": "班主任",
      "mb.dataEmpty": "成员名单待录入 —— 请将名单填入 js/data.js",
      "mb.section.teachers": "老师团队",
      "mb.section.students": "同学们",

      /* 相册页 */
      "sec.gallery.eyebrow": "Moments",
      "gl.pageTitle": "活动相册",
      "gl.pageSub": "我们的高光时刻，一张张珍藏。",
      "gl.filter.all": "全部",
      "gl.timeline": "学期时间线",
      "gl.lightbox.of": "共 {total} 张 · 第 {n} 张",
      "gl.lightbox.close": "关闭 (Esc)",
      "gl.lightbox.prev": "上一张",
      "gl.lightbox.next": "下一张",
      "gl.dataEmpty": "照片待上传 —— 把班级照片发给我们，填入 assets 后即可展示",
      "gl.hint": "点击照片放大浏览，支持键盘 ← → 切换",
      "gl.people": "参与：{people}",

      /* 通用 */
      "common.dataPending": "信息待录入",
      "common.dataPendingHint": "班级信息收集完成后将在这里展示",
      "common.backTop": "返回顶部",
      "common.learnMore": "了解更多",
      "common.close": "关闭",

      /* 页脚 */
      "footer.about": "Pre A1 班级平台",
      "footer.about.desc": "由 Pre A1 班同学共同打造的数字之家，记录我们共同成长的每一天。",
      "footer.col.pages": "快捷链接",
      "footer.col.class": "班级信息",
      "footer.col.class.school": "南京金地未来学校",
      "footer.col.class.grade": "国际高中 · Pre A1 班",
      "footer.col.class.houses": "Austen / Beckingham / Hamonde / Valpy 四大书院",
      "footer.built": "用 ❤ 打造 · Designed & Built by Pre A1",
      "footer.rights": "© {year} 南京金地未来学校 Pre A1 班 · 仅供班级内部使用",
      "footer.motto": "正直 · 包容 · 健康 · 坚毅 · 进取",

      /* 主题与语言 */
      "theme.light": "切换到浅色模式",
      "theme.dark": "切换到深色模式",
    },

    en: {
      /* Nav */
      "nav.home": "Home",
      "nav.timetable": "Timetable",
      "nav.members": "Members",
      "nav.gallery": "Gallery",
      "nav.close": "Close menu",

      /* Hero */
      "hero.crest": "ROYAL GRAMMAR SCHOOL GUILDFORD NANJING · INTERNATIONAL HIGH SCHOOL",
      "hero.tagline": "Welcome to the digital home of Pre A1 — where every day of ours comes to life.",
      "hero.cta.timetable": "View Timetable",
      "hero.cta.members": "Meet the Class",
      "hero.panel.title": "Class at a Glance",
      "hero.stat.students": "Students",
      "hero.stat.teachers": "Teachers",
      "hero.stat.houses": "Houses",
      "hero.stat.weeks": "Academic Weeks",

      /* Home sections */
      "sec.today.eyebrow": "Today",
      "sec.today.title": "Today at a Glance",
      "sec.today.sub": "Classes, duty, birthdays and deadlines — all in one view.",
      "sec.countdown.eyebrow": "Countdown",
      "sec.countdown.title": "Counting Down to Big Days",
      "sec.countdown.sub": "Every day worth looking forward to, counted down together.",
      "sec.news.eyebrow": "Notice Board",
      "sec.news.title": "Class News",
      "sec.news.sub": "The latest announcements and stories of our class.",
      "sec.quick.eyebrow": "Quick Access",
      "sec.quick.title": "Quick Access",
      "sec.quick.sub": "Jump straight to what you need.",
      "sec.honor.eyebrow": "Class Corner",
      "sec.honor.title": "Class Corner",
      "sec.honor.sub": "Our little corner of the classroom, keeping the everyday moments.",

      /* Today cards */
      "today.classes": "Today's Classes",
      "today.duty": "On Duty Today",
      "today.birthday": "Birthdays Today",
      "today.deadline": "Upcoming Deadlines",
      "today.empty": "Nothing scheduled today",
      "today.noBirthday": "No birthdays today",
      "today.nextBirthday": "Next: {name} (in {days} days)",
      "today.noDeadline": "No upcoming deadlines",
      "today.birthdaySoon": "{name} · in {days} days",
      "today.weekend": "Happy weekend! Monday classes:",
      "today.dutyNames": "On duty: {names}",

      /* Countdown */
      "cd.day": "d",
      "cd.hour": "h",
      "cd.min": "m",
      "cd.sec": "s",
      "cd.ended": "Ended",
      "cd.started": "Ongoing",
      "cd.today": "It's today!",

      /* Deadlines */
      "deadline.overdue": "Overdue",
      "deadline.left": "{d}d left",
      "deadline.today": "Due today",

      /* News */
      "news.detail": "Read more",
      "tag.urgent": "Urgent",
      "tag.important": "Important",
      "tag.normal": "Notice",

      /* Quick access */
      "quick.timetable.t": "Timetable",
      "quick.timetable.d": "The week at a glance — tap any class for details",
      "quick.members.t": "Members",
      "quick.members.d": "Meet everyone, and our four Houses",
      "quick.gallery.t": "Gallery",
      "quick.gallery.d": "Our highlights, treasured here",
      "quick.about.t": "Class Corner",
      "quick.about.d": "A corner of our classroom, recording our daily life",

      /* Honours */
      "honor.empty": "Class Corner photos are on their way!",
      "honor.date": "Awarded {date}",

      /* Timetable */
      "tt.pageTitle": "Timetable",
      "tt.pageSub": "Tap any class for details. Today: {date}",
      "tt.legend": "Subject Legend",
      "tt.lunch": "LUNCH BREAK · 午休",
      "tt.period": "P{n}",
      "tt.today": "Today",
      "tt.empty": "Free period",
      "tt.modal.title": "Class Details",
      "tt.modal.time": "Time",
      "tt.modal.teacher": "Teacher",
      "tt.modal.room": "Room",
      "tt.modal.subject": "Subject",
      "tt.modal.period": "Period",
      "tt.dataEmpty": "Timetable data pending — add this week's schedule to js/data.js",
      "tt.dataEmptyHint": "See the commented example in data.js — or just send us a photo!",

      /* Members */
      "mb.pageTitle": "Our People",
      "mb.pageSub": "Students, teachers, and our four Houses.",
      "mb.filter.all": "All",
      "mb.filter.teacher": "Teachers",
      "mb.filter.student": "Students",
      "mb.modal.title": "Profile",
      "mb.modal.house": "House",
      "mb.modal.birthday": "Birthday",
      "mb.modal.role": "Role",
      "mb.modal.hobby": "Hobbies",
      "mb.modal.motto": "Motto",
      "mb.modal.subject": "Subject",
      "mb.role.homeroom": "Homeroom Teacher",
      "mb.dataEmpty": "Member list pending — add names to js/data.js",
      "mb.section.teachers": "Teachers",
      "mb.section.students": "Students",

      /* Gallery */
      "sec.gallery.eyebrow": "Moments",
      "gl.pageTitle": "Gallery",
      "gl.pageSub": "Our highlights, treasured one by one.",
      "gl.filter.all": "All",
      "gl.timeline": "Term Timeline",
      "gl.lightbox.of": "{n} / {total}",
      "gl.lightbox.close": "Close (Esc)",
      "gl.lightbox.prev": "Previous",
      "gl.lightbox.next": "Next",
      "gl.dataEmpty": "Photos pending — send us class photos to fill the gallery",
      "gl.hint": "Click any photo to zoom. Use ← → keys to browse",
      "gl.people": "With: {people}",

      /* Common */
      "common.dataPending": "Data pending",
      "common.dataPendingHint": "Will appear here once class info is collected",
      "common.backTop": "Back to top",
      "common.learnMore": "Learn more",
      "common.close": "Close",

      /* Footer */
      "footer.about": "Pre A1 Class Hub",
      "footer.about.desc": "A digital home crafted by the students of Pre A1, recording every day of our growth together.",
      "footer.col.pages": "Pages",
      "footer.col.class": "Class Info",
      "footer.col.class.school": "Royal Grammar School Guildford Nanjing",
      "footer.col.class.grade": "International High School · Pre A1",
      "footer.col.class.houses": "Houses: Austen / Beckingham / Hamonde / Valpy",
      "footer.built": "Made with ❤ · Designed & Built by Pre A1",
      "footer.rights": "© {year} Pre A1, Royal Grammar School Guildford Nanjing · For class use only",
      "footer.motto": "Integrity · Inclusiveness · Health · Perseverance · Enterprise",

      /* Theme & language */
      "theme.light": "Switch to light mode",
      "theme.dark": "Switch to dark mode",
    },
  };

  /* ---------- 语言状态 ---------- */
  let lang = "zh";
  try { lang = localStorage.getItem("pa1-lang") === "en" ? "en" : "zh"; } catch (e) { /* ignore */ }

  const t = function (key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) ?? I18N.zh[key] ?? key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.split("{" + k + "}").join(String(vars[k]));
      });
    }
    return s;
  };

  /* 从 {zh, en} 对象中按当前语言取值 */
  const pick = function (obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] ?? obj.zh ?? obj.en ?? "";
  };

  /* 应用语言到页面 */
  function apply(l, skipStorage) {
    lang = l;
    if (!skipStorage) { try { localStorage.setItem("pa1-lang", l); } catch (e) { /* ignore */ } }
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });

    /* 语言按钮显示"另一种语言" */
    document.querySelectorAll(".lang-btn").forEach((btn) => { btn.textContent = l === "zh" ? "EN" : "中文"; });

    /* 通知各页面脚本重新渲染动态内容 */
    window.dispatchEvent(new CustomEvent("pa1:lang", { detail: { lang: l } }));
  }

  /* 对外 API */
  window.PA1 = window.PA1 || {};
  window.PA1.t = t;
  window.PA1.pick = pick;
  window.PA1.lang = () => lang;
  window.PA1.applyLang = apply;

  document.addEventListener("DOMContentLoaded", () => apply(lang, true));
})();
