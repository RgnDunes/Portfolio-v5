"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface MobileControlsProps {
  onMove: (x: number, z: number) => void;
  onJump: () => void;
  onSprint: (sprinting: boolean) => void;
}

// Detect touch device
function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function MobileControls({ onMove, onJump, onSprint }: MobileControlsProps) {
  const [isTouch, setIsTouch] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const moveRef = useRef({ x: 0, z: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  // Continuous movement emission
  useEffect(() => {
    if (!isTouch) return;
    const loop = () => {
      onMove(moveRef.current.x, moveRef.current.z);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isTouch, onMove]);

  const handleJoystickStart = useCallback((e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!joystickRef.current) return;
    touchIdRef.current = touch.identifier;
    const rect = joystickRef.current.getBoundingClientRect();
    centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  const handleJoystickMove = useCallback((e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier !== touchIdRef.current) continue;

      const dx = touch.clientX - centerRef.current.x;
      const dy = touch.clientY - centerRef.current.y;
      const maxRadius = 40;
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius);
      const angle = Math.atan2(dy, dx);

      const normX = (dist / maxRadius) * Math.cos(angle);
      const normY = (dist / maxRadius) * Math.sin(angle);

      moveRef.current = { x: normX, z: normY };

      // Move knob visually
      if (knobRef.current) {
        const clampedX = Math.cos(angle) * dist;
        const clampedY = Math.sin(angle) * dist;
        knobRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
      }
    }
  }, []);

  const handleJoystickEnd = useCallback(() => {
    touchIdRef.current = null;
    moveRef.current = { x: 0, z: 0 };
    if (knobRef.current) {
      knobRef.current.style.transform = "translate(0px, 0px)";
    }
  }, []);

  if (!isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]">
      {/* Virtual Joystick — bottom left */}
      <div
        ref={joystickRef}
        className="pointer-events-auto absolute bottom-24 left-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-sm"
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
        onTouchCancel={handleJoystickEnd}
      >
        <div
          ref={knobRef}
          className="h-12 w-12 rounded-full border-2 border-white/40 bg-white/20 transition-none"
        />
        {/* Direction labels */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/40">W</div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/40">S</div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-white/40">A</div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-white/40">D</div>
      </div>

      {/* Jump button — bottom right */}
      <button
        className="pointer-events-auto absolute bottom-24 right-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-black/30 font-mono text-xs font-bold text-white/70 active:bg-white/20 backdrop-blur-sm"
        onTouchStart={(e) => { e.preventDefault(); onJump(); }}
      >
        JUMP
      </button>

      {/* Sprint button — above jump */}
      <button
        className="pointer-events-auto absolute bottom-44 right-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-400/30 bg-black/30 font-mono text-[10px] font-bold text-yellow-400/70 active:bg-yellow-400/20 backdrop-blur-sm"
        onTouchStart={(e) => { e.preventDefault(); onSprint(true); }}
        onTouchEnd={() => onSprint(false)}
        onTouchCancel={() => onSprint(false)}
      >
        RUN
      </button>
    </div>
  );
}

export { isTouchDevice };
