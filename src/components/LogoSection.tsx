import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import l1 from "@/assets/logos/logo1-01.jpg.asset.json";
import l2 from "@/assets/logos/logo1-02.jpg.asset.json";
import l3 from "@/assets/logos/logo1-03.jpg.asset.json";
import l4 from "@/assets/logos/logo1-04.jpg.asset.json";
import l5 from "@/assets/logos/logo1-05.jpg.asset.json";
import l6 from "@/assets/logos/logo1-06.jpg.asset.json";
import l7 from "@/assets/logos/logo1-07.jpg.asset.json";
import l8 from "@/assets/logos/logo1-08.jpg.asset.json";
import l9 from "@/assets/logos/logo1-09.jpg.asset.json";

const placeholder = (n: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#333"/><text x="150" y="150" fill="#fff" font-family="Helvetica,Arial,sans-serif" font-size="72" font-weight="bold" text-anchor="middle" dominant-baseline="central">${n}</text></svg>`,
  )}`;

const real = [l1, l2, l3, l4, l5, l6, l7, l8, l9].map((a, i) => ({
  src: a.url,
  title: `LOGO ${String(i + 1).padStart(2, "0")}`,
}));

const logos = [
  ...real,
  ...Array.from({ length: 30 - real.length }, (_, i) => {
    const n = real.length + 1 + i;
    return { src: placeholder(n), title: `LOGO ${String(n).padStart(2, "0")}` };
  }),
];

const COLS = 5;

// column depth: middle bulges forward, edges curve back
const colStyle = (col: number) => {
  const d = Math.abs(col - (COLS - 1) / 2); // 0 center, 2 edge
  if (d === 0) return { z: 50, scale: 1.1, ry: 0 };
  if (d <= 1) return { z: 20, scale: 1.05, ry: col < 2 ? 6 : -6 };
  return { z: -30, scale: 0.9, ry: col < 2 ? 15 : -15 };
};

export default function LogoSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="logo" className="overflow-hidden border-t border-white/15 px-6 py-32 md:py-48">
      <p className="text-center text-xs font-bold uppercase tracking-[0.5em] text-white/40">
        05 / LOGO
      </p>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mt-8 text-center text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[9vw]"
      >
        LOGO DESIGN
      </motion.h2>

      <div
        className="mx-auto mt-20 w-full max-w-[1400px]"
        style={{ perspective: "1200px", perspectiveOrigin: "center" }}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-10"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg)" }}
        >
          {logos.map((logo, i) => {
            const col = i % COLS;
            const { z, scale, ry } = colStyle(col);
            const isHover = hovered === i;
            return (
              <motion.button
                key={logo.title}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, z: -200 }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: Math.floor(i / COLS) * 0.12 + col * 0.06,
                  ease: "easeOut",
                }}
                className="rounded-lg bg-white/[0.03] p-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={logo.src}
                  alt={logo.title}
                  loading="lazy"
                  draggable={false}
                  className="block h-auto w-auto max-h-[150px] max-w-[150px] select-none rounded-lg object-contain"
                  style={{
                    transform: isHover
                      ? "translateZ(80px) scale(1.2)"
                      : `translateZ(${z}px) scale(${scale}) rotateY(${ry}deg)`,
                    filter:
                      hovered === null
                        ? `brightness(${1 - Math.abs(col - 2) * 0.12})`
                        : isHover
                          ? "brightness(1.25)"
                          : "brightness(0.4)",
                    transition: "transform 0.4s ease-out, filter 0.3s ease-out",
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
        >
          <img
            src={logos[lightbox].src}
            alt={logos[lightbox].title}
            onClick={(e) => e.stopPropagation()}
            className="h-auto w-auto max-h-[80vh] max-w-[80vw] object-contain"
          />
          <p className="absolute bottom-8 w-full text-center text-xs tracking-[0.4em] text-white/50">
            {logos[lightbox].title}
          </p>
        </div>
      )}
    </section>
  );
}