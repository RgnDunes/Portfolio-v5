"use client";

import { useState, useCallback, useRef } from "react";
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
import Collectibles, { GEMS } from "./Collectibles";
import CollectionEffect from "./CollectionEffect";
import GameHUD from "./GameHUD";

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

interface EffectData {
  id: string;
  position: [number, number, number];
  color: string;
  label: string;
}

export default function GameWorld({ onExit, onSelectSection, exploredCount = 0 }: GameWorldProps) {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0, 0]);
  const [score, setScore] = useState(0);
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [effects, setEffects] = useState<EffectData[]>([]);
  const [isSprinting, setIsSprinting] = useState(false);
  const [stamina, setStamina] = useState(100);
  const [lastCollected, setLastCollected] = useState<{ label: string; color: string } | null>(null);
  const lastCollectedKey = useRef(0);

  const handlePositionChange = useCallback((pos: [number, number, number]) => {
    setPlayerPos(pos);
  }, []);

  const handleSprintChange = useCallback((sprinting: boolean, stam: number) => {
    setIsSprinting(sprinting);
    setStamina(stam);
  }, []);

  const handleCollect = useCallback(
    (gem: { id: string; label: string; points: number }, position: [number, number, number], color: string) => {
      setCollectedIds((prev) => {
        if (prev.includes(gem.id)) return prev;
        return [...prev, gem.id];
      });
      setScore((prev) => prev + gem.points);
      const effectId = `${gem.id}-${Date.now()}`;
      setEffects((prev) => [...prev, { id: effectId, position, color, label: gem.label }]);
      lastCollectedKey.current += 1;
      setLastCollected({ label: gem.label, color });
    },
    []
  );

  const handleEffectComplete = useCallback((effectId: string) => {
    setEffects((prev) => prev.filter((e) => e.id !== effectId));
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
            <Collectibles
              playerPosition={playerPos}
              onCollect={handleCollect}
              collectedIds={collectedIds}
            />
            {effects.map((effect) => (
              <CollectionEffect
                key={effect.id}
                position={effect.position}
                color={effect.color}
                label={effect.label}
                onComplete={() => handleEffectComplete(effect.id)}
              />
            ))}
            <Character
              onPositionChange={handlePositionChange}
              onSprintChange={handleSprintChange}
            />
          </Suspense>
        </Canvas>

        <GameUI onExit={onExit} exploredCount={exploredCount} />
        <GameHUD
          score={score}
          gemsCollected={collectedIds.length}
          totalGems={GEMS.length}
          stamina={stamina}
          isSprinting={isSprinting}
          lastCollected={lastCollected}
        />
        <Minimap playerPosition={playerPos} />
      </KeyboardControls>
    </div>
  );
}
