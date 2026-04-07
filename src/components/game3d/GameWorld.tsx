"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import Terrain from "./Terrain";
import Landmarks from "./Landmarks";
import Character from "./Character";
import Trees from "./Trees";
import Animals from "./Animals";
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
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[60, 100, 40]}
              intensity={1.5}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={200}
              shadow-camera-left={-80}
              shadow-camera-right={80}
              shadow-camera-top={80}
              shadow-camera-bottom={-80}
            />
            <hemisphereLight args={["#87ceeb", "#556b2f", 0.4]} />

            <Sky
              sunPosition={[100, 60, 100]}
              turbidity={6}
              rayleigh={2}
              mieCoefficient={0.005}
              mieDirectionalG={0.8}
            />

            <fog attach="fog" args={["#c9daea", 60, 200]} />

            <Terrain />
            <Trees />
            <Animals />
            <Landmarks onSelectSection={onSelectSection} />
            <Character onPositionChange={handlePositionChange} />
          </Suspense>
        </Canvas>

        <GameUI onExit={onExit} />
        <Minimap playerPosition={playerPos} />
      </KeyboardControls>
    </div>
  );
}
