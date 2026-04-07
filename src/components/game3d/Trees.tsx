"use client";

import { useMemo } from "react";

interface TreeData {
  x: number;
  z: number;
  height: number;
  trunkHeight: number;
}

export default function Trees() {
  const trees = useMemo(() => {
    const result: TreeData[] = [];
    const rng = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 60; i++) {
      const x = (rng(i * 3) - 0.5) * 70;
      const z = (rng(i * 3 + 1) - 0.5) * 70;

      // Don't place trees on buildings or paths
      const nearBuilding = [
        [-10, -3], [-10, -14], [0, -14], [10, -3], [10, -14], [0, -22], [0, 10],
      ].some(([bx, bz]) => Math.abs(x - bx) < 6 && Math.abs(z - bz) < 6);

      const onPath = (Math.abs(x) < 2 && z > -25 && z < 15) ||
        (Math.abs(z + 2.5) < 2 && Math.abs(x) < 14);

      if (nearBuilding || onPath) continue;

      result.push({
        x,
        z,
        height: 1.5 + rng(i * 3 + 2) * 2,
        trunkHeight: 1 + rng(i * 3 + 3) * 1.5,
      });
    }
    return result;
  }, []);

  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]}>
          {/* Trunk */}
          <mesh position={[0, tree.trunkHeight / 2, 0]} castShadow>
            <boxGeometry args={[0.4, tree.trunkHeight, 0.4]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          {/* Leaves - stacked blocks like Minecraft */}
          <mesh position={[0, tree.trunkHeight + tree.height / 2, 0]} castShadow>
            <boxGeometry args={[tree.height * 0.8, tree.height, tree.height * 0.8]} />
            <meshStandardMaterial color={`hsl(${110 + Math.random() * 30}, 50%, ${25 + Math.random() * 15}%)`} />
          </mesh>
          <mesh position={[0, tree.trunkHeight + tree.height + 0.3, 0]} castShadow>
            <boxGeometry args={[tree.height * 0.5, tree.height * 0.5, tree.height * 0.5]} />
            <meshStandardMaterial color={`hsl(${110 + Math.random() * 30}, 50%, ${28 + Math.random() * 15}%)`} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
