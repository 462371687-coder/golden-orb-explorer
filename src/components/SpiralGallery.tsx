import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";

import BrandSection from "@/components/BrandSection";
import PosterSection from "@/components/PosterSection";
import TypeSection from "@/components/TypeSection";
import IPSection from "@/components/IPSection";
import LogoSection from "@/components/LogoSection";
import AboutSection from "@/components/AboutSection";
import CarouselSection from "@/components/CarouselSection";

import coverAbout from "@/assets/covers/cover-about.jpg.asset.json";
import coverChicha from "@/assets/covers/cover-chicha.png.asset.json";
import coverBello from "@/assets/covers/cover-bello.png.asset.json";
import coverPoster from "@/assets/covers/cover-poster.jpg.asset.json";
import coverType from "@/assets/covers/cover-type.jpg.asset.json";
import coverIp from "@/assets/covers/cover-ip.jpg.asset.json";
import coverLogo from "@/assets/covers/cover-logo.jpg.asset.json";
import coverUi from "@/assets/covers/cover-ui.jpg.asset.json";
import coverCultural from "@/assets/covers/cover-cultural.png.asset.json";
import coverBrochure from "@/assets/covers/cover-brochure.jpg.asset.json";
import ui1 from "@/assets/other/other-01.jpg.asset.json";
import ui2 from "@/assets/other/other-02.jpg.asset.json";
import ui3 from "@/assets/other/other-03.jpg.asset.json";
import ui4 from "@/assets/other/other-04.jpg.asset.json";
import ui5 from "@/assets/other/other-n05.jpg.asset.json";
import ui6 from "@/assets/other/other-n06.jpg.asset.json";
import cc1 from "@/assets/other/other-07.jpg.asset.json";
import cc2 from "@/assets/other/other-08.jpg.asset.json";
import cc3 from "@/assets/other/other-09.jpg.asset.json";
import cc4 from "@/assets/other/other-n10.jpg.asset.json";
import cc5 from "@/assets/other/other-n11.jpg.asset.json";
import cc6 from "@/assets/other/other-12.jpg.asset.json";
import br1 from "@/assets/other/other-13.jpg.asset.json";
import br2 from "@/assets/other/brochure-14.jpg.asset.json";
import br3 from "@/assets/other/brochure-15.jpg.asset.json";
import br4 from "@/assets/other/brochure-16.jpg.asset.json";
import br5 from "@/assets/other/brochure-17.jpg.asset.json";
import br6 from "@/assets/other/brochure-18.jpg.asset.json";

const uiItems = [ui1, ui2, ui3, ui4, ui5, ui6].map((a, i) => ({
  src: a.url,
  label: `UI-${i + 1}`,
}));
const ccItems = [cc1, cc2, cc3, cc4, cc5, cc6].map((a, i) => ({
  src: a.url,
  label: `CC-${i + 1}`,
}));
const brItems = [br1, br2, br3, br4, br5, br6].map((a, i) => ({
  src: a.url,
  label: `BR-${i + 1}`,
}));

type Card = {
  id: string;
  en: string;
  zh: string;
  cover: string;
  content: () => ReactElement;
};

const cards: Card[] = [
  {
    id: "about",
    en: "ABOUT ME",
    zh: "自我介绍",
    cover: coverAbout.url,
    content: () => <AboutSection />,
  },
  {
    id: "chicha",
    en: "QICHA",
    zh: "栖茶",
    cover: coverChicha.url,
    content: () => <BrandSection only="chicha" />,
  },
  {
    id: "bello",
    en: "BELLO",
    zh: "贝力",
    cover: coverBello.url,
    content: () => <BrandSection only="bello" />,
  },
  {
    id: "poster",
    en: "POSTER DESIGN",
    zh: "海报设计",
    cover: coverPoster.url,
    content: () => <PosterSection />,
  },
  {
    id: "type",
    en: "TYPE COMBINATION",
    zh: "字体设计",
    cover: coverType.url,
    content: () => <TypeSection />,
  },
  {
    id: "ip",
    en: "IP DESIGN",
    zh: "IP 设计",
    cover: coverIp.url,
    content: () => <IPSection />,
  },
  {
    id: "logo",
    en: "LOGO DESIGN",
    zh: "标志设计",
    cover: coverLogo.url,
    content: () => <LogoSection />,
  },
  {
    id: "ui",
    en: "UI DESIGN",
    zh: "界面设计",
    cover: coverUi.url,
    content: () => (
      <CarouselSection
        id="ui"
        eyebrow="06 / UI"
        title="UI DESIGN"
        subtitle="UI 界面设计"
        items={uiItems}
      />
    ),
  },
  {
    id: "cultural",
    en: "CULTURAL CREATIVE",
    zh: "文创设计",
    cover: coverCultural.url,
    content: () => (
      <CarouselSection
        id="cultural"
        eyebrow="07 / CULTURAL CREATIVE"
        title="文创设计"
        subtitle="CULTURAL CREATIVE"
        items={ccItems}
      />
    ),
  },
  {
    id: "brochure",
    en: "BROCHURE DESIGN",
    zh: "画册设计",
    cover: coverBrochure.url,
    content: () => (
      <CarouselSection
        id="brochure"
        eyebrow="08 / BROCHURE"
        title="BROCHURE DESIGN"
        subtitle="画册设计"
        items={brItems}
      />
    ),
  },
];

