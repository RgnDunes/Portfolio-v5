"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import Terrain from "./Terrain";
import Buildings from "./Buildings";
import Character from "./Character";
import Trees from "./Trees";
import GameUI from "./GameUI";
import Minimap from "./Minimap";

interface GameWorldProps {
  onExit: () => void;
  onSelectSection: (section: string) => void;
}

const keyboardMap = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "jump", keys: ["Space"] },
];

export default function GameWorld({ onExit, onSelectSection }: GameWorldProps) {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0, 12]);

  const handlePositionChange = useCallback((pos: [number, number, number]) => {
    setPlayerPos(pos);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ fov: 50, near: 0.1, far: 200, position: [0, 8, 26] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[50, 80, 30]}
              intensity={1.5}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={150}
              shadow-camera-left={-50}
              shadow-camera-right={50}
              shadow-camera-top={50}
              shadow-camera-bottom={-50}
            />
            <hemisphereLight args={["#87ceeb", "#556b2f", 0.4]} />

            {/* Sky */}
            <Sky
              sunPosition={[100, 60, 100]}
              turbidity={8}
              rayleigh={2}
              mieCoefficient={0.005}
              mieDirectionalG={0.8}
            />

            {/* Fog */}
            <fog attach="fog" args={["#c9daea", 50, 150]} />

            {/* World */}
            <Terrain />
            <Trees />
            <Buildings onSelectSection={onSelectSection} />

            {/* Third-person character */}
            <Character onPositionChange={handlePositionChange} />
          </Suspense>
        </Canvas>

        {/* UI Overlays */}
        <GameUI onExit={onExit} />
        <Minimap playerPosition={playerPos} />
      </KeyboardControls>
    </div>
  );
}
