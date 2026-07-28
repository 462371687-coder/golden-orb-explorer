import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posters = [
  { src: "/portfolio/poster-pyrotechnic.jpg", title: "烟火气", project: "CHICHA" },
  { src: "/portfolio/poster-curtain.jpg", title: "白色运茶神", project: "CHICHA" },
  { src: "/portfolio/poster-mountain.jpg", title: "清风谷", project: "CHICHA" },
  { src: "/portfolio/poster-ranch.jpg", title: "马帮行囊", project: "CHICHA" },
  { src: "/portfolio/poster-walking.jpg", title: "马锅头", project: "CHICHA" },
  { src: "/portfolio/poster-forest.jpg", title: "林间", project: "IMAGERY" },
  { src: "/portfolio/poster-dawn.jpg", title: "破晓", project: "IMAGERY" },
  { src: "/portfolio/poster-erhai.jpg", title: "洱海", project: "SCENERY" },
  { src: "/portfolio/poster-archi.jpg", title: "建构", project: "EXPERIMENT" },
  { src: "/portfolio/poster-air.jpg", title: "气", project: "EXPERIMENT" },
  { src: "/portfolio/poster-ashes.jpg", title: "灰烬", project: "EXPERIMENT" },
  { src: "/portfolio/poster-half.jpg", title: "半", project: "EXPERIMENT" },
  { src: "/portfolio/poster-order.jpg", title: "秩序", project: "LAYOUT" },
  { src: "/portfolio/poster-shakeup.jpg", title: "震荡", project: "LAYOUT" },
  { src: "/portfolio/poster-vision.jpg", title: "视界", project: "LAYOUT" },
  { src: "/portfolio/poster-voice.jpg", title: "回声", project: "LAYOUT" },
];

export default function PosterSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="poster" className="border-t border-white/15 px-6 py-32 md:py-48">
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        02 / POSTER
      </p>
      <h3 className="mt-8 text-center text-[12vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[7vw]">
        POSTER DESIGN
      </h3>

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
        {posters.map((p, i) => (
          <motion.button
            key={p.src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
            onClick={() => setActive(i)}
            className="group relative aspect-[3/4] overflow-hidden bg-black"
          >
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-white">
                {p.project}
              </p>
              <p className="text-sm tracking-[0.3em] text-white/70">{p.title}</p>
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
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black p-8"
          >
            <img
              src={posters[active].src}
              alt={posters[active].title}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={() => setActive(null)}
              className="absolute right-8 top-8 text-xs font-bold tracking-[0.4em] uppercase text-white/60 hover:text-white"
            >
              CLOSE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
