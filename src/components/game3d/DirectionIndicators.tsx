"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";

interface DirectionIndicatorsProps {
  playerPosition: [number, number, number];
}

const LANDMARK_TARGETS = [
  { id: "about", label: "Campfire", icon: "🏕️", x: -25, z: -10 },
  { id: "experience", label: "Monument", icon: "🗿", x: -40, z: -50 },
  { id: "skills", label: "Waterfall", icon: "🌊", x: 5, z: -55 },
  { id: "projects", label: "Treehouse", icon: "🏠", x: 40, z: -15 },
  { id: "blog", label: "Library", icon: "📚", x: 35, z: -60 },
  { id: "contact", label: "Dock", icon: "⚓", x: -5, z: 35 },
];

function Indicator({
  playerPosition,
  target,
}: {
  playerPosition: [number, number, number];
  target: (typeof LANDMARK_TARGETS)[number];
}) {
  const dx = target.x - playerPosition[0];
  const dz = target.z - playerPosition[2];
  const distance = Math.sqrt(dx * dx + dz * dz);

  // Only show for landmarks > 15 units away
  if (distance <= 15) return null;

  // Position on a circle of radius 5 around the player, in the direction of the target
  const angle = Math.atan2(dx, dz);
  const radius = 5;
  const indicatorX = playerPosition[0] + Math.sin(angle) * radius;
  const indicatorZ = playerPosition[2] + Math.cos(angle) * radius;
  const indicatorY = playerPosition[1] + 4;

  // Opacity: fade from 0.9 (far) to 0.4 (near threshold)
  const maxDist = 80;
  const opacity = Math.min(0.9, 0.4 + ((distance - 15) / (maxDist - 15)) * 0.5);

  return (
    <group position={[indicatorX, indicatorY, indicatorZ]}>
      <Html center>
        <div
          className="pointer-events-none select-none whitespace-nowrap rounded px-2 py-1 font-mono text-[9px] text-white"
          style={{
            background: `rgba(0,0,0,${opacity * 0.7})`,
            opacity,
          }}
        >
          <span>{target.icon}</span>{" "}
          <span>{target.label}</span>{" "}
          <span style={{ color: "#aaa" }}>— {Math.round(distance)}m</span>
        </div>
      </Html>
    </group>
  );
}

export default function DirectionIndicators({ playerPosition }: DirectionIndicatorsProps) {
  return (
    <group>
      {LANDMARK_TARGETS.map((target) => (
        <Indicator key={target.id} playerPosition={playerPosition} target={target} />
      ))}
    </group>
  );
}
