import { motion } from "framer-motion";

const awards = [
  "1ST & 2ND CLASS SCHOLARSHIP (2024, 2025)",
  "LANQIAO CUP — MUNICIPAL 3RD PRIZE (2025)",
  "NATIONAL AIGC DESIGN COMPETITION — 2ND PRIZE (2025)",
  "NATIONAL SCI-ART INNOVATION — MUNICIPAL 3RD PRIZE (2024)",
];

const courses = [
  "LAYOUT",
  "VI DESIGN",
  "INTERACTION",
  "UI / UX",
  "PACKAGING",
  "ADVERTISING",
];

const skills = ["AI", "PS", "AE", "C4D", "FIGMA"];

const experience = [
  "FULL BRAND IDENTITY FOR BELLO & CHICHA",
  "LED TEAM ON 0→1 CULTURAL PRODUCT DESIGN",
  "LANQIAO CUP — BEIJING CLOTH TIGER HERITAGE BRANDING",
  "UI DESIGN FOR A FOOD DELIVERY MINI-PROGRAM",
  "BANK OF BEIJING — MID-AUTUMN BANNER & HANDBOOK COVER",
];

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-white/15 px-6 py-32 md:py-48">
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        ABOUT
      </p>
      <h2 className="mt-8 text-center text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[8vw]">
        ZHENG SUYAN
      </h2>

      <div className="mx-auto mt-24 grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="border border-white/15 p-[1cm]"
        >
          <img
            src="/portfolio/avatar.jpg"
            alt="ZHENG SUYAN"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-12"
        >
          <Block title="NAME">
            <p className="text-2xl font-extrabold uppercase tracking-widest">
              ZHENG SUYAN · 郑苏妍
            </p>
          </Block>
          <Block title="TITLE">
            <p>BRAND & VISUAL DESIGNER</p>
          </Block>
          <Block title="EDUCATION">
            <p>BA — VISUAL COMMUNICATION DESIGN</p>
            <p className="text-white/50">2023.09 — PRESENT · GPA TOP 10%</p>
          </Block>
          <Block title="AWARDS">
            <ul className="space-y-2 text-white/70">
              {awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Block>
          <Block title="COURSES">
            <p className="text-white/70">{courses.join(" / ")}</p>
          </Block>
          <Block title="SKILLS">
            <p className="text-xl font-extrabold tracking-[0.3em]">
              {skills.join(" · ")}
            </p>
          </Block>
          <Block title="EXPERIENCE">
            <ul className="space-y-2 text-white/70">
              {experience.map((e) => (
                <li key={e}>{e}</li>
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
