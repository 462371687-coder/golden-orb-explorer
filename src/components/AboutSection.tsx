import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png.asset.json";

const awards: [string, string][] = [
  ["一等及二等奖学金 (2024, 2025)", "1ST & 2ND CLASS SCHOLARSHIP (2024, 2025)"],
  ["蓝桥杯 — 市级三等奖 (2025)", "LANQIAO CUP — MUNICIPAL 3RD PRIZE (2025)"],
  ["全国AIGC设计大赛 — 二等奖 (2025)", "NATIONAL AIGC DESIGN COMPETITION — 2ND PRIZE (2025)"],
  ["全国科艺创新 — 市级三等奖 (2024)", "NATIONAL SCI-ART INNOVATION — MUNICIPAL 3RD PRIZE (2024)"],
];

const skills = ["AI", "PS", "AE", "C4D", "FIGMA"];

const experience: [string, string][] = [
  ["Bello & Chicha 全案品牌设计", "FULL BRAND IDENTITY FOR BELLO & CHICHA"],
  ["带领团队从0到1文创产品设计", "LED TEAM ON 0→1 CULTURAL PRODUCT DESIGN"],
  ["蓝桥杯 — 北京布老虎非遗品牌设计", "LANQIAO CUP — BEIJING CLOTH TIGER HERITAGE BRANDING"],
  ["外卖小程序 UI 设计", "UI DESIGN FOR A FOOD DELIVERY MINI-PROGRAM"],
  ["北京银行 — 中秋Banner及手册封面", "BANK OF BEIJING — MID-AUTUMN BANNER & HANDBOOK COVER"],
];

const aigc = "Lovart / 即梦 / Lovable / Codex Agent / Cursor / 豆包AI（辅助创意与提效）/ 稿定AI";

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-white/15 px-6 py-32 md:py-48">
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        ABOUT
      </p>
      <h2 className="mt-8 text-center text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[8vw]">
        ZHENG SUYAN
      </h2>

      <div className="mx-auto mt-24 grid max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="inline-block border border-white/15 p-[1cm] md:sticky md:top-16"
        >
          <img
            src={portrait.url}
            alt="ZHENG SUYAN"
            className="block h-auto w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-12"
        >
          <Block title="姓名 NAME">
            <p className="text-2xl font-extrabold uppercase tracking-widest">
              ZHENG SUYAN · 郑苏妍
            </p>
          </Block>
          <Block title="职位 TITLE">
            <p className="text-base tracking-[0.2em]">品牌与视觉设计师</p>
            <p className="text-white/60">BRAND &amp; VISUAL DESIGNER</p>
          </Block>
          <Block title="教育背景 EDUCATION">
            <p className="text-base tracking-[0.2em]">视觉传达设计 本科</p>
            <p className="text-white/60">BA — VISUAL COMMUNICATION DESIGN</p>
            <p className="mt-4 text-base tracking-[0.2em]">2023.09 — 至今 · GPA 前10%</p>
            <p className="text-white/50">2023.09 — PRESENT · GPA TOP 10%</p>
          </Block>
          <Block title="获奖经历 AWARDS">
            <ul className="space-y-5">
              {awards.map(([zh, en]) => (
                <li key={en}>
                  <p className="text-base tracking-[0.2em]">{zh}</p>
                  <p className="text-white/60">{en}</p>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="主修课程 COURSES">
            <p className="text-base tracking-[0.2em]">
              版式设计 / 品牌视觉识别 / 交互设计 / UI设计 / UX设计 / 包装设计 / 广告设计
            </p>
            <p className="mt-3 text-white/60">
              LAYOUT / VI DESIGN / INTERACTION / UI / UX / PACKAGING / ADVERTISING
            </p>
          </Block>
          <Block title="专业技能 SKILLS">
            <p className="text-xl font-extrabold tracking-[0.3em]">
              {skills.join(" · ")}
            </p>
          </Block>
          <Block title="AIGC 工作流 AIGC WORKFLOW">
            <p className="text-base leading-loose tracking-[0.2em]">{aigc}</p>
          </Block>
          <Block title="项目经历 EXPERIENCE">
            <ul className="space-y-5">
              {experience.map(([zh, en]) => (
                <li key={en}>
                  <p className="text-base tracking-[0.2em]">{zh}</p>
                  <p className="text-white/60">{en}</p>
                </li>
              ))}
            </ul>
          </Block>
        </motion.div>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/15 pt-6">
      <p className="mb-4 text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">
        {title}
      </p>
      <div className="text-sm uppercase leading-relaxed tracking-[0.15em]">
        {children}
      </div>
    </div>
  );
}
