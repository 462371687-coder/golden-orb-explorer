import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ipMain from "@/assets/ip/ip-main.png.asset.json";
import ip1 from "@/assets/ip/ip-1.png.asset.json";
import ip2 from "@/assets/ip/ip-2.jpg.asset.json";
import ip3 from "@/assets/ip/ip-3.jpg.asset.json";
import ip4 from "@/assets/ip/ip-4.jpg.asset.json";
import ip5 from "@/assets/ip/ip-5.jpg.asset.json";
import ip6 from "@/assets/ip/ip-6.jpg.asset.json";
import ip7 from "@/assets/ip/ip-7.jpg.asset.json";

type Work = {
  src: string;
  title: string;
  left: string;
  top: string;
  width: number;
  delay: number;
};

const works: Work[] = [
  { src: ip1.url, title: "TINY FROG — KEY VISUAL", left: "6%", top: "10%", width: 220, delay: 0 },
  { src: ip2.url, title: "TINY FROG — IP 三视图", left: "74%", top: "6%", width: 210, delay: 0.6 },
  { src: ip3.url, title: "IP 主题变装 COSTUMES", left: "80%", top: "38%", width: 190, delay: 1.2 },
  { src: ip4.url, title: "IP 场景应用", left: "68%", top: "70%", width: 200, delay: 0.3 },
  { src: ip5.url, title: "吊卡 & 半调延展", left: "34%", top: "80%", width: 185, delay: 0.9 },
  { src: ip6.url, title: "品牌物料与表情延展", left: "3%", top: "62%", width: 215, delay: 1.5 },
  { src: ip7.url, title: "POP MART 周边全家福", left: "16%", top: "34%", width: 180, delay: 0.45 },
];

export default function IPSection() {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % works.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => ((i ?? 0) - 1 + works.length) % works.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({
      x: Math.max(-60, Math.min(60, r.x - dy * 0.4)),
      y: r.y + dx * 0.4,
    }));
  };
  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <section id="ip" className="border-t border-white/15 px-6 py-32 md:py-48">
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        04 / IP
      </p>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mt-8 text-center text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[9vw]"
      >
        IP DESIGN
      </motion.h2>

      {/* Stage */}
      <div
        className="relative mx-auto mt-16 h-[100vh] w-full max-w-[1400px]"
        style={{ perspective: "1200px" }}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Scattered works */}
        {works.map((w, i) => (
          <motion.div
            key={w.src}
            className="absolute hidden md:block"
            style={{ left: w.left, top: w.top, width: w.width }}
            initial={{ opacity: 0, scale: 0.2, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
          >
            <motion.button
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 6 + (i % 3),
                delay: w.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setHovered(i)}
              onClick={() => setLightbox(i)}
              className="block w-full origin-center"
            >
              <img
                src={w.src}
                alt={w.title}
                loading="lazy"
                draggable={false}
                className="block h-auto w-full select-none rounded-[16px] object-contain transition-all duration-300"
                style={{
                  transform: hovered === i ? "scale(1.1)" : "scale(1)",
                  filter:
                    hovered === null
                      ? "brightness(1)"
                      : hovered === i
                        ? "brightness(1.25)"
                        : "brightness(0.45)",
                }}
              />
            </motion.button>
          </motion.div>
        ))}

        {/* Center IP */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 md:w-[380px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
              onWheel={(e) =>
                setScale((s) => Math.max(0.5, Math.min(2, s - e.deltaY * 0.001)))
              }
              className="cursor-grab touch-none select-none active:cursor-grabbing"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${scale})`,
                transition: dragging.current ? "none" : "transform 0.2s ease-out",
              }}
            >
              <img
                src={ipMain.url}
                alt="TINY FROG IP"
                draggable={false}
                className="block h-auto w-full select-none rounded-[20px] object-contain"
              />
            </div>
          </motion.div>
          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
            DRAG TO ROTATE · SCROLL TO ZOOM
          </p>
        </motion.div>

        {/* Mobile fallback grid */}
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-4 md:hidden">
          {works.map((w, i) => (
            <button key={w.src} onClick={() => setLightbox(i)}>
              <img
                src={w.src}
                alt={w.title}
                loading="lazy"
                className="block h-auto w-full rounded-[16px] object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => ((i ?? 0) - 1 + works.length) % works.length);
              }}
              className="absolute left-6 z-10 text-xs font-bold uppercase tracking-[0.4em] text-white/60 hover:text-white"
            >
              PREV
            </button>
            <img
              src={works[lightbox].src}
              alt={works[lightbox].title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[85vw] rounded-[20px] object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => ((i ?? 0) + 1) % works.length);
              }}
              className="absolute right-6 z-10 text-xs font-bold uppercase tracking-[0.4em] text-white/60 hover:text-white"
            >
              NEXT
            </button>
            <p className="absolute bottom-8 w-full text-center text-xs tracking-[0.4em] text-white/50">
              {works[lightbox].title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}