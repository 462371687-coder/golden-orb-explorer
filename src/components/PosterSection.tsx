import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import p1 from "@/assets/posters/poster-1.jpg.asset.json";
import p2 from "@/assets/posters/poster-2.jpg.asset.json";
import p3 from "@/assets/posters/poster-3.jpg.asset.json";
import p4 from "@/assets/posters/poster-4.jpg.asset.json";
import p5 from "@/assets/posters/poster-5.jpg.asset.json";
import p6 from "@/assets/posters/poster-6.jpg.asset.json";
import p7 from "@/assets/posters/poster-7.jpg.asset.json";
import p8 from "@/assets/posters/poster-8.jpg.asset.json";
import p9 from "@/assets/posters/poster-9.jpg.asset.json";
import p10 from "@/assets/posters/poster-10.jpg.asset.json";

const posters = [
  { src: p1.url, title: "烟火行星", en: "PYROTECHNIC PLANET" },
  { src: p2.url, title: "摇醒夏日", en: "SHAKEUP SUMMER" },
  { src: p3.url, title: "群岛空间", en: "ARCHIPELAGO BOOKS SPACE" },
  { src: p4.url, title: "城市落幕", en: "THE CURTAIN FALLS ON THE CITY" },
  { src: p5.url, title: "烬器", en: "ASHES VESSEL" },
  { src: p6.url, title: "山城有光", en: "MOUNTAIN CITY WITH LIGHT" },
  { src: p7.url, title: "视觉的秩序", en: "THE ORDER OF VISION" },
  { src: p8.url, title: "草莓泡芙", en: "STRAWBERRY PUFF" },
  { src: p9.url, title: "骆驼载乐俑", en: "CAMEL CARRYING MUSIC" },
  { src: p10.url, title: "宠物联萌", en: "PET WEEK MARKET" },
];

export default function PosterSection() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + posters.length) % posters.length);

  return (
    <section
      id="poster"
      className="overflow-hidden border-t border-white/15 bg-black px-6 py-32 md:py-48"
    >
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        02 / POSTER
      </p>
      <h3 className="mt-8 text-center text-[12vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white md:text-[7vw]">
        POSTER DESIGN
      </h3>

      {/* Carousel */}
      <div className="relative mt-20">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
          className="flex cursor-grab items-center justify-center gap-6 active:cursor-grabbing md:gap-10"
        >
          {[-2, -1, 0, 1, 2].map((offset) => {
            const i = (index + offset + posters.length) % posters.length;
            const p = posters[i];
            const abs = Math.abs(offset);
            return (
              <motion.button
                key={offset}
                onClick={() => (offset === 0 ? setZoom(true) : go(offset))}
                animate={{
                  scale: abs === 0 ? 1 : abs === 1 ? 0.78 : 0.56,
                  opacity: abs === 0 ? 1 : abs === 1 ? 0.4 : 0.15,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`shrink-0 ${abs > 1 ? "hidden md:block" : ""}`}
              >
                <img
                  src={p.src}
                  alt={p.en}
                  draggable={false}
                  loading="lazy"
                  className="max-h-[52vh] w-auto max-w-[80vw] select-none object-contain md:max-w-[46vw]"
                />
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-8 md:gap-12">
          <button
            onClick={() => go(-1)}
            className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 transition-colors hover:text-white"
          >
            PREV
          </button>
          <p className="text-center text-base font-extrabold uppercase tracking-[0.25em] text-white md:text-xl">
            {posters[index].en}
          </p>
          <button
            onClick={() => go(1)}
            className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 transition-colors hover:text-white"
          >
            NEXT
          </button>
        </div>
        <p className="mt-4 text-center text-sm tracking-[0.5em] text-white/50">
          {posters[index].title}
        </p>
        <p className="mt-6 text-center text-[10px] font-bold tracking-[0.4em] uppercase text-white/25">
          DRAG OR CLICK ARROWS
        </p>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black p-8"
          >
            <img
              src={posters[index].src}
              alt={posters[index].en}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={() => setZoom(false)}
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
