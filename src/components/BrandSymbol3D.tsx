import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

function diamondShape(size: number, radius = 0.04) {
  // Rounded square that will be rotated 45° to look like a diamond
  const s = size;
  const r = radius;
  const shape = new THREE.Shape();
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r, -s);
  shape.quadraticCurveTo(s, -s, s, -s + r);
  shape.lineTo(s, s - r);
  shape.quadraticCurveTo(s, s, s - r, s);
  shape.lineTo(-s + r, s);
  shape.quadraticCurveTo(-s, s, -s, s - r);
  shape.lineTo(-s, -s + r);
  shape.quadraticCurveTo(-s, -s, -s + r, -s);
  return shape;
}

function fourPointStarShape(outer: number, inner: number) {
  const shape = new THREE.Shape();
  // 4-pointed star with concave curves between points
  shape.moveTo(0, outer);
  shape.quadraticCurveTo(inner * 0.35, inner * 0.35, outer, 0);
  shape.quadraticCurveTo(inner * 0.35, -inner * 0.35, 0, -outer);
  shape.quadraticCurveTo(-inner * 0.35, -inner * 0.35, -outer, 0);
  shape.quadraticCurveTo(-inner * 0.35, inner * 0.35, 0, outer);
  return shape;
}

function LayeredDiamond({ autoSpin }: { autoSpin: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoSpin && group.current) {
      group.current.rotation.y += delta * 0.35;
      group.current.rotation.x += delta * 0.08;
    }
  });

  const extrude = (depth: number) => ({
    depth,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 4,
    curveSegments: 48,
  });

  // All shapes are squares rotated 45° (the whole group is tilted)
  return (
    <group ref={group} rotation={[0, 0, Math.PI / 4]}>
      {/* Red outer diamond */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[diamondShape(1.3, 0.08), extrude(0.22)]} />
        <meshStandardMaterial color="#cf391e" metalness={0.4} roughness={0.35} />
      </mesh>
      {/* Beige layer */}
      <mesh position={[0, 0, 0.12]}>
        <extrudeGeometry args={[diamondShape(1.08, 0.07), extrude(0.18)]} />
        <meshStandardMaterial color="#fde2a7" metalness={0.2} roughness={0.45} />
      </mesh>
      {/* Gold inner square */}
      <mesh position={[0, 0, 0.22]}>
        <extrudeGeometry args={[diamondShape(0.86, 0.05), extrude(0.16)]} />
        <meshStandardMaterial color="#f7b652" metalness={0.55} roughness={0.3} />
      </mesh>
      {/* Brown 4-point star shadow (slightly bigger) */}
      <group rotation={[0, 0, -Math.PI / 4]} position={[0, 0, 0.34]}>
        <mesh>
          <extrudeGeometry args={[fourPointStarShape(0.78, 0.18), extrude(0.1)]} />
          <meshStandardMaterial color="#422113" metalness={0.3} roughness={0.55} />
        </mesh>
        {/* Gold star on top */}
        <mesh position={[0, 0, 0.06]}>
          <extrudeGeometry args={[fourPointStarShape(0.66, 0.14), extrude(0.08)]} />
          <meshStandardMaterial
            color="#f7b652"
            metalness={0.7}
            roughness={0.22}
            emissive="#f7b652"
            emissiveIntensity={0.08}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function BrandSymbol3D() {
  const [autoSpin, setAutoSpin] = useState(true);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 2]}
      onPointerDown={() => setAutoSpin(false)}
      onPointerOver={() => setAutoSpin(false)}
      onPointerOut={() => setAutoSpin(true)}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, -3, -2]} intensity={0.35} color="#ffd9a8" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <LayeredDiamond autoSpin={autoSpin} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.2}
        maxDistance={9}
        rotateSpeed={0.9}
      />
    </Canvas>
  );
}