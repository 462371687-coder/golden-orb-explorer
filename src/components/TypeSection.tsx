import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import t1 from "@/assets/type/type-1.jpg.asset.json";
import t2 from "@/assets/type/type-2.jpg.asset.json";
import t3 from "@/assets/type/type-3.jpg.asset.json";
import t4 from "@/assets/type/type-4.jpg.asset.json";
import t5 from "@/assets/type/type-5.jpg.asset.json";
import t6 from "@/assets/type/type-6.jpg.asset.json";
import t7 from "@/assets/type/type-7.jpg.asset.json";
import t8 from "@/assets/type/type-8.jpg.asset.json";

const types = [
  { src: t1.url, word: "微观差异 / 相对理性", en: "MICROSCOPIC DIFFERENCES" },
  { src: t2.url, word: "花秋 / 熔岩", en: "HUA QIU / LAVA" },
  { src: t3.url, word: "为灵感发声 / 良心贩卖机", en: "SPEAK OUT FOR INSPIRATION" },
  { src: t4.url, word: "花瓶 / 潮汕", en: "VASE / CHAO SHAN" },
  { src: t5.url, word: "南北之行 / 须弥", en: "JOURNEY / BUDDHISM" },
  { src: t6.url, word: "茉莉酒 / 香萃", en: "JASMINE WINE / AROMA" },
  { src: t7.url, word: "流行 / 回响", en: "POPULAR / ECHOES" },
  { src: t8.url, word: "新雨清泉 / 食在", en: "FRESH RAIN / EATING IN" },
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
                    className={`shrink-0 ${abs > 1 ? "hidden md:block" : ""}`}
                  >
                    <img
                      src={t.src}
                      alt={t.en}
                      draggable={false}
                      loading="lazy"
                      className="max-h-[56vh] w-auto max-w-[88vw] select-none object-contain md:max-w-[52vw]"
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
