import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ColorSwatch = { name: string; hex: string };
type Item = { title: string; tag: string; img: string };

type Project = {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  tagline: string;
  positioning: string;
  story: string;
  keywords: string[];
  value: string;
  colors: ColorSwatch[];
  fonts: string;
  slogans: string[];
  sections: { title: string; items: Item[] }[];
  cover: { bg: string; accent: string; sub: string; img: string };
};

const chicha: Project = {
  id: "chicha",
  code: "BRAND · 01",
  name: "栖茶",
  nameEn: "CHICHA",
  tagline: "新中式茶饮品牌 · 都市驿站",
  positioning: "都市驿站 · 松弛享受 · 茶马文化",
  story:
    "源自茶马古道千年茶香之路，取『停歇栖身』之意，以云南千年茶山为源，构筑都市人的一方驿站。",
  keywords: ["#承古", "#和合", "#松弛"],
  value:
    "以千年茶马古道文化为底蕴，重构当代新中式茶饮的东方美学与精神意境。",
  colors: [
    { name: "梵明黄", hex: "#f7b652" },
    { name: "驼尘米", hex: "#fde2a7" },
    { name: "初穗黄", hex: "#fff7d0" },
    { name: "朱砂红", hex: "#cf391e" },
    { name: "老茶棕", hex: "#422113" },
    { name: "云雾青", hex: "#9a9976" },
  ],
  fonts: "阿里巴巴普惠体 · Montserrat",
  slogans: [
    "栖，是古道上的休憩；茶，是千年路上的回甘。",
    "古道有驿站　喝茶即靠岸。",
  ],
  sections: [
    {
      title: "Logo & Identity",
      items: [
        { title: "标准制图", tag: "LOGO", img: "/portfolio/chicha-logo.jpg" },
        { title: "色彩规范", tag: "COLOR", img: "/portfolio/chicha-colors.jpg" },
        { title: "字体规范", tag: "TYPE", img: "/portfolio/chicha-typo.jpg" },
      ],
    },
    {
      title: "品牌海报",
      items: [
        { title: "烟火 · 篝火", tag: "POSTER", img: "/portfolio/chicha-poster-1.jpg" },
        { title: "马锅头", tag: "POSTER", img: "/portfolio/chicha-poster-2.jpg" },
        { title: "栖于云滇", tag: "POSTER", img: "/portfolio/chicha-poster-3.jpg" },
        { title: "海报组合", tag: "POSTER", img: "/portfolio/chicha-poster-grid.jpg" },
      ],
    },
    {
      title: "产品包装",
      items: [
        { title: "包装组合", tag: "PACKAGE", img: "/portfolio/chicha-package.jpg" },
        { title: "纸袋 · 茶包", tag: "PACKAGE", img: "/portfolio/chicha-bag.jpg" },
      ],
    },
    {
      title: "应用延展",
      items: [
        { title: "饮品杯设计", tag: "CUP", img: "/portfolio/chicha-cup.jpg" },
        { title: "门帘 · 场景", tag: "SCENE", img: "/portfolio/chicha-curtain.jpg" },
      ],
    },
  ],
  cover: {
    bg: "linear-gradient(135deg,#422113 0%,#cf391e 60%,#f7b652 100%)",
    accent: "#fde2a7",
    sub: "千年茶马 · 一盏栖身",
    img: "/portfolio/chicha-hero.jpg",
  },
};

