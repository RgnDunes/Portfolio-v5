"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Suspense } from "react";
import Terrain from "./Terrain";
import Buildings from "./Buildings";
import Player from "./Player";
import GameUI from "./GameUI";

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
  { name: "interact", keys: ["KeyE"] },
];

export default function GameWorld({ onExit, onSelectSection }: GameWorldProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ fov: 60, near: 0.1, far: 200, position: [0, 3, 15] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[50, 80, 30]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-far={150}
              shadow-camera-left={-50}
              shadow-camera-right={50}
              shadow-camera-top={50}
              shadow-camera-bottom={-50}
            />
            <hemisphereLight
              args={["#87ceeb", "#556b2f", 0.3]}
            />

            {/* Sky */}
            <Sky
              sunPosition={[100, 60, 100]}
              turbidity={8}
              rayleigh={2}
              mieCoefficient={0.005}
              mieDirectionalG={0.8}
            />

            {/* Fog */}
            <fog attach="fog" args={["#c9daea", 40, 120]} />

            {/* World */}
            <Terrain />
            <Buildings onSelectSection={onSelectSection} />

            {/* Player with controls */}
            <Player />
            <PointerLockControls />
          </Suspense>
        </Canvas>
        <GameUI onExit={onExit} />
      </KeyboardControls>
    </div>
  );
}
