import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, InstancedMesh } from "three";
import { Color, MathUtils, Object3D } from "three";

const GREEN = "#4ade80";

function Wheel({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.x += d * 0.6;
  });
  return (
    <group ref={ref} position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.34, 28]} />
        <meshStandardMaterial color="#111315" roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.26, 0.26, 0.37, 20]} />
        <meshStandardMaterial color="#5c6166" roughness={0.35} metalness={0.9} />
      </mesh>
    </group>
  );
}

function Dust() {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: 80 }, () => ({
        x: (Math.random() - 0.5) * 9,
        y: Math.random() * 3,
        z: (Math.random() - 0.5) * 6,
        s: 0.1 + Math.random() * 0.5,
      })),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    seeds.forEach((p, i) => {
      dummy.position.set(p.x + Math.sin(t * p.s + i) * 0.4, ((p.y + t * p.s * 0.15) % 3) - 0.6, p.z);
      dummy.scale.setScalar(0.012 + (i % 3) * 0.004);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 80]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={new Color("#c9b18a")} transparent opacity={0.35} />
    </instancedMesh>
  );
}

/**
 * Procedural Negilu field-robot model. Swappable with a GLB asset later —
 * the viewer treats this as the default model source.
 */
export function MachineModel({
  autoRotate = true,
  onHotspot,
  activeHotspot,
}: {
  autoRotate?: boolean;
  onHotspot?: (id: string) => void;
  activeHotspot?: string | null;
}) {
  const root = useRef<Group>(null);

  useFrame((state, d) => {
    if (!root.current) return;
    if (autoRotate) root.current.rotation.y += d * 0.18;
    root.current.position.y = MathUtils.lerp(
      root.current.position.y,
      Math.sin(state.clock.elapsedTime * 0.8) * 0.03,
      0.1,
    );
  });

  const hs = (id: string, pos: [number, number, number]) => (
    <mesh
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        onHotspot?.(id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <sphereGeometry args={[0.11, 16, 16]} />
      <meshBasicMaterial
        color={activeHotspot === id ? "#ffffff" : GREEN}
        transparent
        opacity={onHotspot ? 0.9 : 0}
      />
    </mesh>
  );

  return (
    <group ref={root} scale={1.15}>
      {/* chassis */}
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[2.6, 0.62, 1.6]} />
        <meshStandardMaterial color="#1b1e21" roughness={0.42} metalness={0.75} />
      </mesh>
      {/* upper deck */}
      <mesh castShadow position={[-0.15, 1.15, 0]}>
        <boxGeometry args={[1.7, 0.28, 1.35]} />
        <meshStandardMaterial color="#26292d" roughness={0.35} metalness={0.85} />
      </mesh>
      {/* green light strips */}
      <mesh position={[0, 0.62, 0.81]}>
        <boxGeometry args={[2.3, 0.05, 0.03]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={2.6} />
      </mesh>
      <mesh position={[0, 0.62, -0.81]}>
        <boxGeometry args={[2.3, 0.05, 0.03]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={2.2} />
      </mesh>
      {/* headlight */}
      <mesh position={[1.32, 0.85, 0]}>
        <boxGeometry args={[0.04, 0.12, 1.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.8} />
      </mesh>
      {/* sensor mast */}
      <mesh castShadow position={[-0.5, 1.6, 0]}>
        <cylinderGeometry args={[0.075, 0.09, 0.85, 16]} />
        <meshStandardMaterial color="#4c5257" roughness={0.3} metalness={0.95} />
      </mesh>
      {/* AI camera head */}
      <mesh castShadow position={[-0.5, 2.1, 0]}>
        <boxGeometry args={[0.52, 0.3, 0.5]} />
        <meshStandardMaterial color="#0f1113" roughness={0.25} metalness={0.6} />
      </mesh>
      <mesh position={[-0.24, 2.1, 0.18]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.4} />
      </mesh>
      {/* antennae */}
      <mesh position={[-1.1, 1.55, 0.55]}>
        <cylinderGeometry args={[0.018, 0.018, 0.8, 8]} />
        <meshStandardMaterial color="#2a2d30" />
      </mesh>
      <mesh position={[-1.1, 1.55, -0.55]}>
        <cylinderGeometry args={[0.018, 0.018, 0.8, 8]} />
        <meshStandardMaterial color="#2a2d30" />
      </mesh>
      {/* sprayer boom */}
      <mesh castShadow position={[-1.45, 0.72, 0]}>
        <boxGeometry args={[0.28, 0.2, 2.5]} />
        <meshStandardMaterial color="#31353a" roughness={0.4} metalness={0.8} />
      </mesh>
      {[-1, -0.4, 0.2, 0.8].map((z) => (
        <mesh key={z} position={[-1.45, 0.56, z]}>
          <coneGeometry args={[0.06, 0.14, 12]} />
          <meshStandardMaterial color="#6b7176" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {/* battery pack */}
      <mesh position={[0.55, 0.72, 0]}>
        <boxGeometry args={[0.75, 0.44, 1.2]} />
        <meshStandardMaterial color="#15181a" roughness={0.6} metalness={0.5} />
      </mesh>

      <Wheel position={[0.95, 0.5, 0.9]} />
      <Wheel position={[0.95, 0.5, -0.9]} />
      <Wheel position={[-0.85, 0.5, 0.9]} />
      <Wheel position={[-0.85, 0.5, -0.9]} />

      {onHotspot ? (
        <>
          {hs("camera", [-0.5, 2.35, 0])}
          {hs("motor", [0.95, 0.5, 1.15])}
          {hs("battery", [0.55, 1.05, 0])}
          {hs("sprayer", [-1.45, 0.72, 1.35])}
          {hs("sensors", [-1.1, 2.0, -0.55])}
        </>
      ) : null}

      <Dust />
    </group>
  );
}
