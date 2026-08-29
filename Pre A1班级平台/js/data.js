/* ==========================================================================
   Pre A1 · Class Hub — 班级数据层（唯一需要编辑的文件）
   ==========================================================================
   ★ 使用说明 ★
   1. 所有班级信息都在这个文件里填写，改完保存后刷新浏览器即可看到效果，
      不需要动任何其他代码。
   2. 每个字段都有注释说明和格式示例。示例写在 /* … *\/ 里，填好后删掉即可。
   3. 中英文文案用 {zh: "中文", en: "English"} 格式；只有中文就写 {zh: "中文"}。
   4. 日期格式统一为 "YYYY-MM-DD"；生日格式为 "MM-DD"。
   5. 空的数组（如 members.students）页面会显示"信息待录入"的友好提示，
      填上数据后自动展示。
   ========================================================================== */
window.CLASS_DATA = {
  /* ---------- 学校信息（已按真实信息填好，可改） ---------- */
  school: {
    name: { zh: "南京金地未来学校", en: "Nanjing Jindi Future School" },
    motto: { zh: "正直 · 包容 · 健康 · 坚毅 · 进取", en: "Integrity · Inclusiveness · Health · Perseverance · Enterprise" },
    address: { zh: "南京市江北新区浦口区康健路17号", en: "No.17 Kangjian Road, Jiangbei New Area, Nanjing" },
  },

  /* ---------- 班级基本信息（待填） ---------- */
  classInfo: {
    name: { zh: "Pre A1 班", en: "Pre A1" },
    slogan: { zh: "", en: "" }, // 班级口号，如 {zh:"乘风破浪，未来可期", en:"Ride the waves, embrace the future"}
    homeroomTeacher: { zh: "", en: "" }, // 班主任姓名，如 {zh:"王老师", en:"Ms. Wang"}
    termStart: "2026-09-01", // 学年开始日期（首页"学年周"计算用），按实际修改
    photo: "assets/class-photo.svg", // 现在是占位图；拿到真实合照后改成你的文件名，如 "assets/class-photo.jpg"
    headTeacherMessage: { zh: "", en: "" }, // 班主任寄语，可多句
    rules: [
      // 班规，每行一条，如 "上课认真听讲，积极发言",
      // "尊重每一位同学和老师",
    ],
  },

  /* ---------- 四大书院（真实书院名，颜色可按喜好调整） ---------- */
  houses: [
    { id: "austen", name: { zh: "奥斯汀书院", en: "Austen House" }, color: "#B03A3A" },
    { id: "beckingham", name: { zh: "白金汉书院", en: "Beckingham House" }, color: "#3E6BD0" },
    { id: "hamonde", name: { zh: "哈蒙德书院", en: "Hamonde House" }, color: "#3E8E5A" },
    { id: "valpy", name: { zh: "瓦尔皮书院", en: "Valpy House" }, color: "#FFFFFF" }, // 白色书院，页面已做浅色对比度处理
  ],

  /* ---------- 科目与颜色（按课程表实际科目增删，颜色可调） ---------- */
  subjects: {
    math: { zh: "数学", en: "Mathematics", color: "#3E6BE0" },
    english: { zh: "英语", en: "English", color: "#7C5CD6" },
    chinese: { zh: "语文", en: "Chinese", color: "#D95C5C" },
    physics: { zh: "物理", en: "Physics", color: "#2E9E8F" },
    chemistry: { zh: "化学", en: "Chemistry", color: "#E08A3C" },
    biology: { zh: "生物", en: "Biology", color: "#4C9E58" },
    history: { zh: "历史", en: "History", color: "#9A6B4F" },
    geography: { zh: "地理", en: "Geography", color: "#3B9BD8" },
    cs: { zh: "计算机", en: "Computer Science", color: "#5460C8" },
    economics: { zh: "经济", en: "Economics", color: "#B08A2E" },
    pe: { zh: "体育", en: "Physical Education", color: "#C8507E" },
    art: { zh: "美术", en: "Art & Design", color: "#A04FBF" },
    music: { zh: "音乐", en: "Music", color: "#5B8DEE" },
    dt: { zh: "设计与技术", en: "Design & Technology", color: "#5F7D8C" },
  },

  /* ---------- 作息时间（按学校实际时间表修改） ---------- */
  periods: [
    { n: 1, start: "8:00", end: "8:40" },
    { n: 2, start: "8:50", end: "9:30" },
    { n: 3, start: "9:50", end: "10:30" },
    { n: 4, start: "10:40", end: "11:20" },
    { n: 5, start: "11:30", end: "12:10" },
    { n: 6, start: "14:00", end: "14:40" },
    { n: 7, start: "14:50", end: "15:30" },
    { n: 8, start: "15:40", end: "16:20" },
  ],
  lunchAfter: 5, // 午休放在第 5 节课之后

  /* ---------- 课程表（待填） ----------
     周一到周五，每天一个数组，按节次顺序排列。
     subject 填上面 subjects 的英文键名（如 "math"）。
     某节没课就写 null。
     格式示例（填好后删掉注释）：
     mon: [
       { subject: "math", teacher: {zh:"王老师", en:"Ms. Wang"}, room: "A203" },
       { subject: "english", teacher: {zh:"Smith老师", en:"Mr. Smith"}, room: "A205" },
       null,
       ...
     ],
  */
  timetable: {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
  },

  /* ---------- 教师名单（待填） ----------
     格式示例：
     { name: {zh:"王老师", en:"Ms. Wang"}, subject: "math", role: "homeroom",
       motto: {zh:"教育是点燃火焰", en:"Education is kindling a flame"} }
     role 只有班主任填 "homeroom"，其他老师留空 ""。
  */
  members: {
    /* 教师名单：班主任 Alisa；其他老师的信息待补充（姓名 / 科目） */
    teachers: [
      { name: { zh: "Alisa" }, subject: "", role: "homeroom", motto: { zh: "", en: "" } },
    ],
    /* ---------- 学生名单（姓名已录入，其余信息待补） ----------
       house 填 "austen" / "beckingham" / "hamonde" / "valpy"（待同学们告知）；
       role（职务）、birthday（"MM-DD"）、motto（座右铭）、hobbies（爱好）同样待补。
    */
    students: [
      { name: { zh: "叶子瑄", en: "Melody" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "丁楚彤", en: "Chris" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "戴亿承", en: "Eason" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "朱小棠", en: "Tanya" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "周子航", en: "Hank" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "戴子涵", en: "Lisa" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "王思淇", en: "Vein" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "陈逸楷", en: "Eddy" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "张家豪", en: "Evan" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "原梓焓", en: "Alice" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "高熙妍", en: "Lisa" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "谷雨", en: "Summer" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "王汐", en: "Kelly" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "洪咏思", en: "Alice" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "万益坤", en: "Harry" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "黄韵如", en: "Olivia" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "盛文辰", en: "" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "黄箬心", en: "" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "王伟杰", en: "" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
      { name: { zh: "窦金苗", en: "" }, house: "", role: "", motto: { zh: "", en: "" }, birthday: "", hobbies: { zh: "", en: "" } },
    ],
  },

  /* ---------- 值日表（待填） ----------
     每天的值日同学名单（写中文名），如 mon: ["陈思远", "李明"] */
  duty: { mon: [], tue: [], wed: [], thu: [], fri: [] },

  /* ---------- 重要日子倒计时（待填） ----------
     格式示例：{ name: {zh:"新学期开学", en:"First Day of Term"}, date: "2026-09-01", emoji: "🎒" }
     date 已过的事件会自动显示"已结束"。 */
  events: [],

  /* ---------- 班级公告（待填） ----------
     格式示例：
     { date: "2026-08-28", tag: "urgent",
       title: {zh:"开学报到提醒", en:"Back-to-School Reminder"},
       body: {zh:"9月1日上午8点到班报到，请带齐暑假作业。", en:"..."} }
     tag 三选一："urgent"（紧急）/ "important"（重要）/ "normal"（通知） */
  announcements: [],

  /* ---------- 班级荣誉（待填） ----------
     格式示例：{ name: {zh:"英文拼写大赛 冠军", en:"Spelling Bee Champion"}, date: "2026-05", emoji: "🏆" } */
  honors: [],

  /* ---------- 活动相册（待填） ----------
     cover 填下方 PRESET_COVERS 的键名（如 "navy"），或直接写 CSS 渐变字符串。
     ratio 三选一："4/3"（横图）/ "1/1"（方图）/ "3/4"（竖图），错落排列更好看。
     emoji 是照片上传前的占位图标，上传真实照片后可删除此项。
     格式示例：
     { cover: "navy", emoji: "🎒", ratio: "4/3",
       title: {zh:"开学第一天", en:"First Day of School"},
       date: "2026-09-01", tag: "开学", people: "全体同学" } */
  gallery: [
    // 以下 6 张是占位图（assets/gallery-01.svg ~ 06.svg）。拿到真实照片后：
    // 1) 把照片放进 assets/；2) 把 photo 改成你的文件名（如 "assets/gallery-01.jpg"）；3) 补上 date / tag / people。
    { photo: "assets/gallery-01.svg", ratio: "4/3", title: { zh: "照片待替换 · 01", en: "Placeholder 01" }, date: "", tag: "", people: "" },
    { photo: "assets/gallery-02.svg", ratio: "3/4", title: { zh: "照片待替换 · 02", en: "Placeholder 02" }, date: "", tag: "", people: "" },
    { photo: "assets/gallery-03.svg", ratio: "1/1", title: { zh: "照片待替换 · 03", en: "Placeholder 03" }, date: "", tag: "", people: "" },
    { photo: "assets/gallery-04.svg", ratio: "4/3", title: { zh: "照片待替换 · 04", en: "Placeholder 04" }, date: "", tag: "", people: "" },
    { photo: "assets/gallery-05.svg", ratio: "3/4", title: { zh: "照片待替换 · 05", en: "Placeholder 05" }, date: "", tag: "", people: "" },
    { photo: "assets/gallery-06.svg", ratio: "1/1", title: { zh: "照片待替换 · 06", en: "Placeholder 06" }, date: "", tag: "", people: "" },
  ],

  /* ---------- 相册标签（活动分类，可增删） ---------- */
  tags: {
    "开学": { zh: "开学", en: "Term Start" },
    "运动会": { zh: "运动会", en: "Sports Day" },
    "班会": { zh: "班会", en: "Class Meeting" },
    "研学": { zh: "研学", en: "Field Trip" },
    "节日": { zh: "节日", en: "Festival" },
    "获奖": { zh: "获奖", en: "Awards" },
  },

  /* ---------- 作业截止（待填，用于首页"作业截止"卡片） ----------
     格式示例：{ subject: "math", title: {zh:"数学习题 3.1-3.3", en:"Ex 3.1-3.3"}, date: "2026-09-05" } */
  deadlines: [],
};

/* ---------- 相册封面渐变预设（可自行添加） ---------- */
window.PRESET_COVERS = {
  navy: "linear-gradient(135deg, #16224F, #2A3C7E)",
  navy2: "linear-gradient(135deg, #1E2D63, #3E6BD0)",
  gold: "linear-gradient(135deg, #B08A2E, #E8CF85)",
  sunset: "linear-gradient(135deg, #B03A3A, #E08A3C)",
  forest: "linear-gradient(135deg, #2E6B4F, #4C9E58)",
  ocean: "linear-gradient(135deg, #2E9E8F, #3B9BD8)",
  grape: "linear-gradient(135deg, #7C5CD6, #A04FBF)",
  rose: "linear-gradient(135deg, #C8507E, #D95C5C)",
};
