"use client";

interface GameUIProps {
  onExit: () => void;
}

export default function GameUI({ onExit }: GameUIProps) {
  return (
    <>
      {/* Crosshair */}
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="h-6 w-6 relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white/60" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 bg-white/60" />
        </div>
      </div>

      {/* Controls hint */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="rounded-lg bg-black/70 px-6 py-3 text-center backdrop-blur-sm">
          <div className="font-mono text-xs text-white/90">
            <span className="text-yellow-400">WASD</span> Move &nbsp;|&nbsp;
            <span className="text-yellow-400">Mouse</span> Look &nbsp;|&nbsp;
            <span className="text-yellow-400">Space</span> Jump &nbsp;|&nbsp;
            <span className="text-yellow-400">Click</span> on buildings to explore
          </div>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={onExit}
        className="fixed right-4 top-4 z-50 rounded-lg bg-black/70 px-4 py-2 font-mono text-sm text-white backdrop-blur-sm transition-colors hover:bg-red-600/80"
      >
        ESC &middot; Exit Game
      </button>

      {/* Title */}
      <div className="fixed left-4 top-4 z-50">
        <div className="rounded-lg bg-black/70 px-4 py-2 backdrop-blur-sm">
          <div className="font-serif text-lg font-bold text-white">
            Portfolio Quest
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">
            Explore Divyansh&apos;s World
          </div>
        </div>
      </div>

      {/* Click to start overlay */}
      <div
        id="click-to-start"
        className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.display = "none";
        }}
      >
        <div className="text-center">
          <div className="font-serif text-4xl font-bold text-white">
            Portfolio Quest
          </div>
          <div className="mt-2 font-mono text-sm text-white/70">
            A Minecraft-inspired portfolio experience
          </div>
          <div className="mt-6 animate-pulse font-mono text-lg text-yellow-400">
            Click anywhere to start
          </div>
          <div className="mt-4 font-mono text-xs text-white/50">
            Use WASD to move, mouse to look, click buildings to explore
          </div>
        </div>
      </div>
    </>
  );
}
