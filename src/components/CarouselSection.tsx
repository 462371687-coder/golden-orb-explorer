import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CarouselItem = { src?: string; label: string };

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: CarouselItem[];
};

function Frame({ item, className }: { item: CarouselItem; className: string }) {
  if (item.src) {
    return (
      <img
        src={item.src}
        alt={item.label}
        draggable={false}
        loading="lazy"
        className={className}
      />
    );
  }
  return (
    <div
      className={`flex h-[32vh] w-[60vw] items-center justify-center bg-[#333] md:w-[36vw] ${className}`}
    >
      <span className="text-lg font-bold tracking-[0.3em] text-white">
        {item.label}
      </span>
    </div>
  );
}

export default function CarouselSection({
  id,
  eyebrow,
  title,
  subtitle,
  items,
}: Props) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, items.length]);

  const offsets = items.length > 2 ? [-2, -1, 0, 1, 2] : [0];

  return (
    <section
      id={id}
      className="overflow-hidden border-t border-white/15 bg-black px-6 py-32 md:py-48"
    >
      <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
        {eyebrow}
      </p>
      <h3 className="mt-8 text-center text-[11vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white md:text-[6.5vw]">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-6 text-center text-sm tracking-[0.5em] text-white/50">
          {subtitle}
        </p>
      )}

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
          {offsets.map((offset) => {
            const i = (index + offset + items.length) % items.length;
            const item = items[i];
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
                <Frame
                  item={item}
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
            {items[index].label}
          </p>
          <button
            onClick={() => go(1)}
            className="text-xs font-bold tracking-[0.4em] uppercase text-white/50 transition-colors hover:text-white"
          >
            NEXT
          </button>
        </div>
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
            <div onClick={(e) => e.stopPropagation()}>
              <Frame
                item={items[index]}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-bold tracking-[0.4em] uppercase text-white/60 hover:text-white"
            >
              PREV
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold tracking-[0.4em] uppercase text-white/60 hover:text-white"
            >
              NEXT
            </button>
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