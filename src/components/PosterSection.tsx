import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posters = [
  { src: "/portfolio/poster-pyrotechnic.jpg", title: "烟火气", project: "栖茶" },
  { src: "/portfolio/poster-curtain.jpg", title: "白色运茶神", project: "栖茶" },
  { src: "/portfolio/poster-mountain.jpg", title: "清风谷", project: "栖茶" },
  { src: "/portfolio/poster-ranch.jpg", title: "马帮行囊", project: "栖茶" },
  { src: "/portfolio/poster-walking.jpg", title: "马锅头", project: "栖茶" },
  { src: "/portfolio/poster-forest.jpg", title: "林间", project: "意象系列" },
  { src: "/portfolio/poster-dawn.jpg", title: "破晓", project: "意象系列" },
  { src: "/portfolio/poster-erhai.jpg", title: "洱海", project: "风物" },
  { src: "/portfolio/poster-archi.jpg", title: "建构", project: "实验" },
  { src: "/portfolio/poster-air.jpg", title: "气", project: "实验" },
  { src: "/portfolio/poster-ashes.jpg", title: "灰烬", project: "实验" },
  { src: "/portfolio/poster-half.jpg", title: "半", project: "实验" },
  { src: "/portfolio/poster-order.jpg", title: "秩序", project: "排版" },
  { src: "/portfolio/poster-shakeup.jpg", title: "震荡", process: "排版" },
  { src: "/portfolio/poster-vision.jpg", title: "视界", project: "排版" },
  { src: "/portfolio/poster-voice.jpg", title: "回声", project: "排版" },
];

export default function PosterSection() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="poster" className="relative mx-auto max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs tracking-[0.5em] uppercase" style={{ color: "#f7b652" }}>
          02 / Poster
        </p>
        <h2 className="mt-6 text-5xl font-light tracking-widest md:text-7xl">海报设计</h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed tracking-wider text-white/60">
          叙事性的视觉构成，让信息成为画面。
        </p>
      </motion.div>

      <div className="mt-16 columns-2 gap-4 md:columns-3 lg:columns-4 [column-fill:_balance]">
        {posters.map((p, i) => (
          <motion.button
            key={p.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
            onClick={() => setActive(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-sm border border-white/10 transition-all hover:border-white/40"
          >
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              className="w-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="p-4 text-left">
                <p className="text-xs tracking-[0.3em] text-white/60 uppercase">{p.project}</p>
                <p className="mt-1 text-sm tracking-widest text-white">{p.title}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={posters[active].src}
              alt={posters[active].title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 text-xs tracking-[0.3em] text-white/70 hover:text-white"
            >
              CLOSE ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}