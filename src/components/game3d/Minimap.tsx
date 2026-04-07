"use client";

import { LANDMARKS } from "./Landmarks";

interface MinimapProps {
  playerPosition: [number, number, number];
  playerRotation?: number;
}

const MAP_SIZE = 180;
const WORLD_SIZE = 200;

function worldToMap(wx: number, wz: number) {
  return {
    x: ((wx + WORLD_SIZE / 2) / WORLD_SIZE) * MAP_SIZE,
    y: ((wz + WORLD_SIZE / 2) / WORLD_SIZE) * MAP_SIZE,
  };
}

export default function Minimap({ playerPosition, playerRotation = 0 }: MinimapProps) {
  const playerMap = worldToMap(playerPosition[0], playerPosition[2]);
  const lakePos = worldToMap(10, 20);

  // Direction arrow offset (points in facing direction)
  const arrowLen = 10;
  const arrowX = Math.sin(playerRotation) * arrowLen;
  const arrowY = -Math.cos(playerRotation) * arrowLen;

  const px = Math.max(7, Math.min(MAP_SIZE - 7, playerMap.x));
  const py = Math.max(7, Math.min(MAP_SIZE - 7, playerMap.y));

  return (
    <div className="fixed right-4 bottom-20 z-50 sm:top-16 sm:bottom-auto">
      <div
        className="relative overflow-hidden rounded-xl border-2 border-white/20 shadow-2xl"
        style={{ width: MAP_SIZE, height: MAP_SIZE, background: "linear-gradient(135deg, #2d5a1e 0%, #3d6b2e 50%, #2d5a1e 100%)" }}
      >
        {/* Lake */}
        <div
          className="absolute rounded-full bg-blue-400/50"
          style={{ left: lakePos.x - 14, top: lakePos.y - 14, width: 28, height: 28 }}
        />

        {/* Landmarks */}
        {LANDMARKS.map((lm) => {
          const pos = worldToMap(lm.position[0], lm.position[2]);
          return (
            <div
              key={lm.id}
              className="absolute flex flex-col items-center"
              style={{ left: pos.x - 6, top: pos.y - 6 }}
            >
              <div className="text-sm leading-none">{lm.icon}</div>
              <span className="mt-0.5 whitespace-nowrap font-mono text-[6px] font-bold text-white/90 [text-shadow:0_1px_2px_black]">
                {lm.label.split("—")[0].trim()}
              </span>
            </div>
          );
        })}

        {/* Player direction arrow */}
        <svg
          className="absolute pointer-events-none"
          style={{ left: px - 12, top: py - 12, width: 24, height: 24 }}
          viewBox="-12 -12 24 24"
        >
          <line
            x1={0} y1={0}
            x2={arrowX} y2={-arrowY}
            stroke="#ff4444" strokeWidth={2.5} strokeLinecap="round"
          />
        </svg>

        {/* Player dot */}
        <div
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-yellow-400 shadow-lg shadow-yellow-400/50"
          style={{ left: px, top: py, transition: "left 0.1s, top 0.1s" }}
        />

        {/* Compass */}
        <div className="absolute left-2 top-2 font-mono text-[8px] font-bold text-white/50">N</div>
        <div className="absolute bottom-2 left-2 font-mono text-[8px] font-bold text-white/50">S</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[8px] font-bold text-white/50">E</div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[8px] font-bold text-white/50">W</div>

        <div className="absolute bottom-1 right-1 font-mono text-[7px] uppercase tracking-widest text-white/30">
          Map
        </div>
      </div>
    </div>
  );
}
