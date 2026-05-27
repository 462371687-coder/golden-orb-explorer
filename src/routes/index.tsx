import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import BrandSymbol3D from "@/components/BrandSymbol3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "栖茶 · 品牌与视觉设计师" },
      {
        name: "description",
        content:
          "栖茶 — 品牌全案 · 海报设计 · 字体设计。拖拽旋转探索 3D 品牌符号。",
      },
      { property: "og:title", content: "栖茶 · 品牌与视觉设计师" },
      {
        property: "og:description",
        content: "品牌全案 · 海报 · 字体 · 视觉设计作品集。",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const nav = [
    { id: "brand", label: "品牌全案" },
    { id: "poster", label: "海报设计" },
    { id: "type", label: "字体设计" },
    { id: "about", label: "关于我" },
  ];

  return (
    <main
      className="relative min-h-screen w-full text-white"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)",
      }}
    >
      {/* Glassmorphism navbar */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-wider">
            <span
              className="inline-block h-5 w-5 rotate-45 rounded-[3px]"
              style={{ background: "#cf391e" }}
            />
            <span className="text-sm">QI · STUDIO</span>
          </a>
          <nav className="hidden gap-8 text-sm text-white/70 md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <a href="#contact" className="transition-colors hover:text-white">
              联系
            </a>
          </nav>
        </div>
      </header>

      {/* Hero with 3D */}
      <section
        id="top"
        className="relative flex h-screen w-full flex-col items-center justify-center"
      >
        <div className="absolute inset-0">
          <BrandSymbol3D />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pointer-events-none absolute left-0 right-0 top-24 px-6 text-center"
        >
          <p className="text-xs tracking-[0.5em] text-white/40 uppercase">
            Brand · Visual · Type
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-widest text-white/90 md:text-5xl">
            栖 · 设 计 工 作 室
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-center"
        >
          <p className="text-xs tracking-[0.4em] text-white/50 uppercase">
            DRAG · SCROLL · EXPLORE
          </p>
          <p className="text-sm tracking-[0.3em] text-white/70">
            品牌与视觉设计师 · 拖拽旋转探索
          </p>
        </motion.div>
      </section>

      <Section
        id="brand"
        eyebrow="01 / Brand Identity"
        title="品牌全案"
        desc="从命名、视觉系统到落地应用，构建有记忆点的品牌语言。"
        accent="#cf391e"
      />
      <Section
        id="poster"
        eyebrow="02 / Poster"
        title="海报设计"
        desc="叙事性的视觉构成，让信息成为画面。"
        accent="#f7b652"
      />
      <Section
        id="type"
        eyebrow="03 / Typography"
        title="字体设计"
        desc="字形即态度，从笔画结构到节奏的全流程定制。"
        accent="#fde2a7"
      />
      <Section
        id="about"
        eyebrow="04 / About"
        title="关于我"
        desc="独立设计师，专注东方美学与现代视觉语言的融合表达。"
        accent="#ffffff"
      />

      <section
        id="contact"
        className="flex flex-col items-center justify-center gap-6 px-6 py-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.5em] text-white/40 uppercase">
            05 / Contact
          </p>
          <h2 className="mt-4 text-4xl font-light tracking-widest md:text-6xl">
            一 起 创 作
          </h2>
          <p className="mt-6 text-sm tracking-[0.2em] text-white/60">
            hello@qi-studio.cn · 微信 qi_design
          </p>
          <a
            href="mailto:hello@qi-studio.cn"
            className="mt-10 inline-block rounded-full border border-white/20 px-8 py-3 text-sm tracking-[0.3em] backdrop-blur-md transition-colors hover:bg-white/10"
          >
            START A PROJECT
          </a>
        </motion.div>
        <p className="mt-20 text-xs tracking-[0.3em] text-white/30">
          © 2026 QI STUDIO · ALL RIGHTS RESERVED
        </p>
      </section>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  desc,
  accent,
}: {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p
          className="text-xs tracking-[0.5em] uppercase"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
        <h2 className="mt-6 text-5xl font-light tracking-widest md:text-7xl">
          {title}
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed tracking-wider text-white/60 md:text-lg">
          {desc}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/30"
          >
            <div
              className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-60"
              style={{
                background: `linear-gradient(135deg, ${accent}22, transparent 60%)`,
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs tracking-[0.2em] text-white/70">
              <span>WORK · 0{i}</span>
              <span>2026</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