const bello: Project = {
  id: "bello",
  code: "BRAND · 02",
  name: "贝力",
  nameEn: "BELLO",
  tagline: "儿童辅食餐厅 · 0–3 岁阶段化喂养",
  positioning: "专研阶段化差异化定制的儿童辅食餐厅",
  story:
    "为 0–3 岁宝宝提供分阶段、科学化的辅食方案，让每一口都精准契合成长节奏。",
  keywords: ["#精细 Precise", "#温润 Mellow", "#契合 Fit"],
  value: "重新定义儿童科学营养新高度。",
  colors: [
    { name: "初乳白", hex: "#FFFBE7" },
    { name: "牛乳蓝", hex: "#B6E9FE" },
    { name: "阳光黄", hex: "#FCE53D" },
    { name: "元气红", hex: "#FFBFE0" },
    { name: "云朵灰", hex: "#E7E7E7" },
    { name: "元气蓝", hex: "#3B86FF" },
    { name: "奶咖棕", hex: "#BA7802" },
    { name: "草莓粉", hex: "#FF93B5" },
  ],
  fonts: "阿里巴巴普惠体",
  slogans: [
    "我们用心　宝宝开心　家长放心。",
    "We put our heart into every meal for our baby.",
  ],
  sections: [
    {
      title: "Logo & Identity",
      items: [
        { title: "标准制图", tag: "LOGO", img: "/portfolio/bello-logo.jpg" },
        { title: "色彩规范", tag: "COLOR", img: "/portfolio/bello-colors.jpg" },
      ],
    },
    {
      title: "阶段化产品",
      items: [
        { title: "B1 · 6M+ 初尝期", tag: "STAGE", img: "/portfolio/bello-b1.jpg" },
        { title: "B2 · 9M+ 咀嚼期", tag: "STAGE", img: "/portfolio/bello-b2.jpg" },
        { title: "B3 · 12M+ 强化期", tag: "STAGE", img: "/portfolio/bello-b3.jpg" },
        { title: "B4 · 2y+ 正常饭期", tag: "STAGE", img: "/portfolio/bello-b4.jpg" },
      ],
    },
    {
      title: "品牌摄影",
      items: [
        { title: "宝宝时刻", tag: "PHOTO", img: "/portfolio/bello-baby.jpg" },
        { title: "家庭用餐", tag: "PHOTO", img: "/portfolio/bello-scene.jpg" },
        { title: "果蔬干脆罐", tag: "PHOTO", img: "/portfolio/bello-cans.jpg" },
        { title: "果泥袋装", tag: "PHOTO", img: "/portfolio/bello-pouches.jpg" },
      ],
    },
    {
      title: "应用延展",
      items: [
        { title: "训练勺", tag: "TOOL", img: "/portfolio/bello-spoon.jpg" },
        { title: "围兜设计", tag: "BIB", img: "/portfolio/bello-bib.jpg" },
        { title: "阶段菜单", tag: "MENU", img: "/portfolio/bello-menu.jpg" },
        { title: "小程序 UI", tag: "APP", img: "/portfolio/bello-app.jpg" },
      ],
    },
  ],
  cover: {
    bg: "linear-gradient(135deg,#3B86FF 0%,#B6E9FE 55%,#FFFBE7 100%)",
    accent: "#FF93B5",
    sub: "每一口　都为宝宝量身定制",
    img: "/portfolio/bello-hero.jpg",
  },
};

const projects: Project[] = [chicha, bello];

