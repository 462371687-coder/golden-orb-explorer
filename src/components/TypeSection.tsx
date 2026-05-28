import { motion } from "framer-motion";

const types = [
  { src: "/portfolio/type-buddhism.jpg", word: "禅", en: "BUDDHISM" },
  { src: "/portfolio/type-chaoshan.jpg", word: "潮汕", en: "CHAOSHAN" },
  { src: "/portfolio/type-conscience.jpg", word: "良知", en: "CONSCIENCE" },
  { src: "/portfolio/type-eating.jpg", word: "食", en: "EATING" },
  { src: "/portfolio/type-echoes.jpg", word: "回声", en: "ECHOES" },
  { src: "/portfolio/type-inspiration.jpg", word: "灵感", en: "INSPIRATION" },
  { src: "/portfolio/type-jasmine.jpg", word: "茉莉", en: "JASMINE" },
  { src: "/portfolio/type-journey.jpg", word: "旅", en: "JOURNEY" },
  { src: "/portfolio/type-lava.jpg", word: "熔岩", en: "LAVA" },
  { src: "/portfolio/type-mayday.jpg", word: "五月天", en: "MAYDAY" },
  { src: "/portfolio/type-micro.jpg", word: "微", en: "MICRO" },
  { src: "/portfolio/type-popular.jpg", word: "流行", en: "POPULAR" },
  { src: "/portfolio/type-rain.jpg", word: "雨", en: "RAIN" },
  { src: "/portfolio/type-rational.jpg", word: "理性", en: "RATIONAL" },
  { src: "/portfolio/type-vase.jpg", word: "瓶", en: "VASE" },
];

export default function TypeSection() {
  return (
    <section id="type" className="relative mx-auto max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs tracking-[0.5em] uppercase" style={{ color: "#fde2a7" }}>
          03 / Typography
        </p>
        <h2 className="mt-6 text-5xl font-light tracking-widest md:text-7xl">字体设计</h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed tracking-wider text-white/60">
          字形即态度 — 从笔画结构到节奏的全流程定制。
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {types.map((t, i) => (
          <motion.div
            key={t.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 5) * 0.06 }}
            className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-white/5 transition-all hover:border-white/40"
          >
            <img
              src={t.src}
              alt={t.word}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <span className="text-2xl font-light tracking-widest text-white drop-shadow-lg">
                {t.word}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-white/60">{t.en}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}