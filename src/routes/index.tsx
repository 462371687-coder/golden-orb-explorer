import { createFileRoute } from "@tanstack/react-router";
import ErrorBoundary from "@/components/ErrorBoundary";
import SpiralGallery from "@/components/SpiralGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZHENG SUYAN — 3D SPIRAL PORTFOLIO GALLERY" },
      {
        name: "description",
        content:
          "3D spiral gallery portfolio of ZHENG SUYAN — brand identity, poster, type, IP, logo, UI, cultural and brochure design.",
      },
      { property: "og:title", content: "ZHENG SUYAN — 3D SPIRAL PORTFOLIO" },
      {
        property: "og:description",
        content:
          "Scroll or drag to rotate a 3D spiral of brand, poster and type design works.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ErrorBoundary>
      <SpiralGallery />
    </ErrorBoundary>
  );
}
