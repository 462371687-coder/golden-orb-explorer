import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "栖茶 · 品牌与视觉设计师" },
      { name: "description", content: "拖拽旋转探索品牌符号 — 3D 交互式设计师作品集。" },
      { property: "og:title", content: "栖茶 · 品牌与视觉设计师" },
      { property: "og:description", content: "拖拽旋转探索品牌符号 — 3D 交互式设计师作品集。" },
    ],
  }),
  component: Index,
});

function Index() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F5F0E8");

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // Environment for reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const envGeo = new THREE.SphereGeometry(50, 32, 32);
    const envMat = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: new THREE.Color("#F5F0E8"),
    });
    envScene.add(new THREE.Mesh(envGeo, envMat));
    // add bright patches for highlights
    const addLightPatch = (x: number, y: number, z: number, color: string) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(8, 16, 16),
        new THREE.MeshBasicMaterial({ color })
      );
      m.position.set(x, y, z);
      envScene.add(m);
    };
    addLightPatch(10, 15, 10, "#ffffff");
    addLightPatch(-12, -8, 10, "#fff2dc");
    addLightPatch(0, -15, -10, "#e8d3b0");
    const envMap = pmrem.fromScene(envScene).texture;
    scene.environment = envMap;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(5, 6, 5);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xffd9a8, 0.6);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // Build abstract brand symbol — 4-pointed star (diamond) extruded
    const shape = new THREE.Shape();
    const r1 = 1.4; // outer points
    const r2 = 0.42; // inner curve
    shape.moveTo(0, r1);
    shape.quadraticCurveTo(r2, r2, r1, 0);
    shape.quadraticCurveTo(r2, -r2, 0, -r1);
    shape.quadraticCurveTo(-r2, -r2, -r1, 0);
    shape.quadraticCurveTo(-r2, r2, 0, r1);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.1,
      bevelSegments: 8,
      curveSegments: 48,
    });
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C8915F"),
      metalness: 1.0,
      roughness: 0.22,
      envMapIntensity: 1.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Interaction state
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let rotVelX = 0;
    let rotVelY = 0.004; // gentle auto-spin
    let autoSpin = true;

    const dom = renderer.domElement;
    dom.style.touchAction = "none";
    dom.style.cursor = "grab";

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoSpin = false;
      lastX = e.clientX;
      lastY = e.clientY;
      dom.setPointerCapture(e.pointerId);
      dom.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotVelY = dx * 0.005;
      rotVelX = dy * 0.005;
      mesh.rotation.y += rotVelY;
      mesh.rotation.x += rotVelX;
    };
    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      dom.releasePointerCapture(e.pointerId);
      dom.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(
        camera.position.z + e.deltaY * 0.005,
        3,
        12
      );
    };

    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("pointercancel", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!isDragging) {
        if (autoSpin) {
          mesh.rotation.y += 0.004;
          mesh.rotation.x += 0.001;
        } else {
          // momentum
          mesh.rotation.y += rotVelY;
          mesh.rotation.x += rotVelX;
          rotVelY *= 0.95;
          rotVelX *= 0.95;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointercancel", onPointerUp);
      dom.removeEventListener("wheel", onWheel);
      geometry.dispose();
      material.dispose();
      envGeo.dispose();
      envMat.dispose();
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (dom.parentNode) dom.parentNode.removeChild(dom);
    };
  }, []);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-center">
        <p
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: "#6b5240" }}
        >
          品牌与视觉设计师 · 拖拽旋转探索
        </p>
      </div>
    </main>
  );
}
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#fcfbf8" }}
    >
      <img
        data-lovable-blank-page-placeholder="REMOVE_THIS"
        src="https://cdn.gpteng.co/blank-app-v1.svg"
        alt="Your app will live here!"
      />
    </div>
  );
}
