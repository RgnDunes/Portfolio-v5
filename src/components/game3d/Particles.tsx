"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ====== Fireflies ======
function Fireflies() {
  const count = 15;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const offsets = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 90,
        z: (Math.random() - 0.5) * 90,
        yBase: 1 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.3,
        speedZ: (Math.random() - 0.5) * 0.3,
        bobSpeed: 0.5 + Math.random() * 1.5,
        bobAmp: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const o = offsets[i];
      mesh.position.x = o.x + Math.sin(t * o.speedX + o.phase) * 3;
      mesh.position.y = o.yBase + Math.sin(t * o.bobSpeed + o.phase) * o.bobAmp;
      mesh.position.z = o.z + Math.cos(t * o.speedZ + o.phase) * 3;
    }
  });

  return (
    <group>
      {offsets.map((o, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[o.x, o.yBase, o.z]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#ffdd44"
            emissive="#ffdd44"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ====== Campfire Sparks ======
function CampfireSparks() {
  const count = 6;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const offsets = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        xDrift: (Math.random() - 0.5) * 0.4,
        zDrift: (Math.random() - 0.5) * 0.4,
        speed: 1 + Math.random() * 2,
        maxHeight: 3 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const o = offsets[i];
      // Looping rise: use modulo to reset
      const progress = ((t * o.speed + o.phase) % o.maxHeight) / o.maxHeight;
      mesh.position.x = -25 + Math.sin(t * 0.5 + o.phase) * o.xDrift * progress * 5;
      mesh.position.y = progress * o.maxHeight + 0.5;
      mesh.position.z = -10 + Math.cos(t * 0.5 + o.phase) * o.zDrift * progress * 5;
      // Fade: scale down as it rises
      const scale = 1 - progress * 0.8;
      mesh.scale.setScalar(Math.max(scale, 0.1));
    }
  });

  return (
    <group>
      {offsets.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[-25, 0.5, -10]}
        >
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#ff8c00"
            emissive="#ff6b00"
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

// ====== Waterfall Mist ======
function WaterfallMist() {
  const count = 5;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const offsets = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        maxDist: 2 + Math.random() * 3,
        yOffset: Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const o = offsets[i];
      const progress = ((t * o.speed + o.phase) % 4) / 4; // 0..1 loop
      const dist = progress * o.maxDist;
      mesh.position.x = 5 + Math.cos(o.angle) * dist;
      mesh.position.y = 0.3 + o.yOffset + Math.sin(t * 0.5 + o.phase) * 0.3;
      mesh.position.z = -53 + Math.sin(o.angle) * dist;
      // Fade out as it drifts
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 * (1 - progress);
    }
  });

  return (
    <group>
      {offsets.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[5, 0.5, -53]}
        >
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ====== Combined Export ======
export default function Particles() {
  return (
    <group>
      <Fireflies />
      <CampfireSparks />
      <WaterfallMist />
    </group>
  );
}
