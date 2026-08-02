import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import BrandSymbol3D from "@/components/BrandSymbol3D";
import BrandSection from "@/components/BrandSection";
import PosterSection from "@/components/PosterSection";
import TypeSection from "@/components/TypeSection";
import IPSection from "@/components/IPSection";
import LogoSection from "@/components/LogoSection";
import AboutSection from "@/components/AboutSection";
import CarouselSection from "@/components/CarouselSection";
import ui1 from "@/assets/other/other-01.jpg.asset.json";
import ui2 from "@/assets/other/other-02.jpg.asset.json";
import ui3 from "@/assets/other/other-03.jpg.asset.json";
import ui4 from "@/assets/other/other-04.jpg.asset.json";
import cc1 from "@/assets/other/other-07.jpg.asset.json";
import cc2 from "@/assets/other/other-08.jpg.asset.json";
import cc3 from "@/assets/other/other-09.jpg.asset.json";
import cc4 from "@/assets/other/other-12.jpg.asset.json";
import br1 from "@/assets/other/other-13.jpg.asset.json";
import br14 from "@/assets/other/brochure-14.jpg.asset.json";
import br15 from "@/assets/other/brochure-15.jpg.asset.json";
import br16 from "@/assets/other/brochure-16.jpg.asset.json";
import br17 from "@/assets/other/brochure-17.jpg.asset.json";
import br18 from "@/assets/other/brochure-18.jpg.asset.json";
import ui5 from "@/assets/other/other-n05.jpg.asset.json";
import ui6 from "@/assets/other/other-n06.jpg.asset.json";
import cc1d from "@/assets/other/other-n10.jpg.asset.json";
import cc1e from "@/assets/other/other-n11.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZHENG SUYAN — BRAND & VISUAL DESIGNER" },
      {
        name: "description",
        content:
          "Portfolio of ZHENG SUYAN — brand identity, poster and typography design. Drag the 3D symbol to explore.",
      },
      { property: "og:title", content: "ZHENG SUYAN — BRAND & VISUAL DESIGNER" },
      {
        property: "og:description",
        content: "BRAND / POSTER / TYPE — a minimal black-and-white design portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

function Index() {
  return (
    <main className="relative min-h-screen w-full bg-black pb-24 text-white">
      {/* HERO */}
      <section id="top" className="relative h-screen w-full">
        <div className="absolute inset-0 bg-black">
          <BrandSymbol3D />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="pointer-events-none absolute inset-x-0 top-10 text-center text-xs font-bold uppercase tracking-[0.6em]"
        >
          ZHENG SUYAN
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-32 text-center text-xs font-bold uppercase tracking-[0.6em] text-white/60"
        >
          DRAG TO ROTATE
        </motion.p>
      </section>

      {/* WORK */}
      <section id="work" className="border-t border-white/15 px-6 py-32 md:py-48">
        <p className="text-center text-xs font-bold tracking-[0.5em] uppercase text-white/40">
          01 / BRAND
        </p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-center text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[8vw]"
        >
          WORK
        </motion.h2>
      </section>

      <BrandSection />
      <PosterSection />
      <TypeSection />
      <IPSection />
      <LogoSection />

      <CarouselSection
        id="ui"
        eyebrow="06 / UI"
        title="UI DESIGN"
        subtitle="UI 界面设计"
        items={[
          { src: ui1.url, label: "UI-1" },
          { src: ui2.url, label: "UI-2" },
          { src: ui3.url, label: "UI-3" },
          { src: ui4.url, label: "UI-4" },
          { src: ui5.url, label: "UI-5" },
          { src: ui6.url, label: "UI-6" },
        ]}
      />

      <CarouselSection
        id="cultural-1"
        eyebrow="07 / CULTURAL CREATIVE"
        title="文创设计 一"
        subtitle="CULTURAL CREATIVE 1"
        items={[
          { src: cc1.url, label: "CC1-1" },
          { src: cc2.url, label: "CC1-2" },
          { src: cc3.url, label: "CC1-3" },
          { src: cc1d.url, label: "CC1-4" },
          { src: cc1e.url, label: "CC1-5" },
        ]}
      />

      <CarouselSection
        id="cultural-2"
        eyebrow="08 / CULTURAL CREATIVE"
        title="文创设计 二"
        subtitle="CULTURAL CREATIVE 2"
        items={[{ src: cc4.url, label: "CC2-1" }]}
      />

      <CarouselSection
        id="brochure"
        eyebrow="09 / BROCHURE"
        title="BROCHURE DESIGN"
        subtitle="画册设计"
        items={[
          { src: br1.url, label: "BR-1" },
          { src: br2.url, label: "BR-2" },
          { src: br3.url, label: "BR-3" },
        ]}
      />

      <AboutSection />

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-white/15 px-6 py-32 text-center md:py-48"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[12vw] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[8vw]">
            LET&apos;S WORK
            <br />
            TOGETHER
          </h2>

          <div className="mt-20 flex flex-col items-center gap-6 text-sm font-bold uppercase tracking-[0.35em]">
            <a
              href="mailto:1469079249@QQ.COM"
              className="px-3 py-1 transition-colors duration-200 hover:bg-white hover:text-black"
            >
              1469079249@QQ.COM
            </a>
            <a
              href="tel:15710063937"
              className="px-3 py-1 transition-colors duration-200 hover:bg-white hover:text-black"
            >
              15710063937
            </a>
          </div>

          <p className="mt-24 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
            © 2026 ZHENG SUYAN
          </p>
        </motion.div>
      </section>

      {/* BOTTOM FIXED NAV */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-white/20 bg-black">
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="border-r border-white/20 py-5 text-center text-base font-extrabold uppercase tracking-[0.3em] text-white transition-colors duration-200 last:border-r-0 hover:bg-white hover:text-black md:text-2xl"
          >
            {n.label}
          </a>
        ))}
      </nav>
    </main>
  );
}
