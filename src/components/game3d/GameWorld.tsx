"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import Terrain from "./Terrain";
import Landmarks from "./Landmarks";
import Character from "./Character";
import Trees from "./Trees";
import Animals from "./Animals";
import Particles from "./Particles";
import Paths from "./Paths";
import Clouds from "./Clouds";
import DayNightCycle from "./DayNightCycle";
import DirectionIndicators from "./DirectionIndicators";
import GameUI from "./GameUI";
import Minimap from "./Minimap";

interface GameWorldProps {
  onExit: () => void;
  onSelectSection: (section: string) => void;
  exploredCount?: number;
}

const keyboardMap = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "jump", keys: ["Space"] },
];

export default function GameWorld({ onExit, onSelectSection, exploredCount = 0 }: GameWorldProps) {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0, 0]);

  const handlePositionChange = useCallback((pos: [number, number, number]) => {
    setPlayerPos(pos);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ fov: 50, near: 0.1, far: 300, position: [0, 10, 20] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            {/* Day/Night cycle handles sky, sun, moon, stars, and lighting */}
            <DayNightCycle />

            <fog attach="fog" args={["#c9daea", 60, 200]} />

            <Terrain />
            <Paths />
            <Trees />
            <Animals />
            <Landmarks onSelectSection={onSelectSection} />
            <Particles />
            <Clouds />
            <DirectionIndicators playerPosition={playerPos} />
            <Character onPositionChange={handlePositionChange} />
          </Suspense>
        </Canvas>

        <GameUI onExit={onExit} exploredCount={exploredCount} />
        <Minimap playerPosition={playerPos} />
      </KeyboardControls>
    </div>
  );
}
