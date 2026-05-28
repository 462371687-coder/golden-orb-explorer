import { motion } from "framer-motion";

const awards = [
  "校级一等、二等奖学金（2024、2025学年）",
  "蓝桥杯大赛市级三等奖（2025）",
  "全国高校 AIGC 数智建筑与文创产品设计大赛 二等奖（2025）",
  "全国大学生科技美术创新大赛 市级三等奖（2024）",
];

const courses = [
  "版式设计",
  "VI 设计",
  "交互设计",
  "界面 / 用户体验设计",
  "包装设计",
  "广告策划与设计",
];

const skills = ["AI", "PS", "AE", "C4D", "Figma"];

const experience = [
  "独立完成 Bello 与 栖茶 品牌全案设计",
  "统筹团队完成文创产品 0→1 全流程设计",
  "蓝桥杯「北京布老虎」非遗文创品牌打造 / 大创布老虎文创设计",
  "外卖小程序 UI 设计",
  "北京银行中秋 banner、员工手册封面设计",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs tracking-[0.5em] uppercase text-white/70">04 / About</p>
        <h2 className="mt-6 text-5xl font-light tracking-widest md:text-7xl">关 于 我</h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        {/* Left: avatar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10">
            <img
              src="/portfolio/avatar.jpg"
              alt="郑苏妍"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Designer</p>
            <h3 className="mt-2 text-3xl font-light tracking-widest">郑 苏 妍</h3>
            <p className="mt-1 text-sm tracking-[0.25em] text-white/60">
              ZHENG SUYAN · 品牌 / 视觉设计师
            </p>
          </div>
        </motion.div>

        {/* Right: details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-10"
        >
          <Block title="教 育 EDUCATION">
            <p className="text-white/80">本科 · 视觉传达设计</p>
            <p className="text-white/50">2023.09 — 至今 · GPA 专业前 10%</p>
          </Block>

          <Block title="奖 项 AWARDS">
            <ul className="space-y-2 text-white/70">
              {awards.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 h-[2px] w-4 flex-shrink-0 bg-[#f7b652]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="主 修 课 程 COURSES">
            <div className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs tracking-widest text-white/70"
                >
                  {c}
                </span>
              ))}
            </div>
          </Block>

          <Block title="技 能 SKILLS">
            <div className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-sm bg-white/5 px-4 py-2 text-sm tracking-[0.25em] text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </Block>

          <Block title="实 践 经 历 EXPERIENCE">
            <ol className="space-y-3 text-white/70">
              {experience.map((e, i) => (
                <li key={e} className="flex gap-4">
                  <span className="text-xs tracking-[0.2em] text-[#f7b652]">
                    0{i + 1}
                  </span>
                  <span>{e}</span>
                </li>
              ))}
            </ol>
          </Block>
        </motion.div>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs tracking-[0.4em] text-white/40 uppercase">{title}</p>
      <div className="text-sm leading-relaxed tracking-wider">{children}</div>
    </div>
  );
}