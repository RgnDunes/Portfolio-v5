"use client";

import { useMemo } from "react";

interface PathPoint {
  x: number;
  z: number;
}

const WAYPOINTS: Record<string, PathPoint> = {
  spawn: { x: 0, z: 0 },
  campfire: { x: -25, z: -10 },
  monument: { x: -40, z: -50 },
  waterfall: { x: 5, z: -55 },
  treehouse: { x: 40, z: -15 },
  blog: { x: 35, z: -60 },
  dock: { x: -5, z: 35 },
};

const PATH_ROUTES: [string, string][] = [
  ["spawn", "campfire"],
  ["campfire", "monument"],
  ["spawn", "waterfall"],
  ["spawn", "treehouse"],
  ["treehouse", "blog"],
  ["spawn", "dock"],
];

function interpolatePath(from: PathPoint, to: PathPoint, spacing: number) {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const dist = Math.sqrt(dx * dx + dz * dz);
  const steps = Math.floor(dist / spacing);
  const points: { x: number; z: number; angle: number }[] = [];
  const angle = Math.atan2(dx, dz);

  for (let i = 0; i <= steps; i++) {
    const t = i / Math.max(steps, 1);
    points.push({
      x: from.x + dx * t,
      z: from.z + dz * t,
      angle,
    });
  }
  return points;
}

function PathSegment({ from, to }: { from: PathPoint; to: PathPoint }) {
  const points = useMemo(() => interpolatePath(from, to, 2), [from, to]);

  return (
    <group>
      {points.map((pt, i) => (
        <mesh
          key={i}
          position={[pt.x, 0.08, pt.z]}
          rotation={[0, pt.angle, 0]}
          receiveShadow
        >
          <boxGeometry args={[2, 0.15, 1]} />
          <meshStandardMaterial color="#b8956a" />
        </mesh>
      ))}
    </group>
  );
}

function Torch({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.15, 1.2, 0.15]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

function PathWithTorches({ from, to }: { from: PathPoint; to: PathPoint }) {
  const torchPositions = useMemo(() => {
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const torchSpacing = 15;
    const numTorches = Math.floor(dist / torchSpacing);
    const positions: [number, number, number][] = [];
    // Perpendicular offset so torches sit beside the path
    const perpX = -dz / dist;
    const perpZ = dx / dist;
    const offset = 1.5;

    for (let i = 1; i < numTorches; i++) {
      const t = i / numTorches;
      const x = from.x + dx * t;
      const z = from.z + dz * t;
      // Alternate sides
      const side = i % 2 === 0 ? 1 : -1;
      positions.push([x + perpX * offset * side, 0, z + perpZ * offset * side]);
    }
    return positions;
  }, [from, to]);

  return (
    <group>
      <PathSegment from={from} to={to} />
      {torchPositions.map((pos, i) => (
        <Torch key={i} position={pos} />
      ))}
    </group>
  );
}

export default function Paths() {
  return (
    <group>
      {PATH_ROUTES.map(([fromKey, toKey], i) => (
        <PathWithTorches
          key={i}
          from={WAYPOINTS[fromKey]}
          to={WAYPOINTS[toKey]}
        />
      ))}
    </group>
  );
}
