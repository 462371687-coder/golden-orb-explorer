import { useEffect, useRef, useState } from "react";

/**
 * Pure CSS 3D brand symbol. No WebGL, no three.js — works in every browser
 * and degrades gracefully (flat symbol) where 3D transforms are unsupported.
 */
export default function BrandSymbol3D() {
  const [rot, setRot] = useState({ x: -12, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const idle = useRef(true);
  const last = useRef<{ x: number; y: number } | null>(null);

  // auto spin when idle
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const tick = (t: number) => {
      const dt = (t - prev) / 1000;
      prev = t;
      if (idle.current) {
        setRot((r) => ({ x: r.x, y: r.y + dt * 22 }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    idle.current = false;
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({
      x: Math.max(-80, Math.min(80, r.x - dy * 0.4)),
      y: r.y + dx * 0.4,
    }));
  };

  const endDrag = () => {
    setDragging(false);
    last.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    idle.current = false;
    setScale((s) => Math.max(0.5, Math.min(3, s - e.deltaY * 0.0015)));
  };

  const layer = (
    size: number,
    z: number,
    color: string,
    radius: string,
    extra?: React.CSSProperties,
  ): React.CSSProperties => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    width: size,
    height: size,
    marginLeft: -size / 2,
    marginTop: -size / 2,
    background: color,
    borderRadius: radius,
    transform: `translateZ(${z}px)`,
    ...extra,
  });

  return (
    <div
      className="h-full w-full touch-none select-none"
      style={{ perspective: 1200, perspectiveOrigin: "center" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        endDrag();
        idle.current = true;
      }}
      onMouseEnter={() => (idle.current = false)}
      onWheel={onWheel}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) rotateZ(45deg) scale(${scale})`,
            transition: dragging ? "none" : "transform 80ms linear",
            width: 260,
            height: 260,
            position: "relative",
            filter: "drop-shadow(0 24px 60px rgba(247,182,82,0.18))",
          }}
        >
          {/* red outer diamond */}
          <div style={layer(260, 0, "#cf391e", "18px")} />
          {/* beige layer */}
          <div style={layer(214, 14, "#fde2a7", "14px")} />
          {/* gold inner */}
          <div style={layer(170, 26, "#f7b652", "12px")} />
          {/* dark brown center block */}
          <div style={layer(120, 34, "#422113", "10px")} />
          {/* gold 4-point star */}
          <div
            style={layer(96, 44, "#f7b652", "0", {
              transform: "translateZ(44px) rotateZ(-45deg)",
              clipPath:
                "polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)",
            })}
          />
        </div>
      </div>
    </div>
  );
}
