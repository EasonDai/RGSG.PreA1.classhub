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
    name: { zh: "南京金地未来学校", en: "Royal Grammar School Guildford Nanjing" },
    motto: { zh: "正直 · 包容 · 健康 · 坚毅 · 进取", en: "Integrity · Inclusiveness · Health · Perseverance · Enterprise" },
    address: { zh: "南京市江北新区浦口区康健路17号", en: "No.17 Kangjian Road, Jiangbei New Area, Nanjing" },
  },

  /* ---------- 班级基本信息（待填） ---------- */
  classInfo: {
    name: { zh: "Pre A1 班", en: "Pre A1" },
    slogan: { zh: "", en: "" }, // 班级口号，如 {zh:"乘风破浪，未来可期", en:"Ride the waves, embrace the future"}
    homeroomTeacher: { zh: "", en: "" }, // 班主任姓名，如 {zh:"王老师", en:"Ms. Wang"}
    termStart: "2026-09-01", // 学年开始日期（首页"学年周"计算用），按实际修改
    photo: "assets/class-photo.jpg", // 班级合照（首页英雄区）
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

  /* ---------- 课程表 ----------
     ⚠️ 当前是虚拟示例课表（老师统一写"示例老师"，教室为通用编号），仅用于预览页面效果。
     拿到班级真实课表后整体替换：周一到周五每天一个数组，按节次顺序排列；
     subject 填上面 subjects 的英文键名，某节没课就写 null。
     每节课的时间在 periods 里（左侧时间列自动显示）。
  */
  timetable: {
    mon: [
      { subject: "chinese", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A201" },
      { subject: "math", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A202" },
      { subject: "english", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A203" },
      { subject: "physics", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "物理实验室 B101" },
      { subject: "history", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A204" },
      { subject: "pe", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "体育馆" },
      { subject: "cs", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "机房 C201" },
      null,
    ],
    tue: [
      { subject: "english", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A203" },
      { subject: "math", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A202" },
      { subject: "chinese", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A201" },
      { subject: "chemistry", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "化学实验室 B102" },
      { subject: "biology", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "生物实验室 B103" },
      { subject: "geography", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A205" },
      { subject: "art", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "美术教室 C301" },
      null,
    ],
    wed: [
      { subject: "math", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A202" },
      { subject: "english", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A203" },
      { subject: "physics", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "物理实验室 B101" },
      { subject: "chinese", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A201" },
      { subject: "cs", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "机房 C201" },
      { subject: "economics", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A206" },
      { subject: "music", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "音乐教室 C302" },
      null,
    ],
    thu: [
      { subject: "chinese", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A201" },
      { subject: "chemistry", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "化学实验室 B102" },
      { subject: "math", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A202" },
      { subject: "english", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A203" },
      { subject: "biology", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "生物实验室 B103" },
      { subject: "dt", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "创客工坊 C303" },
      { subject: "pe", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "体育馆" },
      null,
    ],
    fri: [
      { subject: "english", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A203" },
      { subject: "math", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A202" },
      { subject: "chinese", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A201" },
      { subject: "physics", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "物理实验室 B101" },
      { subject: "economics", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A206" },
      { subject: "geography", teacher: { zh: "示例老师", en: "Sample Teacher" }, room: "A205" },
      null,
      null,
    ],
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

  /* ---------- 班级角（原荣誉墙，现为班级角照片墙） ----------
     新增照片：放进 assets/班级角/ 后在下面加一行即可。 */
  classCorner: [
    { photo: "assets/班级角/微信图片_20260829182646_38_389.jpg", ratio: "3/2", title: { zh: "班级角 · 01", en: "Class Corner 01" } },
    { photo: "assets/班级角/微信图片_20260829182647_39_389.jpg", ratio: "3/2", title: { zh: "班级角 · 02", en: "Class Corner 02" } },
    { photo: "assets/班级角/微信图片_20260829182649_40_389.jpg", ratio: "3/2", title: { zh: "班级角 · 03", en: "Class Corner 03" } },
    { photo: "assets/班级角/微信图片_20260829182650_41_389.jpg", ratio: "3/2", title: { zh: "班级角 · 04", en: "Class Corner 04" } },
  ],

  /* ---------- 活动相册（待填） ----------
     cover 填下方 PRESET_COVERS 的键名（如 "navy"），或直接写 CSS 渐变字符串。
     ratio 三选一："4/3"（横图）/ "1/1"（方图）/ "3/4"（竖图），错落排列更好看。
     emoji 是照片上传前的占位图标，上传真实照片后可删除此项。
     格式示例：
     { cover: "navy", emoji: "🎒", ratio: "4/3",
       title: {zh:"开学第一天", en:"First Day of School"},
       date: "2026-09-01", tag: "开学", people: "全体同学" } */
  gallery: [
    // 真实照片：新生周活动（assets/新生周活动照片/）。日期 / 参与人待班级补充，标题可自行改。
    { photo: "assets/新生周活动照片/照片1.jpg", ratio: "3/2", title: { zh: "新生周活动 · 01", en: "Orientation Week 01" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/照片2.jpg", ratio: "3/2", title: { zh: "新生周活动 · 02", en: "Orientation Week 02" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/照片3.jpg", ratio: "3/2", title: { zh: "新生周活动 · 03", en: "Orientation Week 03" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/照片4.jpg", ratio: "16/9", title: { zh: "新生周活动 · 04", en: "Orientation Week 04" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/照片5.jpg", ratio: "2/3", title: { zh: "新生周活动 · 05", en: "Orientation Week 05" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/微信图片_20260829182651_42_389.jpg", ratio: "3/2", title: { zh: "新生周活动 · 06", en: "Orientation Week 06" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/微信图片_20260829182653_43_389.jpg", ratio: "3/2", title: { zh: "新生周活动 · 07", en: "Orientation Week 07" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/微信图片_20260829182654_44_389.jpg", ratio: "2/3", title: { zh: "新生周活动 · 08", en: "Orientation Week 08" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/微信图片_20260829182656_45_389.jpg", ratio: "2/3", title: { zh: "新生周活动 · 09", en: "Orientation Week 09" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/微信图片_20260829182657_46_389.jpg", ratio: "3/2", title: { zh: "新生周活动 · 10", en: "Orientation Week 10" }, date: "", tag: "新生周活动", people: "" },
    { photo: "assets/新生周活动照片/微信图片_20260829182658_47_389.jpg", ratio: "3/2", title: { zh: "新生周活动 · 11", en: "Orientation Week 11" }, date: "", tag: "新生周活动", people: "" },
    // 新增照片：把照片放进 assets/ 后在下面加一行即可（photo 填路径，title 填标题，tag 填分类）。
  ],

  /* ---------- 相册标签（活动分类，可增删） ---------- */
  tags: {
    "新生周活动": { zh: "新生周活动", en: "Orientation Week" },
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
