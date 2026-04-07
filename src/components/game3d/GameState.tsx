"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

interface CollectionEffectData {
  position: [number, number, number];
  color: string;
  label: string;
}

interface GemData {
  id: string;
  label: string;
  points: number;
}

interface GameStateType {
  score: number;
  gemsCollected: string[];
  isSprinting: boolean;
  stamina: number;
  landmarksActivated: string[];
  collectionEffect: CollectionEffectData | null;
}

interface GameStateActions {
  collectGem: (gem: GemData, effect: CollectionEffectData) => void;
  clearEffect: () => void;
  setSprinting: (val: boolean) => void;
  setStamina: (val: number) => void;
  activateLandmark: (id: string) => void;
}

const GameStateContext = createContext<
  (GameStateType & GameStateActions) | null
>(null);

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within GameStateProvider");
  return ctx;
}

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [gemsCollected, setGemsCollected] = useState<string[]>([]);
  const [isSprinting, setIsSprinting] = useState(false);
  const [stamina, setStamina] = useState(100);
  const [landmarksActivated, setLandmarksActivated] = useState<string[]>([]);
  const [collectionEffect, setCollectionEffect] =
    useState<CollectionEffectData | null>(null);

  const effectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const collectGem = useCallback(
    (gem: GemData, effect: CollectionEffectData) => {
      setGemsCollected((prev) => {
        if (prev.includes(gem.id)) return prev;
        return [...prev, gem.id];
      });
      setScore((prev) => prev + gem.points);
      setCollectionEffect(effect);

      if (effectTimeout.current) clearTimeout(effectTimeout.current);
      effectTimeout.current = setTimeout(() => {
        setCollectionEffect(null);
      }, 1000);
    },
    []
  );

  const clearEffect = useCallback(() => {
    setCollectionEffect(null);
  }, []);

  const setSprinting = useCallback((val: boolean) => {
    setIsSprinting(val);
  }, []);

  const activateLandmark = useCallback((id: string) => {
    setLandmarksActivated((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        score,
        gemsCollected,
        isSprinting,
        stamina,
        landmarksActivated,
        collectionEffect,
        collectGem,
        clearEffect,
        setSprinting,
        setStamina,
        activateLandmark,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