export default function BrandSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="brand"
      className="relative mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-end justify-between gap-8"
      >
        <div>
          <p
            className="text-xs uppercase tracking-[0.5em]"
            style={{ color: "#cf391e" }}
          >
            01 / Brand Identity
          </p>
          <h2 className="mt-6 text-5xl font-light tracking-widest md:text-7xl">
            品牌全案
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed tracking-wider text-white/60 md:text-lg">
            从命名、视觉系统到落地应用，构建有记忆点的品牌语言。横向滑动浏览，点击卡片进入项目全貌。
          </p>
        </div>
        <p className="hidden text-xs tracking-[0.4em] text-white/40 md:block">
          ← SCROLL →
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        className="mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8"
        style={{ scrollbarWidth: "thin" }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
        ))}
      </motion.div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto border-white/10 bg-[#0a0a0a] text-white">
          {active && <ProjectDetail project={active} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group relative w-[85vw] flex-shrink-0 snap-center overflow-hidden  border border-white/10 text-left transition-all duration-500 hover:border-white/30 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:w-[640px]"
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ background: project.cover.bg }}
      >
        <img
          src={project.cover.img}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="flex items-start justify-between">
            <span className="text-xs tracking-[0.4em] text-white/80">
              {project.code}
            </span>
            <span
              className=" border px-3 py-1 text-[10px] tracking-[0.3em]"
              style={{
                borderColor: project.cover.accent,
                color: project.cover.accent,
              }}
            >
              VIEW CASE →
            </span>
          </div>
          <div>
            <p
              className="text-xs tracking-[0.5em]"
              style={{ color: project.cover.accent }}
            >
              {project.nameEn}
            </p>
            <h3 className="mt-3 text-6xl font-light tracking-[0.2em] text-white md:text-7xl">
              {project.name}
            </h3>
            <p className="mt-4 text-sm tracking-[0.3em] text-white/80">
              {project.cover.sub}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white/5 px-6 py-5 backdrop-blur-sm">
        <div>
          <p className="text-sm tracking-[0.2em] text-white/80">
            {project.tagline}
          </p>
          <p className="mt-1 text-xs tracking-[0.3em] text-white/40">
            {project.keywords.join("　")}
          </p>
        </div>
        <span className="text-xs tracking-[0.3em] text-white/40">2026</span>
      </div>
    </button>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="space-y-12">
      <DialogHeader className="space-y-4 text-left">
        <p
          className="text-xs uppercase tracking-[0.5em]"
          style={{ color: project.cover.accent }}
        >
          {project.code} · {project.nameEn}
        </p>
        <DialogTitle className="text-5xl font-light tracking-[0.2em] text-white md:text-6xl">
          {project.name}
        </DialogTitle>
        <DialogDescription className="text-sm tracking-[0.2em] text-white/60">
          {project.tagline}
        </DialogDescription>
      </DialogHeader>

      {/* Hero cover */}
      <div
        className="relative aspect-[16/7] w-full overflow-hidden "
        style={{ background: project.cover.bg }}
      >
        <img
          src={project.cover.img}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[18vw] font-light leading-none tracking-[0.1em] md:text-[10rem]"
            style={{ color: project.cover.accent, opacity: 0.9 }}
          >
            {project.nameEn}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="grid gap-10 md:grid-cols-2">
        <Meta label="定位 Positioning" value={project.positioning} />
        <Meta label="品牌价值 Value" value={project.value} />
        <Meta label="品牌故事 Story" value={project.story} />
        <Meta
          label="关键词 Keywords"
          value={project.keywords.join("　")}
        />
      </div>

      {/* Colors */}
      <div>
        <SectionLabel>色彩系统 Color System</SectionLabel>
        <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {project.colors.map((c) => (
            <div key={c.hex} className="space-y-2">
              <div
                className="aspect-square w-full  border border-white/10"
                style={{ background: c.hex }}
              />
              <p className="text-xs tracking-[0.2em] text-white/80">
                {c.name}
              </p>
              <p className="text-[10px] tracking-[0.2em] text-white/40">
                {c.hex.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts + Slogan */}
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <SectionLabel>字体 Typography</SectionLabel>
          <p className="mt-4 text-2xl font-light tracking-[0.2em] text-white">
            {project.fonts}
          </p>
        </div>
        <div>
          <SectionLabel>Slogan</SectionLabel>
          <div className="mt-4 space-y-3">
            {project.slogans.map((s, i) => (
              <p
                key={i}
                className="text-lg font-light leading-relaxed tracking-[0.15em] text-white/90"
              >
                「{s}」
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections */}
      {project.sections.map((sec) => (
        <div key={sec.title}>
          <SectionLabel>{sec.title}</SectionLabel>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sec.items.map((it) => (
              <div
                key={it.title}
                className="group relative aspect-[4/5] overflow-hidden  border border-white/10 transition-all duration-500 hover:scale-[1.05] hover:border-white/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
              >
                <img
                  src={it.img}
                  alt={it.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="text-[10px] tracking-[0.3em] text-white/80">
                    {it.tag}
                  </span>
                  <span className="text-sm tracking-[0.2em] text-white">
                    {it.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.5em] text-white/40">
      {children}
    </p>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/40">
        {label}
      </p>
      <p className="mt-3 text-base leading-relaxed tracking-wider text-white/85">
        {value}
      </p>
    </div>
  );
}