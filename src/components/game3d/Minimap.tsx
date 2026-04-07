"use client";

interface MinimapProps {
  playerPosition: [number, number, number];
}

const BUILDINGS = [
  { id: "about", label: "About", x: -10, z: -3, color: "#c84b31" },
  { id: "experience", label: "Exp", x: -10, z: -14, color: "#2a6e4a" },
  { id: "skills", label: "Skills", x: 0, z: -14, color: "#667eea" },
  { id: "projects", label: "Projects", x: 10, z: -3, color: "#d69e2e" },
  { id: "blog", label: "Blog", x: 10, z: -14, color: "#805ad5" },
  { id: "contact", label: "Contact", x: 0, z: -22, color: "#c84b31" },
];

const MAP_SIZE = 160; // px
const WORLD_SIZE = 80; // -40 to 40

function worldToMap(worldX: number, worldZ: number): { x: number; y: number } {
  return {
    x: ((worldX + WORLD_SIZE / 2) / WORLD_SIZE) * MAP_SIZE,
    y: ((worldZ + WORLD_SIZE / 2) / WORLD_SIZE) * MAP_SIZE,
  };
}

export default function Minimap({ playerPosition }: MinimapProps) {
  const playerMap = worldToMap(playerPosition[0], playerPosition[2]);

  return (
    <div className="fixed right-4 bottom-20 z-50 sm:top-16 sm:bottom-auto">
      <div
        className="relative overflow-hidden rounded-lg border-2 border-white/20 bg-green-900/80 shadow-xl backdrop-blur-sm"
        style={{ width: MAP_SIZE, height: MAP_SIZE }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t border-white"
              style={{ top: `${(i / 8) * 100}%` }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l border-white"
              style={{ left: `${(i / 8) * 100}%` }}
            />
          ))}
        </div>

        {/* Buildings */}
        {BUILDINGS.map((b) => {
          const pos = worldToMap(b.x, b.z);
          return (
            <div
              key={b.id}
              className="absolute flex flex-col items-center"
              style={{
                left: pos.x - 4,
                top: pos.y - 4,
              }}
            >
              <div
                className="h-3 w-3 rounded-sm border border-white/40 shadow-sm"
                style={{ backgroundColor: b.color }}
              />
              <span className="mt-0.5 whitespace-nowrap font-mono text-[7px] font-bold text-white/80 [text-shadow:0_1px_2px_black]">
                {b.label}
              </span>
            </div>
          );
        })}

        {/* Paths */}
        <svg className="absolute inset-0 opacity-20" viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}>
          {BUILDINGS.map((b) => {
            const center = worldToMap(0, -5);
            const pos = worldToMap(b.x, b.z);
            return (
              <line
                key={b.id}
                x1={center.x}
                y1={center.y}
                x2={pos.x}
                y2={pos.y}
                stroke="white"
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {/* Player dot */}
        <div
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-yellow-400 shadow-lg"
          style={{
            left: playerMap.x,
            top: playerMap.y,
            transition: "left 0.1s, top 0.1s",
          }}
        />

        {/* Spawn marker */}
        <div className="absolute font-mono text-[7px] text-yellow-300/60" style={{ ...worldToMap(0, 12), left: worldToMap(0, 12).x - 8 }}>
          SPAWN
        </div>

        {/* Label */}
        <div className="absolute bottom-1 left-1 font-mono text-[8px] uppercase tracking-widest text-white/40">
          Map
        </div>
      </div>
    </div>
  );
}