const ANGLE_STEP = 40;
const BASE_SPEED = 0.35; // deg per frame ≈ 18s / turn
const MAX_SPEED = 4;

export default function SpiralGallery() {
  const [mode, setMode] = useState<"spiral" | "list">("spiral");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [listHover, setListHover] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rotation = useRef(0);
  const velocity = useRef(BASE_SPEED);
  const hoveredRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const startedRef = useRef(0);
  const pausedRef = useRef(false);

  hoveredRef.current = hovered;
  pausedRef.current = openIndex !== null || mode !== "spiral";

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const radius = isMobile ? 180 : 315;
  const stepY = isMobile ? 38 : 46;

  /* ---------- animation loop ---------- */
  useEffect(() => {
    if (mode !== "spiral") return;
    startedRef.current = performance.now();
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();

      // inertia: decay toward base speed
      if (!draggingRef.current) {
        velocity.current += (BASE_SPEED - velocity.current) * 0.04;
        if (!pausedRef.current && hoveredRef.current === null) {
          rotation.current += velocity.current;
        }
      }

      const n = cards.length;
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        // entrance: staggered spiral bloom
        const t = Math.min(
          1,
          Math.max(0, (now - startedRef.current - i * 80) / 900),
        );
        const ease = 1 - Math.pow(1 - t, 3);

        const angle = i * ANGLE_STEP + rotation.current;
        const rad = (angle * Math.PI) / 180;
        const depth = Math.cos(rad); // 1 = front, -1 = back
        const y = (i - (n - 1) / 2) * stepY;

        const isHover = hoveredRef.current === i;
        const near = (depth + 1) / 2; // 0..1
        const scale = (0.62 + near * 0.38) * (isHover ? 1.1 : 1) * ease;
        const opacity =
          (0.3 + near * 0.7) *
          (hoveredRef.current !== null && !isHover ? 0.3 : 1) *
          ease;
        const blur = isHover ? 0 : (1 - near) * 4;
        const pop = isHover ? 60 : 0;

        el.style.transform = `translate(-50%, -50%) translateY(${y * ease}px) rotateY(${angle}deg) translateZ(${radius * ease + pop}px) rotateY(${-angle}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = `blur(${blur}px) brightness(${isHover ? 1.15 : 0.9})`;
        el.style.zIndex = String(Math.round(near * 100));
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [mode, radius, stepY]);

  /* ---------- wheel ---------- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || mode !== "spiral") return;
    const onWheel = (e: WheelEvent) => {
      if (pausedRef.current) return;
      e.preventDefault();
      const dy =
        e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const next = velocity.current + dy * 0.02;
      velocity.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, next));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [mode]);

  /* ---------- drag ---------- */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    rotation.current += dx * 0.3;
    velocity.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dx * 0.3));
  }, []);

  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  /* ---------- esc ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenIndex(null);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const ring = useMemo(
    () => "ZHENG SUYAN · PORTFOLIO · 2026 · ".repeat(2).split(""),
    [],
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* LOGO */}
      <div className="fixed left-6 top-6 z-40 select-none">
        <p className="text-sm font-medium tracking-[0.25em] text-white">
          Portfolio
        </p>
      </div>

      {/* MODE SWITCH */}
      <div className="fixed inset-x-0 top-6 z-40 flex justify-center gap-6 text-xs font-bold uppercase tracking-[0.4em]">
        {(["spiral", "list"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={
              mode === m
                ? "text-white"
                : "text-white/35 transition-colors hover:text-white/70"
            }
          >
            {m}
          </button>
        ))}
      </div>

      {/* MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed right-6 top-6 z-40 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-black transition-opacity hover:opacity-80"
      >
        menu
      </button>

      {/* SPIRAL STAGE */}
      {mode === "spiral" && (
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative h-screen w-full cursor-grab touch-none active:cursor-grabbing"
          style={{ perspective: "1600px", perspectiveOrigin: "center center" }}
        >
          <div className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]">
            {cards.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setOpenIndex(i)}
                className="absolute left-0 top-0 w-[58vw] max-w-[300px] cursor-pointer overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:w-[250px]"
                style={{ opacity: 0, willChange: "transform, opacity, filter" }}
              >
                <img
                  src={c.cover}
                  alt={`${c.en} — ${c.zh}`}
                  draggable={false}
                  loading="lazy"
                  className="block aspect-[3/2] w-full select-none bg-black object-contain"
                />
                {hovered === i && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em]">
                      {c.en}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.3em] text-white/60">
                      {c.zh}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="pointer-events-none absolute inset-x-0 bottom-10 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
            SCROLL OR DRAG TO ROTATE
          </p>
        </div>
      )}

      {/* LIST MODE */}
      {mode === "list" && (
        <div className="relative min-h-screen w-full px-6 pt-32 pb-24">
          <ul className="mx-auto max-w-4xl">
            {cards.map((c, i) => (
              <li key={c.id} className="border-t border-white/15 last:border-b">
                <button
                  onMouseEnter={() => setListHover(i)}
                  onMouseLeave={() => setListHover(null)}
                  onClick={() => setOpenIndex(i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-white/60"
                >
                  <span className="text-2xl font-extrabold uppercase tracking-[0.15em] md:text-4xl">
                    {c.en}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-white/40">
                    {c.zh}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {listHover !== null && (
            <img
              src={cards[listHover].cover}
              alt={cards[listHover].en}
              className="pointer-events-none fixed bottom-10 right-10 hidden w-[280px] rounded-[16px] object-cover md:block"
            />
          )}
        </div>
      )}

      {/* RING TEXT */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-30 hidden h-[120px] w-[120px] md:block">
        <div className="h-full w-full animate-[spin_18s_linear_infinite]">
          {ring.map((ch, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 text-[9px] font-bold uppercase text-white/50"
              style={{
                transform: `rotate(${(360 / ring.length) * i}deg) translateY(-56px)`,
                transformOrigin: "0 0",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {openIndex !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm">
          <button
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="fixed right-6 top-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-black transition-opacity hover:opacity-80"
          >
            ✕
          </button>
          <div className="animate-[fade-in_0.4s_ease-out] mx-auto max-w-[1600px]">
            {cards[openIndex].content()}
          </div>
        </div>
      )}

      {/* MENU PANEL */}
      {menuOpen && (
        <div className="fixed inset-0 z-[70]">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] animate-[slide-in-right_0.35s_ease-out] flex-col justify-between bg-white p-10 text-black">
            <div>
              <div className="flex items-start justify-between">
                <p className="text-sm font-extrabold uppercase tracking-[0.35em]">
                  ZHENG SUYAN
                </p>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              <nav className="mt-16 space-y-4">
                {[
                  { label: "works", target: 2 },
                  { label: "about", target: 0 },
                  { label: "contact", target: null },
                ].map((n) => (
                  <button
                    key={n.label}
                    onClick={() => {
                      setMenuOpen(false);
                      if (n.target !== null) setOpenIndex(n.target);
                      else setMode("list");
                    }}
                    className="block text-4xl font-extrabold uppercase tracking-tight transition-opacity hover:opacity-50 md:text-5xl"
                  >
                    {n.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="space-y-4 text-xs font-bold uppercase tracking-[0.3em]">
              <a href="mailto:462371687@qq.com" className="block">
                462371687@qq.com
              </a>
              <div className="flex gap-4 text-[10px] text-black/50">
                <span>小红书</span>
                <span>抖音</span>
                <span>BEHANCE</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}