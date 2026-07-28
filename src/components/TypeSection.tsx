import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + types.length) % types.length);

  return (
    <section id="type" className="border-t border-white/15 px-6 py-32 md:py-48">
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        03 / TYPE
      </p>

      {/* Entry */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        onClick={() => setOpen((v) => !v)}
        className="mx-auto mt-10 block text-center text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white transition-colors duration-300 hover:text-[#f7b652] md:text-[9vw]"
      >
        #TYPE COMBINATION
      </motion.button>
      <p className="mt-8 text-center text-xs font-bold tracking-[0.4em] uppercase text-white/40">
        {open ? "CLICK TO CLOSE" : "CLICK TO ENTER"}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-20 overflow-hidden"
          >
            {/* Horizontal slider */}
            <div className="relative flex items-center justify-center gap-6 md:gap-10">
              {[-2, -1, 0, 1, 2].map((offset) => {
                const i = (index + offset + types.length) % types.length;
                const t = types[i];
                const abs = Math.abs(offset);
                return (
                  <motion.button
                    key={offset}
                    onClick={() => (offset === 0 ? null : go(offset))}
                    animate={{
                      scale: abs === 0 ? 1 : abs === 1 ? 0.72 : 0.5,
                      opacity: abs === 0 ? 1 : abs === 1 ? 0.45 : 0.18,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative aspect-square w-[46vw] shrink-0 md:w-[26vw] ${
                      abs > 1 ? "hidden md:block" : ""
                    }`}
                  >
                    <img
                      src={t.src}
                      alt={t.en}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-center gap-10">
              <button
                onClick={() => go(-1)}
                className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 transition-colors hover:text-white"
              >
                PREV
              </button>
              <p className="text-xl font-extrabold uppercase tracking-[0.3em] text-white">
                {types[index].en}
              </p>
              <button
                onClick={() => go(1)}
                className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 transition-colors hover:text-white"
              >
                NEXT
              </button>
            </div>
            <p className="mt-4 text-center text-sm tracking-[0.5em] text-white/50">
              {types[index].word}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
