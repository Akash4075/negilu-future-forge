import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { MachineModel } from "./MachineModel";

export type CanvasProps = {
  interactive?: boolean;
  autoRotate?: boolean;
  onHotspot?: (id: string) => void;
  activeHotspot?: string | null;
  /** increment to zoom in, decrement to zoom out */
  zoomSignal?: number;
};

function Controls({ interactive, zoomSignal }: { interactive: boolean; zoomSignal: number }) {
  const ref = useRef<OrbitControlsImpl>(null);
  const prev = useRef(zoomSignal);

  useEffect(() => {
    const delta = zoomSignal - prev.current;
    prev.current = zoomSignal;
    const c = ref.current;
    if (!c || delta === 0) return;
    const cam = c.object;
    const factor = delta > 0 ? 0.82 : 1.22;
    cam.position.multiplyScalar(factor);
    c.update();
  }, [zoomSignal]);

  return (
    <OrbitControls
      ref={ref}
      enabled={interactive}
      enablePan={false}
      minDistance={3.5}
      maxDistance={14}
      minPolarAngle={0.5}
      maxPolarAngle={Math.PI / 2.05}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

export default function MachineCanvas({
  interactive = false,
  autoRotate = true,
  onHotspot,
  activeHotspot,
  zoomSignal = 0,
}: CanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [5.4, 2.8, 5.4], fov: 38 }}
    >
      <color attach="background" args={["#0b0d0e"]} />
      <fog attach="fog" args={["#0b0d0e", 9, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-7, 6, -4]} angle={0.6} intensity={40} color="#7ef7a8" distance={30} />
      <pointLight position={[3, 1.5, -5]} intensity={18} color="#e0a35e" distance={18} />

      <Suspense fallback={null}>
        <group position={[0, -0.9, 0]}>
          <MachineModel
            autoRotate={autoRotate}
            {...(onHotspot ? { onHotspot } : {})}
            activeHotspot={activeHotspot ?? null}
          />
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.75}
            scale={14}
            blur={2.4}
            far={5}
            color="#000000"
          />
        </group>
      </Suspense>

      <Controls interactive={interactive} zoomSignal={zoomSignal} />
    </Canvas>
  );
}
