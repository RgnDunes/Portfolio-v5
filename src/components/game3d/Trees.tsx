"use client";

import { useMemo } from "react";

export default function Trees() {
  const trees = useMemo(() => {
    const result: { x: number; z: number; h: number; th: number; leafColor: string }[] = [];
    const rng = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    // Landmark positions to avoid
    const avoid = [
      [-25, -10], [-40, -50], [5, -55], [40, -15], [35, -60], [-5, 35], [10, 20], // lake center
    ];

    for (let i = 0; i < 150; i++) {
      const x = (rng(i * 3) - 0.5) * 170;
      const z = (rng(i * 3 + 1) - 0.5) * 170;

      const tooClose = avoid.some(([ax, az]) => Math.abs(x - ax) < 8 && Math.abs(z - az) < 8);
      const inLake = Math.sqrt((x - 10) ** 2 + (z - 20) ** 2) < 18;
      if (tooClose || inLake) continue;

      const leafHue = 100 + rng(i * 3 + 4) * 40;
      const leafLight = 20 + rng(i * 3 + 5) * 20;

      result.push({
        x, z,
        h: 1.5 + rng(i * 3 + 2) * 2.5,
        th: 1.2 + rng(i * 3 + 3) * 2,
        leafColor: `hsl(${leafHue}, 45%, ${leafLight}%)`,
      });
    }
    return result;
  }, []);

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          <mesh position={[0, t.th / 2, 0]} castShadow>
            <boxGeometry args={[0.5, t.th, 0.5]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
          <mesh position={[0, t.th + t.h / 2, 0]} castShadow>
            <boxGeometry args={[t.h * 0.9, t.h, t.h * 0.9]} />
            <meshStandardMaterial color={t.leafColor} />
          </mesh>
          <mesh position={[0, t.th + t.h + 0.4, 0]} castShadow>
            <boxGeometry args={[t.h * 0.55, t.h * 0.5, t.h * 0.55]} />
            <meshStandardMaterial color={t.leafColor} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
