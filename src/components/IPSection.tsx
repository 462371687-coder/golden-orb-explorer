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
import n08 from "@/assets/ip/IP-08-2.jpg.asset.json";
import n09 from "@/assets/ip/IP-09-2.jpg.asset.json";
import n10 from "@/assets/ip/IP-10-2.jpg.asset.json";
import n11 from "@/assets/ip/IP-11-2.jpg.asset.json";
import n12 from "@/assets/ip/IP-12-2.jpg.asset.json";
import n15 from "@/assets/ip/IP-15-2.jpg.asset.json";
import n16 from "@/assets/ip/IP-16-2.jpg.asset.json";
import n17 from "@/assets/ip/IP-17-2.jpg.asset.json";
import n18 from "@/assets/ip/IP-18-2.jpg.asset.json";

const works = [
  { src: ip1.url, title: "TINY FROG — KEY VISUAL" },
  { src: ip2.url, title: "TINY FROG — IP 三视图" },
  { src: ip3.url, title: "IP 主题变装 COSTUMES" },
  { src: ip4.url, title: "IP 场景应用" },
  { src: ip5.url, title: "吊卡 & 半调延展" },
  { src: ip6.url, title: "品牌物料与表情延展" },
  { src: ip7.url, title: "POP MART 周边全家福" },
  { src: n08.url, title: "TINY FROG — 夏日泳圈" },
  { src: n09.url, title: "TINY FROG — 云端彩虹" },
  { src: n10.url, title: "TINY FROG — 草地野餐" },
  { src: n11.url, title: "TINY FROG — 雨天咖啡" },
  { src: n12.url, title: "TINY FROG — 森林探索" },
  { src: n15.url, title: "RAINY PLANET — 陈列展示" },
  { src: n16.url, title: "RAINY PLANET — 导视系统" },
  { src: n17.url, title: "RAINY PLANET — 展览物料" },
  { src: n18.url, title: "RAINY PLANET — 包装礼盒" },
];

const TILT = 65;
const DEFAULT_SPEED = 9; // deg per second → 40s per revolution

export default function IPSection() {
  const [angle, setAngle] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [radius, setRadius] = useState(450);
  const [cardW, setCardW] = useState(130);

  const speed = useRef(DEFAULT_SPEED);
  const angleRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const velocity = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // responsive orbit sizing
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setRadius(140);
        setCardW(80);
      } else if (w < 1280) {
        setRadius(320);
        setCardW(110);
      } else {
        setRadius(460);
        setCardW(130);
      }
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // animation loop
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!dragging.current && hoveredRef.current === null) {
        // ease speed back to default
        speed.current += (DEFAULT_SPEED - speed.current) * Math.min(1, dt * 1.2);
        angleRef.current += speed.current * dt;
        setAngle(angleRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // wheel accelerate (non-passive)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const next = speed.current - dy * 0.05;
      speed.current = Math.max(0, Math.min(DEFAULT_SPEED * 5, next));
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    velocity.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = Math.max(1, now - lastT.current) / 1000;
    lastX.current = e.clientX;
    lastT.current = now;
    angleRef.current += dx * 0.25;
    velocity.current = (dx * 0.25) / dt;
    setAngle(angleRef.current);
  };
  const stopDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    speed.current = Math.max(0, Math.min(DEFAULT_SPEED * 5, Math.abs(velocity.current)));
  };

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

  const step = 360 / works.length;

  return (
    <section id="ip" className="overflow-hidden border-t border-white/15 px-6 py-32 md:py-48">
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

      {/* Orbit stage */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={() => {
          stopDrag();
          setHovered(null);
        }}
        className="relative mx-auto mt-12 h-[520px] w-full max-w-[1400px] cursor-grab touch-pan-y select-none active:cursor-grabbing md:h-[720px]"
        style={{ perspective: "1200px" }}
      >
        {/* Orbit ring */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: "preserve-3d", transform: `rotateX(${TILT}deg)` }}
        >
          {works.map((w, i) => {
            const a = angle + i * step;
            const rad = (a * Math.PI) / 180;
            const depth = Math.cos(rad); // 1 = near (front), -1 = far
            const near = (depth + 1) / 2;
            const isHovered = hovered === i;
            const scale = isHovered ? 1.3 : 0.7 + near * 0.5;
            const opacity = isHovered ? 1 : 0.4 + near * 0.6;
            const blur = isHovered ? 0 : (1 - near) * 1.6;
            return (
              <motion.div
                key={w.src}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                className="absolute"
                style={{
                  width: cardW,
                  marginLeft: -cardW / 2,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${a}deg) translateZ(${radius}px) ${
                    isHovered ? "translateZ(50px)" : ""
                  } rotateY(${-a}deg) rotateX(${-TILT}deg) scale(${scale})`,
                  zIndex: Math.round(near * 100),
                }}
              >
                <button
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setLightbox(i)}
                  className="block w-full"
                  style={{ opacity, filter: `blur(${blur}px)` }}
                >
                  <img
                    src={w.src}
                    alt={w.title}
                    loading="lazy"
                    draggable={false}
                    className="block h-auto w-full select-none rounded-[12px] object-contain"
                  />
                  {isHovered && (
                    <span className="mt-2 block whitespace-nowrap text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                      {w.title}
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Center IP */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[60] w-[220px] -translate-x-1/2 -translate-y-1/2 md:w-[320px]"
        >
          <motion.img
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src={ipMain.url}
            alt="TINY FROG IP"
            draggable={false}
            className="block h-auto w-full select-none rounded-[20px] object-contain"
          />
        </motion.div>
      </div>

      <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
        SCROLL TO SPEED UP · DRAG TO ROTATE · CLICK TO VIEW
      </p>

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
