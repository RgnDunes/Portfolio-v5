"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudData {
  x: number;
  y: number;
  z: number;
  blocks: { dx: number; dy: number; dz: number; sx: number; sy: number; sz: number }[];
}

function Cloud({ data, groupRef }: { data: CloudData; groupRef: (el: THREE.Group | null) => void }) {
  return (
    <group ref={groupRef} position={[data.x, data.y, data.z]}>
      {data.blocks.map((block, i) => (
        <mesh key={i} position={[block.dx, block.dy, block.dz]}>
          <boxGeometry args={[block.sx, block.sy, block.sz]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function Clouds() {
  const count = 10;
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const clouds = useMemo<CloudData[]>(() => {
    return Array.from({ length: count }, () => {
      const numBlocks = 2 + Math.floor(Math.random() * 3);
      const blocks = [];
      for (let j = 0; j < numBlocks; j++) {
        blocks.push({
          dx: (Math.random() - 0.5) * 6,
          dy: (Math.random() - 0.5) * 1,
          dz: (Math.random() - 0.5) * 4,
          sx: 4 + Math.random() * 6,
          sy: 1 + Math.random() * 1.5,
          sz: 3 + Math.random() * 4,
        });
      }
      return {
        x: (Math.random() - 0.5) * 100,
        y: 35 + Math.random() * 10,
        z: (Math.random() - 0.5) * 100,
        blocks,
      };
    });
  }, []);

  useFrame((_, delta) => {
    for (let i = 0; i < count; i++) {
      const group = groupRefs.current[i];
      if (!group) continue;
      group.position.x += 0.5 * delta;
      if (group.position.x > 100) {
        group.position.x = -100;
      }
    }
  });

  return (
    <group>
      {clouds.map((data, i) => (
        <Cloud
          key={i}
          data={data}
          groupRef={(el) => { groupRefs.current[i] = el; }}
        />
      ))}
    </group>
  );
}
